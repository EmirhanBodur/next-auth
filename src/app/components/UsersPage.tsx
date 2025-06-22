"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaSignInAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface Auth0User {
  user_id: string;
  name: string;
  email: string;
  picture: string;
  last_login: string;
  last_ip: string;
  logins_count: number;
}

export default function UsersPage() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const [users, setUsers] = useState<Auth0User[]>([]);
  const [error, setError] = useState<string>("");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (role === "admin") {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            setError("Kullanıcılar getirilemedi");
          }
        })
        .catch(() => setError("Kullanıcılar getirilemedi"));
    }
  }, [role]);

  if (role !== "admin") {
    return (
      <div className="p-4">
        <p className="text-lg text-red-600">
          Bu içeriği görmeye yetkiniz yoktur.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Listesi</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Masaüstü başlıkları */}
      <div className="hidden md:grid grid-cols-6 gap-4 bg-gray-100 p-4 rounded font-semibold text-sm text-gray-700">
        <div>Avatar</div>
        <div>Ad Soyad</div>
        <div>Email</div>
        <div>Son Giriş</div>
        <div>IP</div>
        <div className="text-center">Login Sayısı</div>
      </div>

      <div className="divide-y border-t">
        {users.map((user) => {
          const isExpanded = expandedUserId === user.user_id;
          return (
            <div
              key={user.user_id}
              className="px-4 py-3 text-sm border-b md:border-none"
            >
              {/* Mobil */}
              <div className="md:hidden flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.picture}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={() =>
                    setExpandedUserId(isExpanded ? null : user.user_id)
                  }
                >
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>

              {/* Mobil Detaylar */}
              {isExpanded && (
                <div className="md:hidden mt-3 pl-1 space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-500" />
                    <span className="break-words">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-500" />
                    <span>
                      {new Date(user.last_login).toLocaleString("tr-TR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{user.last_ip}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaSignInAlt className="text-gray-500" />
                    <span>{user.logins_count}</span>
                  </div>
                </div>
              )}

              {/* Masaüstü */}
              <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.picture}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>{user.name || "—"}</div>
                <div
                  className="break-all truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px]"
                  title={user.email}
                >
                  {user.email}
                </div>
                <div>
                  {new Date(user.last_login).toLocaleString("tr-TR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </div>
                <div>{user.last_ip}</div>
                <div className="text-center">{user.logins_count}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
