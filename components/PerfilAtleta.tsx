import { useState } from 'react';
import { ArrowLeft, Save, Edit, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { atletas, evaluacionesAntropometricas, testsFisicos } from '../data/atletas';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerfilAtletaProps {
  atletaId: string | null;
  onBack: () => void;
}

export function PerfilAtleta({ atletaId, onBack }: PerfilAtletaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('datos');

  const atleta = atletas.find((a) => a.id === atletaId);
  const evaluaciones = evaluacionesAntropometricas.filter((e) => e.atletaId === atletaId);
  const tests = testsFisicos.filter((t) => t.atletaId === atletaId);
  const ultimaEvaluacion = evaluaciones[0];
  const ultimoTest = tests[0];

  const [formData, setFormData] = useState({
    peso: ultimaEvaluacion?.peso || 0,
    talla: ultimaEvaluacion?.talla || 0,
    envergadura: ultimaEvaluacion?.envergadura || 0,
    cintura: ultimaEvaluacion?.cintura || 0,
    grasa: ultimaEvaluacion?.grasa || 0,
    musculo: ultimaEvaluacion?.musculo || 0,
  });

  if (!atleta) {
    return (
      <div className="p-8">
        <p>Atleta no encontrado</p>
      </div>
    );
  }

  const calculateIMC = (peso: number, talla: number) => {
    if (talla === 0) return 0;
    return (peso / Math.pow(talla / 100, 2)).toFixed(1);
  };

  const imc = calculateIMC(formData.peso, formData.talla);

  // Chart data for IMC evolution
  const chartData = evaluaciones
    .slice()
    .reverse()
    .map((e) => ({
      fecha: new Date(e.fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      imc: e.imc,
    }));

  const handleSave = () => {
    // Mock save
    alert('Evaluación guardada correctamente');
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Participantes
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">
              Perfil de {atleta.nombre}
            </h1>
            <p className="text-gray-600">{atleta.tipo} • {atleta.edad} años</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gray-600 hover:bg-gray-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
            <Button className="bg-[#c62828] hover:bg-[#a61b1b]">
              <FileText className="w-4 h-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="datos">Datos Personales</TabsTrigger>
          <TabsTrigger value="antropometria">Evaluación Física</TabsTrigger>
          <TabsTrigger value="tests">Tests Físicos</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="datos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Nombre completo</Label>
                    <p className="mt-1">{atleta.nombre}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">DNI</Label>
                    <p className="mt-1">{atleta.dni}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Fecha de nacimiento</Label>
                    <p className="mt-1">{new Date(atleta.fechaNacimiento).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Género</Label>
                    <p className="mt-1">{atleta.genero}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Grupo sanguíneo</Label>
                    <p className="mt-1">{atleta.grupoSanguineo}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Teléfono</Label>
                    <p className="mt-1">{atleta.telefono}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-600">Correo electrónico</Label>
                  <p className="mt-1">{atleta.correo}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Dirección</Label>
                  <p className="mt-1">{atleta.direccion}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Contacto de emergencia</Label>
                  <p className="mt-1">{atleta.contactoEmergencia}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Teléfono de emergencia</Label>
                  <p className="mt-1">{atleta.telefonoEmergencia}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="antropometria" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mediciones Antropométricas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="peso">Peso (kg)</Label>
                      <Input
                        id="peso"
                        type="number"
                        value={formData.peso}
                        onChange={(e) =>
                          setFormData({ ...formData, peso: parseFloat(e.target.value) })
                        }
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="talla">Talla (cm)</Label>
                      <Input
                        id="talla"
                        type="number"
                        value={formData.talla}
                        onChange={(e) =>
                          setFormData({ ...formData, talla: parseFloat(e.target.value) })
                        }
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="envergadura">Envergadura (cm)</Label>
                      <Input
                        id="envergadura"
                        type="number"
                        value={formData.envergadura}
                        onChange={(e) =>
                          setFormData({ ...formData, envergadura: parseFloat(e.target.value) })
                        }
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cintura">Cintura (cm)</Label>
                      <Input
                        id="cintura"
                        type="number"
                        value={formData.cintura}
                        onChange={(e) =>
                          setFormData({ ...formData, cintura: parseFloat(e.target.value) })
                        }
                        disabled={!isEditing}
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
                        onChange={(e) =>
                          setFormData({ ...formData, grasa: parseFloat(e.target.value) })
                        }
                        disabled={!isEditing}
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
                        onChange={(e) =>
                          setFormData({ ...formData, musculo: parseFloat(e.target.value) })
                        }
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-2">
                      <Button onClick={handleSave} className="bg-[#c62828] hover:bg-[#a61b1b]">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Evaluación
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>IMC</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl mb-2">{imc}</div>
                    <p className="text-sm text-gray-600 mb-4">Índice de Masa Corporal</p>
                    <div className="text-left text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Bajo peso: &lt; 18.5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Normal: 18.5 - 24.9</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-600">Sobrepeso: 25 - 29.9</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Obesidad: ≥ 30</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tests de Rendimiento Físico</CardTitle>
            </CardHeader>
            <CardContent>
              {ultimoTest ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Burpees</p>
                    <p className="text-3xl">{ultimoTest.burpees}</p>
                    <p className="text-xs text-gray-500 mt-1">repeticiones</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Sentadillas</p>
                    <p className="text-3xl">{ultimoTest.sentadillas}</p>
                    <p className="text-xs text-gray-500 mt-1">repeticiones</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Salto Vertical</p>
                    <p className="text-3xl">{ultimoTest.saltoVertical}</p>
                    <p className="text-xs text-gray-500 mt-1">cm</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Plancha</p>
                    <p className="text-3xl">{ultimoTest.plancha}</p>
                    <p className="text-xs text-gray-500 mt-1">segundos</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Flexibilidad</p>
                    <p className="text-3xl">{ultimoTest.flexibilidad}</p>
                    <p className="text-xs text-gray-500 mt-1">cm</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Velocidad</p>
                    <p className="text-3xl">{ultimoTest.velocidad}</p>
                    <p className="text-xs text-gray-500 mt-1">segundos</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No hay tests físicos registrados
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolución de IMC</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis domain={[20, 26]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="imc"
                      stroke="#c62828"
                      strokeWidth={2}
                      dot={{ fill: '#c62828', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No hay datos suficientes para mostrar el gráfico
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}