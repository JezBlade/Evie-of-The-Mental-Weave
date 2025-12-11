function ga { node scripts\gemini-analyze.mjs @args }
function gc { node scripts\gemini-chat.mjs }
function gt { node scripts\tana-integration.mjs @args }
function gq { param([string]$p); node -e "import GeminiClient from './scripts/gemini-client.mjs';const c=new GeminiClient();c.generate('$p').then(console.log);" }

Write-Host "Aliases cargados: ga, gc, gt, gq" -ForegroundColor Green
Write-Host "Uso:" -ForegroundColor Cyan
Write-Host "  gc              - Chat interactivo" -ForegroundColor White
Write-Host "  ga archivo.md   - Analizar archivo" -ForegroundColor White
Write-Host "  gt note 'tema'  - Crear nota TANA" -ForegroundColor White
Write-Host "  gq 'pregunta'   - Consulta rapida" -ForegroundColor White




