@echo off
:: Check if the script is running as admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Requesting admin privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c %~f0' -Verb RunAs"
    exit /b
)

:: Set the working directory to the script location
cd /d %~dp0

:: Run the Python script
python main.py
pause
