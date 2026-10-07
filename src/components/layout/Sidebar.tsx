import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Box,
  Layers,
  Users,
  TrendingUp,
  Tag,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Warehouse,
  Bookmark,
  X
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('آیا از خروج از حساب مدیریت اطمینان دارید؟')) {
      navigate('/login');
    }
  };

  const navItems = [
    {
      title: 'داشبورد',
      to: '/',
      icon: LayoutDashboard,
      badge: null
    },
    {
      title: 'سفارش‌ها',
      to: '/orders',
      icon: ClipboardList,
      badge: '۳۸ جدید'
    },
    {
      title: 'محصولات',
      to: '/products',
      icon: Box,
      badge: null
    },
    {
      title: 'انبارداری و موجودی',
      to: '/inventory',
      icon: Warehouse,
      badge: null
    },
    {
      title: 'دسته‌بندی‌ها',
      to: '/categories',
      icon: Layers,
      badge: null
    },
    {
      title: 'برندها و همکاران',
      to: '/brands',
      icon: Bookmark,
      badge: null
    },
    {
      title: 'مشتریان',
      to: '/customers',
      icon: Users,
      badge: null
    },
    {
      title: 'فروش و درآمد',
      to: '/sales',
      icon: TrendingUp,
      badge: null
    },
    {
      title: 'تخفیف‌ها و کوپن‌ها',
      to: '/discounts',
      icon: Tag,
      badge: null
    },
    {
      title: 'نظرات و بازخوردها',
      to: '/reviews',
      icon: MessageSquare,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile & Tablet Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container:
          - Desktop (lg): fits screen cleanly, absolutely NO scrollbar visible, overflow hidden (does not scroll).
          - Mobile / Tablet: smooth slide-in drawer, scrollbar strictly invisible, can smoothly scroll downwards.
      */}
      <aside
        data-purpose="sidebar"
        className={`fixed top-0 bottom-0 right-0 z-50 w-72 sm:w-80 lg:w-64 bg-white border-l border-slate-200/80 h-screen max-h-screen flex flex-col justify-between select-none shadow-[2px_0_12px_rgba(0,0,0,0.03)] transition-transform duration-300 ease-in-out no-scrollbar lg:overflow-hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Upper Section (Brand Header + Nav Items):
            - Desktop: lg:overflow-hidden (no scroll)
            - Tablet & Mobile: overflow-y-auto (scrolls down smoothly without scrollbar)
        */}
        <div
          className="flex flex-col flex-1 overflow-y-auto lg:overflow-hidden no-scrollbar overscroll-contain"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Brand Logo Header & Mobile Close Button: exactly matching TopHeader height h-20 and border */}
          <div className="h-20 px-4 sm:px-5 flex items-center justify-between border-b border-slate-200/80 shrink-0 bg-white">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
                <svg
                  className="w-5 h-5"
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
              <div className="flex flex-col min-w-0">
                <span className="text-[14.5px] font-bold text-slate-800 leading-tight truncate">
                  شاپ‌ادمین | ShopAdmin
                </span>
                <span className="text-[11.5px] text-slate-400 font-medium mt-0.5 truncate">
                  مدیریت هوشمند فروشگاه
                </span>
              </div>
            </div>

            {/* Close (ضربدر) Button on Mobile & Tablet: perfectly aligned on left with clean padding & touch target */}
            <button
              onClick={onCloseMobile}
              type="button"
              className="lg:hidden w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-2xs focus:outline-none"
              title="بستن منو"
              aria-label="بستن منوی ناوبری"
            >
              <X className="w-4 h-4 stroke-[2.3]" />
            </button>
          </div>

          {/* Nav Items List */}
          <div className="p-2.5 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => onCloseMobile?.()}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] transition-all font-medium ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4.5 h-4.5 shrink-0 ${
                          isActive ? 'text-blue-600 stroke-[2.2]' : 'text-slate-400 stroke-[1.8]'
                        }`}
                      />
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span className="mr-auto bg-blue-600 text-white text-[10.5px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom Actions: sticky at bottom */}
        <div className="p-2.5 border-t border-slate-100 flex flex-col gap-0.5 shrink-0 bg-white">
          <NavLink
            to="/settings"
            onClick={() => onCloseMobile?.()}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Settings className="w-4 h-4 text-slate-400 shrink-0 stroke-[1.8]" />
            <span className="truncate">تنظیمات سیستم</span>
          </NavLink>

          <NavLink
            to="/reports"
            onClick={() => onCloseMobile?.()}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 stroke-[1.8]" />
            <span className="truncate">راهنما و مستندات</span>
          </NavLink>

          <button
            onClick={handleLogout}
            type="button"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 text-[12.5px] font-medium transition-colors w-full text-right cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500 shrink-0 stroke-[1.8]" />
            <span className="truncate">خروج از حساب</span>
          </button>
        </div>
      </aside>
    </>
  );
};
