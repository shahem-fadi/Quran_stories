import { useState } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFeaturedStories, categories, stories } from "@/data/stories";

const featuredStories = getFeaturedStories();

const statCards = [
  { num: "47", label: "قصة" },
  { num: "25", label: "نبي" },
  { num: "114", label: "سورة" },
  { num: "6000+", label: "آية" },
];

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/stories?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="pattern-bg py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <div className="text-gold text-5xl mb-4 font-arabic">﷽</div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            قصص القرآن الكريم
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed font-medium">
            استكشف قصص القرآن بطريقة منظمة، مع الآيات، الفيديو، والعبر
            المستفادة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stories"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              ابدأ التصفح
            </Link>
            <Link
              href="/stories"
              className="border-2 border-primary text-primary px-8 py-3 rounded-xl font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              استعرض القصص
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-2xl mx-auto px-4 -mt-6 relative z-10">
        <form
          onSubmit={handleSearch}
          className="bg-card rounded-2xl card-shadow p-3 flex items-center gap-3 border border-border"
        >
          <span className="text-muted-foreground text-xl px-2">🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن قصة، نبي، سورة، أو شخصية..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base py-1"
            dir="rtl"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
          >
            بحث
          </button>
        </form>
      </section>

      {/* Stats Cards */}
      <section className="max-w-5xl mx-auto px-4 mt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl card-shadow card-shadow-hover border border-border p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-1">
                {stat.num}
              </div>
              <div className="text-muted-foreground font-semibold text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Stories */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-gold text-2xl">✦</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            القصص المميزة
          </h2>
          <div className="flex-1 h-px bg-border" />
          <Link
            href="/stories"
            className="text-sm text-primary font-semibold hover:text-gold transition-colors whitespace-nowrap"
          >
            عرض الكل →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {featuredStories.map((story) => (
            <div
              key={story.id}
              className="bg-card rounded-2xl card-shadow card-shadow-hover border border-border flex flex-col overflow-hidden"
            >
              <div className="bg-gradient-green p-4 flex items-center gap-3">
                <div className="text-3xl">{story.icon}</div>
                <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
                  {story.category}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-3">
                <h3 className="font-bold text-foreground text-sm leading-snug">
                  {story.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1 line-clamp-3">
                  {story.shortSummary}
                </p>
                <Link
                  href={`/stories/${story.slug}`}
                  className="text-xs font-bold text-primary hover:text-gold transition-colors mt-auto"
                >
                  اقرأ القصة ←
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-gold text-2xl">✦</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            تصفح حسب الفئة
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const count = stories.filter((s) => s.category === cat.key).length;
            return (
              <Link
                key={cat.key}
                href={`/stories?category=${encodeURIComponent(cat.key)}`}
                className="bg-gradient-green rounded-2xl p-5 text-white card-shadow-hover flex flex-col gap-2 cursor-pointer"
              >
                <div className="text-3xl">{cat.icon}</div>
                <div className="font-bold text-sm leading-snug">{cat.label}</div>
                <div className="text-white/70 text-xs">{count} قصة</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Story of the Day */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-gold text-2xl">✦</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            قصة اليوم
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="bg-gradient-green rounded-3xl p-8 md:p-10 text-white card-shadow relative overflow-hidden">
          <div className="absolute top-4 left-4 text-white/10 text-8xl font-arabic select-none">
            ✦
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gold text-foreground text-xs font-bold px-3 py-1 rounded-full">
                قصة اليوم ✦
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {featuredStories[0].title}
            </h2>
            <p className="text-white/80 leading-relaxed mb-6 max-w-2xl text-sm md:text-base">
              {featuredStories[0].shortSummary}
            </p>
            <Link
              href={`/stories/${featuredStories[0].slug}`}
              className="inline-block bg-gold text-foreground font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              اقرأ القصة كاملة
            </Link>
          </div>
        </div>
      </section>

      {/* All stories teaser */}
      <section className="max-w-5xl mx-auto px-4 mt-16 text-center">
        <div className="bg-card border border-border rounded-2xl card-shadow p-8">
          <div className="text-4xl mb-3">📖</div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            اكتشف المزيد من القصص
          </h3>
          <p className="text-muted-foreground text-sm mb-5">
            {stories.length} قصة قرآنية منظمة ومفصّلة في مكان واحد
          </p>
          <Link
            href="/stories"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            تصفح جميع القصص
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
