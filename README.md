# LearningPlanAIDev

Persönlicher Fortschrittstracker für den 12-Wochen Vollzeit-Plan (LLM/RAG → KI-Entwickler).

## Starten

Kein Build nötig — einfach im Browser öffnen:

```bash
open index.html
```

Oder lokal mit einem kleinen Server (empfohlen für ES-Module):

```bash
python3 -m http.server 8080
```

Dann im Browser: http://localhost:8080

## Features

- **72 Tagespläne** (Mo–Sa pro Woche) mit Zeitblöcken und Checklisten
- **Detaillierte Tutorials** — Links, Kosten, Dauer, konkrete Lernschritte
- Fortschritt per Checkbox (gespeichert in `localStorage`)
- Startdatum → Button „Heute“ springt zum aktuellen Tag
- Bewerbungs-Checkliste & Interview-Fragen

## Dateien

| Datei | Inhalt |
|-------|--------|
| `index.html` | Einstieg |
| `app.js` | UI & Fortschrittslogik |
| `plan-data.js` | Wochenplan, Phasen, Checklisten |
| `daily-plans.js` | 72 Tagespläne (generiert) |
| `tutorials.js` | Lernressourcen pro Woche |
| `generate-daily-plans.py` | Generator für daily-plans.js |
| `styles.css` | Layout & Design |

Tagespläne neu generieren: `python3 generate-daily-plans.py`

Fortschritt bleibt im Browser gespeichert — kein Backend nötig.
