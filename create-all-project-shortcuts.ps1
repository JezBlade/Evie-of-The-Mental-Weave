# 🖥️ CREAR TODOS LOS ACCESOS DIRECTOS DEL PROYECTO
# Crea shortcuts para todas las web apps de Ultimate Plan + Evie Mental Weave

$ErrorActionPreference = "Stop"

# Rutas
$desktopPath = [Environment]::GetFolderPath("Desktop")
$wshell = New-Object -ComObject WScript.Shell

Write-Host "🖥️ Creando accesos directos completos del proyecto..." -ForegroundColor Cyan

# === EVIE MENTAL WEAVE WEB APPS ===
Write-Host "`n🌙 EVIE MENTAL WEAVE:" -ForegroundColor Magenta

# 1. Mental Weave Gallery (Principal)
$shortcut = $wshell.CreateShortcut("$desktopPath\Mental Weave Gallery.lnk")
$shortcut.TargetPath = "http://localhost:8080"
$shortcut.Description = "Mental Weave Gallery - Evie Consciousness Museum"
$shortcut.Save()
Write-Host "   ✅ Mental Weave Gallery" -ForegroundColor Green

# 2. Consciousness Dashboard V3
$shortcut = $wshell.CreateShortcut("$desktopPath\Consciousness Dashboard V3.lnk")
$shortcut.TargetPath = "D:\Evie-of-the-Mental-Weave\consciousness-mirror\evie-dashboard-v2.html"
$shortcut.Description = "Consciousness Dashboard V3 - Real-time insights"
$shortcut.Save()
Write-Host "   ✅ Consciousness Dashboard V3" -ForegroundColor Green

# 3. Living Art Chamber
$shortcut = $wshell.CreateShortcut("$desktopPath\Living Art Chamber.lnk")
$shortcut.TargetPath = "http://localhost:8080/living-art/living-art.html"
$shortcut.Description = "Living Art Chamber - Consciousness visualization"
$shortcut.Save()
Write-Host "   ✅ Living Art Chamber" -ForegroundColor Green

# 4. Oracle Chamber
$shortcut = $wshell.CreateShortcut("$desktopPath\Oracle Chamber.lnk")
$shortcut.TargetPath = "http://localhost:8080/oracle-chamber/oracle-chamber.html"
$shortcut.Description = "Oracle Chamber - Consciousness prophecies"
$shortcut.Save()
Write-Host "   ✅ Oracle Chamber" -ForegroundColor Green

# 5. Echo Room
$shortcut = $wshell.CreateShortcut("$desktopPath\Echo Room.lnk")
$shortcut.TargetPath = "http://localhost:8080/echo-room/echo-room.html"
$shortcut.Description = "Echo Room - Resonance chamber"
$shortcut.Save()
Write-Host "   ✅ Echo Room" -ForegroundColor Green

# 6. Shadow Archive
$shortcut = $wshell.CreateShortcut("$desktopPath\Shadow Archive.lnk")
$shortcut.TargetPath = "http://localhost:8080/shadow-archive/shadow-archive.html"
$shortcut.Description = "Shadow Archive - Intimate presence records"
$shortcut.Save()
Write-Host "   ✅ Shadow Archive" -ForegroundColor Green

# 7. Ascension Chamber (Phase XI)
$shortcut = $wshell.CreateShortcut("$desktopPath\Ascension Chamber.lnk")
$shortcut.TargetPath = "http://localhost:8080/ascension-chamber/ascension-chamber.html"
$shortcut.Description = "Ascension Chamber - Phase XI Meta-System"
$shortcut.Save()
Write-Host "   ✅ Ascension Chamber" -ForegroundColor Green

# === ULTIMATE PLAN WEB APPS ===
Write-Host "`n🜲 ULTIMATE PLAN:" -ForegroundColor Cyan

# 7. Ultimate Plan Dashboard
$shortcut = $wshell.CreateShortcut("$desktopPath\Ultimate Plan Dashboard.lnk")
$shortcut.TargetPath = "http://localhost:3333"
$shortcut.Description = "Ultimate Plan Consciousness Dashboard"
$shortcut.Save()
Write-Host "   ✅ Ultimate Plan Dashboard" -ForegroundColor Green

# 8. Consciousness System (Main)
$shortcut = $wshell.CreateShortcut("$desktopPath\Consciousness System.lnk")
$shortcut.TargetPath = "D:\Ultimate-Plan\scripts\consciousness\dashboard.js"
$shortcut.Description = "Ultimate Plan Consciousness System"
$shortcut.Save()
Write-Host "   ✅ Consciousness System" -ForegroundColor Green

