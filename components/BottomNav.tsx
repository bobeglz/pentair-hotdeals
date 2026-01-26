"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const links = [
    { href: "/", icon: "🔢", label: t.common.calculator },
    { href: "/tabla", icon: "📋", label: t.common.list },
    { href: "/faq", icon: "❓", label: t.common.faq },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-[#00A651]" : "text-gray-400"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
