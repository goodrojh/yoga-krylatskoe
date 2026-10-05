"use client";
import { useEffect } from "react";

const SEL = ".reveal, .reveal-fade, .reveal-x, .reveal-pop";

/** Один наблюдатель на всю страницу: добавляет класс .in, когда элемент попадает в экран. */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    const watch = (root: ParentNode) => root.querySelectorAll(SEL).forEach((el) => !el.classList.contains("in") && io.observe(el));
    watch(document);
    // элементы, появившиеся позже (переключение вкладок), тоже подхватываем
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && (n.matches(SEL) ? io.observe(n) : watch(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
