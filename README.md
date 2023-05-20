This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Para correr el frontend es de forma muy sencilla, mediante estos comandos.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

se debe tener en cuenta que ya debe estar configurado el archivo .env, el cual tiene una copia en .env.example, solo es clonarlo a .env e iniciar el proyecto

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para visualizar el sitio web

## Funcionalidades

En el requerimiento de la tarea, se solicito usar la ultima version de react. actualmente en su documentación oficial, ReactJs, recomienda trabar con los marcos desarrollados sobre este, para una mejor experiencia de desarrollo, debido a esto el proyecto esta creado en NextJs.

- Sobre este nuevo marco, aunque trabaja sobre react, su arquitectura cambia, y aunque me considero excelente en react, debo aclarar que apenas estoy aprendiendo NextJs y hay cosas que aun se me dificultan adaptar de React
- Se realiza proteccion de rutas con Middleware
- Se integra Jwt
- Se integra Manejo de Coockies para token y datos de usuario
- Se usa contexto para informacion global de la aplicacion
- No se usa ningun Paquete de estilos, solo se utilizan estilos globales y modulares en Css
- Para facilitar la lectura del proyecto y su evaluacion, todos los componentes son nativos, den HTML, no se uso ninguna libreria de componentes hechos, debido a que estos pueden coplejisar el codigo y su entendimiento
- Se integra layout, en este caso un navbar global para las rutas auntenticadas
- Se trabaja con typescript

## TODO

Hay varias novedades que se deben mejorar ya que no pude hacerlas en el tiempo de la prueba

- Hay algunos lugares de la web, donde el css debe ser corregido, ya que no funciona el responsive o se ven mal
- Separacion de codigo
- Reutilizacion de componentes
- Uso del patro de diseño atomico (Atomic Design)
- Uso del potencial de Next, como ServerRendering, StaticSites
- Crear un servicio general de peticiones
- Crear un servicio de comunucacion A coockies
- Crear un servicio de manejo de eventos o errores
- Crear un servicio de notificaciones generales
