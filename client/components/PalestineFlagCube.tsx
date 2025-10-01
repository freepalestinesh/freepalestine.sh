import React from "react";
import "./palestine-flag-cube.css";

export interface PalestineFlagCubeProps {
  /**
   * Sekunden (oder Bruchteil) zum Zurückverblassen.
   * Wird als CSS-Variable --pfc-revert gesetzt.
   */
  revertDurationSec?: number;
  /**
   * Minimale Skalierung relativ zur Basisbreite (Default 0.55)
   */
  minScale?: number;
  /**
   * Klassen für zusätzliches Wrapping (z.B. Tailwind)
   */
  className?: string;
  /**
   * Falls true: deaktiviert Hover-Effekt (reine statische Darstellung)
   */
  disableHover?: boolean;
  /**
   * Aria Label (wenn dekorativ -> leer lassen: aria-hidden)
   */
  ariaLabel?: string;
}

const PalestineFlagCube: React.FC<PalestineFlagCubeProps> = ({
  revertDurationSec = 6,
  minScale = 0.55,
  className = "",
  disableHover = false,
  ariaLabel = ""
}) => {
  // Inline-CSS-Variablen für parametrisierte Steuerung
  const style: React.CSSProperties = {
    // Wird in CSS als clamp( minScale , (100vw - 2rem)/base, 1 )
    // gesteuert über --pfc-min-scale
    ["--pfc-min-scale" as any]: minScale,
    ["--pfc-revert" as any]: `${revertDurationSec}s`,
  };

  const accessibility = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" };

  return (
    <div className={`pfc-root ${disableHover ? "pfc-no-hover" : ""} ${className}`} style={style} {...accessibility}>
      <div className="pfc-scale" data-cube>
        <div className="pfc-container">
          {/* Drei Layer à 3 Spalten à 3 Würfel (wie dein Original) */}
          <div className="pfc-layer">
            <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
          </div>

          <div className="pfc-layer">
            <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
          </div>

          <div className="pfc-layer">
            <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
            <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
              <span style={{ ["--i" as any]: 3 }} />
              <span style={{ ["--i" as any]: 2 }} />
              <span style={{ ["--i" as any]: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalestineFlagCube;
