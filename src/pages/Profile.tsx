import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/hooks/use-scroll-animation';
import { Crown, LogOut, Settings, User } from 'lucide-react';

const Profile = () => {
  const { user, profile, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const paymentLink = `https://send.monobank.ua/Ye88AfpPC?a=100&t=%20${profile.discord_id}`;

  return (
    <>
      <Helmet>
        <title>Профіль - Lanicat</title>
        <meta name="description" content="Ваш профіль Lanicat" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="container px-4">
            <ScrollAnimation>
              <div className="max-w-2xl mx-auto">
                {/* Profile Card */}
                <div className="glass-card rounded-2xl p-8 mb-6">
                  <div className="flex items-center gap-6 mb-8">
                    {profile.discord_avatar ? (
                      <img 
                        src={profile.discord_avatar} 
                        alt={profile.discord_username || 'Avatar'}
                        className="w-24 h-24 rounded-full border-4 border-primary/30"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-12 h-12 text-primary" />
                      </div>
                    )}
                    
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        {profile.discord_username || 'Користувач'}
                      </h1>
                      <p className="text-muted-foreground">
                        Discord ID: {profile.discord_id}
                      </p>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                          <Settings className="w-4 h-4" />
                          Адміністратор
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Premium Status */}
                  <div className="p-6 rounded-xl bg-background/50 border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          profile.is_premium ? 'bg-primary/20' : 'bg-muted'
                        }`}>
                          <Crown className={`w-6 h-6 ${
                            profile.is_premium ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {profile.is_premium ? 'Premium активний' : 'Без Premium'}
                          </h3>
                          {profile.is_premium && profile.premium_until && (
                            <p className="text-sm text-muted-foreground">
                              До: {new Date(profile.premium_until).toLocaleDateString('uk-UA')}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {!profile.is_premium && (
                        <a 
                          href={paymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            Оформити Premium
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Admin Panel Link */}
                {isAdmin && (
                  <ScrollAnimation delay={100}>
                    <Link to="/dashboard">
                      <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-colors cursor-pointer mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <Settings className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">Адмін-панель</h3>
                              <p className="text-sm text-muted-foreground">Керування користувачами та підписками</p>
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </ScrollAnimation>
                )}

                {/* Logout Button */}
                <ScrollAnimation delay={200}>
                  <Button 
                    variant="outline" 
                    onClick={signOut}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Вийти з акаунту
                  </Button>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;
