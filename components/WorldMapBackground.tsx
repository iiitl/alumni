import Image from "next/image";

interface HubPoint {
  id: string;
  name: string;
  x: string;
  y: string;
  delay: string;
  isMain?: boolean;
}

const mapHubs: HubPoint[] = [
  { id: "sf", name: "Silicon Valley", x: "7.6%", y: "10.2%", delay: "0s" },
  { id: "us", name: "New York / US East", x: "16.3%", y: "24.5%", delay: "0.9s" },
  { id: "sa", name: "South America", x: "35.8%", y: "47.5%", delay: "1.8s" },
  { id: "wa", name: "West Africa", x: "46.6%", y: "22.2%", delay: "2.3s" },
  { id: "eu", name: "London / Europe", x: "49.2%", y: "16.2%", delay: "0.5s" },
  { id: "af", name: "East Africa", x: "59.6%", y: "41.0%", delay: "1.4s" },
  { id: "in", name: "IIIT Lucknow / India", x: "70.8%", y: "27.2%", delay: "0.2s", isMain: true },
  { id: "ea", name: "East Asia / Tokyo", x: "86.0%", y: "20.0%", delay: "1.1s" },
];

export interface WorldMapBackgroundProps {
  className?: string;
  opacity?: string;
}

export function WorldMapBackground({
  className = "",
  opacity = "opacity-80 dark:opacity-55",
}: WorldMapBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Aspect-ratio locked container matching world-map.png (1024x608) */}
      <div className="relative aspect-[1024/608] w-full max-w-7xl">
        {/* Slightly blurred map image for atmospheric aesthetic depth */}
        <Image
          src="/world-map.png"
          alt=""
          fill
          priority
          className={`object-contain object-center scale-105 sm:scale-100 blur-[0.75px] dark:brightness-125 transition-opacity duration-300 ${opacity}`}
        />

        {/* Animated Map Pointout Hubs */}
        {mapHubs.map((hub) => (
          <div
            key={hub.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: hub.x, top: hub.y }}
          >
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              {/* Expanding Radar Ping Ring */}
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                  hub.isMain ? "bg-accent" : "bg-sky-400"
                }`}
                style={{
                  animationDuration: "2.5s",
                  animationDelay: hub.delay,
                }}
              />

              {/* Gentle Glow Halo */}
              <span
                className={`absolute inline-flex h-4 w-4 rounded-full opacity-40 animate-pulse ${
                  hub.isMain ? "bg-accent" : "bg-sky-400"
                }`}
                style={{ animationDuration: "2s" }}
              />

              {/* Core Beacon Dot */}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ring-2 ring-background ${
                  hub.isMain
                    ? "bg-accent shadow-[0_0_12px_#c8a32e]"
                    : "bg-sky-400 shadow-[0_0_10px_#38bdf8]"
                }`}
              />
            </span>
          </div>
        ))}
      </div>

      {/* Subtle vertical vignette for clean text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
    </div>
  );
}
