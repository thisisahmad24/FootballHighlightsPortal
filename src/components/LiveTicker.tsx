export default function LiveTicker() {
  const matches = [
    "Real Madrid 2 - 0 Man City • 75'",
    "Arsenal 1 - 1 Liverpool • 42'",
    "Inter 3 - 0 AC Milan • FT",
    "Bayern 0 - 1 Dortmund • 12'"
  ];

  return (
    <div className="live-ticker">
      <div className="ticker-content">
        <span className="live-badge">LIVE</span>
        {matches.map((match, i) => (
          <span key={i} className="ticker-match">{match}</span>
        ))}
        {/* Duplicate for seamless loop if needed, but CSS animation handles basic scroll */}
      </div>
    </div>
  );
}
