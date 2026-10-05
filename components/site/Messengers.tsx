"use client";
import React from "react";
import { SITE, asset, waLink } from "@/lib/config";

// Официальные логотипы: Telegram и WhatsApp — Wikimedia Commons, MAX — max.ru
export const MESSENGERS = [
  { id: "telegram", label: "Telegram", href: SITE.telegramUrl, icon: "/brand/telegram.svg" },
  { id: "max", label: "MAX", href: SITE.maxUrl, icon: "/brand/max.png" },
  { id: "whatsapp", label: "WhatsApp", href: waLink("Здравствуйте! Хочу записаться на занятие"), icon: "/brand/whatsapp.svg" },
];

/** Круглые иконки-логотипы (шапка, нижняя панель на телефоне). */
export function MessengerIcons({ size = 36, className = "", ring = "bg-white/10 hover:bg-white/20" }: { size?: number; className?: string; ring?: string }) {
  return (
    <div className={"flex items-center gap-1.5 " + className}>
      {MESSENGERS.map((m) => (
        <a
          key={m.id}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Написать в ${m.label}`}
          title={m.label}
          className={"rounded-full flex items-center justify-center transition-colors shrink-0 " + ring}
          style={{ width: size, height: size }}
        >
          <img src={asset(m.icon)} alt={m.label} width={size * 0.62} height={size * 0.62} className={m.id === "max" ? "rounded-[6px]" : ""} />
        </a>
      ))}
    </div>
  );
}

/** Ряд одинаковых кнопок-логотипов на всю ширину (меню, подвал, адрес, окно «Спасибо»). */
export function MessengerButtons({ className = "", dark }: { className?: string; dark?: boolean }) {
  return (
    <div className={"grid grid-cols-3 gap-2 " + className}>
      {MESSENGERS.map((m) => (
        <a
          key={m.id}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Написать в ${m.label}`}
          title={m.label}
          className={
            "h-[52px] rounded-full flex items-center justify-center border transition-colors " +
            (dark ? "border-white/20 hover:bg-white/10" : "border-ink/10 bg-white hover:border-ink/30")
          }
        >
          <img src={asset(m.icon)} alt={m.label} width={28} height={28} className={m.id === "max" ? "rounded-[7px]" : ""} />
        </a>
      ))}
    </div>
  );
}
