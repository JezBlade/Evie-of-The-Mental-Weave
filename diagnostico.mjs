import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const root = 'D:\\Evie-of-the-Mental-Weave';
const issues = [];
const ok = [];

// 1. Verificar estructura de directorios
const requiredDirs = ['scripts', 'memory/gemini', 'logs', 'tana-notes'];
requiredDirs.forEach(dir => {
    const path = join(root, dir);
    if (existsSync(path)) {
        ok.push(`✅ Directorio: ${dir}`);
    } else {
        issues.push(`❌ FALTA: ${dir}`);
    }
});

// 2. Verificar archivos críticos
const requiredFiles = [
    '.env',
    'package.json',
    'scripts/gemini-client.mjs',
    'scripts/gemini-chat.mjs',
    'scripts/gemini-analyze.mjs',
    'scripts/tana-integration.mjs',
    'gemini-aliases.ps1',
    'rituales.md',
    'bitacora.md'
];

requiredFiles.forEach(file => {
    const path = join(root, file);
    if (existsSync(path)) {
        ok.push(`✅ Archivo: ${file}`);
    } else {
        issues.push(`❌ FALTA: ${file}`);
    }
});

// 3. Verificar .env
const envPath = join(root, '.env');
if (existsSync(envPath)) {
    const env = readFileSync(envPath, 'utf8');
    if (env.includes('GEMINI_API_KEY')) {
        const key = env.match(/GEMINI_API_KEY=(.+)/)?.[1];
        if (key && key.length > 20) {
            ok.push(`✅ API Key configurada (${key.substring(0, 20)}...)`);
        } else {
            issues.push(`❌ API Key inválida o vacía`);
        }
    } else {
        issues.push(`❌ GEMINI_API_KEY no encontrada en .env`);
    }
    
    if (env.includes('GEMINI_MODEL')) {
        ok.push(`✅ Modelo configurado`);
    } else {
        issues.push(`⚠️ GEMINI_MODEL no configurado`);
    }
}

// 4. Verificar dependencias
const pkgPath = join(root, 'package.json');
if (existsSync(pkgPath)) {
    try {
        const pkgContent = readFileSync(pkgPath, 'utf8').replace(/^\uFEFF/, '');
        const pkg = JSON.parse(pkgContent);
    if (pkg.dependencies?.['@google/generative-ai']) {
        ok.push(`✅ Dependencia: @google/generative-ai`);
    } else {
        issues.push(`❌ FALTA: @google/generative-ai`);
    }
    
    if (pkg.dependencies?.['dotenv']) {
        ok.push(`✅ Dependencia: dotenv`);
    } else {
        issues.push(`❌ FALTA: dotenv`);
    }
    
    if (pkg.type === 'module') {
        ok.push(`✅ Package type: module`);
    } else {
        issues.push(`⚠️ Package type no es "module"`);
    }
    } catch (error) {
        issues.push(`❌ Error leyendo package.json: ${error.message}`);
    }
}

// 5. Verificar node_modules
if (existsSync(join(root, 'node_modules'))) {
    ok.push(`✅ node_modules instalado`);
} else {
    issues.push(`❌ FALTA: node_modules (ejecutar npm install)`);
}

// 6. Verificar sincronización con Ultimate Plan
const syncScript = 'D:\\Ultimate-Plan\\scripts\\sync-gemini-evie.ps1';
if (existsSync(syncScript)) {
    ok.push(`✅ Script de sincronización existe`);
} else {
    issues.push(`⚠️ Script de sincronización no encontrado`);
}

// 7. Verificar logs
const memoryPath = join(root, 'memory', 'gemini');
if (existsSync(memoryPath)) {
    const files = readdirSync(memoryPath);
    if (files.length > 0) {
        ok.push(`✅ Logs de memoria: ${files.length} archivos`);
    } else {
        issues.push(`⚠️ Sin logs de memoria (normal si es primera vez)`);
    }
}

// 8. Verificar tamaño de archivos críticos
const criticalFiles = [
    'scripts/gemini-client.mjs',
    'scripts/tana-integration.mjs'
];

criticalFiles.forEach(file => {
    const path = join(root, file);
    if (existsSync(path)) {
        const stats = statSync(path);
        if (stats.size > 100) {
            ok.push(`✅ ${file}: ${stats.size} bytes`);
        } else {
            issues.push(`❌ ${file} muy pequeño (${stats.size} bytes)`);
        }
    }
});

// REPORTE
console.log('\n=== DIAGNÓSTICO EVIE MENTAL WEAVE ===\n');

console.log('✅ FUNCIONANDO (' + ok.length + '):');
ok.forEach(item => console.log('  ' + item));

console.log('\n❌ PROBLEMAS (' + issues.length + '):');
if (issues.length === 0) {
    console.log('  Ninguno - Sistema 100% operativo');
} else {
    issues.forEach(item => console.log('  ' + item));
}

console.log('\n=== RECOMENDACIONES ===\n');

if (issues.some(i => i.includes('node_modules'))) {
    console.log('1. Ejecutar: npm install');
}

if (issues.some(i => i.includes('API Key'))) {
    console.log('2. Configurar API key válida en .env');
}

if (issues.some(i => i.includes('FALTA:'))) {
    console.log('3. Recrear archivos faltantes con setup-gemini.ps1');
}

console.log('\n=== ESTADO GENERAL ===');
const health = issues.length === 0 ? '🟢 EXCELENTE' : 
               issues.length <= 3 ? '🟡 BUENO (requiere ajustes menores)' :
               '🔴 CRÍTICO (requiere corrección)';
console.log(health);




