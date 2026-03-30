import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface ViewsChartProps {
  data: { date: string; views: number }[];
}

export default function ViewsChart({ data }: ViewsChartProps) {
  const formatted = data.map(d => ({
    ...d,
    date: format(new Date(d.date), 'MMM dd'),
  }));

  return (
    <div className='bg-track-card border border-track-border
      rounded-2xl p-5'>
      <h3 className='font-semibold text-track-text mb-4'>
        Page Views Over Time
      </h3>
      {data.length === 0 ? (
        <div className='flex items-center justify-center h-48'>
          <p className='text-track-muted text-sm'>No data yet</p>
        </div>
      ) : (
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart data={formatted}>
            <defs>
              <linearGradient id='viewsGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%'  stopColor='#3b82f6' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis
              dataKey='date'
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '10px',
                color: '#f9fafb',
              }}
            />
            <Area
              type='monotone'
              dataKey='views'
              stroke='#3b82f6'
              strokeWidth={2}
              fill='url(#viewsGradient)'
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}