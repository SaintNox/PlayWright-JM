🎭 Proyecto de Práctica con Playwright 🎭


Este repositorio contiene prácticas de automatización realizadas con el framework Playwright, con el objetivo de aprender y explorar sus características, modelos y capacidades en diferentes contextos de prueba.

⚠️ Este proyecto no está enfocado a una aplicación o sistema específico, sino al aprendizaje progresivo de funcionalidades clave.

Tecnologías y herramientas
Playwright — Framework de automatización E2E.

Node.js + TypeScript

Dotenv para el manejo de variables de entorno

HTML Reporter (por defecto de Playwright) así como capturas de pantalla automaticas y por test

Tests corren en modo no-headless para observar la ejecución.

Captura de screenshots en errores: 'only-on-failure'.

Trazas activadas al fallar un test (trace: 'on-first-retry').

Reporte en HTML.

Configurado solo para navegador Chromium, pero se puede habilitar Firefox/WebKit fácilmente.

Uso de page.locator vs page.getByRole.

Estructura de Page Object Model con TypeScript.

Grabación de flujos con playwright codegen y su refactor.

Manejo de múltiples estrategias de localización.

Buenas prácticas con trazas, screenshots y reporter visual, así como el manejo por ejemplos de variables de entorno, para trabajos de integracion continua

Practicas con interceptores

