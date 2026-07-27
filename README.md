# Kahoot-Like Game 🎮

Bu proje, popüler bilgi yarışması platformu Kahoot'tan esinlenerek geliştirilmiş, gerçek zamanlı bir çok oyunculu bilgi yarışması uygulamasıdır. Kullanıcılar kayıt olabilir, admin paneli üzerinden kendi sınavlarını oluşturabilir ve sınavlara katılarak yarışabilirler.

## 🚀 Özellikler

- **Üyelik Sistemi:** JWT tabanlı güvenli kayıt olma (Signup) ve giriş yapma (Login) süreçleri.
- **Admin Paneli:** Sınav oluşturma, soru ekleme (çoktan seçmeli) ve sınavları yönetme yetkisi.
- **Gerçek Zamanlı Etkileşim:** Socket.io kullanılarak anlık soru geçişleri ve cevap takibi.
- **Responsive Arayüz:** React ve Tailwind CSS ile geliştirilmiş, mobil ve masaüstü uyumlu modern UI.
- **Dinamik Sınav Kartları:** Mevcut sınavların ana sayfada şık bir şekilde listelenmesi.

## 🛠️ Kullanılan Teknolojiler

### Frontend
- **React:** Kullanıcı arayüzü kütüphanesi.
- **Vite:** Hızlı geliştirme ortamı ve build aracı.
- **Tailwind CSS:** Modern ve hızlı stil yönetimi.
- **Lucide React:** Minimalist ikon seti.
- **Socket.io-client:** Sunucu ile çift yönlü gerçek zamanlı iletişim.

### Backend
- **Node.js & Express:** Sunucu tarafı uygulama mantığı.
- **MongoDB & Mongoose:** Veri saklama ve modelleme.
- **Socket.io:** Gerçek zamanlı olay yönetimi (WebSocket).
- **BCrypt:** Güvenli şifreleme (Hashing).
- **JWT (JSON Web Token):** Kimlik doğrulama ve yetkilendirme.

## 📦 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Depoyu Klonlayın
```bash
git clone [https://github.com/muhammedkizildag/kahoot-like-game.git](https://github.com/muhammedkizildag/kahoot-like-game.git)
cd kahoot-like-game
```

### 2. Backend Kurulumu
```bash
cd KahootBackend
npm install
```
`.env` dosyasını oluşturun ve veritabanı bağlantı adresinizi ekleyin:
```env
PORT=5000
MONGODB_URI=mongodb+srv://kullanici:sifre@cluster.mongodb.net/veritabani_adi
JWT_SECRET=ozel_anahtariniz
```
Sunucuyu başlatın:
```bash
npm start
```

### 3. Frontend Kurulumu
```bash
cd ../Kahoot-project
npm install
```
`.env` dosyasını kontrol edin (Backend URL için):
```env
VITE_API_URL=http://localhost:5000
```
Uygulamayı başlatın:
```bash
npm run dev
```

## 📂 Proje Yapısı

```text
├── Kahoot-project/          # React Frontend Uygulaması
│   ├── src/
│   │   ├── components/      # Ortak bileşenler (Sınav kartları, soru formu vb.)
│   │   ├── pages/           # Sayfalar (Giriş, Kayıt, Admin, Sınav Ekranı)
│   │   └── App.jsx          # Ana yönlendirme ve uygulama yapısı
├── KahootBackend/           # Node.js Express Sunucusu
│   ├── index.js             # Sunucu başlangıç ve Socket.io yapılandırması
│   └── models/              # MongoDB şema tanımları (User, Exam)
└── README.md                # Proje dökümantasyonu
```

## 📝 Kullanım Senaryosu

1. **Kayıt Olun / Giriş Yapın:** Uygulamayı kullanmaya başlamak için bir hesap oluşturun.
2. **Sınav Oluştur (Admin):** Admin panelinden yeni bir sınav başlığı ve sorular ekleyin.
3. **Sınava Katıl:** Ana sayfadaki sınav kartlarından birine tıklayarak yarışmayı başlatın.
4. **Cevapla:** Gerçek zamanlı olarak soruları çözün ve puan kazanın.

## 📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakabilirsiniz.
