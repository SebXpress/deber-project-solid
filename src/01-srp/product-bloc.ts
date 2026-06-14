/**
 * PRINCIPIO DE RESPONSABILIDAD ÚNICA (SRP) - SOLUCIÓN
 * * Se han separado las responsabilidades: 
 * 1. 'Product' define estrictamente el tipo de datos.
 * 2. 'MailerService' asume el rol exclusivo de infraestructura de mensajería.
 * 3. 'ProductBloc' ahora solo gestiona la lógica del negocio del inventario,
 * recibiendo el servicio de notificación por inversión de dependencias.
 */

// 1. Tipado Estricto de la Entidad
export interface Product {
    id: number;
    name: string;
}

// 2. Interfaz para desacoplar el servicio de mensajería (Evita fugas de responsabilidad)
export interface IMailerService {
    sendEmail(email: string, message: string): void;
}

// 3. Clase especializada únicamente en Notificaciones (Responsabilidad Única)
export class MailerService implements IMailerService {
    public sendEmail(email: string, message: string): void {
        console.log(`[MailerService] Enviando correo a ${email}: ${message}`);
        // Aquí iría la implementación real de envío de correos (NodeMailer, etc.)
    }
}

// 4. Clase de negocio enfocada únicamente en el Inventario (Responsabilidad Única)
export class ProductBloc {
    private products: Product[] = [];
    private readonly mailerService: IMailerService;

    // Recibimos el servicio por constructor (Inyección de Dependencias) para eliminar acoplamiento residual
    constructor(mailerService: IMailerService) {
        this.mailerService = mailerService;
    }

    // Responsabilidad 1: Carga de productos (Lógica de Negocio)
    public loadProduct(id: number): Product | undefined {
        console.log(`[ProductBloc] Cargando producto con ID: ${id} desde el inventario del parque...`);
        return this.products.find(product => product.id === id);
    }

    // Responsabilidad 2: Guardado de productos (Lógica de Persistencia)
    public saveProduct(product: Product): void {
        console.log(`[ProductBloc] Guardando el producto "${product.name}" en la base de datos de la reserva...`);
        this.products.push(product);
    }

    // Orquestación limpia: El Bloc delega la notificación sin saber CÓMO se envía el correo
    public notifyCustomerAboutStock(email: string, productName: string): void {
        const message = `El producto ${productName} ya se encuentra disponible en la tienda de la reserva.`;
        this.mailerService.sendEmail(email, message);
    }
}