import React, { useState } from 'react';
import {
  FileDown,
  BarChart3,
  Calendar,
  Wallet,
  TrendingUp,
  Receipt,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';
import { initialTransactions } from '../data/transactions';
import { Transaction } from '../types';

export const SalesPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [periodTab, setPeriodTab] = useState<'today' | '7days' | '30days' | 'season' | 'year'>('30days');
  const [trxFilter, setTrxFilter] = useState<'all' | 'settled' | 'pending' | 'refunded'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((t) => {
    if (trxFilter === 'settled' && !t.status.includes('settled')) return false;
    if (trxFilter === 'pending' && t.status !== 'pending_paya') return false;
    if (trxFilter === 'refunded' && t.status !== 'refunded') return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto" data-purpose="inventory-dashboard">
      {/* Top Context & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div className="flex flex-col gap-1.5 min-w-0">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
            <a className="hover:text-blue-600 transition-colors" href="#">داشبورد</a>
            <span className="text-slate-300">/</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">امور مالی و گزارش‌ها</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-semibold">فروش و درآمد</span>
          </nav>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              گزارش جامع فروش و درآمد مالی
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              بازه انتخابی: ۳۰ روز اخیر
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert('خروجی صورت‌های مالی در قالب اکسل دانلود شد.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 font-medium text-xs hover:bg-slate-50 hover:text-slate-900 transition-all shadow-xs cursor-pointer"
            type="button"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>خروجی اکسل / CSV</span>
          </button>
          <button
            onClick={() => alert('گزارش رسمی تراز مالی آماده گردید.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            type="button"
          >
            <BarChart3 className="w-4 h-4" />
            <span>دریافت گزارش مالی</span>
          </button>
        </div>
      </div>

      {/* Time Period Selector Tabs */}
      <div className="bg-white border border-slate-200/70 rounded-2xl p-1.5 shadow-xs inline-flex flex-wrap items-center gap-1 self-start">
        <button
          onClick={() => setPeriodTab('today')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            periodTab === 'today' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          type="button"
        >
          امروز
        </button>
        <button
          onClick={() => setPeriodTab('7days')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            periodTab === '7days' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          type="button"
        >
          ۷ روز اخیر
        </button>
        <button
          onClick={() => setPeriodTab('30days')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer ${
            periodTab === '30days' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
          type="button"
        >
          ۳۰ روز اخیر
        </button>
        <button
          onClick={() => setPeriodTab('season')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            periodTab === 'season' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          type="button"
        >
          فصل جاری
        </button>
        <button
          onClick={() => setPeriodTab('year')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            periodTab === 'year' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
          type="button"
        >
          سالانه
        </button>
        <span className="w-px h-4 bg-slate-200 mx-1"></span>
        <button
          onClick={() => alert('تقویم شمسی انتخاب بازه دلخواه تاریخ باز شد.')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium transition-colors cursor-pointer"
          type="button"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>بازه دلخواه</span>
        </button>
      </div>

      {/* 4 Key Performance Metrics (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1: Gross Revenue */}
        <div className="border border-slate-100 shadow-xs rounded-2xl bg-white p-5 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-slate-500 text-xs font-medium">کل درآمد ناخالص</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight">۱,۴۲۰,۸۵۰,۰۰۰</span>
              <span className="text-slate-400 text-xs font-medium">تومان</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-semibold whitespace-nowrap">
                <TrendingUp className="w-3 h-3" />
                ۱۸.۲٪+
              </span>
              <span className="text-slate-400 text-[11px]">نسبت به ماه پیش</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Net Profit */}
        <div className="border border-slate-100 shadow-xs rounded-2xl bg-white p-5 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-slate-500 text-xs font-medium">سود خالص عملیاتی</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight">۳۸۵,۴۰۰,۰۰۰</span>
              <span className="text-slate-400 text-xs font-medium">تومان</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-semibold whitespace-nowrap">
                حاشیه سود: ۲۷.۱٪
              </span>
              <span className="text-slate-400 text-[11px]">سالم و در حال رشد</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Average Order Value */}
        <div className="border border-slate-100 shadow-xs rounded-2xl bg-white p-5 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-slate-500 text-xs font-medium">میانگین ارزش سفارش (AOV)</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100/80">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight">۲,۱۵۰,۰۰۰</span>
              <span className="text-slate-400 text-xs font-medium">تومان</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-semibold whitespace-nowrap">
                <TrendingUp className="w-3 h-3" />
                ۵.۴٪+
              </span>
              <span className="text-slate-400 text-[11px]">ارزش هر سبد خرید</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Successful Transactions */}
        <div className="border border-slate-100 shadow-xs rounded-2xl bg-white p-5 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-slate-500 text-xs font-medium">تراکنش‌های موفق</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/80">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tracking-tight">۶۶۰</span>
              <span className="text-slate-400 text-xs font-medium">تراکنش ثبت‌شده</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                ۹۸.۴٪ نرخ موفقیت درگاه
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical Charts & Visual Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Trend Chart (8 Cols) */}
        <div className="lg:col-span-8 border border-slate-100 bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">روند روزانه و هفتگی درآمد</h2>
              <p className="text-xs text-slate-500 mt-0.5">مقایسه فروش خالص دوره جاری در برابر میانگین دوره قبل</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="text-slate-700">دوره جاری (میلیون تومان)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                <span className="text-slate-400">دوره قبل</span>
              </div>
            </div>
          </div>

          {/* Clean Curved SVG Chart Canvas */}
          <div className="relative w-full h-64 select-none">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 240">
              <defs>
                <linearGradient id="salesPrimaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="salesPrevAreaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              <line stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="800" y1="40" y2="40" />
              <line stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="800" y1="95" y2="95" />
              <line stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="800" y1="150" y2="150" />
              <line stroke="#e2e8f0" strokeWidth="1.5" x1="0" x2="800" y1="205" y2="205" />

              {/* Previous Period Wave */}
              <path
                d="M 0 170 Q 130 150 260 160 T 520 130 T 800 110 L 800 205 L 0 205 Z"
                fill="url(#salesPrevAreaGrad)"
              />
              <path
                d="M 0 170 Q 130 150 260 160 T 520 130 T 800 110"
                fill="none"
                stroke="#94a3b8"
                strokeDasharray="5 5"
                strokeWidth="2"
              />

              {/* Current Period Wave */}
              <path
                d="M 0 190 Q 120 120 240 135 T 480 80 T 640 45 T 800 35 L 800 205 L 0 205 Z"
                fill="url(#salesPrimaryAreaGrad)"
              />
              <path
                d="M 0 190 Q 120 120 240 135 T 480 80 T 640 45 T 800 35"
                fill="none"
                stroke="#2563eb"
                strokeLinecap="round"
                strokeWidth="3"
              />

              {/* Key Data Points */}
              <circle cx="240" cy="135" fill="#2563eb" r="4.5" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="480" cy="80" fill="#2563eb" r="4.5" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="640" cy="45" fill="#2563eb" r="6" stroke="#ffffff" strokeWidth="3" className="animate-pulse" />
              <circle cx="800" cy="35" fill="#2563eb" r="4.5" stroke="#ffffff" strokeWidth="2.5" />
            </svg>

            {/* Tooltip Tag on Peak */}
            <div className="absolute top-1 right-[18%] bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg pointer-events-none transform translate-x-1/2">
              پنج‌شنبه: ۵۴,۸۰۰,۰۰۰ تومان
            </div>
          </div>

          {/* X-Axis Labels */}
          <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-500 mt-3 pt-2 border-t border-slate-100">
            <span>شنبه</span>
            <span>یکشنبه</span>
            <span>دوشنبه</span>
            <span>سه‌شنبه</span>
            <span>چهارشنبه</span>
            <span className="font-bold text-blue-600">پنج‌شنبه</span>
            <span>جمعه</span>
          </div>
        </div>

        {/* Revenue Sources Breakdown (4 Cols) */}
        <div className="lg:col-span-4 border border-slate-100 bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">تفکیک منابع درآمدی</h2>
              <PieChart className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 mb-6">سهم درگاه‌ها و روش‌های پرداختی از کل درآمد این ماه</p>

            {/* Visual Proportion Stack Bar */}
            <div className="h-3.5 w-full rounded-full bg-slate-100 flex overflow-hidden p-0.5 gap-0.5 mb-6">
              <div className="h-full bg-blue-600 rounded-r-full" style={{ width: '68%' }} title="درگاه آنلاین ۶۸٪"></div>
              <div className="h-full bg-emerald-500" style={{ width: '22%' }} title="واریز فیش ۲۲٪"></div>
              <div className="h-full bg-indigo-500 rounded-l-full" style={{ width: '10%' }} title="کیف پول ۱۰٪"></div>
            </div>

            {/* Channels List */}
            <div className="space-y-3">
              {/* Channel 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0"></span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">درگاه آنلاین (شاپرک / زرین‌پال)</p>
                    <span className="text-[11px] text-slate-400">۴۸۴ تراکنش مستقیم</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900">۹۶۶,۱۷۰,۰۰۰</p>
                  <span className="text-[11px] text-blue-600 font-semibold">۶۸.۰٪ سهم</span>
                </div>
              </div>

              {/* Channel 2 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">واریز فیش / کارت به کارت</p>
                    <span className="text-[11px] text-slate-400">۱۲۸ تاییدیه حسابداری</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900">۳۱۲,۵۸۰,۰۰۰</p>
                  <span className="text-[11px] text-emerald-600 font-semibold">۲۲.۰٪ سهم</span>
                </div>
              </div>

              {/* Channel 3 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0"></span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">کیف پول اعتباری و بن خرید</p>
                    <span className="text-[11px] text-slate-400">۴۸ کسر از موجودی</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900">۱۴۲,۱۰۰,۰۰۰</p>
                  <span className="text-[11px] text-indigo-600 font-semibold">۱۰.۰٪ سهم</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              همگام‌سازی لحظه‌ای با سیستم شاپرک
            </span>
            <button
              onClick={() => alert('گزارش تطبیق بانکی با شاپرک تولید شد.')}
              className="text-blue-600 hover:text-blue-700 font-semibold text-xs cursor-pointer"
            >
              گزارش تطبیق بانکی
            </button>
          </div>
        </div>
      </div>

      {/* Transactions & Settlement Ledger Table */}
      <div className="border border-slate-100 bg-white rounded-2xl shadow-xs overflow-hidden flex flex-col mb-4">
        {/* Table Header Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">ریز تراکنش‌ها و تسویه‌حساب‌های اخیر</h2>
            <p className="text-xs text-slate-500 mt-0.5">مشاهده و پیگیری وضعیت تراکنش‌ها، مبالغ واریزی، کارمزدهای شاپرک و تسویه‌ها</p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 overflow-x-auto">
            <button
              onClick={() => setTrxFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                trxFilter === 'all' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              type="button"
            >
              همه تراکنش‌ها
            </button>
            <button
              onClick={() => setTrxFilter('settled')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                trxFilter === 'settled' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              type="button"
            >
              واریز موفق
            </button>
            <button
              onClick={() => setTrxFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                trxFilter === 'pending' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              type="button"
            >
              در انتظار تسویه
            </button>
            <button
              onClick={() => setTrxFilter('refunded')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                trxFilter === 'refunded' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              type="button"
            >
              برگشت وجه
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-right border-collapse divide-y divide-slate-100 table-fixed min-w-[900px]">
            <colgroup>
              <col className="w-[14%]" />
              <col className="w-[12%]" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
              <col className="w-[13%]" />
              <col className="w-[9%]" />
              <col className="w-[14%]" />
              <col className="w-[8%]" />
            </colgroup>
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs font-semibold border-y border-slate-100 select-none">
                <th className="py-3.5 px-4 text-right whitespace-nowrap">کد مرجع / شناسه</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">تاریخ و زمان</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">نام پرداخت‌کننده</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">درگاه و روش</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">مبلغ (تومان)</th>
                <th className="py-3.5 px-4 text-left whitespace-nowrap">کارمزد</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">وضعیت تسویه</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs bg-white">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-blue-600 font-mono text-[12px] font-semibold select-all">
                      {trx.trackingCode}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-slate-800 font-medium text-xs">{trx.date}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{trx.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full ${trx.avatarBg} ${trx.avatarColor} font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-white shadow-xs`}
                      >
                        {trx.customerInitials}
                      </div>
                      <div className="flex flex-col min-w-0 text-right">
                        <span className="font-medium text-slate-900 text-xs truncate">{trx.customerName}</span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5">{trx.phoneMasked}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-2 text-slate-700 font-medium text-xs">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          trx.gatewayType === 'paya'
                            ? 'bg-amber-500'
                            : trx.gatewayType === 'wallet'
                            ? 'bg-indigo-500'
                            : 'bg-blue-600'
                        }`}
                      ></span>
                      <span>{trx.gateway}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span
                      className={`font-bold text-[13.5px] font-mono tracking-tight inline-block text-center ${
                        trx.isNegative ? 'text-rose-600' : 'text-slate-900'
                      }`}
                      dir="ltr"
                    >
                      {trx.isNegative ? `-(${trx.amount.toLocaleString('fa-IR')})` : trx.amount.toLocaleString('fa-IR')}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-left whitespace-nowrap">
                    {trx.fee === 0 ? (
                      <span className="text-emerald-600 font-medium text-xs">رایگان</span>
                    ) : (
                      <span className="text-slate-500 font-mono text-xs">{trx.fee.toLocaleString('fa-IR')}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    {trx.status === 'settled_shaparak' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        تسویه‌شده شاپرک
                      </span>
                    )}
                    {trx.status === 'pending_paya' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                        در انتظار سیکل پایا
                      </span>
                    )}
                    {trx.status === 'refunded' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-medium border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                        برگشت وجه (انصراف)
                      </span>
                    )}
                    {trx.status === 'settled_internal' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-medium border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                        تسویه‌شده داخلی
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => setSelectedReceipt(trx)}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors inline-flex items-center justify-center cursor-pointer"
                      title="مشاهده رسید دیجیتال"
                      type="button"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Minimalistic Bottom Pagination Bar */}
        <div className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>نمایش ردیف ۱ تا {filteredTransactions.length} از مجموع ۶۶۰ تراکنش دوره</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-40" disabled type="button">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs" type="button">
              ۱
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 text-xs font-medium" type="button">
              ۲
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 text-xs font-medium" type="button">
              ۳
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 text-xs font-medium" type="button">
              ۱۳۲
            </button>
            <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors" type="button">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800">رسید الکترونیک شاپرک</h3>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">شماره مرجع RRN:</span>
                <span className="font-mono font-bold text-slate-800">{selectedReceipt.trackingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">پرداخت‌کننده:</span>
                <span className="font-bold text-slate-800">{selectedReceipt.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">تاریخ و ساعت:</span>
                <span>
                  {selectedReceipt.date} - {selectedReceipt.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">درگاه پذیرنده:</span>
                <span>{selectedReceipt.gateway}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3">
                <span className="text-slate-500 font-bold">مبلغ تراکنش:</span>
                <span className="text-base font-black text-blue-600">
                  {selectedReceipt.amount.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-full py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                تایید و بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
