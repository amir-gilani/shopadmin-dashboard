import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  Upload,
  Check,
  Package,
  Layers,
  Tag,
  DollarSign,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { initialProducts } from '../data/products';
import { initialCategories } from '../data/categories';
import { initialBrands } from '../data/brands';

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const existingProduct = isEditing ? initialProducts.find((p) => p.id === id) : null;

  const [title, setTitle] = useState(existingProduct?.title || '');
  const [sku, setSku] = useState(existingProduct?.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`);
  const [brand, setBrand] = useState(existingProduct?.brand || 'سونی');
  const [category, setCategory] = useState(existingProduct?.category || 'کالای دیجیتال');
  const [price, setPrice] = useState(existingProduct?.price?.toString() || '3450000');
  const [originalPrice, setOriginalPrice] = useState(existingProduct?.originalPrice?.toString() || '3900000');
  const [discountPercent, setDiscountPercent] = useState(existingProduct?.discountPercentage?.toString() || '11');
  const [stock, setStock] = useState(existingProduct?.stock?.toString() || '15');
  const [warehouseLocation, setWarehouseLocation] = useState(
    existingProduct?.warehouseLocation || 'انبار مرکزی - راهرو B، قفسه ۰۴'
  );
  const [description, setDescription] = useState(
    existingProduct?.description || 'توضیحات و مشخصات فنی کامل کالا برای نمایش به مشتریان...'
  );
  const [imageUrl, setImageUrl] = useState(
    existingProduct?.image || '/images/headphone.jpg'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      alert('لطفاً عنوان کالا و قیمت را تکمیل نمایید.');
      return;
    }

    alert(isEditing ? 'تغییرات کالا با موفقیت ذخیره شد.' : 'کالای جدید به کاتالوگ فروشگاه اضافه شد.');
    navigate('/products');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isEditing ? 'ویرایش کالا' : 'افزودن محصول جدید'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing ? 'بروزرسانی مشخصات فنی، قیمت و موجودی انبار' : 'ثبت کالای نو در انبار مرکزی و ویترین فروشگاه'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/products')}
            type="button"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
          >
            {isEditing ? 'ذخیره تغییرات' : 'انتشار محصول'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Title & Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">اطلاعات اولیه کالا</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">نام و عنوان محصول *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: هدفون بی‌سیم سونی مدل WH-1000XM5"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">توضیحات و نقد و بررسی محصول</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیحات دقیق، مشخصات فنی و گارانتی محصول..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Discounts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">قیمت‌گذاری و تخفیف</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">قیمت فروش (تومان) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">قیمت قبل از تخفیف (تومان)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">درصد تخفیف (٪)</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Inventory & Warehouse Location */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800">انبارداری و موجودی فیزیکی</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">کد اختصاصی SKU *</label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">تعداد موجودی کل (عدد) *</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1.5">موقعیت دقیق در قفسه‌بندی انبار</label>
                <input
                  type="text"
                  value={warehouseLocation}
                  onChange={(e) => setWarehouseLocation(e.target.value)}
                  placeholder="مثال: انبار مرکزی - راهرو B، قفسه ۰۴"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Organization, Media & Status */}
        <div className="space-y-6">
          {/* Section 4: Image */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800">تصویر شاخص کالا</h4>
            <div className="aspect-video sm:aspect-square w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden relative">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">آدرس اینترنتی تصویر (URL)</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none font-mono text-left"
              />
            </div>
          </div>

          {/* Section 5: Classification */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800">دسته‌بندی و برند</h4>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">دسته‌بندی اصلی</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                {initialCategories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">برند سازنده</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                {initialBrands.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name} ({b.englishName})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
