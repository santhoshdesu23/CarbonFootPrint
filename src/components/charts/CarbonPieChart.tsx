import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';

const COLORS = ['#059669', '#0f766e', '#14b8a6', '#22c55e', '#86efac'];

export default function CarbonPieChart() {
  const data = useCarbonStore((state) => state.categoryChartData);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Carbon Mix</h2>
      <p className="text-sm text-slate-500">Category share of total emissions.</p>
      <div className="mt-4 h-72" aria-label="Pie chart showing carbon emission share by category" role="img">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} innerRadius={60} paddingAngle={4}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
