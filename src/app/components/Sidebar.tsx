"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaChartBar,
  FaBell,
  FaChartPie,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import React from "react";

export default function Sidebar(): JSX.Element {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
      const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
      const returnTo = window.location.origin;

      window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`;
    });
  };

  return (
    <aside className="w-64 h-screen bg-white border-r p-6 flex flex-col justify-between shadow-sm">
      <div>
        {/* Kullanıcı Bilgisi */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={session?.user?.image ?? "/default-avatar.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full ring-2 ring-blue-500"
          />
          <div>
            <h2 className="font-bold text-gray-900 text-sm">
              {session?.user?.name}
            </h2>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
        </div>

        {/* Navigasyon */}
        <nav className="flex flex-col gap-4 text-gray-700">
          <NavItem href="/dashboard" icon={<FaHome />} label="Dashboard" />
          <NavItem
            href="/dashboard/revenue"
            icon={<FaChartBar />}
            label="Revenue"
          />
          <NavItem
            href="/dashboard/notifications"
            icon={<FaBell />}
            label="Notifications"
          />
          <NavItem
            href="/dashboard/analytics"
            icon={<FaChartPie />}
            label="Analytics"
          />
          <NavItem
            href="/dashboard/inventory"
            icon={<FaBoxOpen />}
            label="Inventory"
          />

          {/* Çıkış */}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 px-2 py-2 text-red-600 hover:text-red-800 text-l  cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}

// NavItem bileşeni Sidebar içinde tanımlı
function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}): JSX.Element {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-2 py-2 rounded-lg transition ${
        isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
}
