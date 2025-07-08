@echo off
cd /d "%~dp0"
echo Starting server...
start "" /MIN cmd /c "node online_multiplayer.js"
timeout /t 2 >nul
start http://localhost:3000/the_copy.html
pause