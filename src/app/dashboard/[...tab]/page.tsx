"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import UsersPage from "../../components/UsersPage";

export default function DashboardShell() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState("dashboard");

  // URL'den aktif tabı al
  useEffect(() => {
    // params.tab bir dizi olabilir veya undefined olabilir
    const tab = Array.isArray(params?.tab) ? params.tab[0] : "dashboard";
    setSelectedTab(tab);
  }, [params]);

  // Session kontrolü ve yönlendirme
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/error");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Yönlendirme yapıldığı için buraya ulaşmayacak
  }

  const renderContent = () => {
    switch (selectedTab) {
      case "users":
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
              Hoş geldin {session.user?.name}
            </h1>
            <p className="text-lg">
              Rolün:{" "}
              <span className="font-semibold text-blue-600">
                {session.user?.role ?? "belirlenemedi"}
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
