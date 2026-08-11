import fs from "fs";
import path from "path";

const translationsPath = path.join(process.cwd(), 'scripts', 'data', 'sanity-translations.json');
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

const arabicTranslations = {
    "Pharmaceutical": "الصيدلانية",
    "Cons Korra is a general contractor MIDEX has partnered with across multiple pharmaceutical facilities — including VBC, Misr Company For Pharmaceuticals, and Mina Pharm — delivering hygienic piping, utility networks, and purified water systems tailored to each site.": "Cons Korra مقاول عام تتعاون معه ميدكس عبر عدة منشآت صيدلانية — من بينها VBC، ومصر للمستحضرات (Misr Company For Pharmaceuticals)، ومينا فارم — حيث تقدّم ميدكس أنابيب صحية وشبكات مرافق وأنظمة مياه منقاة مصممة خصيصًا لكل موقع.",
    "As general contractor on large pharmaceutical builds, Cons Korra needed a specialized hygienic-engineering subcontractor capable of delivering consistent, compliant systems across a portfolio of different end-client facilities — each with its own layout, timeline, and technical requirements.": "بصفتها المقاول العام لمشاريع صيدلانية كبرى، احتاجت Cons Korra إلى مقاول من الباطن متخصص في الهندسة الصحية، قادر على تقديم أنظمة متوافقة ومتسقة عبر محفظة من منشآت العملاء المختلفة — لكل منها تخطيطها وجدولها الزمني ومتطلباتها الفنية الخاصة.",
    "MIDEX works as Cons Korra's hygienic engineering partner project by project, adapting stainless-steel piping, water systems, and utility network designs to each facility while holding every installation to the same GMP-aligned standard.": "تعمل ميدكس كشريك هندسي صحي لـCons Korra مشروعًا بمشروع، وتُكيّف تصميمات أنابيب الستانلس ستيل وأنظمة المياه وشبكات المرافق مع كل منشأة، مع الالتزام بنفس معايير GMP في كل تركيب.",
    "Ongoing general-contracting partnership spanning multiple facilities, including VBC, Misr Company For Pharmaceuticals, and Mina Pharm — covering stainless-steel piping networks, purified water and WFI loops, compressed air and clean gases networks, and water station upgrades and spare parts supply.": "شراكة مستمرة كمقاول من الباطن ضمن نطاق المقاولات العامة، تمتد عبر عدة منشآت من بينها VBC ومصر للمستحضرات ومينا فارم — وتشمل شبكات أنابيب من الستانلس ستيل، وحلقات مياه منقاة ومياه حقن، وشبكات هواء مضغوط وغازات نظيفة، وتطوير محطات المياه وتوريد قطع الغيار.",
    "Stainless-steel piping networks across multiple facilities": "شبكات أنابيب من الستانلس ستيل عبر عدة منشآت",
    "Purified water (PW) and WFI loop installations": "تركيب حلقات مياه منقاة (PW) ومياه حقن (WFI)",
    "Compressed air and clean gases networks": "شبكات هواء مضغوط وغازات نظيفة",
    "Water station upgrades, modifications, and spare parts supply": "تطوير محطات المياه وتعديلاتها وتوريد قطع الغيار",
    "Cons Korra continues to rely on MIDEX as its go-to hygienic engineering subcontractor across its portfolio of pharmaceutical projects, with a consistent standard of compliance delivered site to site.": "تواصل Cons Korra الاعتماد على ميدكس كمقاول الهندسة الصحية المفضّل لديها عبر محفظة مشاريعها الصيدلانية، بمعيار امتثال ثابت من موقع لآخر.",
    "Stainless Steel": "الفولاذ المقاوم للصدأ",
    "Systems": "الأنظمة"
};

// Add to translations
for (const [en, ar] of Object.entries(arabicTranslations)) {
    translations[en] = ar;
}

fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));

console.log("Updated translations");
