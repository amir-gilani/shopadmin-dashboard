import React, { useState } from 'react';
import {
  Plus,
  ArrowUpDown,
  Search,
  Laptop,
  ShoppingBag,
  Home,
  Heart,
  BookOpen,
  Info,
  Edit2,
  X,
  Check,
  FolderTree
} from 'lucide-react';
import { initialCategories } from '../data/categories';
import { Category } from '../types';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [structureFilter, setStructureFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Add/Edit category modal
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [categoryParent, setCategoryParent] = useState<'شاخه اصلی' | 'زیرشاخه'>('شاخه اصلی');

  const filteredCategories = categories.filter((cat) => {
    if (structureFilter === 'main' && cat.parentType !== 'شاخه اصلی') return false;
    if (statusFilter === 'active' && !cat.isActive) return false;
    if (statusFilter === 'draft' && cat.isActive) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!cat.name.includes(searchQuery) && !cat.slug.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'book-open':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <FolderTree className="w-5 h-5" />;
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategorySlug('');
    setCategoryParent('شاخه اصلی');
    setShowModal(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategorySlug(cat.slug);
    setCategoryParent(cat.parentType);
    setShowModal(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName) return;

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: categoryName, slug: categorySlug, parentType: categoryParent }
            : c
        )
      );
      alert('دسته‌بندی با موفقیت ویرایش شد.');
    } else {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name: categoryName,
        slug: categorySlug || `category//${categoryName.replace(/\s+/g, '-')}`,
        iconName: 'folder',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        parentType: categoryParent,
        productCount: 0,
        salesSharePercentage: 0,
        isActive: true,
        depth: categoryParent === 'شاخه اصلی' ? 1 : 2
      };
      setCategories([...categories, newCat]);
      alert('دسته‌بندی جدید به ساختار درختی اضافه شد.');
    }

    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto" data-purpose="inventory-dashboard">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div className="flex flex-col gap-1.5">
          <nav className="flex items-center gap-2 text-slate-500 text-[12px]">
            <a className="hover:text-blue-600 transition-colors" href="#">داشبورد</a>
            <span className="text-slate-300">/</span>
            <span className="hover:text-blue-600 transition-colors">کاتالوگ و محصولات</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">دسته‌بندی‌ها</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">مدیریت دسته‌بندی‌ها</h1>
            <span className="bg-blue-50 text-blue-700 border border-blue-200/70 text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
              ۱۲ دسته کلیدی
            </span>
          </div>
          <p className="text-slate-500 text-[13px]">
            ساختار درختی، چینش سلسله‌مراتبی و سازماندهی محصولات فروشگاه
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert('حالت جابجایی ترتیبی دسته‌ها فعال شد.')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-[13px] font-medium shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            type="button"
          >
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <span>مرتب‌سازی دسته‌ها</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-medium shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
            type="button"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>افزودن دسته‌بندی جدید</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 text-[12px] font-medium">کل دسته‌بندی‌های پایه</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-slate-800 text-2xl font-extrabold">۱۲</span>
              <span className="text-emerald-600 font-semibold text-[12px]">دسته اصلی</span>
            </div>
            <span className="text-slate-400 text-[11px] mt-0.5">پوشش ۱۰۰٪ کاتالوگ فروشگاه</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <FolderTree className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 text-[12px] font-medium">زیردسته‌ها و انشعابات</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-slate-800 text-2xl font-extrabold">۴۸</span>
              <span className="text-blue-600 font-semibold text-[12px]">زیرشاخه</span>
            </div>
            <span className="text-slate-400 text-[11px] mt-0.5">میانگین ۴ لایه به‌ازای هر بخش</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
            <FolderTree className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 text-[12px] font-medium">پرمحصول‌ترین دسته‌بندی</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-slate-800 font-bold text-[15px] truncate max-w-[130px]">کالای دیجیتال</span>
              <span className="text-slate-500 text-[12px]">۴۲۰ کالا</span>
            </div>
            <span className="text-emerald-600 text-[11px] font-medium mt-0.5">۴۲٪ سهم گردش انبار</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 text-[12px] font-medium">تخفیف‌های فعال فصلی</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-slate-800 text-2xl font-extrabold">۵</span>
              <span className="text-rose-600 font-semibold text-[12px]">دسته در حراج</span>
            </div>
            <span className="text-slate-400 text-[11px] mt-0.5">کمپین فعال بلک‌فرایدی</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2-Column Section: Table on Right + Analytics on Left */}
      <div className="flex flex-col 2xl:flex-row gap-6 items-start w-full">
        {/* Main Table Container */}
        <div className="flex-1 min-w-0 w-full flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          {/* Top Filter Bar */}
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 bg-white">
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو بر اساس نام دسته‌بندی یا نامک انگلیسی..."
                className="w-full pl-3 pr-9 py-2 text-[13px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end flex-wrap">
              <select
                value={structureFilter}
                onChange={(e) => setStructureFilter(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">همه سطوح ساختار</option>
                <option value="main">دسته‌های اصلی (والد)</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="active">فقط دسته‌های فعال</option>
                <option value="draft">پیش‌نویس / غیرفعال</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-right border-collapse min-w-[620px]">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-[12px] select-none">
                <tr>
                  <th className="py-3.5 px-4 font-semibold text-right">دسته‌بندی و مسیر</th>
                  <th className="py-3.5 px-3 font-semibold text-center w-20">نوع ساختار</th>
                  <th className="py-3.5 px-3 font-semibold text-center w-20">محصولات</th>
                  <th className="py-3.5 px-3 font-semibold text-center w-28">سهم فروش</th>
                  <th className="py-3.5 px-3 font-semibold text-center w-24">وضعیت</th>
                  <th className="py-3.5 px-4 font-semibold text-center w-24 shrink-0">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-[13px]">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${cat.iconBg} ${cat.iconColor} border border-slate-100 flex items-center justify-center shrink-0`}
                        >
                          {getCategoryIcon(cat.iconName)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-800 leading-snug truncate">{cat.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono tracking-tight truncate">
                            {cat.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <div className="flex flex-col items-center justify-center leading-tight">
                        <span className="text-slate-700 text-[13px] font-medium">{cat.parentType}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <div className="flex flex-col items-center justify-center leading-tight">
                        <span className="font-bold text-slate-800 text-[13px]">{cat.productCount}</span>
                        <span className="text-slate-400 text-[11px]">کالا</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <span className="text-[12px] font-semibold text-slate-600 w-6 text-right shrink-0">
                          {cat.salesSharePercentage}٪
                        </span>
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${cat.salesSharePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      {cat.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[12px] font-medium shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>فعال
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[12px] font-medium shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>پیش‌نویس
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center shrink-0">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={handleOpenAdd}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                          title="افزودن زیرشاخه"
                          type="button"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                          title="ویرایش دسته‌بندی"
                          type="button"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="py-3.5 px-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 flex-wrap gap-2">
            <span>نمایش ۱ تا {filteredCategories.length} از ۱۲ دسته‌بندی</span>
            <div className="flex items-center gap-1.5">
              <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700 disabled:opacity-40" disabled type="button">
                قبلی
              </button>
              <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold">۱</span>
              <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۲</button>
              <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۳</button>
              <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">بعدی</button>
            </div>
          </div>
        </div>

        {/* Left Column: Side Analytics Cards */}
        <div className="w-full 2xl:w-80 shrink-0 flex flex-col sm:flex-row 2xl:flex-col gap-4">
          {/* Distribution card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col gap-3.5 flex-1 2xl:flex-initial">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-slate-800 font-bold text-[13.5px]">توزیع اقلام کاتالوگ</span>
              </div>
              <span className="text-emerald-600 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                بروزرسانی زنده
              </span>
            </div>

            <div className="w-full flex h-2 rounded-full overflow-hidden gap-1 bg-slate-100 p-0.5">
              <div className="bg-blue-600 rounded-full" style={{ width: '42%' }} title="دیجیتال ۴۲٪"></div>
              <div className="bg-purple-500 rounded-full" style={{ width: '28%' }} title="پوشاک ۲۸٪"></div>
              <div className="bg-amber-500 rounded-full" style={{ width: '15%' }} title="خانه ۱۵٪"></div>
              <div className="bg-teal-500 rounded-full" style={{ width: '10%' }} title="سلامت ۱۰٪"></div>
              <div className="bg-slate-300 rounded-full" style={{ width: '5%' }} title="سایر ۵٪"></div>
            </div>

            <div className="flex flex-col gap-2 pt-0.5">
              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                  <span className="text-slate-700 font-medium truncate">کالای دیجیتال</span>
                </div>
                <span className="text-slate-500 text-[11.5px] font-semibold shrink-0">۴۲٪ (۴۲۰ عدد)</span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                  <span className="text-slate-700 font-medium truncate">پوشاک و مد</span>
                </div>
                <span className="text-slate-500 text-[11.5px] font-semibold shrink-0">۲۸٪ (۳۱۰ عدد)</span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span className="text-slate-700 font-medium truncate">خانه و آشپزخانه</span>
                </div>
                <span className="text-slate-500 text-[11.5px] font-semibold shrink-0">۱۵٪ (۱۸۵ عدد)</span>
              </div>

              <div className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
                  <span className="text-slate-700 font-medium truncate">زیبایی و سلامت</span>
                </div>
                <span className="text-slate-500 text-[11.5px] font-semibold shrink-0">۱۰٪ (۱۴۲ عدد)</span>
              </div>
            </div>
          </div>

          {/* SEO & Slug Advice Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col gap-3 flex-1 2xl:flex-initial">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-slate-800 font-bold text-[13px]">استاندارد شاخه‌بندی و سئو</span>
            </div>
            <p className="text-slate-500 text-[11.5px] leading-relaxed">
              عمق دسته‌بندی‌ها نباید بیش از ۳ لایه باشد و نامک‌ها (Slug) به‌صورت لاتین و خط تیره تنظیم شوند.
            </p>
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-2.5 flex items-center justify-between">
              <span className="text-slate-600 text-[11.5px]">امتیاز ساختار:</span>
              <span className="text-emerald-600 font-bold text-[11.5px]">عالی (۹۴ از ۱۰۰)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">
                {editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نام دسته‌بندی فارسی</label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="مثال: ساعت هوشمند و مچ‌بند"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نامک انگلیسی (Slug)</label>
                <input
                  type="text"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  placeholder="smart-watches"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-left"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نوع شاخه</label>
                <select
                  value={categoryParent}
                  onChange={(e) => setCategoryParent(e.target.value as 'شاخه اصلی' | 'زیرشاخه')}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="شاخه اصلی">شاخه اصلی (والد)</option>
                  <option value="زیرشاخه">زیرشاخه فرعی</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  ذخیره دسته‌بندی
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
