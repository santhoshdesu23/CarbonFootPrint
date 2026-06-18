import { Link } from 'react-router-dom';
import Card from '../common/Card';

export default function CTASection() {
  return (
    <Card className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Ready to explore the dashboard?</h2>
        <p className="mt-2 text-sm text-slate-600">Open the dashboard and start exploring carbon trends, goals, and recommendations.</p>
      </div>
      <Link className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-medium text-white transition hover:bg-emerald-500" to="/dashboard">
        Launch dashboard
      </Link>
    </Card>
  );
}
