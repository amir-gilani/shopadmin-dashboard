import React, { useState } from 'react';
import {
  FileDown,
  Plus,
  Tag,
  Copy,
  BarChart2,
  Edit2,
  Megaphone,
  ArrowLeft,
  X,
  Check,
  Percent,
  Truck,
  Gift
} from 'lucide-react';
import { initialCoupons } from '../data/discounts';
import { DiscountCoupon, CouponStatus, CouponType } from '../types';

export const DiscountsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<DiscountCoupon[]>(initialCoupons);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | CouponStatus>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Coupon Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<CouponType>('percentage');
  const [newRateTitle, setNewRateTitle] = useState('۲۰٪ تخفیف');
  const [newCapTitle, setNewCapTitle] = useState('تا سقف ۳۰۰,۰۰۰ تومان');
  const [newLimit, setNewLimit] = useState(500);
  const [newMinSpend, setNewMinSpend] = useState(500000);
  const [newExpiry, setNewExpiry] = useState('تا ۳۰ فروردین');

  const filteredCoupons = coupons.filter((c) => {
    if (statusTab !== 'all' && c.status !== statusTab) return false;
    if (typeFilter && c.type !== typeFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!c.code.toLowerCase().includes(q) && !c.campaignTitle.includes(searchQuery)) {
        return false;
      }
    }

    return true;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newTitle) return;

    const newCoupon: DiscountCoupon = {
      id: `coup-${Date.now()}`,
      code: newCode.toUpperCase(),
      campaignTitle: newTitle,
      type: newType,
      discountRateTitle: newRateTitle,
      discountCapTitle: newCapTitle,
      usedCount: 0,
      totalLimit: newLimit,
      usagePercentage: 0,
      minPurchaseAmount: newMinSpend,
      validityDate: newExpiry,
      status: 'active'
    };

    setCoupons([newCoupon, ...coupons]);
    setShowAddModal(false);
    setNewCode('');
    setNewTitle('');
    alert(`کد تخفیف ${newCoupon.code} فعال گردید.`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto" data-purpose="inventory-dashboard">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div className="flex flex-col gap-1.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-500 text-[12px]">
            <a className="hover:text-blue-600 transition-colors" href="#">داشبورد</a>
            <span className="text-slate-300">/</span>
            <span className="hover:text-blue-600 transition-colors">بازاریابی و پروموشن</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">تخفیف‌ها و کوپن‌ها</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              مدیریت کدهای تخفیف و جشنواره‌ها
            </h1>
            <span className="bg-blue-50 text-blue-700 border border-blue-200/70 text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
              ۸ کد فعال در جریان
            </span>
          </div>
          <p className="text-slate-500 text-[13px]">
            پایش عملکرد کدهای تخفیف، اعمال تخفیف‌های زمان‌بندی‌شده و بهینه‌سازی فروشگاه
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert('گزارش عملکرد کوپن‌ها در اکسل دانلود شد.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-[13px] font-medium shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            type="button"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>خروجی اکسل</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-medium shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
            type="button"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>ایجاد کوپن جدید</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">کل سفارشات با تخفیف</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
              <Tag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۱,۴۲۰</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              + ۱۲٪
            </span>
          </div>
          <div className="text-slate-400 text-[11.5px] font-normal leading-tight">نسبت به ماه گذشته</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">مجموع مبلغ تخفیف اعطایی</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-start gap-1.5 my-1.5">
            <span className="text-slate-800 text-[26px] font-bold tracking-tight leading-none">۲۴۸.۵</span>
            <span className="text-slate-400 text-xs font-medium">میلیون تومان</span>
          </div>
          <div className="text-slate-400 text-[11.5px] font-normal leading-tight">حفظ تعادل حاشیه سود</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">نرخ تبدیل جشنواره‌ها</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Gift className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۲۸.۴٪</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              + ۳.۵٪
            </span>
          </div>
          <div className="text-slate-400 text-[11.5px] font-normal leading-tight">استفاده در نهایی‌سازی خرید</div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">پراستفاده‌ترین کمپین جاری</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <BarChart2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-start gap-2 my-1.5">
            <span className="text-blue-600 font-mono text-[22px] font-bold tracking-tight leading-none">
              YALDA1403
            </span>
          </div>
          <div className="text-slate-400 text-[11.5px] font-normal leading-tight">
            ۴۲۰ بار مصرف موفق (۸۴٪ ظرفیت)
          </div>
        </div>
      </div>

      {/* Upcoming Campaign Highlight Banner */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Megaphone className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-slate-800">جشنواره تخفیف بهاره ۱۴۰۴</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                بزودی فعال می‌شود
              </span>
            </div>
            <p className="text-slate-500 text-[13px] mt-0.5">
              سیستم هوشمند بهینه‌سازی کدهای کوپن و اعمال خودکار تخفیف بر اساس سابقه خرید مشتریان
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 w-full lg:w-auto justify-end flex-wrap">
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-2xs">
            <div className="flex -space-x-2 space-x-reverse items-center shrink-0">
              <div
                title="امیر گیلانی (مدیر ارشد)"
                className="w-7 h-7 rounded-full ring-2 ring-white bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs"
              >
                ا.گ
              </div>
              <div
                title="سارا محمدی"
                className="w-7 h-7 rounded-full ring-2 ring-white bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs"
              >
                س.م
              </div>
              <div
                title="نیما پارسا"
                className="w-7 h-7 rounded-full ring-2 ring-white bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs"
              >
                ن.پ
              </div>
              <div
                title="۳ مدیر دیگر"
                className="w-7 h-7 rounded-full ring-2 ring-white bg-slate-200 text-slate-700 text-[9.5px] font-bold flex items-center justify-center shrink-0 shadow-xs"
              >
                +۳
              </div>
            </div>
            <span className="text-[12px] text-slate-600 font-medium">مدیران دارای دسترسی</span>
          </div>

          <button
            onClick={() => alert('تنظیمات کمپین‌های تخفیف فصلی باز شد.')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[12.5px] font-bold transition-colors cursor-pointer border border-blue-200/60"
            type="button"
          >
            <span>تنظیمات کمپین‌ها</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Coupons Table & Filters Hub */}
      <div className="w-full flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {/* Top Toolbar */}
        <div className="p-4 flex flex-col gap-3.5 border-b border-slate-100 bg-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی کد کوپن یا نام کمپین..."
                className="w-full pl-3 pr-9 py-2 text-[13px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-end flex-wrap">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">نوع تخفیف: همه موارد</option>
                <option value="percentage">درصدی (٪)</option>
                <option value="fixed">مبلغ ثابت (تومان)</option>
                <option value="free_shipping">ارسال رایگان</option>
              </select>

              <select
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">مخاطبان: عموم مشتریان</option>
                <option value="first_time">خرید اولی‌ها</option>
                <option value="vip">باشگاه وفاداری VIP</option>
                <option value="abandoned_cart">سبدهای رها شده</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 select-none border-t border-slate-100/80 pt-3 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => setStatusTab('all')}
              className={`px-3.5 py-1.5 rounded-xl font-medium text-[12.5px] whitespace-nowrap transition-all cursor-pointer ${
                statusTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              همه کوپن‌ها (۲۴)
            </button>
            <button
              onClick={() => setStatusTab('active')}
              className={`px-3.5 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                statusTab === 'active'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              فعال (۸)
            </button>
            <button
              onClick={() => setStatusTab('scheduled')}
              className={`px-3.5 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                statusTab === 'scheduled'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              زمان‌بندی شده (۳)
            </button>
            <button
              onClick={() => setStatusTab('capacity_reached')}
              className={`px-3.5 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                statusTab === 'capacity_reached'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              تکمیل ظرفیت (۴)
            </button>
            <button
              onClick={() => setStatusTab('expired')}
              className={`px-3.5 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                statusTab === 'expired'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              منقضی شده (۹)
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto w-full no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <table className="w-full text-right border-collapse min-w-[780px] lg:min-w-full">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-[12px] select-none">
              <tr>
                <th className="py-3.5 px-4 font-semibold text-right">کد کوپن و کمپین</th>
                <th className="py-3.5 px-3 font-semibold text-center w-36">نوع و نرخ تخفیف</th>
                <th className="py-3.5 px-3 font-semibold text-center w-44">سقف و وضعیت مصرف</th>
                <th className="py-3.5 px-3 font-semibold text-center w-32">حداقل خرید</th>
                <th className="py-3.5 px-3 font-semibold text-center w-28">اعتبار زمانی</th>
                <th className="py-3.5 px-3 font-semibold text-center w-28">وضعیت</th>
                <th className="py-3.5 px-4 font-semibold text-center w-24 shrink-0">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-[13px]">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 select-none border ${
                          coupon.type === 'free_shipping'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : coupon.type === 'fixed'
                            ? 'bg-purple-50 text-purple-600 border-purple-100'
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}
                      >
                        {coupon.type === 'free_shipping' ? (
                          <Truck className="w-5 h-5" />
                        ) : coupon.type === 'fixed' ? (
                          <Gift className="w-5 h-5" />
                        ) : (
                          <Tag className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-600 tracking-wider text-xs">
                            {coupon.code}
                          </span>
                          <button
                            onClick={() => handleCopy(coupon.code)}
                            className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="کپی کد"
                          >
                            {copiedCode === coupon.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <span className="text-[11.5px] text-slate-500 truncate">{coupon.campaignTitle}</span>
                      </div>
                    </div>
                  </td>

                  {/* Rate */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <div className="flex flex-col items-center justify-center">
                      <span
                        className={`font-bold text-[13px] ${
                          coupon.type === 'free_shipping' ? 'text-emerald-600' : 'text-slate-800'
                        }`}
                      >
                        {coupon.discountRateTitle}
                      </span>
                      <span className="text-slate-400 text-[11px]">{coupon.discountCapTitle}</span>
                    </div>
                  </td>

                  {/* Usage Progress */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="flex flex-col gap-1 w-36 mx-auto">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium">
                          {coupon.usedCount.toLocaleString('fa-IR')} از {coupon.totalLimit.toLocaleString('fa-IR')}
                        </span>
                        <span className="text-blue-600 font-bold">{coupon.usagePercentage}٪</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            coupon.type === 'free_shipping'
                              ? 'bg-emerald-600'
                              : coupon.type === 'fixed'
                              ? 'bg-purple-600'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${coupon.usagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Min Spend */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <div className="flex items-baseline gap-1 justify-center">
                      <span className="font-bold text-slate-800 text-[13px]">
                        {coupon.minPurchaseAmount.toLocaleString('fa-IR')}
                      </span>
                      <span className="text-slate-400 text-[11px]">تومان</span>
                    </div>
                  </td>

                  {/* Validity */}
                  <td className="py-3.5 px-3 text-center text-slate-500 text-[12px] whitespace-nowrap">
                    {coupon.validityDate}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    {coupon.status === 'active' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>فعال
                      </span>
                    )}
                    {coupon.status === 'scheduled' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>زمان‌بندی شده
                      </span>
                    )}
                    {coupon.status === 'capacity_reached' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>تکمیل ظرفیت
                      </span>
                    )}
                    {coupon.status === 'expired' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>منقضی شده
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center shrink-0">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => alert(`گزارش آماری مصرف کوپن ${coupon.code}: ${coupon.usedCount} بار استفاده`)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="گزارش آمار"
                      >
                        <BarChart2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`ویرایش کوپن ${coupon.code}`)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title="ویرایش کوپن"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="py-3.5 px-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 flex-wrap gap-2">
          <span>نمایش ۱ تا {filteredCoupons.length} از ۲۴ کد تخفیف</span>
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700 disabled:opacity-40" disabled type="button">
              قبلی
            </button>
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold">۱</span>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۲</button>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۳</button>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">بعدی</button>
          </div>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">ایجاد کد کوپن تخفیف جدید</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">کد کوپن (حروف انگلیسی یا عدد) *</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="مثال: SPRING20"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-left uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">عنوان کمپین *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: تخفیف ویژه افتتاحیه شعبه جدید"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">نوع تخفیف</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as CouponType)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="percentage">درصدی (%)</option>
                    <option value="fixed">مبلغ ثابت (تومان)</option>
                    <option value="free_shipping">ارسال رایگان</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">سقف مصرف کل</label>
                  <input
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">حداقل مبلغ خرید (تومان)</label>
                  <input
                    type="number"
                    value={newMinSpend}
                    onChange={(e) => setNewMinSpend(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">مهلت اعتبار</label>
                  <input
                    type="text"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    placeholder="مثال: تا ۲۹ اسفند"
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  فعالسازی کد تخفیف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
