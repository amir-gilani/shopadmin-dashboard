import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { StorePreviewModal } from '../common/StorePreviewModal';

export const DashboardLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storePreviewOpen, setStorePreviewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-row">
      {/* Right Sidebar */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area: Margin right 260px (w-64) on lg screens */}
      <div className="flex-1 lg:mr-64 flex flex-col min-w-0 overflow-x-hidden min-h-screen">
        <TopHeader
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          onOpenStorePreview={() => setStorePreviewOpen(true)}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Live Storefront Modal */}
      <StorePreviewModal
        isOpen={storePreviewOpen}
        onClose={() => setStorePreviewOpen(false)}
      />
    </div>
  );
};
