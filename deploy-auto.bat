@echo off
echo ========================================
echo   Auto Deploy to Netlify
echo ========================================
echo.

:loop
echo [%date% %time%] Building and deploying...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Waiting 5 seconds before retry...
    timeout /t 5 /nobreak >nul
    goto loop
)

call netlify deploy --prod --dir=dist
if %errorlevel% neq 0 (
    echo Deploy failed! Waiting 5 seconds before retry...
    timeout /t 5 /nobreak >nul
    goto loop
)

echo.
echo ✅ Successfully deployed!
echo.
echo Watching for file changes in src/ directory...
echo Press Ctrl+C to stop
echo.

timeout /t 10 /nobreak >nul
goto loop

