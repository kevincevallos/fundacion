import { Salud } from './salud.model';

export class NuevoUsuario {
  idusuario: number;
  parentesco: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  identificacion: string;
  tipoDocumento: string;
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
  idGenero: number;
  idCiudad: number;
  idPais: number;
  lugarIngreso: string;
  idNacionalidad: number;
  salud: Salud[] = [];
}
