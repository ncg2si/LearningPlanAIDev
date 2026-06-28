#!/usr/bin/env python3
"""Generates daily-plans.js — 12-week zollsoft ML/DL sprint."""

import json

DAY_ORDER = ["mo", "di", "mi", "do", "fr", "sa"]
DAY_LABELS = {"mo": "Montag", "di": "Dienstag", "mi": "Mittwoch", "do": "Donnerstag", "fr": "Freitag", "sa": "Samstag"}
NUM_WEEKS = 12


def blocks(theory, hands, project, docs, tt=None, th=None, tp=None):
    return [
        {"time": "09:00–10:30", "title": "Theorie / Tutorial", "items": theory, "tutorialIds": tt or []},
        {"time": "10:45–12:30", "title": "Hands-on", "items": hands, "tutorialIds": th or []},
        {"time": "13:30–15:30", "title": "Projekt", "items": project, "tutorialIds": tp or []},
        {"time": "15:45–17:00", "title": "Tests & Doku", "items": docs, "tutorialIds": []},
    ]


def day(goal, deliverable, hours, theory, hands, proj, docs, tasks, tt=None, th=None, tp=None):
    if hours <= 3:
        return {"goal": goal, "deliverable": deliverable, "hours": hours,
                "blocks": [{"time": "09:00–12:00", "title": "Puffer", "items": theory + hands, "tutorialIds": tt or []}],
                "tasks": tasks}
    return {"goal": goal, "deliverable": deliverable, "hours": hours,
            "blocks": blocks(theory, hands, proj, docs, tt, th, tp), "tasks": tasks}


def w(days):
    return days


