# Proyecto Integrador: SOLID & Arquitectura Limpia
**Universidad de las Fuerzas Armadas ESPE** **Ingeniería de Software | Reserva Ecológica "Vida Natural"**

Este repositorio contiene la refactorización del laboratorio aplicando los 5 principios SOLID bajo la metodología ABP, garantizando un código desacoplado, tipado estricto en TypeScript y alta mantenibilidad.

---

## Bitácora de Reflexión Crítica (Retos de la Guía)

### 1. Single Responsibility Principle (SRP)
* **Desafío:** `ProductBloc` gestionaba el inventario y enviaba correos al mismo tiempo.
* **Solución:** Se extrajo el envío de correos a un `MailerService` especializado bajo la interfaz `IMailerService`.
* **Reflexión:** *¿Qué pasaría si mañana decidimos notificar por WhatsApp en lugar de Email? ¿Cuántas clases tendrías que modificar ahora vs. antes?* Antes, habría tocado abrir y modificar la clase de negocio `ProductBloc`, arriesgando romper la lógica del inventario. Ahora, solo se crea una nueva clase (ej. `WhatsAppService`) que implemente `IMailerService` (o una interfaz de mensajería común) e inyectarla. `ProductBloc` no sufre ninguna modificación.

### 2. Open/Closed Principle (OCP)
* **Desafío:** Dependencia rígida de la librería externa `axios` dentro de los servicios.
* **Solución:** Se implementó el patrón *Adaptador* creando la interfaz `IHttpClient` y la clase envoltorio `AxiosHttpClient`.
* **Reflexión:** *Si se detecta una vulnerabilidad en axios y debes migrar a fetch en minutos, ¿qué tan rápido lo harías con este diseño?* Se haría de inmediato. Solo se requeriría crear una clase `FetchHttpClient` que cumpla con el contrato `IHttpClient` y cambiar la instancia en el punto de arranque de la aplicación. No se toca ni una sola línea de código dentro de `NewsService` ni `PhotosService`.

### 3. Liskov Substitution Principle (LSP)
* **Desafío:** `VehicleManager` requería usar condicionales `instanceof` para poder operar con cada marca de vehículo.
* **Solución:** Se definió la clase base abstracta `Vehicle` obligando a las subclases a implementar el método polimórfico `getCustomFeatures()`.
* **Reflexión:** *Si la reserva adquiere un "Dron", ¿podría tu manager procesarlo sin añadir nuevos if/else?* Sí, totalmente. El "Dron" simplemente se crearía como una subclase que herede de `Vehicle` e implemente su método de características. El `VehicleManager` lo procesaría de forma transparente dentro del arreglo genérico sin agregar condicionales.

### 4. Interface Segregation Principle (ISP)
* **Desafío:** La interfaz "gorda" `Bird` obligaba a todas las aves a implementar métodos que no les correspondían (como nadar o volar).
* **Solución:** Se segregó el contrato en tres interfaces atómicas: `IEater`, `IFlyer` y `ISwimmer`.
* **Reflexión:** *¿Cómo evita tu diseño que un "Pingüino" tenga un método fly() que lance errores?* Al estar segregadas, la clase `Penguin` (o en nuestro caso, el `Ostrich`) solo implementará las interfaces `IEater` y `ISwimmer`. Al no firmar el contrato de `IFlyer`, el método `fly()` no existe en la clase, eliminando código muerto y excepciones en tiempo de ejecución.

### 5. Dependency Inversion Principle (DIP)
* **Desafío:** `PostService` instanciaba dependencias concretas (`new LocalDatabaseService()`) en su interior.
* **Solución:** Se invirtió la dependencia inyectando la abstracción `IPostProvider` a través del constructor.
* **Reflexión:** *¿Qué tan fácil es inyectar un "MockDatabase" para pruebas unitarias ahora?* Es sumamente sencillo. Para las pruebas unitarias ya no dependemos de una base de datos real. Basta con crear una clase falsa `MockDatabase` que implemente `IPostProvider` con datos estáticos de prueba e inyectarla directamente al constructor de `PostService`.