import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import { APP_NAME } from '../utils/constants';

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Carbon Score',
    description: '0–100 score aligned to realistic household emissions across five life categories.',
  },
  {
    title: 'Carbon Twin Simulator',
    description: 'Model behavior changes with interactive sliders and see projected score shifts instantly.',
  },
  {
    title: 'Goal Tracking',
    description: 'Set weekly or monthly reduction targets, track progress, and unlock achievement badges.',
  },
  {
    title: 'Trend Analytics',
    description: 'Weekly and monthly emission views with household benchmark comparisons.',
  },
  {
    title: 'AI Coach',
    description: 'Conversational sustainability coach with contextual replies — no external APIs required.',
  },
  {
    title: 'Impact Amplifier',
    description: 'Translates personal savings into tree equivalents, car miles avoided, and community-scale impact.',
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(180deg,#f8fcf9_0%,#edf7f1_100%)]">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Personal carbon intelligence</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
            {APP_NAME} turns footprint data into clear action.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Track your household emissions, simulate behavior changes, set reduction goals, and get AI-powered coaching — all locally, with no external APIs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-medium text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              to="/dashboard"
            >
              Open dashboard
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              to="/insights"
            >
              Explore insights
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, description }) => (
            <Card key={title} className="bg-white/90">
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
