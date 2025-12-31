import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Calendar, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();

  const visitorData = [
    { month: 'Jan', visitors: 45000 },
    { month: 'Feb', visitors: 52000 },
    { month: 'Mar', visitors: 48000 },
    { month: 'Apr', visitors: 61000 },
    { month: 'May', visitors: 55000 },
    { month: 'Jun', visitors: 42000 },
  ];

  const destinationData = [
    { name: 'Meenakshi Temple', value: 35, color: '#0d7377' },
    { name: 'Brihadeeswarar', value: 25, color: '#d4a029' },
    { name: 'Mahabalipuram', value: 20, color: '#14b8a6' },
    { name: 'Ooty', value: 12, color: '#f59e0b' },
    { name: 'Others', value: 8, color: '#94a3b8' },
  ];

  const bookingTrend = [
    { day: 'Mon', bookings: 120 },
    { day: 'Tue', bookings: 150 },
    { day: 'Wed', bookings: 180 },
    { day: 'Thu', bookings: 140 },
    { day: 'Fri', bookings: 220 },
    { day: 'Sat', bookings: 380 },
    { day: 'Sun', bookings: 420 },
  ];

  const stats = [
    { icon: Users, label: t('dashboard.visitors'), value: '2.4M', change: '+12%' },
    { icon: Calendar, label: t('dashboard.bookings'), value: '1,234', change: '+8%' },
    { icon: TrendingUp, label: t('dashboard.revenue'), value: '₹45L', change: '+15%' },
    { icon: MapPin, label: 'Active Sites', value: '48', change: '+2' },
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-muted-foreground">Government of Tamil Nadu Tourism Department</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-8 w-8 text-secondary" />
                    <span className="text-sm text-emerald-600 font-medium">{stat.change}</span>
                  </div>
                  <div className="font-display text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Visitor Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="hsl(175, 45%, 28%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Popular Destinations */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.popular')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={destinationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {destinationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {destinationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Bookings */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Booking Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="hsl(38, 75%, 55%)" strokeWidth={3} dot={{ fill: 'hsl(38, 75%, 55%)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
