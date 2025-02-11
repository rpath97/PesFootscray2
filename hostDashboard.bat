@ECHO OFF

REM Get the current directory path (where the .bat file is located)
SET CURRENT_DIR=%~dp0
SET PORT=8081

REM Check if the port is in use

REM host webpage in current source code folder
cd /d CURRENT_DIR
python -m server 8081 -b 0.0.0.0

REM Add the command to the registry (Run key)
REM REG ADD HKCU\Software\Microsoft\Windows\CurrentVersion\Run /v "HostSourceCode" /t REG_SZ /d "cmd /k cd /d %CURRENT_DIR% & python -m server 8081 -b 0.0.0.0"

REM ECHO Command added to registry. Web server will start on reboot.
PAUSE
