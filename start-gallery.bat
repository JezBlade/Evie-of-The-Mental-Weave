@echo off
echo 🖼️ Mental Weave Gallery - Servidor Local
echo ======================================
echo.
echo Iniciando servidor HTTP en puerto 8080...
echo.
echo Accede a la galería en: http://localhost:8080
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
cd /d "%~dp0mental-weave-gallery"
python -m http.server 8080