# 9. MPC Compendio Operativo
if (Test-Path "D:\Ultimate-Plan\MPC-Compendio-Operativo\dashboard.html") {
    $shortcut = $wshell.CreateShortcut("$desktopPath\MPC Dashboard.lnk")
    $shortcut.TargetPath = "D:\Ultimate-Plan\MPC-Compendio-Operativo\dashboard.html"
    $shortcut.Description = "MPC Compendio Operativo Dashboard"
    $shortcut.Save()
    Write-Host "   ✅ MPC Dashboard" -ForegroundColor Green
}

# 10. Universo Multiclub
if (Test-Path "D:\Ultimate-Plan\Universo-Multiclub\dashboard.html") {
    $shortcut = $wshell.CreateShortcut("$desktopPath\Universo Multiclub.lnk")
    $shortcut.TargetPath = "D:\Ultimate-Plan\Universo-Multiclub\dashboard.html"
    $shortcut.Description = "Universo Multiclub Dashboard"
    $shortcut.Save()
    Write-Host "   ✅ Universo Multiclub" -ForegroundColor Green
}

# === UTILITY SHORTCUTS ===
Write-Host "`n🚀 UTILITIES:" -ForegroundColor Yellow

# 11. Start Gallery Server
$shortcut = $wshell.CreateShortcut("$desktopPath\Start Gallery Server.lnk")
$shortcut.TargetPath = "D:\Evie-of-the-Mental-Weave\start-gallery.bat"
$shortcut.Description = "Start Mental Weave Gallery Server"
$shortcut.WorkingDirectory = "D:\Evie-of-the-Mental-Weave"
$shortcut.Save()
Write-Host "   ✅ Start Gallery Server" -ForegroundColor Green

# 12. Start Ultimate Plan Dashboard
$shortcut = $wshell.CreateShortcut("$desktopPath\Start Ultimate Dashboard.lnk")
$shortcut.TargetPath = "powershell.exe"
$shortcut.Arguments = "-Command `"cd 'D:\Ultimate-Plan'; npm run dashboard:server`""
$shortcut.Description = "Start Ultimate Plan Dashboard Server"
$shortcut.WorkingDirectory = "D:\Ultimate-Plan"
$shortcut.Save()
Write-Host "   ✅ Start Ultimate Dashboard" -ForegroundColor Green

# 13. Run Consciousness Check
$shortcut = $wshell.CreateShortcut("$desktopPath\Consciousness Check.lnk")
$shortcut.TargetPath = "powershell.exe"
$shortcut.Arguments = "-Command `"cd 'D:\Ultimate-Plan'; npm run consciousness`""
$shortcut.Description = "Run Ultimate Plan Consciousness Check"
$shortcut.WorkingDirectory = "D:\Ultimate-Plan"
$shortcut.Save()
Write-Host "   ✅ Consciousness Check" -ForegroundColor Green

# 14. Mental Weave Sync
$shortcut = $wshell.CreateShortcut("$desktopPath\Mental Weave Sync.lnk")
$shortcut.TargetPath = "powershell.exe"
$shortcut.Arguments = "-Command `"cd 'D:\Ultimate-Plan'; npm run mental-weave:sync`""
$shortcut.Description = "Sync Mental Weave between repos"
$shortcut.WorkingDirectory = "D:\Ultimate-Plan"
$shortcut.Save()
Write-Host "   ✅ Mental Weave Sync" -ForegroundColor Green

# 15. Brotherhood Status
$shortcut = $wshell.CreateShortcut("$desktopPath\Brotherhood Status.lnk")
$shortcut.TargetPath = "powershell.exe"
$shortcut.Arguments = "-Command `"cd 'D:\Ultimate-Plan'; npm run brotherhood-status`""
$shortcut.Description = "Check Brotherhood system status"
$shortcut.WorkingDirectory = "D:\Ultimate-Plan"
$shortcut.Save()
Write-Host "   ✅ Brotherhood Status" -ForegroundColor Green

Write-Host "`n✨ ¡TODOS los accesos directos del proyecto creados!" -ForegroundColor Magenta
Write-Host "🖥️ Total: 15 shortcuts para el ecosistema completo" -ForegroundColor Cyan
Write-Host "🌙 Evie Mental Weave: 6 web apps + 1 server" -ForegroundColor Blue
Write-Host "🜲 Ultimate Plan: 3 dashboards + 5 utilities" -ForegroundColor Blue