/* ==========================================================================
   Palestine Flag Cube Stable
   - Keine globalen Reset-Selektoren
   - Fixe Stage (Quadrat), interne Skalierung via transform
   - Prefixed (.pfc-)
   ========================================================================== */

.pfc-root {
  --pfc-base: 520px;
  --pfc-scale: 1;
  --pfc-revert: 6s;

  width: 100%;
  /* Stage bleibt quadratisch; verhindert Layout-Shift beim Skalieren */
  aspect-ratio: 1 / 1;
  max-width: var(--pfc-base);
  position: relative;
  margin: 0 auto;
  pointer-events: none;
  line-height: 0;
}

/* Viewport hält die absolute Basisfläche (unskaliert) */
.pfc-viewport {
  position: absolute;
  inset: 0;
}

/* Skaliert komplette Szene um die Mitte */
.pfc-scale {
  position: absolute;
  inset: 0;
  transform: translate(-50%, -50%) scale(var(--pfc-scale));
  top: 50%;
  left: 50%;
  width: var(--pfc-base);
  height: var(--pfc-base);
  transform-origin: center center;
  pointer-events: none;
}

/* Isometrische Container-Schiebung */
.pfc-container {
  position: relative;
  top: -80px;
  transform: skewY(-20deg);
  pointer-events: none;
}

/* Layer */
.pfc-layer {
  position: relative;
  z-index: 2;
  pointer-events: none;
}

.pfc-layer:nth-child(2) {
  z-index: 1;
  transform: translate(-60px, -60px);
}

.pfc-layer:nth-child(3) {
  z-index: 3;
  transform: translate(60px, 60px);
}

/* Spalten */
.pfc-col {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 30px;
  transform: translate(calc(-70px * var(--x)), calc(-60px * var(--y)));
  pointer-events: none;
}

/* Tiles */
.pfc-col > span {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  z-index: calc(1 * var(--i));
  cursor: pointer;
  pointer-events: auto;

  --flag-color: #ffffff;
  --flag-color-light: #f2f2f2;
  --flag-color-lighter: #e6e6e6;
  background: var(--flag-color);

  transition-property: background, filter;
  transition-duration: var(--pfc-revert);
  transition-timing-function: ease;

  border-radius: 9px;
  box-shadow:
    0 4px 14px -2px rgba(0,0,0,0.18),
    0 2px 6px -1px rgba(0,0,0,0.25),
    0 0 0 1px rgba(0,0,0,0.05) inset;
  filter: brightness(0.97);
  overflow: visible;
}

/* Kanten */
.pfc-col > span::before,
.pfc-col > span::after {
  content: "";
  position: absolute;
  transition: background var(--pfc-revert) ease;
  border-radius: 6px;
}

.pfc-col > span::before {
  left: -40px;
  width: 40px;
  height: 100%;
  background: var(--flag-color-light);
  transform-origin: right;
  transform: skewY(45deg);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.pfc-col > span::after {
  top: -40px;
  left: 0;
  width: 100%;
  height: 40px;
  background: var(--flag-color-lighter);
  transform-origin: bottom;
  transform: skewX(45deg);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

/* Farbzuweisungen (Palästina-Farblogik + rotes Dreieck) */
.pfc-layer > .pfc-col:nth-child(1) > span {
  --hover-color: #000000;
  --hover-color-light: #2d2d2d;
  --hover-color-lighter: #4f4f4f;
}
.pfc-layer > .pfc-col:nth-child(2) > span {
  --hover-color: #ffffff;
  --hover-color-light: #f2f2f2;
  --hover-color-lighter: #e6e6e6;
}
.pfc-layer > .pfc-col:nth-child(3) > span {
  --hover-color: #007a3d;
  --hover-color-light: #00994d;
  --hover-color-lighter: #33aa66;
}
/* linkes Dreieck (erstes span jeder Spalte) */
.pfc-col > span:first-child {
  --hover-color: #ce1126;
  --hover-color-light: #e63946;
  --hover-color-lighter: #f06263;
}

/* Hover Desktop */
@media (hover:hover) {
  .pfc-root:not(.pfc-no-hover) .pfc-col > span:hover {
    transition-duration: 0s;
    background: var(--hover-color);
    filter: brightness(1) drop-shadow(0 0 18px var(--hover-color));
  }
  .pfc-root:not(.pfc-no-hover) .pfc-col > span:hover::before,
  .pfc-root:not(.pfc-no-hover) .pfc-col > span:hover::after {
    transition-duration: 0s;
    background: var(--hover-color-light);
  }
}

/* Touch */
@media (hover:none) {
  .pfc-root:not(.pfc-no-hover) .pfc-col > span:active {
    transition-duration: 0s;
    background: var(--hover-color);
    filter: brightness(1) drop-shadow(0 0 12px var(--hover-color));
  }
}

/* Step-basiertes Scale-Finetuning optional (optional als Ergänzung):
   Wenn du mode="stepped" verwendest, kannst du über Utility-Klassen alternative
   Breakpoints definieren, z. B. .pfc-step-sm ... (hier nur Beispiel, nicht aktiv) */
