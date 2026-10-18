param([Parameter(Mandatory=$true)][string]$Target)
$ErrorActionPreference = 'Stop'
$PatchDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Items = @('.github','.nvmrc','package.json','package-lock.json','astro.config.mjs','public','scripts','src','tests','.gitignore','serve_local.cjs','apply-patch.sh','apply-patch.ps1','ASSET-SOURCES.md','PATCH-MANIFEST.md','VERIFICATION-REPORT.md','PATCH-INFO.txt','reports','docs','audit_46_status.json')
if (!(Test-Path -LiteralPath (Join-Path $Target 'package.json'))) { throw 'Target must be an existing project root.' }
if ([IO.Path]::GetFullPath($Target) -eq [IO.Path]::GetFullPath($PatchDir)) { throw 'Extract patch separately from target.' }
& node (Join-Path $PatchDir 'scripts/verify-package.mjs') $PatchDir
if ($LASTEXITCODE -ne 0) { throw 'Patch integrity verification failed.' }
foreach ($Item in $Items) {
  $Source = Join-Path $PatchDir $Item
  if (!(Test-Path -LiteralPath $Source)) { throw "Missing patch item: $Item" }
  if (Test-Path -LiteralPath $Source -PathType Container) {
    $Destination = Join-Path $Target $Item
    New-Item -ItemType Directory -Path $Destination -Force | Out-Null
    Get-ChildItem -LiteralPath $Source -Force | Copy-Item -Destination $Destination -Recurse -Force
  } else { Copy-Item -LiteralPath $Source -Destination (Join-Path $Target $Item) -Force }
}
Write-Host "Patch overlay copied to: $Target"
Write-Host "Run: npm ci --prefer-offline --no-audit --no-fund; npm test; npm run build"
