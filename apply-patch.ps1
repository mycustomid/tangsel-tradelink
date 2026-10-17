param([string]$Target = ".")
$PatchDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Items = @('.github','.nvmrc','docs','package.json','public','src','tests')
foreach ($Item in $Items) {
  $Source = Join-Path $PatchDir $Item
  if (Test-Path $Source) { Copy-Item $Source -Destination $Target -Recurse -Force }
}
Write-Host "Patch overlay copied to: $Target"
Write-Host "Run: npm ci --prefer-offline --no-audit --no-fund; npm test; npm run build"
