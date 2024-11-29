
# Rick and Morty App

Este proyecto es una aplicación web desarrollada con **Next.js** y **React** para visualizar personajes de la serie Rick and Morty. Utiliza **Leaflet** para mostrar un mapa interactivo de Colombia con marcadores en **Valledupar** y **Bogotá**. Además, se puede agregar y eliminar personajes a la lista de favoritos y hacer estas modificaciones persistentes utilizando **localStorage**.

## Características del Proyecto

1. **Visualización de personajes**: Se muestran personajes de la serie Rick and Morty obtenidos desde la API oficial de la serie.
2. **Mapa interactivo**: Muestra un mapa de Colombia con marcadores en **Valledupar** y **Bogotá**. Los usuarios pueden añadir y eliminar marcadores en cualquier lugar del mapa.
3. **Favoritos**: Permite agregar personajes a una lista de favoritos. Los favoritos se almacenan de manera persistente en el navegador usando **localStorage**.
4. **Interactividad**: La aplicación utiliza animaciones de carga, y el usuario puede ver mensajes de confirmación al agregar o eliminar favoritos.

## Tecnologías Utilizadas

- **Next.js**: Framework React para la construcción de aplicaciones web modernas y optimizadas.
- **React**: Librería para construir interfaces de usuario.
- **Leaflet**: Librería de JavaScript para mapas interactivos.
- **Tailwind CSS**: Framework CSS para crear interfaces de usuario responsivas.
- **Zustand**: Para la gestión de estado global (favoritos).
- **Axios**: Para realizar peticiones HTTP a la API.
- **Framer Motion**: Para agregar animaciones a la aplicación.

## Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

### 1. Clona este repositorio

- git clone https://github.com/LeiderTorres16/rick-and-morty-app.git
- cd rick-and-morty-app

### 2. Instala las dependencias

- npm install

### 3. Ejecuta la aplicación

- npm run dev

Esto iniciará un servidor en http://localhost:3000, donde podrás ver la aplicación en tu navegador.

### 4. Ver la aplicación en acción

- Página de inicio: La página principal de la aplicación.
- Personajes: Muestra una lista de personajes de la serie Rick and Morty obtenidos a    través de la API.
- Favoritos: Permite agregar y eliminar personajes de una lista de favoritos.
- Mapa: Muestra un mapa interactivo con marcadores en Colombia y permite añadir/eliminar marcadores a voluntad del usuario.

### 5. Para crear una build de producción

- npm run build

Esto generará una versión optimizada en la carpeta /.next, lista para ser desplegada en un servidor de producción.

### 6. Desplegar en producción

Para desplegar la aplicación en producción, puedes usar plataformas como Vercel o Netlify, que son especialmente buenas para aplicaciones creadas con Next.js.


## Estructura del Proyecto

La estructura del proyecto es la siguiente:

- **/pages**: Páginas principales de la aplicación y para la navegacion
- **/components**: Componentes reutilizables.
- **/stores**: Maneja el estado global de los favoritos con Zustand
- **/resources**: Archivos estáticos como imágenes y iconos


## Notas Adicionales

- **Persistencia de Favoritos**: Los favoritos se guardan en localStorage, por lo que si cierras el navegador y vuelves a abrir la aplicación, tus favoritos permanecerán allí.
- **Animaciones**: Se utilizan Framer Motion para agregar transiciones y animaciones a la interfaz de usuario, proporcionando una experiencia más interactiva.
- **Manejo de Estado**: Zustand es utilizado para manejar el estado global, como la lista de favoritos, a través de un store.
- **Mapa**: Se utiliza Leaflet para mostrar el mapa de Colombia y manejar la adición/eliminación de marcadores dinámicos por parte del usuario.