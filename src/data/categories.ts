import { Category } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'کالای دیجیتال',
    slug: 'category//digital-goods',
    iconName: 'laptop',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    parentType: 'شاخه اصلی',
    productCount: 420,
    salesSharePercentage: 42,
    isActive: true,
    depth: 1
  },
  {
    id: 'cat-2',
    name: 'پوشاک، کیف و کفش',
    slug: 'category//fashion-apparel',
    iconName: 'shopping-bag',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    parentType: 'شاخه اصلی',
    productCount: 310,
    salesSharePercentage: 28,
    isActive: true,
    depth: 1
  },
  {
    id: 'cat-3',
    name: 'خانه و لوازم پخت‌وپز',
    slug: 'category//home-kitchen',
    iconName: 'home',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    parentType: 'شاخه اصلی',
    productCount: 185,
    salesSharePercentage: 15,
    isActive: true,
    depth: 1
  },
  {
    id: 'cat-4',
    name: 'زیبایی و مراقبت فردی',
    slug: 'category//beauty-health',
    iconName: 'heart',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    parentType: 'شاخه اصلی',
    productCount: 142,
    salesSharePercentage: 10,
    isActive: true,
    depth: 1
  },
  {
    id: 'cat-5',
    name: 'کتاب و لوازم‌التحریر',
    slug: 'category//books-stationery',
    iconName: 'book-open',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    parentType: 'شاخه اصلی',
    productCount: 48,
    salesSharePercentage: 5,
    isActive: false,
    depth: 1
  }
];
