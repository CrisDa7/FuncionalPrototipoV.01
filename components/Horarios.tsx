import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Clock, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface Horario {
  id: string;
  programa: string;
  dias: string[];
  horaInicio: string;
  horaFin: string;
  cupos: number;
  cuposOcupados: number;
  instructor: string;
  ubicacion: string;
}

export function Horarios() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [horarios, setHorarios] = useState<Horario[]>([
    {
      id: '1',
      programa: 'Fuerza Funcional',
      dias: ['Lunes', 'Miércoles', 'Viernes'],
      horaInicio: '15:00',
      horaFin: '17:00',
      cupos: 15,
      cuposOcupados: 4,
      instructor: 'Cristian Ajila',
      ubicacion: 'Gimnasio Principal',
    },
    {
      id: '2',
      programa: 'Cardio Intensivo',
      dias: ['Martes', 'Jueves'],
      horaInicio: '06:00',
      horaFin: '07:30',
      cupos: 20,
      cuposOcupados: 12,
      instructor: 'María González',
      ubicacion: 'Pista Atlética',
    },
    {
      id: '3',
      programa: 'Yoga y Flexibilidad',
      dias: ['Lunes', 'Viernes'],
      horaInicio: '18:00',
      horaFin: '19:00',
      cupos: 12,
      cuposOcupados: 8,
      instructor: 'Ana Pérez',
      ubicacion: 'Sala Multiusos',
    },
    {
      id: '4',
      programa: 'Entrenamiento de Potencia',
      dias: ['Martes', 'Jueves', 'Sábado'],
      horaInicio: '16:00',
      horaFin: '18:00',
      cupos: 10,
      cuposOcupados: 10,
      instructor: 'Cristian Ajila',
      ubicacion: 'Gimnasio Principal',
    },
  ]);

  const [formData, setFormData] = useState({
    programa: '',
    dias: [] as string[],
    horaInicio: '',
    horaFin: '',
    cupos: '',
    instructor: '',
    ubicacion: '',
  });

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const handleToggleDia = (dia: string) => {
    setFormData((prev) => ({
      ...prev,
      dias: prev.dias.includes(dia)
        ? prev.dias.filter((d) => d !== dia)
        : [...prev.dias, dia],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Horario creado correctamente');
    setIsDialogOpen(false);
    setFormData({
      programa: '',
      dias: [],
      horaInicio: '',
      horaFin: '',
      cupos: '',
      instructor: '',
      ubicacion: '',
    });
  };

  const handleDelete = (id: string) => {
    const horario = horarios.find((h) => h.id === id);
    if (horario && horario.cuposOcupados > 0) {
      toast.error(
        `No se puede eliminar. Hay ${horario.cuposOcupados} participantes activos.`
      );
    } else {
      setHorarios(horarios.filter((h) => h.id !== id));
      toast.success('Horario eliminado correctamente');
    }
  };

  const getCuposColor = (ocupados: number, total: number) => {
    const porcentaje = (ocupados / total) * 100;
    if (porcentaje >= 100) return 'text-red-600';
    if (porcentaje >= 80) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Gestión de Horarios</h1>
          <p className="text-gray-600">
            Administra los horarios de entrenamiento
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#c62828] hover:bg-[#a61b1b]">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Horario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Horario</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="programa">Nombre del Programa</Label>
                <Input
                  id="programa"
                  value={formData.programa}
                  onChange={(e) =>
                    setFormData({ ...formData, programa: e.target.value })
                  }
                  required
                  placeholder="Ej: Fuerza Funcional"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Días de la Semana</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {diasSemana.map((dia) => (
                    <button
                      key={dia}
                      type="button"
                      onClick={() => handleToggleDia(dia)}
                      className={`px-3 py-2 rounded border transition-colors ${
                        formData.dias.includes(dia)
                          ? 'bg-[#c62828] text-white border-[#c62828]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#c62828]'
                      }`}
                    >
                      {dia}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horaInicio">Hora de Inicio</Label>
                  <Input
                    id="horaInicio"
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) =>
                      setFormData({ ...formData, horaInicio: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="horaFin">Hora de Fin</Label>
                  <Input
                    id="horaFin"
                    type="time"
                    value={formData.horaFin}
                    onChange={(e) =>
                      setFormData({ ...formData, horaFin: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cupos">Cupos Disponibles</Label>
                <Input
                  id="cupos"
                  type="number"
                  value={formData.cupos}
                  onChange={(e) =>
                    setFormData({ ...formData, cupos: e.target.value })
                  }
                  required
                  min="1"
                  placeholder="Ej: 15"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  required
                  placeholder="Ej: Cristian Ajila"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input
                  id="ubicacion"
                  value={formData.ubicacion}
                  onChange={(e) =>
                    setFormData({ ...formData, ubicacion: e.target.value })
                  }
                  required
                  placeholder="Ej: Gimnasio Principal"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#c62828] hover:bg-[#a61b1b]">
                  Crear Horario
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Programas</p>
                <p className="text-2xl text-gray-900">{horarios.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cupos Totales</p>
                <p className="text-2xl text-gray-900">
                  {horarios.reduce((acc, h) => acc + h.cupos, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cupos Ocupados</p>
                <p className="text-2xl text-gray-900">
                  {horarios.reduce((acc, h) => acc + h.cuposOcupados, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasa de Ocupación</p>
                <p className="text-2xl text-gray-900">
                  {Math.round(
                    (horarios.reduce((acc, h) => acc + h.cuposOcupados, 0) /
                      horarios.reduce((acc, h) => acc + h.cupos, 0)) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Programa</TableHead>
              <TableHead>Días</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Cupos</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {horarios.map((horario) => (
              <TableRow key={horario.id}>
                <TableCell>{horario.programa}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {horario.dias.map((dia) => (
                      <Badge key={dia} variant="secondary" className="text-xs">
                        {dia.substring(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {horario.horaInicio} - {horario.horaFin}
                </TableCell>
                <TableCell>
                  <span
                    className={getCuposColor(
                      horario.cuposOcupados,
                      horario.cupos
                    )}
                  >
                    {horario.cuposOcupados} / {horario.cupos}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{horario.instructor}</TableCell>
                <TableCell className="text-sm">{horario.ubicacion}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(horario.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
