"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import UsersPage from "../components/UsersPage";

export default function DashboardShell() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const { data: session } = useSession();

  useEffect(() => {
    console.log("🧾 SESSION:", session);
  }, [session]);

  const renderContent = () => {
    if (!session) return <div>Yükleniyor...</div>;

    switch (selectedTab) {
      case "users":
        if (session.user.role !== "admin") {
          return (
            <div className="text-red-500">Erişim reddedildi (admin değil)</div>
          );
        }
        return <UsersPage />;
      case "analytics":
        return <div>Analytics İçeriği</div>;
      case "notifications":
        return <div>Notifications İçeriği</div>;
      case "revenue":
        return <div>Revenue İçeriği</div>;
      default:
        return (
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Hoş geldin {session.user.name}
            </h1>
            <p className="text-lg">
              Rolün:{" "}
              <span className="font-semibold text-blue-600">
                {session.user.role ?? "belirlenemedi"}
              </span>
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedTab={setSelectedTab} />
      <main className="flex-1 min-h-screen bg-gray-50 p-6">
        {renderContent()}
      </main>
    </div>
  );
}
