import React from 'react';
import { X, ExternalLink, ShoppingBag, Star, Check } from 'lucide-react';
import { initialProducts } from '../../data/products';

interface StorePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorePreviewModal: React.FC<StorePreviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">پیش‌نمایش زنده ویترین فروشگاه شاپ‌ادمین</h3>
              <p className="text-[11px] text-slate-400">نمای خریداران نهایی (Customer Storefront)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Simulated Storefront */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 text-center sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
                جشنواره ویژه نوروز ۱۴۰۴
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">تا ۲۵٪ تخفیف روی تمامی محصولات دیجیتال</h2>
              <p className="text-xs sm:text-sm text-blue-100 max-w-md">
                ارسال رایگان اکسپرس برای تمامی سفارش‌های بالای ۵۰۰,۰۰۰ تومان به سراسر کشور
              </p>
            </div>
            <button
              onClick={() => alert('کد تخفیف NOROOZ1404 برای شما کپی شد!')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md hover:bg-blue-50 transition-all shrink-0 cursor-pointer"
            >
              کد تخفیف: NOROOZ1404
            </button>
          </div>

          {/* Featured Products Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900">محصولات منتخب فروشگاه</h4>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
                مشاهده همه کاتالوگ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {initialProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discountPercentage ? (
                      <span className="absolute top-2 right-2 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                        {product.discountPercentage}٪ تخفیف
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] text-slate-400 font-medium">{product.brand}</span>
                    <h5 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h5>

                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-slate-700 font-bold text-[11px]">{product.rating}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="font-extrabold text-sm text-slate-900">
                          {product.price.toLocaleString('fa-IR')}
                        </span>
                        <span className="text-[10px] text-slate-400">تومان</span>
                      </div>
                      <button
                        onClick={() => alert(`محصول ${product.title} به سبد خرید اضافه شد.`)}
                        className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                        title="افزودن به سبد خرید"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>شما در حال مشاهده پیش‌نمایش لحظه‌ای ویترین فروشگاه هستید.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors"
          >
            بستن پیش‌نمایش
          </button>
        </div>
      </div>
    </div>
  );
};
