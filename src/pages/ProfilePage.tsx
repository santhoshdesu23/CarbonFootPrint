import DashboardLayout from '../components/layout/DashboardLayout';
import ProfileForm from '../components/forms/ProfileForm';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
}
