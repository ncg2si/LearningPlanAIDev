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
- **Flexibles Tempo** — pausieren jederzeit, an jedem Tag weitermachen
- **Fortschritt mit Zeitstempel** — jeder Task speichert Datum & Uhrzeit
- **Fortschrittsübersicht** — Statistik, 14-Tage-Aktivität, Wochen- & Tageshistorie
- **Weitermachen** — springt zum nächsten offenen Tag
- **Detaillierte Tutorials** — Links, Kosten, Dauer, konkrete Lernschritte
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
