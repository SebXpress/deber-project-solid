# Proyecto Integrador: SOLID y Arquitectura Limpia
Universidad de las Fuerzas Armadas ESPE
Ingeniería de Software | Reserva Ecológica "Vida Natural"

Este repositorio contiene la refactorización que realicé en el laboratorio aplicando los 5 principios SOLID bajo la metodología ABP, garantizando un código desacoplado, tipado estricto en TypeScript y alta mantenibilidad.

## Bitácora de Reflexión Crítica (Retos de la Guía)

### 1. Single Responsibility Principle (SRP)
* **Desafío:** Identifiqué que la clase ProductBloc gestionaba el inventario y enviaba correos al mismo tiempo, acumulando más de una responsabilidad.
* **Solución:** Extraje el envío de correos a un MailerService especializado bajo la interfaz IMailerService, dejando el bloque de productos enfocado solo en su lógica.
* **Reflexión:** ¿Qué pasaría si mañana decidimos notificar por WhatsApp en lugar de Email? ¿Cuántas clases tendrías que modificar ahora vs. antes? Antes, me habría tocado abrir y modificar la clase de negocio ProductBloc, arriesgándome a romper la lógica del inventario. Ahora, solo tengo que crear una nueva clase (como WhatsAppService) que implemente IMailerService e inyectarla. Mi clase ProductBloc no sufre ninguna modificación.

### 2. Open/Closed Principle (OCP)
* **Desafío:** Los servicios de noticias y fotos tenían una dependencia rígida de la librería externa axios dentro de sus métodos.
* **Solución:** Implementé el patrón Adaptador creando la interfaz IHttpClient y la clase envoltorio AxiosHttpClient para aislar la librería.
* **Reflexión:** Si se detecta una vulnerabilidad en axios y debes migrar a fetch en minutos, ¿qué tan rápido lo harías con este diseño? Lo haría de inmediato. Solo requiero crear una clase FetchHttpClient que cumpla con el contrato de mi interfaz IHttpClient y cambiar la instancia en el punto de arranque de mi aplicación. No tengo que tocar ni una sola línea de código dentro de NewsService ni PhotosService.

### 3. Liskov Substitution Principle (LSP)
* **Desafío:** La clase VehicleManager requería usar condicionales instanceof para poder operar con cada marca de vehículo de la flota.
* **Solución:** Definí la clase base abstracta Vehicle, obligando a las subclases a implementar el método polimórfico getCustomFeatures().
* **Reflexión:** Si la reserva adquiere un "Dron", ¿podría tu manager procesarlo sin añadir nuevos if/else? Sí, totalmente. El "Dron" simplemente lo crearía como una subclase que herede de Vehicle e implemente su método de características. Mi VehicleManager lo procesaría de forma transparente dentro del arreglo genérico sin necesidad de que yo añada nuevos condicionales.

### 4. Interface Segregation Principle (ISP)
* **Desafío:** La interfaz Bird era un contrato muy grande que obligaba a todas las aves a implementar métodos que no les correspondían por su naturaleza, como nadar o volar.
* **Solución:** Segregué el contrato original en tres interfaces atómicas y específicas: IEater, IFlyer y ISwimmer.
* **Reflexión:** ¿Cómo evita tu diseño que un "Pingüino" tenga un método fly() que lance errores? Al estar segregadas, la clase del ave que no vuela (como el Ostrich que usé en mi código) solo implementará las interfaces IEater y ISwimmer. Al no firmar el contrato de IFlyer, el método fly() ni siquiera existe en la clase, eliminando el código muerto y las excepciones en tiempo de ejecución.

### 5. Dependency Inversion Principle (DIP)
* **Desafío:** El servicio PostService instanciaba dependencias concretas usando el operador new para llamar a LocalDatabaseService en su interior.
* **Solución:** Invertí la dependencia aplicando inyección de dependencias a través del constructor, utilizando la abstracción IPostProvider.
* **Reflexión:** ¿Qué tan fácil es inyectar un "MockDatabase" para pruebas unitarias ahora? Es sumamente sencillo. Para mis pruebas unitarias ya no dependo de una base de datos real. Basta con que cree una clase falsa MockDatabase que implemente IPostProvider con datos estáticos de prueba y la inyecte directamente al constructor de PostService al instanciarlo.