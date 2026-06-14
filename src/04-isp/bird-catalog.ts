/**
 * PRINCIPIO DE SEGREGACIÓN DE INTERFACES (ISP) - SOLUCIÓN
 * Se fragmenta la interfaz única y masiva en contratos de responsabilidad atómica.
 * Así, las clases solo implementan los comportamientos que realmente necesitan,
 * eliminando métodos vacíos y excepciones forzadas en tiempo de ejecución.
 */

// 1. Interfaces Segregadas por Capacidades Únicas
export interface IEater {
    eat(): void;
}

export interface IFlyer {
    fly(): void;
}

export interface ISwimmer {
    swim(): void;
}

// 2. Implementaciones Coherentes y Desacopladas

export class Toucan implements IEater, IFlyer {
    public eat(): void { 
        console.log('El Tucán está comiendo frutas.'); 
    }

    public fly(): void { 
        console.log('El Tucán vuela sobre la selva.'); 
    }
}

export class Hummingbird implements IEater, IFlyer {
    public eat(): void { 
        console.log('El Colibrí busca néctar.'); 
    }

    public fly(): void { 
        console.log('El Colibrí aletea rápidamente.'); 
    }
}

/**
 * El Avestruz ahora cumple perfectamente con el catálogo de fauna sin ser 
 * forzado a volar, eliminando por completo fugas de acoplamiento.
 */
export class Ostrich implements IEater, ISwimmer {
    public eat(): void { 
        console.log('El Avestruz come hierbas.'); 
    }

    public swim(): void { 
        console.log('El Avestruz puede nadar si es necesario.'); 
    }
}