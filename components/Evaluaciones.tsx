import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { atletas, evaluacionesAntropometricas } from '../data/atletas';
import { toast } from 'sonner@2.0.3';

interface EvaluacionesProps {
  onViewAtleta: (atletaId: string) => void;
}

export function Evaluaciones({ onViewAtleta }: EvaluacionesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAtleta, setSelectedAtleta] = useState('');
  const [formData, setFormData] = useState({
    peso: '',
    talla: '',
    envergadura: '',
    cintura: '',
    grasa: '',
    musculo: '',
  });

  const calculateIMC = (peso: number, talla: number) => {
    if (talla === 0) return 0;
    return (peso / Math.pow(talla / 100, 2)).toFixed(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Evaluación registrada correctamente');
    setIsDialogOpen(false);
    setFormData({
      peso: '',
      talla: '',
      envergadura: '',
      cintura: '',
      grasa: '',
      musculo: '',
    });
  };

  const getUltimaEvaluacion = (atletaId: string) => {
    const evaluaciones = evaluacionesAntropometricas.filter((e) => e.atletaId === atletaId);
    return evaluaciones[0];
  };

  const getTendencia = (atletaId: string) => {
    const evaluaciones = evaluacionesAntropometricas.filter((e) => e.atletaId === atletaId);
    if (evaluaciones.length < 2) return 'neutral';
    
    const ultima = evaluaciones[0];
    const anterior = evaluaciones[1];
    
    if (ultima.imc < anterior.imc) return 'down';
    if (ultima.imc > anterior.imc) return 'up';
    return 'neutral';
  };

  const imc = formData.peso && formData.talla 
    ? calculateIMC(parseFloat(formData.peso), parseFloat(formData.talla))
    : '0.0';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Gestión de Evaluaciones</h1>
          <p className="text-gray-600">
            Registra y visualiza evaluaciones antropométricas
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#c62828] hover:bg-[#a61b1b]">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Evaluación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Evaluación</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="atleta">Seleccionar Atleta</Label>
                <select
                  id="atleta"
                  value={selectedAtleta}
                  onChange={(e) => setSelectedAtleta(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selecciona un atleta</option>
                  {atletas.map((atleta) => (
                    <option key={atleta.id} value={atleta.id}>
                      {atleta.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    step="0.1"
                    value={formData.peso}
                    onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="talla">Talla (cm)</Label>
                  <Input
                    id="talla"
                    type="number"
                    step="0.1"
                    value={formData.talla}
                    onChange={(e) => setFormData({ ...formData, talla: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="envergadura">Envergadura (cm)</Label>
                  <Input
                    id="envergadura"
                    type="number"
                    step="0.1"
                    value={formData.envergadura}
                    onChange={(e) => setFormData({ ...formData, envergadura: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cintura">Cintura (cm)</Label>
                  <Input
                    id="cintura"
                    type="number"
                    step="0.1"
                    value={formData.cintura}
                    onChange={(e) => setFormData({ ...formData, cintura: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="grasa">% Grasa corporal</Label>
                  <Input
                    id="grasa"
                    type="number"
                    step="0.1"
                    value={formData.grasa}
                    onChange={(e) => setFormData({ ...formData, grasa: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="musculo">% Masa muscular</Label>
                  <Input
                    id="musculo"
                    type="number"
                    step="0.1"
                    value={formData.musculo}
                    onChange={(e) => setFormData({ ...formData, musculo: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">IMC Calculado</p>
                <p className="text-3xl">{imc}</p>
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
                  Registrar Evaluación
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Evaluaciones</p>
            <p className="text-3xl text-gray-900">
              {evaluacionesAntropometricas.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Este Mes</p>
            <p className="text-3xl text-green-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">IMC Promedio</p>
            <p className="text-3xl text-blue-600">23.4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 mb-1">Próxima Evaluación</p>
            <p className="text-xl text-gray-900">12 Nov</p>
          </CardContent>
        </Card>
      </div>

      {/* Athlete Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {atletas.map((atleta) => {
          const ultimaEval = getUltimaEvaluacion(atleta.id);
          const tendencia = getTendencia(atleta.id);
          
          return (
            <Card
              key={atleta.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewAtleta(atleta.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{atleta.nombre}</span>
                  {tendencia === 'up' && <TrendingUp className="w-5 h-5 text-orange-500" />}
                  {tendencia === 'down' && <TrendingDown className="w-5 h-5 text-green-500" />}
                  {tendencia === 'neutral' && <Minus className="w-5 h-5 text-gray-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ultimaEval ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">IMC</p>
                        <p className="text-2xl">{ultimaEval.imc}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Peso</p>
                        <p className="text-2xl">{ultimaEval.peso} kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Talla</p>
                        <p className="text-2xl">{ultimaEval.talla} cm</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">Última evaluación</p>
                      <p className="text-gray-900">
                        {new Date(ultimaEval.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full text-[#c62828] border-[#c62828] hover:bg-[#c62828] hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewAtleta(atleta.id);
                      }}
                    >
                      Ver Perfil Completo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No hay evaluaciones registradas</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAtleta(atleta.id);
                        setIsDialogOpen(true);
                      }}
                    >
                      Registrar Primera Evaluación
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
