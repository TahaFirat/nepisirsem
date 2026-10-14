# 🍎 App Store Connect — Adım Adım Eksiksiz Doldurma Rehberi (Ne Pişirsem?)

Bu rehberdeki tüm metinleri ve linkleri doğrudan [App Store Connect](https://appstoreconnect.apple.com) ekranındaki ilgili kutucuklara **kopyala-yapıştır** yapabilirsin.

---

## 0️⃣ Ön Hazırlık: Bundle ID Kaydı (1 Dakika)
Eğer `com.nepisirsem.hanimeli` henüz Apple Developer hesabında kayıtlı değilse:
1. [Apple Developer Identifiers](https://developer.apple.com/account/resources/identifiers/list) sayfasına gir ve **`+`** butonuna bas.
2. **App IDs** -> Continue -> **App** -> Continue seç.
3. **Description:** `Ne Pisirsem Hanimeli`
4. **Bundle ID (Explicit):** `com.nepisirsem.hanimeli`
5. **Continue** -> **Register** butonuna bas.

---

## 1️⃣ Yeni Uygulama Oluşturma (`Apps` -> `+` -> `New App`)

App Store Connect ana sayfasında sol üstteki **`+` (Yeni Uygulama)** butonuna bastığında açılan pencereyi şöyle doldur:

| Alan | Seçilecek / Yazılacak Değer |
| :--- | :--- |
| **Platforms (Platformlar)** | ✅ **iOS** kutucuğunu işaretle |
| **Name (Uygulama Adı)** | `Ne Pişirsem: Tarif & Kiler` *(26/30 karakter)* |
| **Primary Language (Ana Dil)** | `Turkish (Türkçe)` |
| **Bundle ID** | `com.nepisirsem.hanimeli` |
| **SKU** | `nepisirsem-ios-2026` |
| **User Access (Kullanıcı Erişimi)** | `Full Access (Tam Erişim)` |

---

## 2️⃣ Sol Menü: `App Information` (Uygulama Bilgileri)

Sol menüden **General > App Information** sekmesine tıkla:

| Alan | Kopyala-Yapıştır Değer |
| :--- | :--- |
| **Name (Ad)** | `Ne Pişirsem: Tarif & Kiler` |
| **Subtitle (Alt Başlık)** *(Maks 30 kr)* | `Evdeki Malzemeyle Yemek & Ölçü` *(30/30 karakter)* |
| **Primary Category (Birincil Kategori)** | `Food & Drink` *(Yeme ve İçme)* |
| **Secondary Category (İkincil Kategori)** | `Lifestyle` *(Yaşam Tarzı)* |
| **Content Rights (İçerik Hakları)** | `No, it does not contain, show, or access third-party content` *(Hayır seçeneğini seç)* |

### 🔞 Age Rating (Yaş Sınıflandırması — `Edit` butonuna bas)
- Karşına çıkan tüm sorularta (Cartoon Violence, Realistic Violence, Profanity, Mature Themes, Gambling, Alcohol, Medical Info vb.) **`None` (Hiçbiri)** ve **`No` (Hayır)** seçeneklerini işaretle.
- **Unrestricted Web Access (Kısıtlamasız Web Erişimi):** `No`
- Sonuç olarak otomatik **`4+`** çıkacaktır -> **Done** de.

---

## 3️⃣ Sol Menü: `App Privacy` (Uygulama Gizliliği)

Sol menüden **App Privacy** sekmesine tıkla (Canlı gizlilik politikası sayfanı GitHub Pages üzerinde aktif ettim!):

1. **Privacy Policy URL (Gizlilik Politikası URL'si):**
   ```text
   https://tahafirat.github.io/nepisirsem/privacy-policy.html
   ```
2. **Data Types (`Get Started` butonuna bas):**
   - *"Do you or your third-party partners collect data from this app?"* sorusuna:
   - 👉 **`No, we do not collect data from this app`** *(Hayır, bu uygulamadan veri toplamıyoruz)* seçeneğini işaretle ve **Save** -> sağ üstten **Publish** butonuna bas.
   *(Çünkü uygulamada üyelik yok, tüm kiler/favori verileri sadece kullanıcının kendi telefonunda `localStorage` içinde tutuluyor. Bu sayede Apple incelemesinden en hızlı şekilde geçer!)*

---

## 4️⃣ Sol Menü: `Pricing and Availability` (Fiyatlandırma ve Kullanılabilirlik)

1. **Price Schedule (Fiyat):** `$0.00 (Free / Ücretsiz)` seç.
2. **Availability (Kullanılabilirlik):** `All Countries or Regions Selected` (Tüm ülkeler).

---

## 5️⃣ Sol Menü: `1.0 Prepare for Submission` (Sürüm ve Görsel Bilgileri)

### 📸 A. Screenshots (Ekran Görüntüleri)
Proje klasöründe senin için Apple'ın zorunlu tuttuğu çözünürlüklerde (24-bit RGB, şeffaflıksız) 18 adet ekran görüntüsü ürettim. Sürükleyip bırakman yeterli:

- **iPhone 6.7" Display** sekmesine:
  👉 `c:\Users\Taha\Desktop\nepisirsem\app_store_assets\6.7_inch_portrait\` içindeki 6 resmi (`01` - `06`) sürükle bırak.
- **iPhone 6.5" Display** sekmesine *(Eğer isterse)*:
  👉 `c:\Users\Taha\Desktop\nepisirsem\app_store_assets\6.5_inch_portrait\` içindeki 6 resmi sürükle bırak.
- **iPad 13" / 12.9" Display** sekmesine:
  👉 `c:\Users\Taha\Desktop\nepisirsem\app_store_assets\ipad_portrait\` içindeki 6 resmi sürükle bırak.

---

### 📝 B. Promotional Text, Description, Keywords & URLs

- **Promotional Text (Tanıtım Metni - Maks 170 karakter):**
```text
Evdeki malzemeleri seçin, hemen pişirebileceğiniz yöresel ve dünya mutfağı yemeklerini görün! Kişi sayısına göre bardak, kaşık ve gram ölçülerini otomatik hesaplayın.
```

- **Description (Açıklama - Kopyala Yapıştır):**
```text
Bugün ne pişirsem diye düşünmeye son! Ne Pişirsem?, mutfağınızdaki mevcut malzemeleri seçerek hemen pişirebileceğiniz yemekleri saniyeler içinde bulan ve hazırlayacağınız kişi sayısına göre tüm malzeme ölçülerini (su bardağı, yemek kaşığı, çay kaşığı, gram) kusursuz şekilde ayarlayan akıllı mutfak asistanınızdır.

ÖNE ÇIKAN ÖZELLİKLER:

🧺 AKILLI KİLER & MALZEME EŞLEŞTİRME
• Evinizde bulunan malzemeleri işaretleyin veya "Temel Ev Kileri", "Kahvaltılık", "Köfte & Et" gibi hazır paketlerden birine dokunun.
• Markete gitmeden elinizdeki malzemelerle hemen yapabileceğiniz yemekleri ("Hemen Pişir") ve sadece 1-2 malzemesi eksik tarifleri anında listeleyin.

⚖️ KİŞİ SAYISINA GÖRE TAM DOĞRU PORSİYON HESAPLAYICI
• 1 kişilik pratik öğünden 12 kişilik kalabalık misafir sofrasına kadar kişi sayısını dilediğiniz gibi değiştirin.
• Tüm malzemeler ev hanımlarının günlük hayatta kullandığı su bardağı, yemek kaşığı, tatlı kaşığı, adet ve gram/ml ölçüleriyle otomatik olarak yeniden hesaplansın.
• Seçtiğiniz kişi sayısına uygun tencere, tava veya fırın tepsisi boyutu önerisini görün.

🇹🇷 81 İL YÖRESEL TÜRK MUTFAĞI & DÜNYA LEZZETLERİ
• Gaziantep, Hatay, Kayseri, Karadeniz, Ege, İç Anadolu, Doğu ve Güneydoğu Anadolu'nun en sevilen yöresel yemekleri, çorbaları, zeytinyağlıları, hamur işleri ve tatlıları.
• İtalyan, Meksika, Asya ve Fransız mutfağından evde kolayca uygulanabilen seçkin dünya tarifleri.

🔊 SESLİ TARİF OKUMA ASİSTANI & PİŞİRME ZAMANLAYICISI
• Yemek yaparken veya elleriniz hamurluyken ekrana dokunmanıza gerek kalmadan "Sesli Oku" özelliğiyle tüm adımları Türkçe sesli asistanınızdan dinleyin.
• Her pişirme adımının kendi içindeki akıllı zamanlayıcısını (dakika sayacını) tek dokunuşla başlatın, süre dolduğunda sesli uyarı alın.

🍽️ GÜNÜN 4 ÇEŞİT MENÜ PLANLAYICISI & ALIŞVERİŞ LİSTESİ
• Çorba, Ana Yemek, Yan Lezzet ve Tatlıdan oluşan uyumlu günlük menünüzü tek tuşla oluşturun.
• Eksik malzemeleri tek dokunuşla alışveriş sepetine ekleyin ve WhatsApp üzerinden ailenizle paylaşın.

Üyelik gerektirmez, kişisel verilerinizi toplamaz ve tamamen ücretsizdir!
```

- **Keywords (Anahtar Kelimeler - Maks 100 karakter, boşluksuz virgülle):**
```text
yemek tarifi,ne pişirsem,evdeki malzemeler,türk mutfağı,porsiyon,kiler,pratik yemek,çorba,tatlı
```

- **Support URL (Destek URL'si):**
```text
https://tahafirat.github.io/nepisirsem/
```

- **Marketing URL (Pazarlama URL'si - İsteğe Bağlı):**
```text
https://tahafirat.github.io/nepisirsem/
```

- **Version (Sürüm):** `1.0.0`
- **Copyright (Telif Hakkı):** `2026 Taha Firat`

---

### 📦 C. Build (Derleme Seçimi)
1. Bulut Mac derlemesi tamamlandıktan 3-5 dakika sonra **Build** bölümünde **`+ Select a build before you submit your app`** butonu görünür.
2. Tıklayıp **`1.0.0 (1)`** (veya güncel Build numarasını) seç ve **Done** de.
3. *Export Compliance (Şifreleme Uyumluluğu)* sorusu çıkarsa (`Info.plist` içine `ITSAppUsesNonExemptEncryption = false` eklediğim için genelde sormaz, sorarsa): **`None of the algorithms mentioned above`** / **`No`** seç.

---

### 🕵️‍♂️ D. App Review Information (Apple İnceleme Ekibi Bilgileri)

| Alan | Kopyala-Yapıştır Değer |
| :--- | :--- |
| **Sign-in required (Giriş gerekli mi?)** | ❌ **Kutucuğun işaretini KALDIR (Uncheck)** *(Uygulamada giriş/üyelik yok, herkes doğrudan tüm özellikleri kullanabilir!)* |
| **Contact Information (İletişim)** | Kendi Adın, Soyadın, Telefon Numaran (`+905...`) ve E-posta adresin |
| **Notes (İnceleme Notları)** | Aşağıdaki İngilizce metni yapıştır: |

```text
Ne Pisirsem is a Turkish & World cuisine recipe finder and smart portion calculator app. No account or login is required—all features (pantry ingredient matching, dynamic portion scaling for 1-12 people, step-by-step cooking timers, Turkish voice reading assistant, and shopping list) are immediately accessible upon launch. All user preferences are stored locally on the device.
```

---

### 🚀 E. App Store Version Release (Yayınlama Seçeneği)
- **Automatically release this version** *(Onaylandığı anda otomatik yayınla)* seçeneğini işaretle.
- Sağ üstten **Save** ve ardından **Add for Review / Submit to App Review** butonuna bas!
