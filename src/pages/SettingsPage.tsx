import React, { useState } from 'react';
import {
  Settings,
  Store,
  Truck,
  CreditCard,
  Bell,
  Shield,
  Save,
  Check
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [storeName, setStoreName] = useState('فروشگاه اینترنتی شاپ‌ادمین');
  const [storeUrl, setStoreUrl] = useState('https://shopadmin.ir');
  const [supportPhone, setSupportPhone] = useState('۰۲۱-۸۸۹۹۰۰۱۱');
  const [taxPercent, setTaxPercent] = useState('9');
  const [activeTab, setActiveTab] = useState<'general' | 'shipping' | 'payment' | 'sms'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">تنظیمات کلی سیستم</h1>
          <p className="text-xs text-slate-500 mt-1">پیکربندی هویت فروشگاه، درگاه‌های پرداخت، روش‌های ارسال و اعلان‌های پیامکی</p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Check className="w-4 h-4" />
            تنظیمات با موفقیت ذخیره شد
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'general' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>مشخصات فروشگاه</span>
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'shipping' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>روش‌های حمل‌ونقل</span>
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'payment' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>درگاه‌های پرداخت</span>
        </button>
        <button
          onClick={() => setActiveTab('sms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'sms' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>پنل پیامک و اطلاع‌رسانی</span>
        </button>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">اطلاعات پایه و هویت حقوقی</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">نام رسمی فروشگاه</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">آدرس دامنه وب‌سایت</label>
                <input
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none font-mono text-left"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">شماره تلفن مرکز پشتیبانی</label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">نرخ مالیات بر ارزش افزوده (VAT ٪)</label>
                <input
                  type="number"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">پیکربندی سرویس‌های لجستیک و ارسال کالا</h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">پست پیشتاز جمهوری اسلامی ایران</p>
                  <span className="text-[11px] text-slate-400">سراسر کشور • تحویل ۲ الی ۳ روز کاری</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">تیپاکس اکسپرس (درب به درب)</p>
                  <span className="text-[11px] text-slate-400">شهرهای تحت پوشش • تحویل ۲۴ ساعته</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">پیک اختصاصی شهری (تهران و کلانشهرها)</p>
                  <span className="text-[11px] text-slate-400">ارسال زیر ۲ ساعت</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">درگاه‌های پرداخت اینترنتی متصل به شاپرک</h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">به‌پرداخت ملت (PSP شاپرک)</p>
                  <span className="text-[11px] text-emerald-600 font-medium">متصل و فعال • ترمینال ۹۸۴۴۱۰</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  پیش‌فرض
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">زرین‌پال (ZarinPal IPG)</p>
                  <span className="text-[11px] text-slate-500">متصل به عنوان درگاه پشتیبان</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sms' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">اطلاع‌رسانی خودکار پیامکی</h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <label className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-slate-50">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
                <span>ارسال پیامک تایید سفارش و کد رهگیری پستی به خریدار</span>
              </label>
              <label className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-slate-50">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
                <span>ارسال پیامک یادآوری سبد خرید پرداخت‌نشده بعد از ۳۰ دقیقه</span>
              </label>
              <label className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-slate-50">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
                <span>پیامک هشدار کسری موجودی به مدیر انبار هنگام رسیدن به نقطه ROP</span>
              </label>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره کلیه تنظیمات</span>
          </button>
        </div>
      </form>
    </div>
  );
};
