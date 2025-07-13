# Portfolio Ismael Piña Ramos - TypeScript

Portfolio personal desarrollado con TypeScript, HTML5 y CSS3.

## 🚀 Características

- **TypeScript**: Código tipado y seguro
- **Arquitectura modular**: Código organizado en clases y interfaces
- **Responsive**: Diseño adaptativo para móvil y escritorio
- **Efectos interactivos**: Cursor personalizado, animaciones y efectos visuales
- **Navegación suave**: Scroll suave entre secciones
- **Menú hamburguesa**: Navegación móvil optimizada

## 📁 Estructura del Proyecto

```
PortfolioIsmaelPR/
├── src/
│   ├── types.ts          # Interfaces y tipos TypeScript
│   ├── scripts.ts        # Script principal (completo)
│   └── scripts-simple.ts # Script simplificado
├── dist/                 # Archivos compilados (generado)
├── css/
│   └── style.css         # Estilos CSS
├── images/               # Imágenes del portfolio
├── tsconfig.json         # Configuración TypeScript
├── package.json          # Dependencias y scripts
└── index.html           # Página principal
```

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js >= 18.0.0
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Desarrollo con watch mode
npm run build:watch

# Verificar tipos
npm run type-check
```

### Scripts Disponibles

- `npm run build`: Compila TypeScript a JavaScript
- `npm run build:watch`: Compila en modo watch
- `npm run dev`: Compila y ejecuta servidor de desarrollo
- `npm run clean`: Limpia archivos compilados
- `npm run type-check`: Verifica tipos sin compilar

## 🔧 Configuración TypeScript

El proyecto usa una configuración TypeScript estricta con:

- **Target**: ES2020
- **Strict mode**: Habilitado
- **Source maps**: Generados para debugging
- **Declarations**: Archivos .d.ts generados
- **OutDir**: `./dist`
- **RootDir**: `./src`

## 📝 Principales Mejoras Implementadas

### 1. **Migración a TypeScript**
- ✅ Código JavaScript convertido a TypeScript
- ✅ Tipado estricto en todas las funciones
- ✅ Interfaces y tipos definidos
- ✅ Enums para constantes

### 2. **Arquitectura Mejorada**
- ✅ Clases organizadas (`PortfolioApp`, `SimplePortfolioApp`)
- ✅ Estado centralizado (`AppState`)
- ✅ Configuración global (`CONFIG`)
- ✅ Separación de responsabilidades

### 3. **Corrección de Errores**
- ✅ Eliminación de variables globales no declaradas
- ✅ Manejo correcto de tipos null/undefined
- ✅ Event listeners tipados correctamente
- ✅ Eliminación de código duplicado

### 4. **Buenas Prácticas**
- ✅ Uso de `const` para configuraciones
- ✅ Métodos privados/públicos bien definidos
- ✅ Manejo de errores mejorado
- ✅ Logging estructurado

## 🎯 Funcionalidades Principales

### Menú Hamburguesa
- Navegación responsive
- Cambio dinámico de colores según sección
- Animaciones suaves
- Cierre con Escape y clic fuera

### Scroll Suave
- Navegación entre secciones
- Offset automático para header
- Diferentes comportamientos móvil/escritorio

### Cursor Personalizado
- Solo activo en escritorio
- Efectos hover en elementos interactivos
- Responsive handling

### Efectos Visuales
- Partículas de éxito
- Animaciones de botones
- Efectos de persecución (versión completa)

## 🔄 Migración desde JavaScript

### Archivos Migrados
- `src/scripts.ts` (antes `js/scripts.js`)
- `src/scripts-simple.ts` (antes `js/scripts-simple.js`)
- Nuevo: `src/types.ts` (interfaces y tipos)

### Cambios Principales
1. **Tipado**: Todas las variables y funciones tienen tipos
2. **Clases**: Código organizado en clases TypeScript
3. **Interfaces**: Contratos claros para objetos
4. **Enums**: Constantes tipadas
5. **Configuración**: Valores centralizados y tipados

## 🚨 Notas Importantes

- El código fuente ahora está en `src/`
- El HTML apunta a `dist/scripts.js` (compilado)
- Para desarrollo, usar `npm run build:watch`
- Verificar tipos antes de commit: `npm run type-check`

## 📞 Soporte

Para cualquier problema o mejora, revisar:
1. Logs de consola para errores
2. Verificación de tipos: `npm run type-check`
3. Compilación: `npm run build`

---

**Desarrollado con ❤️ por Ismael Piña Ramos** 