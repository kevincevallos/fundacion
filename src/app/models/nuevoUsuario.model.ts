import { Salud } from './salud.model';

export class NuevoUsuario {
  nuevoUsuario;
  idusuario: number;
  idRegistrador: number;
  idParentesco: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  telefonoContacto: string;
  fechaNacimiento: string;
  identificacion: string;
  tipoIdentificacion: number;
  oficio: string;
  profesion: string;
  habilidades: string;
  nivelInstruccion: string;
  fechaIngresoEcuador: string;
  fechaIngresoFundacion;
  foto;
  fechaEgresoFundacion: string;
  provincia: string;
  situacionMigratoria: string;
  idgenero: number;
  idciudad: string;
  idpais: number;
  lugarIngreso: string;
  idnacionalidad: number;
  salud: Salud[] = [];
  observacionIngreso: string;
}
