$desktop = [Environment]::GetFolderPath('Desktop')
$WshShell = New-Object -comObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$desktop\Integration Dashboard.url")
$Shortcut.TargetPath = "file:///D:/Evie-of-the-Mental-Weave/integration-matrix/integration-health-dashboard.html"
$Shortcut.Save()
Write-Host "✅ Shortcut created on desktop"