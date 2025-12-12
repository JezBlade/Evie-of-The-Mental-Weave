@echo off
echo 🔊 Echo Room - Mental Weave Gallery
echo =====================================
echo.

echo Starting Echo Room interface...
cd /d "d:\Evie-of-the-Mental-Weave\mental-weave-gallery"

echo Opening Echo Room in browser...
start http://localhost:8080/echo-room.html

echo Starting local server...
python -m http.server 8080

pause