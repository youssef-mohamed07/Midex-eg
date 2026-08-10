import { createClient } from '@sanity/client';
import { config as loadEnv } from 'dotenv';

// Load environment variables from local .env files
loadEnv({ path: '.env.local' });
loadEnv({ path: '.env' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '7vhvbsex';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN is not set. Please set it in your .env or .env.local file.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// 1. Global replacements mapping
const rawGlobalReplacements: [string, string][] = [
  ['المياه المعالجة', 'المياه المنقاة'],
  ['مياه معالجة', 'المياه المنقاة (PW)'],
  ['خطوط الأنابيب العملية', 'خطوط أنابيب العمليات'],
  ['محطة المياه الناعمة', 'محطة تليين المياه (Soft Water Station)'],
  ['تتبع كامل', 'قابلية تتبّع كاملة'],
  ['البيوتك', 'التكنولوجيا الحيوية'],
  ['اللحام المداربي الآلي', 'اللحام المداري الآلي'],
  ['الفحص بالبورoscope', 'الفحص بمنظار اللحام الداخلي (Borescope)'],
  ['ادارة الاغذية والعقاقير', 'إدارة الغذاء والدواء الأمريكية (FDA)'],
  ['إهدغ', 'EHEDG – المجموعة الأوروبية لهندسة وتصميم المعدات الصحية'],
  ['ممارسة التصنيع الجيد', 'ممارسات التصنيع الجيد (GMP)'],
  ['أليكس', 'الإسكندرية'],
  ['هندسة الأنظمة التي تحافظ على نقاء الصناعات', 'نهندس الأنظمة التي تحافظ على نقاء عملياتك'],
  ['تصميم ولحام وتركيب أنظمة صحية للأدوية والأغذية والمشروبات والبيوتك ومستحضرات التجميل — بخبرة تزيد عن 15 عاماً من الدقة.', 'نصمّم ونلحم ونركّب أنظمة عمليات صحية لقطاعات الأدوية والأغذية والمشروبات والتكنولوجيا الحيوية ومستحضرات التجميل — بخبرة تتجاوز 15 عامًا من الدقة الهندسية.'],
  ['كل أنبوب نلحمه يحمل أكثر من الماء — يحمل وعداً بالنقاء يعتمد عليه مرضى ومستهلكو عملائنا.', 'كل أنبوب نلحمه ينقل أكثر من الماء؛ فهو يحمل وعدًا بالنقاء يعتمد عليه مرضى عملائنا ومستهلكو منتجاتهم.'],
  ['م. عبدالرحمن, الشريك المؤسس — ميدكس', 'م. عبدالرحمن، الشريك المؤسس — ميدكس'],
  ['شبكات أنابيب صحية بأدق التسامحات.', 'شبكات أنابيب صحية بأدق حدود السماحات الهندسية.'],
  ['أنظمة المعالجة والمياه', 'أنظمة العمليات ومعالجة المياه'],
  ['محطة المياه المنقاة', 'محطة إنتاج المياه المنقاة (PW)'],
  ['محطة المياه المعالجة', 'محطة إنتاج المياه المنقاة (PW)'],
  ['مصنع بالشراكة مع Ghwa ومتوافق مع', 'مُصنَّعة بالشراكة مع GHWA ومتوافقة مع'],
  ['جودة أوروبية، توفر محلي', 'جودة بمستوى أوروبي، وتوفّر محلي'],
  ['مصمم للدقة في كل مرة', 'مصمَّم لأداء دقيق ومتّسق في كل مرة'],
  ['أعضاء VIP وشركاء', 'ضيوف وشركاء من كبار الشخصيات'],
  ['عرض هندسي في الموقع', 'استعراض الأعمال الهندسية في الموقع'],
  ['الدقة اللحام الامتثال التركيب الاختبار', 'الدقة • اللحام • الامتثال • التركيب • الاختبار'],
  ['وفق معايير الصناعة الصحية والصحية', 'وفق معايير الصناعات ذات المتطلبات الصحية الصارمة'],
  ['الهاتف 0102622840301006683803', '01026228403 / 01006683803'],
  ['4 مجموعات 13 خدمات', '4 مجموعات، 13 خدمة'],
  ['أربعة تخصصات أساسية، معيار واحد للدقة — ميدكس تقدم حلولاً هندسية صحية متكاملة وفق معايير الأدوية.', 'أربعة تخصصات أساسية، ومعيار واحد للدقة — تقدّم ميدكس حلولًا هندسية متكاملة لأنظمة العمليات الصحية وفق متطلبات الصناعة الدوائية.'],
  ['نهجنا من A إلى Z', 'نهج متكامل من البداية إلى التسليم'],
  ['يُختبر كل نظام ويُتحقق منه قبل التسليم', 'يُختبر كل نظام ويُتحقَّق من أدائه قبل التسليم'],
  ['أنظمة حلقات مياه معالجة متكاملة', 'أنظمة حلقات مياه منقاة (PW) متكاملة'],
  ['المبادئ وراء كل تركيب نُكمله.', 'المبادئ التي تحكم كل مشروع تركيب ننفذه.'],
  ['جميع التركيبات مصممة لتلبية المعايير الصحية والتنظيمية بمستوى الأدوية.', 'جميع التركيبات مصممة لتلبية المتطلبات الصحية والتنظيمية الخاصة بالصناعات الدوائية.'],
  ['مبنية لتؤدي باستمرار تحت التشغيل المتواصل', 'مصمَّمة لأداء موثوق ومستمر أثناء التشغيل المتواصل وفي ظروف العمليات الصعبة'],
  ['أكثر من 15 عاماً من الخبرة', 'أكثر من 15 عامًا من الخبرة'],
  ['عبر صناعات الأدوية والصناعات الصحية', 'في أنظمة الأنابيب الصحية لقطاعات الأدوية والصناعات ذات المتطلبات الصحية الصارمة'],
  ['ما الذي يجعل تركيب الأنابيب "صحياً"؟', 'ما الذي يميّز تركيبات الأنابيب الصحية (Hygienic Piping)؟'],
  ['باستخدام لحام صحي وميول صحيحة للصرف', 'باستخدام لحامات صحية، وميول تصريف صحيحة، ومواد مطابقة للمتطلبات الدوائية'],
  ['أنظمة تعقيم خطية مصممة للقضاء على المخاطر الميكروبية', 'أنظمة تعقيم في الموقع مصممة للحد من المخاطر الميكروبية والحفاظ على الحالة المعقمة داخل خطوط العمليات الحرجة'],
  ['مبنية للتشغيل المستمر، أنظمتنا مصممة لتؤدي باستمرار تحت ظروف صعبة.', 'صُممت أنظمتنا للتشغيل المستمر ولتقديم أداء موثوق حتى في ظروف التشغيل الصعبة.'],
  ['نهج منظم خطوة بخطوة لكل مشروع أنظمة.', 'نهج منظم خطوة بخطوة لكل مشروع نظام هندسي.'],
  ['لتوصية الحجم المناسب للنظام', 'للتوصية بالسعة المناسبة للنظام'],
  ['تخصصان في اللحام، معيار واحد لا مساومة فيه للجودة.', 'تخصصان في اللحام، ومعيار واحد للجودة لا نقبل فيه أي مساومة.'],
  ['لحام يدوي ماهر للأشكال المعقدة', 'لحام يدوي احترافي للأشكال المعقدة وظروف الموقع التي تتطلب أعلى درجات الدقة والمرونة'],
  ['فريقنا مدرّب ومعتمد وفق معايير اللحام الصحي والصحي.', 'فريقنا مدرّب ومؤهل للعمل وفق معايير اللحام الصحي المعتمدة في الصناعة.'],
  ['دفعة بعد دفعة', 'وصلة بعد أخرى'],
  ['هل يُفحص لحاماتكم ويُوثّق؟', 'هل تُفحص لحاماتكم وتُوثَّق؟'],
  ['ترقية بدون إعادة بناء', 'ترقية الأنظمة دون إعادة بنائها بالكامل'],
  ['دون تكلفة وتوقف إعادة البناء الكامل', 'دون تكاليف وفترات توقف مرتبطة بإعادة البناء الكامل'],
  ['جميع الترقيات مصممة لتلبية والحفاظ على المعايير', 'جميع الترقيات مصممة لتلبية المتطلبات الصحية والحفاظ على الامتثال لها'],
  ['لا منشأتان متشابهتان', 'لا تتشابه منشأتان تمامًا'],
  ['نبقى متاحين لأي دعم متابعة.', 'نبقى متاحين لتقديم دعم ما بعد التسليم عند الحاجة.'],
  ['هندسة النقاء، بناء الثقة', 'نهندس النقاء ونبني الثقة'],
  ['تقديم حلول هندسية متكاملة استثنائية', 'تقديم حلول هندسية متكاملة عالية الكفاءة'],
  ['خطوط نقل المرافق', 'شبكات أنابيب المرافق (Utility Piping)'],
  ['مرشح تهوية ساخن', 'فلاتر تهوية مُسخَّنة (Heated Vent Filters)'],
  ['تقود ميدكس محمد سمير و Abdelrahman Fouad', 'يقود ميدكس كلٌّ من محمد سمير وعبدالرحمن فؤاد'],
  ['اطلب عرض سعر، اسأل عن منتج، أو ناقش حلاً متكاملاً', 'اطلب عرض سعر، أو استفسر عن منتج، أو ناقش حلًا متكاملًا مع فريقنا الهندسي'],
  ['4 مقالات رؤى صناعية', '4 مقالات • رؤى صناعية'],
  ['كيف تشكل متطلبات GMP تصميم أنظمة العمليات في المنطقة.', 'كيف تُشكّل متطلبات GMP تصميم أنظمة العمليات في المنطقة.'],
  ['القدرة', 'نطاق الخدمة / التخصص'],
  ['شبكة الأنابيب SS', 'شبكة أنابيب من الستانلس ستيل (SS)'],
  ['أعمال إس إس', 'أعمال ستانلس ستيل'],
  ['الصناعة الصحية', 'الصناعات ذات المتطلبات الصحية الصارمة'],
  ['الصناعات الصحية', 'الصناعات الدوائية والغذائية والحيوية'],
  ['وحدات التوزيع', 'وحدات توزيع المياه المنقاة (Distribution Skids)'],
  ['قامت إدارة البحث الجنائي بالتعاقد مع شركة MIDEX', 'تعاقدت شركة CID مع MIDEX'],
  ['ترقية الهندسة والتركيب', 'هندسة أعمال الترقية وتنفيذها'],
  ['شبكة الصرف الصحي', 'شبكة صرف صحي صناعي'],
  ['حلقة المياه WFI', 'حلقة توزيع مياه الحقن (WFI)'],
  ['خزانات ستانلس ستيل', 'خزانات من الفولاذ المقاوم للصدأ (ستانلس ستيل)'],
];

// Pre-process global replacements: extract exact matches and sort the rest by length descending
const EXACT_MATCH_REPLACEMENTS = new Map<string, string>();
let globalSubstringReplacements: [string, string][] = [];

for (const [oldStr, newStr] of rawGlobalReplacements) {
  if (oldStr === 'القدرة') {
    EXACT_MATCH_REPLACEMENTS.set(oldStr, newStr);
  } else {
    globalSubstringReplacements.push([oldStr, newStr]);
  }
}

// Sort by length (longest first) to prevent partial sub-string match overrides
globalSubstringReplacements.sort((a, b) => b[0].length - a[0].length);

// 2. Product replacements mapping
const productReplacements: Record<string, string> = {
  'product-sanitary-manual-two-way-globe-valve': 'صمام جلوبي صحي يدوي ثنائي الاتجاه',
  'product-sanitary-gate-non-return-valve': 'صمام عدم رجوع صحي من نوع Gate',
  'product-sanitary-magnetic-ball-level-sensor': 'مستشعر مستوى صحي بعوّامة مغناطيسية',
  'product-sanitary-pressure-level-sensor': 'مستشعر مستوى صحي بالضغط',
  'product-sanitary-radar-level-sensor': 'مستشعر مستوى صحي بتقنية الرادار',
  'product-sanitary-capacitance-level-sensor': 'مستشعر مستوى صحي بالسعة الكهربائية',
  'product-sanitary-load-cell-level-sensor': 'مستشعر قياس مستوى صحي بخلايا الحمل',
  'product-sanitary-mass-flowmeter': 'مقياس تدفق كتلي صحي',
  'product-sanitary-pressure-transmitter': 'مرسِل ضغط صحي (Pressure Transmitter)',
  'product-sanitary-conductivity-sensor': 'مستشعر التوصيلية الكهربائية الصحي',
  'product-sanitary-centrifugal-self-priming-pump': 'مضخة طرد مركزي صحية ذاتية التحضير',
  'product-pvc-housing-filters': 'حاويات فلاتر PVC',
  'product-sanitary-vent-filter-housing': 'حاوية فلتر تهوية صحية',
  'product-sanitary-air-cartridge-filter': 'فلتر هواء صحي بخرطوشة',
  'product-sanitary-stainless-steel-single-tank': 'خزان ستانلس ستيل صحي أحادي الجدار',
  'product-sanitary-stainless-steel-isolated-tank': 'خزان ستانلس ستيل صحي معزول',
  'product-sanitary-stainless-steel-double-jacket-tank': 'خزان ستانلس ستيل صحي مزدوج الجاكيت (Double Jacket)',
  'product-sanitary-drain': 'مصرف صحي صناعي',
};

// 3. Case study scope replacements mapping
const caseStudyScopeReplacements: [string, string][] = [
  ['توريد طلاء سداسي لمحطة المياه وقطع غيار لمحطة المياه', 'توريد مبادل حراري صفائحي (Plate Heat Exchanger) لمحطة المياه، بالإضافة إلى قطع الغيار'],
  ['توريد سداسي من النحاس لمحطة المياه وجميع الصمامات المناسبة للسداسي السداسي', 'توريد مبادل حراري نحاسي ملحوم (Brazed Heat Exchanger) لمحطة المياه، مع الصمامات والوصلات اللازمة'],
  ['توريد وتركيب طلاء سداسي لمحطة المياه', 'توريد وتركيب مبادل حراري صفائحي لمحطة المياه'],
  ['توريد مرشحات ساخنة، تصفية خرطوشة', 'توريد فلاتر مُسخَّنة وفلاتر خرطوشية'],
  ['توريد مرشحات الإسكان SS', 'توريد حاويات فلاتر من الستانلس ستيل (SS Filter Housings)'],
  ['توريد فلاتر الإسكان لمحطة المياه', 'توريد حاويات فلاتر لمحطة المياه'],
  ['نظام قياس دفعة PW للتحضير', 'نظام قياس جرعات/كميات المياه المنقاة (PW) لمرحلة التحضير'],
  ['توريد وتركيب غشاء لمحطة المياه', 'توريد وتركيب أغشية لمحطة المياه'],
  ['اختبار الخشونة', 'اختبار خشونة السطح (Surface Roughness Test)'],
  ['حلقة المياه WFI', 'حلقة توزيع مياه الحقن (WFI)'],
];

// Helper to recursively traverse and apply text replacements
function processNode(node: any, isUnderArKey: boolean = false): { changed: boolean; node: any } {
  if (node === null || typeof node !== 'object') {
    // If it's a string inside an `ar` field context, apply replacements
    if (typeof node === 'string' && isUnderArKey) {
      let newValue = node;

      // 1. Check exact matches first
      if (EXACT_MATCH_REPLACEMENTS.has(newValue)) {
        newValue = EXACT_MATCH_REPLACEMENTS.get(newValue)!;
      } else {
        // 2. Apply substring matches globally
        for (const [oldStr, newStr] of globalSubstringReplacements) {
          if (newValue.includes(oldStr)) {
            newValue = newValue.split(oldStr).join(newStr);
          }
        }
      }

      return { changed: newValue !== node, node: newValue };
    }
    return { changed: false, node };
  }

  // Handle arrays
  if (Array.isArray(node)) {
    let changed = false;
    const newNode = node.map((item) => {
      const res = processNode(item, isUnderArKey);
      if (res.changed) changed = true;
      return res.node;
    });
    return { changed, node: newNode };
  }

  // Handle objects
  let changed = false;
  const newNode: any = {};
  for (const [key, value] of Object.entries(node)) {
    // Pass true if the key is `ar`, or if we are already under an `ar` key
    const res = processNode(value, isUnderArKey || key === 'ar');
    if (res.changed) changed = true;
    newNode[key] = res.node;
  }

  return { changed, node: newNode };
}

const COMMIT_BATCH_SIZE = 40;

async function runMigration() {
  console.log('Starting Sanity Arabic audit migration...');

  const docTypes = [
    'aboutPage', 'blogPage', 'blogPost', 'caseStudiesPage', 'caseStudy',
    'certificate', 'clientLogo', 'contactPage', 'eventItem', 'founder',
    'homePage', 'milestone', 'newsItem', 'partner', 'product', 'productCategory',
    'productsPage', 'seoEntry', 'service', 'siteSettings', 'solutionChild',
    'solutionGroup', 'solutionsPage', 'stat', 'testimonial', 'uiMessages'
  ];

  const query = `*[ _type in [${docTypes.map((t) => `"${t}"`).join(', ')}] ]`;
  
  console.log('Fetching documents...');
  const docs = await client.fetch(query);
  console.log(`Found ${docs.length} documents.`);

  const docsToUpdate: any[] = [];
  let productStats = 0;
  let caseStudyStats = 0;

  for (const doc of docs) {
    // 1. Process global text replacements recursively
    const { changed, node: updatedDoc } = processNode(doc);
    let isDocChanged = changed;

    const baseId = updatedDoc._id.replace(/^drafts\./, '');

    // 2. Specific Product replacements (Title overrides)
    if (updatedDoc._type === 'product' && productReplacements[baseId]) {
      if (!updatedDoc.title) updatedDoc.title = {};
      if (updatedDoc.title.ar !== productReplacements[baseId]) {
        updatedDoc.title.ar = productReplacements[baseId];
        isDocChanged = true;
        productStats++;
      }
    }

    // 3. Specific Case Study replacements (Scope overrides)
    if (updatedDoc._type === 'caseStudy' && updatedDoc.scope?.ar) {
      let scopeAr = updatedDoc.scope.ar;
      for (const [oldStr, newStr] of caseStudyScopeReplacements) {
        if (scopeAr.includes(oldStr)) {
          scopeAr = scopeAr.split(oldStr).join(newStr);
        }
      }
      if (scopeAr !== updatedDoc.scope.ar) {
        updatedDoc.scope.ar = scopeAr;
        isDocChanged = true;
        caseStudyStats++;
      }
    }

    if (isDocChanged) {
      docsToUpdate.push(updatedDoc);
    }
  }

  console.log(`Identified ${docsToUpdate.length} documents that require updates.`);
  console.log(` - Product title updates applied: ${productStats}`);
  console.log(` - Case study scope updates applied: ${caseStudyStats}`);

  if (docsToUpdate.length === 0) {
    console.log('No documents require changes. Exiting.');
    return;
  }

  console.log(`Committing changes in batches of ${COMMIT_BATCH_SIZE}...`);

  let batchCount = 0;
  let batch = client.transaction();
  let totalCommitted = 0;

  for (let i = 0; i < docsToUpdate.length; i++) {
    const doc = docsToUpdate[i];
    
    // Strip system metadata fields before committing
    const { _id, _type, _rev, _createdAt, _updatedAt, ...rest } = doc;
    
    batch.createOrReplace({ _id, _type, ...rest });
    batchCount++;

    // Commit when batch is full or on the last item
    if (batchCount === COMMIT_BATCH_SIZE || i === docsToUpdate.length - 1) {
      try {
        await batch.commit();
        totalCommitted += batchCount;
        console.log(`Successfully committed batch (${batchCount} docs). Total: ${totalCommitted}/${docsToUpdate.length}`);
        
        // Reset batch
        batch = client.transaction();
        batchCount = 0;
      } catch (error) {
        console.error('Error committing batch:', error);
      }
    }
  }

  console.log('Migration completed successfully.');
}

runMigration().catch((err) => {
  console.error('Migration failed with error:', err);
  process.exit(1);
});
