# Testing Checklist - Dog Team Manager

Checklist de tests a desarrollar, organizados de menor a mayor complejidad.

---

## NIVEL 1: Tests Unitarios Simples

### `Pagination`
- [x] Renderizado básico: No renderiza nada cuando `totalPages` es 1
- [x] Botones de navegación: Muestra "Previous" y "Next"
- [x] Estado inicial del botón Previous: Deshabilitado en página 1
- [x] Estado del botón Next en última página: Deshabilitado
- [x] Cálculo de páginas visibles: Muestra correctamente los números con elipsis ("...") para muchas páginas

### `Navbar`
- [x] Links presentes: Existen los links a "/" y "/my-team"
- [x] Texto del logo: Muestra "Dog Team Manager"

### `Search`
- [x] Input con placeholder "Search"
- [x] Textbox vacío al renderizar
- [x] Muestra todas las razas cuando el input está vacío

---

## NIVEL 2: Tests con Interacción del Usuario

### `Pagination` (interacciones)
- [x] Click en número de página: Llama `onPageChange` con el número correcto
- [x] Click en Previous: Llama `onPageChange(currentPage - 1)`
- [x] Click en Next: Llama `onPageChange(currentPage + 1)`

### `Search` (con timers/debounce)
- [ ] Debounce funciona: El filtrado NO ocurre inmediatamente
- [ ] Debounce timing: Después de 500ms se aplica el filtro
- [ ] Cancelación de debounce: Si el usuario escribe rápido, solo se aplica el último valor
- [ ] Mensaje "No results found" cuando el filtro no encuentra coincidencias
- [ ] Búsqueda case-insensitive: "BREED1" encuentra "breed1"
- [ ] Búsqueda con espacios en blanco no filtra

---

## NIVEL 3: Tests de Componentes con Context

### `DogCard`
- [ ] Renderizado con imagen: Muestra la imagen del perro
- [ ] Botón "Add to my Team": Cuando el perro NO está en el equipo
- [ ] Botón "Remove from my Team": Cuando el perro SÍ está en el equipo
- [ ] Click en agregar: Llama a `addToTeam` con los parámetros correctos
- [ ] Click en remover: Llama a `removeFromTeam` con los parámetros correctos

### `MyTeam`
- [ ] Equipo vacío: Muestra mensaje de invitación con link a home
- [ ] Contador de perros: Muestra "Total dogs: X" correctamente
- [ ] Agrupación por raza: Los perros se muestran agrupados por raza
- [ ] Múltiples razas: Con 2-3 razas diferentes, verifica la estructura

### `DogsList`
- [ ] Renderizado inicial: Muestra máximo 12 perros
- [ ] Integración con paginación: La paginación aparece cuando hay más de 12 imágenes
- [ ] Cambio de página: Al cambiar página, cambian los perros mostrados

---

## NIVEL 4: Tests de Lógica de Negocio (TeamContext)

### Reglas del equipo
- [ ] Agregar perro a equipo vacío: `totalDogs` incrementa
- [ ] Límite de 10 perros: El perro #11 muestra error
- [ ] Límite de 3 por raza: El 4to perro de una raza muestra error
- [ ] Remover perro: `totalDogs` decrementa
- [ ] Remover último de una raza: La raza desaparece del objeto `dogs`
- [ ] No agregar duplicados: Un perro con el mismo `id` no se agrega dos veces

### Persistencia en localStorage
- [ ] Guardar en localStorage: Al agregar un perro, se guarda
- [ ] Cargar desde localStorage: Al montar el provider, carga el equipo guardado
- [ ] localStorage corrupto: Si tiene JSON inválido, no crashea

---

## NIVEL 5: Tests de Integración (Flujos de Usuario)

### Flujo: Buscar y seleccionar raza
- [ ] Usuario busca una raza: Escribe, espera debounce, ve resultados filtrados
- [ ] Usuario hace click en una raza: El link navega a `/breed/[slug]`

### Flujo: Armar un equipo
- [ ] Usuario agrega varios perros de diferentes razas: Estado final correcto
- [ ] Usuario intenta exceder límites: Aparece el modal de error
- [ ] Usuario cierra el modal de error: El modal se cierra correctamente

### Flujo: Gestionar equipo existente
- [ ] Usuario con equipo guardado visita /my-team: Ve sus perros
- [ ] Usuario remueve un perro del equipo: Contador actualiza, perro desaparece
- [ ] Usuario vacía su equipo: Ve el mensaje de equipo vacío

---

## NIVEL 6: Tests de API Routes

### `/api/breeds`
- [ ] Respuesta exitosa: Mock de fetch exitoso, retorna las razas
- [ ] Error en la API externa: Mock de fetch fallido, retorna error 500
- [ ] Excepción de red: Simular network error, manejo correcto

### `/api/images-by-breed`
- [ ] Con parámetro breed válido: Retorna las imágenes
- [ ] Sin parámetro breed: Comportamiento con parámetro faltante
- [ ] Error en la API externa: Manejo de errores

---

## Progreso

| Nivel | Completados | Total |
|-------|-------------|-------|
| 1     | 10          | 10    |
| 2     | 3           | 9     |
| 3     | 0           | 12    |
| 4     | 0           | 9     |
| 5     | 0           | 8     |
| 6     | 0           | 6     |
| **Total** | **13**  | **54** |
