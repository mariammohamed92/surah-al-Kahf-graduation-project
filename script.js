const fs = require("fs");
const kahfPath = "/src/data/kahfData.js";
let content = fs.readFileSync(kahfPath, "utf8");

const idx13 = content.indexOf("slideNumber: 13");
if (idx13 !== -1) {
  const cutIdx = content.lastIndexOf("{", idx13);
  content = content.substring(0, cutIdx).trim();
  if (content.endsWith(",")) content = content.substring(0, content.length - 1);
  content += "\n];";
}

const text = fs.readFileSync("/public/assets/aistudio/parsed_part1.txt", "utf8");
const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

let sections = [];
let currentSec = { id: "sec-det-1", buttonTitle: "مدخل عام ولطائف", title: "أولاً: مدخل عام ولطائف في الشرح التفصيلي للسورة", texts: [] };

lines.forEach(l => {
  const clean = l.replace(/&nbsp;/g, "").replace(/V\\:\*\{[^}]+\}/g, "").trim();
  if (!clean || clean.includes("ثامناً: الشرح التفصيلي لآيات السورة")) return;

  if (clean.startsWith("أولاً: مدخل عام")) {
    // skip
  } else if (clean.startsWith("ثانياً: الشرح التفصيلي المتسلسل") || clean.startsWith("ثانياً: الشرح التفصيلي")) {
    if (currentSec.texts.length > 0) sections.push(currentSec);
    currentSec = { id: "sec-det-2", buttonTitle: "الشرح المتسلسل (83-92)", title: clean.replace(/&ndash;/g, "–"), texts: [] };
  } else if (clean.startsWith("ثالثاً: اللمسات البيانية")) {
    if (currentSec.texts.length > 0) sections.push(currentSec);
    currentSec = { id: "sec-det-3", buttonTitle: "اللمسات البيانية والتفسيرية", title: clean, texts: [] };
  } else {
    currentSec.texts.push(clean.replace(/&ndash;/g, "–").replace(/&quot;/g, "\"").replace(/&#039;/g, "'"));
  }
});
if (currentSec.texts.length > 0) sections.push(currentSec);

const slide13 = {
  id: "detailed-explanation",
  slideNumber: 13,
  type: "content",
  title: "ثامناً: الشرح التفصيلي لآيات السورة",
  image: "quranImg",
  introText: "﴿بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ﴾",
  content: [],
  sections: sections.map((s, idx) => ({
    id: `sec-det-${idx + 1}`,
    buttonTitle: s.buttonTitle,
    title: s.title,
    image: "quranImg",
    texts: s.texts
  }))
};

content = content.replace(/\];\s*$/, "");

let jsonStr = JSON.stringify(slide13, null, 2);
jsonStr = jsonStr.replace(/"image": "quranImg"/g, '"image": quranImg');

const slide13Code = `,\n  ` + jsonStr + `\n];`;
content += slide13Code;

fs.writeFileSync(kahfPath, content);
console.log("Successfully appended Slide 13!");
