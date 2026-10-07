import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileDown,
  MessageSquare,
  UserPlus,
  Users,
  Zap,
  CreditCard,
  Crown,
  Search,
  Eye,
  Edit2,
  Star,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { initialCustomers } from '../data/customers';
import { Customer, LoyaltyTier, CustomerAccountStatus } from '../types';

export const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [tierTab, setTierTab] = useState<'all' | 'gold_vip' | 'regular' | 'new' | 'inactive'>('all');
  const [tierSelect, setTierSelect] = useState('');
  const [statusSelect, setStatusSelect] = useState('');
  const [sortSelect, setSortSelect] = useState('spent');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Customer Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCity, setNewCity] = useState('تهران');
  const [newTier, setNewTier] = useState<LoyaltyTier>('normal');

  // Filter customers
  const filteredCustomers = customers.filter((cust) => {
    if (tierTab === 'gold_vip' && cust.loyaltyTier !== 'gold_vip') return false;
    if (tierTab === 'regular' && (cust.ordersCount < 3 || cust.loyaltyTier === 'gold_vip')) return false;
    if (tierTab === 'new' && cust.ordersCount > 2) return false;
    if (tierTab === 'inactive' && cust.status !== 'suspended') return false;

    if (tierSelect && cust.loyaltyTier !== tierSelect) return false;
    if (statusSelect && cust.status !== statusSelect) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = cust.name.includes(searchQuery);
      const matchPhone = cust.phone.includes(searchQuery);
      const matchEmail = cust.email.toLowerCase().includes(q);
      const matchCode = cust.code.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchCode) return false;
    }

    return true;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      code: `#USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      initials: newName.slice(0, 2),
      avatarBg: 'bg-blue-50',
      avatarColor: 'text-blue-600',
      phone: newPhone,
      email: newEmail || `${newName.replace(/\s+/g, '')}@gmail.com`,
      loyaltyTier: newTier,
      ordersCount: 0,
      totalSpent: 0,
      lastActivity: 'لحظاتی پیش',
      status: 'active',
      city: newCity,
      joinedDate: 'امروز'
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    alert('مشتری جدید با موفقیت ثبت شد.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto" data-purpose="inventory-dashboard">
      {/* Page Header & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div className="flex flex-col gap-1.5">
          <nav className="flex items-center gap-2 text-slate-500 text-[12px]">
            <a className="hover:text-blue-600 transition-colors" href="#">داشبورد</a>
            <span className="text-slate-300">/</span>
            <span className="hover:text-blue-600 transition-colors">کاربران و ارتباطات</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">مدیریت مشتریان</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              مدیریت مشتریان و باشگاه خریداران
            </h1>
            <span className="bg-blue-50 text-blue-700 border border-blue-200/70 text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
              ۴,۲۵۰ کاربر فعال
            </span>
          </div>
          <p className="text-slate-500 text-[13px]">
            پایش رفتار خرید، سطح‌بندی وفاداری، مدیریت تراکنش‌ها و تاریخچه سفارش‌های کاربران به صورت یکپارچه
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert('خروجی اطلاعات مشتریان در فایل اکسل دانلود شد.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-[13px] font-medium shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            type="button"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>خروجی اکسل</span>
          </button>

          <button
            onClick={() => alert('سامانه ارسال پیامک گروهی به مشتریان باز شد.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-[13px] font-medium shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            type="button"
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>ارسال پیامک</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-[13px] font-medium shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
            type="button"
          >
            <UserPlus className="w-4 h-4 stroke-[2.2]" />
            <span>ثبت مشتری جدید</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">کل مشتریان ثبت‌شده</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۴,۲۵۰</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              + ۱۲.۴٪
            </span>
          </div>
          <div className="text-slate-400 text-[11.5px] font-normal leading-tight">
            رشد نسبت به ۳۰ روز گذشته
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">مشتریان فعال ۳۰ روز گذشته</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۲,۸۴۰</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 whitespace-nowrap">
              نرخ بازگشت ۶۸٪
            </span>
          </div>
          <div className="text-slate-400 text-[11.5px] font-normal leading-tight">
            حداقل یک تراکنش یا ورود موفق
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">میانگین ارزش خرید (LTV)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-start gap-1.5 my-1.5">
            <span className="text-slate-800 text-[26px] font-bold tracking-tight leading-none">۳,۸۵۰,۰۰۰</span>
            <span className="text-slate-400 text-xs font-medium">تومان</span>
          </div>
          <div className="text-emerald-600 text-[11.5px] font-semibold leading-tight">
            ۳.۲ سفارش / هر کاربر
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-[13px] font-medium">اعضای باشگاه وفاداری (VIP)</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-start gap-2.5 my-1.5">
            <span className="text-slate-800 text-[28px] font-extrabold tracking-tight leading-none">۳۸۰</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 whitespace-nowrap">
              ۲۰٪ فروش کل
            </span>
          </div>
          <div className="text-slate-400 text-[11.5px] font-normal leading-tight">
            خریداران تراز اول با امتیاز برتر
          </div>
        </div>
      </div>

      {/* Main Customers Table & Filter Hub */}
      <div className="w-full flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 flex flex-col gap-3.5 border-b border-slate-100 bg-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative w-full lg:w-96">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو بر اساس نام مشتری، شماره موبایل، ایمیل یا شناسه..."
                className="w-full pl-3 pr-9 py-2 text-[13px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-end flex-wrap">
              <select
                value={tierSelect}
                onChange={(e) => setTierSelect(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">همه سطوح عضویت</option>
                <option value="gold_vip">طلایی VIP</option>
                <option value="silver">نقره‌ای</option>
                <option value="bronze">برنزی</option>
                <option value="normal">عادی</option>
              </select>

              <select
                value={statusSelect}
                onChange={(e) => setStatusSelect(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">تمام وضعیت‌ها</option>
                <option value="active">فقط کاربران فعال</option>
                <option value="pending_verification">در انتظار تایید</option>
                <option value="suspended">مسدود موقت</option>
              </select>

              <select
                value={sortSelect}
                onChange={(e) => setSortSelect(e.target.value)}
                className="px-3 py-2 text-[12px] bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="spent">مرتب‌سازی: بیشترین خرید</option>
                <option value="orders">بیشترین تعداد سفارش</option>
                <option value="newest">جدیدترین مشتریان</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs Row */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 select-none border-t border-slate-100/80 pt-3 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => setTierTab('all')}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-all cursor-pointer ${
                tierTab === 'all'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              همه کاربران <span className="mr-1 opacity-80">(۴,۲۵۰)</span>
            </button>

            <button
              onClick={() => setTierTab('gold_vip')}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                tierTab === 'gold_vip'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              مشتریان VIP طلایی <span className="mr-1 text-blue-600 font-semibold">(۳۸۰)</span>
            </button>

            <button
              onClick={() => setTierTab('regular')}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                tierTab === 'regular'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              خریداران منظم <span className="mr-1 text-slate-400">(۱,۹۲۰)</span>
            </button>

            <button
              onClick={() => setTierTab('new')}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                tierTab === 'new'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              تازه‌واردها <span className="mr-1 text-slate-400">(۸۵۰)</span>
            </button>

            <button
              onClick={() => setTierTab('inactive')}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-[12.5px] whitespace-nowrap transition-colors cursor-pointer ${
                tierTab === 'inactive'
                  ? 'bg-blue-600 text-white font-medium shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              کاربران غیرفعال <span className="mr-1 text-slate-400">(۱,۱۰۰)</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto w-full no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <table className="w-full text-right border-collapse min-w-[760px] lg:min-w-full">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-[12px] select-none">
              <tr>
                <th className="py-3.5 px-4 font-semibold text-right" scope="col">مشتری و اطلاعات تماس</th>
                <th className="py-3.5 px-3 font-semibold text-center w-28" scope="col">سطح وفاداری</th>
                <th className="py-3.5 px-3 font-semibold text-center w-24" scope="col">سفارش‌ها</th>
                <th className="py-3.5 px-3 font-semibold text-center w-32" scope="col">مجموع خرید</th>
                <th className="py-3.5 px-3 font-semibold text-center w-28" scope="col">آخرین فعالیت</th>
                <th className="py-3.5 px-3 font-semibold text-center w-28" scope="col">وضعیت حساب</th>
                <th className="py-3.5 px-4 font-semibold text-center w-24 shrink-0" scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-[13px]">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${cust.avatarBg} ${cust.avatarColor} border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0 select-none`}
                      >
                        {cust.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => navigate(`/customers/${cust.id}`)}
                            className="font-bold text-slate-800 leading-snug truncate hover:text-blue-600 cursor-pointer"
                          >
                            {cust.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{cust.code}</span>
                        </div>
                        <span className="text-[11.5px] text-slate-500 truncate">
                          {cust.phone} • {cust.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Loyalty Badge */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    {cust.loyaltyTier === 'gold_vip' && (
                      <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60 shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>طلایی VIP</span>
                      </span>
                    )}
                    {cust.loyaltyTier === 'silver' && (
                      <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80 shadow-xs">
                        <Star className="w-3.5 h-3.5 text-slate-400" />
                        <span>نقره‌ای</span>
                      </span>
                    )}
                    {cust.loyaltyTier === 'bronze' && (
                      <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-800 border border-orange-200/60 shadow-xs">
                        <Star className="w-3.5 h-3.5 text-orange-600" />
                        <span>برنزی</span>
                      </span>
                    )}
                    {cust.loyaltyTier === 'normal' && (
                      <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200/60">
                        <span>عادی</span>
                      </span>
                    )}
                  </td>

                  {/* Orders */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="flex flex-col items-center justify-center leading-tight">
                      <span className="font-bold text-slate-800 text-[13px]">{cust.ordersCount}</span>
                      <span className="text-slate-400 text-[11px]">سفارش</span>
                    </div>
                  </td>

                  {/* Spent */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <div className="flex items-baseline gap-1 justify-center">
                      <span className="font-bold text-slate-800 text-[13px]">
                        {cust.totalSpent.toLocaleString('fa-IR')}
                      </span>
                      <span className="text-slate-400 text-[11px]">تومان</span>
                    </div>
                  </td>

                  {/* Last Activity */}
                  <td className="py-3.5 px-3 text-center text-slate-500 text-[12px] whitespace-nowrap">
                    {cust.lastActivity}
                  </td>

                  {/* Account Status */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    {cust.status === 'active' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>فعال
                      </span>
                    )}
                    {cust.status === 'pending_verification' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>در انتظار تایید
                      </span>
                    )}
                    {cust.status === 'suspended' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-[12px] font-medium shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>مسدود موقت
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center shrink-0">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => navigate(`/customers/${cust.id}`)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="مشاهده جزئیات"
                        type="button"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`ویرایش اطلاعات مشتری ${cust.name}`)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title="ویرایش مشتری"
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

        {/* Pagination Bar */}
        <div className="py-3.5 px-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 flex-wrap gap-2">
          <span>نمایش ۱ تا {filteredCustomers.length} از ۴,۲۵۰ مشتری</span>
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700 disabled:opacity-40" disabled type="button">
              قبلی
            </button>
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold">۱</span>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۲</button>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۳</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">۷۰</button>
            <button className="px-2.5 py-1 rounded-lg hover:bg-slate-200 text-slate-700" type="button">بعدی</button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">ثبت مشتری جدید</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">نام و نام خانوادگی *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: کامران یوسفی"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">شماره تماس (موبایل) *</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="۰۹۱۲..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">پست الکترونیک (ایمیل)</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-left"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">شهر</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">سطح عضویت اولیه</label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as LoyaltyTier)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="normal">عادی</option>
                    <option value="bronze">برنزی</option>
                    <option value="silver">نقره‌ای</option>
                    <option value="gold_vip">طلایی VIP</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  ثبت مشتری
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
