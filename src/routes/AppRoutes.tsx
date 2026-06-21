import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { useUserStore } from '../store/userStore';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const OnboardingPage = lazy(() => import('../pages/OnboardingPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const InsightsPage = lazy(() => import('../pages/InsightsPage'));
const GoalsPage = lazy(() => import('../pages/GoalsPage'));
const AssistantPage = lazy(() => import('../pages/AssistantPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

/** Redirects to onboarding if the user has not completed their profile yet. */
function RequireProfile({ children }: { children: React.ReactNode }) {
  const name = useUserStore((state) => state.user.name);
  const isOnboarded = name.length > 0 && name !== 'Your Name';
  return isOnboarded ? <>{children}</> : <Navigate to="/onboarding" replace />;
}

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-slate-50">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />
        <Route path="/dashboard" element={<RequireProfile><DashboardPage /></RequireProfile>} />
        <Route path="/insights" element={<RequireProfile><InsightsPage /></RequireProfile>} />
        <Route path="/goals" element={<RequireProfile><GoalsPage /></RequireProfile>} />
        <Route path="/assistant" element={<RequireProfile><AssistantPage /></RequireProfile>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
