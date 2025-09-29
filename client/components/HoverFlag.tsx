// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { createPortal } from "react-dom";

// /**
//  * Shows a small Palestinian flag following the cursor while hovering text elements.
//  * Scope it by passing a CSS selector for the container that includes the text content.
//  */
// export function HoverFlag({ scopeSelector = "body" }: { scopeSelector?: string }) {
//   const [active, setActive] = useState(false);
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const rafRef = useRef<number | null>(null);
//   const scopeEl = useMemo(() => document.querySelector(scopeSelector) as HTMLElement | null, [scopeSelector]);
//   const textSelector = useMemo(() => [
//     "p","a","h1","h2","h3","h4","h5","h6","li","time","code","blockquote","span","strong","em","small"
//   ].join(","), []);

//   useEffect(() => {
//     if (!scopeEl) return;

//     const isTextTarget = (el: EventTarget | null) => {
//       if (!(el instanceof Element)) return false;
//       // Limit only inside the scope
//       if (!scopeEl.contains(el)) return false;
//       // Check if the element or any parent is one of the text tags
//       let cur: Element | null = el as Element;
//       while (cur && cur !== scopeEl) {
//         if (cur.matches(textSelector)) return true;
//         cur = cur.parentElement;
//       }
//       return false;
//     };

//     const handleMove = (e: MouseEvent) => {
//       const overText = isTextTarget(e.target);
//       setActive(overText);
//       const x = e.clientX + 16;
//       const y = e.clientY + 16;
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = requestAnimationFrame(() => setPos({ x, y }));
//     };

//     const handleLeaveScope = () => setActive(false);

//     scopeEl.addEventListener("mousemove", handleMove, { passive: true });
//     scopeEl.addEventListener("mouseleave", handleLeaveScope, { passive: true });

//     return () => {
//       scopeEl.removeEventListener("mousemove", handleMove as any);
//       scopeEl.removeEventListener("mouseleave", handleLeaveScope as any);
//     };
//   }, [scopeEl]);

//   if (!active) return null;

//   return createPortal(
//     <div
//       style={{
//         position: "fixed",
//         left: 0,
//         top: 0,
//         transform: `translate(${pos.x}px, ${pos.y}px)`,
//         pointerEvents: "none",
//         zIndex: 2147483647,
//         filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
//         willChange: "transform",
//       }}
//       aria-hidden
//     >
//       <img
//         src="https://cdn.builder.io/api/v1/image/assets%2F5dd0f493535c4878b94e69eb30613e6a%2F4704515dc5c94828b7747fe105ba36cf?format=webp&width=800"
//         alt="Palästina-Flagge"
//         style={{ display: "block", width: 220, height: "auto", imageRendering: "auto" }}
//         draggable={false}
//       />
//     </div>,
//     document.body,
//   );
// }

// export default HoverFlag;
