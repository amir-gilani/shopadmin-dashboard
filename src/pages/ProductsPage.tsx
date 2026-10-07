import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileDown,
  Tag,
  Layers,
  Plus,
  Search,
  ChevronDown,
  X,
  LayoutList,
  LayoutGrid,
  TrendingUp,
  Box,
  AlertTriangle,
  Check,
  Edit3,
  ExternalLink,
  MoreVertical,
  Trash2,
  Eye
} from 'lucide-react';
import { initialProducts } from '../data/products';
import { Product } from '../types';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStockStatus, setSelectedStockStatus] = useState('');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedStockStatus === 'critical' && p.stockStatus !== 'critical') return false;
    if (selectedStockStatus === 'sufficient' && p.stockStatus !== 'sufficient') return false;
    if (selectedStockStatus === 'out' && p.stock > 0) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      if (!matchTitle && !matchSku && !matchBrand) return false;
    }

    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleToggleSelectOne = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((item) => item !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('آیا از حذف این کالا از انبار اطمینان دارید؟')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleQuickPriceUpdate = () => {
    const percent = prompt('درصد افزایش یا کاهش قیمت عمومی را وارد نمایید (مثال: 5 یا -5):', '5');
    if (percent && !isNaN(Number(percent))) {
      const p = Number(percent);
      setProducts(
        products.map((item) => ({
          ...item,
          price: Math.round(item.price * (1 + p / 100))
        }))
      );
      alert(`قیمت کلیه محصولات با ضریب ${p}٪ بروزرسانی گردید.`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-7 max-w-7xl w-full mx-auto" data-purpose="dashboard-main-view">
      {/* BEGIN: Page Header & Global Actions */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-card">
        <div className="flex flex-col gap-2 min-w-0">
          <nav className="inline-flex items-center flex-row gap-2 text-slate-400 text-xs whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
              پیشخوان
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 whitespace-nowrap shrink-0">کاتالوگ و انبار</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-semibold whitespace-nowrap shrink-0">مدیریت محصولات</span>
          </nav>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">کاتالوگ و مدیریت محصولات</h1>
            <p className="text-xs text-slate-500 mt-1">
              مدیریت متمرکز کالاها، تنوع‌ها، رصد برخط موجودی انبار مرکزی و تعیین ساختار قیمت‌گذاری
            </p>
          </div>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => alert('فایل اکسل کاتالوگ دانلود شد.')}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>خروجی اکسل / CSV</span>
          </button>

          <button
            onClick={handleQuickPriceUpdate}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Tag className="w-4 h-4 text-slate-500" />
            <span>به‌روزرسانی سریع قیمت‌ها</span>
          </button>

          <button
            onClick={() => {
              if (selectedProductIds.length === 0) {
                alert('لطفاً ابتدا حداقل یک کالا را انتخاب کنید.');
              } else {
                alert(`${selectedProductIds.length} کالا برای عملیات گروهی انتخاب شد.`);
              }
            }}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>عملیات گروهی</span>
          </button>

          <button
            onClick={() => navigate('/products/new')}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>افزودن محصول جدید</span>
          </button>
        </div>
      </section>

      {/* BEGIN: KPI Status Grid (5 Metrics Across) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Active Products */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">کل محصولات فعال</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Box className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 leading-tight">
              ۱,۴۲۸ <span className="text-xs text-slate-400 font-normal">کالا</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                +۱۲ این هفته
              </span>
              <span className="text-[10px] text-slate-400">رشد کاتالوگ</span>
            </div>
          </div>
        </article>

        {/* Card 2: Sellable Stock */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">موجودی آماده فروش</span>
            <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <Layers className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 leading-tight">
              ۸,۹۴۰ <span className="text-xs text-slate-400 font-normal">عدد</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-slate-400">در ۹ انبار و مرکز توزیع</span>
            </div>
          </div>
        </article>

        {/* Card 3: Low Stock Warning */}
        <article className="bg-gradient-to-br from-rose-50/70 to-red-50/40 rounded-2xl p-4 border border-rose-100 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-700">رو به اتمام / بحرانی</span>
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4.5 h-4.5 stroke-[2]" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-600 leading-tight">
              ۱۸ <span className="text-xs text-rose-400 font-normal">قلم</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-800 text-[10px] font-bold">
                نیاز فوری به شارژ
              </span>
            </div>
          </div>
        </article>

        {/* Card 4: Out of Stock */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">کالاهای ناموجود</span>
            <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
              <Box className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 leading-tight">
              ۶ <span className="text-xs text-slate-400 font-normal">محصول</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] text-slate-500">۰.۴٪ از کل سبد کالایی</span>
            </div>
          </div>
        </article>

        {/* Card 5: Profit Margin */}
        <article className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">میانگین حاشیه سود</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-slate-900 leading-tight">۳۴.۸٪</div>
              <svg className="w-16 h-7 text-emerald-500 overflow-visible" fill="none" viewBox="0 0 70 28">
                <path d="M2 24 L14 20 L28 22 L42 12 L56 15 L68 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
                <path d="M2 24 L14 20 L28 22 L42 12 L56 15 L68 4 V 28 H 2 Z" fill="currentColor" fillOpacity="0.12" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] text-emerald-600 font-bold">+۲.۱٪</span>
              <span className="text-[10px] text-slate-400">نسبت به ماه قبل</span>
            </div>
          </div>
        </article>
      </section>

      {/* BEGIN: Filters, Search & View Controls */}
      <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="xl:col-span-4 relative flex items-center">
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 shrink-0" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی نام کالا، کد SKU، بارکد یا برند..."
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 text-slate-800 placeholder:text-slate-400 text-xs rounded-xl border border-slate-200/80 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-500 shadow-xs"
            />
          </div>

          {/* Category Filter */}
          <div className="xl:col-span-2 relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pr-3.5 pl-9 py-2.5 bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-xs rounded-xl border border-slate-200/80 outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-600"
            >
              <option value="">همه‌ دسته‌بندی‌ها</option>
              <option value="کالای دیجیتال">کالای دیجیتال</option>
              <option value="زیبایی و سلامت">زیبایی و سلامت</option>
              <option value="پوشاک و مد">پوشاک و مد</option>
              <option value="خانه و آشپزخانه">خانه و آشپزخانه</option>
            </select>
          </div>

          {/* Stock Status Filter */}
          <div className="xl:col-span-2 relative">
            <select
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value)}
              className="w-full appearance-none pr-3.5 pl-9 py-2.5 bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-xs rounded-xl border border-slate-200/80 outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-600"
            >
              <option value="">وضعیت انبار: همه</option>
              <option value="sufficient">موجود در انبار</option>
              <option value="critical">موجودی بحرانی (کمتر از ۵)</option>
              <option value="out">اتمام موجودی</option>
            </select>
          </div>

          {/* Publication Status Filter */}
          <div className="xl:col-span-2 relative">
            <select className="w-full appearance-none pr-3.5 pl-9 py-2.5 bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-xs rounded-xl border border-slate-200/80 outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-600">
              <option value="">وضعیت انتشار: همه</option>
              <option value="active">فعال و قابل خرید</option>
              <option value="draft">پیش‌نویس</option>
              <option value="archived">بایگانی شده</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="xl:col-span-2 relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full appearance-none pr-3.5 pl-9 py-2.5 bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-xs rounded-xl border border-slate-200/80 outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-600"
            >
              <option value="popular">مرتب‌سازی: پرفروش‌ترین</option>
              <option value="newest">جدیدترین کالاها</option>
              <option value="price_asc">ارزان‌ترین</option>
              <option value="price_desc">گران‌ترین</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags & Quick Counter */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs text-slate-500">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[11px] text-slate-400">فیلترهای اعمال شده:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
              وضعیت: فعال
              <button className="hover:text-rose-600 transition-colors flex items-center" type="button">
                <X className="w-3 h-3" />
              </button>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
              انبار مرکزی
              <button className="hover:text-rose-600 transition-colors flex items-center" type="button">
                <X className="w-3 h-3" />
              </button>
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedStockStatus('');
              }}
              className="text-blue-600 hover:underline text-[11px] font-semibold mr-1 cursor-pointer"
              type="button"
            >
              پاک کردن همه
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px]">نمایش نتایج بر اساس موجودی فعال انبار</span>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="نمایش جدولی"
                type="button"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="نمایش شبکه‌ای"
                type="button"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BEGIN: Products Catalog View (Table or Grid) */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden flex flex-col">
        {viewMode === 'table' ? (
          <div
            className="overflow-x-auto w-full no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <table className="w-full text-right border-collapse select-none min-w-[720px] lg:min-w-full">
              <thead className="bg-slate-50/80 text-slate-500 text-[11px] font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-3 w-8 text-center">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-white border-slate-300 shadow-xs cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3 font-semibold">مشخصات محصول</th>
                  <th className="py-3 px-2 font-semibold whitespace-nowrap">دسته‌بندی</th>
                  <th className="py-3 px-3 font-semibold whitespace-nowrap">قیمت پایه و فروش</th>
                  <th className="py-3 px-3 font-semibold whitespace-nowrap">موجودی انبار</th>
                  <th className="py-3 px-2 font-semibold whitespace-nowrap">فروش ۳۰ روز</th>
                  <th className="py-3 px-2 font-semibold whitespace-nowrap text-center">وضعیت کالا</th>
                  <th className="py-3 px-3 text-left font-semibold whitespace-nowrap">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={() => handleToggleSelectOne(product.id)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-white border-slate-300 shadow-xs cursor-pointer"
                      />
                    </td>

                    {/* Product info */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative border border-slate-200/80">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                          <span
                            className={`absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ring-white ${
                              product.stockStatus === 'critical' ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                          ></span>
                        </div>
                        <div className="flex flex-col min-w-0 max-w-[200px] sm:max-w-xs">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {product.title}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                              {product.sku}
                            </span>
                            <span>برند: {product.brand}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {product.category}
                      </span>
                    </td>

                    {/* Pricing */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span className="font-bold text-slate-900 text-xs">
                            {product.price.toLocaleString('fa-IR')}
                          </span>
                          <span className="text-[9px] text-slate-400">تومان</span>
                        </div>
                        {product.discountPercentage ? (
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
                            <span className="line-through text-slate-400 text-[10px]">
                              {product.originalPrice?.toLocaleString('fa-IR')}
                            </span>
                            <span className="px-1 py-0.2 rounded bg-rose-50 text-rose-600 font-bold text-[9px]">
                              {product.discountPercentage}٪-
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 mt-0.5">قیمت مصوب کاتالوگ</span>
                        )}
                      </div>
                    </td>

                    {/* Inventory */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1 min-w-[110px]">
                        <div className="flex items-center justify-between text-[10px]">
                          {product.stockStatus === 'critical' ? (
                            <span className="text-rose-600 font-bold flex items-center gap-0.5">
                              <AlertTriangle className="w-3 h-3 text-rose-500" />
                              {product.sellableStock} عدد (بحرانی)
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-bold">
                              {product.sellableStock} عدد موجود
                            </span>
                          )}
                          <span className="text-slate-400 text-[9px]">
                            {product.warehouseLocation.includes('غرب') ? 'انبار غرب' : 'انبار مرکزی'}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              product.stockStatus === 'critical' ? 'bg-rose-500 w-[15%]' : 'bg-emerald-500 w-[75%]'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* 30 Day Sales */}
                    <td className="py-3 px-2 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-xs">{product.salesLast30Days} عدد</span>
                        <span className="text-[10px] text-slate-400">{product.salesVolumeTomans}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-2 whitespace-nowrap text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        فعال / در حال فروش
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-left whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => navigate(`/products/${product.id}/edit`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-all cursor-pointer"
                          title="ویرایش کالا"
                          type="button"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`کالای ${product.title} در فروشگاه در حال نمایش است.`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-all cursor-pointer"
                          title="مشاهده در فروشگاه"
                          type="button"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                          title="حذف کالا"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {product.discountPercentage ? (
                    <span className="absolute top-2 right-2 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
                      {product.discountPercentage}٪ تخفیف
                    </span>
                  ) : null}
                  <span
                    className={`absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                      product.stockStatus === 'critical'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    موجودی: {product.sellableStock} عدد
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{product.brand}</span>
                    <span className="font-mono">{product.sku}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{product.title}</h4>

                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      {product.price.toLocaleString('fa-IR')} تومان
                    </span>
                    <button
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                      title="ویرایش"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BEGIN: Table Bottom Pagination Bar */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              نمایش <strong className="text-slate-800 font-bold">۱ تا {filteredProducts.length}</strong> از مجموع{' '}
              <strong className="text-slate-800 font-bold">۱,۴۲۸</strong> کالا در انبار
            </span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span>تعداد در صفحه:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-white border border-slate-200/80 text-slate-700 text-xs rounded-lg py-1 px-2 outline-none cursor-pointer shadow-xs"
              >
                <option value={10}>۱۰ قلم</option>
                <option value={20}>۲۰ قلم</option>
                <option value={50}>۵۰ قلم</option>
                <option value={100}>۱۰۰ قلم</option>
              </select>
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="w-8 h-8 rounded-lg border border-slate-200/80 bg-white text-slate-400 disabled:opacity-40 flex items-center justify-center cursor-pointer"
              type="button"
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-lg text-xs font-bold shadow-xs flex items-center justify-center cursor-pointer ${
                currentPage === 1 ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'
              }`}
              type="button"
            >
              ۱
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-lg text-xs font-medium border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer ${
                currentPage === 2 ? 'bg-blue-600 text-white' : ''
              }`}
              type="button"
            >
              ۲
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className="w-8 h-8 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center cursor-pointer"
              type="button"
            >
              ۳
            </button>
            <span className="w-6 text-center text-slate-400 text-xs">...</span>
            <button
              onClick={() => setCurrentPage(72)}
              className="w-8 h-8 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center cursor-pointer"
              type="button"
            >
              ۷۲
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-8 h-8 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer"
              type="button"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
