/** Auto-generated daily plans — 12 weeks × 6 days */

export const DAY_ORDER = ["mo", "di", "mi", "do", "fr", "sa"];

export const DAY_LABELS = {
  mo: "Montag",
  di: "Dienstag",
  mi: "Mittwoch",
  do: "Donnerstag",
  fr: "Freitag",
  sa: "Samstag",
};

export const DAILY_PLANS = [
  {
    "week": 1,
    "day": "mo",
    "label": "Montag",
    "goal": "Dev-Setup steht",
    "deliverable": "Python-Env + GitHub-Repo angelegt",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Theorie: Python & Git",
        "items": [
          "Python 3.11+ installieren",
          "Pro Git Kap. 1–2 lesen (DE)"
        ],
        "tutorialIds": [
          "git-progit",
          "python-typing"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Hands-on: Modern Python",
        "items": [
          "uv oder venv einrichten",
          "5 Übungen: Type Hints, dataclasses, pathlib"
        ],
        "tutorialIds": [
          "uv-docs",
          "python-typing"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Projekt: Repo anlegen",
        "items": [
          "GitHub Repo ml-api-starter",
          "Ordnerstruktur: app/, tests/"
        ],
        "tutorialIds": [
          "git-progit"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Dokumentation",
        "items": [
          "README Entwurf",
          ".gitignore für Python"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Python 3.11+ installiert",
      "uv/venv funktioniert",
      "GitHub-Repo erstellt",
      "Erster Commit gepusht",
      "README + .gitignore"
    ]
  },
  {
    "week": 1,
    "day": "di",
    "label": "Dienstag",
    "goal": "FastAPI Basics sitzen",
    "deliverable": "GET /health + POST /predict Stub",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "FastAPI Tutorial Kap. 1–4",
        "items": [
          "First Steps bis Body",
          "Pydantic Models verstehen"
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Hands-on: Erste Routes",
        "items": [
          "GET /health",
          "POST /predict mit festem JSON"
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Projektstruktur",
        "items": [
          "main.py, schemas.py anlegen",
          "uvicorn starten"
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Testen",
        "items": [
          "/docs im Browser öffnen",
          "curl gegen /health"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "FastAPI Kap. 1–4 gelesen",
      "GET /health live",
      "POST /predict Stub",
      "OpenAPI /docs getestet",
      "Commit gepusht"
    ]
  },
  {
    "week": 1,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Echtes ML-Modell in API",
    "deliverable": "sklearn-Modell speichert + lädt",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Dataset & sklearn",
        "items": [
          "Iris oder Titanic Dataset wählen",
          "sklearn Quickstart durcharbeiten"
        ],
        "tutorialIds": [
          "sklearn-quickstart"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Modell trainieren",
        "items": [
          "Train/Test Split",
          "Modell als .pkl speichern"
        ],
        "tutorialIds": [
          "sklearn-quickstart"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "API Integration",
        "items": [
          "Modell beim App-Start laden",
          "Predict mit echtem Input"
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Fehlerfälle",
        "items": [
          "Falsche Inputs testen",
          "Sinnvolle Error Messages"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Dataset gewählt + trainiert",
      "Modell als .pkl gespeichert",
      "Load beim Startup",
      "Echte Predictions funktionieren"
    ]
  },
  {
    "week": 1,
    "day": "do",
    "label": "Donnerstag",
    "goal": "API production-ready lokal",
    "deliverable": "Validierung + pytest",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "FastAPI Advanced",
        "items": [
          "Dependency Injection",
          "Error Handling Kap."
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Validierung",
        "items": [
          "Pydantic Input-Schema",
          "HTTP 422 bei Fehlern"
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Refactoring",
        "items": [
          "model.py, main.py, schemas.py trennen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Tests",
        "items": [
          "pytest installieren",
          "3–5 Tests mit TestClient"
        ],
        "tutorialIds": [
          "pytest-docs"
        ]
      }
    ],
    "tasks": [
      "Code in Module aufgeteilt",
      "Input-Validierung aktiv",
      "3+ pytest Tests grün",
      "Edge Cases getestet"
    ]
  },
  {
    "week": 1,
    "day": "fr",
    "label": "Freitag",
    "goal": "Woche 1 abschließen",
    "deliverable": "Meilenstein: API lokal + GitHub",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Code Review selbst",
        "items": [
          "Dead Code entfernen",
          "Type Hints ergänzen"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "README finalisieren",
        "items": [
          "Setup-Anleitung",
          "Architektur ASCII/Mermaid",
          "curl Beispiel"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Polish",
        "items": [
          "Letzte Bugs fixen",
          "requirements.txt / pyproject.toml"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Alles auf GitHub",
          "Repo-Link notieren"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "README vollständig",
      "Architektur-Diagramm",
      "Meilenstein Woche 1 erreicht"
    ]
  },
  {
    "week": 1,
    "day": "sa",
    "label": "Samstag",
    "goal": "Puffer & Vertiefung",
    "deliverable": "Schwachstellen behoben",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Nacharbeit",
        "items": [
          "Offene Tasks aus Mo–Fr",
          "Optional: Real Python Type Hints"
        ],
        "tutorialIds": [
          "python-typing"
        ]
      }
    ],
    "tasks": [
      "Offene Woche-1-Punkte erledigt"
    ]
  },
  {
    "week": 2,
    "day": "mo",
    "label": "Montag",
    "goal": "Docker Basics",
    "deliverable": "App läuft im Container",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Docker Getting Started",
        "items": [
          "Docs Kap. 1–3",
          "Images vs Container"
        ],
        "tutorialIds": [
          "docker-getting-started"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Dockerfile schreiben",
        "items": [
          "Dockerfile für FastAPI",
          "docker build + run"
        ],
        "tutorialIds": [
          "docker-getting-started"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Optimieren",
        "items": [
          ".dockerignore",
          "Port mapping testen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Dokumentieren",
        "items": [
          "Docker-Befehle ins README"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Dockerfile funktioniert",
      "Container startet lokal",
      ".dockerignore",
      "README Docker-Sektion"
    ]
  },
  {
    "week": 2,
    "day": "di",
    "label": "Dienstag",
    "goal": "docker-compose",
    "deliverable": "compose up startet App",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Compose Tutorial",
        "items": [
          "compose.yaml Grundlagen"
        ],
        "tutorialIds": [
          "docker-compose"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Hands-on",
        "items": [
          "App-Service definieren",
          "Volumes für Model"
        ],
        "tutorialIds": [
          "docker-compose"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Env-Variablen",
        "items": [
          ".env + .env.example",
          "Secrets nicht committen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "Frischer clone → compose up → predict"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "compose.yaml fertig",
      ".env.example",
      "compose up funktioniert"
    ]
  },
  {
    "week": 2,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "CI Pipeline",
    "deliverable": "GitHub Actions grün",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "GitHub Actions",
        "items": [
          "Python CI Docs lesen"
        ],
        "tutorialIds": [
          "gh-actions"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Workflow schreiben",
        "items": [
          "pytest on push",
          "Optional: ruff lint"
        ],
        "tutorialIds": [
          "gh-actions"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Debug CI",
        "items": [
          "Fehlgeschlagene Runs fixen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Badge",
        "items": [
          "CI Badge ins README"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "GitHub Actions Workflow",
      "CI grün",
      "Badge im README"
    ]
  },
  {
    "week": 2,
    "day": "do",
    "label": "Donnerstag",
    "goal": "Cloud Deploy",
    "deliverable": "Live-URL funktioniert",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Deploy-Plattform wählen",
        "items": [
          "Railway oder Render Docs"
        ],
        "tutorialIds": [
          "railway-deploy",
          "render-deploy"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Deploy",
        "items": [
          "GitHub verbinden",
          "Start Command setzen"
        ],
        "tutorialIds": [
          "railway-deploy"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Debug Deploy",
        "items": [
          "Logs lesen",
          "Port/Health fixen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Extern testen",
        "items": [
          "curl von außen",
          "URL notieren"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Deploy-Account erstellt",
      "Live-URL erreichbar",
      "curl von außen OK"
    ]
  },
  {
    "week": 2,
    "day": "fr",
    "label": "Freitag",
    "goal": "Projekt 1 final",
    "deliverable": "Meilenstein: Live-URL im README",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "README Polish",
        "items": [
          "Mermaid Architektur",
          "3-Befehl Setup"
        ],
        "tutorialIds": [
          "mermaid"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Screenshots",
        "items": [
          "/docs Screenshot oder GIF"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "End-to-End Test",
        "items": [
          "Clone → Docker → Deploy Flow"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Live-URL prominent im README"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Mermaid-Diagramm",
      "Live-URL im README",
      "Meilenstein Woche 2 erreicht"
    ]
  },
  {
    "week": 2,
    "day": "sa",
    "label": "Samstag",
    "goal": "Review",
    "deliverable": "Ganzer Flow sitzt",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Full Flow",
        "items": [
          "Nochmal clone → run → predict → deploy"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Deploy-Flow ohne Hilfe durchgeführt"
    ]
  },
  {
    "week": 3,
    "day": "mo",
    "label": "Montag",
    "goal": "OpenAI API Setup",
    "deliverable": "Erster Chat-Request in Python",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "OpenAI Docs",
        "items": [
          "Chat Completions API",
          "Messages Format"
        ],
        "tutorialIds": [
          "openai-api"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Hands-on",
        "items": [
          "API Key in .env",
          "Budget-Limit setzen",
          "Erster Request"
        ],
        "tutorialIds": [
          "openai-api"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Wrapper bauen",
        "items": [
          "chat(messages) Funktion",
          "Logging"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Kosten",
        "items": [
          "Token-Kosten notieren",
          "1 Request kalkulieren"
        ],
        "tutorialIds": [
          "openai-api"
        ]
      }
    ],
    "tasks": [
      "OpenAI Account + Budget",
      "Erster API Call",
      "Wrapper-Funktion",
      "Kosten dokumentiert"
    ]
  },
  {
    "week": 3,
    "day": "di",
    "label": "Dienstag",
    "goal": "Ollama lokal",
    "deliverable": "Lokal + Cloud vergleichen",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Ollama Setup",
        "items": [
          "Installieren",
          "llama3.2 pullen"
        ],
        "tutorialIds": [
          "ollama"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Python Integration",
        "items": [
          "Gleiche Prompts lokal vs OpenAI"
        ],
        "tutorialIds": [
          "ollama"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Abstraktion",
        "items": [
          "Provider-Interface (openai/ollama)"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Notizen",
        "items": [
          "Qualität/Latenz/Kosten vergleichen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Ollama installiert",
      "Lokales Modell läuft",
      "Provider-Wechsel möglich"
    ]
  },
  {
    "week": 3,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Prompt Engineering",
    "deliverable": "Prompt-Vorlagen dokumentiert",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Prompting Guide",
        "items": [
          "OpenAI Prompt Engineering lesen"
        ],
        "tutorialIds": [
          "openai-prompting"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "DeepLearning.AI Kurs",
        "items": [
          "ChatGPT Prompt Engineering Kurs"
        ],
        "tutorialIds": [
          "dlai-prompt"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Experimente",
        "items": [
          "Few-Shot",
          "Chain-of-Thought testen"
        ],
        "tutorialIds": [
          "openai-prompting"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Vorlagen",
        "items": [
          "3 System-Prompts in YAML speichern"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Prompt Engineering Guide gelesen",
      "DLAI Kurs abgeschlossen",
      "3 Prompt-Vorlagen getestet"
    ]
  },
  {
    "week": 3,
    "day": "do",
    "label": "Donnerstag",
    "goal": "Prompt-Lab UI",
    "deliverable": "Editierbarer System-Prompt",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Streamlit Tutorial",
        "items": [
          "Get Started durcharbeiten"
        ],
        "tutorialIds": [
          "streamlit"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "UI bauen",
        "items": [
          "System-Prompt Textarea",
          "User Input + Output"
        ],
        "tutorialIds": [
          "streamlit"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Integration",
        "items": [
          "OpenAI + Ollama wählbar"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Polish",
        "items": [
          "Layout verbessern"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Streamlit App läuft",
      "System-Prompt editierbar",
      "Provider wählbar"
    ]
  },
  {
    "week": 3,
    "day": "fr",
    "label": "Freitag",
    "goal": "Streaming + Meilenstein",
    "deliverable": "Prompt-Lab fertig + README",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Streaming API",
        "items": [
          "OpenAI Streaming implementieren"
        ],
        "tutorialIds": [
          "openai-api"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Token-Zähler",
        "items": [
          "Kosten pro Request anzeigen"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Dokumentation",
        "items": [
          "5 Prompt-Varianten vergleichen",
          "README schreiben"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Token/Kosten laut erklären üben"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Streaming funktioniert",
      "Kostenanzeige",
      "Meilenstein Woche 3 erreicht"
    ]
  },
  {
    "week": 3,
    "day": "sa",
    "label": "Samstag",
    "goal": "JSON Mode",
    "deliverable": "Structured Output getestet",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Structured Output",
        "items": [
          "JSON Mode ausprobieren",
          "Function Calling skimmen"
        ],
        "tutorialIds": [
          "openai-api"
        ]
      }
    ],
    "tasks": [
      "JSON Output Beispiel funktioniert"
    ]
  },
  {
    "week": 4,
    "day": "mo",
    "label": "Montag",
    "goal": "Embeddings verstehen",
    "deliverable": "Similarity Matrix für 10 Sätze",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Konzepte",
        "items": [
          "Pinecone Embeddings Artikel",
          "Cosine Similarity"
        ],
        "tutorialIds": [
          "pinecone-embeddings"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "OpenAI Embeddings",
        "items": [
          "API Tutorial",
          "10 Sätze embedden"
        ],
        "tutorialIds": [
          "openai-embeddings"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Vergleich",
        "items": [
          "Optional: sentence-transformers lokal"
        ],
        "tutorialIds": [
          "hf-sentence-transformers"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Analyse",
        "items": [
          "Similarity Matrix interpretieren"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Embeddings Konzept verstanden",
      "10 Sätze embedded",
      "Similarity berechnet"
    ]
  },
  {
    "week": 4,
    "day": "di",
    "label": "Dienstag",
    "goal": "Dokumente + Chunking",
    "deliverable": "20+ Docs gechunked",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Doc-Set sammeln",
        "items": [
          "20–50 MD/PDF zum Thema wählen"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "PDF Parsing",
        "items": [
          "pypdf Text extrahieren"
        ],
        "tutorialIds": [
          "pypdf"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Chunking",
        "items": [
          "256/512/1024 Tokens testen",
          "Overlap 10–20%"
        ],
        "tutorialIds": [
          "langchain-splitters"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Vergleich",
        "items": [
          "Beste Chunk-Size notieren"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "20+ Dokumente",
      "PDF Text extrahiert",
      "3 Chunk-Größen getestet"
    ]
  },
  {
    "week": 4,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Vektordatenbank",
    "deliverable": "Index persistent",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Chroma oder Qdrant",
        "items": [
          "Quickstart wählen + lesen"
        ],
        "tutorialIds": [
          "chroma-docs",
          "qdrant-docs"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Index bauen",
        "items": [
          "Chunks + Embeddings speichern"
        ],
        "tutorialIds": [
          "chroma-docs"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Metadaten",
        "items": [
          "Quelle, Seite, Dateiname"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Persistenz",
        "items": [
          "Neustart → Index noch da"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Vector DB gewählt",
      "Alle Chunks indexiert",
      "Metadaten gespeichert",
      "Persistenz OK"
    ]
  },
  {
    "week": 4,
    "day": "do",
    "label": "Donnerstag",
    "goal": "Semantische Suche",
    "deliverable": "CLI Top-5 mit Scores",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Retrieval",
        "items": [
          "Query embedden → Top-K"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "CLI bauen",
        "items": [
          "Query Input → 5 Chunks + Score"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Analyse",
        "items": [
          "10 Queries testen",
          "Fehltreffer dokumentieren"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Tune",
        "items": [
          "Top-K / Chunk-Size anpassen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "CLI Suche funktioniert",
      "10 Test-Queries",
      "Chunking dokumentiert"
    ]
  },
  {
    "week": 4,
    "day": "fr",
    "label": "Freitag",
    "goal": "Mini-UI + Meilenstein",
    "deliverable": "Streamlit Suche demo-fähig",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Streamlit UI",
        "items": [
          "Suchfeld + Ergebnisliste"
        ],
        "tutorialIds": [
          "streamlit"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "A/B",
        "items": [
          "Kleine vs große Chunks zeigen"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "README",
        "items": [
          "Pipeline-Diagramm"
        ],
        "tutorialIds": [
          "mermaid"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Chunk-Einfluss erklären üben"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Streamlit Suche live",
      "README mit Diagramm",
      "Meilenstein Woche 4 erreicht"
    ]
  },
  {
    "week": 4,
    "day": "sa",
    "label": "Samstag",
    "goal": "Hybrid Vorbereitung",
    "deliverable": "BM25 Konzept gelesen",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Lesen",
        "items": [
          "Hybrid Search Artikel",
          "rank_bm25 README"
        ],
        "tutorialIds": [
          "pinecone-hybrid",
          "rank-bm25"
        ]
      }
    ],
    "tasks": [
      "Hybrid Search Konzept verstanden"
    ]
  },
  {
    "week": 5,
    "day": "mo",
    "label": "Montag",
    "goal": "Framework Setup",
    "deliverable": "Hello-World RAG",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Framework wählen",
        "items": [
          "LlamaIndex Starter ODER LangChain RAG"
        ],
        "tutorialIds": [
          "llamaindex-starter",
          "langchain-rag"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "HF Hintergrund",
        "items": [
          "NLP Course Ch.1 skim"
        ],
        "tutorialIds": [
          "hf-nlp-course"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "End-to-End",
        "items": [
          "Doc-Set aus W4 nutzen",
          "Erste Antwort"
        ],
        "tutorialIds": [
          "llamaindex-starter"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Repo",
        "items": [
          "rag-doc-bot anlegen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Framework gewählt",
      "Hello-World RAG",
      "GitHub Repo erstellt"
    ]
  },
  {
    "week": 5,
    "day": "di",
    "label": "Dienstag",
    "goal": "Pipeline",
    "deliverable": "Load→Split→Embed→Query",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Indexing",
        "items": [
          "Load, Split, Embed, Store"
        ],
        "tutorialIds": [
          "llamaindex-starter"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Retrieval",
        "items": [
          "Top-K + Prompt Template"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Generation",
        "items": [
          "LLM Antwort mit Context"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "5 Fragen stellen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Pipeline komplett",
      "5 Testfragen beantwortet"
    ]
  },
  {
    "week": 5,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Quellenangaben",
    "deliverable": "Citations in Antwort",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Citations Docs",
        "items": [
          "Source Nodes / Citations lesen"
        ],
        "tutorialIds": [
          "llamaindex-citations"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Implementieren",
        "items": [
          "Chunk-ID, Datei, Seite anzeigen"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Guardrails",
        "items": [
          "Nur aus Context",
          "„Weiß ich nicht“"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "10 Fragen + Quellen prüfen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Quellen in jeder Antwort",
      "„Weiß ich nicht“ funktioniert",
      "10 Tests"
    ]
  },
  {
    "week": 5,
    "day": "do",
    "label": "Donnerstag",
    "goal": "API + Frontend",
    "deliverable": "Upload + Ask Endpoints",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "FastAPI",
        "items": [
          "/upload, /ask, /health"
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Streamlit",
        "items": [
          "Chat UI + Upload"
        ],
        "tutorialIds": [
          "streamlit"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "PDF Upload",
        "items": [
          "Datei → Index"
        ],
        "tutorialIds": [
          "pypdf"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Errors",
        "items": [
          "Error Handling"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "FastAPI Endpoints",
      "Streamlit UI",
      "PDF Upload OK"
    ]
  },
  {
    "week": 5,
    "day": "fr",
    "label": "Freitag",
    "goal": "Meilenstein Woche 5",
    "deliverable": "Doc-Bot mit Quellen auf GitHub",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "20 Fragen Test",
        "items": [
          "Fehler notieren"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Prompt Tuning",
        "items": [
          "Schwache Antworten fixen"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "README",
        "items": [
          "Architektur + Setup"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "GitHub push"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "20 Fragen getestet",
      "README fertig",
      "Meilenstein Woche 5 erreicht"
    ]
  },
  {
    "week": 5,
    "day": "sa",
    "label": "Samstag",
    "goal": "Analyse",
    "deliverable": "Top 5 Fehler dokumentiert",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Review",
        "items": [
          "5 schlechteste Antworten analysieren"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Fehleranalyse notiert"
    ]
  },
  {
    "week": 6,
    "day": "mo",
    "label": "Montag",
    "goal": "Hybrid Search",
    "deliverable": "BM25 + Vector fusioniert",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Konzept",
        "items": [
          "Hybrid Search Artikel"
        ],
        "tutorialIds": [
          "pinecone-hybrid"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "BM25",
        "items": [
          "rank_bm25 implementieren"
        ],
        "tutorialIds": [
          "rank-bm25"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Fusion",
        "items": [
          "RRF oder weighted merge"
        ],
        "tutorialIds": [
          "llamaindex-retrieval"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Vergleich",
        "items": [
          "10 Queries vorher/nachher"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "BM25 Index",
      "Hybrid Search live",
      "10 Queries verglichen"
    ]
  },
  {
    "week": 6,
    "day": "di",
    "label": "Dienstag",
    "goal": "Metadata Filter",
    "deliverable": "Filter nach Tags/Datum",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Metadata Docs",
        "items": [
          "Advanced Retrieval lesen"
        ],
        "tutorialIds": [
          "llamaindex-retrieval"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Upload Metadata",
        "items": [
          "Datum, Typ beim Index setzen"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Filter Query",
        "items": [
          "Nur subset durchsuchen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Docs",
        "items": [
          "Filter-Beispiele dokumentieren"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Metadaten beim Upload",
      "Filter in Query",
      "Getestet"
    ]
  },
  {
    "week": 6,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Query Transform",
    "deliverable": "HyDE oder Multi-Query",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "HyDE Paper skim",
        "items": [
          "Abstract + Konzept"
        ],
        "tutorialIds": [
          "hyde-paper"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Implementieren",
        "items": [
          "Eine Variante wählen"
        ],
        "tutorialIds": [
          "llamaindex-retrieval"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Messen",
        "items": [
          "Latenz + Kosten + Qualität"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Entscheidung",
        "items": [
          "Lohnt es? README Notiz"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Query Transform implementiert",
      "Latenz/Kosten gemessen",
      "Entscheidung dokumentiert"
    ]
  },
  {
    "week": 6,
    "day": "do",
    "label": "Donnerstag",
    "goal": "Parent-Child Chunking",
    "deliverable": "Kleine suchen, große ans LLM",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Konzept",
        "items": [
          "Parent Document Retriever Docs"
        ],
        "tutorialIds": [
          "llamaindex-retrieval"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Implementieren",
        "items": [
          "Parent-Child Setup"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Vergleich",
        "items": [
          "Vs Woche 5 Baseline"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Tune",
        "items": [
          "Beste Config wählen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Parent-Child live",
      "Vergleich dokumentiert"
    ]
  },
  {
    "week": 6,
    "day": "fr",
    "label": "Freitag",
    "goal": "Design Decisions + Meilenstein",
    "deliverable": "README Advanced RAG",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": ".env Config",
        "items": [
          "MODEL, CHUNK_SIZE, TOP_K"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Design Decisions",
        "items": [
          "Warum Hybrid? Warum Chunk X?"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "A/B Tabelle",
        "items": [
          "Chunk-Größen im README"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Push + Review"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      ".env konfigurierbar",
      "Design Decisions README",
      "Meilenstein Woche 6 erreicht"
    ]
  },
  {
    "week": 6,
    "day": "sa",
    "label": "Samstag",
    "goal": "RAGAS Vorbereitung",
    "deliverable": "Eval-Ideen notiert",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Lesen",
        "items": [
          "RAGAS Quickstart skim",
          "Evidently RAG Guide"
        ],
        "tutorialIds": [
          "ragas",
          "evidently-rag"
        ]
      }
    ],
    "tasks": [
      "Eval-Plan für Woche 7"
    ]
  },
  {
    "week": 7,
    "day": "mo",
    "label": "Montag",
    "goal": "Eval-Set",
    "deliverable": "15 Q&A mit Ground Truth",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Metriken",
        "items": [
          "Evidently RAG Guide"
        ],
        "tutorialIds": [
          "evidently-rag"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Fragen schreiben",
        "items": [
          "15 Fragen + erwartete Quelle"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "JSON Format",
        "items": [
          "eval_set.json anlegen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Loader",
        "items": [
          "Script lädt Eval-Set"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "15 Eval-Fragen",
      "Ground Truth Quellen",
      "eval_set.json"
    ]
  },
  {
    "week": 7,
    "day": "di",
    "label": "Dienstag",
    "goal": "RAGAS",
    "deliverable": "Erste Metriken",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "RAGAS Quickstart",
        "items": [
          "Installation + Tutorial"
        ],
        "tutorialIds": [
          "ragas"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "evaluate()",
        "items": [
          "Faithfulness, Context Precision"
        ],
        "tutorialIds": [
          "ragas"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Ergebnisse",
        "items": [
          "Pro Frage speichern"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Interpretieren",
        "items": [
          "Schwächste 5 finden"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "RAGAS installiert",
      "Eval durchgeführt",
      "Schwächste 5 identifiziert"
    ]
  },
  {
    "week": 7,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Iteration",
    "deliverable": "Verbesserte Scores",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Hypothese",
        "items": [
          "Chunk-Size oder Top-K ändern"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Re-Eval",
        "items": [
          "RAGAS nochmal"
        ],
        "tutorialIds": [
          "ragas"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Delta",
        "items": [
          "Vorher/Nachher Tabelle"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Fix",
        "items": [
          "Weitere Iteration wenn nötig"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Parameter angepasst",
      "Re-Eval durchgeführt",
      "Delta dokumentiert"
    ]
  },
  {
    "week": 7,
    "day": "do",
    "label": "Donnerstag",
    "goal": "Logging / Tracing",
    "deliverable": "Request-Logs oder Langfuse",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Langfuse Setup",
        "items": [
          "Account + SDK"
        ],
        "tutorialIds": [
          "langfuse"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Instrumentieren",
        "items": [
          "Retrieval + Prompt loggen"
        ],
        "tutorialIds": [
          "langfuse"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Trace Review",
        "items": [
          "3 Requests in UI ansehen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Fallback",
        "items": [
          "JSON-Log wenn kein Langfuse"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Tracing aktiv",
      "Retrieval sichtbar",
      "3 Traces reviewed"
    ]
  },
  {
    "week": 7,
    "day": "fr",
    "label": "Freitag",
    "goal": "Eval-Report + Meilenstein",
    "deliverable": "README mit Tabelle",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Report schreiben",
        "items": [
          "Ergebnis-Tabelle ins README"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Interview-Antwort",
        "items": [
          "„Wie evaluierst du RAG?“ schreiben"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Code Cleanup",
        "items": [
          "Eval-Script dokumentieren"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Push"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Eval-Report im README",
      "Interview-Antwort fertig",
      "Meilenstein Woche 7 erreicht"
    ]
  },
  {
    "week": 7,
    "day": "sa",
    "label": "Samstag",
    "goal": "Pitch üben",
    "deliverable": "RAG+Eval 5 Min laut",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Üben",
        "items": [
          "RAG + Eval laut erklären"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "5-Min Erklärung geübt"
    ]
  },
  {
    "week": 8,
    "day": "mo",
    "label": "Montag",
    "goal": "Agent Theory",
    "deliverable": "Architektur-Skizze",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Function Calling",
        "items": [
          "OpenAI Guide lesen"
        ],
        "tutorialIds": [
          "openai-function-calling"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "DLAI Agents Kurs",
        "items": [
          "Functions, Tools, Agents"
        ],
        "tutorialIds": [
          "dlai-functions"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Planung",
        "items": [
          "Research Agent Design",
          "Repo anlegen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Skizze",
        "items": [
          "Tools + Flow Diagramm"
        ],
        "tutorialIds": [
          "mermaid"
        ]
      }
    ],
    "tasks": [
      "Function Calling verstanden",
      "DLAI Kurs",
      "Agent-Design skizziert"
    ]
  },
  {
    "week": 8,
    "day": "di",
    "label": "Dienstag",
    "goal": "RAG Tool",
    "deliverable": "Tool 1 funktioniert",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "LlamaIndex Agents",
        "items": [
          "Agent Docs lesen"
        ],
        "tutorialIds": [
          "llamaindex-agents"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "RAG wrappen",
        "items": [
          "Doc-Fragen Tool"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Schema",
        "items": [
          "Name, Params, Description"
        ],
        "tutorialIds": [
          "openai-function-calling"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "3 Doc-Fragen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "RAG als Tool",
      "Tool Schema",
      "3 Tests OK"
    ]
  },
  {
    "week": 8,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Web Tool",
    "deliverable": "Tool 2 funktioniert",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Tavily Setup",
        "items": [
          "API Key + Docs"
        ],
        "tutorialIds": [
          "tavily"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Search Tool",
        "items": [
          "search() Wrapper"
        ],
        "tutorialIds": [
          "tavily"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Integration",
        "items": [
          "Agent wählt Web vs RAG"
        ],
        "tutorialIds": [
          "llamaindex-agents"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "3 Web-Fragen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Tavily Tool live",
      "Agent wählt Tool",
      "3 Web-Tests OK"
    ]
  },
  {
    "week": 8,
    "day": "do",
    "label": "Donnerstag",
    "goal": "Guardrails",
    "deliverable": "Keine Endlosschleifen",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Limits",
        "items": [
          "Max 5 Iterationen",
          "Timeout"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Kostenlimit",
        "items": [
          "Max Tokens pro Run"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Stress Test",
        "items": [
          "Absichtlich schwierige Tasks"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Fix",
        "items": [
          "Loop-Bugs beheben"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Max Iterationen",
      "Timeout + Kostenlimit",
      "Loop-Tests bestanden"
    ]
  },
  {
    "week": 8,
    "day": "fr",
    "label": "Freitag",
    "goal": "Demo + Meilenstein",
    "deliverable": "Research Agent auf GitHub",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "CLI/Streamlit",
        "items": [
          "Komplexe Aufgabe eingeben"
        ],
        "tutorialIds": [
          "streamlit"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Beispiel-Runs",
        "items": [
          "3 Demo-Szenarien"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "README",
        "items": [
          "Tools, Limits, Beispiele"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Push"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Demo UI",
      "3 Szenarien",
      "Meilenstein Woche 8 erreicht"
    ]
  },
  {
    "week": 8,
    "day": "sa",
    "label": "Samstag",
    "goal": "Optional LangGraph",
    "deliverable": "Konzept gelesen",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Skim",
        "items": [
          "LangGraph Intro Docs (optional)"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Optional: LangGraph Überblick"
    ]
  },
  {
    "week": 9,
    "day": "mo",
    "label": "Montag",
    "goal": "Streaming RAG",
    "deliverable": "Token-für-Token UI",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Streaming",
        "items": [
          "OpenAI Stream in RAG"
        ],
        "tutorialIds": [
          "openai-api"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "UI Update",
        "items": [
          "Streamlit Stream"
        ],
        "tutorialIds": [
          "streamlit"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Fallback",
        "items": [
          "Stream bricht ab → Retry"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "UX Test",
        "items": [
          "Lange Antwort testen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Streaming in RAG",
      "UI zeigt Stream",
      "Abbruch-Handling"
    ]
  },
  {
    "week": 9,
    "day": "di",
    "label": "Dienstag",
    "goal": "Caching",
    "deliverable": "Cache-Layer aktiv",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Redis Setup",
        "items": [
          "Docker Redis + redis-py"
        ],
        "tutorialIds": [
          "redis-py"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Embedding Cache",
        "items": [
          "Hash → Vector"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Response Cache",
        "items": [
          "Identische Query → Cache Hit"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Messen",
        "items": [
          "Hit-Rate + Latenz"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Redis läuft",
      "Embedding Cache",
      "Response Cache",
      "Latenz gemessen"
    ]
  },
  {
    "week": 9,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Rate Limiting",
    "deliverable": "429 bei Spam",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "SlowAPI",
        "items": [
          "Docs lesen"
        ],
        "tutorialIds": [
          "slowapi"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Implementieren",
        "items": [
          "/ask limitieren"
        ],
        "tutorialIds": [
          "slowapi"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "API Keys",
        "items": [
          ".env only, nie im Code"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "429 provozieren"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Rate Limit aktiv",
      "Secrets sicher",
      "429 getestet"
    ]
  },
  {
    "week": 9,
    "day": "do",
    "label": "Donnerstag",
    "goal": "docker-compose Stack",
    "deliverable": "App+Qdrant+Redis",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Fallback Model",
        "items": [
          "Ollama wenn OpenAI fail"
        ],
        "tutorialIds": [
          "ollama"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "compose",
        "items": [
          "3 Services verknüpfen"
        ],
        "tutorialIds": [
          "docker-compose"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Integration Test",
        "items": [
          "compose up → full flow"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Docs",
        "items": [
          "Production Checklist README"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Fallback Model",
      "compose 3 Services",
      "Full stack OK"
    ]
  },
  {
    "week": 9,
    "day": "fr",
    "label": "Freitag",
    "goal": "Hardening + Meilenstein",
    "deliverable": "10 parallele Requests OK",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Async",
        "items": [
          "FastAPI async Endpoints"
        ],
        "tutorialIds": [
          "fastapi-async"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Load Test",
        "items": [
          "10 parallele Requests"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Fix Bottlenecks",
        "items": [
          "Langsamste Stelle optimieren"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Production Checklist abhaken"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Async Endpoints",
      "Load Test",
      "Meilenstein Woche 9 erreicht"
    ]
  },
  {
    "week": 9,
    "day": "sa",
    "label": "Samstag",
    "goal": "Deploy Update",
    "deliverable": "RAG live deployt",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Deploy",
        "items": [
          "RAG auf Railway/Fly updaten"
        ],
        "tutorialIds": [
          "railway-deploy"
        ]
      }
    ],
    "tasks": [
      "RAG Live-URL aktualisiert"
    ]
  },
  {
    "week": 10,
    "day": "mo",
    "label": "Montag",
    "goal": "Architektur",
    "deliverable": "Feature-Liste + Repo",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Planung",
        "items": [
          "Enterprise Knowledge Assistant Spec"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Architektur",
        "items": [
          "Mermaid Diagramm"
        ],
        "tutorialIds": [
          "mermaid"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Repo Setup",
        "items": [
          "Module-Struktur"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "DOCX",
        "items": [
          "python-docx Setup"
        ],
        "tutorialIds": [
          "python-docx"
        ]
      }
    ],
    "tasks": [
      "Spec geschrieben",
      "Architektur-Diagramm",
      "Repo angelegt"
    ]
  },
  {
    "week": 10,
    "day": "di",
    "label": "Dienstag",
    "goal": "Multi-Format Upload",
    "deliverable": "PDF+MD+DOCX",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Parser",
        "items": [
          "PDF, MD, DOCX Parser"
        ],
        "tutorialIds": [
          "pypdf",
          "python-docx"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Upload API",
        "items": [
          "/upload multi-format"
        ],
        "tutorialIds": [
          "fastapi-tutorial"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Index Pipeline",
        "items": [
          "Upload → Chunk → Index"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "Je 2 Dateien pro Format"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "3 Formate supported",
      "Upload API",
      "6 Test-Dateien indexiert"
    ]
  },
  {
    "week": 10,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Hybrid RAG Core",
    "deliverable": "W6 Code integriert",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Port Code",
        "items": [
          "Hybrid RAG aus W6 übernehmen"
        ],
        "tutorialIds": [
          "llamaindex-retrieval"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Citations",
        "items": [
          "Quellenangabe"
        ],
        "tutorialIds": [
          "llamaindex-citations"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Eval Hook",
        "items": [
          "Eval aus W7 einbinden"
        ],
        "tutorialIds": [
          "ragas"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Smoke Tests",
        "items": [
          "10 Fragen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Hybrid RAG integriert",
      "Eval Hook",
      "10 Smoke Tests"
    ]
  },
  {
    "week": 10,
    "day": "do",
    "label": "Donnerstag",
    "goal": "Admin + USP",
    "deliverable": "Re-Index + Unique Feature",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Admin API",
        "items": [
          "/reindex, /documents"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "USP wählen",
        "items": [
          "DE/EN, Domäne, oder Doc-Vergleich"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "USP bauen",
        "items": [
          "Feature implementieren"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Test",
        "items": [
          "USP demo-fähig"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Admin Endpoints",
      "USP implementiert",
      "USP getestet"
    ]
  },
  {
    "week": 10,
    "day": "fr",
    "label": "Freitag",
    "goal": "Ship + Meilenstein",
    "deliverable": "Deploy + Loom Video",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "UI Polish",
        "items": [
          "Streamlit final"
        ],
        "tutorialIds": [
          "streamlit"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Docker + Deploy",
        "items": [
          "Live URL"
        ],
        "tutorialIds": [
          "railway-deploy",
          "docker-getting-started"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Loom Video",
        "items": [
          "5 Min Walkthrough"
        ],
        "tutorialIds": [
          "loom"
        ]
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "README mit URL + Video"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Deploy live",
      "Demo-Video",
      "Meilenstein Woche 10 erreicht"
    ]
  },
  {
    "week": 10,
    "day": "sa",
    "label": "Samstag",
    "goal": "Pitch üben",
    "deliverable": "5 Min Walkthrough 3x",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Üben",
        "items": [
          "Signature-Projekt Pitch"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Pitch 3x geübt"
    ]
  },
  {
    "week": 11,
    "day": "mo",
    "label": "Montag",
    "goal": "Repo 1 polieren",
    "deliverable": "ML-API Portfolio-ready",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "README",
        "items": [
          "Screenshots, .env.example"
        ],
        "tutorialIds": [
          "github-readme-guide"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "CI + Secrets",
        "items": [
          "Grün, keine Keys im Git"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Pin",
        "items": [
          "GitHub Pin setzen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Review",
        "items": [
          "Frischer Clone Test"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "ML-API README poliert",
      "GitHub Pin",
      "Clone Test OK"
    ]
  },
  {
    "week": 11,
    "day": "di",
    "label": "Dienstag",
    "goal": "Repo 2 polieren",
    "deliverable": "RAG Portfolio-ready",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Diagramm",
        "items": [
          "Mermaid RAG Pipeline"
        ],
        "tutorialIds": [
          "mermaid"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Eval",
        "items": [
          "Eval-Tabelle sichtbar"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Setup",
        "items": [
          "< 5 Min Clone→Run"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Pin",
        "items": [
          "GitHub Pin"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "RAG Diagramm",
      "Eval im README",
      "Setup < 5 Min"
    ]
  },
  {
    "week": 11,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "Repo 3 + GitHub Profil",
    "deliverable": "Agent Repo + Bio",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Agent README",
        "items": [
          "Beispiel-Runs, Tools"
        ],
        "tutorialIds": [
          "github-readme-guide"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Konsistenz",
        "items": [
          "Gleiche README-Struktur alle 3"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "GitHub Profil",
        "items": [
          "Bio, Links, Pins"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Review",
        "items": [
          "Als Recruiter lesen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Agent README",
      "3 Repos konsistent",
      "GitHub Profil"
    ]
  },
  {
    "week": 11,
    "day": "do",
    "label": "Donnerstag",
    "goal": "LinkedIn",
    "deliverable": "Headline + 2 Posts",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Profil",
        "items": [
          "Headline + About"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Post 1",
        "items": [
          "Chunking Learnings"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Post 2",
        "items": [
          "RAG Eval Lessons"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Link",
        "items": [
          "Signature-Projekt verlinken"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "LinkedIn Headline",
      "2 Posts veröffentlicht",
      "Projekt-Link"
    ]
  },
  {
    "week": 11,
    "day": "fr",
    "label": "Freitag",
    "goal": "Lebenslauf + Meilenstein",
    "deliverable": "CV fertig",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "CV Struktur",
        "items": [
          "Projekte vor Weiterbildung"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Versionen",
        "items": [
          "1-Seite + ausführlich"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Feedback",
        "items": [
          "2 Personen fragen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Bewerbungs-Checkliste starten"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "CV 1-Seite",
      "CV ausführlich",
      "Meilenstein Woche 11 erreicht"
    ]
  },
  {
    "week": 11,
    "day": "sa",
    "label": "Samstag",
    "goal": "Checkliste",
    "deliverable": "7 Punkte geprüft",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Review",
        "items": [
          "Bewerbungs-Checkliste durchgehen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "Checkliste Lücken geschlossen"
    ]
  },
  {
    "week": 12,
    "day": "mo",
    "label": "Montag",
    "goal": "Interview Antworten",
    "deliverable": "10 Fragen schriftlich",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "RAG Serie",
        "items": [
          "Pinecone RAG Artikel"
        ],
        "tutorialIds": [
          "interview-rag"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "Antworten",
        "items": [
          "Top 5 Fragen schreiben"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Antworten 2",
        "items": [
          "Top 6–10 schreiben"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Laut üben",
        "items": [
          "RAG in 2 Min"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "10 Antwortentwürfe",
      "RAG 2 Min geübt"
    ]
  },
  {
    "week": 12,
    "day": "di",
    "label": "Dienstag",
    "goal": "Coding Prep",
    "deliverable": "FastAPI Route live coded",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Python Warmup",
        "items": [
          "JSON, Dicts, Comprehensions"
        ],
        "tutorialIds": [
          "real-python"
        ]
      },
      {
        "time": "10:45–12:30",
        "title": "FastAPI",
        "items": [
          "Route + Test ohne IDE-Hilfe"
        ],
        "tutorialIds": [
          "fastapi-testclient"
        ]
      },
      {
        "time": "13:30–15:30",
        "title": "Übungen",
        "items": [
          "2 kleine Aufgaben"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Pitch",
        "items": [
          "Signature 5 Min"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "FastAPI live coded",
      "2 Übungen",
      "Pitch geübt"
    ]
  },
  {
    "week": 12,
    "day": "mi",
    "label": "Mittwoch",
    "goal": "5 Bewerbungen",
    "deliverable": "5 Applications sent",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Stellen",
        "items": [
          "LinkedIn, StepStone: 10 Stellen"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Vorlage",
        "items": [
          "Anschreiben Template"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Senden",
        "items": [
          "5 Bewerbungen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Tracking",
        "items": [
          "Tabelle: Firma, Datum, Status"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "10 Stellen identifiziert",
      "5 Bewerbungen raus",
      "Tracking-Tabelle"
    ]
  },
  {
    "week": 12,
    "day": "do",
    "label": "Donnerstag",
    "goal": "5 Bewerbungen",
    "deliverable": "10 total",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "Stellen",
        "items": [
          "5 weitere Stellen"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Anpassen",
        "items": [
          "CV pro Rolle leicht anpassen"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Senden",
        "items": [
          "5 Bewerbungen"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Follow-up",
        "items": [
          "Plan für Nachfassen"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "5 weitere Bewerbungen",
      "10 total",
      "Follow-up Plan"
    ]
  },
  {
    "week": 12,
    "day": "fr",
    "label": "Freitag",
    "goal": "Netzwerk + Meilenstein",
    "deliverable": "3 Kontakte + Reflexion",
    "hours": 7.5,
    "blocks": [
      {
        "time": "09:00–10:30",
        "title": "LinkedIn",
        "items": [
          "3 Kontaktanfragen"
        ],
        "tutorialIds": []
      },
      {
        "time": "10:45–12:30",
        "title": "Mock Interview",
        "items": [
          "Selbst oder mit Freund"
        ],
        "tutorialIds": []
      },
      {
        "time": "13:30–15:30",
        "title": "Reflexion",
        "items": [
          "Was lief gut? Was fehlt?"
        ],
        "tutorialIds": []
      },
      {
        "time": "15:45–17:00",
        "title": "Meilenstein",
        "items": [
          "Plan für Monat 4 optional"
        ],
        "tutorialIds": []
      }
    ],
    "tasks": [
      "3 LinkedIn Kontakte",
      "Mock Interview",
      "Meilenstein Woche 12 erreicht"
    ]
  },
  {
    "week": 12,
    "day": "sa",
    "label": "Samstag",
    "goal": "Feinschliff",
    "deliverable": "Schwache Antworten verbessert",
    "hours": 3,
    "blocks": [
      {
        "time": "09:00–12:00",
        "title": "Nacharbeit",
        "items": [
          "Interview-Antworten verbessern"
        ],
        "tutorialIds": [
          "interview-rag"
        ]
      }
    ],
    "tasks": [
      "Interview-Antworten poliert"
    ]
  }
];

export function getDayPlan(week, day) {
  return DAILY_PLANS.find((d) => d.week === week && d.day === day);
}

export function getWeekDays(week) {
  return DAILY_PLANS.filter((d) => d.week === week);
}

export function getDayTaskIds(dayPlan) {
  return dayPlan.tasks.map((_, i) => `w${dayPlan.week}-${dayPlan.day}-t${i}`);
}

export function getAllDayTaskIds() {
  const ids = [];
  for (const d of DAILY_PLANS) {
    ids.push(...getDayTaskIds(d));
  }
  return ids;
}

export function getDayIndex(week, day) {
  return DAILY_PLANS.findIndex((d) => d.week === week && d.day === day);
}

export function getNextDay(week, day) {
  const idx = getDayIndex(week, day);
  if (idx >= 0 && idx < DAILY_PLANS.length - 1) {
    const n = DAILY_PLANS[idx + 1];
    return { week: n.week, day: n.day };
  }
  return null;
}

export function getPrevDay(week, day) {
  const idx = getDayIndex(week, day);
  if (idx > 0) {
    const p = DAILY_PLANS[idx - 1];
    return { week: p.week, day: p.day };
  }
  return null;
}

/** Optional calendar hint only — not used for progress logic */
export function suggestedDayKey(startDateIso) {
  if (!startDateIso) return { week: 1, day: "mo" };
  const start = new Date(startDateIso + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / (86400000));
  if (diff < 0) return { week: 1, day: "mo" };
  const week = Math.min(12, Math.floor(diff / 7) + 1);
  const dow = diff % 7;
  if (dow === 6) return { week: Math.min(12, week + 1), day: "mo" };
  return { week, day: DAY_ORDER[dow] };
}
