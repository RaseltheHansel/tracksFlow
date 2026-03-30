import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

interface PieChartProps {
  title?: string;
  data: { name: string; value: number }[];
  height?: number;
  colors?: string[];
}

const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function PieChart({
  title,
  data,
  height = 220,
  colors = defaultColors,
}: PieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  return (
    <div className='bg-track-card border border-track-border rounded-2xl p-5'>
      {title && (
        <h3 className='font-semibold text-track-text mb-4'>
          {title}
        </h3>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width='100%' height='100%'>
          <RePieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              innerRadius={42}
              outerRadius={70}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#111827',
                border: '1px solid #374151',
                borderRadius: 12,
                color: '#f9fafb',
                fontSize: 12,
              }}
              formatter={(value, name) => {
                const num = typeof value === 'number' ? value : 0;
                return [
                  `${num} (${Math.round((num / total) * 100)}%)`,
                  name,
                ];
              }}
            />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
