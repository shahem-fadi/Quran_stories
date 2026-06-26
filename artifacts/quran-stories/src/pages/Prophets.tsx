import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const prophets = [
  {
    number: 1,
    name: "آدم عليه السلام",
    bio: "أول البشر وأول الأنبياء، خلقه الله من طين وأسكنه الجنة ثم أهبطه إلى الأرض.",
    icon: "🌿",
  },
  {
    number: 2,
    name: "إدريس عليه السلام",
    bio: "نبي عُرف بالحكمة والصبر، وكان من أوائل من تعلموا الكتابة.",
    icon: "✒️",
  },
  {
    number: 3,
    name: "نوح عليه السلام",
    bio: "دعا قومه إلى عبادة الله قرابة ألف سنة إلا خمسين عامًا، وأنجاه الله ومن آمن معه في السفينة.",
    icon: "🚢",
  },
  {
    number: 4,
    name: "هود عليه السلام",
    bio: "أُرسل إلى قوم عاد يدعوهم إلى التوحيد، فكذبوه فأهلكهم الله.",
    icon: "🌪️",
  },
  {
    number: 5,
    name: "صالح عليه السلام",
    bio: "أُرسل إلى قوم ثمود، وأيده الله بمعجزة الناقة، لكنهم عقروها فكذبوا واستحقوا العذاب.",
    icon: "🪨",
  },
  {
    number: 6,
    name: "إبراهيم عليه السلام",
    bio: "أبو الأنبياء، دعا إلى التوحيد وحطم الأصنام وابتلاه الله بعدة ابتلاءات فنجح فيها.",
    icon: "🔥",
  },
  {
    number: 7,
    name: "لوط عليه السلام",
    bio: "أُرسل إلى قوم لوط يدعوهم إلى ترك الفاحشة، فلما كذبوه أهلكهم الله.",
    icon: "🌋",
  },
  {
    number: 8,
    name: "إسماعيل عليه السلام",
    bio: "ابن إبراهيم، عُرف بالصبر والوفاء، وشارك والده في بناء الكعبة.",
    icon: "🕋",
  },
  {
    number: 9,
    name: "إسحاق عليه السلام",
    bio: "ابن إبراهيم، بشّره الله به في الكبر، وكان نبيًا صالحًا.",
    icon: "⭐",
  },
  {
    number: 10,
    name: "يعقوب عليه السلام",
    bio: "ابن إسحاق وأبو يوسف، اشتهر بالصبر والثقة بالله.",
    icon: "🌙",
  },
  {
    number: 11,
    name: "يوسف عليه السلام",
    bio: "مر بابتلاءات كثيرة حتى أصبح عزيز مصر، وضرب مثالًا في الصبر والعفو.",
    icon: "👑",
  },
  {
    number: 12,
    name: "شعيب عليه السلام",
    bio: "أُرسل إلى أهل مدين، ودعاهم إلى العدل والصدق في البيع والشراء.",
    icon: "⚖️",
  },
  {
    number: 13,
    name: "أيوب عليه السلام",
    bio: "ابتلاه الله في صحته وماله وأهله، فكان مثالًا للصبر.",
    icon: "🌿",
  },
  {
    number: 14,
    name: "ذو الكفل عليه السلام",
    bio: "نبي اشتهر بالوفاء والصبر والعدل.",
    icon: "📜",
  },
  {
    number: 15,
    name: "موسى عليه السلام",
    bio: "أرسله الله إلى فرعون لدعوته إلى التوحيد، وأنزل عليه التوراة.",
    icon: "🌊",
  },
  {
    number: 16,
    name: "هارون عليه السلام",
    bio: "أخو موسى، أرسله الله معه لمساندته في دعوة فرعون.",
    icon: "🤝",
  },
  {
    number: 17,
    name: "داود عليه السلام",
    bio: "آتاه الله الملك والحكمة، وأنزل عليه الزبور.",
    icon: "📜",
  },
  {
    number: 18,
    name: "سليمان عليه السلام",
    bio: "نبي وملك، سخّر الله له الجن والريح والطير.",
    icon: "💍",
  },
  {
    number: 19,
    name: "إلياس عليه السلام",
    bio: "دعا قومه إلى عبادة الله وترك عبادة الأصنام.",
    icon: "⛰️",
  },
  {
    number: 20,
    name: "اليسع عليه السلام",
    bio: "واصل دعوة قومه إلى عبادة الله بعد إلياس.",
    icon: "🌿",
  },
  {
    number: 21,
    name: "يونس عليه السلام",
    bio: "ابتلعه الحوت بعد أن ترك قومه، ثم تاب إلى الله فنجاه.",
    icon: "🐋",
  },
  {
    number: 22,
    name: "زكريا عليه السلام",
    bio: "دعا الله أن يرزقه ولدًا، فاستجاب الله له ورزقه يحيى.",
    icon: "🌸",
  },
  {
    number: 23,
    name: "يحيى عليه السلام",
    bio: "نبي كريم عُرف بالطهارة والحكمة منذ صغره.",
    icon: "✨",
  },
  {
    number: 24,
    name: "عيسى عليه السلام",
    bio: "ولد بمعجزة من غير أب، وأيده الله بالمعجزات، ودعا بني إسرائيل إلى عبادة الله.",
    icon: "🕊️",
  },
  {
    number: 25,
    name: "محمد ﷺ",
    bio: "خاتم الأنبياء والمرسلين، أُنزل عليه القرآن الكريم، وأُرسل رحمةً للعالمين.",
    icon: "🌙",
    isLast: true,
  },
];

export default function ProphetsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-green text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">☪️</div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "Amiri, serif" }}>
            أنبياء الله الكرام
          </h1>
          <p className="text-white/85 text-lg leading-relaxed">
            خمسة وعشرون نبياً ذُكروا في القرآن الكريم — نبذة مختصرة عن كلٍّ منهم
          </p>
        </div>
      </section>

      {/* Grid */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prophets.map((prophet) => (
            <div
              key={prophet.number}
              className={`bg-white rounded-2xl shadow-md border p-6 flex gap-4 items-start transition-shadow hover:shadow-lg ${
                prophet.isLast
                  ? "border-gold/60 bg-amber-50"
                  : "border-gold/20"
              }`}
            >
              {/* Number badge */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-green flex items-center justify-center text-white font-bold text-sm">
                {prophet.number}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{prophet.icon}</span>
                  <h2
                    className={`font-bold text-base leading-snug ${
                      prophet.isLast ? "text-amber-800" : "text-primary"
                    }`}
                    style={{ fontFamily: "Amiri, serif" }}
                  >
                    {prophet.name}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm leading-7">{prophet.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          صلى الله عليهم جميعًا وسلّم — هم المصطفَون الأخيار الذين حملوا رسالة التوحيد للعالم
        </p>
      </main>

      <Footer />
    </div>
  );
}
