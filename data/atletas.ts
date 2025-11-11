export interface Atleta {
  id: string;
  nombre: string;
  edad: number;
  dni: string;
  estado: 'Activo' | 'Inactivo';
  tipo: 'Estudiante' | 'Docente' | 'Administrativo';
  correo: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  genero: 'Masculino' | 'Femenino';
  grupoSanguineo: string;
  contactoEmergencia: string;
  telefonoEmergencia: string;
}

export interface EvaluacionAntropometrica {
  id: string;
  atletaId: string;
  fecha: string;
  peso: number; // kg
  talla: number; // cm
  envergadura: number; // cm
  cintura: number; // cm
  imc: number; // calculado
  grasa: number; // %
  musculo: number; // %
}

export interface TestFisico {
  id: string;
  atletaId: string;
  fecha: string;
  burpees: number;
  sentadillas: number;
  saltoVertical: number; // cm
  plancha: number; // segundos
  flexibilidad: number; // cm
  velocidad: number; // segundos
}

export const atletas: Atleta[] = [
  {
    id: '1',
    nombre: 'Santiago Abrigo',
    edad: 21,
    dni: '1104567890',
    estado: 'Activo',
    tipo: 'Estudiante',
    correo: 'santiago.abrigo@unl.edu.ec',
    telefono: '0987654321',
    direccion: 'Loja, Ecuador',
    fechaNacimiento: '2003-03-15',
    genero: 'Masculino',
    grupoSanguineo: 'O+',
    contactoEmergencia: 'María Abrigo',
    telefonoEmergencia: '0987654320',
  },
  {
    id: '2',
    nombre: 'Joseph Balcázar',
    edad: 22,
    dni: '1104567891',
    estado: 'Activo',
    tipo: 'Estudiante',
    correo: 'joseph.balcazar@unl.edu.ec',
    telefono: '0987654322',
    direccion: 'Loja, Ecuador',
    fechaNacimiento: '2002-07-20',
    genero: 'Masculino',
    grupoSanguineo: 'A+',
    contactoEmergencia: 'Luis Balcázar',
    telefonoEmergencia: '0987654323',
  },
  {
    id: '3',
    nombre: 'Elías Poma',
    edad: 20,
    dni: '1104567892',
    estado: 'Activo',
    tipo: 'Estudiante',
    correo: 'elias.poma@unl.edu.ec',
    telefono: '0987654324',
    direccion: 'Loja, Ecuador',
    fechaNacimiento: '2004-01-10',
    genero: 'Masculino',
    grupoSanguineo: 'B+',
    contactoEmergencia: 'Ana Poma',
    telefonoEmergencia: '0987654325',
  },
  {
    id: '4',
    nombre: 'Andersson Ambuludí',
    edad: 21,
    dni: '1104567893',
    estado: 'Activo',
    tipo: 'Estudiante',
    correo: 'andersson.ambuludi@unl.edu.ec',
    telefono: '0987654326',
    direccion: 'Loja, Ecuador',
    fechaNacimiento: '2003-09-05',
    genero: 'Masculino',
    grupoSanguineo: 'AB+',
    contactoEmergencia: 'Pedro Ambuludí',
    telefonoEmergencia: '0987654327',
  },
];

export const evaluacionesAntropometricas: EvaluacionAntropometrica[] = [
  {
    id: '1',
    atletaId: '1',
    fecha: '2024-11-08',
    peso: 72,
    talla: 175,
    envergadura: 178,
    cintura: 82,
    imc: 23.5,
    grasa: 15.2,
    musculo: 42.3,
  },
  {
    id: '2',
    atletaId: '1',
    fecha: '2024-10-08',
    peso: 73.5,
    talla: 175,
    envergadura: 178,
    cintura: 84,
    imc: 24.0,
    grasa: 16.1,
    musculo: 41.8,
  },
  {
    id: '3',
    atletaId: '2',
    fecha: '2024-11-07',
    peso: 68,
    talla: 170,
    envergadura: 172,
    cintura: 78,
    imc: 23.5,
    grasa: 14.5,
    musculo: 43.1,
  },
  {
    id: '4',
    atletaId: '3',
    fecha: '2024-11-06',
    peso: 75,
    talla: 180,
    envergadura: 182,
    cintura: 85,
    imc: 23.1,
    grasa: 16.8,
    musculo: 40.5,
  },
  {
    id: '5',
    atletaId: '4',
    fecha: '2024-11-05',
    peso: 70,
    talla: 173,
    envergadura: 175,
    cintura: 80,
    imc: 23.4,
    grasa: 15.7,
    musculo: 41.9,
  },
];

export const testsFisicos: TestFisico[] = [
  {
    id: '1',
    atletaId: '1',
    fecha: '2024-11-08',
    burpees: 45,
    sentadillas: 60,
    saltoVertical: 52,
    plancha: 180,
    flexibilidad: 28,
    velocidad: 7.2,
  },
  {
    id: '2',
    atletaId: '2',
    fecha: '2024-11-07',
    burpees: 42,
    sentadillas: 55,
    saltoVertical: 48,
    plancha: 165,
    flexibilidad: 25,
    velocidad: 7.5,
  },
  {
    id: '3',
    atletaId: '3',
    fecha: '2024-11-06',
    burpees: 40,
    sentadillas: 58,
    saltoVertical: 50,
    plancha: 170,
    flexibilidad: 30,
    velocidad: 7.3,
  },
  {
    id: '4',
    atletaId: '4',
    fecha: '2024-11-05',
    burpees: 43,
    sentadillas: 57,
    saltoVertical: 49,
    plancha: 175,
    flexibilidad: 27,
    velocidad: 7.4,
  },
];
