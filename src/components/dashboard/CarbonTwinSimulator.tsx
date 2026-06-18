import { useMemo, useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useCarbonStore } from '../../store/carbonStore';
import { buildScenarioProjection, getCarbonScenarioPreset } from '../../services/carbonEngine';
import type { CarbonScenario } from '../../types/carbon';

const INITIAL_SCENARIO: CarbonScenario = {
  transportReductionPercent: 10,
  foodReductionPercent: 10,
  energyReductionPercent: 10,
  shoppingReductionPercent: 5,
  lifestyleReductionPercent: 5,
};

type SliderField = {
  key: keyof CarbonScenario;
  label: string;
  hint: string;
};

const SLIDERS: SliderField[] = [
  { key: 'transportReductionPercent', label: 'Transport reduction', hint: 'Replace short trips with transit, walking, or shared rides.' },
  { key: 'foodReductionPercent', label: 'Food reduction', hint: 'Shift one or two high-impact meals toward plant-based choices.' },
  { key: 'energyReductionPercent', label: 'Energy reduction', hint: 'Cut standby load and improve home energy efficiency.' },
  { key: 'shoppingReductionPercent', label: 'Shopping reduction', hint: 'Pause or consolidate non-essential purchases.' },
  { key: 'lifestyleReductionPercent', label: 'Lifestyle reduction', hint: 'Move more daily routines into lower-carbon habits.' },
];

export default function CarbonTwinSimulator() {
  const profile = useCarbonStore((state) => state.profile);
  const [scenario, setScenario] = useState<CarbonScenario>(INITIAL_SCENARIO);

  const projection = useMemo(() => buildScenarioProjection(profile, scenario), [profile, scenario]);

  const handlePreset = (preset: 'commuter' | 'food-first' | 'home-energy') => {
    setScenario(getCarbonScenarioPreset(preset));
  };

  return (
    <Card className="space-y-5 overflow-hidden border-emerald-100 bg-gradient-to-br from-white via-emerald-50/50 to-white">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">Carbon Twin Simulator</p>
          <h2 className="text-2xl font-semibold text-slate-950">See your footprint after behavior changes</h2>
          <p className="mt-1 text-sm text-slate-600">An interactive what-if model that turns sustainability into a measurable product experience.</p>
        </div>
        <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Projected score</p>
          <p className="text-3xl font-semibold">{projection.projectedCarbonScore.toFixed(0)}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="secondary" onClick={() => handlePreset('commuter')}>Commute-heavy</Button>
        <Button variant="secondary" onClick={() => handlePreset('food-first')}>Food-first</Button>
        <Button variant="secondary" onClick={() => handlePreset('home-energy')}>Home-energy</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {SLIDERS.map((slider) => (
            <label key={slider.key} className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-900">{slider.label}</p>
                  <p className="text-sm text-slate-500">{slider.hint}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {scenario[slider.key]}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={scenario[slider.key]}
                onChange={(event) => setScenario((current) => ({ ...current, [slider.key]: Number(event.target.value) }))}
                className="mt-4 w-full accent-emerald-600"
                aria-label={slider.label}
              />
            </label>
          ))}
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Outcome forecast</p>
            <p className="mt-2 text-lg font-semibold">{projection.narrative}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Projected total</p>
              <p className="mt-2 text-2xl font-semibold">{projection.projectedTotalKgCo2e.toFixed(1)}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Total savings</p>
              <p className="mt-2 text-2xl font-semibold">{projection.totalSavingsKgCo2e.toFixed(1)}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-500/15 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Strongest lever</p>
            <p className="mt-2 text-xl font-semibold capitalize">{projection.strongestLever}</p>
            <p className="mt-1 text-sm text-slate-300">
              This lever produces the biggest score movement in the current scenario mix.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
            The Carbon Twin is the most novel part of the product: users can simulate behavior changes, see projected carbon score shifts, and understand which actions matter most before they act.
          </div>
        </div>
      </div>
    </Card>
  );
}