"use client";

import Link from "next/link";
import Image from "next/image";
import { LanguageToggle } from "@/lib/i18n/context";

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({ showBackButton, onBack }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {showBackButton && onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#0D274D] text-sm font-medium"
            >
              <span>←</span>
              <span>Back</span>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logos/pentair-logo.png"
                alt="Pentair"
                width={100}
                height={32}
                className="h-6 w-auto"
                priority
              />
              <span className="text-sm font-bold text-[#0D274D]">Hot Deals</span>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
