import React, { useState } from 'react';
import { initialBrands } from '../data/brands';
import { Brand } from '../types';
import { Plus, Search, Bookmark, ExternalLink, Edit2, X } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEnglishName, setNewEnglishName] = useState('');

  const filteredBrands = brands.filter(
    (b) =>
      b.name.includes(searchQuery) ||
      b.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newB: Brand = {
      id: `b-${Date.now()}`,
      name: newName,
      englishName: newEnglishName || newName,
      productsCount: 0,
      logo: '/images/brand-sony.jpg',
      categories: ['کالای دیجیتال'],
      isActive: true
    };

    setBrands([...brands, newB]);
    setShowAddModal(false);
    setNewName('');
    setNewEnglishName('');
    alert('برند تجاری جدید اضافه شد.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">برندها و شرکای تجاری</h1>
          <p className="text-xs text-slate-500 mt-1">مدیریت برندهای کاتالوگ فروشگاه و دسته‌بندی‌های تحت پوشش</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن برند جدید</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی برند فارسی یا انگلیسی..."
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-400">تعداد: {filteredBrands.length} برند فعال</span>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBrands.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center gap-3.5 mb-3">
              <img src={b.logo} alt={b.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">{b.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{b.englishName}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>تعداد کالاهای فعال:</span>
                <span className="font-bold text-slate-800">{b.productsCount} محصول</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {b.categories.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                فعال در ویترین
              </span>
              <button
                onClick={() => alert(`ویرایش برند ${b.name}`)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">افزودن برند تجاری جدید</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBrand} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نام فارسی برند *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: سامسونگ"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نام لاتین (English Name)</label>
                <input
                  type="text"
                  value={newEnglishName}
                  onChange={(e) => setNewEnglishName(e.target.value)}
                  placeholder="Samsung"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none font-mono text-left"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
                  ثبت برند
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
