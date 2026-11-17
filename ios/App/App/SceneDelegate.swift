import UIKit
import WebKit
import Capacitor
import UserNotifications
import AudioToolbox
import AVFoundation

class NePisirsemViewController: CAPBridgeViewController, WKScriptMessageHandler, AVSpeechSynthesizerDelegate {

    private let lightHaptic = UIImpactFeedbackGenerator(style: .light)
    private let mediumHaptic = UIImpactFeedbackGenerator(style: .medium)
    private let notificationHaptic = UINotificationFeedbackGenerator()
    private let speechSynthesizer = AVSpeechSynthesizer()
    private var activeSpeechSessionToken: Int = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        lightHaptic.prepare()
        mediumHaptic.prepare()
        notificationHaptic.prepare()
        speechSynthesizer.delegate = self

        if let wkWebView = self.webView {
            wkWebView.configuration.userContentController.add(self, name: "nepisirsemNative")
            wkWebView.scrollView.showsHorizontalScrollIndicator = false
            wkWebView.scrollView.alwaysBounceHorizontal = false
            wkWebView.scrollView.contentInsetAdjustmentBehavior = .never
            wkWebView.allowsBackForwardNavigationGestures = false
            let warmBg = UIColor(red: 0.992, green: 0.980, blue: 0.965, alpha: 1.0)
            wkWebView.isOpaque = false
            wkWebView.backgroundColor = warmBg
            wkWebView.scrollView.backgroundColor = warmBg
        }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "nepisirsemNative",
              let body = message.body as? [String: Any],
              let action = body["action"] as? String else {
            return
        }

        switch action {
        case "haptic":
            let style = (body["style"] as? String) ?? "light"
            DispatchQueue.main.async {
                if style == "success" {
                    self.notificationHaptic.notificationOccurred(.success)
                } else if style == "warning" {
                    self.notificationHaptic.notificationOccurred(.warning)
                } else if style == "medium" {
                    self.mediumHaptic.impactOccurred()
                } else {
                    self.lightHaptic.impactOccurred()
                }
            }

        case "scheduleTimer":
            let seconds = (body["seconds"] as? Double) ?? 60
            let recipeTitle = (body["recipeTitle"] as? String) ?? "Yemek Tarifi"
            let stepTitle = (body["stepTitle"] as? String) ?? "Pişirme Adımı"
            scheduleNativeCookingTimer(seconds: seconds, recipeTitle: recipeTitle, stepTitle: stepTitle)

        case "cancelTimer":
            UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ["nepisirsem_cooking_timer"])

        case "timerFinishedChime":
            DispatchQueue.main.async {
                self.notificationHaptic.notificationOccurred(.success)
                AudioServicesPlaySystemSound(1005)
            }

        case "speakText":
            let text = (body["text"] as? String) ?? ""
            let rate = (body["rate"] as? Double) ?? 1.0
            let voiceName = body["voiceName"] as? String
            let token = (body["token"] as? Int) ?? 0
            DispatchQueue.main.async {
                self.speakTextNative(text: text, rateMultiplier: rate, voiceName: voiceName, token: token)
            }

        case "stopSpeak":
            DispatchQueue.main.async {
                self.activeSpeechSessionToken += 1
                self.speechSynthesizer.stopSpeaking(at: .immediate)
            }

        case "listTurkishVoices":
            DispatchQueue.main.async {
                let trVoices = AVSpeechSynthesisVoice.speechVoices()
                    .filter { $0.language.lowercased().hasPrefix("tr") }
                    .map { $0.name }
                let uniqueNames = Array(Set(trVoices)).sorted()
                if let jsonData = try? JSONSerialization.data(withJSONObject: uniqueNames, options: []),
                   let jsonString = String(data: jsonData, encoding: .utf8) {
                    self.webView?.evaluateJavaScript("window.__nepisirsemOnNativeVoices?.(\(jsonString));", completionHandler: nil)
                }
            }

        default:
            break
        }
    }

    private func speakTextNative(text: String, rateMultiplier: Double, voiceName: String?, token: Int) {
        activeSpeechSessionToken = token
        if speechSynthesizer.isSpeaking {
            speechSynthesizer.stopSpeaking(at: .immediate)
        }
        guard !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }

        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            // Audio session best-effort
        }

        let utterance = AVSpeechUtterance(string: text)
        let trVoices = AVSpeechSynthesisVoice.speechVoices().filter { $0.language.lowercased().hasPrefix("tr") }
        if let preferredName = voiceName, !preferredName.isEmpty,
           let matched = trVoices.first(where: { $0.name == preferredName }) {
            utterance.voice = matched
        } else if let yelda = trVoices.first(where: { $0.name.lowercased().contains("yelda") }) {
            utterance.voice = yelda
        } else if let firstTr = trVoices.first {
            utterance.voice = firstTr
        } else {
            utterance.voice = AVSpeechSynthesisVoice(language: "tr-TR")
        }

        let scaledRate = AVSpeechUtteranceDefaultSpeechRate * Float(rateMultiplier)
        utterance.rate = min(max(scaledRate, AVSpeechUtteranceMinimumSpeechRate), AVSpeechUtteranceMaximumSpeechRate)
        speechSynthesizer.speak(utterance)
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, willSpeakRangeOfSpeechString characterRange: NSRange, utterance: AVSpeechUtterance) {
        let token = activeSpeechSessionToken
        DispatchQueue.main.async {
            self.webView?.evaluateJavaScript(
                "window.__nepisirsemOnSpeechBoundary?.(\(token), \(characterRange.location), \(characterRange.length));",
                completionHandler: nil
            )
        }
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        let token = activeSpeechSessionToken
        DispatchQueue.main.async {
            self.webView?.evaluateJavaScript("window.__nepisirsemOnSpeechEnd?.(\(token));", completionHandler: nil)
        }
    }

    private func scheduleNativeCookingTimer(seconds: Double, recipeTitle: String, stepTitle: String) {
        guard seconds > 0 else { return }
        let center = UNUserNotificationCenter.current()
        center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
            guard granted else { return }
            center.removePendingNotificationRequests(withIdentifiers: ["nepisirsem_cooking_timer"])

            let content = UNMutableNotificationContent()
            content.title = "🍲 Süre Doldu: \(recipeTitle)"
            content.body = "\(stepTitle) tamamlandı! Yemeğinizi kontrol edebilirsiniz."
            content.sound = .default

            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: max(1, seconds), repeats: false)
            let request = UNNotificationRequest(identifier: "nepisirsem_cooking_timer", content: content, trigger: trigger)
            center.add(request, withCompletionHandler: nil)
        }
    }
}

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = NePisirsemViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}
