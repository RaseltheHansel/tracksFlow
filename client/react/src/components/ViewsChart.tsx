import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface ViewsChartProps {
  data: { date: string; views: number }[];
}

const formatDate = (value: string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

export default function ViewsChart({ data }: ViewsChartProps) {
  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className='bg-gradient-to-br from-track-card/90 to-track-surface/70
      backdrop-blur border border-track-border/80 rounded-2xl p-5
      shadow-[0_12px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/5'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='font-semibold text-track-text'>Views Over Time</h3>
          <p className='text-track-muted text-xs mt-0.5'>
            Page views trend
          </p>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className='flex items-center justify-center h-56'>
          <p className='text-track-muted text-sm'>No data yet</p>
        </div>
      ) : (
        <div className='h-60'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={sorted} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id='viewsLine' x1='0' y1='0' x2='1' y2='0'>
                  <stop offset='0%' stopColor='#22d3ee' />
                  <stop offset='100%' stopColor='#a3e635' />
                </linearGradient>
              </defs>
              <CartesianGrid stroke='#1f2a44' strokeDasharray='3 3' />
              <XAxis
                dataKey='date'
                tickFormatter={formatDate}
                stroke='#94a3b8'
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                stroke='#94a3b8'
                fontSize={12}
                tickMargin={8}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#0b1120',
                  border: '1px solid #1f2a44',
                  borderRadius: 12,
                  color: '#e5e7eb',
                  fontSize: 12,
                }}
                labelFormatter={(label) => formatDate(String(label))}
              />
              <Line
                type='monotone'
                dataKey='views'
                stroke='url(#viewsLine)'
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#a3e635' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
