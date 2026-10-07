import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileDown,
  ArrowLeftRight,
  Plus,
  TrendingUp,
  Search,
  Headphones,
  Watch,
  Coffee,
  Keyboard,
  Droplets,
  ShoppingBag,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import {
  initialWarehouses,
  initialInventoryItems,
  initialInventoryLogs
} from '../data/inventory';
import { InventoryItem, StockAlert } from '../types';

export const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [selectedWarehouseTab, setSelectedWarehouseTab] = useState<'all' | 'central' | 'west' | 'east'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Stock Adjustment / Entry Modal State
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedItemForEntry, setSelectedItemForEntry] = useState<InventoryItem | null>(null);
  const [entryQuantity, setEntryQuantity] = useState(10);
  const [entryType, setEntryType] = useState<'inbound' | 'outbound'>('inbound');
  const [entryReason, setEntryReason] = useState('شارژ محموله وارداتی جدید');

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedWarehouseTab === 'central' && !item.warehouseLocation.includes('مرکزی')) return false;
    if (selectedWarehouseTab === 'west' && !item.warehouseLocation.includes('غرب')) return false;
    if (selectedWarehouseTab === 'east' && !item.warehouseLocation.includes('شرق')) return false;

    if (categoryFilter && item.category !== categoryFilter) return false;
    if (statusFilter && item.status !== statusFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.productName.toLowerCase().includes(q) && !item.sku.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  const handleApplyStockEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForEntry) return;

    setItems(
      items.map((it) => {
        if (it.id === selectedItemForEntry.id) {
          const delta = entryType === 'inbound' ? entryQuantity : -entryQuantity;
          const newTotal = Math.max(0, it.totalStock + delta);
          const newSellable = Math.max(0, it.sellableStock + delta);
          const newStatus: StockAlert =
            newSellable <= 3 ? 'critical' : newSellable <= it.reorderPoint ? 'reorder' : 'sufficient';
          return {
            ...it,
            totalStock: newTotal,
            sellableStock: newSellable,
            status: newStatus
          };
        }
        return it;
      })
    );

    setShowEntryModal(false);
    alert(
      `سند انبارداری با موفقیت ثبت شد: ${entryType === 'inbound' ? 'ورود' : 'خروج'} ${entryQuantity} واحد برای ${
        selectedItemForEntry.productName
      }`
    );
  };

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'headphones':
        return <Headphones className="w-5 h-5" />;
      case 'watch':
        return <Watch className="w-5 h-5" />;
      case 'coffee':
        return <Coffee className="w-5 h-5" />;
      case 'keyboard':
        return <Keyboard className="w-5 h-5" />;
      case 'droplets':
        return <Droplets className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto" data-purpose="inventory-dashboard">
      {/* Breadcrumbs & Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
            <span onClick={() => navigate('/')} className="hover:text-slate-600 cursor-pointer">
              داشبورد
            </span>
            <span className="text-slate-300">/</span>
            <span className="hover:text-slate-600 cursor-pointer">کاتالوگ و انبار</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-medium">انبارداری و موجودی</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            انبارداری و کنترل موجودی کالا
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            پایش برخط موجودی، مدیریت انبارهای فعال و کنترل هشدارهای تأمین کالا
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => alert('خروجی موجودی انبار آماده دانلود است.')}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>خروجی اکسل</span>
          </button>

          <button
            onClick={() => alert('فرم حواله انتقال بین‌انبار (مرکزی، غرب و شرق) باز شد.')}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4 text-slate-500" />
            <span>انتقال بین انبارها</span>
          </button>

          <button
            onClick={() => {
              setSelectedItemForEntry(items[0]);
              setShowEntryModal(true);
            }}
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>ثبت ورود / خروج کالا</span>
          </button>
        </div>
      </div>

      {/* BEGIN: KpiCardsGrid (4 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="inventory-kpis">
        {/* KPI 1: Total Valuation */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">ارزش کل موجودی</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 bg-emerald-50">
              <TrendingUp className="w-2.5 h-2.5" />
              ۴.۲٪+
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">۴,۸۵۰,۰۰۰,۰۰۰</span>
              <span className="text-[11px] text-slate-400 font-medium">تومان</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">ارزش قیمت تمام‌شده بر مبنای FIFO</p>
          </div>
        </div>

        {/* KPI 2: Total Units */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">کل اقلام فیزیکی</span>
            <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">۳ انبار فعال</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">۱۲,۴۵۰</span>
              <span className="text-[11px] text-slate-400 font-medium">عدد</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">شامل ۵۴۰ تنوع کد محصولی (SKU)</p>
          </div>
        </div>

        {/* KPI 3: Stock Warning */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">هشدارهای کسری کالا</span>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              نیاز به تأمین
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-rose-600 tracking-tight">۲۴</span>
              <span className="text-[11px] text-slate-400 font-medium">قلم بحرانی</span>
            </div>
            <p className="text-[11px] text-rose-500 font-medium mt-1">کمتر از نقطه سفارش (ROP)</p>
          </div>
        </div>

        {/* KPI 4: Dead Stock */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">کالاهای راکد (خواب سرمایه)</span>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">+۹۰ روز</span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-800 tracking-tight">۱۸</span>
              <span className="text-[11px] text-slate-400 font-medium">قلم کالا</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">پیشنهاد تخفیف پروموشن</p>
          </div>
        </div>
      </section>

      {/* BEGIN: TableFilterAndPills */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Filter Bar with Warehouse Tabs */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Warehouse Pill Tabs */}
          <div
            className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/60 overflow-x-auto no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => setSelectedWarehouseTab('all')}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                selectedWarehouseTab === 'all'
                  ? 'bg-white text-blue-600 shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>همه انبارها</span>
              <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full">۱۲,۴۵۰</span>
            </button>

            <button
              onClick={() => setSelectedWarehouseTab('central')}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                selectedWarehouseTab === 'central'
                  ? 'bg-white text-blue-600 font-bold shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>انبار مرکزی تهران</span>
              <span className="text-[10px] bg-slate-200/60 text-slate-600 px-1.5 py-0.5 rounded-full">۸,۹۴۰</span>
            </button>

            <button
              onClick={() => setSelectedWarehouseTab('west')}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                selectedWarehouseTab === 'west'
                  ? 'bg-white text-blue-600 font-bold shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>انبار توزیع غرب</span>
              <span className="text-[10px] bg-slate-200/60 text-slate-600 px-1.5 py-0.5 rounded-full">۲,۱۵۰</span>
            </button>

            <button
              onClick={() => setSelectedWarehouseTab('east')}
              type="button"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                selectedWarehouseTab === 'east'
                  ? 'bg-white text-blue-600 font-bold shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>انبار توزیع شرق</span>
              <span className="text-[10px] bg-slate-200/60 text-slate-600 px-1.5 py-0.5 rounded-full">۱,۳۶۰</span>
            </button>
          </div>

          {/* Quick Search & Select Controls */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <div className="relative w-full sm:w-60">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی کالا یا SKU..."
                className="w-full pl-3 pr-8 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="">همه دسته‌ها</option>
              <option value="کالای دیجیتال">کالای دیجیتال</option>
              <option value="خانه و آشپزخانه">خانه و آشپزخانه</option>
              <option value="زیبایی و مراقبت">زیبایی و مراقبت</option>
              <option value="پوشاک و مد">پوشاک و مد</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="">وضعیت موجودی</option>
              <option value="sufficient">کافی</option>
              <option value="reorder">نقطه سفارش</option>
              <option value="critical">کسری بحرانی</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div
          className="overflow-x-auto w-full no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <table className="w-full text-right text-xs min-w-[700px] lg:min-w-full">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4 font-medium">اطلاعات کالا و کد SKU</th>
                <th className="py-3.5 px-4 font-medium">لوکیشن در انبار</th>
                <th className="py-3.5 px-4 font-medium text-center">موجودی کل</th>
                <th className="py-3.5 px-4 font-medium text-center">رزرو شده</th>
                <th className="py-3.5 px-4 font-medium text-center">قابل فروش</th>
                <th className="py-3.5 px-4 font-medium text-center">وضعیت</th>
                <th className="py-3.5 px-4 font-medium text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        {getProductIcon(item.imageIcon)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block">
                          {item.productName}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5">SKU: {item.sku}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>{item.warehouseLocation}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">{item.totalStock} عدد</td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-medium">{item.reservedStock} عدد</td>
                  <td
                    className={`py-3.5 px-4 text-center font-bold ${
                      item.status === 'critical'
                        ? 'text-rose-600'
                        : item.status === 'reorder'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {item.sellableStock} عدد
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {item.status === 'critical' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                        کسری بحرانی
                      </span>
                    ) : item.status === 'reorder' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        نقطه سفارش
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        موجودی کافی
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedItemForEntry(item);
                        setShowEntryModal(true);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
                    >
                      {item.status === 'critical' || item.status === 'reorder' ? 'شارژ سریع' : 'ویرایش انبار'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>نمایش {filteredItems.length} از ۵۴۰ ردیف کالای انبار</span>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
              &lt;
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
              ۱
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 font-medium">
              ۲
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 font-medium">
              ۳
            </button>
            <span className="px-1 text-slate-300">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 font-medium">
              ۹۰
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* BEGIN: BottomAnalyticalCards (2 Cards) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6" data-purpose="inventory-insights">
        {/* Warehouse Physical Capacity Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">وضعیت ظرفیت فیزیکی انبارها</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">درصد اشغال قفسه‌ها و پالت‌های ذخیره‌سازی</p>
            </div>
            <span
              onClick={() => alert('تنظیمات قفسه‌بندی و پالت‌های انبار باز شد.')}
              className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              مدیریت قفسه‌بندی
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {initialWarehouses.map((wh) => (
              <div key={wh.id}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">{wh.name}</span>
                  <span className="font-bold text-slate-900">
                    {wh.occupiedPercentage}٪ پر است{' '}
                    <span className="text-slate-400 font-normal">
                      ({wh.occupiedCapacity.toLocaleString('fa-IR')} / {wh.totalCapacity.toLocaleString('fa-IR')} واحد)
                    </span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${
                      wh.occupiedPercentage > 75
                        ? 'bg-blue-600'
                        : wh.occupiedPercentage > 50
                        ? 'bg-emerald-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${wh.occupiedPercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Activity Log Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">آخرین گردش‌های لحظه‌ای انبار</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">لاگ ورود، خروج و جابجایی درون‌سازمانی</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="space-y-3">
            {initialInventoryLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    log.type === 'inbound'
                      ? 'bg-emerald-50 text-emerald-600'
                      : log.type === 'outbound'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  {log.type === 'inbound' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : log.type === 'outbound' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <ArrowLeftRight className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{log.title}</p>
                  <span className="text-[11px] text-slate-400">{log.reference}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{log.timeAgo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stock Adjustment Modal */}
      {showEntryModal && selectedItemForEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">ثبت گردش ورود / خروج کالا</h3>
              <button onClick={() => setShowEntryModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyStockEntry} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">کالای انتخابی</label>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-slate-900">{selectedItemForEntry.productName}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">SKU: {selectedItemForEntry.sku}</p>
                  <p className="text-[11px] text-slate-500 mt-1">موجودی فعلی: {selectedItemForEntry.totalStock} عدد</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEntryType('inbound')}
                  className={`py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    entryType === 'inbound'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  ورود به انبار (+)
                </button>
                <button
                  type="button"
                  onClick={() => setEntryType('outbound')}
                  className={`py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    entryType === 'outbound'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  خروج از انبار (-)
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">تعداد واحد</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={entryQuantity}
                  onChange={(e) => setEntryQuantity(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">شرح یا شماره سند حواله</label>
                <input
                  type="text"
                  value={entryReason}
                  onChange={(e) => setEntryReason(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowEntryModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  ثبت گردش انبار
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
