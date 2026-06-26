import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const technologies = [
  { name: "Vite + React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "YouTube Embed", icon: "🎬" },
  { name: "Replit", icon: "🔄" },
];

const sources = [
  {
    title: "الآيات القرآنية",
    desc: "مأخوذة من المصحف الشريف بالرسم العثماني.",
    icon: "📖",
  },
  {
    title: "مقاطع الفيديو",
    desc: 'مضمّنة من قناة "قصص ومواعظ" على يوتيوب. جميع الحقوق محفوظة لأصحاب المحتوى الأصليين.',
    icon: "🎬",
  },
  {
    title: "ملخصات القصص والعبر",
    desc: "أُعدّت بالرجوع إلى المراجع الإسلامية الموثوقة وكتب التفسير المعتمدة، ثم صِيغت بأسلوب واضح ومبسّط.",
    icon: "📚",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream" dir="rtl">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-green text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">✦</div>
            <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "Amiri, serif" }}>
              عن الموقع
            </h1>
            <p className="text-white/85 text-lg leading-relaxed">
              موقع تعليمي يعرض قصص القرآن الكريم بأسلوب منظّم وميسّر
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

          {/* About */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gold/20">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-gold">📌</span> عن الموقع
            </h2>
            <p className="text-gray-700 leading-8 text-base">
              <strong>قصص القرآن الكريم</strong> تطبيق ويب تعليمي يهدف إلى عرض القصص
              الواردة في القرآن الكريم بصورة واضحة ومنظّمة. تتضمّن كل قصة ملخصاً
              موجزاً، والآيات القرآنية المتعلقة بها، ومقطع فيديو مضمّناً، فضلاً عن
              أبرز العبر والدروس المستفادة — مما يُيسّر على المستخدم استكشاف قصص
              القرآن وفهمها.
            </p>
          </div>

          {/* Developer */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gold/20">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-gold">👨‍💻</span> المطوّر
            </h2>
            <p className="text-gray-700 leading-8 text-base">
              صمّم هذا الموقع وطوّره{" "}
              <strong className="text-primary">شهم فادي</strong> كمشروع شخصي
              ضمن ملف أعماله التقنية، بهدف إبراز مهارات تطوير الويب الحديثة
              وتقديم منصة تعليمية لقصص القرآن الكريم.
            </p>
          </div>

          {/* Technologies */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gold/20">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="text-gold">🛠️</span> التقنيات المستخدمة
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center gap-2 bg-cream rounded-xl p-4 border border-gold/20 text-center"
                >
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="text-sm font-semibold text-primary">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gold/20">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="text-gold">📂</span> مصادر المحتوى
            </h2>
            <div className="space-y-4">
              {sources.map((src) => (
                <div key={src.title} className="flex gap-4 items-start">
                  <span className="text-2xl mt-1">{src.icon}</span>
                  <div>
                    <h3 className="font-bold text-primary mb-1">{src.title}</h3>
                    <p className="text-gray-600 leading-7 text-sm">{src.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
              <span>⚠️</span> تنبيه مهم
            </h2>
            <p className="text-amber-900 leading-8 text-base">
              هذا الموقع مشروع تعليمي غير ربحي أُنجز لأغراض تعليمية بحتة، ويسعى
              إلى تيسير الوصول إلى قصص القرآن الكريم. <strong>لا يُغني هذا الموقع
              عن الرجوع إلى علماء الشريعة الإسلامية</strong> أو إلى كتب التفسير
              التفصيلية المعتمدة.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
