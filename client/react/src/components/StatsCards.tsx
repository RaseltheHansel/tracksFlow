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
      ${up ? 'text-track-green' : 'text-red-400'}`}>
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
      trend: <Trend current={pageviews} prev={prevPageviews} />,
    },
    {
      label: 'Unique Visitors',
      value: uniqueVisitors.toLocaleString(),
      icon:  '👤',
      trend: <Trend current={uniqueVisitors} prev={prevVisitors} />,
    },
    {
      label: 'Bounce Rate',
      value: `${bounceRate}%`,
      icon:  '📉',
      trend: null,
    },
    {
      label: 'Avg. Duration',
      value: `${avgDuration}s`,
      icon:  '⏱️',
      trend: null,
    },
  ];

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
      {stats.map(s => (
        <div key={s.label}
          className='bg-track-card/80 backdrop-blur border border-track-border
            rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-2xl'>{s.icon}</span>
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
