import React from "react";
import "./flag-cube.css";

/**
 * FlagCube – kompakte 3x3 Struktur mit abstrakter Flaggen-Farblogik.
 * Keine globalen Layout-Eingriffe. Sicher für Desktop und Mobile.
 */
export default function FlagCube() {
  // Ein 3x3 Grid – jede Zelle bekommt anhand ihrer Zeile eine Farbe
  const cells = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      cells.push(<span key={`${x}-${y}`} data-row={y} data-col={x} />);
    }
  }

  return (
    <div className="flag-cube-frame" aria-hidden="true">
      <div className="flag-cube-grid">
        {cells}
      </div>
    </div>
  );
}
