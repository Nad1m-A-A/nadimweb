// Panel copy and contact details. Loaded with the panel, not with the page.

export type StampLang = "en" | "ar" | "ru";

export const contact = {
  site: "https://nadimweb.com",
  siteLabel: "nadimweb.com",
  whatsapp: "https://wa.me/971563952895",
  phone: "tel:+971563952895",
  phoneLabel: "+971 56 395 2895",
  email: "mailto:contact@nadimweb.com",
  emailLabel: "contact@nadimweb.com",
};

type Copy = {
  eyebrow: string;
  headline: string;
  pitch: string;
  servicesTitle: string;
  services: string[];
  visit: string;
  whatsapp: string;
  call: string;
  email: string;
  close: string;
};

export const copy: Record<StampLang, Copy> = {
  en: {
    eyebrow: "This website was designed by",
    headline: "Websites built to grow your sales.",
    pitch:
      "Beautiful design is just the baseline. I build high-converting websites and partner with you for long term success.",
    servicesTitle: "Services",
    services: [
      "Online stores",
      "Business and catalog websites",
      "Landing pages that turn visits into sales",
      "SEO, speed and ongoing support",
    ],
    visit: "Visit website",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
    close: "Close",
  },
  ar: {
    eyebrow: "صمّم هذا الموقع",
    headline: "مواقع مصمّمة لزيادة مبيعاتك.",
    pitch:
      "التصميم الجميل هو الحد الأدنى. أبني مواقع تحقق مبيعات عالية، وأكون شريكك لنجاح طويل الأمد.",
    servicesTitle: "الخدمات",
    services: [
      "متاجر إلكترونية",
      "مواقع الشركات والكتالوجات",
      "صفحات هبوط تحوّل الزيارات إلى مبيعات",
      "تحسين الظهور في البحث والسرعة والدعم المستمر",
    ],
    visit: "زيارة الموقع",
    whatsapp: "واتساب",
    call: "اتصال",
    email: "البريد",
    close: "إغلاق",
  },
  ru: {
    eyebrow: "Этот сайт создал",
    headline: "Сайты, которые увеличивают продажи.",
    pitch:
      "Красивый дизайн лишь базовый уровень. Я создаю сайты, которые продают, и остаюсь вашим партнёром для долгосрочного успеха.",
    servicesTitle: "Услуги",
    services: [
      "Интернет-магазины",
      "Сайты и каталоги для бизнеса",
      "SEO, скорость и поддержка",
      "Лендинги, которые превращают визиты в продажи",
    ],
    visit: "Открыть сайт",
    whatsapp: "WhatsApp",
    call: "Позвонить",
    email: "Почта",
    close: "Закрыть",
  },
};
