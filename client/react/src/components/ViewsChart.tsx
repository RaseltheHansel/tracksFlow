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
    <div className='bg-track-card/80 backdrop-blur border border-track-border rounded-2xl p-5
      shadow-[0_8px_30px_rgba(0,0,0,0.25)]'>
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
              <CartesianGrid stroke='#374151' strokeDasharray='3 3' />
              <XAxis
                dataKey='date'
                tickFormatter={formatDate}
                stroke='#9ca3af'
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                stroke='#9ca3af'
                fontSize={12}
                tickMargin={8}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#111827',
                  border: '1px solid #374151',
                  borderRadius: 12,
                  color: '#f9fafb',
                  fontSize: 12,
                }}
                labelFormatter={(label) => formatDate(String(label))}
              />
              <Line
                type='monotone'
                dataKey='views'
                stroke='#3b82f6'
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
