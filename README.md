# LearningPlanAIDev

Persönlicher Fortschrittstracker für den 12-Wochen Vollzeit-Plan (LLM/RAG → KI-Entwickler).

## Starten

Kein Build nötig — einfach im Browser öffnen:

```bash
cd /Users/cami/Projects/llm-lernplan-tracker
./start.sh
```

Oder manuell:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Dann im Browser: **http://127.0.0.1:8765/** (nicht `index.html` per Doppelklick öffnen!)

## Features

- **72 Tagespläne** (Mo–Sa pro Woche) mit Zeitblöcken und Checklisten
- **Flexibles Tempo** — pausieren jederzeit, an jedem Tag weitermachen
- **Fortschritt mit Zeitstempel** — jeder Task speichert Datum & Uhrzeit
- **Export / Import** — Fortschritt als JSON sichern und auf anderem Gerät oder URL übernehmen
- **Fortschrittsübersicht** — Statistik, 14-Tage-Aktivität, Wochen- & Tageshistorie
- **Weitermachen** — springt zum nächsten offenen Tag
- **Detaillierte Tutorials** — Links, Kosten, Dauer, konkrete Lernschritte
- **Optional vertiefen** — DLAI, Anthropic, Pinecone, Simon Willison (Ergänzung, nicht Pflicht)
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

## Fortschritt sichern & übertragen

In der Sidebar oder unter **Fortschritt → Sicherung & Übertragung**:

- **Exportieren** — lädt eine JSON-Datei mit Tasks, Zeitstempeln, aktuellem Tag und optional Startdatum
- **Import (ersetzen)** — Backup übernimmt alles (z.B. Wechsel von localhost zu GitHub Pages)
- **Zusammenführen** — Tasks aus Backup mit lokalem Fortschritt kombinieren (neuere Zeitstempel gewinnen)
