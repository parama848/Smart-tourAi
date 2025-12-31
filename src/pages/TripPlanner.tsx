import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { placeTypes, PlaceType } from '@/data/destinations';
import {
  generateItinerary,
  TripPreferences,
  GeneratedItinerary,
} from '@/services/aiRecommendation';
import {
  Calendar,
  Sparkles,
  Clock,
  MapPin,
  Lightbulb,
  Trash2,
  Plus,
} from 'lucide-react';
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
  const [editableItems, setEditableItems] = useState<any[]>([]);
  const [removedItems, setRemovedItems] = useState<any[]>([]);

  /* -----------------------------
     TOGGLE INTEREST
  ------------------------------ */
  const toggleInterest = (type: PlaceType) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(type)
        ? prev.interests.filter(i => i !== type)
        : [...prev.interests, type],
    }));
  };

  /* -----------------------------
     GENERATE ITINERARY
  ------------------------------ */
  const handleGenerate = () => {
    const result = generateItinerary(preferences);
    setItinerary(result);
    setEditableItems(result.items);
    setRemovedItems([]);
  };

  /* -----------------------------
     REMOVE PLACE (LOW ONLY)
  ------------------------------ */
  const removePlace = (index: number) => {
    const item = editableItems[index];

    // 🚫 Block MEDIUM & HIGH
    if (item.estimatedCrowd !== 'LOW') {
      alert('Medium & High priority places cannot be removed');
      return;
    }

    setRemovedItems(prev => [...prev, item]);
    setEditableItems(prev => prev.filter((_, i) => i !== index));
  };

  /* -----------------------------
     ADD PLACE BACK
  ------------------------------ */
  const addPlaceBack = (index: number) => {
    setEditableItems(prev => [...prev, removedItems[index]]);
    setRemovedItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <section className="py-12 min-h-screen">
        <div className="container mx-auto px-4">

          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {t('planner.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('planner.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* =======================
               PREFERENCES
            ======================== */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Your Preferences
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* DATES */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('planner.dates')}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      value={preferences.startDate.toISOString().split('T')[0]}
                      onChange={e =>
                        setPreferences(p => ({
                          ...p,
                          startDate: new Date(e.target.value),
                        }))
                      }
                    />
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      value={preferences.endDate.toISOString().split('T')[0]}
                      onChange={e =>
                        setPreferences(p => ({
                          ...p,
                          endDate: new Date(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>

                {/* INTERESTS */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('planner.interests')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {placeTypes.map(type => (
                      <Button
                        key={type.value}
                        size="sm"
                        variant={
                          preferences.interests.includes(type.value)
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() => toggleInterest(type.value)}
                      >
                        {type.icon} {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* BUDGET */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('planner.budget')}
                  </label>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as const).map(b => (
                      <Button
                        key={b}
                        className="flex-1"
                        variant={
                          preferences.budget === b ? 'default' : 'outline'
                        }
                        onClick={() =>
                          setPreferences(p => ({ ...p, budget: b }))
                        }
                      >
                        {t(`budget.${b}`)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* GENERATE */}
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleGenerate}
                >
                  <Sparkles className="h-5 w-5" />
                  {t('planner.generate')}
                </Button>
              </CardContent>
            </Card>

            {/* =======================
               ITINERARY
            ======================== */}
            <div>
              {itinerary ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {/* SUMMARY */}
                  <Card variant="gold">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-display text-xl font-bold">
                          Your AI Itinerary
                        </h3>
                        <Badge variant="rating">
                          ₹{itinerary.totalBudget.toLocaleString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {itinerary.totalDays} days • {editableItems.length} places
                      </p>
                    </CardContent>
                  </Card>

                  {/* DESTINATION CARDS */}
                  {editableItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.destination.image}
                              alt={item.destination.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold">
                                  {language === 'ta'
                                    ? item.destination.nameTamil
                                    : item.destination.name}
                                </h4>

                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={
                                      item.estimatedCrowd === 'LOW'
                                        ? 'crowdLow'
                                        : item.estimatedCrowd === 'MEDIUM'
                                        ? 'crowdMedium'
                                        : 'crowdHigh'
                                    }
                                  >
                                    {item.estimatedCrowd}
                                  </Badge>

                                  <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => removePlace(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" /> Day {item.day}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {item.timeSlot}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />{' '}
                                  {item.destination.district}
                                </span>
                              </div>

                              {item.tips?.[0] && (
                                <p className="text-xs mt-2 flex items-center gap-1">
                                  <Lightbulb className="h-3 w-3 text-secondary" />
                                  {item.tips[0]}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* REMOVED PLACES */}
                  {removedItems.length > 0 && (
                    <Card variant="glass">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Removed Places</h4>

                        {removedItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm mb-2"
                          >
                            <span>
                              {language === 'ta'
                                ? item.destination.nameTamil
                                : item.destination.name}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addPlaceBack(index)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Back
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ) : (
                <Card
                  variant="glass"
                  className="h-full min-h-[400px] flex items-center justify-center"
                >
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="font-semibold text-muted-foreground">
                      Your itinerary will appear here
                    </h3>
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
