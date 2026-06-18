import Card from '../common/Card';

export default function FeaturesSection() {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-900">Features</h2>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        <li>Carbon Score system</li>
        <li>Weekly and monthly analytics</li>
        <li>Local AI sustainability coach</li>
      </ul>
    </Card>
  );
}
