import { Users, TrendingUp, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DashboardProps {
  user: any;
}

export function Dashboard({ user }: DashboardProps) {
  const stats = [
    {
      title: 'Participantes Activos',
      value: '4',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Asistencia Promedio',
      value: '90%',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Próxima Evaluación',
      value: '12 Nov',
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      title: 'Sesiones esta Semana',
      value: '8',
      icon: Activity,
      color: 'bg-purple-500',
    },
  ];

  const quickAccess = [
    {
      title: 'Gestión de Participantes',
      description: 'Ver y gestionar atletas registrados',
      icon: Users,
      action: 'Ver Participantes',
    },
    {
      title: 'Control de Asistencia',
      description: 'Registrar asistencia de hoy',
      icon: Activity,
      action: 'Tomar Asistencia',
    },
    {
      title: 'Evaluaciones Físicas',
      description: 'Registrar nuevas evaluaciones',
      icon: TrendingUp,
      action: 'Nueva Evaluación',
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl text-gray-900 mb-2">
          Hola, {user?.nombre} 👋
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Bienvenido al panel de gestión deportiva
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col items-start gap-3">
                  <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.title}</p>
                    <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Access */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {quickAccess.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#c62828] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base md:text-lg mb-1">{item.title}</CardTitle>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                  <button className="text-[#c62828] hover:underline text-xs sm:text-sm">
                    {item.action} →
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4">Actividad Reciente</h2>
        <Card>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="space-y-3 sm:space-y-4">
              {[
                { atleta: 'Santiago Abrigo', accion: 'Evaluación antropométrica registrada', tiempo: 'Hace 2 horas' },
                { atleta: 'Joseph Balcázar', accion: 'Asistencia confirmada', tiempo: 'Hace 5 horas' },
                { atleta: 'Elías Poma', accion: 'Nueva planificación asignada', tiempo: 'Hace 1 día' },
                { atleta: 'Andersson Ambuludí', accion: 'Test físico completado', tiempo: 'Hace 2 días' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 sm:pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base text-gray-900 truncate">{activity.atleta}</p>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{activity.accion}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{activity.tiempo}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
