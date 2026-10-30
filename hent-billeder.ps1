# Henter alle billeder fra den gamle side og peger de nye sider på de lokale kopier.
# Kør fra mappen, hvor index.html ligger:  .\hent-billeder.ps1
$ErrorActionPreference = "Stop"
$ids = 55,56,61,62,63,22,16,18,48,49,50,51,52,53,87,88,54,89,90,20,25,57,58,59,60,78,79,91,26,27,24,28,29,80,81,82,83,84,35,36,37,38,39,23,41,42,43,44,33,34,64
New-Item -ItemType Directory -Force -Path "assets\images" | Out-Null
foreach ($i in $ids) {
  $target = "assets\images\$i.jpg"
  if (-not (Test-Path $target)) {
    Invoke-WebRequest -Uri "https://casa-marcanda.it/uploads/$i.jpg" -OutFile $target
    Write-Host "Hentet $i.jpg"
  }
}
$old = "https://casa-marcanda.it/uploads/"
Get-ChildItem -Recurse -Filter index.html | ForEach-Object {
  $new = if ($_.DirectoryName -eq (Get-Location).Path) { "assets/images/" } else { "../assets/images/" }
  $text = [System.IO.File]::ReadAllText($_.FullName)
  [System.IO.File]::WriteAllText($_.FullName, $text.Replace($old, $new), (New-Object System.Text.UTF8Encoding($false)))
}
Write-Host "Færdig. Billederne ligger nu i assets\images, og siderne bruger dem."
