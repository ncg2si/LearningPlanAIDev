import { PLAN, getAllTaskIds } from "./plan-data.js";
import {
  DAILY_PLANS,
  DAY_LABELS,
  getDayPlan,
  getWeekDays,
  getDayTaskIds,
  getNextDay,
  getPrevDay,
  getDayIndex,
} from "./daily-plans.js";
import {
  WEEK_TUTORIALS,
  WEEK_SUPPLEMENTS,
  GLOBAL_RESOURCES,
  GLOBAL_SUPPLEMENTS,
  TUTORIAL_TYPES,
  getWeekSupplements,
  getGlobalSupplements,
} from "./tutorials.js";

const STORAGE_KEY = "llm-lernplan-progress-v3";
const STORAGE_KEY_LEGACY = "llm-lernplan-progress-v2";
const CURRENT_DAY_KEY = "llm-lernplan-current-day";
const VIEW_KEY = "llm-lernplan-last-view";
const DATE_KEY = "llm-lernplan-start-date-optional";

let progress = loadProgress();
let currentView = loadLastView() || "dashboard";

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
for (const s of [...GLOBAL_SUPPLEMENTS, ...Object.values(WEEK_SUPPLEMENTS).flat()]) {
  tutorialById[s.id] = s;
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeProgress(JSON.parse(raw));
  } catch (_) {}
  try {
    const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
    if (legacy) {
      const migrated = normalizeProgress(JSON.parse(legacy));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (_) {}
  return {};
}

function normalizeProgress(obj) {
  const out = {};
  for (const [id, val] of Object.entries(obj || {})) {
    if (val === true) out[id] = { completedAt: null };
    else if (val && typeof val === "object") out[id] = { completedAt: val.completedAt || null };
  }
  return out;
}

function isTaskDone(id) {
  return Object.prototype.hasOwnProperty.call(progress, id);
}

function getTaskCompletedAt(id) {
  return progress[id]?.completedAt || null;
}

function getTaskLabel(id) {
  if (id.startsWith("final-")) {
    const i = parseInt(id.replace("final-", ""), 10);
    return PLAN.finalChecklist[i] || id;
  }
  const milestone = id.match(/^w(\d+)-milestone$/);
  if (milestone) {
    const week = PLAN.weeks.find((w) => w.number === +milestone[1]);
    return week ? `Meilenstein W${week.number}: ${week.milestone}` : id;
  }
  const dayTask = id.match(/^w(\d+)-(\w+)-t(\d+)$/);
  if (dayTask) {
    const plan = getDayPlan(+dayTask[1], dayTask[2]);
    const label = plan?.tasks[+dayTask[3]];
    if (label) return `W${dayTask[1]} ${DAY_LABELS[dayTask[2]] || dayTask[2]}: ${label}`;
  }
  return id;
}

function getTaskMeta(id) {
  if (id.startsWith("final-")) return { type: "checklist" };
  const milestone = id.match(/^w(\d+)-milestone$/);
  if (milestone) return { type: "milestone", week: +milestone[1] };
  const dayTask = id.match(/^w(\d+)-(\w+)-t(\d+)$/);
  if (dayTask) return { type: "day", week: +dayTask[1], day: dayTask[2] };
  return { type: "other" };
}

function getAllCompletions() {
  return Object.entries(progress)
    .map(([id, entry]) => ({
      id,
      label: getTaskLabel(id),
      completedAt: entry.completedAt,
      meta: getTaskMeta(id),
    }))
    .sort((a, b) => {
      if (!a.completedAt && !b.completedAt) return 0;
      if (!a.completedAt) return 1;
      if (!b.completedAt) return -1;
      return new Date(b.completedAt) - new Date(a.completedAt);
    });
}

function toLocalDateKey(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getStudyDayCounts() {
  const byDate = {};
  for (const { completedAt } of getAllCompletions()) {
    if (!completedAt) continue;
    const key = toLocalDateKey(completedAt);
    if (!key) continue;
    byDate[key] = (byDate[key] || 0) + 1;
  }
  return byDate;
}

function getDayCompletionDate(dayPlan) {
  if (!isDayComplete(dayPlan)) return null;
  let latest = null;
  for (const id of getDayTaskIds(dayPlan)) {
    const at = getTaskCompletedAt(id);
    if (at && (!latest || at > latest)) latest = at;
  }
  return latest;
}

function getProgressStats() {
  const overall = overallProgress();
  const completions = getAllCompletions();
  const withDates = completions.filter((c) => c.completedAt);
  const studyDays = getStudyDayCounts();
  const studyDayKeys = Object.keys(studyDays).sort();
  const firstActivity = studyDayKeys[0] || null;
  const lastActivity = studyDayKeys[studyDayKeys.length - 1] || null;
  const lastCompletion = withDates[0]?.completedAt || null;

  let spanDays = null;
  if (firstActivity && lastActivity) {
    const start = new Date(firstActivity + "T00:00:00");
    const end = new Date(lastActivity + "T00:00:00");
    spanDays = Math.floor((end - start) / 86400000) + 1;
  }

  return {
    overall,
    pct: overall.total ? Math.round((overall.done / overall.total) * 100) : 0,
    completedDays: countCompletedDays(),
    totalDays: DAILY_PLANS.length,
    studySessions: studyDayKeys.length,
    totalCompletions: completions.length,
    firstActivity,
    lastActivity,
    lastCompletion,
    spanDays,
    studyDays,
  };
}

function getActivitySeries(days = 14) {
  const counts = getStudyDayCounts();
  const series = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${day}`;
    series.push({ date: key, count: counts[key] || 0, label: formatDateDE(key) });
  }
  const max = Math.max(1, ...series.map((s) => s.count));
  return { series, max };
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  render();
}

function loadLastView() {
  return localStorage.getItem(VIEW_KEY) || "";
}

function saveLastView(view) {
  localStorage.setItem(VIEW_KEY, view);
}

function loadCurrentDay() {
  try {
    const raw = localStorage.getItem(CURRENT_DAY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return findFirstIncompleteDay();
}

function saveCurrentDay(week, day) {
  localStorage.setItem(CURRENT_DAY_KEY, JSON.stringify({ week, day }));
}

function findFirstIncompleteDay() {
  for (const d of DAILY_PLANS) {
    const { done, total } = dayProgress(d);
    if (done < total) return { week: d.week, day: d.day };
  }
  const last = DAILY_PLANS[DAILY_PLANS.length - 1];
  return { week: last.week, day: last.day };
}

/** Nächster sinnvoller Tag ab aktueller Position (flexibles Lernen) */
function getOpenDayInfo() {
  const current = loadCurrentDay();
  const currentPlan = getDayPlan(current.week, current.day);
  const currentIdx = getDayIndex(current.week, current.day);

  if (currentPlan) {
    const p = dayProgress(currentPlan);
    if (p.done < p.total) {
      return {
        week: current.week,
        day: current.day,
        kind: "continue",
        done: p.done,
        total: p.total,
        plan: currentPlan,
      };
    }
  }

  if (currentIdx >= 0) {
    for (let i = currentIdx + 1; i < DAILY_PLANS.length; i++) {
      const d = DAILY_PLANS[i];
      const p = dayProgress(d);
      if (p.done < p.total) {
        return { week: d.week, day: d.day, kind: "next", done: p.done, total: p.total, plan: d };
      }
    }
    for (let i = 0; i < currentIdx; i++) {
      const d = DAILY_PLANS[i];
      const p = dayProgress(d);
      if (p.done < p.total) {
        return { week: d.week, day: d.day, kind: "gap", done: p.done, total: p.total, plan: d };
      }
    }
  } else {
    const first = findFirstIncompleteDay();
    const plan = getDayPlan(first.week, first.day);
    const p = plan ? dayProgress(plan) : { done: 0, total: 0 };
    return { ...first, kind: "next", done: p.done, total: p.total, plan };
  }

  const last = DAILY_PLANS[DAILY_PLANS.length - 1];
  return {
    week: last.week,
    day: last.day,
    kind: "done",
    done: 0,
    total: 0,
    plan: getDayPlan(last.week, last.day),
  };
}

function formatDayRef(week, day) {
  return `Woche ${week} · ${DAY_LABELS[day] || day}`;
}

function formatOpenDayLabel(info) {
  const ref = formatDayRef(info.week, info.day);
  const open = info.total - info.done;
  const taskHint = info.total > 0 ? ` (${open} von ${info.total} offen)` : "";

  switch (info.kind) {
    case "continue":
      return `Weitermachen: ${ref}${taskHint}`;
    case "next":
      return `Nächster offener Tag: ${ref}${taskHint}`;
    case "gap":
      return `Lücke schließen: ${ref}${taskHint}`;
    case "done":
      return "Alles erledigt — Glückwunsch!";
    default:
      return ref;
  }
}

function isDayComplete(dayPlan) {
  const { done, total } = dayProgress(dayPlan);
  return total > 0 && done === total;
}

function countCompletedDays() {
  return DAILY_PLANS.filter(isDayComplete).length;
}

function navigateTo(view, { setCurrent = false } = {}) {
  currentView = view;
  if (setCurrent && view.startsWith("day-")) {
    const m = view.match(/^day-(\d+)-(\w+)$/);
    if (m) saveCurrentDay(+m[1], m[2]);
  }
  saveLastView(view);
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
  return ids.filter(isTaskDone).length;
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
  if (isTaskDone(`w${weekNum}-milestone`)) done += 1;
  total += 1;
  return { done, total };
}

function overallProgress() {
  const ids = getAllTaskIds();
  return { done: countDone(ids), total: ids.length };
}

function toggleTask(id) {
  if (isTaskDone(id)) {
    delete progress[id];
  } else {
    progress[id] = { completedAt: new Date().toISOString() };
  }
  const view = parseView();
  if (view.type === "day") saveCurrentDay(view.week, view.day);
  saveProgress();
}

function resetProgress() {
  if (confirm("Fortschritt wirklich zurücksetzen? Alle Häkchen und Zeitstempel gehen verloren.")) {
    progress = {};
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_LEGACY);
    localStorage.removeItem(CURRENT_DAY_KEY);
    localStorage.removeItem(VIEW_KEY);
    currentView = "dashboard";
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
  if (!iso) return "—";
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}.${m}.${y}`;
}

function formatDateTimeDE(iso) {
  if (!iso) return "Datum unbekannt";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Datum unbekannt";
  const date = d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  const time = d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return `${date}, ${time}`;
}

function renderTaskItem(id, label, isMilestone = false) {
  const done = isTaskDone(id);
  const completedAt = getTaskCompletedAt(id);
  const timeMeta = done
    ? `<span class="task-time">${escapeHtml(formatDateTimeDE(completedAt))}</span>`
    : "";
  return `
    <li class="task-item ${done ? "done" : ""} ${isMilestone ? "milestone" : ""}" data-id="${id}">
      <input type="checkbox" ${done ? "checked" : ""} aria-label="${escapeHtml(label)}" />
      <span class="task-body">
        <span class="task-label">${escapeHtml(label)}</span>
        ${timeMeta}
      </span>
    </li>`;
}

function renderTutorialCard(t, { optional = false } = {}) {
  const typeLabel = TUTORIAL_TYPES[t.type] || t.type;
  const steps =
    t.steps && t.steps.length
      ? `<ol class="tutorial-steps">${t.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>`
      : "";
  const optionalBadge = optional ? `<span class="tutorial-optional">Optional</span>` : "";
  return `
    <article class="tutorial-card ${optional ? "tutorial-card-optional" : ""}">
      <div class="tutorial-header">
        <span class="tutorial-type">${escapeHtml(typeLabel)}</span>
        ${optionalBadge}
        <span class="tutorial-meta">${escapeHtml(t.cost)} · ${escapeHtml(t.duration)}</span>
      </div>
      <h4><a href="${t.url}" target="_blank" rel="noopener">${escapeHtml(t.title)}</a></h4>
      ${t.when ? `<p class="tutorial-when"><strong>Wann:</strong> ${escapeHtml(t.when)}</p>` : ""}
      <p class="tutorial-desc">${escapeHtml(t.description)}</p>
      ${steps ? `<p class="tutorial-steps-label"><strong>So lernen:</strong></p>${steps}` : ""}
    </article>`;
}

function renderSupplementSection(weekNum) {
  const items = getWeekSupplements(weekNum);
  if (!items.length) return "";
  return `
    <h3 class="section-title supplement-title">Optional vertiefen</h3>
    <p class="sub supplement-note">Ergänzungen bei Bedarf — nicht Pflicht. Erst Haupt-Tutorials + Projekt, dann hier nachlegen.</p>
    <div class="tutorial-grid">${items.map((t) => renderTutorialCard(t, { optional: true })).join("")}</div>`;
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
  const current = loadCurrentDay();
  const open = getOpenDayInfo();
  const completedDays = countCompletedDays();
  const view = parseView();

  const weekNav = PLAN.weeks
    .map((week) => {
      const { done, total } = weekProgressNum(week.number);
      const wp = total ? Math.round((done / total) * 100) : 0;
      const active =
        view.type === "week" && view.week === week.number ? "active" : "";
      const inWeek =
        view.type === "day" && view.week === week.number ? "active-week" : "";
      const bookmark =
        current.week === week.number ? " · 📍" : "";
      return `
        <li class="nav-item">
          <button class="${active || inWeek}" data-view="week-${week.number}">
            <span class="week-num">${week.number}</span>
            <span>Woche ${week.number}${bookmark}</span>
            <span class="mini-bar"><span class="mini-fill" style="width:${wp}%"></span></span>
          </button>
        </li>`;
    })
    .join("");

  const continueLabel = formatOpenDayLabel(open);
  const continueDisabled = open.kind === "done";

  return `
    <aside class="sidebar">
      <div class="brand">
        <h1>LLM/RAG Lernplan</h1>
        <p>Flexibles Tempo · 72 Lerntage</p>
      </div>
      <div class="overall-progress">
        <label>Gesamtfortschritt</label>
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${pct}%"></div>
        </div>
        <div class="progress-stats">
          <span><strong>${overall.done}</strong> / ${overall.total} Tasks</span>
          <span><strong>${pct}%</strong></span>
        </div>
        <div class="progress-stats sub">${completedDays} / ${DAILY_PLANS.length} Tage abgeschlossen</div>
      </div>
      <button class="btn btn-accent" ${continueDisabled ? "disabled" : `data-view="day-${open.week}-${open.day}" data-set-current="true"`} title="${escapeHtml(continueLabel)}">${escapeHtml(continueLabel)}</button>
      <button class="btn" data-view="day-${current.week}-${current.day}" title="${escapeHtml(formatDayRef(current.week, current.day))}">Aktueller Tag: ${escapeHtml(formatDayRef(current.week, current.day))}</button>
      <details class="optional-date">
        <summary>Optional: Startdatum (Kalender)</summary>
        <input type="date" id="start-date" value="${loadStartDate()}" />
        <p class="sub">Nur zur Orientierung — dein Tempo bestimmst du selbst.</p>
      </details>
      <nav class="nav-section">
        <h2>Navigation</h2>
        <ul class="nav-list">
          <li class="nav-item">
            <button class="${currentView === "dashboard" ? "active" : ""}" data-view="dashboard">Übersicht</button>
          </li>
          <li class="nav-item">
            <button class="${currentView === "progress" ? "active" : ""}" data-view="progress">Fortschritt</button>
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
  const current = loadCurrentDay();
  return `
    <div class="day-tabs">
      ${days
        .map((d) => {
          const { done, total } = dayProgress(d);
          const pct = total ? Math.round((done / total) * 100) : 0;
          const active = d.day === activeDay ? "active" : "";
          const complete = isDayComplete(d) ? " complete" : "";
          const bookmark =
            current.week === weekNum && current.day === d.day ? " bookmark" : "";
          return `
            <button class="day-tab ${active}${complete}${bookmark}" data-view="day-${weekNum}-${d.day}" title="${escapeHtml(d.goal)}">
              <span class="day-tab-label">${d.label.slice(0, 2)}</span>
              <span class="day-tab-name">${escapeHtml(d.label)}</span>
              <span class="day-tab-pct">${complete ? "✓" : pct + "%"}</span>
            </button>`;
        })
        .join("")}
    </div>`;
}

function renderDashboard() {
  const open = getOpenDayInfo();
  const current = loadCurrentDay();
  const completedDays = countCompletedDays();
  const overall = overallProgress();
  const openPlan = open.plan || getDayPlan(open.week, open.day);
  const openLabel = formatOpenDayLabel(open);
  const cardLabel =
    open.kind === "continue"
      ? "Weitermachen"
      : open.kind === "gap"
        ? "Lücke schließen"
        : open.kind === "done"
          ? "Abgeschlossen"
          : "Nächster offener Tag";

  const hint = `
    <div class="current-week-hint flexible-hint">
      <strong>Flexibles Lernen:</strong> Du bestimmst das Tempo — Pausen sind kein Problem.
      Der nächste Tag richtet sich nach deinem <strong>aktuellen Tag</strong>, nicht nach dem Kalender.
      <div class="hint-actions">
        ${
          open.kind !== "done"
            ? `<button class="link-btn" data-view="day-${open.week}-${open.day}" data-set-current="true">→ ${escapeHtml(openLabel)}</button>`
            : `<span class="sub">Alle Lerntage abgeschlossen.</span>`
        }
        <button class="link-btn" data-view="day-${current.week}-${current.day}">→ Aktueller Tag (${escapeHtml(formatDayRef(current.week, current.day))})</button>
      </div>
    </div>
    ${
      open.kind !== "done"
        ? `<div class="continue-card" data-view="day-${open.week}-${open.day}" data-set-current="true">
      <div class="continue-card-inner">
        <span class="continue-label">${escapeHtml(cardLabel)}</span>
        <h3>${escapeHtml(formatDayRef(open.week, open.day))}</h3>
        <p>${openPlan ? escapeHtml(openPlan.goal) : ""}</p>
        <span class="sub">${open.done}/${open.total} Tasks · ${completedDays}/${DAILY_PLANS.length} Tage erledigt · <button class="link-btn" data-view="progress">Details →</button></span>
      </div>
    </div>`
        : `<div class="card"><h3>Plan abgeschlossen</h3><p class="sub">Alle 72 Lerntage erledigt. Schau dir die Bewerbungs-Checkliste an.</p></div>`
    }`;

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
      const complete = isDayComplete(d);
      return `
        <article class="day-card ${complete ? "day-card-complete" : ""}" data-view="day-${weekNum}-${d.day}">
          <div class="day-card-top">
            <strong>${escapeHtml(d.label)}</strong>
            <span class="hours-badge">${complete ? "✓" : d.hours + "h"}</span>
          </div>
          <p class="day-goal">${escapeHtml(d.goal)}</p>
          <p class="day-deliverable">→ ${escapeHtml(d.deliverable)}</p>
          <div class="bar-wrap"><div class="progress-bar" style="width:${complete ? 100 : dpct}%"></div></div>
          <span class="sub">${dp.done}/${dp.total}${complete ? " · erledigt" : ""}</span>
        </article>`;
    })
    .join("");

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
        ? `<h3 class="section-title">Tutorials — wie & wo lernen (Woche ${weekNum})</h3><div class="tutorial-grid">${tutorials.map((t) => renderTutorialCard(t)).join("")}</div>`
        : ""
    }
    ${renderSupplementSection(weekNum)}`;
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
  const prev = getPrevDay(weekNum, dayKey);
  const next = getNextDay(weekNum, dayKey);
  const current = loadCurrentDay();
  const isCurrent = current.week === weekNum && current.day === dayKey;

  const dayNav = `
    <div class="day-nav">
      ${
        prev
          ? `<button class="btn" data-view="day-${prev.week}-${prev.day}">← W${prev.week} ${DAY_LABELS[prev.day]}</button>`
          : `<span></span>`
      }
      ${
        !isCurrent
          ? `<button class="btn btn-accent" id="set-current-day" data-week="${weekNum}" data-day="${dayKey}">Als aktuellen Tag setzen</button>`
          : `<span class="current-day-badge">📍 Aktueller Tag</span>`
      }
      ${
        next
          ? `<button class="btn" data-view="day-${next.week}-${next.day}">W${next.week} ${DAY_LABELS[next.day]} →</button>`
          : `<span></span>`
      }
    </div>`;

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
    ${dayNav}
    <h3 class="section-title">Tagesplan — Zeitblöcke</h3>
    <div class="blocks-grid">${blocks}</div>
    <div class="card">
      <h3>Tasks abhaken</h3>
      <p class="sub">In beliebiger Reihenfolge — du kannst jederzeit pausieren und später weitermachen.</p>
      <ul class="task-list">${tasks}</ul>
    </div>
    ${
      weekTutorials.length || getWeekSupplements(weekNum).length
        ? `<details class="card tutorials-collapse" open>
            <summary><h3>Woche ${weekNum} — Tutorials & Optional</summary>
            ${
              weekTutorials.length
                ? `<p class="sub"><strong>Pflicht-Pfad</strong></p><div class="tutorial-grid">${weekTutorials.map((t) => renderTutorialCard(t)).join("")}</div>`
                : ""
            }
            ${renderSupplementSection(weekNum)}
          </details>`
        : ""
    }`;
}

function renderProgressOverview() {
  const stats = getProgressStats();
  const { series, max } = getActivitySeries(14);
  const recent = getAllCompletions().slice(0, 25);

  const statCards = `
    <div class="stats-grid">
      <article class="stat-card">
        <span class="stat-value">${stats.pct}%</span>
        <span class="stat-label">Gesamtfortschritt</span>
        <span class="sub">${stats.overall.done} / ${stats.overall.total} Tasks</span>
      </article>
      <article class="stat-card">
        <span class="stat-value">${stats.completedDays}</span>
        <span class="stat-label">Tage abgeschlossen</span>
        <span class="sub">von ${stats.totalDays} Lerntagen</span>
      </article>
      <article class="stat-card">
        <span class="stat-value">${stats.studySessions}</span>
        <span class="stat-label">Lerntage mit Aktivität</span>
        <span class="sub">${stats.totalCompletions} Tasks erledigt</span>
      </article>
      <article class="stat-card">
        <span class="stat-value">${stats.spanDays ?? "—"}</span>
        <span class="stat-label">Tage seit Start</span>
        <span class="sub">${stats.firstActivity ? formatDateDE(stats.firstActivity) : "Noch keine Daten"} – ${stats.lastActivity ? formatDateDE(stats.lastActivity) : "—"}</span>
      </article>
    </div>`;

  const activityChart = `
    <div class="card">
      <h3>Aktivität — letzte 14 Tage</h3>
      <p class="sub">Anzahl abgeschlossener Tasks pro Kalendertag</p>
      <div class="activity-chart">
        ${series
          .map((s) => {
            const h = s.count ? Math.max(8, Math.round((s.count / max) * 100)) : 4;
            return `
              <div class="activity-bar-wrap" title="${s.label}: ${s.count} Task(s)">
                <div class="activity-bar" style="height:${h}%"></div>
                <span class="activity-count">${s.count || ""}</span>
                <span class="activity-date">${s.label.slice(0, 5)}</span>
              </div>`;
          })
          .join("")}
      </div>
    </div>`;

  const weekRows = PLAN.weeks
    .map((week) => {
      const { done, total } = weekProgressNum(week.number);
      const pct = total ? Math.round((done / total) * 100) : 0;
      return `
        <tr>
          <td>W${week.number}</td>
          <td>${escapeHtml(week.title)}</td>
          <td>
            <div class="inline-bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
          </td>
          <td>${done}/${total}</td>
          <td>${pct}%</td>
        </tr>`;
    })
    .join("");

  const completedDayRows = DAILY_PLANS.filter(isDayComplete)
    .map((d) => {
      const finishedAt = getDayCompletionDate(d);
      return `
        <tr data-view="day-${d.week}-${d.day}" class="clickable-row">
          <td>W${d.week} · ${escapeHtml(d.label)}</td>
          <td>${escapeHtml(d.goal)}</td>
          <td>${formatDateTimeDE(finishedAt)}</td>
        </tr>`;
    })
    .reverse()
    .join("");

  const recentRows = recent
    .map(
      (c) => `
        <tr class="${c.meta.type === "day" ? "clickable-row" : ""}" ${c.meta.type === "day" ? `data-view="day-${c.meta.week}-${c.meta.day}"` : ""}>
          <td>${formatDateTimeDE(c.completedAt)}</td>
          <td>${escapeHtml(c.label)}</td>
        </tr>`
    )
    .join("");

  return `
    <div class="view-header">
      <h2>Fortschrittsübersicht</h2>
      <p class="meta">Jeder abgehakte Task wird mit Datum und Uhrzeit gespeichert.</p>
    </div>
    ${statCards}
    ${activityChart}
    <div class="cards progress-cards">
      <div class="card">
        <h3>Fortschritt pro Woche</h3>
        <table class="tech-table progress-table">
          <thead><tr><th>Woche</th><th>Thema</th><th></th><th>Tasks</th><th>%</th></tr></thead>
          <tbody>${weekRows}</tbody>
        </table>
      </div>
      <div class="card">
        <h3>Abgeschlossene Lerntage</h3>
        ${
          completedDayRows
            ? `<table class="tech-table progress-table"><thead><tr><th>Tag</th><th>Ziel</th><th>Abgeschlossen am</th></tr></thead><tbody>${completedDayRows}</tbody></table>`
            : `<p class="sub">Noch keine vollständig abgeschlossenen Tage.</p>`
        }
      </div>
      <div class="card">
        <h3>Letzte Aktivität</h3>
        ${
          recentRows
            ? `<table class="tech-table progress-table"><thead><tr><th>Zeitpunkt</th><th>Task</th></tr></thead><tbody>${recentRows}</tbody></table>`
            : `<p class="sub">Noch keine Tasks erledigt — starte mit „Weitermachen“ in der Sidebar.</p>`
        }
      </div>
    </div>`;
}

function renderAllTutorials() {
  const weeks = Object.keys(WEEK_TUTORIALS)
    .sort((a, b) => +a - +b)
    .map((w) => {
      const list = WEEK_TUTORIALS[w];
      const supplements = getWeekSupplements(+w);
      return `
        <section class="tutorial-week-section">
          <h3>Woche ${w}</h3>
          <div class="tutorial-grid">${list.map((t) => renderTutorialCard(t)).join("")}</div>
          ${
            supplements.length
              ? `<h4 class="supplement-inline-title">Optional vertiefen</h4><div class="tutorial-grid">${supplements.map((t) => renderTutorialCard(t, { optional: true })).join("")}</div>`
              : ""
          }
        </section>`;
    })
    .join("");

  const global = GLOBAL_RESOURCES.map((t) => renderTutorialCard(t)).join("");
  const globalSupplements = getGlobalSupplements()
    .map((t) => renderTutorialCard(t, { optional: true }))
    .join("");

  return `
    <div class="view-header">
      <h2>Alle Tutorials & Lernressourcen</h2>
      <p class="meta">Links, Reihenfolge und konkrete Schritte — kostenlos wo möglich</p>
    </div>
    <div class="card">
      <h3>Globale Ressourcen</h3>
      <div class="tutorial-grid">${global}</div>
    </div>
    <div class="card supplement-section-card">
      <h3>Optional vertiefen (übergreifend)</h3>
      <p class="sub">Ergänzend zum Plan — nicht statt Projektarbeit.</p>
      <div class="tutorial-grid">${globalSupplements}</div>
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
  if (currentView === "progress") return renderProgressOverview();
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
        ["dashboard", "progress", "checklist", "interview", "reference", "tutorials"].includes(view)
      ) {
        e.preventDefault();
        navigateTo(view, { setCurrent: el.dataset.setCurrent === "true" });
      }
    });
  });

  root.querySelectorAll(".task-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.tagName === "A") return;
      toggleTask(item.dataset.id);
    });
  });

  const setCurrentBtn = root.querySelector("#set-current-day");
  if (setCurrentBtn) {
    setCurrentBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      saveCurrentDay(+setCurrentBtn.dataset.week, setCurrentBtn.dataset.day);
      render();
    });
  }

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
