import { Warehouse, InventoryItem, InventoryLog } from '../types';

export const initialWarehouses: Warehouse[] = [
  {
    id: 'wh-central',
    name: 'انبار مرکزی تهران (شورآباد)',
    code: 'THR-CENTRAL',
    totalCapacity: 11000,
    occupiedCapacity: 8940,
    occupiedPercentage: 82,
    skuCount: 380
  },
  {
    id: 'wh-west',
    name: 'انبار توزیع و لجستیک غرب (فتح)',
    code: 'THR-WEST',
    totalCapacity: 4000,
    occupiedCapacity: 2150,
    occupiedPercentage: 54,
    skuCount: 95
  },
  {
    id: 'wh-east',
    name: 'انبار توزیع شرق (دماوند)',
    code: 'THR-EAST',
    totalCapacity: 3000,
    occupiedCapacity: 1360,
    occupiedPercentage: 45,
    skuCount: 65
  }
];

export const initialInventoryItems: InventoryItem[] = [
  {
    id: 'inv-1',
    productName: 'هدفون بی‌سیم پرو مکس',
    sku: 'HP-4091-BLK',
    category: 'کالای دیجیتال',
    warehouseName: 'انبار مرکزی تهران (شورآباد)',
    warehouseLocation: 'انبار مرکزی - راهرو B، قفسه ۰۴',
    totalStock: 3,
    reservedStock: 2,
    sellableStock: 1,
    status: 'critical',
    unit: 'عدد',
    reorderPoint: 5,
    imageIcon: 'headphones'
  },
  {
    id: 'inv-2',
    productName: 'ساعت هوشمند سری ۷ اولترا',
    sku: 'SW-7700-SLV',
    category: 'کالای دیجیتال',
    warehouseName: 'انبار توزیع و لجستیک غرب (فتح)',
    warehouseLocation: 'انبار توزیع غرب - راهرو A، قفسه ۱۲',
    totalStock: 148,
    reservedStock: 22,
    sellableStock: 126,
    status: 'sufficient',
    unit: 'عدد',
    reorderPoint: 20,
    imageIcon: 'watch'
  },
  {
    id: 'inv-3',
    productName: 'ماگ حرارتی هوشمند لمسی',
    sku: 'MG-1020-WHT',
    category: 'خانه و آشپزخانه',
    warehouseName: 'انبار مرکزی تهران (شورآباد)',
    warehouseLocation: 'انبار مرکزی - راهرو C، قفسه ۰۱',
    totalStock: 15,
    reservedStock: 7,
    sellableStock: 8,
    status: 'reorder',
    unit: 'عدد',
    reorderPoint: 10,
    imageIcon: 'coffee'
  },
  {
    id: 'inv-4',
    productName: 'کیبورد مکانیکال گیمینگ RGB',
    sku: 'KB-8832-RGB',
    category: 'کالای دیجیتال',
    warehouseName: 'انبار توزیع شرق (دماوند)',
    warehouseLocation: 'انبار توزیع شرق - راهرو D، قفسه ۰۵',
    totalStock: 92,
    reservedStock: 10,
    sellableStock: 82,
    status: 'sufficient',
    unit: 'عدد',
    reorderPoint: 15,
    imageIcon: 'keyboard'
  },
  {
    id: 'inv-5',
    productName: 'سرم بازسازی‌کننده هیالورونیک اسید',
    sku: 'SC-1903-GLS',
    category: 'زیبایی و مراقبت',
    warehouseName: 'انبار مرکزی تهران (شورآباد)',
    warehouseLocation: 'انبار مرکزی - راهرو E، قفسه ۰۲',
    totalStock: 4,
    reservedStock: 1,
    sellableStock: 3,
    status: 'critical',
    unit: 'عدد',
    reorderPoint: 8,
    imageIcon: 'droplets'
  },
  {
    id: 'inv-6',
    productName: 'کوله پشتی مینیمال ضدآب شهری',
    sku: 'BP-5540-GRY',
    category: 'پوشاک و مد',
    warehouseName: 'انبار توزیع و لجستیک غرب (فتح)',
    warehouseLocation: 'انبار توزیع غرب - راهرو B، قفسه ۰۹',
    totalStock: 65,
    reservedStock: 8,
    sellableStock: 57,
    status: 'sufficient',
    unit: 'عدد',
    reorderPoint: 12,
    imageIcon: 'backpack'
  }
];

export const initialInventoryLogs: InventoryLog[] = [
  {
    id: 'log-1',
    type: 'inbound',
    title: 'ورود محموله ۵۰ عددی هدفون بی‌سیم پرو مکس',
    reference: 'انبار مرکزی • سند ورود شماره WR-8491',
    timeAgo: '۱۰ دقیقه پیش'
  },
  {
    id: 'log-2',
    type: 'outbound',
    title: 'تخصیص کالا جهت ارسال سفارش ORD-9402',
    reference: 'انبار غرب • ساعت هوشمند اولترا (۱ عدد)',
    timeAgo: '۲۸ دقیقه پیش'
  },
  {
    id: 'log-3',
    type: 'transfer',
    title: 'انتقال داخلی بین‌انبار (مرکزی به شرق)',
    reference: 'حواله انتقال TR-3012 • ۲۰ عدد کیبورد RGB',
    timeAgo: '۱ ساعت پیش'
  }
];
