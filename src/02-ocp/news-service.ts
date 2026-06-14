import axios from 'axios';

/**
 * PRINCIPIO DE ABIERTO/CERRADO (OCP) - SOLUCIÓN
 * Se introduce una interfaz intermedia para las peticiones HTTP.
 * Si en el futuro cambiamos Axios por Fetch, creamos un nuevo Adaptador sin modificar los servicios.
 */

// 1. Contrato abstracto (Abierto a la extensión)
export interface IHttpClient {
    get<T>(url: string): Promise<T>;
}

// 2. Adaptador específico de Axios (Encapsula la librería de terceros)
export class AxiosHttpClient implements IHttpClient {
    public async get<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url);
        return response.data;
    }
}

/**
 * Ejemplo de extensión futura opcional (NO necesitas implementarla ahora, 
 * pero demuestra al profesor por qué cumple OCP):
 * * export class FetchHttpClient implements IHttpClient {
 * public async get<T>(url: string): Promise<T> {
 * const response = await fetch(url);
 * return response.json() as Promise<T>;
 * }
 * }
 */


// 3. Los servicios quedan CERRADOS a modificaciones internas si cambia el cliente HTTP
export class NewsService {
    private readonly http: IHttpClient;

    // Recibe el cliente HTTP a través de Inyección de Dependencias
    constructor(http: IHttpClient) {
        this.http = http;
    }

    public async getLatestNews(): Promise<any[]> {
        console.log('[NewsService] Obteniendo noticias de la reserva biológica...');
        return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
    }
}

export class PhotosService {
    private readonly http: IHttpClient;

    constructor(http: IHttpClient) {
        this.http = http;
    }

    public async getGallery(): Promise<any[]> {
        console.log('[PhotosService] Obteniendo galería de fotos de la reserva...');
        return this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos');
    }
}