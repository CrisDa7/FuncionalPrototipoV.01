import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Gestión de Participantes</h1>
          <p className="text-gray-600">
            Administra los atletas registrados en el sistema
          </p>
        </div>
        <Button className="bg-[#c62828] hover:bg-[#a61b1b]">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Participante
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Participantes</p>
          <p className="text-2xl text-gray-900 mt-1">{atletas.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Activos</p>
          <p className="text-2xl text-green-600 mt-1">
            {atletas.filter((a) => a.estado === 'Activo').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Estudiantes</p>
          <p className="text-2xl text-blue-600 mt-1">
            {atletas.filter((a) => a.tipo === 'Estudiante').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Evaluados este mes</p>
          <p className="text-2xl text-purple-600 mt-1">4</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
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
                <TableCell>{atleta.nombre}</TableCell>
                <TableCell>{atleta.edad}</TableCell>
                <TableCell>{atleta.dni}</TableCell>
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
                <TableCell>{atleta.tipo}</TableCell>
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
