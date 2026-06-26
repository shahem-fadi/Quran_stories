import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { stories, categories } from "@/data/stories";

export default function StoriesPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCategory = params.get("category") || "الكل";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    return stories.filter((s) => {
      const matchCat =
        activeCategory === "الكل" || s.category === activeCategory;
      const q = query.trim();
      const matchQ =
        !q ||
        s.title.includes(q) ||
        s.shortSummary.includes(q) ||
        s.relatedSurahs.some((sr) => sr.includes(q)) ||
        (s.prophetName ?? "").includes(q);
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Header */}
      <section className="pattern-bg py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-gold text-3xl mb-3">✦</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            جميع القصص
          </h1>
          <div className="w-16 h-1 bg-gold mx-auto mb-5 rounded-full" />
          <p className="text-muted-foreground text-base md:text-lg">
            تصفّح قصص القرآن الكريم المرتّبة حسب الفئة والنبي والسورة
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Search */}
        <div className="bg-card rounded-2xl card-shadow border border-border p-3 flex items-center gap-3 mb-6 max-w-xl">
          <span className="text-muted-foreground text-xl px-2">🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن قصة، نبي، سورة..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base py-1"
            dir="rtl"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground text-lg px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["الكل", ...categories.map((c) => c.key)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat === "الكل"
                ? `الكل (${stories.length})`
                : categories.find((c) => c.key === cat)?.label ?? cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {query && (
          <p className="text-muted-foreground text-sm mb-5">
            {filtered.length === 0
              ? "لا توجد نتائج"
              : `${filtered.length} نتيجة لـ "${query}"`}
          </p>
        )}

        {/* Story cards grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-muted-foreground text-lg">
              لا توجد قصص تطابق بحثك
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("الكل");
              }}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              إعادة تعيين الفلتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story) => (
              <div
                key={story.id}
                className="bg-card rounded-2xl card-shadow card-shadow-hover border border-border flex flex-col overflow-hidden"
              >
                {/* Card header */}
                <div className="bg-gradient-green p-5 flex items-center gap-3">
                  <div className="text-4xl">{story.icon}</div>
                  <div>
                    <span className="text-xs font-semibold bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <h2 className="font-bold text-foreground text-base leading-snug">
                    {story.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {story.shortSummary.length > 120
                      ? story.shortSummary.slice(0, 117) + "..."
                      : story.shortSummary}
                  </p>

                  {/* Related surahs */}
                  <div className="flex flex-wrap gap-1.5">
                    {story.relatedSurahs.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
                      >
                        سورة {s}
                      </span>
                    ))}
                    {story.relatedSurahs.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{story.relatedSurahs.length - 3}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/stories/${story.slug}`}
                    className="mt-auto inline-block bg-primary text-primary-foreground text-sm font-bold px-4 py-2.5 rounded-xl text-center hover:opacity-90 transition-opacity"
                  >
                    اقرأ القصة ←
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
