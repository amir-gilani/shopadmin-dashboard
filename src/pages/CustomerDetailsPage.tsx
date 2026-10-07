import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  CreditCard,
  Star,
  MessageSquare,
  Edit2,
  Package,
  Eye
} from 'lucide-react';
import { initialCustomers } from '../data/customers';
import { initialOrders } from '../data/orders';

export const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const customer = initialCustomers.find((c) => c.id === id || c.code.replace(/[^0-9]/g, '') === id) || initialCustomers[0];

  const customerOrders = initialOrders.filter(
    (o) => o.customerName === customer.name || o.phone === customer.phone
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/customers"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                پروفایل خریدار: {customer.name}
              </h1>
              <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg">
                {customer.code}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">مشاهده کارنامه خرید، سطح وفاداری و تاریخچه تراکنش‌ها</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`پیامک به شماره ${customer.phone} ارسال شد.`)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>ارسال پیامک</span>
          </button>
        </div>
      </div>

      {/* Profile Overview Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl ${customer.avatarBg} ${customer.avatarColor} text-xl font-black flex items-center justify-center shrink-0 border border-slate-100`}
          >
            {customer.initials}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-black text-slate-800">{customer.name}</h2>
              {customer.loyaltyTier === 'gold_vip' ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[11px] font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  مشتری طلایی VIP
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                  عضو رسمی
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <strong className="font-mono text-slate-700">{customer.phone}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{customer.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{customer.city}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Customer Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3 bg-slate-50 rounded-2xl text-center">
            <span className="text-[11px] text-slate-400 block">کل سفارش‌ها</span>
            <span className="text-lg font-black text-slate-900">{customer.ordersCount} سفارش</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl text-center">
            <span className="text-[11px] text-slate-400 block">ارزش کل خرید (LTV)</span>
            <span className="text-base font-black text-blue-600">
              {customer.totalSpent.toLocaleString('fa-IR')} تومان
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl text-center col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-400 block">آخرین فعالیت</span>
            <span className="text-xs font-bold text-slate-800">{customer.lastActivity}</span>
          </div>
        </div>
      </div>

      {/* Customer Purchase History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">تاریخچه سفارش‌های ثبت‌شده خریدار</h3>
          <span className="text-xs text-slate-400">تعداد: {customerOrders.length || 1} سفارش</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">شناسه سفارش</th>
                <th className="py-3 px-4">زمان ثبت</th>
                <th className="py-3 px-4">محصول خریداری شده</th>
                <th className="py-3 px-4">مبلغ فاکتور</th>
                <th className="py-3 px-4 text-center">وضعیت تحویل</th>
                <th className="py-3 px-4 text-center">مشاهده</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(customerOrders.length > 0 ? customerOrders : initialOrders.slice(0, 2)).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{order.orderNumber}</td>
                  <td className="py-3.5 px-4 text-slate-500">{order.createdAt}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-semibold">{order.items[0]?.productName}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {order.totalAmount.toLocaleString('fa-IR')} تومان
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                      تحویل موفق
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
