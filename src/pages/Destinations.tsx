import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { destinations, placeTypes, PlaceType } from '@/data/destinations';
import DestinationCard from '@/components/destinations/DestinationCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const Destinations = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<PlaceType | 'all'>('all');

  const filteredDestinations = selectedType === 'all' 
    ? destinations 
    : destinations.filter(d => d.type === selectedType);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('nav.destinations')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the diverse beauty of Tamil Nadu - from ancient temples to pristine beaches
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={selectedType === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedType('all')}
            >
              All
            </Button>
            {placeTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? 'default' : 'outline'}
                onClick={() => setSelectedType(type.value)}
                className="gap-2"
              >
                <span>{type.icon}</span>
                {type.label}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;
