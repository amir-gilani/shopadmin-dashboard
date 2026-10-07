import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Printer,
  FileDown,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  User,
  MapPin,
  CreditCard,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { initialOrders } from '../data/orders';
import { Order, OrderStatus } from '../types';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const order = orders.find((o) => o.id === id || o.orderNumber.replace(/[^0-9]/g, '') === id) || orders[0];

  const handleUpdateStatus = (newStatus: OrderStatus) => {
    setOrders(orders.map((o) => (o.id === order.id ? { ...o, orderStatus: newStatus } : o)));
    alert('وضعیت سفارش بروزرسانی شد.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title="بازگشت به سفارش‌ها"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                جزئیات سفارش <span className="font-mono text-blue-600">{order.orderNumber}</span>
              </h1>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {order.createdAt}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">مشاهده فاکتور، پیگیری مرسوله و مدیریت اقلام و مشتری</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ فاکتور</span>
          </button>
          <button
            onClick={() => alert('برچسب پستی مرسوله با موفقیت چاپ گردید.')}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>چاپ برچسب تیپاکس/پست</span>
          </button>
        </div>
      </div>

      {/* Fulfillment Status Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">مراحل پردازش و ارسال مرسوله</h3>
          <span className="text-xs text-blue-600 font-semibold">{order.shippingMethodTitle}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/60 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-blue-900">۱. ثبت و پرداخت</p>
              <span className="text-[11px] text-blue-600 font-medium">پرداخت آنلاین موفق</span>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              order.orderStatus === 'preparing' || order.orderStatus === 'dispatched' || order.orderStatus === 'delivered'
                ? 'bg-indigo-50 border-indigo-200/60'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <Package
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                order.orderStatus === 'preparing' || order.orderStatus === 'dispatched' || order.orderStatus === 'delivered'
                  ? 'text-indigo-600'
                  : 'text-slate-400'
              }`}
            />
            <div>
              <p className="text-xs font-bold text-slate-800">۲. آماده‌سازی در انبار</p>
              <span className="text-[11px] text-slate-500 font-medium">پکینگ و بسته‌بندی</span>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              order.orderStatus === 'dispatched' || order.orderStatus === 'delivered'
                ? 'bg-sky-50 border-sky-200/60'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <Truck
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                order.orderStatus === 'dispatched' || order.orderStatus === 'delivered'
                  ? 'text-sky-600'
                  : 'text-slate-400'
              }`}
            />
            <div>
              <p className="text-xs font-bold text-slate-800">۳. تحویل به حامل باربری</p>
              <span className="text-[11px] text-slate-500 font-mono">{order.trackingCode || 'در انتظار بارنامه'}</span>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              order.orderStatus === 'delivered'
                ? 'bg-emerald-50 border-emerald-200/60'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                order.orderStatus === 'delivered' ? 'text-emerald-600' : 'text-slate-400'
              }`}
            />
            <div>
              <p className="text-xs font-bold text-slate-800">۴. تحویل نهایی</p>
              <span className="text-[11px] text-slate-500 font-medium">تایید امضای مشتری</span>
            </div>
          </div>
        </div>

        {/* Change status buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-slate-500 font-medium">تغییر وضعیت به صورت دستی:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateStatus('preparing')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 cursor-pointer"
            >
              انتقال به آماده‌سازی
            </button>
            <button
              onClick={() => handleUpdateStatus('dispatched')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer"
            >
              ارسال شد
            </button>
            <button
              onClick={() => handleUpdateStatus('delivered')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
            >
              تحویل شد
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Order Details & Customer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">اقلام سفارش داده شده</h3>
            <div className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">{item.productName}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">کد SKU: {item.sku}</p>
                      {item.variant && <span className="text-xs text-slate-500 mt-1 block">{item.variant}</span>}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {item.price.toLocaleString('fa-IR')} تومان
                    </p>
                    <span className="text-xs text-slate-400 block mt-0.5">تعداد: {item.quantity} عدد</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>جمع کل اقلام:</span>
                <span>{order.totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>هزینه بسته‌بندی و ارسال ({order.shippingMethodTitle}):</span>
                <span className="text-emerald-600 font-semibold">رایگان</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>تخفیف اعمال شده:</span>
                <span className="text-slate-400">۰ تومان</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>مبلغ قابل پرداخت نهایی:</span>
                <span className="text-blue-600">{order.totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Customer & Shipping Cards */}
        <div className="space-y-6">
          {/* Customer info card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">اطلاعات خریدار</h4>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${order.customerAvatarBg} font-bold flex items-center justify-center text-xs shrink-0`}
              >
                {order.customerInitials}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{order.customerName}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">کاربر تایید شده فروشگاه</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <p>شماره موبایل: <strong className="font-mono text-slate-800">{order.phone}</strong></p>
              <p>مقصد تحویل: {order.destination}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                آدرس کامل: {order.address}
              </p>
            </div>

            <button
              onClick={() => alert(`پیامک برای ${order.customerName} ارسال شد.`)}
              className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>ارسال پیامک به خریدار</span>
            </button>
          </div>

          {/* Shipping and Payment details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">مشخصات تراکنش بانکی</h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">روش پرداخت:</span>
                <span className="font-bold text-slate-800">{order.paymentMethodTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">وضعیت پرداخت:</span>
                <span className="text-emerald-600 font-bold">پرداخت موفق</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">روش حمل‌ونقل:</span>
                <span className="font-semibold text-slate-800">{order.shippingMethodTitle}</span>
              </div>
              {order.trackingCode && (
                <div className="flex justify-between">
                  <span className="text-slate-500">شماره رهگیری:</span>
                  <span className="font-mono font-bold text-blue-600">{order.trackingCode}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
