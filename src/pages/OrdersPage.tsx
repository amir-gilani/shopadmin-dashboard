import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Printer,
  FileDown,
  Plus,
  ShoppingBag,
  Clock,
  Box,
  Truck,
  RotateCcw,
  Eye,
  Send,
  AlertCircle,
  Check,
  X
} from 'lucide-react';
import { initialOrders } from '../data/orders';
import { Order, OrderStatus, PaymentStatus, ShippingMethod } from '../types';
import { OrderInvoiceModal } from '../components/common/OrderInvoiceModal';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [statusTab, setStatusTab] = useState<'all' | OrderStatus | 'cancelled_returned'>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('');
  const [shippingFilter, setShippingFilter] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('30');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Manual Order Modal State
  const [showManualOrderModal, setShowManualOrderModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerCity, setNewCustomerCity] = useState('تهران');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newProductTitle, setNewProductTitle] = useState('هدفون بی‌سیم سونی WH-1000XM5');
  const [newProductAmount, setNewProductAmount] = useState('21450000');
  const [newShippingMethod, setNewShippingMethod] = useState<ShippingMethod>('tipax');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Tab filtering
    if (statusTab === 'pending_payment' && order.orderStatus !== 'pending_payment') return false;
    if (statusTab === 'preparing' && order.orderStatus !== 'preparing') return false;
    if (statusTab === 'dispatched' && order.orderStatus !== 'dispatched') return false;
    if (statusTab === 'delivered' && order.orderStatus !== 'delivered') return false;
    if (
      statusTab === 'cancelled_returned' &&
      order.orderStatus !== 'returned' &&
      order.orderStatus !== 'cancelled'
    ) {
      return false;
    }

    // Payment Filter
    if (paymentFilter && order.paymentStatus !== paymentFilter) return false;

    // Shipping Filter
    if (shippingFilter && order.shippingMethod !== shippingFilter) return false;

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchCustomer = order.customerName.includes(searchQuery);
      const matchTracking = order.trackingCode?.toLowerCase().includes(q);
      if (!matchNum && !matchCustomer && !matchTracking) return false;
    }

    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter((item) => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  const handleResetFilters = () => {
    setStatusTab('all');
    setPaymentFilter('');
    setShippingFilter('');
    setTimeFilter('30');
    setSearchQuery('');
  };

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newCustomerPhone) {
      alert('لطفاً نام مشتری و شماره موبایل را وارد نمایید.');
      return;
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}#`,
      createdAt: 'لحظاتی پیش',
      customerName: newCustomerName,
      customerInitials: newCustomerName.slice(0, 2),
      customerAvatarBg: 'bg-emerald-100 text-emerald-800',
      destination: `${newCustomerCity}، مرکز شهر`,
      address: `${newCustomerCity}، خیابان آزادی، پلاک ۱۰`,
      phone: newCustomerPhone,
      items: [
        {
          id: `item-${Date.now()}`,
          productId: 'prod-1',
          productName: newProductTitle,
          sku: 'MAN-900',
          price: Number(newProductAmount),
          quantity: 1,
          image: '/images/headphone.jpg'
        }
      ],
      totalAmount: Number(newProductAmount),
      paymentStatus: 'paid',
      paymentMethodTitle: 'ثبت دستی / کارت‌خوان',
      orderStatus: 'preparing',
      shippingMethod: newShippingMethod,
      shippingMethodTitle:
        newShippingMethod === 'tipax'
          ? 'تیپاکس اکسپرس'
          : newShippingMethod === 'post'
          ? 'پست پیشتاز'
          : 'پیک اختصاصی',
      trackingCode: `TPX-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setOrders([newOrder, ...orders]);
    setShowManualOrderModal(false);
    setNewCustomerName('');
    setNewCustomerPhone('');
    alert('سفارش دستی جدید با موفقیت ثبت شد.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full max-w-full overflow-x-hidden">
      {/* 1. Top Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">مدیریت سفارش‌ها</h1>
            <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
              نسخه ۲.۴
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            بررسی، پیگیری و پردازش ۱,۲۸۴ سفارش ثبت‌شده در فروشگاه اینترنتی
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[13px] font-semibold transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>چاپ برچسب‌ها</span>
          </button>

          <button
            onClick={() => alert('خروجی اکسل سفارش‌ها آماده شد.')}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[13px] font-semibold transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>خروجی اکسل</span>
          </button>

          <button
            onClick={() => setShowManualOrderModal(true)}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold shadow-md shadow-blue-500/25 transition-all whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            <span>ثبت سفارش دستی</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1: Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">کل سفارش‌های جاری</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">۱,۲۸۴</span>
              <span className="text-xs text-slate-400 font-medium">سفارش</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
              <span dir="ltr">+۸.۴٪</span>
            </span>
          </div>
          <div className="mt-3 text-[11.5px] text-slate-400 font-medium truncate">
            نسبت به دوره ۳۰ روزه پیشین
          </div>
        </div>

        {/* Card 2: Pending Processing */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">در انتظار بررسی و پرداخت</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">۳۸</span>
              <span className="text-xs text-slate-400 font-medium">سفارش</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>نیازمند اقدام</span>
            </span>
          </div>
          <div className="mt-3 text-[11.5px] text-slate-400 font-medium truncate">
            میانگین زمان انتظار: ۲۶ دقیقه
          </div>
        </div>

        {/* Card 3: In Fulfillment */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">در حال آماده‌سازی و انبار</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Box className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">۶۴</span>
              <span className="text-xs text-slate-400 font-medium">بسته</span>
            </div>
            <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 whitespace-nowrap">
              در جریان پکینگ
            </span>
          </div>
          <div className="mt-3 text-[11.5px] text-slate-400 font-medium truncate">
            ۳ نوبت توزیع اختصاصی امروز
          </div>
        </div>

        {/* Card 4: Dispatched / Delivered */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">تحویل شده یا در مسیر ارسال</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900">۲۱۴</span>
              <span className="text-xs text-slate-400 font-medium">مرسوله</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
              <span>تحویل ۹۹.۲٪</span>
            </span>
          </div>
          <div className="mt-3 text-[11.5px] text-slate-400 font-medium truncate">
            ۱۸۹ پست پیشتاز، ۲۵ تیپاکس
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & Tabs Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Status Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 pb-3 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            onClick={() => setStatusTab('all')}
            type="button"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              statusTab === 'all'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span>همه سفارش‌ها</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] ${statusTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'}`}>
              ۱,۲۸۴
            </span>
          </button>

          <button
            onClick={() => setStatusTab('pending_payment')}
            type="button"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusTab === 'pending_payment'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span>در انتظار پرداخت</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px]">۳۸</span>
          </button>

          <button
            onClick={() => setStatusTab('preparing')}
            type="button"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusTab === 'preparing'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span>در حال آماده‌سازی</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px]">۶۴</span>
          </button>

          <button
            onClick={() => setStatusTab('dispatched')}
            type="button"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusTab === 'dispatched'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span>ارسال شده</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px]">۲۱۴</span>
          </button>

          <button
            onClick={() => setStatusTab('delivered')}
            type="button"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusTab === 'delivered'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span>تحویل شده</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[11px]">۹۵۰</span>
          </button>

          <button
            onClick={() => setStatusTab('cancelled_returned')}
            type="button"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusTab === 'cancelled_returned'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <span>مرجوع یا لغو</span>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px]">۱۸</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-3">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="">وضعیت پرداخت: همه</option>
              <option value="paid">پرداخت آنلاین (موفق)</option>
              <option value="pending">در انتظار پرداخت</option>
              <option value="wallet">کیف پول</option>
              <option value="refund">عودت وجه</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={shippingFilter}
              onChange={(e) => setShippingFilter(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="">روش ارسال: همه روش‌ها</option>
              <option value="tipax">تیپاکس اکسپرس</option>
              <option value="post">پست پیشتاز</option>
              <option value="courier">پیک اختصاصی شهری</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-700 font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="30">بازه زمانی: ۳۰ روز اخیر</option>
              <option value="today">امروز</option>
              <option value="7">۷ روز اخیر</option>
              <option value="90">۳ ماه گذشته</option>
            </select>
          </div>

          <div className="lg:col-span-3 flex justify-end">
            <button
              onClick={handleResetFilters}
              type="button"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 text-[13px] font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>بازنشانی فیلترها</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Orders Data Table */}
      <div className="w-full rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col overflow-hidden">
        <div
          className="overflow-x-auto w-full no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <table className="w-full text-right border-collapse select-text min-w-[750px] lg:min-w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[12px] font-bold">
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-3">شناسه و زمان</th>
                <th className="py-3 px-3">مشتری و مقصد</th>
                <th className="py-3 px-3">اقلام سفارش</th>
                <th className="py-3 px-3">مبلغ و وضعیت</th>
                <th className="py-3 px-3">وضعیت سفارش</th>
                <th className="py-3 px-3 whitespace-nowrap">روش ارسال</th>
                <th className="py-3 px-3 text-center w-24 whitespace-nowrap">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 text-[12.5px]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedOrderIds.includes(order.id)}
                      onChange={() => handleSelectOne(order.id)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                    />
                  </td>

                  {/* ID & Time */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span
                        onClick={() => setActiveInvoiceOrder(order)}
                        className="font-mono font-bold text-blue-600 text-[13px] hover:underline cursor-pointer"
                      >
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">{order.createdAt}</span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full ${order.customerAvatarBg} font-bold flex items-center justify-center text-xs shrink-0`}
                      >
                        {order.customerInitials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-[12.5px]">{order.customerName}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5">{order.destination}</span>
                      </div>
                    </div>
                  </td>

                  {/* Items */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5 max-w-[220px]">
                      <img
                        src={order.items[0]?.image}
                        alt="Product"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                      />
                      <div className="flex flex-col truncate">
                        <span className="font-semibold text-slate-800 text-[12.5px] truncate">
                          {order.items[0]?.productName}
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          {order.items[0]?.variant || `کد: ${order.items[0]?.sku}`}
                          {order.otherItemsCount ? ` + ${order.otherItemsCount} قلم دیگر` : ''}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Amount & Payment */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-[13px]">
                        {order.totalAmount.toLocaleString('fa-IR')}{' '}
                        <span className="text-[11px] font-normal text-slate-400">تومان</span>
                      </span>
                      <div
                        className={`mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold w-fit whitespace-nowrap ${
                          order.paymentStatus === 'paid'
                            ? 'bg-emerald-50 text-emerald-700'
                            : order.paymentStatus === 'pending'
                            ? 'bg-amber-50 text-amber-700'
                            : order.paymentStatus === 'wallet'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            order.paymentStatus === 'paid'
                              ? 'bg-emerald-500'
                              : order.paymentStatus === 'pending'
                              ? 'bg-amber-500'
                              : order.paymentStatus === 'wallet'
                              ? 'bg-blue-600'
                              : 'bg-red-500'
                          }`}
                        ></span>
                        <span>{order.paymentMethodTitle}</span>
                      </div>
                    </div>
                  </td>

                  {/* Order Status */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {order.orderStatus === 'processing' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11.5px] font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        <span>در حال پردازش</span>
                      </span>
                    )}
                    {order.orderStatus === 'pending_payment' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11.5px] font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span>در انتظار پرداخت</span>
                      </span>
                    )}
                    {order.orderStatus === 'preparing' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11.5px] font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        <span>آماده‌سازی</span>
                      </span>
                    )}
                    {order.orderStatus === 'dispatched' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 text-[11.5px] font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
                        <span>ارسال شده</span>
                      </span>
                    )}
                    {order.orderStatus === 'delivered' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11.5px] font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>تحویل داده شده</span>
                      </span>
                    )}
                    {order.orderStatus === 'returned' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[11.5px] font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span>مرجوع شده</span>
                      </span>
                    )}
                    {order.orderStatus === 'cancelled' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-[11.5px] font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        <span>لغو شده</span>
                      </span>
                    )}
                  </td>

                  {/* Shipping Method */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700 text-[12px]">{order.shippingMethodTitle}</span>
                      <span className="font-mono text-[11px] text-slate-400 mt-0.5" dir="ltr">
                        {order.trackingCode}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setActiveInvoiceOrder(order)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="مشاهده فاکتور"
                        type="button"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {order.orderStatus === 'pending_payment' ? (
                        <button
                          onClick={() => alert(`پیامک یادآوری پرداخت برای شماره ${order.phone} ارسال شد.`)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          title="ارسال پیامک یادآوری"
                          type="button"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      ) : order.orderStatus === 'returned' ? (
                        <button
                          onClick={() => alert(`علت مرجوعی: ${order.notes}`)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="علت مرجوعی"
                          type="button"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveInvoiceOrder(order);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="چاپ برچسب پستی"
                          type="button"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. Table Footer & Pagination */}
        <div className="py-4 px-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[12.5px]">
            <span>
              نمایش <strong className="text-slate-800 font-bold">۱ تا {filteredOrders.length}</strong> از{' '}
              <strong className="text-slate-800 font-bold">۱,۲۸۴</strong> سفارش
            </span>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span>تعداد در صفحه:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {[10, 25, 50].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setItemsPerPage(size)}
                    className={`px-2.5 py-0.5 rounded-lg text-[12px] cursor-pointer transition-colors ${
                      itemsPerPage === size
                        ? 'bg-white shadow-xs text-blue-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900 font-medium'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Buttons (RTL/LTR mirror) */}
          <div className="flex items-center gap-1.5" dir="ltr">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 disabled:opacity-40 cursor-pointer"
              title="صفحه قبل"
              type="button"
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-xl text-[13px] font-bold cursor-pointer transition-colors ${
                currentPage === 1 ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              ۱
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-xl text-[13px] font-medium cursor-pointer transition-colors ${
                currentPage === 2 ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              ۲
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded-xl text-[13px] font-medium cursor-pointer transition-colors ${
                currentPage === 3 ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              ۳
            </button>
            <span className="px-1 text-slate-400 text-xs">...</span>
            <button
              onClick={() => setCurrentPage(128)}
              className="w-8 h-8 rounded-xl text-slate-600 hover:bg-slate-100 text-[13px] font-medium transition-colors cursor-pointer"
            >
              ۱۲۸
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="صفحه بعد"
              type="button"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Manual Order Creation Modal */}
      {showManualOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">ثبت سفارش دستی جدید</h3>
              </div>
              <button
                onClick={() => setShowManualOrderModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نام خریدار</label>
                <input
                  type="text"
                  required
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="مثال: علیرضا محمدی"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">شماره تماس</label>
                  <input
                    type="text"
                    required
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    placeholder="۰۹۱۲..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">شهر مقصد</label>
                  <input
                    type="text"
                    value={newCustomerCity}
                    onChange={(e) => setNewCustomerCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نام محصول سفارش داده شده</label>
                <input
                  type="text"
                  value={newProductTitle}
                  onChange={(e) => setNewProductTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">مبلغ سفارش (تومان)</label>
                  <input
                    type="number"
                    value={newProductAmount}
                    onChange={(e) => setNewProductAmount(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">روش ارسال</label>
                  <select
                    value={newShippingMethod}
                    onChange={(e) => setNewShippingMethod(e.target.value as ShippingMethod)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="tipax">تیپاکس اکسپرس</option>
                    <option value="post">پست پیشتاز</option>
                    <option value="courier">پیک اختصاصی شهری</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowManualOrderModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  ثبت و صدور فاکتور
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      <OrderInvoiceModal
        order={activeInvoiceOrder}
        isOpen={Boolean(activeInvoiceOrder)}
        onClose={() => setActiveInvoiceOrder(null)}
        onStatusChange={(id, newStatus) => {
          setOrders(
            orders.map((o) => (o.id === id ? { ...o, orderStatus: newStatus } : o))
          );
          if (activeInvoiceOrder) {
            setActiveInvoiceOrder({ ...activeInvoiceOrder, orderStatus: newStatus });
          }
          alert(`وضعیت سفارش با موفقیت به روزرسانی شد.`);
        }}
      />
    </div>
  );
};
