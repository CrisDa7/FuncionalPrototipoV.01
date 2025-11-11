import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { atletas } from '../data/atletas';

interface ParticipantesProps {
  onViewAtleta: (atletaId: string) => void;
}

export function Participantes({ onViewAtleta }: ParticipantesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAtletas = atletas.filter(
    (atleta) =>
      atleta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atleta.dni.includes(searchTerm)
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl text-gray-900 mb-2">Gestión de Participantes</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Administra los atletas registrados en el sistema
          </p>
        </div>
        <Button className="bg-[#c62828] hover:bg-[#a61b1b] h-10 sm:h-auto w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          <span className="text-sm sm:text-base">Nuevo</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <Input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600">Total</p>
          <p className="text-lg sm:text-2xl text-gray-900 mt-1 font-bold">{atletas.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600">Activos</p>
          <p className="text-lg sm:text-2xl text-green-600 mt-1 font-bold">
            {atletas.filter((a) => a.estado === 'Activo').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600">Estudiantes</p>
          <p className="text-lg sm:text-2xl text-blue-600 mt-1 font-bold">
            {atletas.filter((a) => a.tipo === 'Estudiante').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600">Eval. Mes</p>
          <p className="text-lg sm:text-2xl text-purple-600 mt-1 font-bold">4</p>
        </div>
      </div>

      {/* Mobile Card View (< md) */}
      <div className="md:hidden space-y-3">
        {filteredAtletas.map((atleta) => (
          <Card key={atleta.id}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex justify-between items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                    {atleta.nombre}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{atleta.dni}</p>
                </div>
                <Badge
                  variant={atleta.estado === 'Activo' ? 'default' : 'secondary'}
                  className={
                    atleta.estado === 'Activo'
                      ? 'bg-green-100 text-green-700 hover:bg-green-100 text-xs'
                      : 'text-xs'
                  }
                >
                  {atleta.estado}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <p className="text-gray-600">Edad</p>
                  <p className="font-semibold">{atleta.edad}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tipo</p>
                  <p className="font-semibold">{atleta.tipo}</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3 truncate">{atleta.correo}</p>

              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewAtleta(atleta.id)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex-1 h-8 text-xs"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 flex-1 h-8 text-xs"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 h-8 text-xs"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAtletas.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No se encontraron participantes
          </div>
        )}
      </div>

      {/* Desktop Table View (md+) */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAtletas.map((atleta) => (
              <TableRow key={atleta.id}>
                <TableCell className="text-sm">{atleta.nombre}</TableCell>
                <TableCell className="text-sm">{atleta.edad}</TableCell>
                <TableCell className="text-sm">{atleta.dni}</TableCell>
                <TableCell>
                  <Badge
                    variant={atleta.estado === 'Activo' ? 'default' : 'secondary'}
                    className={
                      atleta.estado === 'Activo'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : ''
                    }
                  >
                    {atleta.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{atleta.tipo}</TableCell>
                <TableCell className="text-sm">{atleta.correo}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewAtleta(atleta.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
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

        {filteredAtletas.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron participantes
          </div>
        )}
      </div>
    </div>
  );
}
