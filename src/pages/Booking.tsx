import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { destinations } from '@/data/destinations';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Clock, MapPin, CheckCircle, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

const Booking = () => {
  const { t, language } = useLanguage();
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const timeSlots = [
    { id: 'morning', label: t('booking.morning'), time: '6:00 AM - 12:00 PM' },
    { id: 'afternoon', label: t('booking.afternoon'), time: '12:00 PM - 4:00 PM' },
    { id: 'evening', label: t('booking.evening'), time: '4:00 PM - 8:00 PM' },
  ];

  const handleBooking = () => {
    const id = `TN-${Date.now().toString(36).toUpperCase()}`;
    setBookingId(id);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <Layout>
        <section className="py-12 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">{t('booking.success')}</h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ta' ? selectedDestination.nameTamil : selectedDestination.name}
            </p>

            <Card variant="gold" className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">{t('booking.qr')}</h3>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCodeSVG
                    value={JSON.stringify({
                      id: bookingId,
                      destination: selectedDestination.id,
                      date: selectedDate,
                      slot: selectedSlot,
                    })}
                    size={180}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4">Booking ID: {bookingId}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" /> {selectedDate}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" /> {timeSlots.find(s => s.id === selectedSlot)?.time}
              </div>
            </div>

            <Button variant="outline" onClick={() => setIsBooked(false)}>
              Book Another
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('booking.title')}
            </h1>
            <p className="text-muted-foreground">Book your entry slot and skip the queues</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-secondary" />
                  Book Entry Pass
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Destination</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border bg-background"
                    value={selectedDestination.id}
                    onChange={(e) => setSelectedDestination(destinations.find(d => d.id === e.target.value)!)}
                  >
                    {destinations.map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {language === 'ta' ? dest.nameTamil : dest.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border bg-background"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('booking.selectSlot')}</label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id as any)}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          selectedSlot === slot.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium">{slot.label}</div>
                        <div className="text-sm text-muted-foreground">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={handleBooking}>
                  {t('booking.confirm')}
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <div className="h-48 overflow-hidden rounded-t-xl">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">
                  {language === 'ta' ? selectedDestination.nameTamil : selectedDestination.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedDestination.district}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'ta' ? selectedDestination.descriptionTamil : selectedDestination.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-muted-foreground">Entry Fee</span>
                  <span className="font-bold text-lg">
                    {selectedDestination.entryFee === 0 ? 'Free' : `₹${selectedDestination.entryFee}`}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
