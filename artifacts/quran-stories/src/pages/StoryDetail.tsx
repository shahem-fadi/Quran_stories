import { Link, useParams } from "wouter";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStoryBySlug, stories } from "@/data/stories";

// Surah name → number mapping (covers all surahs used in the data)
const SURAH_NUMBER: Record<string, number> = {
  "الفاتحة": 1, "البقرة": 2, "آل عمران": 3, "النساء": 4, "المائدة": 5,
  "الأنعام": 6, "الأعراف": 7, "الأنفال": 8, "التوبة": 9, "يونس": 10,
  "هود": 11, "يوسف": 12, "الرعد": 13, "إبراهيم": 14, "الحجر": 15,
  "النحل": 16, "الإسراء": 17, "الكهف": 18, "مريم": 19, "طه": 20,
  "الأنبياء": 21, "الحج": 22, "المؤمنون": 23, "النور": 24, "الفرقان": 25,
  "الشعراء": 26, "النمل": 27, "القصص": 28, "العنكبوت": 29, "الروم": 30,
  "لقمان": 31, "السجدة": 32, "الأحزاب": 33, "سبأ": 34, "فاطر": 35,
  "يس": 36, "الصافات": 37, "ص": 38, "الزمر": 39, "غافر": 40,
  "فصلت": 41, "الشورى": 42, "الزخرف": 43, "الدخان": 44, "الجاثية": 45,
  "الأحقاف": 46, "محمد": 47, "الفتح": 48, "الحجرات": 49, "ق": 50,
  "الذاريات": 51, "الطور": 52, "النجم": 53, "القمر": 54, "الرحمن": 55,
  "الواقعة": 56, "الحديد": 57, "المجادلة": 58, "الحشر": 59, "الممتحنة": 60,
  "الصف": 61, "الجمعة": 62, "المنافقون": 63, "التغابن": 64, "الطلاق": 65,
  "التحريم": 66, "الملك": 67, "القلم": 68, "الحاقة": 69, "المعارج": 70,
  "نوح": 71, "الجن": 72, "المزمل": 73, "المدثر": 74, "القيامة": 75,
  "الإنسان": 76, "المرسلات": 77, "النبأ": 78, "النازعات": 79, "عبس": 80,
  "التكوير": 81, "الانفطار": 82, "المطففين": 83, "الانشقاق": 84, "البروج": 85,
  "الطارق": 86, "الأعلى": 87, "الغاشية": 88, "الفجر": 89, "البلد": 90,
  "الشمس": 91, "الليل": 92, "الضحى": 93, "الشرح": 94, "التين": 95,
  "العلق": 96, "القدر": 97, "البينة": 98, "الزلزلة": 99, "العاديات": 100,
  "القارعة": 101, "التكاثر": 102, "العصر": 103, "الهمزة": 104, "الفيل": 105,
  "قريش": 106, "الماعون": 107, "الكوثر": 108, "الكافرون": 109, "النصر": 110,
  "المسد": 111, "الإخلاص": 112, "الفلق": 113, "الناس": 114,
};

function buildAudioUrl(surahName: string, ayah: number): string | null {
  const num = SURAH_NUMBER[surahName];
  if (!num) return null;
  const s = String(num).padStart(3, "0");
  const a = String(ayah).padStart(3, "0");
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}

function PlayButton({ surahName, ayah }: { surahName: string; ayah: number }) {
  const [status, setStatus] = useState<"idle" | "loading" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggle = () => {
    const url = buildAudioUrl(surahName, ayah);
    if (!url) return;

    if (status === "playing") {
      audioRef.current?.pause();
      setStatus("idle");
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setStatus("idle");
      audioRef.current.onerror = () => setStatus("idle");
    }

    setStatus("loading");
    audioRef.current.play().then(() => setStatus("playing")).catch(() => setStatus("idle"));
  };

  const url = buildAudioUrl(surahName, ayah);
  if (!url) return null;

  return (
    <button
      onClick={toggle}
      title={status === "playing" ? "إيقاف التلاوة" : "استمع للآية — مشاري العفاسي"}
      className={`
        inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
        transition-all duration-200 border
        ${status === "playing"
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-background text-primary border-primary/40 hover:bg-primary/10"}
      `}
    >
      {status === "loading" ? (
        <span className="inline-block w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      ) : status === "playing" ? (
        <span className="text-[10px]">⏹</span>
      ) : (
        <span className="text-[10px]">▶</span>
      )}
      {status === "playing" ? "إيقاف" : "استمع"}
    </button>
  );
}

