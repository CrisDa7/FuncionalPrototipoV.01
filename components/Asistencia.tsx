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
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl text-gray-900 mb-2">
          Gestión de Asistencia
        </h1>
        <p className="text-gray-600">
          Registra la asistencia del grupo Fuerza Funcional
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Fecha</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
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
            <CardHeader>
              <CardTitle>Lista de Participantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atletas.map((atleta) => {
                  const presente = asistencias[atleta.id] || false;
                  
                  return (
                    <div
                      key={atleta.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">{atleta.nombre}</p>
                          <p className="text-sm text-gray-600">{atleta.tipo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {presente ? (
                          <span className="text-sm text-green-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Presente
                          </span>
                        ) : (
                          <span className="text-sm text-red-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            Ausente
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

              <div className="mt-6 pt-6 border-t">
                <Button
                  onClick={handleGuardarAsistencia}
                  className="w-full bg-[#c62828] hover:bg-[#a61b1b]"
                >
                  Guardar Asistencia
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Día</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Presentes</p>
                <p className="text-4xl text-green-600">{presentes}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-700 mb-1">Ausentes</p>
                <p className="text-4xl text-red-600">{ausentes}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 mb-1">Porcentaje</p>
                <p className="text-4xl text-blue-600">{porcentaje}%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas del Mes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Promedio de asistencia</span>
                <span className="text-gray-900">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total de sesiones</span>
                <span className="text-gray-900">16</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Participantes activos</span>
                <span className="text-gray-900">4</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asistencia Individual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {atletas.map((atleta) => (
                <div key={atleta.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{atleta.nombre.split(' ')[0]}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#c62828] h-2 rounded-full"
                        style={{ width: `${85 + Math.random() * 15}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
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
