param([string]$Target = (Get-Location).Path)
$ErrorActionPreference = "Stop"
$PatchDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (!(Test-Path (Join-Path $Target "src")) -or !(Test-Path (Join-Path $Target "package.json"))) {
  throw "Target tidak terlihat seperti root repo Tangsel TradeLink: $Target"
}
Copy-Item (Join-Path $PatchDir "src\*") (Join-Path $Target "src") -Recurse -Force
New-Item -ItemType Directory -Force -Path (Join-Path $Target "tests") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $Target "public\brand") | Out-Null
Copy-Item (Join-Path $PatchDir "tests\*") (Join-Path $Target "tests") -Recurse -Force
Copy-Item (Join-Path $PatchDir "public\brand\*") (Join-Path $Target "public\brand") -Force
Remove-Item (Join-Path $Target "public\brand\raja-freeze-dried-product.png") -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $Target "public\brand\raja-extracted-0.jpeg") -Force -ErrorAction SilentlyContinue
Write-Host "RC3 performance hardening applied to: $Target"
Write-Host "Run: npm test; npm run build"
