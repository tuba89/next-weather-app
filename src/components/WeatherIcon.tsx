import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
} from "lucide-react";

export function WeatherIcon({ condition }: { condition: string }) {
  const baseClasses =
    "drop-shadow-lg transition-all duration-300 hover:scale-110";

  switch (condition) {
    case "Clear":
      return (
        <div className="relative">
          <Sun
            className={`${baseClasses} text-amber-400 animate-pulse`}
            strokeWidth={2.5}
            size={64}
            style={{
              filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))",
            }}
          />
        </div>
      );

    case "Clouds":
      return (
        <Cloud
          className={`${baseClasses} text-slate-100`}
          strokeWidth={2.5}
          size={64}
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        />
      );

    case "Rain":
      return (
        <div className="relative">
          <CloudRain
            className={`${baseClasses} text-sky-300`}
            strokeWidth={2.5}
            size={64}
            style={{
              filter: "drop-shadow(0 4px 12px rgba(56, 189, 248, 0.4))",
            }}
          />
        </div>
      );

    case "Thunderstorm":
      return (
        <div className="relative">
          <CloudLightning
            className={`${baseClasses} text-violet-300 animate-pulse`}
            strokeWidth={2.5}
            size={64}
            style={{
              filter: "drop-shadow(0 4px 16px rgba(196, 181, 253, 0.5))",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>
      );

    case "Snow":
      return (
        <div className="relative">
          <Snowflake
            className={`${baseClasses} text-cyan-200 animate-spin`}
            strokeWidth={2.5}
            size={64}
            style={{
              filter: "drop-shadow(0 4px 12px rgba(165, 243, 252, 0.4))",
              animation: "spin 8s linear infinite",
            }}
          />
        </div>
      );

    case "Mist":
    case "Fog":
    case "Haze":
      return (
        <CloudFog
          className={`${baseClasses} text-slate-200 opacity-90`}
          strokeWidth={2.5}
          size={64}
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
          }}
        />
      );

    default:
      return (
        <Cloud
          className={`${baseClasses} text-slate-100`}
          strokeWidth={2.5}
          size={64}
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        />
      );
  }
}
