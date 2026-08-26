# UADEnet - Gestión Académica y Planificación

Frontend del módulo 9 del TPO de Desarrollo de Aplicaciones II.

## Tecnologías

- React
- TypeScript
- Vite

## Inicio local

1. Copiá `.env.example` como `.env`.
2. Ejecutá `npm install`.
3. Ejecutá `npm run dev`.

La aplicación se conectará al backend de Spring Boot mediante la variable `VITE_API_URL`.

## Estructura del frontend

El código está organizado por funcionalidades para que cada integrante pueda trabajar en un módulo sin concentrar toda la lógica en `App.tsx`:

```text
src/
├── app/             navegación y configuración general
├── layouts/         estructuras visuales compartidas
├── components/      componentes reutilizables de interfaz
├── features/        pantallas y lógica de cada módulo
│   ├── academica/
│   ├── planificacion/
│   ├── ciclo/
│   └── dashboard/
├── data/            datos mocks de la demo
├── services/        cliente y servicios de integración con la API
├── types/           tipos TypeScript del dominio
└── App.tsx          orquestación de estado y selección de pantalla
```

Los datos de prueba están en `src/data/mocks.ts`. Cuando conectemos Spring Boot, cada llamada se agregará dentro de `src/services/api/`, sin tener que modificar la estructura visual de las pantallas.
