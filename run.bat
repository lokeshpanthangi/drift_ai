@echo off
echo ==========================================
echo Starting Drift AI Application
echo ==========================================
echo.

echo [1/4] Installing frontend dependencies...
cd _frontend
call npm install
if errorlevel 1 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)
echo.

echo [2/4] Installing backend dependencies...
cd ..
pip install -r requirements.txt
if errorlevel 1 (
    echo Backend dependency installation failed!
    pause
    exit /b 1
)
echo.

echo [3/4] Starting backend server...
start "Backend - Uvicorn" cmd /k "python -m uvicorn main:app --reload"
timeout /t 3 /nobreak >nul
echo.

echo [4/4] Starting frontend server...
cd _frontend
start "Frontend - Vite" cmd /k "npm run dev"
echo.

echo ==========================================
echo Both servers are starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:8080
echo ==========================================
echo.
echo Press any key to stop all servers...
pause >nul

echo Stopping servers...
taskkill /FI "WINDOWTITLE eq Backend - Uvicorn*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Frontend - Vite*" /F >nul 2>&1
echo Servers stopped.
