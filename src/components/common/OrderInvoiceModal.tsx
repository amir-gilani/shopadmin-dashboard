import React from 'react';
import { X, Printer, Download, CheckCircle2, Truck, CreditCard, User, MapPin } from 'lucide-react';
import { Order } from '../../types';

interface OrderInvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (orderId: string, newStatus: Order['orderStatus']) => void;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
  onStatusChange
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-md shadow-blue-500/20">
              #
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                فاکتور رسمی سفارش <span className="font-mono text-blue-600">{order.orderNumber}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">زمان ثبت: {order.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="چاپ فاکتور"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Customer & Shipping Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <User className="w-4 h-4 text-blue-600" />
                <span>مشخصات خریدار</span>
              </div>
              <p className="text-sm font-extrabold text-slate-800">{order.customerName}</p>
              <p className="text-xs text-slate-500">شماره تماس: {order.phone}</p>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{order.address}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>اطلاعات ارسال و پرداخت</span>
              </div>
              <p className="text-xs text-slate-700 font-semibold">
                روش ارسال: <span className="text-slate-900 font-bold">{order.shippingMethodTitle}</span>
              </p>
              {order.trackingCode && (
                <p className="text-xs text-slate-500 font-mono">کد رهگیری: {order.trackingCode}</p>
              )}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700">شیوه پرداخت: {order.paymentMethodTitle}</span>
              </div>
            </div>
          </div>

          {/* Line items table */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">اقلام سفارش داده شده</h4>
            <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 bg-slate-50"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">{item.productName}</h5>
                      <span className="text-[11px] text-slate-400 font-mono">کد کالا: {item.sku}</span>
                      {item.variant && <p className="text-[11px] text-slate-500 mt-0.5">{item.variant}</p>}
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800">
                      {item.price.toLocaleString('fa-IR')} تومان
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">تعداد: {item.quantity} عدد</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total calculation */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">مبلغ نهایی قابل پرداخت:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-blue-700">{order.totalAmount.toLocaleString('fa-IR')}</span>
              <span className="text-xs text-blue-600 font-medium">تومان</span>
            </div>
          </div>

          {/* Quick status management inside modal */}
          {onStatusChange && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">تغییر وضعیت سفارش:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onStatusChange(order.id, 'processing')}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  در حال پردازش
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange(order.id, 'preparing')}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                >
                  در حال آماده‌سازی
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange(order.id, 'dispatched')}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-sky-50 text-sky-700 hover:bg-sky-100"
                >
                  ارسال شده
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange(order.id, 'delivered')}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                >
                  تحویل داده شده
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
          >
            بستن
          </button>
          <button
            onClick={() => {
              alert('فایل چاپی برچسب پستی با مشخصات گیرنده تولید شد.');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            چاپ برچسب پستی
          </button>
        </div>
      </div>
    </div>
  );
};
