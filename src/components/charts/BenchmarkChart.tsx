import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';

export default function BenchmarkChart() {
  const data = useCarbonStore((state) => state.benchmarkData);
  const chartData = data.map((entry) => ({ label: entry.label, value: entry.value }));

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Benchmark Chart</h2>
      <p className="text-sm text-slate-500">Compare your footprint against the sustainability target.</p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="value" fill="#059669" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
