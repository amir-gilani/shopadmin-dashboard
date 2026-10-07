import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, CheckCircle2, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('amir.admin@shopadmin.ir');
  const [password, setPassword] = useState('password123');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 animate-in fade-in zoom-in-95">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">ورود به شاپ‌ادمین | ShopAdmin</h1>
          <p className="text-xs text-slate-400">سامانه مدیریت هوشمند و متمرکز فروشگاه اینترنتی</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">ایمیل سازمانی یا نام کاربری</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono text-left"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">رمز عبور امنیتی</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-blue-600" />
              <span>مرا به خاطر بسپار</span>
            </label>
            <span
              onClick={() => alert('لینک بازیابی رمز عبور به ایمیل شما ارسال شد.')}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              فراموشی کلمه عبور؟
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>در حال ورود به داشبورد...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>ورود به پنل مدیریت</span>
              </>
            )}
          </button>
        </form>

        {/* Demo hints */}
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-[11px] text-blue-800 text-center space-y-1">
          <p className="font-bold">حساب پیش‌فرض مدیر فروشگاه (امیر گیلانی):</p>
          <p className="font-mono text-slate-600" dir="ltr">
            amir.admin@shopadmin.ir / password123
          </p>
        </div>
      </div>
    </div>
  );
};
