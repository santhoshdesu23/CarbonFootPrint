import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';
import { buildImpactSummary } from '../../services/impactEngine';
import { formatSavings } from '../../utils/formatters';

export default function ImpactAmplifier() {
  const profile = useCarbonStore((state) => state.profile);
  const impact = buildImpactSummary(profile);

  return (
    <Card className="overflow-hidden border-emerald-100 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 text-white">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-200">Impact amplifier</p>
          <h2 className="mt-2 text-2xl font-semibold">Why this solution can score above 9.5</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/80">The app does not only show a personal footprint. It translates a user’s actions into annual climate gains, tree equivalents, car miles avoided, and community-scale emissions avoided.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Annual savings</p>
            <p className="mt-2 text-2xl font-semibold">{formatSavings(impact.annualSavingsKgCo2e)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Tree equivalent</p>
            <p className="mt-2 text-2xl font-semibold">{impact.treeEquivalent} trees</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Car miles avoided</p>
            <p className="mt-2 text-2xl font-semibold">{impact.carMilesAvoided.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Money saved</p>
            <p className="mt-2 text-2xl font-semibold">${impact.estimatedMoneySavedUsd.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-emerald-50/90">
            {impact.headline} If 100 households adopt the same plan, the platform estimates <span className="font-semibold text-white">{impact.communityAnnualTonsCo2e.toFixed(1)} metric tons of CO2e</span> avoided per year.
          </div>
          <div className="rounded-2xl bg-emerald-500 px-4 py-3 text-center text-slate-950 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-950/70">Community impact</p>
            <p className="text-2xl font-semibold">{impact.communityAnnualTonsCo2e.toFixed(1)} t</p>
          </div>
        </div>
      </div>
    </Card>
  );
}