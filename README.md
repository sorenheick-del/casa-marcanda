# Casa Marcanda

Hjemmeside for Casa Marcanda i Polvano, Toscana. Statisk side på fire sprog uden cookies eller sporing.

| Sprog | Adresse i mappen |
|---|---|
| English | `index.html` |
| Dansk | `da/index.html` |
| Italiano | `it/index.html` |
| Deutsch | `de/index.html` |

Fælles filer ligger i `assets/` (`style.css`, `gallery.js`, `images/`).

## Før siden går live

1. Kør `hent-billeder.ps1` i PowerShell. Det henter alle billeder til `assets/images` og retter siderne, så de ikke længere afhænger af den gamle side.
2. Søg efter `INDSÆT-EMAIL@EKSEMPEL.COM` i alle fire `index.html` og skriv den rigtige e-mailadresse.
3. Udfyld GPS-koordinaterne (afsnittet *How to get here* / *Sådan kommer du hertil*).
4. Tilslut kalenderen over ledige uger.

## Læg på GitHub og vis som hjemmeside

```powershell
git init
git add .
git commit -m "Ny hjemmeside til Casa Marcanda"
git branch -M main
git remote add origin https://github.com/DITBRUGERNAVN/casa-marcanda.git
git push -u origin main
```

Åbn derefter repoet på GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**. Siden vises på `https://DITBRUGERNAVN.github.io/casa-marcanda/`. Eget domæne kan tilføjes under samme menu.
