# 🍎 Apple App Store & TestFlight Bilgileri — Ne Pişirsem?

## 1. Temel Uygulama Bilgileri
- **Uygulama Adı (App Name):** Ne Pişirsem? - Akıllı Mutfak
- **Alt Başlık (Subtitle):** Evdeki Malzemeyle Tarif & Ölçü
- **Bundle ID:** `com.nepisirsem.hanimeli`
- **SKU:** `NEPISIRSEM2026`
- **Birincil Kategori:** Food & Drink (Yeme ve İçme)
- **İkincil Kategori:** Lifestyle (Yaşam Tarzı)

## 2. Anahtar Kelimeler (Keywords - 100 Karakter Sınırı)
```text
yemek tarifi,ne pişirsem,evdeki malzemeler,türk mutfağı,porsiyon,kiler,pratik yemek,çorba,tatlı
```

## 3. Açıklama (Description)
Bugün ne pişirsem diye düşünmeye son! **Ne Pişirsem?**, evinizdeki mevcut malzemeleri seçerek hemen pişirebileceğiniz yemekleri saniyeler içinde bulan ve kişi sayısına göre tüm malzeme ölçülerini (su bardağı, yemek kaşığı, gram) kusursuz ayarlayan akıllı mutfak asistanınızdır.

**Öne Çıkan Özellikler:**
- **🧺 Akıllı Kiler Eşleştirme:** Evinizde olan malzemeleri işaretleyin, ekstra alışverişe çıkmadan hemen yapabileceğiniz yemekleri anında görün.
- **⚖️ Kişi Sayısına Göre Otomatik Ölçü:** 1 kişiden 12 kişilik misafir sofrasına kadar kişi sayısını seçin; tüm malzemeler ev hanımlarının kullandığı bardak, kaşık ve gram ölçüleriyle otomatik hesaplansın.
- **🇹🇷 81 İl Yöresel Türk Mutfağı & Dünya Lezzetleri:** Gaziantep'ten Karadeniz'e, Ege zeytinyağlılarından klasik anne yemeklerine ve popüler dünya mutfağına kadar yüzlerce gerçek tarif.
- **🔊 Sesli Tarif Okuma & Adım Zamanlayıcı:** Elleriniz hamurlu veya yemek yaparken ekrana dokunmadan sesli okuma asistanıyla adımları dinleyin, tek tıkla pişirme alarmı kurun.
- **🛒 Akıllı Alışveriş Sepeti & WhatsApp Paylaşımı:** Eksik malzemeleri tek dokunuşla alışveriş listesine ekleyin ve WhatsApp üzerinden paylaşın.

## 4. GitHub Secrets (Bulut Mac CI/CD İçin)
GitHub Repository -> **Settings > Secrets and variables > Actions** bölümüne eklenecek anahtarlar:
- `BUILD_CERTIFICATE_BASE64`: `apple_certs/certificate_base64.txt` içeriği
- `P12_PASSWORD`: `.p12` sertifika şifreniz
- `APP_STORE_CONNECT_API_KEY`: `AuthKey_XXXXXX.p8` dosyasının içeriği
- `APP_STORE_CONNECT_KEY_ID`: App Store Connect Key ID
- `APP_STORE_CONNECT_ISSUER_ID`: App Store Connect Issuer ID
