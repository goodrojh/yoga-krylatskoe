"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone } from "lucide-react";
import { useLead } from "./Lead";
import { SITE } from "@/lib/config";
import { Container, Section } from "./ui";

const MAP_QUERY = encodeURIComponent(`${SITE.city}, ${SITE.address}`);

export default function Location() {
  const { open } = useLead();
  return (
    <Section id="location">
      <Container className="grid lg:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 bg-white rounded-3xl p-7 md:p-10 flex flex-col border border-ink/5"
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
            <a
              href={`https://yandex.ru/maps/?rtext=~${MAP_QUERY}&rtt=auto`}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 rounded-3xl overflow-hidden min-h-[440px] bg-white relative"
        >
          <iframe
            title="Карта: студия на Рублёвском шоссе"
            src={`https://yandex.ru/map-widget/v1/?text=${MAP_QUERY}&z=15`}
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full border-0 grayscale-[35%]"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>
      </Container>
    </Section>
  );
}
