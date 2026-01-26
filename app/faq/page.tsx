"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n/context";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo sé si mi rebate fue aprobado?",
    answer: (
      <>
        <p>Una vez que envíes tu solicitud de rebate, el proceso de revisión toma entre <strong>4 a 6 semanas</strong>.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Si es aprobado:</strong> Recibirás un email de <span className="text-[#00A651]">notification@pentairprepaid.com</span> con un token digital para redimir tu rebate.</li>
          <li><strong>Si es rechazado:</strong> Recibirás una carta digital de <span className="text-[#00A651]">email@info.awardhq.com</span> explicando la razón y los siguientes pasos.</li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">💡 Revisa tu carpeta de spam si no encuentras el email.</p>
      </>
    ),
  },
  {
    question: "¿Cuánto tiempo toma recibir mi rebate?",
    answer: (
      <p>Los rebates típicamente se procesan dentro de <strong>4 a 6 semanas</strong> desde la fecha de envío de la solicitud.</p>
    ),
  },
  {
    question: "¿Cómo puedo verificar el estado de mi rebate?",
    answer: (
      <>
        <p>Para verificar el estado de tu solicitud, contacta al equipo de soporte:</p>
        <ul className="list-none mt-2 space-y-2">
          <li>📧 Email: <a href="mailto:marketing.pool@pentair.com" className="text-[#00A651] font-medium hover:underline">marketing.pool@pentair.com</a></li>
          <li>🌐 Web: <a href="https://www.pentair.com/hotdeals" target="_blank" rel="noopener noreferrer" className="text-[#00A651] font-medium hover:underline">www.pentair.com/hotdeals</a></li>
        </ul>
      </>
    ),
  },
  {
    question: "Recibí una carta de rechazo. ¿Cómo puedo corregir y reenviar?",
    answer: (
      <>
        <p>Visita <a href="https://www.pentair.com/hotdeals" target="_blank" rel="noopener noreferrer" className="text-[#00A651] font-medium hover:underline">Pentair Hot Deals</a> y vuelve a enviar tu solicitud con la información correcta.</p>
        <p className="mt-2"><strong>Asegúrate de:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Adjuntar una copia de la carta de rechazo</li>
          <li>Indicar que es un reenvío</li>
          <li>Corregir la información que causó el rechazo</li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">Si no estás seguro qué corregir, contacta al equipo de soporte.</p>
      </>
    ),
  },
  {
    question: "Mi carta de rechazo dice que el número de serie es incorrecto. ¿Qué hago?",
    answer: (
      <>
        <p>Si tu rebate fue rechazado por número de serie incorrecto, contacta al equipo de soporte con:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Copia de tu factura</li>
          <li>Foto clara del número de serie del producto</li>
          <li>Tu número de solicitud de rebate</li>
        </ul>
        <p className="mt-2">📧 <a href="mailto:marketing.pool@pentair.com" className="text-[#00A651] font-medium hover:underline">marketing.pool@pentair.com</a></p>
      </>
    ),
  },
  {
    question: "Han pasado más de 6 semanas y no he recibido mi rebate. ¿Qué debo hacer?",
    answer: (
      <>
        <p>Si no has recibido respuesta después de 6 semanas, contacta al equipo de soporte:</p>
        <ul className="list-none mt-2 space-y-2">
          <li>📧 Email: <a href="mailto:marketing.pool@pentair.com" className="text-[#00A651] font-medium hover:underline">marketing.pool@pentair.com</a></li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">Ten a la mano tu número de solicitud y fecha de envío.</p>
      </>
    ),
  },
  {
    question: "¿Cuál es el plazo para enviar mi solicitud de rebate?",
    answer: (
      <>
        <p>Tienes <strong>60 días</strong> después de la instalación del producto para enviar tu solicitud de rebate.</p>
        <p className="mt-2 text-sm text-amber-600">⚠️ No se otorgan excepciones después de este plazo.</p>
      </>
    ),
  },
  {
    question: "¿Se aceptan órdenes de compra o tickets de entrega como comprobante?",
    answer: (
      <>
        <p><strong>No.</strong> Debes proporcionar una <strong>factura</strong> como comprobante de compra para calificar al rebate.</p>
        <p className="mt-2 text-sm text-gray-500">La falta de factura resultará en el rechazo de tu solicitud.</p>
      </>
    ),
  },
  {
    question: "¿Cómo participo en el Programa Bounty?",
    answer: (
      <>
        <p>Para participar en el programa Bounty (reemplazo de competencia):</p>
        <ol className="list-decimal list-inside mt-2 space-y-2">
          <li>Compra e instala productos Pentair elegibles durante las fechas del programa</li>
          <li>Envía el formulario en <a href="https://www.pentair.com/hotdeals" target="_blank" rel="noopener noreferrer" className="text-[#00A651] font-medium hover:underline">pentair.com/hotdeals</a></li>
          <li>Sube la documentación requerida:
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>Factura de compra</li>
              <li>Foto PRE-instalación (producto de competencia)</li>
              <li>Foto POST-instalación (nuevo producto Pentair)</li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
  {
    question: "¿Cuáles son los requisitos de las fotos para el Programa Bounty?",
    answer: (
      <>
        <p>Las fotos deben cumplir con estos requisitos:</p>
        <div className="mt-2 space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-[#0D274D]">📸 Foto PRE-instalación:</p>
            <p className="text-sm text-gray-600">Imagen clara del producto de competencia que será reemplazado (bomba, calentador, filtro, luz o clorador).</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-[#0D274D]">📸 Foto POST-instalación:</p>
            <p className="text-sm text-gray-600">Imagen clara del nuevo producto Pentair instalado.</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-amber-600">⚠️ Fotos borrosas o que no muestren claramente el producto serán rechazadas.</p>
      </>
    ),
  },
  {
    question: "¿Hay límite en el número de rebates que puedo solicitar?",
    answer: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Un rebate por número de serie</strong> — cada producto solo puede reclamar un rebate</li>
          <li><strong>Sin límite por dealer</strong> — puedes enviar múltiples solicitudes (una por cada producto instalado)</li>
        </ul>
      </>
    ),
  },
  {
    question: "¿En qué países aplican los rebates?",
    answer: (
      <>
        <p>Los rebates de LATAM están disponibles en:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            { flag: "🇺🇸", name: "Estados Unidos" },
            { flag: "🇨🇦", name: "Canadá" },
            { flag: "🇲🇽", name: "México" },
            { flag: "🇵🇷", name: "Puerto Rico" },
            { flag: "🇨🇷", name: "Costa Rica" },
            { flag: "🇪🇨", name: "Ecuador" },
            { flag: "🇸🇻", name: "El Salvador" },
            { flag: "🇬🇹", name: "Guatemala" },
            { flag: "🇭🇳", name: "Honduras" },
            { flag: "🇯🇲", name: "Jamaica" },
            { flag: "🇵🇪", name: "Perú" },
            { flag: "🇹🇹", name: "Trinidad y Tobago" },
          ].map((c) => (
            <span key={c.name} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {c.flag} {c.name}
            </span>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">💡 La disponibilidad puede variar por producto. Consulta los términos específicos de cada rebate.</p>
      </>
    ),
  },
  {
    question: "¿Cómo recibo el pago del rebate?",
    answer: (
      <>
        <p>Los rebates se pagan mediante <strong>tarjeta virtual Mastercard</strong> enviada a tu email.</p>
        <p className="mt-2">La tarjeta puede usarse para compras en cualquier comercio que acepte Mastercard.</p>
      </>
    ),
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0D274D] to-[#1a3a5c] py-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-white text-xl font-bold mb-2">
            {t.faq.title}
          </h1>
          <p className="text-gray-300 text-sm">
            {t.faq.subtitle}
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-[#0D274D] text-sm pr-4">
                  {faq.question}
                </span>
                <span
                  className={`transform transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-700 border-t border-gray-100 pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Box */}
        <div className="mt-8 bg-[#0D274D] rounded-xl p-5 text-white">
          <h2 className="font-bold text-lg mb-3">¿Más preguntas?</h2>
          <p className="text-gray-300 text-sm mb-4">
            Contacta al equipo de soporte de rebates:
          </p>
          <div className="space-y-2">
            <a
              href="mailto:marketing.pool@pentair.com"
              className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 hover:bg-white/20 transition-colors"
            >
              <span className="text-xl">📧</span>
              <div>
                <div className="font-medium text-sm">Email</div>
                <div className="text-xs text-gray-300">marketing.pool@pentair.com</div>
              </div>
            </a>
            <a
              href="https://www.pentair.com/hotdeals"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 hover:bg-white/20 transition-colors"
            >
              <span className="text-xl">🌐</span>
              <div>
                <div className="font-medium text-sm">Portal de Rebates</div>
                <div className="text-xs text-gray-300">www.pentair.com/hotdeals</div>
              </div>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href="/tabla"
            className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
          >
            <span className="text-2xl">📋</span>
            <div className="text-sm font-medium text-[#0D274D] mt-1">Ver Rebates</div>
          </Link>
          <Link
            href="/"
            className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
          >
            <span className="text-2xl">🔢</span>
            <div className="text-sm font-medium text-[#0D274D] mt-1">Calculadora</div>
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
