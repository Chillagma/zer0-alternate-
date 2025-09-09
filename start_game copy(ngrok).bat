@echo off
@echo off
cd /d "%~dp0"
echo Starting server...
start "" /MIN cmd /c "node online_multiplayer.js"

:: wait a bit for server to boot
timeout /t 2 >nul

:: start ngrok on port 3000
start "" cmd /k "ngrok http 3000"

:: open localhost for YOU (testing)
start http://localhost:3000/the_copy.html

echo.
echo =======================================
echo Once ngrok starts, it will show a public URL in the cmd window
echo Share that URL with your friends:
echo =======================================
echo.
pause
