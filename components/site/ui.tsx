"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/*
 * Дизайн-система сайта.
 * Сетка: контейнер 1240px, поля 20/32px, 12 колонок, gap 24px.
 * Вертикальный ритм: секция 96/128px, заголовок → контент 56/64px.
 * Шкала текста: H1 44/64/80 · H2 36/52 · H3 24 · текст 17 · подпись 14.
 * Скругления: карточка 24px · вложенный элемент 16px · кнопки — pill.
 */

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"max-w-[1240px] mx-auto px-5 md:px-8 " + className}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
  tone = "cream",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "sand" | "dark";
}) {
  const bg = tone === "dark" ? "bg-[#141311] text-white" : tone === "sand" ? "bg-sand" : "bg-cream";
  return (
    <section id={id} className={"relative py-24 md:py-32 overflow-hidden " + bg + " " + className}>
      {children}
    </section>
  );
}

/** Заголовок секции: слева — H2 (7 колонок), справа — пояснение (5 колонок), выровнено по базовой линии. */
export function SectionHead({
  title,
  accent,
  text,
  dark,
  children,
}: {
  title: string;
  accent?: string;
  text?: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-end mb-14 md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-7 font-display text-[36px] md:text-[52px] leading-[1.04]"
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={dark ? "text-white/45" : "text-muted"}>{accent}</span>
          </>
        )}
      </motion.h2>
      {(text || children) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={"lg:col-span-5 text-[17px] leading-relaxed " + (dark ? "text-white/65" : "text-muted")}
        >
          {text && <p>{text}</p>}
          {children}
        </motion.div>
      )}
    </div>
  );
}

type BtnVariant = "primary" | "dark" | "light" | "outline" | "outline-light";

const BTN: Record<BtnVariant, string> = {
  primary: "bg-clay text-white hover:bg-clay-dark",
  dark: "bg-ink text-white hover:bg-sage-dark",
  light: "bg-white text-ink hover:bg-cream",
  outline: "border border-ink/15 text-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/30 text-white hover:bg-white hover:text-ink",
};

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  arrow = true,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "group inline-flex h-[52px] items-center justify-center gap-3 rounded-full px-7 text-[15px] font-semibold transition-colors active:scale-[0.98] " +
        BTN[variant] +
        " " +
        className
      }
    >
      {children}
      {arrow && <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />}
    </button>
  );
}
