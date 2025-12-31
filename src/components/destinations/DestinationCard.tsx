import { Destination } from '@/data/destinations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { calculateCrowdLevel } from '@/services/aiRecommendation';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const { language, t } = useLanguage();
  const currentCrowd = calculateCrowdLevel(destination, new Date(), 'morning');

  const getCrowdBadgeVariant = (crowd: string) => {
    switch (crowd) {
      case 'LOW': return 'crowdLow';
      case 'MEDIUM': return 'crowdMedium';
      case 'HIGH': return 'crowdHigh';
      default: return 'secondary';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'temple': return 'temple';
      case 'heritage': return 'heritage';
      case 'nature': return 'nature';
      case 'beach': return 'beach';
      case 'hill_station': return 'hillStation';
      case 'food': return 'food';
      default: return 'secondary';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'temple': return '🛕 Temple';
      case 'heritage': return '🏛️ Heritage';
      case 'nature': return '🌿 Nature';
      case 'beach': return '🏖️ Beach';
      case 'hill_station': return '⛰️ Hill Station';
      case 'food': return '🍛 Food';
      default: return type;
    }
  };

  return (
    <Card variant="destination" className="h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.image}
          alt={language === 'ta' ? destination.nameTamil : destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={getTypeBadgeVariant(destination.type)}>
            {getTypeLabel(destination.type)}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3">
          <Badge variant={getCrowdBadgeVariant(currentCrowd)}>
            <Users className="h-3 w-3 mr-1" />
            {currentCrowd === 'LOW' ? t('crowd.low') : currentCrowd === 'MEDIUM' ? t('crowd.medium') : t('crowd.high')}
          </Badge>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3">
          <Badge variant="rating" className="gap-1">
            <Star className="h-3 w-3 fill-current" />
            {destination.rating}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {language === 'ta' ? destination.nameTamil : destination.name}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span>{destination.district}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {language === 'ta' ? destination.descriptionTamil : destination.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{destination.visitDuration}h visit</span>
          </div>
          
          <Link to={`/booking?destination=${destination.id}`}>
            <Button size="sm" variant="teal">
              {t('general.bookNow')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
