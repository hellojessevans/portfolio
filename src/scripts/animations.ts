import { gsap } from "gsap";

export function wagTail(selector: string): void {
  const el = document.querySelector(selector);
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.fromTo(
    el,
    { rotate: -8 },
    {
      rotate: 22,
      duration: 0.12,
      repeat: 7,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "10% 90%",
      onComplete: () => gsap.to(el, { rotate: 0, duration: 0.2 }),
    },
  );
}

export function bounce(selector: string): void {
  const el = document.querySelector(selector);
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.fromTo(
    el,
    { y: 0 },
    { y: -8, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.out" },
  );
}

export function spinRecord(selector: string): void {
  const el = document.querySelector(selector);
  if (!el) return;
  const playing = el.getAttribute("data-spinning") === "true";
  if (playing) {
    gsap.killTweensOf(el);
    el.setAttribute("data-spinning", "false");
    return;
  }
  el.setAttribute("data-spinning", "true");
  gsap.to(el, {
    rotate: "+=360",
    duration: 1.6,
    repeat: -1,
    ease: "none",
    transformOrigin: "center center",
  });
}

export function shake(selector: string, distance = 4): void {
  const el = document.querySelector(selector);
  if (!el) return;
  gsap.killTweensOf(el);
  gsap.fromTo(
    el,
    { x: -distance },
    {
      x: distance,
      duration: 0.06,
      repeat: 5,
      yoyo: true,
      ease: "sine.inOut",
      onComplete: () => gsap.to(el, { x: 0, duration: 0.15 }),
    },
  );
}
