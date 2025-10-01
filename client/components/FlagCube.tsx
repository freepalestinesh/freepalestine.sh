import React from "react";
import "./flag-cube.css";

/**
 * Statische minimal-Version (Variante D).
 * Keine Props, keine dynamische Skalierungslogik – reine Darstellung.
 * Skalierung kann später über ein Wrapper-Transform hinzugefügt werden.
 */
export default function FlagCube() {
  return (
    <div className="pfc-root" aria-hidden="true">
      <div className="pfc-viewport">
        <div className="pfc-scale">
          <div className="pfc-container">
            {[0, 1, 2].map(layer => (
              <div className="pfc-layer" key={layer}>
                {[-1, 0, 1].map(x => (
                  <div
                    key={x}
                    className="pfc-col"
                    style={{ ["--x" as any]: x, ["--y" as any]: 0 }}
                  >
                    {[3, 2, 1].map(i => (
                      <span key={i} style={{ ["--i" as any]: i }} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
