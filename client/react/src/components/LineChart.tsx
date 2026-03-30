import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface LineChartProps {
  title?: string;
  data: Record<string, number | string>[];
  xKey: string;
  yKey: string;
  height?: number;
}

export default function LineChart({
  title,
  data,
  xKey,
  yKey,
  height = 220,
}: LineChartProps) {
  return (
    <div className='bg-track-card border border-track-border rounded-2xl p-5'>
      {title && (
        <h3 className='font-semibold text-track-text mb-4'>
          {title}
        </h3>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width='100%' height='100%'>
          <ReLineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke='#374151' strokeDasharray='3 3' />
            <XAxis dataKey={xKey} stroke='#9ca3af' fontSize={12} tickMargin={8} />
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
            <Line type='monotone' dataKey={yKey} stroke='#3b82f6' strokeWidth={2} dot={false} />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
