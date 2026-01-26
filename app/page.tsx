"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Calculator } from "@/components/calculator";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n/context";
import rebatesData from "@/data/rebates.json";
import { RebatesData } from "@/lib/types";

function CalculatorSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#F5F5F5] p-6">
          <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 animate-pulse" />
        </div>
        <div className="p-6 space-y-4">
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-[#E8F5E9] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const data = rebatesData as RebatesData;
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0D274D] to-[#1a3a5c] py-4 px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-white text-lg font-bold mb-1">
            🔥 {t.home.subtitle}
          </h1>
          <p className="text-gray-300 text-xs">
            {t.home.heroText}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-24">
        <Suspense fallback={<CalculatorSkeleton />}>
          <Calculator data={data} />
        </Suspense>

        {/* Quick Tips */}
        <div className="max-w-md mx-auto mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#0D274D] text-sm mb-3 flex items-center gap-2">
              💡 {t.home.tips}
            </h3>
            <ul className="text-xs text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#00A651]">✓</span>
                <span>{t.home.tip1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00A651]">✓</span>
                <span>{t.home.tip2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00A651]">✓</span>
                <span>
                  <Link href="/tabla" className="text-[#00A651] font-medium">
                    {t.home.tip3}
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
