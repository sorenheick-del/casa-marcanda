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

## Automatisk upload til webhotellet

Sitet bliver liggende på Gigahost og uploades automatisk med SFTP, når ændringer pushes til `main`. Uploaden bruger webhotellets SFTP-rodmappe, hvor `index.html` og mapperne `assets`, `da`, `de` og `it` ligger.

Opret følgende repository secrets på GitHub under **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Værdi |
|---|---|
| `SFTP_HOST` | `sftp.gigahost.dk` |
| `SFTP_USERNAME` | `sheick.dk` |
| `SFTP_PASSWORD` | SFTP-adgangskoden fra Gigahost |
| `SFTP_HOST_FINGERPRINT` | Serverens bekræftede SHA256-fingeraftryk, fx `SHA256:...` |

Brug fingeraftrykket, som vises af WinSCP ved første forbindelse, eller få det bekræftet af Gigahost. Gem kun værdierne som GitHub secrets — aldrig i filer i projektet. Når secrets er oprettet, kan uploaden startes fra **Actions → Deploy website → Run workflow**. Derefter kører den automatisk ved hvert push til `main`.
