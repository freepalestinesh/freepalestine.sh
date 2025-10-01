import React from "react";
import "./flag-cube.css";

export interface FlagCubeProps {
  revertDurationSec?: number;
  minScale?: number;        // reserviert für spätere interne Skalierung
  disableHover?: boolean;
  ariaLabel?: string;
  className?: string;
}

const FlagCube: React.FC<FlagCubeProps> = ({
  revertDurationSec = 6,
  disableHover = false,
  ariaLabel = "",
  className = "",
}) => {
  const accessibility = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" };

  return (
    <div
      className={`pfc-root ${disableHover ? "pfc-no-hover" : ""} ${className}`}
      style={
        {
          "--pfc-revert": `${revertDurationSec}s`,
        } as React.CSSProperties
      }
      {...accessibility}
    >
      <div className="pfc-viewport">
        <div className="pfc-scale">
          <div className="pfc-container">
            {[0, 1, 2].map(layer => (
              <div className="pfc-layer" key={layer} data-layer={layer}>
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
};

export default FlagCube;
