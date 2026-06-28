import { PLAN, getAllTaskIds } from "./plan-data.js";
import {
  DAILY_PLANS,
  DAY_LABELS,
  DAY_ORDER,
  getDayPlan,
  getWeekDays,
  getDayTaskIds,
  suggestedDayKey,
} from "./daily-plans.js";
import { WEEK_TUTORIALS, GLOBAL_RESOURCES, TUTORIAL_TYPES } from "./tutorials.js";

const STORAGE_KEY = "llm-lernplan-progress-v2";
const DATE_KEY = "llm-lernplan-start-date";

let progress = loadProgress();
let currentView = "dashboard";

const phaseColors = {
  a: "var(--phase-a)",
  b: "var(--phase-b)",
  c: "var(--phase-c)",
  d: "var(--phase-d)",
  e: "var(--phase-e)",
};

const tutorialById = {};
for (const w of Object.values(WEEK_TUTORIALS).flat()) {
  tutorialById[w.id] = w;
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return {};
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  render();
}

function loadStartDate() {
  return localStorage.getItem(DATE_KEY) || "";
}

function saveStartDate(value) {
  if (value) localStorage.setItem(DATE_KEY, value);
  else localStorage.removeItem(DATE_KEY);
  render();
}

function getWeekPhase(weekNum) {
  return PLAN.phases.find((p) => p.weeks.includes(weekNum));
}

function countDone(ids) {
  return ids.filter((id) => progress[id]).length;
}

function dayProgress(dayPlan) {
  const ids = getDayTaskIds(dayPlan);
  return { done: countDone(ids), total: ids.length, ids };
}

function weekProgressNum(weekNum) {
  const days = getWeekDays(weekNum);
  let done = 0;
  let total = 0;
  for (const d of days) {
    const p = dayProgress(d);
    done += p.done;
    total += p.total;
  }
  if (progress[`w${weekNum}-milestone`]) done += 1;
  total += 1;
  return { done, total };
}

function overallProgress() {
  const ids = getAllTaskIds();
  return { done: countDone(ids), total: ids.length };
}

function suggestedWeek() {
  return suggestedDayKey(loadStartDate()).week;
}

function suggestedDay() {
  return suggestedDayKey(loadStartDate());
}

function toggleTask(id) {
  progress[id] = !progress[id];
  saveProgress();
}

