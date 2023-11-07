@echo off

for %%I in ("%~dp0.") do set "script_dir=%%~fI"

cd %script_dir%
cd .. 

start cmd /k "code Projekt"

start cmd /k "cd Server && npm i"

start cmd /k "cd UI && npm i"

timeout /t 80

start cmd /k "cd Server && npm start"

start cmd /k "cd UI && npm start"

:input
echo "Entwicklung Ubgebungen Gestarten : ) geben Sie exit zum beenden"
set /p userInput=

:while_loop
if "%userInput%" NEQ "beenden" (
	:input
	echo "Entwicklung Ubgebungen Gestarten : ) geben Sie exit zum beenden"
	set /p userInput=
	
)

set "ProcessName=Code.exe"

tasklist /FI "IMAGENAME eq %ProcessName%" | find /I "%ProcessName%" > nul

if %errorlevel%==0 (
	taskkill /F /IM Code.exe
    echo The process %ProcessName% is killed.
) else (
    echo The process %ProcessName% is not running.
)
