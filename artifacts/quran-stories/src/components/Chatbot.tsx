import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { stories, categories } from "@/data/stories";

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
  links?: { label: string; href: string }[];
};

// ─── Search Engine ────────────────────────────────────────────────────────────

function normalise(s: string) {
  return s
    .toLowerCase()
    .replace(/[أإآا]/g, "ا")
    .replace(/[ةه]/g, "ه")
    .replace(/[يى]/g, "ي")
    .replace(/[\u064B-\u065F]/g, "") // remove tashkeel
    .trim();
}

function includes(haystack: string, needle: string) {
  return normalise(haystack).includes(normalise(needle));
}

const greetings = ["مرحبا", "هلا", "السلام", "اهلا", "اهلين", "سلام", "صباح", "مساء", "هي", "hi", "hello"];
const farewells = ["وداع", "باي", "شكرا", "شكراً", "ممتاز", "رائع", "جيد", "تمام", "مشكور", "bye"];
const helpKeywords = ["مساعدة", "ايش", "ماذا", "كيف", "اسئلة", "help"];

function buildAnswer(query: string): { text: string; links?: { label: string; href: string }[] } {
  const q = query.trim();
  const qn = normalise(q);

  // Greetings
  if (greetings.some((g) => qn.includes(g))) {
    return {
      text: "وعليكم السلام ورحمة الله 😊\nأنا مساعدك في موقع قصص القرآن الكريم. يمكنني مساعدتك في:\n• البحث عن قصة نبي معين\n• معرفة قصص سورة بعينها\n• استعراض العبر والدروس\n• البحث عن الآيات الكريمة\n\nاسألني ما تشاء!",
    };
  }

  // Farewells / thanks
  if (farewells.some((f) => qn.includes(f))) {
    return { text: "جزاك الله خيراً 🌿 لا تتردد في العودة بأي سؤال آخر. بالتوفيق!" };
  }

  // Help
  if (helpKeywords.some((h) => qn.includes(h)) && qn.length < 15) {
    return {
      text: "يمكنني مساعدتك في:\n• «قصة إبراهيم» — للبحث عن قصة نبي\n• «قصص سورة الكهف» — للبحث بالسورة\n• «أنبياء» / «أمم سابقة» — لعرض الفئات\n• «عبر قصة يوسف» — لعرض الدروس\n• «آيات موسى» — لعرض الآيات",
    };
  }

  // ── Count queries (before category to avoid conflicts) ────────────────────
  if (includes(q, "كم قصة") || includes(q, "عدد القصص")) {
    return { text: `📊 يوجد في الموقع ${stories.length} قصة قرآنية موزعة على ${categories.length} فئات.` };
  }
  if (includes(q, "كم نبي") || includes(q, "عدد الانبياء")) {
    const count = stories.filter((s) => s.category === "أنبياء").length;
    return { text: `📊 يوجد ${count} قصة من قصص الأنبياء في الموقع.` };
  }

  // ── All stories ───────────────────────────────────────────────────────────
  if (["كل القصص", "جميع القصص", "القصص كلها", "كل الانبياء", "قائمة القصص"].some((k) => includes(q, k))) {
    return {
      text: `📖 جميع القصص المتوفرة (${stories.length} قصة):`,
      links: stories.map((s) => ({ label: `${s.icon} ${s.title}`, href: `/stories/${s.slug}` })),
    };
  }

  // ── Lessons query — must come BEFORE category to handle "عبر قصة X" ───────
  const lessonsKeywords = ["عبره", "عبرة", "درس", "دروس", "حكمة", "فوائد", "ماذا نتعلم", "ما نتعلم"];
  const hasLessons = lessonsKeywords.some((k) => includes(q, k));
  if (hasLessons) {
    // Strip lesson-related words; avoid removing bare single letters
    const cleanedQ = q
      .replace(/عبره|عبرة|دروس|درس|حكمة|فوائد|ماذا نتعلم|ما نتعلم|من قصة|من قصه|قصة|قصه/g, "")
      .trim();
    if (cleanedQ.length >= 2) {
      const matched = stories.find(
        (s) =>
          (s.prophetName && includes(cleanedQ, s.prophetName)) ||
          includes(s.title, cleanedQ)
      );
      if (matched) {
        const lessonsText = matched.lessons.map((l, i) => `${i + 1}. ${l}`).join("\n");
        return {
          text: `💡 عبر ودروس من «${matched.title}»:\n\n${lessonsText}`,
          links: [{ label: `📖 اقرأ القصة كاملة`, href: `/stories/${matched.slug}` }],
        };
      }
    }
    // No specific story found — show help
    return {
      text: "حدد اسم القصة أو النبي الذي تريد معرفة عبره، مثل:\n«عبر قصة يوسف» أو «دروس قصة نوح»",
    };
  }

  // ── Verses query ──────────────────────────────────────────────────────────
  const versesKeywords = ["ايه", "آية", "آيات", "ايات"];
  const hasVerses = versesKeywords.some((k) => includes(q, k));
  if (hasVerses) {
    const cleanedQ = q.replace(/ايه|آية|آيات|ايات|في|من|عن/g, "").trim();
    if (cleanedQ.length >= 2) {
      const matched = stories.find(
        (s) =>
          (s.prophetName && includes(cleanedQ, s.prophetName)) ||
          includes(s.title, cleanedQ)
      );
      if (matched && matched.verses.length) {
        const versesText = matched.verses
          .slice(0, 3)
          .map((v) => `📌 سورة ${v.surah} (${v.ayah}):\n«${v.text}»\n${v.explanation ? `🔹 ${v.explanation}` : ""}`)
          .join("\n\n");
        return {
          text: `📿 آيات من قصة «${matched.title}»:\n\n${versesText}`,
          links: [{ label: `📖 اقرأ القصة كاملة`, href: `/stories/${matched.slug}` }],
        };
      }
    }
    return { text: "حدد اسم القصة أو النبي لعرض آياتها، مثل: «آيات قصة موسى»" };
  }

  // ── Surah search ──────────────────────────────────────────────────────────
  const surahKeywords = ["سورة", "سوره", "قصص سوره", "قصص سورة"];
  const hasSurah = surahKeywords.some((k) => qn.includes(normalise(k)));
  if (hasSurah) {
    const cleanedQ = q.replace(/قصص|سورة|سوره|قصة|في/g, "").trim();
    if (cleanedQ.length >= 2) {
      const matched = stories.filter((s) =>
        s.relatedSurahs.some((surah) => includes(cleanedQ, surah) || includes(surah, cleanedQ))
      );
      if (matched.length) {
        return {
          text: `📖 القصص المرتبطة بما بحثت عنه (${matched.length} قصة):`,
          links: matched.map((s) => ({ label: `${s.icon} ${s.title}`, href: `/stories/${s.slug}` })),
        };
      }
    }
    return { text: "لم أجد قصصاً لهذه السورة. جرب: «قصص سورة الكهف» أو «قصص سورة يوسف»" };
  }

  // ── Story / prophet search ────────────────────────────────────────────────
  const cleanedQ = q
    .replace(/قصه|قصة|سيدنا|سيدتنا|النبي|الرسول|نبي|رسول|عليه السلام|عليها السلام|ع\.س|اخبرني عن|اخبرني|من هو|من هي|عن/g, "")
    .trim();

  if (cleanedQ.length >= 2) {
    // Prophet name exact match first
    const exactProphet = stories.find(
      (s) => s.prophetName && (includes(cleanedQ, s.prophetName) || includes(s.prophetName, cleanedQ))
    );
    if (exactProphet) {
      return {
        text: `📖 ${exactProphet.title}\n\n${exactProphet.fullSummary}`,
        links: [{ label: `📖 اقرأ القصة كاملة`, href: `/stories/${exactProphet.slug}` }],
      };
    }

    // Title match
    const titleStripped = (s: typeof stories[0]) =>
      s.title.replace(/قصة سيدنا|قصة السيدة|قصة|عليه السلام|عليها السلام/g, "").trim();

    const byTitle = stories.filter(
      (s) => includes(s.title, cleanedQ) || includes(cleanedQ, titleStripped(s))
    );
    if (byTitle.length === 1) {
      return {
        text: `📖 ${byTitle[0].title}\n\n${byTitle[0].shortSummary}`,
        links: [{ label: `📖 اقرأ القصة كاملة`, href: `/stories/${byTitle[0].slug}` }],
      };
    }
    if (byTitle.length > 1) {
      return {
        text: `وجدت عدة قصص تطابق بحثك:`,
        links: byTitle.map((s) => ({ label: `${s.icon} ${s.title}`, href: `/stories/${s.slug}` })),
      };
    }

    // Broad summary/lessons/surah search
    const bySummary = stories.filter(
      (s) =>
        includes(s.shortSummary, cleanedQ) ||
        includes(s.fullSummary, cleanedQ) ||
        s.lessons.some((l) => includes(l, cleanedQ)) ||
        s.relatedSurahs.some((sr) => includes(sr, cleanedQ))
    );
    if (bySummary.length === 1) {
      return {
        text: `📖 ${bySummary[0].title}\n\n${bySummary[0].shortSummary}`,
        links: [{ label: `📖 اقرأ القصة كاملة`, href: `/stories/${bySummary[0].slug}` }],
      };
    }
    if (bySummary.length > 1) {
      return {
        text: `وجدت ${bySummary.length} قصص مرتبطة بـ «${q}»:`,
        links: bySummary.slice(0, 6).map((s) => ({ label: `${s.icon} ${s.title}`, href: `/stories/${s.slug}` })),
      };
    }
  }

  // ── Category queries — broad, comes last to avoid false positives ─────────
  const categoryMap: Record<string, string> = {
    "قصص الانبياء": "أنبياء",
    "قصص أنبياء": "أنبياء",
    "انبياء": "أنبياء",
    "أنبياء": "أنبياء",
    "امم سابقه": "أمم سابقة",
    "امم سابقة": "أمم سابقة",
    "أمم سابقة": "أمم سابقة",
    "صالحون": "صالحون",
    "صالحين": "صالحون",
    "مواعظ": "عبر ومواعظ",
    "عبر ومواعظ": "عبر ومواعظ",
  };

  for (const [key, catValue] of Object.entries(categoryMap)) {
    if (includes(q, key)) {
      const matched = stories.filter((s) => s.category === catValue);
      if (matched.length) {
        return {
          text: `📚 قصص فئة «${catValue}» (${matched.length} قصة):`,
          links: matched.map((s) => ({ label: `${s.icon} ${s.title}`, href: `/stories/${s.slug}` })),
        };
      }
    }
  }

  // ── Default fallback ──────────────────────────────────────────────────────
  return {
    text: `لم أجد نتيجة واضحة لـ «${q}» 🔍\n\nجرب أن تسألني عن:\n• اسم نبي مثل «إبراهيم» أو «يوسف»\n• سورة مثل «قصص سورة الكهف»\n• فئة مثل «قصص الأنبياء»\n• «كل القصص» لعرض القائمة الكاملة`,
  };
}

