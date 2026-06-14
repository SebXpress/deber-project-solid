/**
 * CONTRATO ABSTRACTO PARA EL PROVEEDOR DE DATOS (DIP)
 */
export interface IPostProvider {
    getFakePosts(): Promise<any[]>;
}

export class LocalDatabaseService implements IPostProvider {
    public async getFakePosts(): Promise<any[]> {
        return [
            { id: 1, title: 'Avistamiento de Jaguar', body: 'Se reportó un jaguar cerca del río.' },
            { id: 2, title: 'Nuevas Orquídeas', body: 'Han florecido las especies raras en el jardín botánico.' }
        ];
    }
}

export class JsonDatabaseService implements IPostProvider {
    public async getFakePosts(): Promise<any[]> {
        return [
            { id: 1, title: 'JSON Post 1', body: 'Contenido desde un archivo JSON simulado.' }
        ];
    }
}