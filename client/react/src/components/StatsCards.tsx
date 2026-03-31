interface StatsCardsProps {
  pageviews:      number;
  uniqueVisitors: number;
  bounceRate:     number;
  avgDuration:    number;
  prevPageviews:  number;
  prevVisitors:   number;
}

const Trend = ({ current, prev }: { current: number; prev: number }) => {
  if (prev === 0) return null;
  const diff = Math.round(((current - prev) / prev) * 100);
  const up   = diff >= 0;
  return (
    <span className={`text-xs font-medium
      ${up ? 'text-track-green' : 'text-track-red'}`}>
      {up ? '↑' : '↓'} {Math.abs(diff)}%
    </span>
  );
};

export default function StatsCards({
  pageviews, uniqueVisitors, bounceRate, avgDuration,
  prevPageviews, prevVisitors,
}: StatsCardsProps) {
  const stats = [
    {
      label: 'Page Views',
      value: pageviews.toLocaleString(),
      icon:  '👁️',
      chip:  'bg-track-accent/15 text-track-accent border-track-accent/30',
      trend: <Trend current={pageviews} prev={prevPageviews} />,
    },
    {
      label: 'Unique Visitors',
      value: uniqueVisitors.toLocaleString(),
      icon:  '👤',
      chip:  'bg-track-lime/15 text-track-lime border-track-lime/30',
      trend: <Trend current={uniqueVisitors} prev={prevVisitors} />,
    },
    {
      label: 'Bounce Rate',
      value: `${bounceRate}%`,
      icon:  '📉',
      chip:  'bg-track-orange/15 text-track-orange border-track-orange/30',
      trend: null,
    },
    {
      label: 'Avg. Duration',
      value: `${avgDuration}s`,
      icon:  '⏱️',
      chip:  'bg-track-pink/15 text-track-pink border-track-pink/30',
      trend: null,
    },
  ];

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map(s => (
        <div key={s.label}
          className='bg-gradient-to-br from-track-card/90 to-track-surface/70
            backdrop-blur border border-track-border/80 rounded-2xl p-5
            shadow-[0_12px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/5'>
          <div className='flex items-center justify-between mb-3'>
            <span className={`text-lg px-2.5 py-1.5 rounded-xl border ${s.chip}`}>
              {s.icon}
            </span>
            {s.trend}
          </div>
          <p className='text-3xl font-semibold text-track-text mb-1'>
            {s.value}
          </p>
          <p className='text-track-muted text-sm'>{s.label}</p>
        </div>
      ))}
    </div>
  );
}
