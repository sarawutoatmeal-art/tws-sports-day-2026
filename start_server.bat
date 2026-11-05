@echo off
title TWS Sports Day 2026 Kingdom Games Web Server
cd /d "%~dp0"
echo ==============================================================
echo   TECHAWIT SCHOOL - TWS SPORTS DAY 2026: THE KINGDOM GAMES
echo   Starting local portal server on port 8080...
echo ==============================================================
echo.
echo Opening http://localhost:8080 in your default browser...
start http://localhost:8080
powershell -ExecutionPolicy Bypass -Command "& { $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://*:8080/'); $listener.Start(); Write-Host 'Server running at http://localhost:8080/ (Press Ctrl+C to stop)'; while($listener.IsListening){ $context = $listener.GetContext(); $path = $context.Request.Url.LocalPath.TrimStart('/'); if([string]::IsNullOrEmpty($path) -or $path -eq '/'){ $path = 'index.html' }; $filePath = Join-Path (Get-Location) $path; if(Test-Path $filePath -PathType Leaf){ $bytes = [System.IO.File]::ReadAllBytes($filePath); $ext = [System.IO.Path]::GetExtension($filePath).ToLower(); switch($ext){ '.html' { $context.Response.ContentType = 'text/html; charset=utf-8' } '.js' { $context.Response.ContentType = 'application/javascript; charset=utf-8' } '.css' { $context.Response.ContentType = 'text/css; charset=utf-8' } '.jpg' { $context.Response.ContentType = 'image/jpeg' } '.png' { $context.Response.ContentType = 'image/png' } default { $context.Response.ContentType = 'application/octet-stream' } }; $context.Response.ContentLength64 = $bytes.Length; $context.Response.OutputStream.Write($bytes, 0, $bytes.Length); $context.Response.Close() } else { $context.Response.StatusCode = 404; $err = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found'); $context.Response.OutputStream.Write($err, 0, $err.Length); $context.Response.Close() } } }"
pause
