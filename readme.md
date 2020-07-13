# Notas para mi

La idea es hacer una petición http post (api rest) de forma que si faltan datos desde el servidor se realice un input de datos al navegador. Se usa para ello socket. El esquema es

1. Establecer conexion socket con el servidor y guardar el identificador (en principio en localStorage)
2. Hacer petición post rest.
    - Si todos los datos están el servidor responde
    - Si faltan datos, el servidor responde falta algo y el socket envía un mensaje que dispara un prompt