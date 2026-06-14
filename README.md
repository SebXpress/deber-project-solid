# Tarea SOLID - Reserva Ecológica

En este proyecto arreglé el código de las 5 carpetas para que no esté todo amarrado y sea más fácil de mantener a futuro.

## Cambios realizados

### 1. SRP - Productos
* **Antes:** La clase `ProductBloc` manejaba el inventario y también enviaba los correos.
* **Después:** Creé un `MailerService` aparte que solo envía correos para que cada clase tenga una sola tarea.

### 2. OCP - Noticias
* **Antes:** Los servicios usaban `axios` directamente por dentro, si queríamos usar `fetch` tocaba cambiar todo.
* **Después:** Usé una interfaz `IHttpClient` para que se pueda cambiar de librería sin tocar los servicios.

### 3. LSP - Vehículos
* **Antes:** El mánager usaba puros `if` e `instanceof` para revisar la marca de cada carro y se rompía con marcas nuevas.
* **Después:** Creé una clase base `Vehicle` para que cada carro maneje sus datos y el mánager los use por igual.

### 4. ISP - Aves
* **Antes:** La interfaz obligaba al Avestruz a volar (`fly()`), haciendo que el código lance errores raros.
* **Después:** Dividí la interfaz en tres chiquitas (`comer`, `volar`, `nadar`) para que cada ave use solo lo que sí hace.

### 5. DIP - Publicaciones
* **Antes:** El servicio creaba la base de datos con un `new`, quedando amarrado a la base local de forma rígida.
* **Después:** Pasé la base de datos como interfaz por el constructor, haciendo fácil cambiarla por un archivo JSON.