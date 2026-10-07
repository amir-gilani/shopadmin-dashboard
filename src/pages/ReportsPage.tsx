import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  FileDown,
  Percent,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const provinces = [
    { name: 'تهران', sales: 485000000, share: 38, count: 480 },
    { name: 'اصفهان', sales: 268000000, share: 21, count: 260 },
    { name: 'خراسان رضوی (مشهد)', sales: 204000000, share: 16, count: 198 },
    { name: 'فارس (شیراز)', sales: 165000000, share: 13, count: 162 },
    { name: 'آذربایجان شرقی (تبریز)', sales: 153000000, share: 12, count: 144 }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">گزارش‌ها و هوش تجاری (Analytics)</h1>
          <p className="text-xs text-slate-500 mt-1">تحلیل رفتار خرید کاربران، توزیع جغرافیایی سفارش‌ها و قیف تبدیل فروشگاه</p>
        </div>

        <button
          onClick={() => alert('گزارش تحلیلی کامل در قالب PDF صادر گردید.')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 cursor-pointer"
        >
          <FileDown className="w-4 h-4" />
          <span>دریافت PDF گزارش تحلیلی</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">نرخ تبدیل بازدید به خرید</span>
          <p className="text-2xl font-black text-slate-900 mt-2">۳.۴۲٪</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">+ ۰.۶٪ بالاتر از میانگین صنعت</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">میانگین ارزش طول عمر مشتری (LTV)</span>
          <p className="text-2xl font-black text-slate-900 mt-2">۳,۸۵۰,۰۰۰ تومان</p>
          <span className="text-[11px] text-blue-600 font-bold mt-1 block">۳.۲ سفارش سالانه</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">نرخ حفظ و بازگشت خریداران</span>
          <p className="text-2xl font-black text-slate-900 mt-2">۶۸.۰٪</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">وفاداری بالای مشتریان</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">میانگین زمان پردازش مرسولات</span>
          <p className="text-2xl font-black text-slate-900 mt-2">۳.۶ ساعت</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">۹۹.۲٪ ارسال به موقع</span>
        </div>
      </div>

      {/* Geographical & Funnel Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Geographical provinces (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">توزیع استانی ارزش فروش در ایران</h3>
              <p className="text-xs text-slate-400 mt-0.5">۵ استان با بیشترین حجم سفارش و پرداخت موفق</p>
            </div>
            <MapPin className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-4 pt-1">
            {provinces.map((prov, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{prov.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{prov.count} مرسوله</span>
                    <strong className="text-slate-900">{prov.sales.toLocaleString('fa-IR')} تومان</strong>
                    <span className="text-blue-600 font-bold w-8 text-left">{prov.share}٪</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${prov.share * 2.2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Box (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">قیف تبدیل فروشگاه (Funnel)</h3>
            <span className="text-xs text-slate-400">۳۰ روز اخیر</span>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
              <span className="text-slate-500 block text-[11px]">۱. بازدید از کاتالوگ و محصولات</span>
              <span className="text-sm font-black text-slate-800">۳۷,۵۰۰ کاربر</span>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <span className="text-slate-500 block text-[11px]">۲. افزودن به سبد خرید</span>
              <span className="text-sm font-black text-slate-800">۴,۸۹۰ کاربر (۱۳.۰٪)</span>
            </div>

            <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100">
              <span className="text-slate-500 block text-[11px]">۳. ورود به درگاه پرداخت</span>
              <span className="text-sm font-black text-slate-800">۱,۳۵۰ کاربر (۲۷.۶٪)</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-emerald-700 block text-[11px] font-bold">۴. پرداخت موفق نهایی</span>
              <span className="text-sm font-black text-emerald-800">۱,۲۸۴ سفارش (۹۵.۱٪)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