WEEKS = {
1: w([
 day("Dev-Setup", "Repo + venv", 7.5, ["Python 3.11, uv/venv", "Projektstruktur app/"], ["Type Hints Übungen"], ["Repo medizin-ml-portfolio"], ["README, .gitignore"], ["Python installiert", "Repo erstellt", "Erster Commit"], ["uv-docs", "python-typing"], ["python-typing"], []),
 day("FastAPI Basics", "/health live", 7.5, ["FastAPI Kap 1–3"], ["Routes bauen"], ["main.py Struktur"], ["pytest Setup"], ["FastAPI Tutorial", "/health", "uvicorn"], ["fastapi-tutorial"], ["fastapi-tutorial"], []),
 day("Tests & Git", "CI-ready", 7.5, ["pytest, TestClient", "Git Branching"], ["5 Tests"], ["PR Workflow"], ["Badge optional"], ["5 Tests grün", "Branch geübt"], ["pytest-docs", "git-progit"], ["pytest-docs"], []),
 day("Code Quality", "Sauberer Code", 7.5, ["Clean Code ML", "Modulstruktur"], ["Refactor app/"], ["schemas.py, models/"], ["Type Hints vollständig"], ["Module getrennt", "mypy skim"], ["real-python"], [], []),
 day("Meilenstein W1", "Engineering Basis", 7.5, ["Review"], ["Letzte Tests"], ["README final"], ["Push"], ["Meilenstein W1", "GitHub link"], [], [], []),
 day("Puffer W1", "Lücken", 3, ["Nacharbeit"], [], [], ["Offene Tasks"], [], [], []),
]),
2: w([
 day("sklearn Baseline", "Model trainiert", 7.5, ["sklearn Pipeline", "Healthcare Dataset suchen"], ["Train/Test", "Cross-Val"], ["Baseline fit"], ["Metriken notieren"], ["Dataset gewählt", "Baseline F1"], ["sklearn-quickstart", "sklearn-pipeline"], ["sklearn-quickstart"], []),
 day("Metriken medizin", "Confusion + ROC", 7.5, ["F1, P/R medizin", "Confusion Matrix"], ["Plots"], ["classification_report"], ["Interview-Notiz"], ["ROC + CM im Notebook"], ["sklearn-metrics", "statquest-metrics"], ["sklearn-metrics"], []),
 day("FastAPI ML", "/predict live", 7.5, ["Model loading", "Pydantic schema"], ["joblib load", "/predict"], ["Error handling"], ["Tests"], ["API lokal OK"], ["fastapi-tutorial"], ["fastapi-tutorial"], []),
 day("Docker Deploy", "Container", 7.5, ["Dockerfile", "compose"], ["docker build"], [".env.example"], ["curl test"], ["Dockerfile", "compose up"], ["docker-getting-started", "docker-compose"], ["docker-getting-started"], []),
 day("Meilenstein W2", "ML-API live", 7.5, ["Railway/Render"], ["Deploy"], ["Live URL README"], ["Meilenstein W2"], ["Live URL", "Eval README"], ["railway-deploy"], ["railway-deploy"], []),
 day("Puffer W2", "Deploy fix", 3, ["Debug deploy"], [], [], ["curl extern"], [], [], []),
]),
3: w([
 day("PyTorch Setup", "Tensors", 7.5, ["PyTorch 60min", "autograd"], ["Tensor Übungen"], ["MNIST laden"], ["GPU check"], ["Tensors OK", "MNIST loaded"], ["pytorch-60min"], ["pytorch-60min"], []),
 day("Training Loop", "1 Epoch", 7.5, ["Loop Anatomie", "Loss, Optimizer"], ["Manual loop"], ["Loss plot"], ["Checkpoint"], ["1 epoch OK"], ["pytorch-training"], ["pytorch-training"], []),
 day("Volltraining", "MNIST >90%", 7.5, ["nn.Module", "DataLoader"], ["5 epochs"], ["Val accuracy"], ["model.pt"], [">90% val"], ["pytorch-training"], ["pytorch-training"], []),
 day("Overfitting", "Regularization", 7.5, ["Dropout", "Early stop"], ["Experiment"], ["Curves compare"], ["Best save"], ["Dropout doc"], ["pytorch-training"], [], []),
 day("Meilenstein W3", "Loop erklärt", 7.5, ["5 Schritte üben"], ["Inference test"], ["README pytorch"], ["Meilenstein W3"], ["Loop laut", "model.pt"], [], [], []),
 day("Loop üben", "Auswendig", 3, ["5 Schritte"], [], [], ["Ohne Notes"], [], [], []),
]),
4: w([
 day("HAM10000", "Dataset ready", 7.5, ["HAM10000 Docs", "Class balance"], ["Download", "EDA Bilder"], ["Train/val split"], ["Distribution plot"], ["Dataset geladen", "EDA"], ["ham10000", "cs231n-cnn"], ["ham10000"], []),
 day("Transfer Learning", "ResNet train", 7.5, ["Transfer learning", "Freeze layers"], ["ResNet18 fine-tune"], ["Augmentation"], ["Train start"], ["ResNet running"], ["pytorch-transfer"], ["pytorch-transfer"], []),
 day("Augmentation", "F1 verbessern", 7.5, ["Medical aug care", "Weighted loss"], ["Aug pipeline", "Retrain"], ["Per-class metrics"], ["Confusion matrix"], ["F1 improved"], ["pytorch-augment"], ["pytorch-augment"], []),
 day("Eval CV", "Medical metrics", 7.5, ["Recall in medizin", "Error analysis"], ["10 failure cases"], ["Report schreiben"], ["Plots ins repo"], ["Eval report"], ["sklearn-metrics"], [], []),
 day("Meilenstein W4", "Best .pt", 7.5, ["Model select"], ["Save best"], ["README metrics"], ["Meilenstein W4"], ["best.pt", "F1 doc"], [], [], []),
 day("Paper skim", "Medizin CV", 3, ["HAM10000 paper skim"], [], [], ["Notizen"], ["ham10000"], [], []),
]),
5: w([
 day("Inference Design", "Preprocess spec", 7.5, ["FastAPI UploadFile", "Image tensor"], ["preprocess()"], ["Mock endpoint"], ["Tests"], ["Preprocess func"], ["pytorch-inference", "fastapi-tutorial"], ["pytorch-inference"], []),
 day("CV API", "/predict/image", 7.5, ["torch.no_grad", "softmax top-k"], ["Endpoint live"], ["10 test images"], ["Error cases"], ["API OK"], ["pytorch-inference"], ["pytorch-inference"], []),
 day("Docker CV", "Container", 7.5, ["Model volume", "Dockerfile"], ["docker build"], ["compose"], ["E2E local"], ["Docker CV"], ["docker-getting-started"], ["docker-compose"], []),
 day("Deploy CV", "Live URL", 7.5, ["Deploy", "Demo GIF"], ["curl extern"], ["README zollsoft angle"], ["Screenshots"], ["Live CV URL"], ["railway-deploy"], ["railway-deploy"], []),
 day("Meilenstein W5", "CV-API live", 7.5, ["5 Min pitch prep"], ["Polish README"], ["Meilenstein W5"], ["Pin repo"], ["CV live", "Demo GIF"], [], [], []),
 day("Pitch CV", "5 Min üben", 3, ["CV Projekt laut"], [], [], ["1× durch"], [], [], []),
]),
6: w([
 day("spaCy Basics", "NER Demo", 7.5, ["spaCy 101", "de model"], ["10 Texte NER"], ["displacy"], ["Notebook"], ["spaCy OK"], ["spacy-101", "spacy-ner"], ["spacy-101"], []),
 day("Custom NER", "Medizin Rules", 7.5, ["EntityRuler", "Med. Abk."], ["Custom rules"], ["Eval klein"], ["JSON export"], ["Custom NER"], ["spacy-custom"], ["spacy-custom"], []),
 day("Batch NLP", "CLI Pipeline", 7.5, ["nlp.pipe", "Performance"], ["Batch 50 docs"], ["CLI script"], ["Tests"], ["CLI OK"], ["spacy-101"], ["spacy-101"], []),
 day("NLP + API skim", "Optional endpoint", 7.5, ["FastAPI text", "Integration plan"], ["POST /ner optional"], ["README NLP"], ["Push repo"], ["NLP repo"], ["fastapi-tutorial"], [], []),
 day("Meilenstein W6", "NLP GitHub", 7.5, ["Review"], ["Push"], ["Meilenstein W6"], ["Link notieren"], ["NLP repo live"], [], [], []),
 day("Medizin Text", "Beispiele sammeln", 3, ["DE Diktat snippets public"], [], [], ["10 Beispiele"], [], [], []),
]),
7: w([
 day("Whisper Setup", "3 Transkripte", 7.5, ["Whisper docs", "Model sizes"], ["faster-whisper install"], ["3 DE Audio"], ["Quality notes"], ["Whisper OK"], ["whisper-docs", "faster-whisper"], ["whisper-docs"], []),
 day("Transcribe API", "/transcribe", 7.5, ["Audio upload", "Temp files"], ["Endpoint"], ["3 API tests"], ["Timeout"], ["/transcribe live"], ["fastapi-tutorial", "whisper-docs"], ["faster-whisper"], []),
 day("Post-Process", "Domain vocab", 7.5, ["Med. Post-correction", "Regex/list"], ["Post-process func"], ["5 samples improved"], ["Latenz messen"], ["Post-process"], ["whisper-docs"], [], []),
 day("Speech Docker", "compose", 7.5, ["Docker speech", "compose"], ["Local stack"], ["README Speech"], ["Push"], ["Speech repo"], ["docker-compose"], ["docker-compose"], []),
 day("Meilenstein W7", "Speech API", 7.5, ["zollsoft Notiz", "Meilenstein W7"], ["Pitch prep"], ["Commit"], ["Speech demo"], [], [], []),
 day("ASR üben", "2 Min erklären", 3, ["Whisper Pipeline laut"], [], [], ["Interview note"], [], [], []),
]),
8: w([
 day("Linux Bash", "Pipeline script", 7.5, ["Linux survival", "grep find"], ["download.sh"], ["Args, test"], ["chmod +x"], ["Bash script"], ["linux-survival", "bash-guide"], ["bash-guide"], []),
 day("TensorFlow", "Keras Modell", 7.5, ["TF quickstart", "Keras Sequential"], ["Gleiches Problem wie W3"], ["Vergleich PT vs TF"], ["model.h5"], ["TF model trained"], ["tensorflow-quickstart", "keras-guide"], ["tensorflow-quickstart"], []),
 day("MLflow", "3 Runs", 7.5, ["MLflow quickstart", "CV + ML log"], ["Log experiments"], ["UI screenshot"], ["Registry best"], ["MLflow 3 runs"], ["mlflow-quickstart", "mlflow-models"], ["mlflow-quickstart"], []),
 day("Pipeline Doc", "Mermaid", 7.5, ["Full pipeline", "zollsoft wording"], ["Mermaid diagram"], ["1 Seite Pipeline DE"], ["All repos linked"], ["Pipeline doc"], ["mermaid"], [], []),
 day("Meilenstein W8", "TF+MLflow+Pipeline", 7.5, ["Review keywords", "Meilenstein W8"], ["TF vs PT Notiz"], ["Push"], ["All 3 done"], ["tensorflow-quickstart"], [], []),
 day("TF üben", "Keras erklären", 3, ["TF in 2 Min"], [], [], ["Notiz"], ["keras-guide"], [], []),
]),
9: w([
 day("Signature Plan", "Spec + Arch", 7.5, ["CV oder Speech wählen", "zollsoft Fit"], ["Spec schreiben", "Mermaid"], ["Repo setup"], ["Issues list"], ["Spec done"], ["mermaid"], [], []),
 day("Daten + Prep", "Clean data", 7.5, ["Datenakquise", "Preprocessing"], ["Pipeline code", "Tests"], ["EDA/update"], ["Commit"], ["Data ready"], ["ham10000", "whisper-docs"], [], []),
 day("Training", "Model train", 7.5, ["Hyperparams", "Train loop"], ["Full train", "MLflow log"], ["Val metrics"], ["Checkpoint"], ["Model trained"], ["pytorch-transfer", "mlflow-quickstart"], [], []),
 day("Eval deep", "Error analysis", 7.5, ["20 failures", "Medical metrics"], ["Report", "SHAP optional"], ["Plots"], ["Design decisions"], ["Eval report"], ["shap-docs"], ["shap-docs"], []),
 day("Meilenstein W9", "Model ready", 7.5, ["Review", "Meilenstein W9"], ["Prepare deploy"], ["Push"], ["Eval complete"], [], [], []),
 day("Ethik", "Bias Note", 3, ["Medizin Ethik", "DSGVO skim"], [], [], ["1 Seite Ethik"], [], [], []),
]),
10: w([
 day("Production API", "Hardened", 7.5, ["Rate limit", "Health"], ["/health /ready"], ["Structured logs"], ["Tests"], ["Prod API"], ["slowapi", "fastapi-async"], ["slowapi"], []),
 day("Docker Deploy", "Live", 7.5, ["Production Dockerfile", "Deploy"], ["E2E extern"], ["Fix issues"], ["URL"], ["Live signature"], ["railway-deploy", "docker-getting-started"], ["railway-deploy"], []),
 day("CI", "Actions green", 7.5, ["GitHub Actions", "pytest CI"], ["All repos CI"], ["Badges"], ["Fix failures"], ["CI green"], ["gh-actions"], ["gh-actions"], []),
 day("Demo Video", "Loom 5min", 7.5, ["Script", "Record"], ["Upload link"], ["README final"], ["Metrics table"], ["Video link"], ["loom"], [], []),
 day("Meilenstein W10", "Signature live", 7.5, ["5 Min pitch", "Meilenstein W10"], ["Pin GitHub"], ["Celebrate"], ["Live + video"], [], [], []),
 day("Pitch Signature", "3× üben", 3, ["5 Min Walkthrough"], [], [], ["3× laut"], [], [], []),
]),
11: w([
 day("Portfolio README", "3 Repos polish", 7.5, ["Template", "GIFs/URLs"], ["ML API README"], ["CV README"], ["Speech README"], ["3 READMEs"], ["github-readme-guide"], [], []),
 day("Anschreiben zollsoft", "DE Anschreiben", 7.5, ["Stellenanzeige analysieren", "Keywords"], ["Anschreiben draft", "CV update"], ["LinkedIn"], ["Feedback"], ["Anschreiben v1"], [], [], []),
 day("Lebenslauf", "1-Seiter DE", 7.5, ["Projekte first", "DS Weiterbildung"], ["PDF export", "Links live"], ["Korrektur"], ["CV fertig"], [], [], []),
 day("Kompetenzprofil", "Skills Matrix", 7.5, ["PyTorch TF sklearn", "CV Speech Deploy"], ["1 Seite Profil"], ["Match zollsoft"], ["Commit docs/"], ["Profil done"], [], [], []),
 day("Meilenstein W11", "Bewerbungsmappe", 7.5, ["Review als Recruiter", "Meilenstein W11"], ["Final polish"], ["Push"], ["Mappe fertig"], [], [], []),
 day("zollsoft research", "Firma verstehen", 3, ["tomedo", "KI Team"], [], [], ["5 Notizen"], [], [], []),
]),
12: w([
 day("Interview Antworten", "15 schriftlich", 7.5, ["15 Fragen PLAN", "Medizin Beispiele"], ["Antworten schreiben"], ["docs/interview.md"], ["Laut üben 5"], ["15 Antworten"], ["interview-ml", "zollsoft-jobs"], ["interview-ml"], []),
 day("Pitch CV", "5 Min ×3", 7.5, ["CV Projekt", "Metriken"], ["3× pitch"], ["Feedback notizen"], ["Timing"], ["CV pitch OK"], [], [], []),
 day("Pitch Speech", "5 Min ×3", 7.5, ["Speech Projekt", "Whisper"], ["3× pitch"], ["Notizen"], ["Timing"], ["Speech pitch OK"], [], [], []),
 day("Bewerbung", "zollsoft senden", 7.5, ["PDFs", "Online Form"], ["zollsoft bewerben", "5 ähnliche"], ["Tracking Tabelle"], ["Confirm email"], ["zollsoft raus"], ["zollsoft-jobs"], [], []),
 day("Meilenstein W12", "Sprint done", 7.5, ["Mock interview", "Reflexion 12 Wo", "Meilenstein W12"], ["Next steps"], ["Plan complete"], ["zollsoft + tracking"], [], [], []),
 day("Feiern", "Pause", 3, ["Erholen"], [], [], ["Optional follow-up"], [], [], []),
]),
}