function resetProgress() {
  if (confirm("Fortschritt wirklich zurücksetzen? Alle Häkchen gehen verloren.")) {
    progress = {};
    localStorage.removeItem(STORAGE_KEY);
    render();
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateDE(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function renderTaskItem(id, label, isMilestone = false) {
  const done = !!progress[id];
  return `
    <li class="task-item ${done ? "done" : ""} ${isMilestone ? "milestone" : ""}" data-id="${id}">
      <input type="checkbox" ${done ? "checked" : ""} aria-label="${escapeHtml(label)}" />
      <span class="task-label">${escapeHtml(label)}</span>
    </li>`;
}

function renderTutorialCard(t) {
  const typeLabel = TUTORIAL_TYPES[t.type] || t.type;
  const steps =
    t.steps && t.steps.length
      ? `<ol class="tutorial-steps">${t.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>`
      : "";
  return `
    <article class="tutorial-card">
      <div class="tutorial-header">
        <span class="tutorial-type">${escapeHtml(typeLabel)}</span>
        <span class="tutorial-meta">${escapeHtml(t.cost)} · ${escapeHtml(t.duration)}</span>
      </div>
      <h4><a href="${t.url}" target="_blank" rel="noopener">${escapeHtml(t.title)}</a></h4>
      ${t.when ? `<p class="tutorial-when"><strong>Wann:</strong> ${escapeHtml(t.when)}</p>` : ""}
      <p class="tutorial-desc">${escapeHtml(t.description)}</p>
      ${steps ? `<p class="tutorial-steps-label"><strong>So lernen:</strong></p>${steps}` : ""}
    </article>`;
}

function renderTutorialByIds(ids) {
  if (!ids || !ids.length) return "";
  const cards = ids
    .map((id) => tutorialById[id])
    .filter(Boolean)
    .map(renderTutorialCard)
    .join("");
  return cards ? `<div class="tutorial-grid">${cards}</div>` : "";
}

function parseView() {
  if (currentView.startsWith("day-")) {
    const m = currentView.match(/^day-(\d+)-(\w+)$/);
    if (m) return { type: "day", week: +m[1], day: m[2] };
  }
  if (currentView.startsWith("week-")) {
    return { type: "week", week: parseInt(currentView.replace("week-", ""), 10) };
  }
  return { type: currentView };
}

function renderSidebar() {
  const overall = overallProgress();
  const pct = overall.total ? Math.round((overall.done / overall.total) * 100) : 0;
  const startDate = loadStartDate();
  const sug = suggestedDay();
  const view = parseView();

  const weekNav = PLAN.weeks
    .map((week) => {
      const { done, total } = weekProgressNum(week.number);
      const wp = total ? Math.round((done / total) * 100) : 0;
      const active =
        view.type === "week" && view.week === week.number ? "active" : "";
      const inWeek =
        view.type === "day" && view.week === week.number ? "active-week" : "";
      const suggestedMark =
        week.number === sug.week && startDate ? " · jetzt" : "";
      return `
        <li class="nav-item">
          <button class="${active || inWeek}" data-view="week-${week.number}">
            <span class="week-num">${week.number}</span>
            <span>Woche ${week.number}${suggestedMark}</span>
            <span class="mini-bar"><span class="mini-fill" style="width:${wp}%"></span></span>
          </button>
        </li>`;
    })
    .join("");

  const todayBtn = startDate
    ? `<button class="btn btn-accent" data-view="day-${sug.week}-${sug.day}">Heute: W${sug.week} ${DAY_LABELS[sug.day]}</button>`
    : "";

  return `
    <aside class="sidebar">
      <div class="brand">
        <h1>LLM/RAG Lernplan</h1>
        <p>12 Wochen · 72 Tage · KI-Entwickler</p>
      </div>
      <div class="overall-progress">
        <label>Gesamtfortschritt</label>
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${pct}%"></div>
        </div>
        <div class="progress-stats">
          <span><strong>${overall.done}</strong> / ${overall.total}</span>
          <span><strong>${pct}%</strong></span>
        </div>
      </div>
      <div class="start-date">
        <label for="start-date">Startdatum (Woche 1, Montag)</label>
        <input type="date" id="start-date" value="${startDate}" />
      </div>
      ${todayBtn}
      <nav class="nav-section">
        <h2>Navigation</h2>
        <ul class="nav-list">
          <li class="nav-item">
            <button class="${currentView === "dashboard" ? "active" : ""}" data-view="dashboard">Übersicht</button>
          </li>
          ${weekNav}
          <li class="nav-item">
            <button class="${currentView === "tutorials" ? "active" : ""}" data-view="tutorials">Alle Tutorials</button>
          </li>
          <li class="nav-item">
            <button class="${currentView === "checklist" ? "active" : ""}" data-view="checklist">Bewerbungs-Checkliste</button>
          </li>
          <li class="nav-item">
            <button class="${currentView === "interview" ? "active" : ""}" data-view="interview">Interview-Fragen</button>
          </li>
          <li class="nav-item">
            <button class="${currentView === "reference" ? "active" : ""}" data-view="reference">Referenz</button>
          </li>
        </ul>
      </nav>
      <div class="sidebar-actions">
        <button class="btn btn-danger" id="reset-btn">Fortschritt zurücksetzen</button>
      </div>
    </aside>`;
}

function renderDayTabs(weekNum, activeDay) {
  const days = getWeekDays(weekNum);
  return `
    <div class="day-tabs">
      ${days
        .map((d) => {
          const { done, total } = dayProgress(d);
          const pct = total ? Math.round((done / total) * 100) : 0;
          const active = d.day === activeDay ? "active" : "";
          const isToday =
            loadStartDate() &&
            suggestedDay().week === weekNum &&
            suggestedDay().day === d.day
              ? " today"
              : "";
          return `
            <button class="day-tab ${active}${isToday}" data-view="day-${weekNum}-${d.day}">
              <span class="day-tab-label">${d.label.slice(0, 2)}</span>
              <span class="day-tab-name">${escapeHtml(d.label)}</span>
              <span class="day-tab-pct">${pct}%</span>
            </button>`;
        })
        .join("")}
    </div>`;
}

function renderDashboard() {
  const sug = suggestedDay();
  const startDate = loadStartDate();
  const hint = startDate
    ? `<div class="current-week-hint">Start: <strong>${formatDateDE(startDate)}</strong> → heute <strong>Woche ${sug.week}, ${DAY_LABELS[sug.day]}</strong>. <button class="link-btn" data-view="day-${sug.week}-${sug.day}">Zum Tagesplan →</button></div>`
    : `<div class="current-week-hint">Setze dein <strong>Startdatum</strong> (Montag Woche 1), um den Tagesplan zu verfolgen.</div>`;

  const cards = PLAN.weeks
    .map((week) => {
      const phase = getWeekPhase(week.number);
      const { done, total } = weekProgressNum(week.number);
      const pct = total ? Math.round((done / total) * 100) : 0;
      return `
        <article class="week-card" data-view="week-${week.number}">
          <span class="phase-badge" style="background:${phaseColors[phase.id]}22;color:${phaseColors[phase.id]}">${phase.name}</span>
          <h4>Woche ${week.number}: ${escapeHtml(week.title)}</h4>
          <p>${escapeHtml(week.outcome)}</p>
          <div class="bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
          <div class="progress-stats sub"><span>${done}/${total} Tasks</span><span>${pct}%</span></div>
        </article>`;
    })
    .join("");

  return `
    <div class="view-header">
      <h2>${escapeHtml(PLAN.title)}</h2>
      <p class="meta">${escapeHtml(PLAN.subtitle)}</p>
    </div>
    ${hint}
    <div class="dashboard-grid">${cards}</div>
    <div class="card">
      <h3>Tagesrhythmus (Vollzeit, Mo–Fr ~7,5 h · Sa ~3 h · So frei)</h3>
      <table class="rhythm-table">
        <tbody>
          ${PLAN.dailyRhythm.map((r) => `<tr><th>${escapeHtml(r.time)}</th><td>${escapeHtml(r.activity)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

function renderWeek(weekNum) {
  const week = PLAN.weeks.find((w) => w.number === weekNum);
  if (!week) return "";
  const phase = getWeekPhase(weekNum);
  const { done, total } = weekProgressNum(weekNum);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const tutorials = WEEK_TUTORIALS[weekNum] || [];

  const dayCards = getWeekDays(weekNum)
    .map((d) => {
      const dp = dayProgress(d);
      const dpct = dp.total ? Math.round((dp.done / dp.total) * 100) : 0;
      return `
        <article class="day-card" data-view="day-${weekNum}-${d.day}">
          <div class="day-card-top">
            <strong>${escapeHtml(d.label)}</strong>
            <span class="hours-badge">${d.hours}h</span>
          </div>
          <p class="day-goal">${escapeHtml(d.goal)}</p>
          <p class="day-deliverable">→ ${escapeHtml(d.deliverable)}</p>
          <div class="bar-wrap"><div class="progress-bar" style="width:${dpct}%"></div></div>
          <span class="sub">${dp.done}/${dp.total}</span>
        </article>`;
    })
    .join("");

  const milestoneDone = progress[`w${weekNum}-milestone`];

  return `
    <div class="view-header">
      <span class="phase-badge" style="background:${phaseColors[phase.id]}22;color:${phaseColors[phase.id]}">${phase.name} · ${escapeHtml(phase.label)}</span>
      <h2>Woche ${weekNum}: ${escapeHtml(week.title)}</h2>
      <p class="meta"><strong>Fokus:</strong> ${escapeHtml(week.focus)} · <strong>Ergebnis:</strong> ${escapeHtml(week.outcome)}</p>
    </div>
    ${renderDayTabs(weekNum, null)}
    <div class="week-progress-header">
      <div class="progress-bar-wrap" style="flex:1;max-width:400px"><div class="progress-bar" style="width:${pct}%"></div></div>
      <span class="pct">${pct}%</span>
      <span class="meta">${done}/${total}</span>
    </div>
    <h3 class="section-title">Tagespläne diese Woche</h3>
    <div class="day-cards-grid">${dayCards}</div>
    <div class="card milestone-card">
      <h3>Wochen-Meilenstein</h3>
      <ul class="task-list">${renderTaskItem(`w${weekNum}-milestone`, week.milestone, true)}</ul>
    </div>
    ${
      tutorials.length
        ? `<h3 class="section-title">Tutorials — wie & wo lernen (Woche ${weekNum})</h3><div class="tutorial-grid">${tutorials.map(renderTutorialCard).join("")}</div>`
        : ""
    }`;
}

function renderDay(weekNum, dayKey) {
  const dayPlan = getDayPlan(weekNum, dayKey);
  const week = PLAN.weeks.find((w) => w.number === weekNum);
  if (!dayPlan || !week) return "";
  const phase = getWeekPhase(weekNum);
  const { done, total } = dayProgress(dayPlan);
  const pct = total ? Math.round((done / total) * 100) : 0;

  const blocks = dayPlan.blocks
    .map((block) => {
      const items = block.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("");
      const tut = renderTutorialByIds(block.tutorialIds);
      return `
        <article class="block-card">
          <div class="block-header">
            <span class="block-time">${escapeHtml(block.time)}</span>
            <h4>${escapeHtml(block.title)}</h4>
          </div>
          <ul class="block-items">${items}</ul>
          ${tut ? `<div class="block-tutorials"><p class="sub"><strong>Lernmaterial:</strong></p>${tut}</div>` : ""}
        </article>`;
    })
    .join("");

  const tasks = dayPlan.tasks
    .map((t, i) => renderTaskItem(`w${weekNum}-${dayKey}-t${i}`, t))
    .join("");

  const weekTutorials = WEEK_TUTORIALS[weekNum] || [];

  return `
    <div class="view-header">
      <span class="phase-badge" style="background:${phaseColors[phase.id]}22;color:${phaseColors[phase.id]}">Woche ${weekNum}</span>
      <h2>${escapeHtml(dayPlan.label)} — ${escapeHtml(dayPlan.goal)}</h2>
      <p class="meta"><strong>Deliverable:</strong> ${escapeHtml(dayPlan.deliverable)} · <strong>${dayPlan.hours} h</strong></p>
    </div>
    ${renderDayTabs(weekNum, dayKey)}
    <div class="week-progress-header">
      <div class="progress-bar-wrap" style="flex:1;max-width:400px"><div class="progress-bar" style="width:${pct}%"></div></div>
      <span class="pct">${pct}%</span>
      <span class="meta">${done}/${total} Tasks</span>
    </div>
    <div class="breadcrumb">
      <button class="link-btn" data-view="week-${weekNum}">← Woche ${weekNum}: ${escapeHtml(week.title)}</button>
    </div>
    <h3 class="section-title">Tagesplan — Zeitblöcke</h3>
    <div class="blocks-grid">${blocks}</div>
    <div class="card">
      <h3>Heute abhaken</h3>
      <ul class="task-list">${tasks}</ul>
    </div>
    ${
      weekTutorials.length
        ? `<details class="card tutorials-collapse"><summary><h3>Woche ${weekNum} — alle Tutorials (${weekTutorials.length})</summary><div class="tutorial-grid">${weekTutorials.map(renderTutorialCard).join("")}</div></details>`
        : ""
    }`;
}

function renderAllTutorials() {
  const weeks = Object.keys(WEEK_TUTORIALS)
    .sort((a, b) => +a - +b)
    .map((w) => {
      const list = WEEK_TUTORIALS[w];
      return `
        <section class="tutorial-week-section">
          <h3>Woche ${w}</h3>
          <div class="tutorial-grid">${list.map(renderTutorialCard).join("")}</div>
        </section>`;
    })
    .join("");

  const global = GLOBAL_RESOURCES.map(renderTutorialCard).join("");

  return `
    <div class="view-header">
      <h2>Alle Tutorials & Lernressourcen</h2>
      <p class="meta">Links, Reihenfolge und konkrete Schritte — kostenlos wo möglich</p>
    </div>
    <div class="card">
      <h3>Globale Ressourcen</h3>
      <div class="tutorial-grid">${global}</div>
    </div>
    ${weeks}`;
}

function renderChecklist() {
  const items = PLAN.finalChecklist.map((item, i) => renderTaskItem(`final-${i}`, item)).join("");
  const done = countDone(PLAN.finalChecklist.map((_, i) => `final-${i}`));
  const total = PLAN.finalChecklist.length;

  return `
    <div class="view-header">
      <h2>Bewerbungs-Checkliste</h2>
      <p class="meta">Ende Woche 11 — alles abhaken = bewerbungsfähig</p>
    </div>
    <div class="week-progress-header">
      <div class="progress-bar-wrap" style="flex:1;max-width:400px"><div class="progress-bar" style="width:${Math.round((done / total) * 100)}%"></div></div>
      <span class="pct">${done}/${total}</span>
    </div>
    <div class="card"><ul class="task-list">${items}</ul></div>`;
}

function renderInterview() {
  return `
    <div class="view-header">
      <h2>Interview-Vorbereitung</h2>
      <p class="meta">Top 10 Fragen — Antworten laut üben (Woche 12)</p>
    </div>
    <div class="card">
      <ol>${PLAN.interviewQuestions.map((q) => `<li style="margin-bottom:0.6rem">${escapeHtml(q)}</li>`).join("")}</ol>
    </div>
    <div class="card">
      <h3>Empfohlene Lektüre</h3>
      <div class="tutorial-grid">${renderTutorialCard(tutorialById["interview-rag"])}</div>
    </div>`;
}

function renderReference() {
  const phases = PLAN.phases
    .map(
      (p) =>
        `<tr><td style="color:${phaseColors[p.id]}">${escapeHtml(p.name)}</td><td>${escapeHtml(p.label)}</td><td>Woche ${p.weeks.join(", ")}</td></tr>`
    )
    .join("");
  const tech = PLAN.techStack
    .map((t) => `<tr><td>${escapeHtml(t.category)}</td><td>${escapeHtml(t.choice)}</td></tr>`)
    .join("");

  return `
    <div class="view-header">
      <h2>Referenz</h2>
      <p class="meta">Phasen, Tech-Stack, Budget</p>
    </div>
    <div class="cards">
      <div class="card"><h3>Phasen</h3><table class="tech-table"><tbody>${phases}</tbody></table></div>
      <div class="card"><h3>Tech-Stack</h3><table class="tech-table"><tbody>${tech}</tbody></table></div>
      <div class="card"><h3>Nicht lernen</h3><ul><li>TensorFlow</li><li>Transformer from scratch</li><li>Kubernetes (erstmal)</li><li>5 RAG-Frameworks parallel</li></ul></div>
      <div class="card"><h3>Budget / Monat</h3><ul><li>OpenAI: 20–50 €</li><li>Tavily: 0–20 €</li><li>Hosting: 0–10 €</li></ul></div>
    </div>`;
}

function renderMain() {
  const view = parseView();
  if (currentView === "dashboard") return renderDashboard();
  if (currentView === "tutorials") return renderAllTutorials();
  if (currentView === "checklist") return renderChecklist();
  if (currentView === "interview") return renderInterview();
  if (currentView === "reference") return renderReference();
  if (view.type === "week") return renderWeek(view.week);
  if (view.type === "day") return renderDay(view.week, view.day);
  return renderDashboard();
}

function bindEvents(root) {
  root.querySelectorAll("[data-view]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const view = el.dataset.view;
      if (!view) return;
      if (
        view.startsWith("week-") ||
        view.startsWith("day-") ||
        ["dashboard", "checklist", "interview", "reference", "tutorials"].includes(view)
      ) {
        e.preventDefault();
        currentView = view;
        render();
      }
    });
  });

  root.querySelectorAll(".task-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.tagName === "A") return;
      toggleTask(item.dataset.id);
    });
  });

  const dateInput = root.querySelector("#start-date");
  if (dateInput) dateInput.addEventListener("change", (e) => saveStartDate(e.target.value));

  const resetBtn = root.querySelector("#reset-btn");
  if (resetBtn) resetBtn.addEventListener("click", resetProgress);
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = renderSidebar() + `<main class="main">${renderMain()}</main>`;
  bindEvents(app);
}

render();