export default function StoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const story = getStoryBySlug(slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4 px-4 text-center">
          <div className="text-6xl">🔍</div>
          <h1 className="text-3xl font-bold text-foreground">القصة غير موجودة</h1>
          <p className="text-muted-foreground">لم نتمكن من إيجاد هذه القصة.</p>
          <Link
            href="/stories"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            العودة إلى القصص
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="pattern-bg py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-semibold mb-6 transition-colors"
          >
            → العودة إلى القصص
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{story.icon}</div>
            <div>
              <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                {story.category}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {story.title}
          </h1>
          <div className="w-16 h-1 bg-gold rounded-full mb-4" />
          <div className="flex flex-wrap gap-2">
            {story.relatedSurahs.map((s) => (
              <span
                key={s}
                className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full border border-primary/20"
              >
                سورة {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-16 flex flex-col gap-12">

        {/* 1. Short summary */}
        <section className="bg-card rounded-2xl card-shadow border border-border p-6 md:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-gold">✦</span> ملخص القصة
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base">
            {story.shortSummary}
          </p>
        </section>

        {/* 2. Full summary */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <span className="text-gold">✦</span> القصة كاملة
          </h2>
          <div className="prose-none text-foreground leading-loose text-base space-y-4">
            {story.fullSummary.split(". ").reduce<string[][]>((acc, s, i) => {
              const p = Math.floor(i / 3);
              if (!acc[p]) acc[p] = [];
              acc[p].push(s);
              return acc;
            }, []).map((group, i) => (
              <p key={i} className="leading-loose">
                {group.join(". ")}.
              </p>
            ))}
          </div>
        </section>

        {/* 3. Quran verses */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="text-gold">✦</span> آيات من القصة
          </h2>
          <div className="flex flex-col gap-4">
            {story.verses.map((verse, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl card-shadow border border-border p-5 md:p-6"
              >
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    سورة {verse.surah}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    آية {verse.ayah}
                  </span>
                  <PlayButton surahName={verse.surah} ayah={verse.ayah} />
                </div>
                <p
                  className="font-arabic text-xl md:text-2xl text-foreground leading-loose text-center mb-4 py-3 border-y border-border/60"
                  dir="rtl"
                >
                  {verse.text}
                </p>
                {verse.explanation && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <span className="font-semibold text-primary">المعنى: </span>
                    {verse.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            * يُرجى التحقق من الآيات من مصحف موثوق — هذا المحتوى للأغراض التعليمية.
          </p>
        </section>

        {/* 4. Video */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="text-gold">✦</span> فيديو القصة
          </h2>
          <div className="bg-card rounded-2xl card-shadow border border-border overflow-hidden">
            {story.videoUrl.includes("PLACEHOLDER") ? (
              <div className="aspect-video bg-muted flex items-center justify-center flex-col gap-3">
                <div className="text-5xl">🎬</div>
                <p className="text-muted-foreground text-sm font-medium">
                  سيتم إضافة الفيديو قريباً
                </p>
                <p className="text-muted-foreground/60 text-xs">
                  ضع رابط YouTube embed في بيانات القصة
                </p>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src={story.videoUrl}
                  title={story.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </section>

        {/* 5. Lessons */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="text-gold">✦</span> العبرة من القصة
          </h2>
          <div className="bg-gradient-green rounded-2xl p-6 md:p-8 text-white card-shadow">
            <ul className="flex flex-col gap-4">
              {story.lessons.map((lesson, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold text-lg mt-0.5 shrink-0">◆</span>
                  <span className="leading-relaxed">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* More stories */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="text-gold">✦</span> قصص أخرى
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stories
              .filter((s) => s.slug !== story.slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.id}
                  href={`/stories/${s.slug}`}
                  className="bg-card rounded-2xl card-shadow card-shadow-hover border border-border p-4 flex gap-3 items-center group"
                >
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <p className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                      {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.category}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
