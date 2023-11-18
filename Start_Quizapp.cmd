@echo off

for %%I in ("%~dp0.") do set "script_dir=%%~fI"

cd %script_dir%

start cmd /k "cd Server && npm install && exit"
start cmd /k "cd UI && npm install && exit"

timeout /t 10 /nobreak

start cmd /k "cd Server && npm start"
start cmd /k "cd UI && npm start"

start cmd /k "code Server && exit"
start cmd /k "code UI && exit"

