#!/bin/bash

# Script para reorganizar la estructura del proyecto Portfolio
echo "Iniciando reorganización del proyecto..."

# Crear estructura de carpetas
echo "Creando estructura de carpetas..."
mkdir -p css
mkdir -p js
mkdir -p images
mkdir -p assets/fonts
mkdir -p assets/videos

# Mover archivos CSS
echo "Moviendo archivos CSS..."
find . -maxdepth 1 -name "*.css" -exec mv {} css/ \;

# Mover archivos JavaScript
echo "Moviendo archivos JavaScript..."
find . -maxdepth 1 -name "*.js" -exec mv {} js/ \;

# Mover archivos de imágenes
echo "Moviendo archivos de imágenes..."
find . -maxdepth 1 \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" -o -name "*.webp" -o -name "*.ico" \) -exec mv {} images/ \;

# Mover archivos de fuentes
echo "Moviendo archivos de fuentes..."
find . -maxdepth 1 \( -name "*.ttf" -o -name "*.woff" -o -name "*.woff2" -o -name "*.eot" -o -name "*.otf" \) -exec mv {} assets/fonts/ \;

# Mover archivos de videos
echo "Moviendo archivos de videos..."
find . -maxdepth 1 \( -name "*.mp4" -o -name "*.webm" -o -name "*.ogg" -o -name "*.avi" -o -name "*.mov" \) -exec mv {} assets/videos/ \;

# Actualizar rutas en index.html
echo "Actualizando rutas en index.html..."
if [ -f "index.html" ]; then
    # Rutas de CSS
    sed -i 's|href="\([^"]*\.css\)"|href="css/\1"|g' index.html
    sed -i 's|href="css/css/|href="css/|g' index.html
    
    # Rutas de JavaScript
    sed -i 's|src="\([^"]*\.js\)"|src="js/\1"|g' index.html
    sed -i 's|src="js/js/|src="js/|g' index.html
    
    # Rutas de imágenes
    sed -i 's|src="\([^"]*\.\(png\|jpg\|jpeg\|gif\|svg\|webp\|ico\)\)"|src="images/\1"|g' index.html
    sed -i 's|src="images/images/|src="images/|g' index.html
    
    # Rutas de fuentes
    sed -i 's|url("\([^"]*\.\(ttf\|woff\|woff2\|eot\|otf\)\)")"|url("assets/fonts/\1")|g' index.html
    sed -i 's|url("assets/fonts/assets/fonts/|url("assets/fonts/|g' index.html
    
    # Rutas de videos
    sed -i 's|src="\([^"]*\.\(mp4\|webm\|ogg\|avi\|mov\)\)"|src="assets/videos/\1"|g' index.html
    sed -i 's|src="assets/videos/assets/videos/|src="assets/videos/|g' index.html
fi

# Actualizar rutas en archivos CSS
echo "Actualizando rutas en archivos CSS..."
for cssfile in css/*.css; do
    if [ -f "$cssfile" ]; then
        # Rutas de imágenes en CSS
        sed -i 's|url("\([^"]*\.\(png\|jpg\|jpeg\|gif\|svg\|webp\|ico\)\)")"|url("../images/\1")|g' "$cssfile"
        sed -i 's|url("../images/../images/|url("../images/|g' "$cssfile"
        
        # Rutas de fuentes en CSS
        sed -i 's|url("\([^"]*\.\(ttf\|woff\|woff2\|eot\|otf\)\)")"|url("../assets/fonts/\1")|g' "$cssfile"
        sed -i 's|url("../assets/fonts/../assets/fonts/|url("../assets/fonts/|g' "$cssfile"
        
        # Rutas de videos en CSS
        sed -i 's|url("\([^"]*\.\(mp4\|webm\|ogg\|avi\|mov\)\)")"|url("../assets/videos/\1")|g' "$cssfile"
        sed -i 's|url("../assets/videos/../assets/videos/|url("../assets/videos/|g' "$cssfile"
    fi
done

echo "Reorganización completada!"
echo "Estructura final:"
echo "├── css/"
echo "├── js/"
echo "├── images/"
echo "├── assets/"
echo "│   ├── fonts/"
echo "│   └── videos/"
echo "└── index.html"
