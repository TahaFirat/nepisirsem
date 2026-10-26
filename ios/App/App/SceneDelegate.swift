import UIKit
import WebKit
import Capacitor
import UserNotifications
import AudioToolbox

class NePisirsemViewController: CAPBridgeViewController, WKScriptMessageHandler {

    private let lightHaptic = UIImpactFeedbackGenerator(style: .light)
    private let mediumHaptic = UIImpactFeedbackGenerator(style: .medium)
    private let notificationHaptic = UINotificationFeedbackGenerator()

    override func viewDidLoad() {
        super.viewDidLoad()
        lightHaptic.prepare()
        mediumHaptic.prepare()
        notificationHaptic.prepare()

        if let wkWebView = self.webView {
            wkWebView.configuration.userContentController.add(self, name: "nepisirsemNative")
            wkWebView.scrollView.showsHorizontalScrollIndicator = false
            wkWebView.allowsBackForwardNavigationGestures = false
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

        default:
            break
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
