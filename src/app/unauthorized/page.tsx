// app/unauthorized/page.tsx

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Yetkisiz Erişim 🚫
      </h1>
      <p className="text-gray-700 text-lg">
        Bu sayfaya erişim yetkiniz yok. Lütfen gerekli izinlere sahip bir
        hesapla giriş yapın.
      </p>
    </div>
  );
}
