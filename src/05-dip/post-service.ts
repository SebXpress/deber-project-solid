/**
 * PRINCIPIO DE INVERSIÓN DE DEPENDENCIAS (DIP) - SOLUCIÓN
 * 'PostService' ya no instancia componentes de bajo nivel de forma rígida.
 * Ahora depende exclusivamente de la interfaz 'IPostProvider', permitiendo
 * intercambiar la base de datos local por un archivo JSON o una API externa sin cambiar este código.
 */

import { IPostProvider } from './data/local-database';

export class PostService {
    private posts: any[] = [];
    private readonly databaseProvider: IPostProvider;

    // DIP: Inyectamos la abstracción mediante el constructor
    constructor(databaseProvider: IPostProvider) {
        this.databaseProvider = databaseProvider;
    }

    public async getPosts(): Promise<any[]> {
        console.log('[PostService] Consultando publicaciones de forma desacoplada...');
        this.posts = await this.databaseProvider.getFakePosts();
        return this.posts;
    }
}