// ─── Quick Suggestions ────────────────────────────────────────────────────────

const quickSuggestions = [
  "قصة إبراهيم",
  "قصة يوسف",
  "قصص الأنبياء",
  "عبر قصة موسى",
  "قصص سورة الكهف",
  "كل القصص",
];

// ─── Component ────────────────────────────────────────────────────────────────

let idCounter = 0;
function nextId() {
  return ++idCounter;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      role: "bot",
      text: "السلام عليكم! 👋\nأنا مساعدك في موقع قصص القرآن الكريم.\n\nيمكنني مساعدتك في البحث عن أي قصة، نبي، سورة، أو درس. اسألني!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId(), role: "user", text: text.trim() };
    const answer = buildAnswer(text.trim());
    const botMsg: Message = { id: nextId(), role: "bot", ...answer };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #1a5c3a, #2e7d52)" }}
        aria-label="فتح المساعد"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          dir="rtl"
          className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
          style={{ maxHeight: "70vh", background: "hsl(var(--background))" }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 text-white"
            style={{ background: "linear-gradient(135deg, #1a5c3a, #2e7d52)" }}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
              📖
            </div>
            <div>
              <div className="font-bold text-sm">مساعد القرآن</div>
              <div className="text-xs text-white/70">يجيب من بيانات القصص</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mr-auto text-white/70 hover:text-white text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {msg.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors truncate"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {quickSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-border px-3 py-2 flex gap-2 items-center"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل عن أي قصة..."
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
              dir="rtl"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm disabled:opacity-40 transition-opacity"
              style={{ background: "linear-gradient(135deg, #1a5c3a, #2e7d52)" }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
