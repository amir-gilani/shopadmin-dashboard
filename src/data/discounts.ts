import { DiscountCoupon } from '../types';

export const initialCoupons: DiscountCoupon[] = [
  {
    id: 'coup-1',
    code: 'NOROOZ1404',
    campaignTitle: 'جشنواره ویژه نوروز و سال نو',
    type: 'percentage',
    discountRateTitle: '۲۵٪ تخفیف',
    discountCapTitle: 'تا سقف ۴۵۰,۰۰۰ تومان',
    usedCount: 350,
    totalLimit: 500,
    usagePercentage: 70,
    minPurchaseAmount: 800000,
    validityDate: 'تا ۲۹ اسفند',
    status: 'active'
  },
  {
    id: 'coup-2',
    code: 'FREESHIP',
    campaignTitle: 'ارسال رایگان سفارش‌های اکسپرس',
    type: 'free_shipping',
    discountRateTitle: 'ارسال رایگان',
    discountCapTitle: 'سراسر کشور',
    usedCount: 180,
    totalLimit: 200,
    usagePercentage: 90,
    minPurchaseAmount: 500000,
    validityDate: 'تا ۲۵ فروردین',
    status: 'active'
  },
  {
    id: 'coup-3',
    code: 'FIRSTBUY',
    campaignTitle: 'هدیه اولین سفارش کاربران جدید',
    type: 'fixed',
    discountRateTitle: '۱۰۰,۰۰۰ تومان',
    discountCapTitle: 'کسر مستقیم از فاکتور',
    usedCount: 940,
    totalLimit: 1000,
    usagePercentage: 94,
    minPurchaseAmount: 350000,
    validityDate: 'نامحدود',
    status: 'active'
  },
  {
    id: 'coup-4',
    code: 'YALDA1403',
    campaignTitle: 'کمپین تخفیف ویژه شب یلدا',
    type: 'percentage',
    discountRateTitle: '۳۰٪ تخفیف',
    discountCapTitle: 'تا سقف ۶۰۰,۰۰۰ تومان',
    usedCount: 420,
    totalLimit: 500,
    usagePercentage: 84,
    minPurchaseAmount: 1000000,
    validityDate: 'منقضی شده',
    status: 'expired'
  },
  {
    id: 'coup-5',
    code: 'VIPCLUB',
    campaignTitle: 'تخفیف ویژه باشگاه مشتریان طلایی',
    type: 'percentage',
    discountRateTitle: '۱۵٪ بدون سقف',
    discountCapTitle: 'مخصوص اعضای VIP',
    usedCount: 150,
    totalLimit: 150,
    usagePercentage: 100,
    minPurchaseAmount: 1500000,
    validityDate: 'تکمیل ظرفیت',
    status: 'capacity_reached'
  },
  {
    id: 'coup-6',
    code: 'BAHAR1404',
    campaignTitle: 'جشنواره تخفیف بهاره ۱۴۰۴',
    type: 'percentage',
    discountRateTitle: '۲۰٪ تخفیف',
    discountCapTitle: 'تا سقف ۳۰۰,۰۰۰ تومان',
    usedCount: 0,
    totalLimit: 800,
    usagePercentage: 0,
    minPurchaseAmount: 600000,
    validityDate: 'شروع از ۱۵ فروردین',
    status: 'scheduled'
  }
];
