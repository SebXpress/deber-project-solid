/**
 * PRINCIPIO DE SUSTITUCIÓN DE LISKOV (LSP) - SOLUCIÓN
 * Se define una clase abstracta común. Cualquier subclase (Tesla, Audi, etc.) 
 * puede sustituir a la clase base 'Vehicle' de forma transparente sin que el 
 * cliente ('VehicleManager') requiera conocer su tipo exacto en tiempo de ejecución.
 */

// 1. Clase base abstracta (El Contrato Común)
export abstract class Vehicle {
    constructor(public readonly model: string) {}

    // Cada vehículo será responsable de proveer sus propios detalles específicos
    public abstract getCustomFeatures(): string;
}

// 2. Implementaciones limpias que heredan de Vehicle
export class Tesla extends Vehicle {
    public getCustomFeatures(): string {
        return 'Carga eléctrica al 100%';
    }
}

export class Audi extends Vehicle {
    public getCustomFeatures(): string {
        return 'Tracción Quattro activada';
    }
}

export class Toyota extends Vehicle {
    public getCustomFeatures(): string {
        return 'Motor híbrido listo';
    }
}

export class Honda extends Vehicle {
    public getCustomFeatures(): string {
        return 'VTEC activado';
    }
}

export class Ford extends Vehicle {
    public getCustomFeatures(): string {
        return 'Built Tough';
    }
}

// 3. El Manager ahora CUMPLE LSP. Trabaja de forma agnóstica con cualquier Vehicle.
export class VehicleManager {

    // Ahora acepta un arreglo estricto de la clase base abstracta
    public static printVehicleDetails(vehicles: Vehicle[]): void {
        vehicles.forEach(vehicle => {
            // Obtenemos dinámicamente el nombre de la clase/marca y sus detalles polimórficamente
            const brandName = vehicle.constructor.name;
            console.log(`${brandName} Model: ${vehicle.model} - ${vehicle.getCustomFeatures()}`);
        });
    }

}