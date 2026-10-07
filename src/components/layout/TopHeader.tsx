import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ExternalLink,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Package
} from 'lucide-react';

interface TopHeaderProps {
  onToggleMobileMenu: () => void;
  onOpenStorePreview?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleMobileMenu,
  onOpenStorePreview
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'سفارش جدید ORD-9418',
      desc: 'مهدی رضایی مبلغ ۲۱,۴۵۰,۰۰۰ تومان پرداخت نمود.',
      time: '۱۴ دقیقه پیش',
      type: 'order',
      icon: Package,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      title: 'هشدار موجودی بحرانی کالا',
      desc: 'هدفون بی‌سیم پرو مکس فقط ۱ عدد در انبار باقی مانده است.',
      time: '۳۰ دقیقه پیش',
      type: 'warning',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 3,
      title: 'نظر جدید تایید شد',
      desc: 'نیلوفر کریمی به هدفون سونی XM5 امتیاز ۵ ستاره داد.',
      time: '۲ ساعت پیش',
      type: 'review',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header
      data-purpose="top-header"
      className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0"
    >
      {/* Right side: Mobile Menu Button + Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          title="باز کردن منو"
          type="button"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در محصولات، سفارش‌ها، مشتریان..."
            className="w-full pl-4 pr-10 py-2.5 text-xs bg-slate-50/70 border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </form>
      </div>

      {/* Left side: Tools & Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* View Store Button */}
        <button
          onClick={onOpenStorePreview}
          type="button"
          className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[12.5px] sm:text-[13px] font-medium transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 text-slate-500 shrink-0 stroke-[1.8]" />
          <span className="hidden sm:inline">مشاهده فروشگاه</span>
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
            title="اعلان‌ها"
            type="button"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute left-0 sm:right-auto mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-800">اعلان‌های فروشگاه</span>
                <span className="text-[11px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                  ۳ جدید
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="p-3 hover:bg-slate-50 transition-colors flex gap-3">
                      <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">{item.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-3 pt-2 border-t border-slate-100 text-center">
                <Link
                  to="/orders"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  مشاهده همه سفارش‌ها و رخدادها
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="h-7 w-px bg-slate-200/80 hidden sm:block"></div>

        {/* User Profile Pill & Dropdown for Amir Gilani */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 cursor-pointer select-none p-1 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs ring-2 ring-blue-100 shrink-0">
              ا.گ
            </div>
            <div className="hidden md:flex flex-col text-right">
              <span className="font-bold text-[13.5px] text-slate-800 leading-tight">امیر گیلانی</span>
              <span className="text-[11.5px] text-slate-400 font-medium mt-0.5">مدیر ارشد فروشگاه</span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">امیر گیلانی</p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">amir.admin@shopadmin.ir</p>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>پروفایل مدیریت</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>تنظیمات فروشگاه</span>
                </Link>
              </div>
              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/login');
                  }}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 w-full text-right cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>خروج از سیستم</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
