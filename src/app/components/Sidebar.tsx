"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaChartBar,
  FaBell,
  FaChartPie,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import React from "react";

export default function Sidebar({
  setSelectedTab,
}: {
  setSelectedTab: (tab: string) => void;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
      const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
      const returnTo = window.location.origin;
      window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`;
    });
  };

  const handleNavigation = (tab: string) => {
    setSelectedTab(tab);
    router.push(`/dashboard/${tab}`);
  };

  return (
    <aside className="w-20 md:w-64 h-screen bg-white border-r p-4 md:p-6 flex flex-col justify-between shadow-sm">
      <div>
        {/* Kullanıcı Bilgisi */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={session?.user?.image ?? "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-blue-500 mx-auto md:mx-0"
          />
          <div className="hidden md:block">
            <h2 className="font-bold text-gray-900 text-sm">
              {session?.user?.name}
            </h2>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
        </div>

        {/* Navigasyon */}
        <nav className="flex flex-col gap-4 text-gray-700">
          <NavItem
            icon={<FaHome />}
            label="Dashboard"
            onClick={() => handleNavigation("dashboard")}
          />
          <NavItem
            icon={<FaChartBar />}
            label="Revenue"
            onClick={() => handleNavigation("revenue")}
          />
          <NavItem
            icon={<FaBell />}
            label="Notifications"
            onClick={() => handleNavigation("notifications")}
          />
          <NavItem
            icon={<FaChartPie />}
            label="Analytics"
            onClick={() => handleNavigation("analytics")}
          />
          <NavItem
            icon={<FaBoxOpen />}
            label="Kullanıcılar"
            onClick={() => handleNavigation("users")}
          />

          {/* Çıkış */}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center md:justify-start gap-0 md:gap-2 px-2 py-2 text-red-600 hover:text-red-800 text-l"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center md:justify-start gap-0 md:gap-3 px-2 py-2 rounded-lg transition hover:bg-gray-100 text-sm w-full text-left"
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}
