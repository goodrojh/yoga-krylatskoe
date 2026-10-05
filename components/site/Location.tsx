"use client";
import React, { useState } from "react";
import { MapPin, Navigation, Phone, Map as MapIcon } from "lucide-react";
import { useLead } from "./Lead";
import { SITE } from "@/lib/config";
import { Container, Section, Pic } from "./ui";
import { MessengerButtons } from "./Messengers";

// координаты дома Рублёвское ш., 16 к1 (OpenStreetMap)
const LAT = 55.74018;
const LON = 37.43437;
const YANDEX_PLACE = `https://yandex.ru/maps/?pt=${LON},${LAT}&z=17&l=map`;
const YANDEX_ROUTE = `https://yandex.ru/maps/?rtext=~${LAT},${LON}&rtt=auto`;

export default function Location() {
  const { open } = useLead();
  const [live, setLive] = useState(false);
  return (
    <Section id="location" tone="sand">
      <Container className="grid lg:grid-cols-12 gap-6">
        <div
          className="reveal lg:col-span-5 bg-white rounded-3xl p-7 md:p-10 flex flex-col border border-ink/5"
        >
          <h2 className="font-display text-[36px] md:text-[44px] leading-[1.04]">
            Рядом с домом <span className="text-muted">в Кунцево</span>
          </h2>
          <p className="text-muted text-[16px] mt-4 leading-relaxed">
            Не нужно ехать через весь город. Зал в Кунцево — удобно жителям Крылатского, Молодёжной, Кунцевской и Пионерской.
          </p>

          <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl bg-cream">
            <div className="w-11 h-11 rounded-xl bg-clay/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-clay" />
            </div>
            <div>
              <p className="font-semibold text-[17px]">{SITE.address}</p>
              <p className="text-sm text-muted">{SITE.city}, район Кунцево</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {SITE.metro.map((m) => (
              <div key={m} className="flex items-center gap-2.5 p-4 rounded-2xl bg-cream">
                <span className="w-6 h-6 rounded-full border-2 border-[#e4423b] text-[10px] font-bold flex items-center justify-center">М</span>
                <span className="font-medium text-sm">{m}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 grid gap-3">
            <MessengerButtons />
            <a
              href={YANDEX_ROUTE}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[52px] text-[15px] rounded-full bg-ink text-white font-semibold flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors"
            >
              <Navigation className="w-4 h-4" /> Построить маршрут
            </a>
            <button
              onClick={() => open("callback")}
              className="h-[52px] text-[15px] rounded-full border border-ink/15 font-semibold flex items-center justify-center gap-2 hover:bg-ink hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" /> Перезвоните мне
            </button>
          </div>
        </div>

        <div style={{ transitionDelay: `${0.1}s` }}
          className="reveal lg:col-span-7 rounded-3xl overflow-hidden min-h-[420px] md:min-h-[520px] bg-[#ece6dc] relative"
        >
          {live ? (
            <iframe
              title="Карта: студия на Рублёвском шоссе"
              src={`https://yandex.ru/map-widget/v1/?ll=${LON},${LAT}&pt=${LON},${LAT},pm2rdm&z=16`}
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <>
              {/* Лёгкая статичная карта (~50 КБ) вместо тяжёлого виджета — интерактивная грузится по нажатию */}
              <a href={YANDEX_PLACE} target="_blank" rel="noopener noreferrer" aria-label="Открыть в Яндекс Картах" className="absolute inset-0">
                <Pic src="/img/map.webp" full={1600} sizes="(max-width: 1024px) 100vw, 60vw" alt="Карта: Рублёвское шоссе, 16/1" className="absolute inset-0 w-full h-full object-cover" />
              </a>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full pointer-events-none flex flex-col items-center">
                <div className="rounded-2xl bg-ink text-white px-4 py-2.5 shadow-xl text-[14px] font-semibold whitespace-nowrap">
                  {SITE.name} · {SITE.address}
                </div>
                <span className="w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-ink" />
                <span className="relative mt-1 w-4 h-4 rounded-full bg-clay ring-4 ring-white shadow-lg" />
              </div>
              <button
                onClick={() => setLive(true)}
                className="absolute right-4 bottom-4 h-11 px-5 rounded-full bg-white text-ink text-[14px] font-semibold shadow-lg flex items-center gap-2 hover:bg-cream transition-colors"
              >
                <MapIcon className="w-4 h-4" /> Интерактивная карта
              </button>
              <span className="absolute left-3 bottom-3 text-[11px] text-ink/60 bg-white/80 rounded px-1.5 py-0.5 pointer-events-none">© OpenStreetMap</span>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
