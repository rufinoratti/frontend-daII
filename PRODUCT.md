# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite. El frontend consumirá la API REST del backend Spring Boot cuando termine la etapa de mocks.

## Users

Personal administrativo de la Secretaría Académica de la universidad. Su tarea es mantener la estructura educativa y organizar la cursada y los exámenes.

## Product Purpose

UADEnet centraliza la gestión académica y la planificación institucional: carreras, planes de estudio, asignaturas, correlatividades, aulas, períodos y turnos de examen. El éxito consiste en que el equipo pueda consultar, crear y revisar esa información sin depender de planillas dispersas.

## Positioning

Un único espacio de trabajo conecta la estructura académica con su planificación operativa y muestra las validaciones que afectan la inscripción a finales.

## Operating Context

El portal se usa desde computadoras del equipo administrativo. En esta etapa se evalúan flujos y pantallas con datos mock; la persistencia y autenticación real quedarán para una etapa posterior.

## Capabilities and Constraints

- Gestionar carreras, planes de estudio, asignaturas y correlatividades.
- Crear sedes y aulas, registrar capacidades y consultar agendas.
- Asignar aulas a cursos evitando superposiciones horarias.
- Definir fechas de inicio y fin de cuatrimestres y turnos de exámenes finales.
- Validar regularidad a partir de asistencia mínima y promedio mínimo.
- La API existente usa sesiones/HTTP Basic y restringe escrituras a usuarios ADMINISTRATIVO.
- La UI debe conservar los textos en español y etiquetar todo dato de prueba como mock o demostración hasta integrar la API.

## Brand Commitments

El producto se llama UADEnet. La interfaz está dirigida a un entorno universitario serio, claro y operativo.

## Evidence on Hand

- Consigna del TPO: `/Users/macbookair/Downloads/TPO - DEA II 2Q 2026 (1).pdf`.
- Mockups de Figma mencionados por el usuario: enlace específico pendiente.
- Backend documentado por el usuario con endpoints REST en `http://localhost:8080`.
- Los datos visibles en la primera versión son sintéticos y no representan información real de la universidad.

## Product Principles

- Claridad antes que densidad: cada pantalla debe responder qué se puede hacer y cuál es el siguiente paso.
- Una fuente de verdad: la estructura académica y la planificación se consultan desde el mismo espacio.
- Validaciones visibles: los conflictos y requisitos deben aparecer antes de confirmar una operación.
- Datos de prueba honestos: todo contenido mock debe ser reconocible como demostración.

## Accessibility & Inclusion

Usar HTML semántico, navegación completa por teclado, foco visible, contraste WCAG AA y alternativas textuales para iconos. La interfaz debe funcionar en desktop y adaptarse a pantallas angostas.
