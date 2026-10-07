import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  FileDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Package,
  Clock,
  Trophy,
  ShoppingBag,
  Eye
} from 'lucide-react';
import { initialOrders } from '../data/orders';
import { initialProducts } from '../data/products';
import { OrderInvoiceModal } from '../components/common/OrderInvoiceModal';
import { Order } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState<'today' | '7days' | '30days' | 'year'>('30days');
  const [orderFilter, setOrderFilter] = useState<'all' | 'paid' | 'pending' | 'cancelled'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [activeTooltip, setActiveTooltip] = useState(true);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Filter recent orders in bottom table
  const filteredOrders = initialOrders.filter((order) => {
    if (orderFilter === 'paid' && order.paymentStatus !== 'paid') return false;
    if (orderFilter === 'pending' && order.paymentStatus !== 'pending') return false;
    if (orderFilter === 'cancelled' && order.orderStatus !== 'cancelled') return false;
    if (
      orderSearch &&
      !order.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) &&
      !order.customerName.includes(orderSearch)
    ) {
      return false;
    }
    return true;
  }).slice(0, 4);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-7 max-w-7xl w-full mx-auto" data-purpose="dashboard-main-view">
      {/* BEGIN: WelcomeHeaderAndControls */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-normal">
            <span>پیشخوان</span>
            <span className="text-slate-300">/</span>
            <span>گزارش‌های جامع</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-medium">نمای کلی فروشگاه</span>
          </div>

          {/* Greeting Header */}
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            خوش آمدید، امیر گیلانی <span className="inline-block transform origin-bottom-right hover:rotate-12 transition-transform duration-300">👋</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            نمای کلی وضعیت، شاخص‌های رشد تجاری و چرخه پردازش سفارش‌های فروشگاه در یک نگاه
          </p>
        </div>

        {/* Action Buttons & Range Pickers */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          {/* Add Product Button */}
          <button
            onClick={() => navigate('/products/new')}
            type="button"
            className="h-10 inline-flex items-center gap-2 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>افزودن محصول جدید</span>
          </button>

          {/* Time Range Selector Group */}
          <div className="h-10 bg-white p-1 rounded-xl border border-slate-200/80 flex items-center gap-1 text-xs text-slate-600 shadow-xs shrink-0">
            <button
              type="button"
              onClick={() => setSelectedRange('today')}
              className={`h-full px-3 rounded-lg transition-colors cursor-pointer ${
                selectedRange === 'today' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:text-slate-900'
              }`}
            >
              امروز
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('7days')}
              className={`h-full px-3 rounded-lg transition-colors cursor-pointer ${
                selectedRange === '7days' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:text-slate-900'
              }`}
            >
              ۷ روز
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('30days')}
              className={`h-full px-3 rounded-lg transition-colors cursor-pointer ${
                selectedRange === '30days' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:text-slate-900'
              }`}
            >
              ۳۰ روز اخیر
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('year')}
              className={`h-full px-3 rounded-lg transition-colors cursor-pointer ${
                selectedRange === 'year' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:text-slate-900'
              }`}
            >
              امسال
            </button>
          </div>

          {/* Excel Export Button */}
          <button
            onClick={() => alert('گزارش آماری ماهانه در قالب فایل اکسل آماده دانلود شد.')}
            type="button"
            className="h-10 inline-flex items-center gap-1.5 px-3.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-slate-500 stroke-[2]" />
            <span>خروجی اکسل</span>
          </button>
        </div>
      </section>

      {/* BEGIN: KpiMetricsCardsGrid (6 Key Stat Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4" data-purpose="kpi-metrics-grid">
        {/* Card 1: کل فروش ناخالص */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-500">کل فروش ناخالص</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
              +۱۲.۸٪
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
            </span>
          </div>
          <div className="my-3">
            <div className="text-lg font-black text-slate-900 leading-tight">۲۴۸,۵۰۰,۰۰۰</div>
            <div className="text-[10px] text-slate-400 mt-0.5">تومان در ۳۰ روز اخیر</div>
          </div>
          {/* Sparkline */}
          <div className="h-7 w-full pt-1">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 25">
              <path d="M0,22 Q25,18 45,12 T80,8 T100,3" fill="none" stroke="#3b82f6" strokeLinecap="round" strokeWidth="2.2" />
              <path d="M0,22 Q25,18 45,12 T80,8 T100,3 L100,25 L0,25 Z" fill="rgba(59, 130, 246, 0.08)" />
            </svg>
          </div>
        </article>

        {/* Card 2: حجم کل سفارش‌ها */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-500">حجم کل سفارش‌ها</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
              +۸.۴٪
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
            </span>
          </div>
          <div className="my-3">
            <div className="text-lg font-black text-slate-900 leading-tight">۱,۲۸۴</div>
            <div className="text-[10px] text-slate-400 mt-0.5">تراکنش موفق پرداختی</div>
          </div>
          <div className="h-7 w-full pt-1">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 25">
              <path d="M0,20 Q30,22 55,14 T85,10 T100,4" fill="none" stroke="#0ea5e9" strokeLinecap="round" strokeWidth="2.2" />
              <path d="M0,20 Q30,22 55,14 T85,10 T100,4 L100,25 L0,25 Z" fill="rgba(14, 165, 233, 0.08)" />
            </svg>
          </div>
        </article>

        {/* Card 3: مشتریان فعال */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-500">مشتریان فعال</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
              +۱۱.۲٪
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
            </span>
          </div>
          <div className="my-3">
            <div className="text-lg font-black text-slate-900 leading-tight">۸,۴۲۱</div>
            <div className="text-[10px] text-slate-400 mt-0.5">کاربر خریدار بازگشتی</div>
          </div>
          <div className="h-7 w-full pt-1">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 25">
              <path d="M0,24 Q25,19 50,15 T80,7 T100,2" fill="none" stroke="#10b981" strokeLinecap="round" strokeWidth="2.2" />
              <path d="M0,24 Q25,19 50,15 T80,7 T100,2 L100,25 L0,25 Z" fill="rgba(16, 185, 129, 0.08)" />
            </svg>
          </div>
        </article>

        {/* Card 4: میانگین هر سفارش */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-500">میانگین هر سفارش</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
              +۴.۲٪
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
            </span>
          </div>
          <div className="my-3">
            <div className="text-lg font-black text-slate-900 leading-tight">۱,۹۳۰,۰۰۰</div>
            <div className="text-[10px] text-slate-400 mt-0.5">تومان به ازای هر سبد</div>
          </div>
          <div className="h-7 w-full pt-1">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 25">
              <path d="M0,21 Q35,16 65,18 T90,9 T100,5" fill="none" stroke="#6366f1" strokeLinecap="round" strokeWidth="2.2" />
              <path d="M0,21 Q35,16 65,18 T90,9 T100,5 L100,25 L0,25 Z" fill="rgba(99, 102, 241, 0.08)" />
            </svg>
          </div>
        </article>

        {/* Card 5: کالاهای موجود انبار */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold text-slate-500">کالاهای موجود انبار</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">
              -۵.۲٪
              <TrendingDown className="w-3 h-3 stroke-[2.5]" />
            </span>
          </div>
          <div className="my-3">
            <div className="text-lg font-black text-slate-900 leading-tight">۴۸۶</div>
            <div className="text-[10px] text-slate-400 mt-0.5">تنوع کالایی آماده فروش</div>
          </div>
          <div className="h-7 w-full pt-1">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 25">
              <path d="M0,10 Q25,8 50,15 T85,20 T100,22" fill="none" stroke="#f59e0b" strokeLinecap="round" strokeWidth="2.2" />
              <path d="M0,10 Q25,8 50,15 T85,20 T100,22 L100,25 L0,25 Z" fill="rgba(245, 158, 11, 0.08)" />
            </svg>
          </div>
        </article>

        {/* Card 6: هشدار موجودی اندک */}
        <article className="bg-gradient-to-br from-rose-50/70 to-red-50/40 rounded-2xl p-4 border border-rose-100 shadow-xs flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-700">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 stroke-[2]" />
              <span>هشدار موجودی اندک</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-bold">فوری</span>
          </div>
          <div className="my-2.5">
            <div className="text-xl font-black text-rose-600 leading-tight">۱۸ کالا</div>
            <div className="text-[10px] text-rose-500 mt-0.5 font-medium">کمتر از ۳ عدد باقی‌مانده</div>
          </div>
          <Link
            to="/inventory"
            className="inline-flex items-center text-[11px] font-bold text-rose-600 hover:text-rose-700 pt-1 group"
          >
            <span>بررسی و شارژ سریع</span>
            <ArrowLeft className="w-3 h-3 mr-1 transform group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
          </Link>
        </article>
      </section>

      {/* BEGIN: AnalyticsRow (Line Trend + Category Donut) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-purpose="analytics-charts-row">
        {/* Right Column: روند درآمد و فروش ماهانه (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h3 className="text-sm font-bold text-slate-800">روند درآمد و فروش ماهانه</h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                مقایسه فروش ناخالص در برابر تسویه‌های تکمیل‌شده به تفکیک دوره‌های ۵ روزه
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-blue-600"></span>
                <span className="text-slate-600 text-[11px]">فروش ناخالص جاری</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 text-[11px]">درآمد قطعی تسویه</span>
              </div>
            </div>
          </div>

          {/* Chart Area Canvas */}
          <div className="relative mt-4 h-64 w-full select-none">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
              <defs>
                <linearGradient id="dashBrandGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="dashEmeraldGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="40" y2="40" />
              <line stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="100" y2="100" />
              <line stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="160" y2="160" />
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="700" y1="220" y2="220" />

              {/* Emerald Line (Settlement) */}
              <path
                d="M0,200 C100,185 200,170 300,150 C400,130 500,80 700,50 L700,220 L0,220 Z"
                fill="url(#dashEmeraldGrad)"
              />
              <path
                d="M0,200 C100,185 200,170 300,150 C400,130 500,80 700,50"
                fill="none"
                stroke="#10b981"
                strokeDasharray="5 3"
                strokeLinecap="round"
                strokeWidth="2.5"
              />

              {/* Blue Line (Gross Sales) */}
              <path
                d="M0,190 C120,130 220,135 340,110 C440,90 520,30 700,15 L700,220 L0,220 Z"
                fill="url(#dashBrandGrad)"
              />
              <path
                d="M0,190 C120,130 220,135 340,110 C440,90 520,30 700,15"
                fill="none"
                stroke="#2563eb"
                strokeLinecap="round"
                strokeWidth="3"
              />

              {/* Day 25 Marker Line */}
              <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" x1="450" x2="450" y1="20" y2="220" />
              <circle cx="450" cy="74" fill="#2563eb" r="5.5" stroke="#ffffff" strokeWidth="3" />
              <circle cx="450" cy="100" fill="#10b981" r="4.5" stroke="#ffffff" strokeWidth="2.5" />
            </svg>

            {/* Interactive Tooltip Pin */}
            {activeTooltip && (
              <div className="absolute top-4 left-[28%] bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700 pointer-events-none text-right z-10 animate-in fade-in">
                <div className="text-[10px] text-slate-400 font-medium">۲۵ فروردین ۱۴۰۳</div>
                <div className="flex items-center justify-between gap-4 mt-1 text-xs">
                  <span className="text-slate-300 text-[11px]">فروش جاری:</span>
                  <span className="font-bold text-emerald-400">۳۸,۴۰۰,۰۰۰ تومان</span>
                </div>
                <div className="flex items-center justify-between gap-4 mt-0.5 text-xs">
                  <span className="text-slate-300 text-[11px]">تسویه قطعی:</span>
                  <span className="font-bold text-blue-300">۳۱,۱۰۰,۰۰۰ تومان</span>
                </div>
              </div>
            )}
          </div>

          {/* Timeline X-Axis Labels */}
          <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-50 px-1 font-medium">
            <span>۱ فروردین</span>
            <span>۵ فروردین</span>
            <span>۱۰ فروردین</span>
            <span>۱۵ فروردین</span>
            <span>۲۰ فروردین</span>
            <span className="text-blue-600 font-bold">۲۵ فروردین</span>
            <span>۳۰ فروردین</span>
          </div>
        </div>

        {/* Left Column: ترکیب فروش دسته‌بندی‌ها (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">ترکیب فروش دسته‌بندی‌ها</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">سهم ارزش فروش به تفکیک شاخه‌ها</p>
            </div>
            <Link to="/categories" className="text-slate-400 hover:text-blue-600">
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Donut SVG */}
          <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="38" stroke="#f1f5f9" strokeWidth="12" />
              {/* Digital 38% */}
              <circle cx="50" cy="50" fill="transparent" r="38" stroke="#2563eb" strokeDasharray="90.7 238.7" strokeDashoffset="0" strokeWidth="12" />
              {/* Beauty 24% */}
              <circle cx="50" cy="50" fill="transparent" r="38" stroke="#10b981" strokeDasharray="57.3 238.7" strokeDashoffset="-90.7" strokeWidth="12" />
              {/* Home 18% */}
              <circle cx="50" cy="50" fill="transparent" r="38" stroke="#f59e0b" strokeDasharray="43 238.7" strokeDashoffset="-148" strokeWidth="12" />
              {/* Fashion 14% */}
              <circle cx="50" cy="50" fill="transparent" r="38" stroke="#8b5cf6" strokeDasharray="33.4 238.7" strokeDashoffset="-191" strokeWidth="12" />
              {/* Other 6% */}
              <circle cx="50" cy="50" fill="transparent" r="38" stroke="#94a3b8" strokeDasharray="14.3 238.7" strokeDashoffset="-224.4" strokeWidth="12" />
            </svg>

            {/* Donut Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] text-slate-400 font-medium">مجموع کاتالوگ</span>
              <span className="text-xl font-black text-slate-900 leading-none my-0.5">۱۰۰٪</span>
              <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full mt-0.5">
                ۵ گروه اصلی
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="space-y-2 text-xs pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-slate-600 text-[11px] font-medium">کالای دیجیتال و گجت</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800 text-[11px]">
                <span>۳۸٪</span>
                <span className="text-slate-400 font-normal text-[10px]">(۹۴.۴ م.ت)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 text-[11px] font-medium">زیبایی و مراقبت فردی</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800 text-[11px]">
                <span>۲۴٪</span>
                <span className="text-slate-400 font-normal text-[10px]">(۵۹.۶ م.ت)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-600 text-[11px] font-medium">خانه و دکوراسیون</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800 text-[11px]">
                <span>۱۸٪</span>
                <span className="text-slate-400 font-normal text-[10px]">(۴۴.۷ م.ت)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span className="text-slate-600 text-[11px] font-medium">پوشاک و مد</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800 text-[11px]">
                <span>۱۴٪</span>
                <span className="text-slate-400 font-normal text-[10px]">(۳۴.۷ م.ت)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span className="text-slate-600 text-[11px] font-medium">متفرقه و اکسسوری</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800 text-[11px]">
                <span>۶٪</span>
                <span className="text-slate-400 font-normal text-[10px]">(۱۴.۹ م.ت)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEGIN: OperationalRow (Order Pipeline + Urgent Stock) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-purpose="operational-pipeline-and-stock">
        {/* Right Card: وضعیت چرخه پردازش سفارش‌ها (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">وضعیت چرخه پردازش سفارش‌ها</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">رهگیری زنجیره تامین و بسته‌بندی مرسولات روز جاری</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-xl font-bold">
                کل جریان جاری: ۱۸۴ مرسوله
              </span>
            </div>

            {/* Pipeline Segmented Progress Bar */}
            <div className="mt-6">
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-rose-500 h-full" style={{ width: '14%' }} title="در انتظار پرداخت" />
                <div className="bg-blue-600 h-full" style={{ width: '35%' }} title="در حال جمع‌آوری" />
                <div className="bg-indigo-500 h-full" style={{ width: '22%' }} title="بسته‌بندی نهایی" />
                <div className="bg-sky-500 h-full" style={{ width: '21%' }} title="تحویل باربری" />
                <div className="bg-emerald-500 h-full" style={{ width: '8%' }} title="تحویل موفق" />
              </div>

              {/* 5 Fulfillment Step Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>در انتظار پرداخت</span>
                  </div>
                  <div className="text-lg font-black text-slate-800">۲۲</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">پیگیری پیامکی</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>در حال جمع‌آوری</span>
                  </div>
                  <div className="text-lg font-black text-slate-800">۶۴</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">انبار مرکزی</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>بسته‌بندی نهایی</span>
                  </div>
                  <div className="text-lg font-black text-slate-800">۴۰</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">لیبل‌گذاری شده</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-1">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                    <span>تحویل باربری</span>
                  </div>
                  <div className="text-lg font-black text-slate-800">۴۴</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">دارای کد رهگیری</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>تحویل موفق</span>
                  </div>
                  <div className="text-lg font-black text-slate-800">۱۴</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">تایید مشتری</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-4">
            <span className="text-slate-500 font-medium">
              میانگین زمان پردازش تا ارسال: <strong className="text-slate-800">۳ ساعت و ۴۰ دقیقه</strong>
            </span>
            <Link
              to="/orders"
              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
            >
              <span>مدیریت کامل مرسولات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Left Card: اولویت‌های بحرانی انبار (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                <h3>اولویت‌های بحرانی انبار</h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-medium">
                ۳ مورد بحرانی
              </span>
            </div>

            {/* List of Critical Items */}
            <div className="divide-y divide-slate-100 mt-2 space-y-2">
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/headphone.jpg"
                    alt="هدفون بی‌سیم پرو مکس"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">هدفون بی‌سیم پرو مکس</h4>
                    <span className="text-[10px] text-slate-400">SKU: HP-4091-BLK</span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-xs font-bold text-rose-600">فقط ۱ عدد</div>
                  <button
                    onClick={() => navigate('/inventory')}
                    className="mt-1 px-2.5 py-0.5 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    شارژ
                  </button>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/coffee-v60.jpg"
                    alt="مجموعه دم‌آوری سرامیک"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">مجموعه دم‌آوری سرامیک...</h4>
                    <span className="text-[10px] text-slate-400">SKU: CF-8812-CRM</span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-xs font-bold text-rose-600">فقط ۲ عدد</div>
                  <button
                    onClick={() => navigate('/inventory')}
                    className="mt-1 px-2.5 py-0.5 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    شارژ
                  </button>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/serum.jpg"
                    alt="سرم بازسازی‌کننده هیالورونیک اسید"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">سرم بازسازی‌کننده هیال...</h4>
                    <span className="text-[10px] text-slate-400">SKU: SC-1903-GLS</span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-xs font-bold text-rose-600">فقط ۳ عدد</div>
                  <button
                    onClick={() => navigate('/inventory')}
                    className="mt-1 px-2.5 py-0.5 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    شارژ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/inventory"
            className="mt-4 pt-3 border-t border-slate-100 inline-flex items-center justify-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <span>مشاهده همه ۱۸ کالای بحرانی در ماژول انبار</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* BEGIN: BottomDataAndRankingsRow (Recent Orders + Top Products) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-purpose="orders-and-top-products">
        {/* Right Card: آخرین سفارش‌ها و تراکنش‌ها (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">آخرین سفارش‌ها و تراکنش‌ها</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">مدیریت آنی فاکتورها، رهگیری و وضعیت مالی مشتریان</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl text-[11px] font-medium text-slate-600 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setOrderFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    orderFilter === 'all' ? 'bg-blue-600 text-white font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  همه سفارش‌ها (۱,۲۸۴)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderFilter('paid')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    orderFilter === 'paid' ? 'bg-blue-600 text-white font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  پرداخت شده
                </button>
                <button
                  type="button"
                  onClick={() => setOrderFilter('pending')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    orderFilter === 'pending' ? 'bg-blue-600 text-white font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  در انتظار پرداخت
                </button>
                <button
                  type="button"
                  onClick={() => setOrderFilter('cancelled')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    orderFilter === 'cancelled' ? 'bg-blue-600 text-white font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  لغو شده
                </button>
              </div>
            </div>

            {/* Table Search Bar */}
            <div className="mt-4 mb-3 flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="فیلتر سفارش، مشتری..."
                  className="w-full pl-3 pr-8 py-1.5 bg-slate-50 text-xs rounded-xl border border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
                />
              </div>
              <button
                type="button"
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>فیلتر</span>
              </button>
            </div>

            {/* Clean Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 text-[11px]">
                    <th className="py-2.5 font-semibold">شناسه فاکتور</th>
                    <th className="py-2.5 font-semibold">خریدار</th>
                    <th className="py-2.5 font-semibold">اقلام سفارش</th>
                    <th className="py-2.5 font-semibold">مبلغ کل (تومان)</th>
                    <th className="py-2.5 font-semibold text-center">وضعیت پرداخت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="py-3 font-bold text-blue-600 font-mono">{order.orderNumber}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full ${order.customerAvatarBg} flex items-center justify-center text-[10px] font-bold`}
                          >
                            {order.customerInitials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{order.customerName}</div>
                            <div className="text-[10px] text-slate-400">{order.destination}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-600">{order.items[0]?.productName || 'اقلام کالا'}</td>
                      <td className="py-3 font-bold text-slate-900">{order.totalAmount.toLocaleString('fa-IR')}</td>
                      <td className="py-3 text-center">
                        {order.paymentStatus === 'paid' ? (
                          <span className="inline-flex items-center justify-center whitespace-nowrap gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            پرداخت موفق
                          </span>
                        ) : order.paymentStatus === 'pending' ? (
                          <span className="inline-flex items-center justify-center whitespace-nowrap gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            درگاه بانکی
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center whitespace-nowrap gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            ناموفق
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Pagination Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-slate-400 text-[11px]">نمایش ۴ از ۱,۲۸۴ سفارش ثبت شده</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate('/orders')}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                ۱
              </button>
              <button
                onClick={() => navigate('/orders')}
                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center justify-center cursor-pointer"
              >
                ۲
              </button>
              <span className="text-slate-400 text-xs px-1">...</span>
              <button
                onClick={() => navigate('/orders')}
                className="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs"
              >
                مشاهده همه
              </button>
            </div>
          </div>
        </div>

        {/* Left Card: محصولات برتر فروش (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">محصولات برتر فروش</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">پرفروش‌ترین‌های ۳۰ روز اخیر بر اساس سود</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Trophy className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            {/* Top 3 Products */}
            <div className="space-y-3.5 mt-3">
              {/* Rank 1 */}
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={initialProducts[4].image}
                      alt="ساعت هوشمند اولترا"
                      className="w-11 h-11 rounded-xl object-cover border border-blue-100 bg-white"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                      ۱
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{initialProducts[4].title}</h4>
                    <span className="text-[10px] text-slate-400">۳۱۲ عدد فروش رفته</span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-xs font-bold text-slate-900">۸۴.۲ م.ت</div>
                  <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 justify-end mt-0.5">
                    +۲۲.۴٪
                    <TrendingUp className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>

              {/* Rank 2 */}
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={initialProducts[3].image}
                      alt="کیبورد مکانیکال"
                      className="w-11 h-11 rounded-xl object-cover border border-indigo-100 bg-white"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-700 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                      ۲
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{initialProducts[3].title}</h4>
                    <span className="text-[10px] text-slate-400">۱۸۸ عدد فروش رفته</span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-xs font-bold text-slate-900">۵۱.۸ م.ت</div>
                  <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 justify-end mt-0.5">
                    +۱۴.۱٪
                    <TrendingUp className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>

              {/* Rank 3 */}
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={initialProducts[6].image}
                      alt="ماگ حرارتی"
                      className="w-11 h-11 rounded-xl object-cover border border-amber-100 bg-white"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-400 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                      ۳
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{initialProducts[6].title}</h4>
                    <span className="text-[10px] text-slate-400">۱۴۵ عدد فروش رفته</span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-xs font-bold text-slate-900">۲۶.۴ م.ت</div>
                  <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 justify-end mt-0.5">
                    +۹.۸٪
                    <TrendingUp className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Insight Box */}
          <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              محصولات این ۳ ردیف به تنهایی <strong className="text-blue-700">۶۵.۴٪</strong> از کل حاشیه سود ماهانه را محقق کرده‌اند.
            </p>
          </div>
        </div>
      </section>

      {/* Invoice modal */}
      <OrderInvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
};
