import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStoryBySlug, stories } from "@/data/stories";

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
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    سورة {verse.surah}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    آية {verse.ayah}
                  </span>
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
