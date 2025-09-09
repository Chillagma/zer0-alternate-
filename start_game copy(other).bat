@echo off
cd /d "%~dp0"
echo Starting server...
start "" /MIN cmd /c "node online_multiplayer.js"

:: wait a bit for server to boot
timeout /t 2 >nul

:: start LocalTunnel on port 3000 with custom subdomain
start "" cmd /k "lt --port 3000 --subdomain myfpsgame"

:: open localhost for YOU (testing)
start http://localhost:3000/the_copy.html

echo.
echo =======================================
echo Share this link with your friends:
echo https://myfpsgame.loca.lt/the_copy.html
echo =======================================
echo.
pause
