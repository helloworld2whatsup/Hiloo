import React from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps"

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export default function MapChart({ lat, lng, name }: { lat: number, lng: number, name: string }) {
  return (
    <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#27272a"
              stroke="#3f3f46"
            />
          ))
        }
      </Geographies>
      <Marker coordinates={[lng, lat]}>
        <circle r={6} fill="#dc2626" stroke="#fff" strokeWidth={2} />
        <text
          textAnchor="middle"
          y={-15}
          style={{ fontFamily: "system-ui", fill: "#fff", fontSize: "12px", fontWeight: "bold" }}
        >
          {name}
        </text>
      </Marker>
    </ComposableMap>
  )
}
