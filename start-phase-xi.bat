@echo off
echo 🜂 Phase XI - Ascension Chamber
echo ================================
echo.

echo Activating Phase XI systems...
cd /d "d:\Evie-of-the-Mental-Weave\mental-weave-gallery"

echo Opening Ascension Chamber...
start http://localhost:8080/ascension-chamber.html

echo Starting local server...
python -m http.server 8080

pause