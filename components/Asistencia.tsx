import { useState } from 'react';
import { Calendar as CalendarIcon, Users, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { atletas } from '../data/atletas';
import { toast } from 'sonner';

export function Asistencia() {
  const [date, setDate] = useState<Date>(new Date());
  const [asistencias, setAsistencias] = useState<Record<string, boolean>>({
    '1': true,
    '2': false,
    '3': true,
    '4': false,
  });

  const presentes = Object.values(asistencias).filter(Boolean).length;
  const ausentes = atletas.length - presentes;
  const porcentaje = Math.round((presentes / atletas.length) * 100);

  const handleToggleAsistencia = (atletaId: string) => {
    setAsistencias((prev) => ({
      ...prev,
      [atletaId]: !prev[atletaId],
    }));
  };

  const handleGuardarAsistencia = () => {
    toast.success('Asistencia guardada correctamente');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl text-gray-900 mb-2">
          Gestión de Asistencia
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Registra la asistencia del grupo Fuerza Funcional
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Date Selector */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Seleccionar Fecha</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-10 sm:h-auto text-xs sm:text-sm">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span className="truncate">{date.toLocaleDateString('es-ES', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Attendance List */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Lista de Participantes</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                {atletas.map((atleta) => {
                  const presente = asistencias[atleta.id] || false;
                  
                  return (
                    <div
                      key={atleta.id}
                      className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-gray-900 truncate">{atleta.nombre}</p>
                          <p className="text-xs text-gray-600">{atleta.tipo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {presente ? (
                          <span className="text-xs text-green-600 flex items-center gap-1 whitespace-nowrap">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Presente</span>
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 flex items-center gap-1 whitespace-nowrap">
                            <XCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Ausente</span>
                          </span>
                        )}
                        <Checkbox
                          checked={presente}
                          onCheckedChange={() => handleToggleAsistencia(atleta.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                <Button
                  onClick={handleGuardarAsistencia}
                  className="w-full bg-[#c62828] hover:bg-[#a61b1b] h-10 sm:h-auto text-sm"
                >
                  Guardar Asistencia
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Resumen del Día</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0 space-y-3">
              <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                <p className="text-xs sm:text-sm text-green-700 mb-1">Presentes</p>
                <p className="text-2xl sm:text-4xl text-green-600 font-bold">{presentes}</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
                <p className="text-xs sm:text-sm text-red-700 mb-1">Ausentes</p>
                <p className="text-2xl sm:text-4xl text-red-600 font-bold">{ausentes}</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-700 mb-1">Porcentaje</p>
                <p className="text-2xl sm:text-4xl text-blue-600 font-bold">{porcentaje}%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Estadísticas del Mes</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0 space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Promedio</span>
                <span className="text-sm sm:text-base text-gray-900 font-semibold">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Sesiones</span>
                <span className="text-sm sm:text-base text-gray-900 font-semibold">16</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Activos</span>
                <span className="text-sm sm:text-base text-gray-900 font-semibold">4</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Asistencia Individual</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0 space-y-2 sm:space-y-3">
              {atletas.map((atleta) => (
                <div key={atleta.id} className="flex justify-between items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-700 truncate">{atleta.nombre.split(' ')[0]}</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2 flex-shrink-0">
                      <div
                        className="bg-[#c62828] h-2 rounded-full"
                        style={{ width: `${85 + Math.random() * 15}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-10 text-right flex-shrink-0">
                      {Math.round(85 + Math.random() * 15)}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
