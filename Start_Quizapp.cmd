@echo off
cd C:\Users\Aldalati\Desktop\3.Semester\Sofetware and System Entwicklung


start cmd /k "code UI && exit"

start cmd /k "code Server && exit"




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
