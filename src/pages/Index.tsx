import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { destinations, placeTypes } from '@/data/destinations';
import DestinationCard from '@/components/destinations/DestinationCard';
import Layout from '@/components/layout/Layout';
import heroImage from '@/assets/hero-temple.jpg';
import { MapPin, Calendar, Users, Sparkles, ArrowRight } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const featuredDestinations = destinations.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Tamil Nadu Temple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          <div className="absolute inset-0 pattern-kolam" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              {t('hero.subtitle')}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/planner">
                <Button variant="hero" size="xl" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link to="/destinations">
                <Button variant="heroOutline" size="xl" className="gap-2">
                  {t('hero.explore')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: MapPin, value: '50+', label: 'Destinations' },
              { icon: Users, value: '10M+', label: 'Visitors Yearly' },
              { icon: Calendar, value: '24/7', label: 'AI Assistance' },
              { icon: Sparkles, value: '100%', label: 'Smart Planning' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="text-center p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-secondary" />
                  <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Explore by Interest
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover Tamil Nadu's rich heritage through temples, beaches, hill stations, and more
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {placeTypes.map((type, index) => (
              <motion.div
                key={type.value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/destinations?type=${type.value}`}>
                  <Card variant="elevated" className="p-6 text-center cursor-pointer hover:border-secondary transition-colors">
                    <span className="text-4xl mb-3 block">{type.icon}</span>
                    <h3 className="font-semibold text-foreground">{type.label}</h3>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-2">
                Popular Destinations
              </h2>
              <p className="text-muted-foreground">Top-rated places loved by travelers</p>
            </div>
            <Link to="/destinations">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Plan Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let our AI create a personalized itinerary based on your interests, budget, and preferences.
          </p>
          <Link to="/planner">
            <Button variant="hero" size="xl" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
