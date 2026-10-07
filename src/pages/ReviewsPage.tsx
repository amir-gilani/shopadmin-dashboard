import React, { useState } from 'react';
import {
  FileDown,
  SlidersHorizontal,
  Star,
  MessageSquare,
  Clock,
  Image as ImageIcon,
  Search,
  Check,
  X,
  CornerDownLeft,
  AlertTriangle
} from 'lucide-react';
import { initialReviews } from '../data/reviews';
import { ProductReview, ReviewStatus } from '../types';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('newest');
  const [statusTab, setStatusTab] = useState<'all' | ReviewStatus | 'with_photo'>('all');

  // Reply modal state
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [activeReview, setActiveReview] = useState<ProductReview | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Auto-approval modal
  const [showAutoApproveModal, setShowAutoApproveModal] = useState(false);
  const [autoApproveRating, setAutoApproveRating] = useState('4');

  const filteredReviews = reviews.filter((rev) => {
    if (statusTab === 'with_photo' && !rev.hasPhoto) return false;
    if (statusTab !== 'all' && statusTab !== 'with_photo' && rev.status !== statusTab) return false;

    if (ratingFilter && Math.floor(rev.rating).toString() !== ratingFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchCustomer = rev.customerName.includes(searchQuery);
      const matchProduct = rev.productName.toLowerCase().includes(q);
      const matchCode = rev.productCode.toLowerCase().includes(q);
      const matchText = rev.content.includes(searchQuery);
      if (!matchCustomer && !matchProduct && !matchCode && !matchText) return false;
    }

    return true;
  });

  const handleApprove = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
    alert('نظر کاربر تایید و در سایت منتشر گردید.');
  };

  const handleReject = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)));
    alert('نظر کاربر رد شد.');
  };

  const handleOpenReply = (rev: ProductReview) => {
    setActiveReview(rev);
    setReplyContent(rev.replyText || '');
    setShowReplyModal(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReview || !replyContent) return;

    setReviews(
      reviews.map((r) =>
        r.id === activeReview.id ? { ...r, status: 'replied', replyText: replyContent } : r
      )
    );
    setShowReplyModal(false);
    alert('پاسخ رسمی پشتیبانی با موفقیت ثبت و ارسال شد.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto" data-purpose="reviews-dashboard">
      {/* Page Header & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div className="flex flex-col gap-1.5">
          <nav className="flex items-center gap-2 text-slate-500 text-[12px]">
            <a className="hover:text-blue-600 transition-colors" href="#">داشبورد</a>
            <span className="text-slate-300">/</span>
            <span className="hover:text-blue-600 transition-colors">بازخورد و تعاملات</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">نظرات و امتیازات مشتریان</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              مدیریت نظرات و بازخورد مشتریان
            </h1>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200/70 text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              ۱۸ نظر جدید در انتظار بررسی
            </span>
          </div>
          <p className="text-slate-500 text-[13px]">
            بررسی، پاسخگویی و پایش رضایت خریداران از محصولات و خدمات فروشگاه شاپ‌ادمین
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert('خروجی اکسل نظرات آماده دانلود است.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-[13px] font-medium shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            type="button"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>خروجی اکسل</span>
          </button>
          <button
            onClick={() => setShowAutoApproveModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-medium shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
            type="button"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>تنظیمات تایید خودکار</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: میانگین رضایت کلی */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">میانگین رضایت کلی</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="flex items-center justify-between my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۴.۸</span>
              <span className="text-slate-400 text-xs font-medium">از ۵.۰</span>
            </div>
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-[11.5px] pt-1">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold leading-tight">
              + ۰.۳٪ نسبت به ماه قبل
            </span>
            <span className="text-slate-400">پایش هوشمند</span>
          </div>
        </div>

        {/* Card 2: کل نظرات ثبت‌شده */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">کل نظرات ثبت‌شده</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۳,۲۴۰</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 whitespace-nowrap">
              ۲,۸۹۰ تایید شده
            </span>
          </div>
          <div className="flex items-center justify-between text-[11.5px] pt-1">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold leading-tight">
              + ۱۵.۴٪ افزایش مشارکت
            </span>
            <span className="text-slate-400">۳۰ روز اخیر</span>
          </div>
        </div>

        {/* Card 3: در انتظار بررسی و تایید */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">در انتظار بررسی و تایید</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-amber-600 text-[28px] font-extrabold tracking-tight leading-none">۱۸ نظر</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 whitespace-nowrap">
              اقدام فوری
            </span>
          </div>
          <div className="flex items-center justify-between text-[11.5px] pt-1">
            <span className="text-slate-500 leading-tight">
              میانگین زمان پاسخ: <strong className="text-slate-700">۱.۲ ساعت</strong>
            </span>
            <span
              onClick={() => setStatusTab('pending')}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              مشاهده صف
            </span>
          </div>
        </div>

        {/* Card 4: نظرات حاوی عکس و مدیا */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">نظرات حاوی عکس و مدیا</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۳۴.۲٪</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 whitespace-nowrap">
              ۴۱۸ نظر تصویری
            </span>
          </div>
          <div className="flex items-center justify-between text-[11.5px] pt-1">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold leading-tight">
              + ۵.۱٪ ضریب اعتبار خرید
            </span>
            <span className="text-slate-400">تعاملی</span>
          </div>
        </div>
      </div>

      {/* Main Reviews Table & Filter Hub */}
      <div className="w-full flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {/* Top Toolbar */}
        <div className="p-4 flex flex-col gap-3.5 border-b border-slate-100 bg-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative w-full lg:w-96">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در متن نظر، نام مشتری، کد محصول..."
                className="w-full pl-3 pr-9 py-2 text-[13px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-end flex-wrap">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">همه امتیازها</option>
                <option value="5">۵ ستاره (عالی)</option>
                <option value="4">۴ ستاره (خوب)</option>
                <option value="3">۳ ستاره (متوسط)</option>
                <option value="2">۲ ستاره (ضعیف)</option>
                <option value="1">۱ ستاره (ناراضی)</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">همه گروه‌ها</option>
                <option value="digital">کالای دیجیتال</option>
                <option value="laptop">لپ‌تاپ</option>
                <option value="audio">صوتی و هدفون</option>
                <option value="watch">ساعت هوشمند</option>
              </select>

              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="newest">مرتب‌سازی: جدیدترین بازخوردها</option>
                <option value="oldest">مرتب‌سازی: قدیمی‌ترین‌ها</option>
                <option value="highest">بیشترین امتیاز</option>
                <option value="lowest">کمترین امتیاز</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs Row */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 select-none border-t border-slate-100/80 pt-3 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => setStatusTab('all')}
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-all cursor-pointer ${
                statusTab === 'all'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              همه نظرات <span className="mr-1 opacity-80">(۳,۲۴۰)</span>
            </button>

            <button
              onClick={() => setStatusTab('pending')}
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                statusTab === 'pending'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              در انتظار تایید <span className="mr-0.5 text-amber-700 font-semibold">(۱۸)</span>
            </button>

            <button
              onClick={() => setStatusTab('approved')}
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                statusTab === 'approved'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              تایید و منتشر شده <span className="mr-1 text-slate-400">(۲,۸۹۰)</span>
            </button>

            <button
              onClick={() => setStatusTab('replied')}
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                statusTab === 'replied'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              پاسخ داده شده <span className="mr-1 text-slate-400">(۱,۶۴۰)</span>
            </button>

            <button
              onClick={() => setStatusTab('rejected')}
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                statusTab === 'rejected'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              رد شده / اسپم <span className="mr-1 text-slate-400">(۳۳۲)</span>
            </button>

            <button
              onClick={() => setStatusTab('with_photo')}
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                statusTab === 'with_photo'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              type="button"
            >
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>حاوی عکس محصول</span> <span className="mr-1 text-slate-400">(۴۱۸)</span>
            </button>
          </div>
        </div>

        {/* Table View */}
        <div
          className="overflow-x-auto w-full no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <table className="w-full text-right border-collapse min-w-[760px] lg:min-w-full">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-[12px] select-none">
              <tr>
                <th className="py-3.5 px-4 font-semibold text-right" scope="col">مشتری و خریدار</th>
                <th className="py-3.5 px-3 font-semibold text-right w-44" scope="col">محصول مورد نظر</th>
                <th className="py-3.5 px-3 font-semibold text-center w-28" scope="col">امتیاز</th>
                <th className="py-3.5 px-4 font-semibold text-right" scope="col">متن و محتوای بازخورد</th>
                <th className="py-3.5 px-3 font-semibold text-center w-36" scope="col">وضعیت انتشار</th>
                <th className="py-3.5 px-3 font-semibold text-center w-28" scope="col">زمان ثبت</th>
                <th className="py-3.5 px-4 font-semibold text-center w-24 shrink-0" scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-[13px]">
              {filteredReviews.map((rev) => (
                <tr
                  key={rev.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    rev.status === 'pending'
                      ? 'bg-amber-50/20'
                      : rev.status === 'needs_action'
                      ? 'bg-rose-50/20'
                      : ''
                  }`}
                >
                  {/* Customer */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${rev.avatarBg} ${rev.avatarColor} border border-slate-100 flex items-center justify-center font-bold text-xs shrink-0 select-none`}
                      >
                        {rev.customerInitials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-800 leading-snug truncate">{rev.customerName}</span>
                        {rev.customerBadge && (
                          <span
                            className={`text-[11px] font-medium ${
                              rev.customerBadge.includes('VIP')
                                ? 'text-amber-700 font-bold'
                                : rev.customerBadge.includes('ناراضی')
                                ? 'text-rose-600 font-bold'
                                : 'text-emerald-600'
                            }`}
                          >
                            {rev.customerBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Product */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex flex-col max-w-[180px]">
                      <span className="font-medium text-slate-800 truncate">{rev.productName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">کد: {rev.productCode}</span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span
                        className={`font-bold text-[12px] ${
                          rev.rating <= 2 ? 'text-rose-600' : 'text-slate-800'
                        }`}
                      >
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>

                  {/* Content */}
                  <td className="py-3.5 px-4">
                    <p className="text-slate-600 text-[12.5px] max-w-sm line-clamp-1 leading-relaxed">
                      {rev.content}
                    </p>
                    {rev.replyText && (
                      <p className="text-blue-600 text-[11px] mt-1 flex items-center gap-1">
                        <CornerDownLeft className="w-3 h-3 shrink-0" />
                        <span className="truncate">پاسخ پشتیبانی: {rev.replyText}</span>
                      </p>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    {rev.status === 'approved' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>منتشر شده
                      </span>
                    )}
                    {rev.status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>در انتظار تایید
                      </span>
                    )}
                    {rev.status === 'replied' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>منتشر و پاسخ‌داده‌شده
                      </span>
                    )}
                    {rev.status === 'needs_action' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>نیاز به پیگیری
                      </span>
                    )}
                    {rev.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[12px] font-medium shrink-0">
                        رد شده / اسپم
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-3 text-center text-slate-500 text-[12px] whitespace-nowrap">
                    {rev.date}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center shrink-0">
                    <div className="flex items-center justify-center gap-1">
                      {rev.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApprove(rev.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-[11px] font-semibold transition-all border border-emerald-200/60 cursor-pointer"
                            type="button"
                          >
                            تایید
                          </button>
                          <button
                            onClick={() => handleReject(rev.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-[11px] font-semibold transition-all border border-rose-200/60 cursor-pointer"
                            type="button"
                          >
                            رد
                          </button>
                        </>
                      ) : rev.status === 'needs_action' ? (
                        <button
                          onClick={() => handleOpenReply(rev)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold transition-all border border-rose-200/60 cursor-pointer"
                          type="button"
                        >
                          پیگیری
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenReply(rev)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11.5px] font-medium transition-all cursor-pointer"
                          type="button"
                        >
                          پاسخ
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="py-3.5 px-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 flex-wrap gap-2">
          <span>نمایش ۱ تا {filteredReviews.length} از مجموع ۳,۲۴۰ نظر ثبت‌شده</span>
          <div className="flex items-center gap-1.5 select-none">
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700 disabled:opacity-40" disabled type="button">
              قبلی
            </button>
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold">۱</span>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۲</button>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۳</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۶۴۸</button>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">بعدی</button>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && activeReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">
                پاسخ به دیدگاه {activeReview.customerName}
              </h3>
              <button onClick={() => setShowReplyModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="p-6 space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
                <p className="font-bold text-slate-800">{activeReview.productName}</p>
                <p className="text-slate-600 mt-1 leading-relaxed">«{activeReview.content}»</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  پاسخ رسمی پشتیبانی فروشگاه
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="پاسخ محترمانه و دقیق جهت نمایش عمومی در وب‌سایت..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  ثبت و انتشار پاسخ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Auto Approval Settings Modal */}
      {showAutoApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">تنظیمات تایید خودکار نظرات</h3>
              <button onClick={() => setShowAutoApproveModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                می‌توانید قوانینی وضع کنید که نظرات مثبت و خریداران تایید شده پس از بررسی فیلتر کلمات، به صورت خودکار منتشر شوند.
              </p>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">حداقل امتیاز برای انتشار فوری</label>
                <select
                  value={autoApproveRating}
                  onChange={(e) => setAutoApproveRating(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="5">فقط ۵ ستاره</option>
                  <option value="4">۴ ستاره و بالاتر</option>
                  <option value="3">۳ ستاره و بالاتر</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>فقط نظرات خریداران احراز هویت شده</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>فیلتر هوشمند کلمات نامناسب و اسپم</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAutoApproveModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                >
                  بستن
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAutoApproveModal(false);
                    alert('قوانین تایید خودکار با موفقیت ذخیره شد.');
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                >
                  ذخیره تنظیمات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
