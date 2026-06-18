import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/insights', label: 'Insights' },
  { to: '/goals', label: 'Goals' },
  { to: '/assistant', label: 'AI Coach' },
  { to: '/profile', label: 'Profile' },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
      <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Workspace</div>
      <nav className="space-y-1" aria-label="Dashboard navigation">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
