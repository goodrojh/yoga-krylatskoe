"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Phone, ArrowRight, Loader2 } from "lucide-react";
import { FORMS, type FormId, type LeadForm } from "@/lib/forms";
import { SITE, asset, waLink } from "@/lib/config";
import { MessengerButtons } from "./Messengers";

type OpenOptions = { preset?: Record<string, string[]> };
type Ctx = { open: (id: FormId, opts?: OpenOptions) => void };

const LeadContext = createContext<Ctx>({ open: () => {} });
export const useLead = () => useContext(LeadContext);

export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export const phoneValid = (v: string) => v.replace(/\D/g, "").length === 11;

/**
 * Отправка заявки. Если задан SITE.leadEndpoint — POST JSON.
 * Иначе открываем WhatsApp с готовым текстом (window.open вызывается синхронно в обработчике клика,
 * чтобы браузер не заблокировал окно).
 */
export async function sendLead(formTitle: string, data: Record<string, string>) {
  const text =
    `Заявка с сайта «${SITE.name}»\n${formTitle}\n` +
    Object.entries(data)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

  if (!SITE.leadEndpoint) {
    window.open(waLink(text), "_blank", "noopener");
    return;
  }
  await fetch(SITE.leadEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ form: formTitle, ...data, message: text }),
  }).catch(() => {
    window.open(waLink(text), "_blank", "noopener");
  });
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ id: FormId; opts?: OpenOptions } | null>(null);
  const open = useCallback((id: FormId, opts?: OpenOptions) => setState({ id, opts }), []);
  const close = useCallback(() => setState(null), []);

  useEffect(() => {
    document.body.style.overflow = state ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, close]);

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {state && (
          <LeadModal key={state.id} form={FORMS[state.id]} preset={state.opts?.preset} onClose={close} />
        )}
      </AnimatePresence>
    </LeadContext.Provider>
  );
}

function LeadModal({
  form,
  preset,
  onClose,
}: {
  form: LeadForm;
  preset?: Record<string, string[]>;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [picked, setPicked] = useState<Record<string, string[]>>(preset ?? {});
  const [agree, setAgree] = useState(true);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const toggle = (field: string, opt: string, multi?: boolean) =>
    setPicked((p) => {
      const cur = p[field] ?? [];
      const has = cur.includes(opt);
      const next = multi ? (has ? cur.filter((x) => x !== opt) : [...cur, opt]) : has ? [] : [opt];
      return { ...p, [field]: next };
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || !phoneValid(phone) || !agree) return;
    setStatus("sending");
    const data: Record<string, string> = { Имя: name.trim(), Телефон: phone };
    Object.entries(picked).forEach(([k, v]) => v.length && (data[k] = v.join(", ")));
    if (comment.trim()) data["Комментарий"] = comment.trim();
    await sendLead(form.title, data);
    setStatus("done");
  };

  const err = (cond: boolean) => (touched && cond ? "border-clay ring-2 ring-clay/20" : "border-ink/10");

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={form.title}
    >
      <div className="absolute inset-0 bg-ink/70 md:bg-ink/60 md:backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", damping: 26, stiffness: 260 }}
        className="relative w-full sm:max-w-[920px] max-h-[94vh] overflow-y-auto no-scrollbar bg-cream rounded-t-[28px] sm:rounded-[32px] shadow-2xl grid md:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Photo side */}
        <div className="relative hidden md:block min-h-[560px] overflow-hidden rounded-l-[32px]">
          <motion.img
            src={asset(form.image)}
                  srcSet={`${asset(form.image.replace(".webp", "-sm.webp"))} 860w, ${asset(form.image)} 1280w`}
                  sizes="460px"
                  decoding="async"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <BreathDot />
            <p className="font-display text-[26px] leading-tight mt-4">
              «Каждая практика начинается с одного вдоха»
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="p-6 sm:p-10 relative">
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center justify-center min-h-[460px] gap-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-sage text-white flex items-center justify-center shadow-xl shadow-sage/30"
                >
                  <Check className="w-9 h-9" strokeWidth={2.5} />
                </motion.div>
                <h3 className="font-display text-[36px]">Спасибо, {name.split(" ")[0]}!</h3>
                <p className="text-muted max-w-sm">
                  Заявка «{form.badge}» принята. Скоро свяжемся с вами по номеру{" "}
                  <span className="text-ink font-semibold whitespace-nowrap">{phone}</span>.
                  А пока — сделайте глубокий вдох :)
                </p>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sage hover:underline"
                >
                  <Phone className="w-4 h-4" /> Не хотите ждать? {SITE.phone}
                </a>
                <div className="w-full max-w-sm">
                  <p className="text-[13px] text-muted mb-2">Или напишите нам:</p>
                  <MessengerButtons />
                </div>
                <button onClick={onClose} className="mt-2 rounded-full px-8 py-3 bg-ink text-white font-semibold">
                  Вернуться на сайт
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate className="flex flex-col gap-5">
                <span className="inline-flex w-fit h-7 items-center rounded-full bg-clay/10 text-clay-dark text-[13px] font-semibold px-3">
                  {form.badge}
                </span>
                <div>
                  <h3 className="font-display text-[30px] sm:text-[36px] leading-[1.08] pr-10">{form.title}</h3>
                  <p className="text-muted mt-3 leading-relaxed">{form.subtitle}</p>
                </div>

                {form.chips?.map((f) => (
                  <div key={f.name}>
                    <p className="text-sm font-semibold mb-2">{f.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {f.options.map((o) => {
                        const on = (picked[f.name] ?? []).includes(o);
                        return (
                          <button
                            type="button"
                            key={o}
                            onClick={() => toggle(f.name, o, f.multi)}
                            className={
                              "rounded-full px-4 py-2 text-sm border transition-all " +
                              (on
                                ? "bg-sage text-white border-sage shadow-md shadow-sage/20"
                                : "bg-white border-ink/10 hover:border-sage/50")
                            }
                          >
                            {on && <Check className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />}
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    autoComplete="given-name"
                    className={"h-14 rounded-2xl bg-white px-5 outline-none border focus:border-sage transition " + err(!name.trim())}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value ? formatPhone(e.target.value) : "")}
                    onFocus={() => !phone && setPhone("+7")}
                    placeholder="+7 (___) ___-__-__"
                    inputMode="tel"
                    autoComplete="tel"
                    className={"h-14 rounded-2xl bg-white px-5 outline-none border focus:border-sage transition " + err(!phoneValid(phone))}
                  />
                </div>

                {form.comment && (
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={form.comment}
                    rows={3}
                    className="rounded-2xl bg-white px-5 py-4 outline-none border border-ink/10 focus:border-sage transition resize-none"
                  />
                )}

                {form.note && (
                  <p className="text-xs text-clay-dark bg-clay/10 rounded-xl px-4 py-3 leading-relaxed">{form.note}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group h-[52px] rounded-full bg-clay hover:bg-clay-dark text-white font-semibold text-base flex items-center justify-center gap-2 shadow-xl shadow-clay/30 transition-all active:scale-[0.98]"
                >
                  {status === "sending" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {form.cta}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <label className="flex items-start gap-2 text-xs text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 accent-sage"
                  />
                  <span className={touched && !agree ? "text-clay" : ""}>
                    Согласен(на) на обработку персональных данных для связи со мной
                  </span>
                </label>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BreathDot() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full bg-white/30"
        animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_14px_white]" />
    </div>
  );
}
