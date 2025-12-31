import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { placeTypes, PlaceType } from '@/data/destinations';
import { generateItinerary, TripPreferences, GeneratedItinerary } from '@/services/aiRecommendation';
import { Calendar, Sparkles, Clock, MapPin, Users, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const TripPlanner = () => {
  const { t, language } = useLanguage();
  const [preferences, setPreferences] = useState<TripPreferences>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    interests: ['temple', 'heritage'],
    budget: 'medium',
    crowdPreference: 'normal',
    travelStyle: 'relaxed',
  });
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);

  const toggleInterest = (type: PlaceType) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(type)
        ? prev.interests.filter(i => i !== type)
        : [...prev.interests, type]
    }));
  };

  const handleGenerate = () => {
    const result = generateItinerary(preferences);
    setItinerary(result);
  };

  return (
    <Layout>
      <section className="py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('planner.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('planner.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preferences Form */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Your Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dates */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('planner.dates')}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      value={preferences.startDate.toISOString().split('T')[0]}
                      onChange={(e) => setPreferences(p => ({ ...p, startDate: new Date(e.target.value) }))}
                    />
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      value={preferences.endDate.toISOString().split('T')[0]}
                      onChange={(e) => setPreferences(p => ({ ...p, endDate: new Date(e.target.value) }))}
                    />
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('planner.interests')}</label>
                  <div className="flex flex-wrap gap-2">
                    {placeTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant={preferences.interests.includes(type.value) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleInterest(type.value)}
                      >
                        {type.icon} {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('planner.budget')}</label>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as const).map((b) => (
                      <Button
                        key={b}
                        variant={preferences.budget === b ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setPreferences(p => ({ ...p, budget: b }))}
                      >
                        {t(`budget.${b}`)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Crowd */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('planner.crowd')}</label>
                  <div className="flex gap-2">
                    <Button
                      variant={preferences.crowdPreference === 'avoid' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setPreferences(p => ({ ...p, crowdPreference: 'avoid' }))}
                    >
                      {t('planner.avoidCrowd')}
                    </Button>
                    <Button
                      variant={preferences.crowdPreference === 'normal' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setPreferences(p => ({ ...p, crowdPreference: 'normal' }))}
                    >
                      {t('planner.normalCrowd')}
                    </Button>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full gap-2" onClick={handleGenerate}>
                  <Sparkles className="h-5 w-5" />
                  {t('planner.generate')}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Itinerary */}
            <div>
              {itinerary ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <Card variant="gold">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-display text-xl font-bold">Your AI Itinerary</h3>
                        <Badge variant="rating">₹{itinerary.totalBudget.toLocaleString()}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{itinerary.totalDays} days • {itinerary.items.length} destinations</p>
                      {itinerary.crowdAdvisory && (
                        <p className="text-sm text-amber-600 mt-2">⚠️ {itinerary.crowdAdvisory}</p>
                      )}
                    </CardContent>
                  </Card>

                  {itinerary.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={item.destination.image} alt={item.destination.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-display font-semibold">
                                  {language === 'ta' ? item.destination.nameTamil : item.destination.name}
                                </h4>
                                <Badge variant={item.estimatedCrowd === 'LOW' ? 'crowdLow' : item.estimatedCrowd === 'MEDIUM' ? 'crowdMedium' : 'crowdHigh'}>
                                  <Users className="h-3 w-3 mr-1" />
                                  {item.estimatedCrowd}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Day {item.day}</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.timeSlot}</span>
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.destination.district}</span>
                              </div>
                              {item.tips[0] && (
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                  <Lightbulb className="h-3 w-3 text-secondary" /> {item.tips[0]}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <Card variant="glass" className="h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center p-8">
                    <Sparkles className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="font-display text-xl font-semibold text-muted-foreground mb-2">
                      Your Itinerary Awaits
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select your preferences and generate a personalized trip plan
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TripPlanner;
