import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="mt-20 bg-foreground text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold">قصص القرآن الكريم</span>
              <span className="text-gold">✦</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              موقع تعليمي لاستكشاف قصص القرآن الكريم بطريقة منظمة وميسّرة، مع
              الآيات والعبر المستفادة.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gold mb-3">الأقسام</h3>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <Link href="/" className="hover:text-gold transition-colors">الرئيسية</Link>
              <Link href="/stories" className="hover:text-gold transition-colors">جميع القصص</Link>
              <Link href="/stories?category=أنبياء" className="hover:text-gold transition-colors">قصص الأنبياء</Link>
              <Link href="/stories?category=عبر ومواعظ" className="hover:text-gold transition-colors">العبر والمواعظ</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gold mb-3">قصص مميزة</h3>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <Link href="/stories/ibrahim" className="hover:text-gold transition-colors">قصة إبراهيم</Link>
              <Link href="/stories/yusuf" className="hover:text-gold transition-colors">قصة يوسف</Link>
              <Link href="/stories/musa-firawn" className="hover:text-gold transition-colors">قصة موسى وفرعون</Link>
              <Link href="/stories/ashab-kahf" className="hover:text-gold transition-colors">قصة أصحاب الكهف</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-white/40 text-xs">
            © 2026 قصص القرآن الكريم — جميع الحقوق محفوظة
          </div>
          <div className="text-white/40 text-xs text-center">
            المحتوى للأغراض التعليمية — يُرجى التحقق من الآيات من مصحف موثوق
          </div>
        </div>
      </div>
    </footer>
  );
}
