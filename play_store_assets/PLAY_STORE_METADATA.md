# 🤖 Google Play Console — Adım Adım Eksiksiz Yayınlama Rehberi (Ne Pişirsem?)

Bu rehber, **Ne Pişirsem?** uygulamasını [Google Play Console](https://play.google.com/console)'a yüklerken karşına çıkacak tüm adımları, form sorularının yanıtlarını ve dosya yollarını içerir.

---

## 1️⃣ Yeni Uygulama Oluşturma (Create App)

Google Play Console ana sayfasında sağ üstteki **"Uygulama oluştur" (Create App)** butonuna bas:

| Alan | Seçilecek / Yazılacak Değer |
| :--- | :--- |
| **Uygulama Adı (App Name)** | `Ne Pişirsem: Tarif & Kiler` *(26/30 karakter)* |
| **Varsayılan Dil (Default Language)** | `Türkçe (tr-TR)` |
| **Uygulama mı Oyun mu?** | `Uygulama` (App) |
| **Ücretsiz mi Ücretli mi?** | `Ücretsiz` (Free) |
| **Beyanlar (Declarations)** | İki kutucuğu da işaretle (Geliştirici Program Politikaları & ABD İhracat Yasaları) |
| **İşlem** | Sağ alttan **Uygulama oluştur** butonuna bas. |

---

## 2️⃣ Gösterge Paneli: "Uygulamanızı Kurun" (Set Up Your App)

Açılan panoda **"Uygulamanızı kurun" (Set up your app)** başlığı altındaki görevleri sırasıyla tamamla:

### 1. Gizlilik Politikası (Privacy Policy)
- **Gizlilik Politikası URL'si:**
  ```text
  https://tahafirat.github.io/nepisirsem/privacy-policy.html
  ```
- **Kaydet** butonuna bas.

### 2. Uygulama Erişimi (App Access)
- 👉 **"Tüm işlevler özel erişim olmadan kullanılabilir"** (All functionality is available without special access) seçeneğini işaretle ve Kaydet. *(Uygulamada şifre veya üyelik zorunluluğu yoktur).*

### 3. Reklamlar (Ads)
- 👉 **"Hayır, uygulamamda reklam yok"** (No, my app does not contain ads) seçeneğini işaretle ve Kaydet.

### 4. İçerik Derecelendirmesi (Content Rating)
- **Anketi Başlat** (Start questionnaire) butonuna bas.
- **E-posta adresi:** Kendi e-postanı gir.
- **Kategori:** **"Tüm Diğer Uygulama Türleri"** (All Other App Types) veya **"Hizmet/Üretkenlik"** seç.
- Soruların tamamına:
  - Şiddet içeriyor mu? 👉 **Hayır**
  - Cinsellik içeriyor mu? 👉 **Hayır**
  - Küfür içeriyor mu? 👉 **Hayır**
  - Uyuşturucu / Alkol içeriyor mu? 👉 **Hayır**
  - Kullanıcılar arası iletişim var mı? 👉 **Hayır**
  - Konum paylaşıyor mu? 👉 **Hayır**
  - Fiziksel ürün satın alımı var mı? 👉 **Hayır**
- **Kaydet** $\rightarrow$ **İleri** $\rightarrow$ **Gönder** (Derecelendirme: **3+ / PEGI 3** çıkacaktır).

### 5. Hedef Kitle ve İçerik (Target Audience)
- **Hedef yaş grupları:** **`18 yaş ve üzeri`** (veya 13-15, 16-17, 18+).
- **Çocukların İlgisini Çekebilir mi? (Appeal to children):** 👉 **Hayır** (No).
- **Kaydet**.

### 6. Haber Uygulamaları (News Apps)
- 👉 **"Hayır, bu bir haber uygulaması değil"** seç ve Kaydet.

### 7. COVID-19 Temas Takibi (COVID-19 Contact Tracing)
- 👉 **"Uygulamam resmi bir temas takip veya durum uygulaması değildir"** seç ve Kaydet.

### 8. Veri Güvenliği (Data Safety — En Önemli Bölüm)
- **Uygulamanız herhangi bir kullanıcı verisi topluyor veya paylaşıyor mu?**
  👉 **"HAYIR"** (No) seçeneğini işaretle!
  *(Uygulamada Firebase Auth zorunluluğu yok, kiler ve favoriler sadece kullanıcının telefonunun yerel hafızasında saklanır).*
- **İleri** $\rightarrow$ **Gönder** butonuna bas.

### 9. Devlet Uygulamaları (Government Apps)
- 👉 **"Hayır"** seç ve Kaydet.

### 10. Finansal Özellikler (Financial Features)
- 👉 **"Uygulama herhangi bir finansal özellik sağlamaz"** seç ve Kaydet.

---

## 3️⃣ Mağaza Varlığınızı Yönetin: "Ana Mağaza Girişi" (Store Listing)

Sol menüden: **Büyüme (Growth) > Mağaza varlığı > Ana mağaza girişi (Main store listing)** sekmesine tıkla:

### 📝 A. Metin Alanları (Kopyala-Yapıştır)

- **Uygulama Adı (App Name) [Maks 30 karakter]:**
```text
Ne Pişirsem: Tarif & Kiler
```

- **Kısa Açıklama (Short Description) [Maks 80 karakter]:**
```text
Evdeki malzemelerle hemen hazır yemek tarifleri ve doğru porsiyon hesaplayıcı!
```

- **Tam Açıklama (Full Description) [Maks 4000 karakter]:**
```text
Bugün ne pişirsem diye düşünmeye son! Ne Pişirsem?, mutfağınızdaki mevcut malzemeleri seçerek hemen pişirebileceğiniz yemekleri saniyeler içinde bulan ve kaç kişi için hazırlayacaksanız tüm malzeme ölçülerini (su bardağı, yemek kaşığı, gram) tam doğru şekilde ayarlayan akıllı mutfak asistanınızdır.

ÖNE ÇIKAN ÖZELLİKLER:

🧺 AKILLI KİLER & EVDEKİ MALZEMEYLE TARİF BULUCU
• Evinizde bulunan malzemeleri tek tek işaretleyin veya "Temel Ev Kileri", "Kahvaltılık", "Bakliyat & Hamur" gibi hazır kiler paketlerinden birini seçin.
• Markete gitmeden elinizdeki malzemelerle hemen yapabileceğiniz "Hemen Pişir" yemeklerini ve sadece 1-2 malzemesi eksik tarifleri anında görün.

⚖️ KİŞİ SAYISINA GÖRE TAM DOĞRU PORSİYON MOTORU
• 1 kişiden 12 kişilik misafir sofrasına kadar kişi sayısını dilediğiniz gibi ayarlayın.
• Tüm malzeme miktarları ev hanımlarının kullandığı su bardağı, yemek kaşığı, tatlı kaşığı, adet ve gram ölçüleriyle hatasız olarak yeniden hesaplansın.
• Seçtiğiniz porsiyona uygun tencere veya fırın kabı önerisi alın.

🇹🇷 81 İL YÖRESEL ANADOLU & SEÇKİN DÜNYA MUTFAĞI
• Gaziantep, Hatay, Kayseri, Karadeniz, Ege ve tüm bölgelerin geleneksel anne yemekleri, çorbaları, et yemekleri ve tatlıları.
• İtalyan, Meksika ve Asya mutfağından evde pratikçe hazırlanabilen popüler dünya lezzetleri.

🔊 SESLİ ADIM ASİSTANI & PİŞİRME ZAMANLAYICISI
• Yemek yaparken ekrana dokunmadan "Sesli Oku" ile adımları dinleyin.
• Her pişirme adımındaki dahili zamanlayıcıyı tek dokunuşla başlatın, yemeğiniz yanmadan tam kıvamında pişsin.

🍽️ GÜNÜN 4 ÇEŞİT MENÜ PLANI & AKILLI PAZAR LİSTESİ
• Çorba, Ana Yemek, Yan Lezzet ve Tatlıdan oluşan dengeli günün menüsü.
• Eksik malzemeleri tek tıkla sepete ekleyin ve WhatsApp üzerinden sevdiklerinizle paylaşın.

Üyelik gerektirmez, kişisel verilerinizi toplamaz ve tamamen ücretsizdir!
```

---

### 🎨 B. Mağaza Grafikleri (Hazır Dosyaları Sürükle-Bırak)

Aynı sayfada aşağı kaydır ve hazırladığım dosyaları ilgili kutucuklara bırak:

1. **Uygulama Simgesi (App Icon - 512x512 px):**
   👉 `c:\Users\Taha\Desktop\nepisirsem\play_store_assets\PlayStore_Icon_512x512.png`

2. **Öne Çıkan Grafik (Feature Graphic - 1024x500 px):**
   👉 `c:\Users\Taha\Desktop\nepisirsem\play_store_assets\PlayStore_Feature_Graphic_1024x500.png`

3. **Telefon Ekran Görüntüleri (Phone Screenshots - 1080x1920 px):**
   Şu klasörün içindeki 4 görseli seç ve kutucuğa sürükle:
   📂 `c:\Users\Taha\Desktop\nepisirsem\play_store_assets\screenshots\`
   - `01_Kilerim.png`
   - `02_Porsiyon_Hesaplayici.png`
   - `03_Gunluk_Menu.png`
   - `04_Alisveris_Listesi.png`

Sayfanın sağ altındaki **Kaydet** butonuna bas.

---

## 4️⃣ Sürümü Yükleme & Yayına Gönderme (Production Release)

Sol menüden: **Sürümler (Release) > Üretim (Production)** sekmesine tıkla:

1. Sağ üstteki **"Yeni sürüm oluştur" (Create new release)** butonuna bas.
2. **Uygulama Paketleri (App Bundles):**
   - **Yükle (Upload)** butonuna bas.
   - Proje ana dizinindeki şu dosyayı seç:
     👉 `c:\Users\Taha\Desktop\nepisirsem\NePisirsem-Release.aab`
     *(Yükleme birkaç saniye içinde tamamlanıp yeşil onay alacaktır).*
3. **Karıştırmayı Çözme Dosyası (Deobfuscation / Mapping File):**
   - Yüklenen `.aab` dosyasının hemen yanındaki üç noktaya veya **"Karıştırmayı çözme dosyası yükle"** butonuna tıkla.
   - Şu zip dosyasını yükle:
     👉 `c:\Users\Taha\Desktop\nepisirsem\mapping.zip`
4. **Sürüm Adı (Release Name):**
   Otomatik olarak `1.0.0 (1)` dolacaktır.
5. **Sürüm Notları (Release Notes):**
   Aşağıdaki metni kopyala-yapıştır yap:
   ```text
   <tr-TR>
   Ne Pişirsem? ilk sürümüyle yayında!
   - Evdeki malzemeleri seçerek anında tarif bulma
   - Kişi sayısına göre otomatik porsiyon ve ölçü hesaplayıcı
   - 81 il yöresel lezzetler ve dünya mutfağı
   - Sesli adım okuma ve pişirme zamanlayıcıları
   </tr-TR>
   ```
6. Sağ alttan **Sonraki (Next)** butonuna bas.
7. Olası uyarıları incele ve sağ alttan **"Üretim kanalına sunumu başlat" (Start rollout to Production)** butonuna bas!

---

🎉 **Tebrikler!** Uygulaman Google onayına gönderildi. Genelde 1-3 iş günü içinde Google Play Store'da tüm kullanıcılara açılacaktır!
