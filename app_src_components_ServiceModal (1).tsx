import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";
import {
  BookOpen,
  FileText,
  Monitor,
  Palette,
  Server,
  GraduationCap,
  Send,
  Loader2,
} from "lucide-react";

export interface ServiceType {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr: string;
}

export const services: ServiceType[] = [
  {
    id: "homework",
    nameAr: "حل الواجبات",
    nameEn: "Homework Help",
    icon: "book",
    descriptionAr: "حل واجباتك باحترافية ودقة عالية في جميع المواد",
  },
  {
    id: "exam",
    nameAr: "المساعدة في الامتحانات",
    nameEn: "Exam Help",
    icon: "graduation",
    descriptionAr: "تحضير ومساعدة في الامتحانات أونلاين وفي الموقع",
  },
  {
    id: "project",
    nameAr: "المشاريع البرمجية",
    nameEn: "Programming Projects",
    icon: "monitor",
    descriptionAr: "تطوير المشاريع البرمجية بجميع اللغات والتقنيات",
  },
  {
    id: "research",
    nameAr: "التقارير البحثية",
    nameEn: "Research Reports",
    icon: "file",
    descriptionAr: "إعداد تقارير بحثية أكاديمية بمعايير علمية",
  },
  {
    id: "design",
    nameAr: "التصميم الجرافيكي",
    nameEn: "Graphic Design",
    icon: "palette",
    descriptionAr: "تصميم الهويات البصرية والمطبوعات والبنرات",
  },
  {
    id: "website",
    nameAr: "تصميم المواقع",
    nameEn: "Website Design",
    icon: "monitor",
    descriptionAr: "تصميم وتطوير مواقع الويب المتكاملة",
  },
  {
    id: "hosting",
    nameAr: "الاستضافة",
    nameEn: "Hosting",
    icon: "server",
    descriptionAr: "استضافة آمنة وسريعة لمواقعك وتطبيقاتك",
  },
];

function ServiceIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  const props = { size, className: "text-[#00F0FF]" };
  switch (icon) {
    case "book":
      return <BookOpen {...props} />;
    case "graduation":
      return <GraduationCap {...props} />;
    case "monitor":
      return <Monitor {...props} />;
    case "file":
      return <FileText {...props} />;
    case "palette":
      return <Palette {...props} />;
    case "server":
      return <Server {...props} />;
    default:
      return <BookOpen {...props} />;
  }
}

interface ServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId?: string;
}

export default function ServiceModal({
  open,
  onOpenChange,
  serviceId,
}: ServiceModalProps) {
  const [selectedService, setSelectedService] = useState<string>(
    serviceId || "homework"
  );
  const [subject, setSubject] = useState("");
  const [university, setUniversity] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [examDateTime, setExamDateTime] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [courseName, setCourseName] = useState("");
  const [details, setDetails] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const createRequest = trpc.serviceRequest.create.useMutation({
    onSuccess: () => {
      const service = services.find((s) => s.id === selectedService);
      const message = `مرحباً أكاديميكس سوليوشن،\nأود طلب خدمة: ${service?.nameAr}\nالمادة: ${subject}\nالجامعة: ${university}${
        selectedService === "exam"
          ? `\nعدد الأسئلة: ${questionCount}\nوقت الاختبار: ${examDateTime}`
          : `\nالمقرر: ${courseName}\nتاريخ التسليم: ${deliveryDate}`
      }${details ? `\nالتفاصيل: ${details}` : ""}\nرقمي: ${whatsappNumber}`;
      window.open(
        `https://wa.me/967730087023?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      toast.success("تم إرسال طلبك! سيتم توجيهك إلى واتساب");
      resetForm();
      onOpenChange(false);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
    },
  });

  const resetForm = () => {
    setSubject("");
    setUniversity("");
    setQuestionCount("");
    setExamDateTime("");
    setDeliveryDate("");
    setCourseName("");
    setDetails("");
    setWhatsappNumber("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !university) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    if (selectedService === "exam" && (!questionCount || !examDateTime)) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    if (selectedService !== "exam" && (!deliveryDate || !courseName)) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    createRequest.mutate({
      serviceType: selectedService,
      subject,
      university,
      questionCount: selectedService === "exam" ? questionCount : undefined,
      examDateTime: selectedService === "exam" ? examDateTime : undefined,
      deliveryDate: selectedService !== "exam" ? deliveryDate : undefined,
      courseName: selectedService !== "exam" ? courseName : undefined,
      details: details || undefined,
      whatsappNumber: whatsappNumber || undefined,
    });
  };

  const isExamService = selectedService === "exam";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-[#0B1120] border border-white/10 backdrop-blur-2xl max-w-lg w-[95%] max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#E6F7FF] text-center">
            طلب خدمة
          </DialogTitle>
        </DialogHeader>

        {/* Service Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-1.5 ${
                selectedService === service.id
                  ? "border-[#00F0FF]/40 bg-[#00F0FF]/10 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                  : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
              }`}
            >
              <ServiceIcon icon={service.icon} size={18} />
              <span className="text-[10px] text-[#E6F7FF] font-medium">
                {service.nameAr}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#8CA0B3] mb-1">
              {isExamService ? "المادة *" : "الموضوع / المادة *"}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all"
              placeholder={isExamService ? "مثال: الرياضيات" : "مثال: برمجة الويب"}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-[#8CA0B3] mb-1">الجامعة *</label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all"
              placeholder="مثال: جامعة الملك سعود"
              required
            />
          </div>

          {isExamService ? (
            <>
              <div>
                <label className="block text-xs text-[#8CA0B3] mb-1">
                  عدد الأسئلة *
                </label>
                <input
                  type="text"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all"
                  placeholder="مثال: 30 سؤال"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[#8CA0B3] mb-1">
                  تاريخ ووقت الاختبار *
                </label>
                <input
                  type="datetime-local"
                  value={examDateTime}
                  onChange={(e) => setExamDateTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs text-[#8CA0B3] mb-1">
                  المقرر الدراسي *
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all"
                  placeholder="مثال: CS101 مقدمة في البرمجة"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[#8CA0B3] mb-1">
                  تاريخ التسليم *
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-[#8CA0B3] mb-1">تفاصيل إضافية</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all resize-none"
              placeholder="أضف أي تفاصيل أو متطلبات خاصة..."
            />
          </div>

          <div>
            <label className="block text-xs text-[#8CA0B3] mb-1">
              رقم واتساب (للتواصل)
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1B2838]/60 border border-white/10 rounded-xl text-sm text-[#E6F7FF] placeholder-[#8CA0B3]/40 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/20 transition-all"
              placeholder="مثال: +966500000000"
            />
          </div>

          <button
            type="submit"
            disabled={createRequest.isPending}
            className="w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#00F0FF] to-[#2E5BFF] text-[#060A12] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {createRequest.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            إرسال الطلب عبر واتساب
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
