# 1. Crear la nueva estructura de carpetas profesionales
New-Item -ItemType Directory -Force -Path "src/core/hooks", "src/core/services", "src/core/types", "src/core/constants", "src/components/shared", "src/components/characters", "src/app/(auth)"

# 2. Mover la Lógica de Negocio a @/core
Write-Host "Organizando Capa de Datos (Core)..." -ForegroundColor Cyan
Move-Item -Path "src/hooks/*" -Destination "src/core/hooks/" -ErrorAction SilentlyContinue
Move-Item -Path "src/services/*" -Destination "src/core/services/" -ErrorAction SilentlyContinue
Move-Item -Path "src/types/*" -Destination "src/core/types/" -ErrorAction SilentlyContinue
Move-Item -Path "src/constants/*" -Destination "src/core/constants/" -ErrorAction SilentlyContinue

# 3. Limpiar la carpeta App y mover componentes a @/components
Write-Host "Limpiando Directorio de Rutas (App)..." -ForegroundColor Cyan

# Mover componentes específicos de personajes
Move-Item -Path "src/app/characters/components/*" -Destination "src/components/characters/" -ErrorAction SilentlyContinue
Remove-Item -Path "src/app/characters/components" -Recurse -ErrorAction SilentlyContinue

# Mover esqueletos y estados de error a Shared
Move-Item -Path "src/app/components/skeletons/*" -Destination "src/components/shared/" -ErrorAction SilentlyContinue
Move-Item -Path "src/app/components/ErrorState.tsx" -Destination "src/components/shared/" -ErrorAction SilentlyContinue
Move-Item -Path "src/app/components/*" -Destination "src/components/" -ErrorAction SilentlyContinue

# 4. Organizar Rutas de Autenticación (Group Routes)
Write-Host "Organizando Rutas de Auth..." -ForegroundColor Cyan
Move-Item -Path "src/app/login" -Destination "src/app/(auth)/" -ErrorAction SilentlyContinue
Move-Item -Path "src/app/register" -Destination "src/app/(auth)/" -ErrorAction SilentlyContinue

# 5. Mover archivos de configuración a Lib
Write-Host "Acomodando archivos de configuración..." -ForegroundColor Cyan
Move-Item -Path "src/auth.ts" -Destination "src/lib/" -ErrorAction SilentlyContinue

# 6. Limpieza de carpetas vacías
Remove-Item -Path "src/hooks", "src/services", "src/types", "src/constants", "src/app/components" -Recurse -ErrorAction SilentlyContinue

Write-Host "¡Refactorización completada, Andrés! Revisa tu estructura." -ForegroundColor Green