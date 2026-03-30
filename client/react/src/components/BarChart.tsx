import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface BarChartProps {
  title?: string;
  data: { name: string; value: number }[];
  height?: number;
  color?: string;
}

export default function BarChart({
  title,
  data,
  height = 220,
  color = '#3b82f6',
}: BarChartProps) {
  return (
    <div className='bg-track-card border border-track-border rounded-2xl p-5'>
      {title && (
        <h3 className='font-semibold text-track-text mb-4'>
          {title}
        </h3>
      )}
      {data.length === 0 ? (
        <div className='flex items-center justify-center' style={{ height }}>
          <p className='text-track-muted text-sm'>No data yet</p>
        </div>
      ) : (
        <div style={{ height }}>
          <ResponsiveContainer width='100%' height='100%'>
            <ReBarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke='#374151' strokeDasharray='3 3' />
              <XAxis dataKey='name' stroke='#9ca3af' fontSize={12} tickMargin={8} />
              <YAxis stroke='#9ca3af' fontSize={12} tickMargin={8} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: '#111827',
                  border: '1px solid #374151',
                  borderRadius: 12,
                  color: '#f9fafb',
                  fontSize: 12,
                }}
              />
              <Bar dataKey='value' fill={color} radius={[6, 6, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
