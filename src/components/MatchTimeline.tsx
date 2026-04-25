import { MatchEvent, Team } from "@/types";

interface MatchTimelineProps {
  events: MatchEvent[];
  homeTeam: Team;
  awayTeam: Team;
}

const eventIcons: Record<MatchEvent["type"], string> = {
  goal: "GO",
  yellow_card: "YC",
  red_card: "RC",
  substitution: "SUB",
  penalty: "PEN",
  own_goal: "OG",
};

const eventColors: Record<MatchEvent["type"], string> = {
  goal: "bg-[rgba(193,18,31,0.14)] text-[var(--accent)]",
  yellow_card: "bg-[rgba(21,128,61,0.2)] text-[var(--text)]",
  red_card: "bg-[rgba(0,0,0,0.24)] text-[var(--text)]",
  substitution: "bg-[rgba(21,128,61,0.18)] text-[var(--text)]",
  penalty: "bg-[rgba(0,0,0,0.2)] text-[var(--text)]",
  own_goal: "bg-[rgba(0,0,0,0.14)] text-[var(--muted)]",
};

export function MatchTimeline({ events, homeTeam, awayTeam }: MatchTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => b.minute - a.minute);

  return (
    <div className="space-y-3">
      {sortedEvents.length === 0 ? (
        <div className="surface-card text-center py-8 text-[var(--muted)]">
          <span className="text-4xl mb-2 block">---</span>
          <p>Nenhum evento registrado</p>
        </div>
      ) : (
        sortedEvents.map((event) => {
          const isHomeTeam = event.teamId === homeTeam.id;
          const teamName = isHomeTeam ? homeTeam.shortName : awayTeam.shortName;

          return (
            <div
              key={event.id}
              className={`surface-card flex items-center gap-4 p-3 ${isHomeTeam ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${eventColors[event.type]}`}>
                  <span className="text-xs font-bold tracking-wide">{eventIcons[event.type]}</span>
                </div>
                <div className={`flex flex-col ${isHomeTeam ? "items-start" : "items-end"}`}>
                  <span className="font-bold">{event.player}</span>
                  <span className="text-xs text-[var(--muted)]">{teamName}</span>
                  {event.description && <span className="text-sm text-[var(--muted)]">{event.description}</span>}
                </div>
              </div>

              <div className="ml-auto">
                <span
                  className={`px-3 py-1 rounded-lg font-bold ${
                    event.type === "goal" ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[rgba(21,128,61,0.16)] text-[var(--text)]"
                  }`}
                >
                  {event.minute}&apos;
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
