/**
 * One-off patch: add intro, challenge, approach, highlights to case studies in Sanity.
 * Run: npx tsx scripts/patch-case-study-details.ts
 */

import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7vhvbsex";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type LocaleBlock = { _type: "localeText"; en: string; ar: string; de: string };
type LocaleList = { _type: "localeStringList"; en: string[]; ar: string[]; de: string[] };

const LT = (en: string, ar: string, de: string): LocaleBlock => ({
  _type: "localeText",
  en,
  ar,
  de,
});

const LL = (en: string[], ar: string[], de: string[]): LocaleList => ({
  _type: "localeStringList",
  en,
  ar,
  de,
});

const patches: Record<
  string,
  {
    intro: LocaleBlock;
    challenge: LocaleBlock;
    approach: LocaleBlock;
    highlights: LocaleList;
    scope?: LocaleBlock;
    outcome?: LocaleBlock;
  }
> = {
  "spimaco-pw-station": {
    intro: LT(
      "SPIMACO needed a new purified water generation and distribution system to support expanding sterile manufacturing. MIDEX delivered a complete PW station — from process design and skid fabrication through installation, commissioning, and GMP validation documentation.",
      "احتاجت سبيماكو إلى نظام جديد لتوليد وتوزيع المياه المعالجة لدعم توسعة الإنتاج المعقم. نفذت ميدكس محطة PW متكاملة — من تصميم العملية وتصنيع السكيد حتى التركيب والتشغيل وتوثيق التحقق وفق GMP.",
      "SPIMACO benötigte ein neues System zur Reinwassergewinnung und -verteilung für die Erweiterung der sterilen Produktion. MIDEX lieferte eine komplette PW-Station — von der Prozessauslegung und Skid-Fertigung über Installation und Inbetriebnahme bis zur GMP-Validierungsdokumentation.",
    ),
    challenge: LT(
      "The facility required pharmaceutical-grade water at consistent quality and flow, with full traceability for regulatory audits. Existing infrastructure could not meet increased production demand while maintaining USP and Ph. Eur. limits for conductivity, TOC, and microbiological control.",
      "كان المرفق يحتاج مياه بمعايير دوائية بجودة وتدفق ثابتين، مع قابلية تتبع كاملة للتدقيق التنظيمي. البنية التحتية القائمة لم تستطع تلبية زيادة الطلب الإنتاجي مع الحفاظ على حدود USP وPh. Eur. للتوصيلية وTOC والتحكم الميكروبيولوجي.",
      "Die Anlage benötigte pharmazeutisches Reinwasser in konstanter Qualität und Menge mit vollständiger Rückverfolgbarkeit für Audits. Die bestehende Infrastruktur konnte den höheren Produktionsbedarf nicht decken und gleichzeitig USP- und Ph.-Eur.-Grenzwerte für Leitfähigkeit, TOC und Mikrobiologie einhalten.",
    ),
    approach: LT(
      "MIDEX engineered a skid-mounted PW system with pretreatment, double-pass reverse osmosis, and continuous online monitoring. Our team managed mechanical installation, distribution loop design, FAT and SAT execution, and IQ/OQ documentation to support a qualified operational state.",
      "صممت ميدكس نظام PW على سكيد يتضمن المعالجة الأولية والتناضح العكسي ذو المرحلتين والمراقبة المستمرة عبر الإنترنت. أدارت فرقتنا التركيب الميكانيكي وتصميم حلقة التوزيع وتنفيذ FAT وSAT وتوثيق IQ/OQ لدعم حالة تشغيل مؤهلة.",
      "MIDEX konzipierte ein skid-montiertes PW-System mit Vorbehandlung, Double-Pass-Umkehrosmose und kontinuierlicher Online-Überwachung. Unser Team übernahm Mechanikinstallation, Verteilungsschleifen-Design, FAT/SAT sowie IQ/OQ-Dokumentation für den qualifizierten Betrieb.",
    ),
    highlights: LL(
      [
        "Process design and P&ID development for the PW generation skid",
        "Double-pass RO with online conductivity and TOC monitoring",
        "Distribution loop design with sanitization capability",
        "FAT, SAT, IQ/OQ, and full GMP documentation package",
        "Operator training and turnover to production",
      ],
      [
        "تصميم العملية وتطوير P&ID لسكيد توليد PW",
        "تناضح عكسي ذو مرحلتين مع مراقبة التوصيلية وTOC عبر الإنترنت",
        "تصميم حلقة التوزيع مع إمكانية التعقيم",
        "حزمة FAT وSAT وIQ/OQ وتوثيق GMP كامل",
        "تدريب المشغلين والتسليم للإنتاج",
      ],
      [
        "Prozessdesign und P&ID-Entwicklung für das PW-Generierungsskid",
        "Double-Pass-RO mit Online-Leitfähigkeits- und TOC-Überwachung",
        "Verteilungsschleifen-Design mit Sanitisierungsfähigkeit",
        "FAT, SAT, IQ/OQ und vollständiges GMP-Dokumentationspaket",
        "Bedienerschulung und Übergabe an die Produktion",
      ],
    ),
    scope: LT(
      "End-to-end purified water station design, fabrication, installation, commissioning, and validation for a pharmaceutical manufacturing facility.",
      "تصميم وتصنيع وتركيب وتشغيل وتحقق محطة مياه معالجة متكاملة لمنشأة تصنيع دوائية.",
      "Ganzheitliche Planung, Fertigung, Installation, Inbetriebnahme und Validierung einer Reinwasserstation für eine pharmazeutische Produktionsanlage.",
    ),
    outcome: LT(
      "Delivered a 2.5 m³/h PW station with advanced monitoring and full GMP documentation for qualified operation. The system supports SPIMACO's sterile production with reliable water quality, audit-ready records, and trained operations staff.",
      "تم تسليم محطة PW بسعة 2.5 m³/س مع مراقبة متقدمة وتوثيق GMP كامل للتشغيل المؤهل. يدعم النظام إنتاج سبيماكو المعقم بجودة مياه موثوقة وسجلات جاهزة للتدقيق وطاقم تشغيل مدرب.",
      "Reinwasserstation mit 2,5 m³/h, erweiterter Überwachung und vollständiger GMP-Dokumentation für den qualifizierten Betrieb. Das System unterstützt SPIMACOs sterile Produktion mit zuverlässiger Wasserqualität, auditfähigen Unterlagen und geschultem Betriebspersonal.",
    ),
  },
  "mars-wrigley-soft-water": {
    intro: LT(
      "Mars Wrigley required a dependable soft water distribution network across confectionery production areas. MIDEX designed and installed hygienic stainless-steel piping engineered for food-grade operation, maintainability, and future line expansion.",
      "احتاجت مارس وريجلي إلى شبكة موثوقة لتوزيع الماء الناعم عبر مناطق إنتاج الحلويات. صممت ميدكس ونفذت أنابيب من الستانلس ستيل الصحية للتشغيل بمعايير الأغذية والصيانة وتوسعات الخطوط المستقبلية.",
      "Mars Wrigley benötigte ein zuverlässiges Weichwasserverteilungsnetz in den Süßwarenproduktionsbereichen. MIDEX plante und installierte hygienische Edelstahlrohrleitungen für lebensmittelgerechten Betrieb, Wartbarkeit und künftige Linienerweiterungen.",
    ),
    challenge: LT(
      "Production lines needed consistent soft water at multiple consumption points with minimal downtime during installation. The network had to integrate with existing utilities while meeting food safety hygiene standards and accommodating future capacity growth.",
      "احتاجت خطوط الإنتاج ماءً ناعمًا بثبات عند نقاط استهلاك متعددة مع أقل توقف ممكن أثناء التركيب. كان يجب أن تتكامل الشبكة مع المرافق القائمة مع الالتزام بمعايير السلامة الغذائية واستيعاب نمو الطاقة مستقبلًا.",
      "Die Produktionslinien benötigten konstantes Weichwasser an mehreren Entnahmestellen bei minimalen Stillstandszeiten während der Installation. Das Netz musste sich in bestehende Versorgungssysteme einfügen, Lebensmittelhygiene einhalten und künftiges Wachstum ermöglichen.",
    ),
    approach: LT(
      "MIDEX developed a phased installation plan to limit production interruptions. The team fabricated and installed sanitary stainless loops with correct slope, drainability, and test points, followed by hydrostatic testing, loop flushing, and a documented handover package.",
      "وضعت ميدكس خطة تركيب على مراحل للحد من توقف الإنتاج. صنعت الفرقة وثبتت حلقات ستانلس صحية بميل وصرف ونقاط اختبار مناسبة، تلتها اختبارات ضغط وتنظيف الحلقات وحزمة تسليم موثقة.",
      "MIDEX erarbeitete einen phasenweisen Installationsplan zur Begrenzung von Produktionsunterbrechungen. Das Team fertigte und installierte hygienische Edelstahlschleifen mit Gefälle, Entwässerbarkeit und Prüfstellen, gefolgt von Druckprüfung, Spülung und dokumentierter Übergabe.",
    ),
    highlights: LL(
      [
        "1,500+ meters of hygienic stainless-steel distribution piping",
        "Phased installation plan minimizing production downtime",
        "Loop testing, flushing, and pressure verification",
        "As-built isometrics and maintenance documentation",
        "Integration with existing soft water generation",
      ],
      [
        "أكثر من 1,500 متر من أنابيب التوزيع الصحية من الستانلس ستيل",
        "خطة تركيب مرحلية تقلل توقف الإنتاج",
        "اختبار الحلقات والتنظيف والتحقق من الضغط",
        "رسومات as-built ومستندات الصيانة",
        "التكامل مع توليد الماء الناعم القائم",
      ],
      [
        "Über 1.500 Meter hygienische Edelstahl-Verteilungsrohrleitungen",
        "Phasenweiser Installationsplan mit minimalen Produktionsstillständen",
        "Schleifentests, Spülung und Druckverifikation",
        "As-built-Isometrien und Wartungsdokumentation",
        "Integration in bestehende Weichwassergewinnung",
      ],
    ),
    scope: LT(
      "Design, fabrication, and installation of a stainless-steel soft water distribution network serving multiple food production zones.",
      "تصميم وتصنيع وتركيب شبكة توزيع ماء ناعم من الستانلس ستيل تخدم مناطق إنتاج غذائية متعددة.",
      "Planung, Fertigung und Installation eines Edelstahl-Weichwasserverteilungsnetzes für mehrere Lebensmittelproduktionszonen.",
    ),
    outcome: LT(
      "Installed 1,500 meters of hygienic piping with tested loops and documented handover for production reliability. Mars Wrigley now has a maintainable distribution network that supports consistent soft water supply across active production lines.",
      "تم تركيب 1,500 متر من الأنابيب الصحية مع حلقات مختبرة وتسليم موثق لموثوقية الإنتاج. أصبح لدى مارس وريجلي شبكة توزيع قابلة للصيانة تدعم إمدادًا ثابتًا بالماء الناعم عبر خطوط الإنتاج النشطة.",
      "1.500 Meter hygienische Rohrleitungen mit geprüften Schleifen und dokumentierter Übergabe für Produktionssicherheit. Mars Wrigley verfügt nun über ein wartbares Verteilungsnetz mit konstanter Weichwasserversorgung in den aktiven Produktionslinien.",
    ),
  },
  "vacsera-ro-edi": {
    intro: LT(
      "VACSERA expanded vaccine and biologic production and needed higher purified water output without compromising validated operations. MIDEX upgraded the RO-EDI generation train to increase capacity while preserving compliance and data integrity.",
      "وسّعت فاكسيرا إنتاج اللقاحات والمنتجات البيولوجية واحتاجت زيادة إنتاج المياه المعالجة دون المساس بالتشغيل المؤهل. رقت ميدكس خط توليد RO-EDI لزيادة السعة مع الحفاظ على الامتثال وسلامة البيانات.",
      "VACSERA erweiterte die Impfstoff- und Biologika-Produktion und benötigte mehr Reinwasser ohne Beeinträchtigung des validierten Betriebs. MIDEX erweiterte die RO-EDI-Generierung zur Kapazitätssteigerung bei Erhalt von Compliance und Datenintegrität.",
    ),
    challenge: LT(
      "The upgrade had to be executed in a live pharmaceutical facility without risking water quality to downstream production. Existing RO-EDI equipment was capacity-limited, and every modification required strict change control and weld traceability for GMP compliance.",
      "كان يجب تنفيذ الترقية في منشأة دوائية عاملة دون المخاطرة بجودة المياه للإنتاج اللاحق. كان معدات RO-EDI القائمة محدودة السعة، وكل تعديل تطلب رقابة تغيير صارمة وتتبعًا للحام وفق GMP.",
      "Die Erweiterung musste in einer laufenden Pharmaanlage erfolgen, ohne die Wasserqualität für nachgelagerte Produktion zu gefährden. Die bestehende RO-EDI-Anlage war kapazitätsbegrenzt; jede Änderung erforderte strikte Change Control und Schweiß-Rückverfolgbarkeit für GMP.",
    ),
    approach: LT(
      "MIDEX assessed the existing system, engineered capacity expansion modules, and executed installation to orbital welding standards. Monitoring points were upgraded and all modifications were documented for regulatory traceability and seamless requalification.",
      "قيّمت ميدكس النظام القائم وصممت وحدات توسعة السعة ونفذت التركيب بمعايير اللحام المداري. تم ترقية نقاط المراقبة وتوثيق جميع التعديلات لضمان التتبع التنظيمي وإعادة التأهيل بسلاسة.",
      "MIDEX bewertete das Bestandssystem, konzipierte Kapazitätserweiterungsmodule und installierte nach Orbital-Schweißstandards. Überwachungspunkte wurden erweitert; alle Änderungen wurden für regulatorische Rückverfolgbarkeit und reibungslose Requalifizierung dokumentiert.",
    ),
    highlights: LL(
      [
        "RO-EDI capacity expansion engineering and installation",
        "Orbital welding with full weld log traceability",
        "Online quality monitoring integration",
        "Change control documentation for GMP environment",
        "Commissioning support and performance verification",
      ],
      [
        "هندسة وتركيب توسعة سعة RO-EDI",
        "لحام مداري مع تتبع كامل لسجلات اللحام",
        "دمج مراقبة الجودة عبر الإنترنت",
        "توثيق رقابة التغيير لبيئة GMP",
        "دعم التشغيل والتحقق من الأداء",
      ],
      [
        "RO-EDI-Kapazitätserweiterung — Engineering und Installation",
        "Orbital-Schweißen mit vollständiger Schweißprotokoll-Rückverfolgbarkeit",
        "Integration der Online-Qualitätsüberwachung",
        "Change-Control-Dokumentation für GMP-Umgebung",
        "Inbetriebnahmeunterstützung und Leistungsverifikation",
      ],
    ),
    scope: LT(
      "Capacity upgrade of an existing RO-EDI purified water generation station within an operational pharmaceutical facility.",
      "ترقية سعة محطة توليد مياه معالجة RO-EDI قائمة داخل منشأة دوائية عاملة.",
      "Kapazitätserweiterung einer bestehenden RO-EDI-Reinwasserstation in einer laufenden pharmazeutischen Anlage.",
    ),
    outcome: LT(
      "Upgraded purified water generation capacity while maintaining continuous compliance and traceable weld records. VACSERA can support higher production volumes with an audit-ready water system and documented change history.",
      "تم رفع سعة توليد المياه المعالجة مع الحفاظ على الامتثال المستمر وسجلات اللحام القابلة للتتبع. تستطيع فاكسيرا دعم حجم إنتاج أعلى بنظام مياه جاهز للتدقيق وسجل تغييرات موثق.",
      "Erweiterte Reinwasserkapazität bei kontinuierlicher Compliance und nachvollziehbaren Schweißunterlagen. VACSERA kann höhere Produktionsmengen mit einem auditfähigen Wassersystem und dokumentierter Änderungshistorie unterstützen.",
    ),
  },
  "otsuka-pw-network": {
    intro: LT(
      "Otsuka Pharmaceutical commissioned a new production line that required tie-in to the site's purified water network. MIDEX delivered PW loop piping with orbital welding and passivation to meet sterile manufacturing and validation requirements.",
      "أطلقت أوتسوكا فارماسيوتيكال خط إنتاج جديدًا يتطلب الربط بشبكة المياه المعالجة في الموقع. نفذت ميدكس أنابيب حلقة PW بلحام مداري وتمرير لتلبية متطلبات التصنيع المعقم والتحقق.",
      "Otsuka Pharmaceutical beauftragte eine neue Produktionslinie mit Anbindung an das bestehende Reinwassernetz. MIDEX lieferte PW-Schleifenrohrleitungen mit Orbital-Schweißen und Passivierung für sterile Fertigung und Validierung.",
    ),
    challenge: LT(
      "The new line had to connect to an operational PW distribution system without contamination risk or extended shutdown. High-purity orbital welds and proper passivation were mandatory for acceptance into the site's validated water infrastructure.",
      "كان يجب ربط الخط الجديد بنظام توزيع PW عامل دون مخاطر تلوث أو توقف طويل. كان اللحام المداري عالي النقاء والتمرير الصحيح إلزاميين للقبول في بنية المياه المؤهلة في الموقع.",
      "Die neue Linie musste an ein laufendes PW-Verteilungssystem angeschlossen werden — ohne Kontaminationsrisiko oder längere Stillstände. Hochreines Orbital-Schweißen und korrekte Passivierung waren Voraussetzung für die Aufnahme in die validierte Wasserinfrastruktur.",
    ),
    approach: LT(
      "MIDEX prefabricated spools where practical, performed on-site orbital welding to pharmaceutical standards, and executed passivation and loop proving before tie-in. All work was documented with weld maps, inspection records, and turnover packages.",
      "صنعت ميدكس أجزاء الأنابيب مسبقًا حيث أمكن، ونفذت لحامًا مداريًا في الموقع بمعايير دوائية، وأجرت التمرير وإثبات الحلقة قبل الربط. وُثق كل العمل بخرائط لحام وسجلات فحص وحزم تسليم.",
      "MIDEX prefabrizierte Spools wo möglich, führte Orbital-Schweißen vor Ort nach pharmazeutischen Standards aus und führte Passivierung und Schleifenprüfung vor dem Anschluss durch. Alle Arbeiten wurden mit Schweißkarten, Prüfprotokollen und Übergabepaketen dokumentiert.",
    ),
    highlights: LL(
      [
        "PW loop design for new production line integration",
        "ASME BPE orbital welding execution and inspection",
        "Passivation and loop proving prior to tie-in",
        "Weld mapping and traceability documentation",
        "Coordinated tie-in with minimal disruption to existing loops",
      ],
      [
        "تصميم حلقة PW لدمج خط الإنتاج الجديد",
        "تنفيذ وفحص اللحام المداري وفق ASME BPE",
        "التمرير وإثبات الحلقة قبل الربط",
        "خرائط اللحام وتوثيق التتبع",
        "ربط منسق مع أقل تعطيل للحلقات القائمة",
      ],
      [
        "PW-Schleifendesign für Integration der neuen Produktionslinie",
        "ASME-BPE-Orbital-Schweißen und Inspektion",
        "Passivierung und Schleifenprüfung vor dem Anschluss",
        "Schweißkartierung und Rückverfolgbarkeitsdokumentation",
        "Koordinierter Anschluss mit minimaler Störung bestehender Schleifen",
      ],
    ),
    scope: LT(
      "PW network piping, orbital welding, and passivation for a new pharmaceutical production line integrated with existing distribution.",
      "أنابيب شبكة PW واللحام المداري والتمرير لخط إنتاج دوائي جديد متكامل مع التوزيع القائم.",
      "PW-Netzrohrleitungen, Orbital-Schweißen und Passivierung für eine neue pharmazeutische Produktionslinie in bestehender Verteilung.",
    ),
    outcome: LT(
      "Executed stainless orbital welding and passivation across a new PW loop integrated with existing distribution. Otsuka received a validated-ready loop with complete weld traceability and minimal impact on ongoing production.",
      "تم تنفيذ اللحام المداري من الستانلس والتمرير عبر حلقة PW جديدة متكاملة مع التوزيع القائم. استلمت أوتسوكا حلقة جاهزة للتأهيل مع تتبع كامل للحام وأقل تأثير على الإنتاج الجاري.",
      "Orbital-Schweißen und Passivierung an einer neuen PW-Schleife, integriert in die bestehende Verteilung. Otsuka erhielt eine validierungsfertige Schleife mit vollständiger Schweiß-Rückverfolgbarkeit und minimaler Beeinträchtigung des laufenden Betriebs.",
    ),
  },
};

async function main() {
  for (const [slug, fields] of Object.entries(patches)) {
    const id = `caseStudy-${slug}`;
    await client
      .patch(id)
      .set({
        intro: fields.intro,
        challenge: fields.challenge,
        approach: fields.approach,
        highlights: fields.highlights,
        scope: fields.scope,
        outcome: fields.outcome,
      })
      .commit();
    console.log(`Patched ${slug}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
