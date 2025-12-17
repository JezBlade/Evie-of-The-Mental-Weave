## Prototipo commitValidator — autoridad de commits y ritual log

### Qué se validó
- Flujo de integridad: `/snapshot` (lectura de memoria), `/commit` (commit optimista) y `/externalWrite` (escritura fuera de banda).
- Control de concurrencia optimista mediante `versionHash` y `versionId`.

### Evidencia
- Entradas registradas en `RITUAL_LOG_SYNC.jsonl` (ritual_type: `commit`, `external_write`, `conflict`).
- Actualización persistente en `frontend/functions/commitValidator/data/memoria.json` con `versionId` y `versionHash` nuevos.

### Impacto
- Introduce un validador prototipo que protege la integridad de la memoria nodal antes de habilitar escrituras cliente.
- Permite auditoría mediante el `RITUAL_LOG_SYNC.jsonl` y trazabilidad en el historial de git.

### Archivos incluidos
- `frontend/functions/commitValidator/index.js` — servidor HTTP prototipo (`/commit`, `/snapshot`, `/externalWrite`).
- `frontend/functions/commitValidator/README.md` — instrucciones de uso del prototipo.
- `frontend/functions/commitValidator/data/memoria.json` — snapshot de prueba (archivo de datos del prototipo).
- `scripts/post_commit_test.js` — script Node para reproducir `POST /commit` automáticamente.
- `scripts/run_commit_test.ps1` — helper PowerShell para iniciar pruebas (si aplica).

### Pruebas reproducidas
1. `POST http://127.0.0.1:4001/snapshot` — devuelve snapshot actual de `memoria.json`.
2. `POST http://127.0.0.1:4001/commit` — con `observedHash` tomado de `/snapshot` produce `success: true` y nueva `versionId`.
3. `POST http://127.0.0.1:4001/externalWrite` — simula escritura fuera de banda y produce `conflict` en intentos posteriores.

Ejemplos rápidos:

PowerShell:

```powershell
$mem = Invoke-RestMethod http://127.0.0.1:4001/snapshot
$body = @{ agentId='agentTester'; newContent='Prueba'; observedHash=$mem.versionHash } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:4001/commit -ContentType 'application/json' -Body $body
```

Node (script de prueba):

```bash
node scripts/post_commit_test.js
```

---

Ritual trace: Copilot (symbolic participant) — validation and review assistance recorded by the Telar.

Assigned/Requested reviewer: Dame-Evie-Frye