plans = []
for week_num in range(1, NUM_WEEKS + 1):
    for i, dk in enumerate(DAY_ORDER):
        d = WEEKS[week_num][i]
        plans.append({"week": week_num, "day": dk, "label": DAY_LABELS[dk], **d})

js = f'''/** Auto-generated — {NUM_WEEKS}-week zollsoft ML/DL sprint */

export const DAY_ORDER = {json.dumps(DAY_ORDER)};

export const DAY_LABELS = {json.dumps(DAY_LABELS, ensure_ascii=False, indent=2)};

export const DAILY_PLANS = {json.dumps(plans, ensure_ascii=False, indent=2)};

export function getDayPlan(week, day) {{
  return DAILY_PLANS.find((d) => d.week === week && d.day === day);
}}

export function getWeekDays(week) {{
  return DAILY_PLANS.filter((d) => d.week === week);
}}

export function getDayTaskIds(dayPlan) {{
  return dayPlan.tasks.map((_, i) => `w${{dayPlan.week}}-${{dayPlan.day}}-t${{i}}`);
}}

export function getAllDayTaskIds() {{
  const ids = [];
  for (const d of DAILY_PLANS) {{
    ids.push(...getDayTaskIds(d));
  }}
  return ids;
}}

export function getNextDay(week, day) {{
  const idx = DAILY_PLANS.findIndex((d) => d.week === week && d.day === day);
  if (idx < 0 || idx >= DAILY_PLANS.length - 1) return null;
  const next = DAILY_PLANS[idx + 1];
  return {{ week: next.week, day: next.day }};
}}

export function getPrevDay(week, day) {{
  const idx = DAILY_PLANS.findIndex((d) => d.week === week && d.day === day);
  if (idx <= 0) return null;
  const prev = DAILY_PLANS[idx - 1];
  return {{ week: prev.week, day: prev.day }};
}}

export function getDayIndex(week, day) {{
  return DAILY_PLANS.findIndex((d) => d.week === week && d.day === day);
}}

export function suggestedDayKey(startDateIso) {{
  if (!startDateIso) return {{ week: 1, day: "mo" }};
  const start = new Date(startDateIso + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / 86400000);
  if (diff < 0) return {{ week: 1, day: "mo" }};
  const week = Math.min({NUM_WEEKS}, Math.floor(diff / 7) + 1);
  const dow = diff % 7;
  if (dow === 6) return {{ week: Math.min({NUM_WEEKS}, week + 1), day: "mo" }};
  return {{ week, day: DAY_ORDER[dow] }};
}}
'''

open("/Users/cami/Projects/llm-lernplan-tracker/daily-plans.js", "w", encoding="utf-8").write(js)
print(f"Generated {len(plans)} daily plans")
