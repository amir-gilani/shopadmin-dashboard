import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  Smartphone,
  CheckCircle2,
  Lock,
  Mail,
  Calendar,
  Save
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [fullName, setFullName] = useState('امیر گیلانی');
  const [email, setEmail] = useState('amir.admin@shopadmin.ir');
  const [phone, setPhone] = useState('۰۹۱۲۹۸۷۶۵۴۳');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">پروفایل کاربری مدیر ارشد</h1>
        <p className="text-xs text-slate-500 mt-1">مشخصات هویتی، امنیت حساب کاربری و تنظیمات ورود به سامانه</p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>اطلاعات پروفایل با موفقیت بروزرسانی شد.</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-black text-2xl flex items-center justify-center ring-4 ring-blue-100 shadow-md">
          ا.گ
        </div>
        <div className="text-center sm:text-right space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg font-black text-slate-900">{fullName}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              مدیر ارشد فروشگاه (Super Admin)
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">{email}</p>
          <p className="text-[11px] text-slate-500">دسترسی نامحدود به کلیه ماژول‌های حسابداری، انبار و سفارش‌ها</p>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleUpdateProfile} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800">ویرایش مشخصات فردی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">نام و نام خانوادگی</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">پست الکترونیک (ایمیل)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none font-mono text-left"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">شماره همراه تایید شده</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none font-mono"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-800 pt-4 border-t border-slate-100">تغییر کلمه عبور</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">کلمه عبور فعلی</label>
            <input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">کلمه عبور جدید</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تغییرات حساب</span>
          </button>
        </div>
      </form>
    </div>
  );
};
