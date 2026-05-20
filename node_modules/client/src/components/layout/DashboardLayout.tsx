import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-[#0A0F1E]
        text-white
      "
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* Main Content */}
      <div className="lg:ml-[280px]">
        {/* Navbar */}
        <Navbar
          title={title}
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        {/* Page Content */}
        <main
          className="
            p-4
            sm:p-6
            lg:p-8
            min-h-[calc(100vh-80px)]
            overflow-y-auto
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}