"use client";

import { useId } from "react";

interface SparklineProps {
  data: number[];
  className?: string;
  strokeClassName?: string;
  height?: number;
}

export function Sparkline({
  data,
  className = "",
  strokeClassName = "stroke-[hsl(var(--accent))]",
  height = 32,
}: SparklineProps) {
  const id = useId().replace(/:/g, "");
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = height - 4;
  const step = w / (data.length - 1);
  const linePoints = data
    .map((v, i) => `${i * step + 2},${h - ((v - min) / range) * h + 2}`)
    .join(" ");
  const areaPoints = `${linePoints} ${w + 2},${h + 2} 2,${h + 2}`;

  return (
    <svg
      viewBox={`0 0 ${w + 4} ${height}`}
      className={`overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`sparkline-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#sparkline-${id})`}
      />
      <polyline
        points={linePoints}
        fill="none"
        className={strokeClassName}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
