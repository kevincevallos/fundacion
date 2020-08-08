import { NuevoUsuario } from './nuevoUsuario.model';
import { Salud } from './salud.model';

export class InformeIngreso {
    nuevoUsuario: NuevoUsuario[] = [];
    constructor() {
        this.nuevoUsuario.push(new NuevoUsuario());
    }
}