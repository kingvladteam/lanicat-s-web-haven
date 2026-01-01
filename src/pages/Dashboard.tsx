import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollAnimation } from '@/hooks/use-scroll-animation';
import { Crown, Search, User, Check, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  user_id: string;
  discord_id: string | null;
  discord_username: string | null;
  discord_avatar: string | null;
  is_premium: boolean;
  premium_until: string | null;
}

const Dashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/profile');
    }
  }, [user, isAdmin, isLoading, navigate]);

  const searchUsers = async () => {
    if (!searchQuery.trim()) {
      toast.error('Введіть Discord ID або username для пошуку');
      return;
    }

    setIsSearching(true);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`discord_id.ilike.%${searchQuery}%,discord_username.ilike.%${searchQuery}%`);

    if (error) {
      toast.error('Помилка пошуку');
      console.error(error);
    } else {
      setUsers(data || []);
      if (data?.length === 0) {
        toast.info('Користувачів не знайдено');
      }
    }

    setIsSearching(false);
  };

  const togglePremium = async (profile: UserProfile) => {
    const newPremiumStatus = !profile.is_premium;
    const premiumUntil = newPremiumStatus 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
      : null;

    const { error } = await supabase
      .from('profiles')
      .update({ 
        is_premium: newPremiumStatus,
        premium_until: premiumUntil
      })
      .eq('id', profile.id);

    if (error) {
      toast.error('Помилка оновлення Premium статусу');
      console.error(error);
    } else {
      setUsers(users.map(u => 
        u.id === profile.id 
          ? { ...u, is_premium: newPremiumStatus, premium_until: premiumUntil }
          : u
      ));
      toast.success(newPremiumStatus ? 'Premium видано' : 'Premium знято');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Адмін-панель - Lanicat</title>
        <meta name="description" content="Адміністративна панель Lanicat" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <div className="container px-4">
            <ScrollAnimation>
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => navigate('/profile')}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Адмін-панель</h1>
                    <p className="text-muted-foreground">Керування Premium-підписками</p>
                  </div>
                </div>

                {/* Search */}
                <div className="glass-card rounded-2xl p-6 mb-6">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Пошук за Discord ID або username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchUsers()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={searchUsers}
                      disabled={isSearching}
                      className="flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      {isSearching ? 'Пошук...' : 'Шукати'}
                    </Button>
                  </div>
                </div>

                {/* Users List */}
                {users.length > 0 && (
                  <div className="space-y-4">
                    {users.map((profile) => (
                      <ScrollAnimation key={profile.id}>
                        <div className="glass-card rounded-xl p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {profile.discord_avatar ? (
                                <img 
                                  src={profile.discord_avatar}
                                  alt={profile.discord_username || 'Avatar'}
                                  className="w-14 h-14 rounded-full"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                                  <User className="w-7 h-7 text-primary" />
                                </div>
                              )}
                              
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {profile.discord_username || 'Невідомий користувач'}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  ID: {profile.discord_id}
                                </p>
                                {profile.is_premium && profile.premium_until && (
                                  <p className="text-xs text-primary">
                                    Premium до: {new Date(profile.premium_until).toLocaleDateString('uk-UA')}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                profile.is_premium 
                                  ? 'bg-primary/20 text-primary' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                <div className="flex items-center gap-1">
                                  <Crown className="w-4 h-4" />
                                  {profile.is_premium ? 'Premium' : 'Звичайний'}
                                </div>
                              </div>
                              
                              <Button
                                variant={profile.is_premium ? 'destructive' : 'default'}
                                size="sm"
                                onClick={() => togglePremium(profile)}
                                className="flex items-center gap-1"
                              >
                                {profile.is_premium ? (
                                  <>
                                    <X className="w-4 h-4" />
                                    Зняти
                                  </>
                                ) : (
                                  <>
                                    <Check className="w-4 h-4" />
                                    Видати
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </ScrollAnimation>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {users.length === 0 && (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Пошук користувачів
                    </h3>
                    <p className="text-muted-foreground">
                      Введіть Discord ID або username користувача для пошуку
                    </p>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
