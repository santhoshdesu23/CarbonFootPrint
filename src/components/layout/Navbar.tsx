import { NavLink } from 'react-router-dom';
import Button from '../common/Button';
import { APP_NAME } from '../../utils/constants';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/insights', label: 'Insights' },
  { to: '/goals', label: 'Goals' },
  { to: '/assistant', label: 'Assistant' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">CarbonWise AI</p>
          <h1 className="text-lg font-semibold text-slate-900">{APP_NAME}</h1>
        </div>
        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-2 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button variant="secondary" size="sm" className="hidden sm:inline-flex">Book demo</Button>
      </div>
    </header>
  );
}
