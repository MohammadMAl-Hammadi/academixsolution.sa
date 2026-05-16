import { getDb } from "../api/queries/connection";
import { projects, faqEntries, stats } from "./schema";

async function seed() {
  const db = getDb();

  // Seed projects
  const existingProjects = await db.select().from(projects);
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "University Management Dashboard",
        titleAr: "لوحة إدارة الجامعة",
        description: "A comprehensive analytics dashboard for university administrators with real-time data visualization, student performance tracking, and automated reporting.",
        descriptionAr: "لوحة تحليلات شاملة لمسؤولي الجامعة مع تصور البيانات في الوقت الفعلي وتتبع أداء الطلاب والتقارير الآلية.",
        category: "programming",
        imageUrl: "/images/portfolio-1.jpg",
        tags: "React,TypeScript,Node.js,DataViz",
        featured: "true",
      },
      {
        title: "E-Commerce Mobile App",
        titleAr: "تطبيق التجارة الإلكترونية",
        description: "A sleek mobile shopping experience with dark mode, real-time inventory, and seamless checkout process for a premium retail brand.",
        descriptionAr: "تجربة تسوق جوال أنيقة مع الوضع الداكن والمخزون في الوقت الفعلي وعملية دفع سلسة لعلامة تجارية فاخرة.",
        category: "website",
        imageUrl: "/images/portfolio-2.jpg",
        tags: "React Native,Mobile,UI/UX",
        featured: "true",
      },
      {
        title: "AI Research Platform",
        titleAr: "منصة البحث الذكي",
        description: "Machine learning powered research assistant that helps students analyze academic papers, generate citations, and discover relevant sources.",
        descriptionAr: "مساعد بحث يعمل بالتعلم الآلي يساعد الطلاب في تحليل الأوراق الأكاديمية وإنشاء الاستشهادات واكتشاف المصادر ذات الصلة.",
        category: "programming",
        imageUrl: "/images/portfolio-3.jpg",
        tags: "Python,AI,ML,NLP",
        featured: "true",
      },
    ]);
    console.log("Seeded projects");
  }

  // Seed FAQ entries
  const existingFaq = await db.select().from(faqEntries);
  if (existingFaq.length === 0) {
    await db.insert(faqEntries).values([
      {
        question: "What services does Academicx Solution offer?",
        questionAr: "ما هي الخدمات التي يقدمها أكاديميكس سوليوشن؟",
        answer: "We offer comprehensive academic support including homework assistance, exam preparation, project development, research reports, graphic design, website development, and hosting services.",
        answerAr: "نقدم دعمًا أكاديميًا شاملًا يشمل المساعدة في الواجبات والتحضير للامتحانات وتطوير المشاريع والتقارير البحثية والتصميم الجرافيكي وتطوير المواقع وخدمات الاستضافة.",
        category: "general",
        orderIdx: 1,
      },
      {
        question: "How do I request a service?",
        questionAr: "كيف أطلب خدمة؟",
        answer: "Simply navigate to our Services page, select the service you need, fill out the dynamic form with your requirements, and submit. You will receive a response via WhatsApp within minutes.",
        answerAr: "ما عليك سوى الانتقال إلى صفحة الخدمات وتحديد الخدمة التي تحتاجها وتعبئة النموذج الديناميكي بمتطلباتك وإرساله. سوف تتلقى ردًا عبر الواتساب في غضون دقائق.",
        category: "general",
        orderIdx: 2,
      },
      {
        question: "What is the pricing structure?",
        questionAr: "ما هي هيكل الأسعار؟",
        answer: "Pricing varies based on service complexity, urgency, and academic level. Contact us through WhatsApp for a personalized quote tailored to your specific needs.",
        answerAr: "تختلف الأسعار بناءً على تعقيد الخدمة والاستعجال والمستوى الأكاديمي. تواصل معنا عبر الواتساب للحصول على عرض سعر مخصص يناسب احتياجاتك الخاصة.",
        category: "pricing",
        orderIdx: 3,
      },
      {
        question: "How fast can you complete my assignment?",
        questionAr: "ما مدى سرعة إنجاز واجبي؟",
        answer: "We handle urgent requests with delivery times as fast as 3 hours for standard assignments. Complex projects and research papers may require 24-72 hours depending on scope.",
        answerAr: "نحن نتعامل مع الطلبات العاجلة مع أوقات تسليم تصل إلى 3 ساعات للواجبات القياسية. قد تتطلب المشاريع المعقدة وأوراق البحث من 24 إلى 72 ساعة حسب النطاق.",
        category: "general",
        orderIdx: 4,
      },
      {
        question: "Is my information kept confidential?",
        questionAr: "هل يتم الحفاظ على سرية معلوماتي؟",
        answer: "Absolutely. We prioritize client privacy and maintain strict confidentiality for all interactions, submissions, and personal information. Your data is never shared with third parties.",
        answerAr: "بالتأكيد. نحن نعطي الأولوية لخصوصية العملاء ونحافظ على السرية التامة لجميع التفاعلات والتسليمات والمعلومات الشخصية. بياناتك لا تشارك أبدًا مع أطراف ثالثة.",
        category: "general",
        orderIdx: 5,
      },
      {
        question: "Do you offer revisions?",
        questionAr: "هل تقدمون تعديلات؟",
        answer: "Yes, we offer unlimited free revisions within 7 days of delivery to ensure complete satisfaction with the final result.",
        answerAr: "نعم، نقدم تعديلات مجانية غير محدودة خلال 7 أيام من التسليم لضمان الرضا التام عن النتيجة النهائية.",
        category: "general",
        orderIdx: 6,
      },
    ]);
    console.log("Seeded FAQ entries");
  }

  // Seed stats
  const existingStats = await db.select().from(stats);
  if (existingStats.length === 0) {
    await db.insert(stats).values([
      { metricName: "total_requests", metricValue: "0" },
      { metricName: "total_visitors", metricValue: "0" },
      { metricName: "completed_projects", metricValue: "0" },
      { metricName: "satisfaction_rate", metricValue: "98" },
    ]);
    console.log("Seeded stats");
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
