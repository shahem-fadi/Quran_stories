export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
      <div className="text-center px-4">
        <div className="text-gold text-6xl mb-4">✦</div>
        <h1 className="text-4xl font-bold text-foreground mb-3">404</h1>
        <p className="text-muted-foreground text-lg mb-6">الصفحة غير موجودة</p>
        <a
          href="/"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          العودة إلى الرئيسية
        </a>
      </div>
    </div>
  );
}
