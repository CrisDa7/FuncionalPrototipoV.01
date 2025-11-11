import { useState } from 'react';
import { ChevronRight, Plus, Edit, Calendar, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

interface Microciclo {
  id: string;
  semana: number;
  dias: {
    dia: string;
    actividades: string[];
  }[];
}

interface Mesociclo {
  id: string;
  nombre: string;
  duracion: string;
  objetivo: string;
  microciclos: Microciclo[];
}

interface Macrociclo {
  id: string;
  nombre: string;
  periodo: string;
  mesociclos: Mesociclo[];
}

export function Planificaciones() {
  const [expandedMacro, setExpandedMacro] = useState<string | null>('1');
  const [expandedMeso, setExpandedMeso] = useState<string | null>('1');

  const macrociclos: Macrociclo[] = [
    {
      id: '1',
      nombre: 'Preparación General',
      periodo: 'Enero - Junio 2025',
      mesociclos: [
        {
          id: '1',
          nombre: 'Fuerza Resistencia',
          duracion: '4 semanas',
          objetivo: 'Desarrollar resistencia muscular y cardiovascular',
          microciclos: [
            {
              id: '1',
              semana: 1,
              dias: [
                {
                  dia: 'Lunes',
                  actividades: [
                    'Calentamiento: 15 min trote suave',
                    'Fuerza: 4x12 sentadillas',
                    'Fuerza: 4x10 press banca',
                    'Core: 3x30s plancha',
                  ],
                },
                {
                  dia: 'Miércoles',
                  actividades: [
                    'Calentamiento: Movilidad articular',
                    'Fuerza: 4x12 peso muerto',
                    'Fuerza: 4x10 dominadas asistidas',
                    'Cardio: 20 min intervalos',
                  ],
                },
                {
                  dia: 'Viernes',
                  actividades: [
                    'Calentamiento: 10 min bicicleta',
                    'Circuito: 3 rondas de 8 ejercicios',
                    'Flexibilidad: 15 min estiramientos',
                  ],
                },
              ],
            },
            {
              id: '2',
              semana: 2,
              dias: [
                {
                  dia: 'Lunes',
                  actividades: [
                    'Calentamiento: 15 min trote suave',
                    'Fuerza: 4x15 sentadillas',
                    'Fuerza: 4x12 press banca',
                    'Core: 3x45s plancha',
                  ],
                },
                {
                  dia: 'Miércoles',
                  actividades: [
                    'Calentamiento: Movilidad articular',
                    'Fuerza: 4x15 peso muerto',
                    'Fuerza: 4x12 dominadas asistidas',
                    'Cardio: 25 min intervalos',
                  ],
                },
                {
                  dia: 'Viernes',
                  actividades: [
                    'Calentamiento: 10 min bicicleta',
                    'Circuito: 4 rondas de 8 ejercicios',
                    'Flexibilidad: 15 min estiramientos',
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '2',
          nombre: 'Potencia',
          duracion: '4 semanas',
          objetivo: 'Desarrollar potencia explosiva y velocidad',
          microciclos: [
            {
              id: '3',
              semana: 1,
              dias: [
                {
                  dia: 'Lunes',
                  actividades: [
                    'Calentamiento: Saltos y sprints cortos',
                    'Potencia: 5x5 sentadillas con salto',
                    'Potencia: 5x5 press potencia',
                    'Pliométricos: 3x10 box jumps',
                  ],
                },
                {
                  dia: 'Miércoles',
                  actividades: [
                    'Velocidad: 10x30m sprints',
                    'Potencia: 5x5 clean & jerk',
                    'Agilidad: Escalera de coordinación',
                  ],
                },
                {
                  dia: 'Viernes',
                  actividades: [
                    'Pliométricos: Saltos reactivos',
                    'Potencia: Lanzamientos medicine ball',
                    'Recuperación: Estiramientos dinámicos',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '2',
      nombre: 'Periodo Competitivo',
      periodo: 'Julio - Diciembre 2025',
      mesociclos: [
        {
          id: '3',
          nombre: 'Mantenimiento',
          duracion: '8 semanas',
          objetivo: 'Mantener nivel físico durante competencia',
          microciclos: [],
        },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">
            Gestión de Planificaciones
          </h1>
          <p className="text-gray-600">
            Organiza las planificaciones por Macro, Meso y Microciclos
          </p>
        </div>
        <Button className="bg-[#c62828] hover:bg-[#a61b1b]">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Planificación
        </Button>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-900">
            Las planificaciones se organizan jerárquicamente: Macrociclos contienen
            Mesociclos, y cada Mesociclo contiene Microciclos con las actividades
            semanales.
          </p>
        </div>
      </div>

      <Tabs defaultValue="jerarquica">
        <TabsList>
          <TabsTrigger value="jerarquica">Vista Jerárquica</TabsTrigger>
          <TabsTrigger value="calendario">Vista Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="jerarquica" className="mt-6">
          <div className="space-y-4">
            {macrociclos.map((macro) => (
              <Card key={macro.id}>
                <Collapsible
                  open={expandedMacro === macro.id}
                  onOpenChange={() =>
                    setExpandedMacro(expandedMacro === macro.id ? null : macro.id)
                  }
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ChevronRight
                            className={`w-5 h-5 transition-transform ${
                              expandedMacro === macro.id ? 'rotate-90' : ''
                            }`}
                          />
                          <div>
                            <CardTitle className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-[#c62828]" />
                              {macro.nombre}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              {macro.periodo}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-[#c62828]">
                          {macro.mesociclos.length} mesociclos
                        </Badge>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pl-12 space-y-4">
                      {macro.mesociclos.map((meso) => (
                        <Card key={meso.id} className="border-l-4 border-l-[#c62828]">
                          <Collapsible
                            open={expandedMeso === meso.id}
                            onOpenChange={() =>
                              setExpandedMeso(expandedMeso === meso.id ? null : meso.id)
                            }
                          >
                            <CollapsibleTrigger asChild>
                              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <ChevronRight
                                      className={`w-4 h-4 transition-transform ${
                                        expandedMeso === meso.id ? 'rotate-90' : ''
                                      }`}
                                    />
                                    <div>
                                      <CardTitle className="text-lg">
                                        {meso.nombre}
                                      </CardTitle>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {meso.objetivo} • {meso.duracion}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <CardContent className="space-y-4">
                                {meso.microciclos.length > 0 ? (
                                  meso.microciclos.map((micro) => (
                                    <Card key={micro.id} className="bg-gray-50">
                                      <CardHeader>
                                        <CardTitle className="text-base">
                                          Semana {micro.semana}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="space-y-3">
                                          {micro.dias.map((dia, idx) => (
                                            <div
                                              key={idx}
                                              className="bg-white rounded p-3"
                                            >
                                              <p className="text-sm text-gray-900 mb-2">
                                                {dia.dia}
                                              </p>
                                              <ul className="space-y-1">
                                                {dia.actividades.map((act, actIdx) => (
                                                  <li
                                                    key={actIdx}
                                                    className="text-sm text-gray-600 ml-4 list-disc"
                                                  >
                                                    {act}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-500 text-center py-4">
                                    No hay microciclos definidos
                                  </p>
                                )}
                              </CardContent>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      ))}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendario" className="mt-6">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">Vista de Calendario</p>
              <p className="text-sm">
                Próximamente: visualización de planificaciones en formato calendario
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
