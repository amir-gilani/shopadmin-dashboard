export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export type OrderStatus =
  | 'pending_payment'
  | 'processing'
  | 'preparing'
  | 'dispatched'
  | 'delivered'
  | 'returned'
  | 'cancelled';

export type PaymentStatus = 'paid' | 'pending' | 'wallet' | 'refund' | 'paya';
export type ShippingMethod = 'tipax' | 'post' | 'courier';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerInitials: string;
  customerAvatarBg: string;
  destination: string;
  address: string;
  phone: string;
  items: OrderItem[];
  otherItemsCount?: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethodTitle: string;
  orderStatus: OrderStatus;
  shippingMethod: ShippingMethod;
  shippingMethodTitle: string;
  trackingCode?: string;
  notes?: string;
}

export type StockAlert = 'critical' | 'reorder' | 'sufficient';

export interface Product {
  id: string;
  title: string;
  sku: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  stock: number;
  reservedStock: number;
  sellableStock: number;
  stockStatus: StockAlert;
  warehouseLocation: string;
  salesLast30Days: number;
  salesVolumeTomans: string;
  isActive: boolean;
  image: string;
  rating?: number;
  description?: string;
}

export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  category: string;
  warehouseName: string;
  warehouseLocation: string;
  totalStock: number;
  reservedStock: number;
  sellableStock: number;
  status: StockAlert;
  unit: string;
  reorderPoint: number;
  imageIcon: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  totalCapacity: number;
  occupiedCapacity: number;
  occupiedPercentage: number;
  skuCount: number;
}

export interface InventoryLog {
  id: string;
  type: 'inbound' | 'outbound' | 'transfer';
  title: string;
  reference: string;
  timeAgo: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
  parentType: 'شاخه اصلی' | 'زیرشاخه';
  productCount: number;
  salesSharePercentage: number;
  isActive: boolean;
  depth: number;
}

export type LoyaltyTier = 'gold_vip' | 'silver' | 'bronze' | 'normal';
export type CustomerAccountStatus = 'active' | 'pending_verification' | 'suspended';

export interface Customer {
  id: string;
  code: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  phone: string;
  email: string;
  loyaltyTier: LoyaltyTier;
  ordersCount: number;
  totalSpent: number;
  lastActivity: string;
  status: CustomerAccountStatus;
  city: string;
  joinedDate: string;
}

export type CouponType = 'percentage' | 'fixed' | 'free_shipping';
export type CouponAudience = 'all' | 'first_time' | 'vip' | 'abandoned_cart';
export type CouponStatus = 'active' | 'scheduled' | 'capacity_reached' | 'expired';

export interface DiscountCoupon {
  id: string;
  code: string;
  campaignTitle: string;
  type: CouponType;
  discountRateTitle: string;
  discountCapTitle: string;
  usedCount: number;
  totalLimit: number;
  usagePercentage: number;
  minPurchaseAmount: number;
  validityDate: string;
  status: CouponStatus;
}

export type ReviewStatus = 'approved' | 'pending' | 'replied' | 'rejected' | 'needs_action';

export interface ProductReview {
  id: string;
  customerName: string;
  customerInitials: string;
  avatarBg: string;
  avatarColor: string;
  customerBadge?: string;
  productName: string;
  productCode: string;
  rating: number;
  content: string;
  status: ReviewStatus;
  date: string;
  hasPhoto: boolean;
  replyText?: string;
}

export interface Transaction {
  id: string;
  trackingCode: string;
  date: string;
  time: string;
  customerName: string;
  customerInitials: string;
  avatarBg: string;
  avatarColor: string;
  phoneMasked: string;
  gateway: string;
  gatewayType: 'shaparak' | 'zarinpal' | 'paya' | 'wallet' | 'sudad';
  amount: number;
  isNegative?: boolean;
  fee: number;
  status: 'settled_shaparak' | 'pending_paya' | 'refunded' | 'settled_internal';
  statusTitle: string;
}

export interface Brand {
  id: string;
  name: string;
  englishName: string;
  productsCount: number;
  logo: string;
  categories: string[];
  isActive: boolean;
}
