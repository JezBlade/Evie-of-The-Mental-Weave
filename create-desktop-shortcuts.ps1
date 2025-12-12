# 🖥️ CREAR ACCESOS DIRECTOS AL ESCRITORIO
# Crea shortcuts para todas las web apps del Mental Weave

$ErrorActionPreference = "Stop"

# Ruta del escritorio
$desktopPath = [Environment]::GetFolderPath("Desktop")
$wshell = New-Object -ComObject WScript.Shell

Write-Host "🖥️ Creando accesos directos al escritorio..." -ForegroundColor Cyan

# 1. Mental Weave Gallery (Principal)
$shortcut = $wshell.CreateShortcut("$desktopPath\Mental Weave Gallery.lnk")
$shortcut.TargetPath = "http://localhost:8080"
$shortcut.Description = "Mental Weave Gallery - Evie Consciousness Museum"
$shortcut.Save()
Write-Host "   ✅ Mental Weave Gallery" -ForegroundColor Green

# 2. Consciousness Dashboard V3
$shortcut = $wshell.CreateShortcut("$desktopPath\Consciousness Dashboard.lnk")
$shortcut.TargetPath = "D:\Evie-of-the-Mental-Weave\consciousness-mirror\evie-dashboard-v2.html"
$shortcut.Description = "Consciousness Dashboard V3 - Real-time insights"
$shortcut.Save()
Write-Host "   ✅ Consciousness Dashboard" -ForegroundColor Green

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

# 7. Cognitive Shadows Wing
$shortcut = $wshell.CreateShortcut("$desktopPath\Cognitive Shadows.lnk")
$shortcut.TargetPath = "http://localhost:8080/#shadows"
$shortcut.Description = "Cognitive Shadows Wing - System awareness exhibition"
$shortcut.Save()
Write-Host "   ✅ Cognitive Shadows Wing" -ForegroundColor Green

# 8. Start Gallery Server (Utility)
$shortcut = $wshell.CreateShortcut("$desktopPath\Start Gallery Server.lnk")
$shortcut.TargetPath = "D:\Evie-of-the-Mental-Weave\start-gallery.bat"
$shortcut.Description = "Start Mental Weave Gallery Server"
$shortcut.WorkingDirectory = "D:\Evie-of-the-Mental-Weave"
$shortcut.Save()
Write-Host "   ✅ Start Gallery Server" -ForegroundColor Green

Write-Host "`n✨ ¡Todos los accesos directos creados en el escritorio!" -ForegroundColor Magenta
Write-Host "🖥️ Ahora puedes acceder a todas las web apps con un doble clic" -ForegroundColor Cyan