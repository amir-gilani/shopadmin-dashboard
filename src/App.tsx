import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { ProductsPage } from './pages/ProductsPage';
import { NewProductPage } from './pages/NewProductPage';
import { InventoryPage } from './pages/InventoryPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BrandsPage } from './pages/BrandsPage';
import { CustomersPage } from './pages/CustomersPage';
import { CustomerDetailsPage } from './pages/CustomerDetailsPage';
import { SalesPage } from './pages/SalesPage';
import { DiscountsPage } from './pages/DiscountsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Shell */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<NewProductPage />} />
          <Route path="products/:id/edit" element={<NewProductPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/:id" element={<CustomerDetailsPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="discounts" element={<DiscountsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="analytics" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
