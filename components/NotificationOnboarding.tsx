"use client";

import { useState, useEffect } from "react";
import { requestNotificationPermission, setUserTags, getNotificationPermission } from "./OneSignalInit";

const COUNTRIES = [
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "PR", name: "Puerto Rico", flag: "🇵🇷" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  { code: "HN", name: "Honduras", flag: "🇭🇳" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨" },
  { code: "PE", name: "Perú", flag: "🇵🇪" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲" },
];

const PRODUCT_INTERESTS = [
  { id: "heaters", name: "Calentadores", icon: "🔥" },
  { id: "pumps", name: "Bombas", icon: "💧" },
  { id: "filters", name: "Filtros", icon: "🔷" },
  { id: "lighting", name: "Iluminación", icon: "💡" },
  { id: "chlorinators", name: "Cloradores", icon: "🧪" },
];

const ROLES = [
  { id: "dealer", name: "Dealer / Distribuidor" },
  { id: "installer", name: "Instalador" },
  { id: "pool_builder", name: "Constructor de albercas" },
  { id: "service", name: "Servicio técnico" },
  { id: "other", name: "Otro" },
];

export function NotificationOnboarding() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already completed onboarding
    const completed = localStorage.getItem("notification-onboarding-completed");
    if (completed) return;

    // Check if notifications are supported
    if (!("Notification" in window)) return;

    // Show after a delay (after install prompt potentially)
    const timer = setTimeout(async () => {
      const hasPermission = await getNotificationPermission();
      if (!hasPermission) {
        setShow(true);
      }
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleRequestPermission = async () => {
    setLoading(true);
    const granted = await requestNotificationPermission();
    setLoading(false);
    
    if (granted) {
      setStep(2);
    } else {
      // Permission denied, close the modal
      handleComplete();
    }
  };

  const handleComplete = async () => {
    // Save tags to OneSignal
    if (country || interests.length || role) {
      const tags: Record<string, string> = {};
      if (country) tags.country = country;
      if (interests.length) tags.interests = interests.join(",");
      if (role) tags.role = role;
      await setUserTags(tags);
    }

    localStorage.setItem("notification-onboarding-completed", "true");
    setShow(false);
  };

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto">
        {step === 1 && (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-xl font-bold text-[#0D274D] mb-2">
              ¿Quieres recibir alertas?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Te avisamos cuando haya nuevos rebates, promociones por terminar, o novedades importantes.
            </p>
            <button
              onClick={handleRequestPermission}
              disabled={loading}
              className="w-full bg-[#00A651] text-white font-semibold py-3 px-6 rounded-xl mb-3 disabled:opacity-50"
            >
              {loading ? "..." : "Sí, avisarme"}
            </button>
            <button
              onClick={() => {
                localStorage.setItem("notification-onboarding-completed", "true");
                setShow(false);
              }}
              className="w-full text-gray-400 text-sm"
            >
              Ahora no
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🌎</div>
              <h2 className="text-lg font-bold text-[#0D274D]">
                ¿En qué país estás?
              </h2>
              <p className="text-gray-500 text-sm">
                Para enviarte rebates relevantes
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCountry(c.code)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-colors ${
                    country === c.code
                      ? "border-[#00A651] bg-[#E8F5E9]"
                      : "border-gray-200"
                  }`}
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-sm font-medium text-[#0D274D]">{c.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-[#00A651] text-white font-semibold py-3 px-6 rounded-xl"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🏷️</div>
              <h2 className="text-lg font-bold text-[#0D274D]">
                ¿Qué productos te interesan?
              </h2>
              <p className="text-gray-500 text-sm">
                Selecciona uno o más
              </p>
            </div>
            <div className="space-y-2 mb-4">
              {PRODUCT_INTERESTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => toggleInterest(p.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                    interests.includes(p.id)
                      ? "border-[#00A651] bg-[#E8F5E9]"
                      : "border-gray-200"
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="font-medium text-[#0D274D]">{p.name}</span>
                  {interests.includes(p.id) && (
                    <span className="ml-auto text-[#00A651]">✓</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(4)}
              className="w-full bg-[#00A651] text-white font-semibold py-3 px-6 rounded-xl"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">👤</div>
              <h2 className="text-lg font-bold text-[#0D274D]">
                ¿Cuál es tu rol?
              </h2>
            </div>
            <div className="space-y-2 mb-4">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`w-full p-3 rounded-xl border-2 transition-colors text-left ${
                    role === r.id
                      ? "border-[#00A651] bg-[#E8F5E9]"
                      : "border-gray-200"
                  }`}
                >
                  <span className="font-medium text-[#0D274D]">{r.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleComplete}
              className="w-full bg-[#00A651] text-white font-semibold py-3 px-6 rounded-xl"
            >
              ¡Listo!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
