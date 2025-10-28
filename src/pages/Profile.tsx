import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import ProfileEditor from '@/components/candidate/ProfileEditor';
import EmployerProfile from '@/components/employer/EmployerProfile';

export default function Profile() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>My Profile - FindJobOffer</title>
        <meta name="description" content="Manage your FindJobOffer profile and account settings" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>

          {userProfile?.role === 'employer' ? (
            <EmployerProfile />
          ) : (
            <ProfileEditor />
          )}
        </div>
      </div>
    </>
  );
}
