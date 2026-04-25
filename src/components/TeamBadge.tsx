import Image from "next/image";
import { Team } from "@/types";

interface TeamBadgeProps {
  team: Team;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

const sizeClasses = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const imageSizeByVariant = {
  sm: 28,
  md: 36,
  lg: 48,
};

export function TeamBadge({ team, size = "md", showName = false }: TeamBadgeProps) {
  const hasShield = Boolean(team.shieldUrl);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden ${
          hasShield
            ? ""
            : "rounded-full font-extrabold text-[#000000] shadow-[0_10px_26px_rgba(193,18,31,0.32)]"
        }`}
        style={
          hasShield
            ? undefined
            : {
                backgroundColor: team.primaryColor,
                border: `2px solid ${team.secondaryColor}`,
              }
        }
      >
        {hasShield ? (
          <Image
            src={team.shieldUrl!}
            alt={`Escudo do ${team.shortName}`}
            width={imageSizeByVariant[size] + 6}
            height={imageSizeByVariant[size] + 6}
            className="object-contain"
          />
        ) : (
          <span className="uppercase tracking-wide text-[0.68rem] font-extrabold">{team.acronym}</span>
        )}
      </div>
      {showName && <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">{team.shortName}</span>}
    </div>
  );
}
