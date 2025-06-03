# Documentación de APIs - Gestor de Viajes

## APIs Implementadas

### Ubicaciones

#### GET /api/ubicaciones
- **Descripción**: Obtiene todas las ubicaciones
- **Respuesta**: Array de ubicaciones

#### GET /api/ubicaciones/:id
- **Descripción**: Obtiene una ubicación por ID
- **Parámetros**: `id` - ID de la ubicación
- **Respuesta**: Objeto ubicación o error 404

#### POST /api/ubicaciones
- **Descripción**: Crea una nueva ubicación
- **Body requerido**:
```json
{
  "nombre": "string (requerido)",
  "pais": "string (requerido)",
  "ciudad": "string (requerido)",
  "codigoPostal": "string (opcional)"
}
```
- **Respuesta**: Ubicación creada (201) o error de validación (400)

#### PUT /api/ubicaciones/:id
- **Descripción**: Actualiza una ubicación existente
- **Parámetros**: `id` - ID de la ubicación
- **Body**: Campos a actualizar
- **Respuesta**: Ubicación actualizada o error 404

#### DELETE /api/ubicaciones/:id
- **Descripción**: Elimina una ubicación
- **Parámetros**: `id` - ID de la ubicación
- **Respuesta**: Mensaje de confirmación o error 404

### Hoteles

#### GET /api/hoteles
- **Descripción**: Obtiene todos los hoteles
- **Query params opcionales**: `ubicacion` - Filtrar por ID de ubicación
- **Respuesta**: Array de hoteles con información de ubicación poblada

#### GET /api/hoteles/:id
- **Descripción**: Obtiene un hotel por ID
- **Parámetros**: `id` - ID del hotel
- **Respuesta**: Objeto hotel con ubicación poblada o error 404

#### POST /api/hoteles
- **Descripción**: Crea un nuevo hotel
- **Body requerido**:
```json
{
  "nombre": "string (requerido)",
  "ubicacion": "ObjectId (requerido) - debe existir",
  "direccion": "string (requerido)",
  "estrellas": "number (requerido, 1-5)",
  "servicios": ["array de strings (opcional)"],
  "precioPorNoche": "number (requerido, > 0)"
}
```
- **Respuesta**: Hotel creado con ubicación poblada (201) o error de validación (400)

#### PUT /api/hoteles/:id
- **Descripción**: Actualiza un hotel existente
- **Parámetros**: `id` - ID del hotel
- **Body**: Campos a actualizar (con las mismas validaciones)
- **Respuesta**: Hotel actualizado con ubicación poblada o error 404

#### DELETE /api/hoteles/:id
- **Descripción**: Elimina un hotel
- **Parámetros**: `id` - ID del hotel
- **Respuesta**: Mensaje de confirmación o error 404

### Excursiones

#### GET /api/excursiones
- **Descripción**: Obtiene todas las excursiones
- **Query params opcionales**: `ubicacion` - Filtrar por ID de ubicación
- **Respuesta**: Array de excursiones con información de ubicación poblada

#### GET /api/excursiones/:id
- **Descripción**: Obtiene una excursión por ID
- **Parámetros**: `id` - ID de la excursión
- **Respuesta**: Objeto excursión con ubicación poblada o error 404

#### POST /api/excursiones
- **Descripción**: Crea una nueva excursión
- **Body requerido**:
```json
{
  "nombre": "string (requerido)",
  "descripcion": "string (opcional)",
  "ubicacion": "ObjectId (requerido) - debe existir",
  "duracion": "string (requerido)",
  "precio": "number (requerido)",
  "proveedor": "string (opcional)",
  "idiomas": ["array de strings (opcional)"],
  "activo": "boolean (opcional, default: true)"
}
```
- **Respuesta**: Excursión creada con ubicación poblada (201) o error de validación (400)

#### PUT /api/excursiones/:id
- **Descripción**: Actualiza una excursión existente
- **Parámetros**: `id` - ID de la excursión
- **Body**: Campos a actualizar (con las mismas validaciones)
- **Respuesta**: Excursión actualizada con ubicación poblada o error 404

#### DELETE /api/excursiones/:id
- **Descripción**: Elimina una excursión
- **Parámetros**: `id` - ID de la excursión
- **Respuesta**: Mensaje de confirmación o error 404

## Validaciones Implementadas

### Ubicaciones
- `nombre`, `pais`, `ciudad` son campos requeridos
- `codigoPostal` es opcional

### Hoteles
- `nombre`, `ubicacion`, `direccion`, `estrellas`, `precioPorNoche` son requeridos
- `estrellas` debe estar entre 1 y 5
- `precioPorNoche` debe ser mayor a 0
- `ubicacion` debe referenciar una ubicación existente
- `servicios` es un array opcional de strings

### Excursiones
- `nombre`, `ubicacion`, `duracion`, `precio` son requeridos
- `descripcion`, `proveedor`, `idiomas` son opcionales
- `activo` es opcional (default: true)
- `ubicacion` debe referenciar una ubicación existente
- `idiomas` es un array opcional de strings
- `precio` debe ser un número válido

## Relaciones
- Los hoteles tienen una referencia a ubicaciones mediante `ubicacion` (ObjectId)
- Las excursiones tienen una referencia a ubicaciones mediante `ubicacion` (ObjectId)
- Al consultar hoteles y excursiones, la información de ubicación se puebla automáticamente
- No se puede eliminar una ubicación si hay hoteles o excursiones que la referencian (validación a nivel de base de datos)

## Códigos de Estado HTTP
- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Error de validación o datos faltantes
- **404**: Recurso no encontrado
- **500**: Error interno del servidor