(function () {
  "use strict";
  var EX = DATA.exams, ORDER = ["n", "s", "p"], STORE = "comptia-hub-v1";
  var st = { lang: "it", done: {}, known: {}, last: null, dates: {}, wrong: {}, flag: {}, seen: {}, dstat: {}, hist: [], prac: {}, sr: {}, cases: {}, mapPref: {} };
  try { var saved = JSON.parse(localStorage.getItem(STORE) || "null"); if (saved) Object.keys(st).forEach(function (k) { if (saved[k] != null) st[k] = saved[k]; }); } catch (e) {}
  function save() { try { localStorage.setItem(STORE, JSON.stringify(st)); } catch (e) {} }

  var UI = {
    home: ["Home", "Home"], maps: ["Mappe", "Maps"], quiz: ["Quiz", "Quiz"], cards: ["Schede", "Cards"], practice: ["Pratica", "Practice"], search: ["Cerca", "Search"], guide: ["Guida", "Guide"], learn: ["Impara", "Learn"], tLearn: ["Schemi animati, casi pratici e video", "Animated diagrams, practical cases and videos"], tGuide: ["Come affrontare l'esame, backup dei progressi", "How to tackle the exam, progress backup"],
    title: ["Hub di studio CompTIA", "CompTIA Study Hub"],
    lead: ["Network+, Security+ e PenTest+ in un unico posto: obiettivi spiegati, mappe guidate, schede, esercizi pratici e quiz.", "Network+, Security+ and PenTest+ in one place: objectives explained, guided maps, cards, hands-on drills and quizzes."],
    questions: ["Domande", "Questions"], upto: ["fino a", "up to"], minutes: ["Minuti", "Minutes"], pass: ["Punteggio minimo", "Passing score"], scale: ["scala 100-900", "100-900 scale"],
    launched: ["Lancio", "Launched"], experience: ["Esperienza consigliata", "Recommended experience"],
    progress: ["Studio", "Study"], objectives: ["obiettivi", "objectives"], studied: ["Studiato", "Studied"], quizAcc: ["Quiz", "Quiz"], noQuiz: ["nessun quiz ancora", "no quiz yet"], right: ["risposte corrette", "correct answers"],
    open: ["Apri", "Open"], seeMap: ["Vedi nella mappa", "See in the map"], quizDomain: ["Quiz su questo dominio", "Quiz on this domain"],
    filter: ["Filtra gli obiettivi (es. VLAN, OSPF, SIEM)", "Filter objectives (e.g. VLAN, OSPF, SIEM)"], noRes: ["Nessun obiettivo corrisponde.", "No objective matches."],
    tip: ["Consiglio d'esame", "Exam tip"], sheets: ["Schede rapide", "Quick sheets"], weights: ["Pesi dei domini", "Domain weights"],
    official: ["Pagina ufficiale CompTIA e obiettivi d'esame", "Official CompTIA page and exam objectives"],
    keyc: ["Concetti chiave: tocca per vedere i collegamenti", "Key concepts: tap to see connections"],
    prereq: ["Prerequisiti in questo hub", "Prerequisites in this hub"], plan: ["Piano di studio", "Study plan"], objCount: ["obiettivi ufficiali", "official objectives"], liteTag: ["Scheda d'esame", "Exam overview"],
    resume: ["Riprendi da dove eri", "Pick up where you left off"], resumeBtn: ["Continua", "Continue"],
    examDate: ["Data dell'esame", "Exam date"], daysLeft: ["giorni all'esame", "days to the exam"], today: ["L'esame è oggi", "The exam is today"], past: ["Data passata", "Date has passed"], setDate: ["Imposta la data per vedere il conto alla rovescia.", "Set the date to see the countdown."],
    weak: ["Domini da rinforzare", "Domains to strengthen"], weakLead: ["In base alle tue risposte nei quiz, dal più debole.", "Based on your quiz answers, weakest first."], weakNone: ["Fai qualche quiz: qui compariranno i domini in cui sbagli di più.", "Take a few quizzes: the domains where you miss most will appear here."],
    review: ["Ripassa", "Review"], errs: ["domande sbagliate da ripassare", "missed questions to review"], errBtn: ["Ripassa gli errori", "Review mistakes"],
    tools: ["Strumenti", "Tools"], tMaps: ["Dal dominio al concetto, un livello alla volta", "From domain to concept, one level at a time"], tCards: ["Flashcard e glossario dei concetti", "Flashcards and concept glossary"],
    tPractice: ["Subnet, porte e sequenze da ordinare", "Subnets, ports and sequences to order"], tQuiz: ["Allenamento e simulazione a tempo", "Practice and timed simulation"], tSearch: ["Trova un argomento in tutto l'hub", "Find a topic across the hub"],
    news: ["Versioni verificate il 25 novembre 2026", "Versions checked on November 25, 2026"],
    sources: ["Fonti: pagine di certificazione e obiettivi d'esame CompTIA, e guide indipendenti che li riassumono. Gli obiettivi ufficiali restano il riferimento finale.", "Sources: CompTIA certification pages and exam objectives, and independent guides summarising them. The official objectives remain the final reference."]
  };
  function L(v) { return typeof v === "string" ? v : v[st.lang === "it" ? 0 : 1]; }
  function u(k) { return L(UI[k]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function oid(k, n) { return "o-" + k + "-" + n.replace(".", "-"); }
  function findObj(ref) {
    var parts = ref.split(":"), ex = EX[parts[0]], res = null;
    if (ex) ex.domains.forEach(function (d) { (d.objs || []).forEach(function (o) { if (o.n === parts[1]) res = { ex: ex, d: d, o: o }; }); });
    return res;
  }
  function examStats(ex) {
    var tot = 0, done = 0;
    ex.domains.forEach(function (d) { (d.objs || []).forEach(function (o) { tot++; if (st.done[oid(ex.key, o.n)]) done++; }); });
    return { tot: tot, done: done, pct: tot ? Math.round(done / tot * 100) : 0 };
  }
  function domDone(k, num) { var d = EX[k].domains[num - 1], n = 0; (d.objs || []).forEach(function (o) { if (st.done[oid(k, o.n)]) n++; }); return { done: n, tot: (d.objs || []).length }; }
  function domStat(k, num) { var s = st.dstat[k + num] || { ok: 0, n: 0 }; return { ok: s.ok, n: s.n, pct: s.n ? Math.round(s.ok / s.n * 100) : null }; }
  function exQuiz(k) { var ok = 0, n = 0; EX[k].domains.forEach(function (d) { var s = domStat(k, d.num); ok += s.ok; n += s.n; }); return { ok: ok, n: n, pct: n ? Math.round(ok / n * 100) : null }; }

  var app = document.getElementById("app"), view = "home", pending = null, filter = "";
  var ROUTES = { network: "n", security: "s", pentest: "p", mappe: "maps", schede: "cards", pratica: "practice", quiz: "quiz", cerca: "search", guida: "guide", impara: "learn" };
  function route() {
    view = ROUTES[(location.hash || "").replace("#", "")] || "home"; filter = "";
    render(); if (!pending) window.scrollTo(0, 0);
  }
  function go(hash) { if (("#" + hash) === location.hash || (!hash && !location.hash)) route(); else location.hash = hash; }
  function render() {
    document.documentElement.lang = st.lang;
    document.querySelectorAll("[data-nav]").forEach(function (b) {
      var v = b.getAttribute("data-nav"), key = v === "home" ? "home" : ROUTES[v];
      b.setAttribute("aria-current", key === view ? "page" : "false");
      if (UI[key]) { if (b.classList.contains("icon")) b.setAttribute("aria-label", u(key)); else b.textContent = u(key); }
    });
    var lb = document.getElementById("lang"); lb.textContent = st.lang === "it" ? "EN" : "IT"; lb.setAttribute("aria-label", st.lang === "it" ? "Switch to English" : "Passa all'italiano");
    if (view === "home") app.innerHTML = homeHTML();
    else if (Hub.views[view]) { app.innerHTML = Hub.views[view].html(); Hub.views[view].mount(app); }
    else app.innerHTML = EX[view].lite ? liteHTML(EX[view]) : examHTML(EX[view]);
    var cur = document.querySelector('.top nav [aria-current="page"]'); if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest", inline: "center" });
    if (pending) {
      var el = document.getElementById(pending); pending = null;
      if (el) { if (el.tagName === "DETAILS") el.open = true; setTimeout(function () { el.scrollIntoView({ block: "start" }); el.classList.add("flash"); }, 40); }
    }
  }

  function meter(pct, cls) { return '<div class="meter ' + (cls || "") + '"><i style="width:' + pct + '%"></i></div>'; }
  function weightBar(ex) {
    return '<div class="wbar" role="img" aria-label="' + esc(u("weights")) + '">' + ex.domains.map(function (d) { return '<span class="d' + d.num + '" style="flex:' + d.w + '"><b>' + d.w + "%</b></span>"; }).join("") + '</div><ol class="wlegend">' +
      ex.domains.map(function (d) { return '<li><i class="dot d' + d.num + '"></i><span>' + d.num + ". " + esc(L(d.t)) + '</span><span class="num">' + d.w + "%</span></li>"; }).join("") + "</ol>";
  }
  function facts(ex) {
    return '<dl class="facts"><div><dt>' + u("questions") + "</dt><dd>" + ex.questions + "<small>" + u("upto") + "</small></dd></div><div><dt>" + u("minutes") + "</dt><dd>" + ex.minutes + "</dd></div><div><dt>" + u("pass") + "</dt><dd>" + ex.pass + "<small>" + u("scale") + "</small></dd></div><div><dt>" + u("launched") + '</dt><dd class="txt">' + esc(L(ex.launched)) + "</dd></div></dl>";
  }
  function countdown(k) {
    var v = st.dates[k]; if (!v) return '<p class="cd muted">' + u("setDate") + "</p>";
    var t0 = new Date(); t0.setHours(0, 0, 0, 0); var days = Math.round((new Date(v + "T00:00:00") - t0) / 864e5);
    return '<p class="cd">' + (days > 0 ? "<b>" + days + "</b> " + u("daysLeft") : days === 0 ? "<b>" + u("today") + "</b>" : u("past")) + "</p>";
  }
  function homeHTML() {
    var h = '<header class="hero"><p class="eyebrow">' + u("news") + "</p><h1>" + u("title") + '</h1><p class="lead">' + u("lead") + "</p></header>";
    var last = st.last && findObj(st.last);
    if (last) h += '<section class="resume ex-' + last.ex.key + '"><div><p class="eyebrow">' + u("resume") + "</p><p><b>" + last.ex.name + " " + last.o.n + "</b> " + esc(L(last.o.t)) + '</p></div><button class="btn primary" data-ref="' + st.last + '">' + u("resumeBtn") + " →</button></section>";
    h += Hub.homeExtra();
    h += '<div class="cards">' + ORDER.map(function (k) {
      var ex = EX[k], s = examStats(ex), q = ex.lite ? null : exQuiz(k);
      return '<article class="card ex-' + k + '"><div class="card-top"><h2>' + ex.name + '</h2><span class="code">' + ex.code + " · " + ex.ver + "</span></div>" + facts(ex) +
        (ex.lite ? '<p class="tag">' + u("liteTag") + "</p>" : '<div class="prog"><div class="prog-h"><span>' + u("progress") + '</span><span class="num">' + s.done + "/" + s.tot + " " + u("objectives") + "</span></div>" + meter(s.pct) + '<div class="prog-h mt"><span>' + u("quizAcc") + '</span><span class="num">' + (q.n ? q.pct + "% · " + q.ok + "/" + q.n + " " + u("right") : u("noQuiz")) + "</span></div>" + meter(q.pct || 0, "q") + "</div>") +
        '<div class="datebox"><label for="date-' + k + '">' + u("examDate") + '</label><input type="date" id="date-' + k + '" data-date="' + k + '" value="' + esc(st.dates[k] || "") + '">' + countdown(k) + "</div>" +
        '<div class="row"><button class="btn primary" data-go="' + ex.hash + '">' + u("open") + " " + ex.name + "</button>" + (ex.lite ? "" : '<button class="btn" data-quiz="' + k + '">' + u("quiz") + "</button>") + "</div></article>";
    }).join("") + "</div>";
    var weak = [];
    ["n", "s"].forEach(function (k) { EX[k].domains.forEach(function (d) { var s = domStat(k, d.num); if (s.n >= 3 && s.pct < 80) weak.push({ k: k, d: d, s: s }); }); });
    weak.sort(function (a, b) { return a.s.pct - b.s.pct; });
    var nw = Object.keys(st.wrong).length;
    h += '<section class="panel"><h2>' + u("weak") + '</h2><p class="muted sm">' + (weak.length ? u("weakLead") : u("weakNone")) + "</p>" + weak.slice(0, 4).map(function (w) {
      return '<div class="weakrow ex-' + w.k + '"><div class="prog-h"><span><b>' + EX[w.k].name + " " + w.d.num + ".</b> " + esc(L(w.d.t)) + '</span><span class="num">' + w.s.pct + "%</span></div>" + meter(w.s.pct, "d" + w.d.num) + '<div class="row"><button class="btn sm" data-dom="' + w.k + ":" + w.d.num + '">' + u("review") + '</button><button class="btn sm" data-quiz="' + w.k + '" data-qdom="' + w.d.num + '">' + u("quiz") + "</button></div></div>";
    }).join("") + "</section>";
    h += '<section class="panel"><h2>' + u("tools") + '</h2><div class="toolgrid">' + [["impara", "learn", "tLearn"], ["mappe", "maps", "tMaps"], ["schede", "cards", "tCards"], ["pratica", "practice", "tPractice"], ["quiz", "quiz", "tQuiz"], ["cerca", "search", "tSearch"], ["guida", "guide", "tGuide"]].map(function (t) {
      return '<button class="tool" data-go="' + t[0] + '"><b>' + u(t[1]) + "</b><span>" + u(t[2]) + "</span></button>";
    }).join("") + "</div></section>";
    return h + '<p class="fine">' + u("sources") + "</p>";
  }

  function consHTML(ref) {
    var cons = DATA.concepts.filter(function (c) { return c[2].indexOf(ref) >= 0; });
    return cons.length ? "<h3>" + u("keyc") + '</h3><div class="chips cons">' + cons.map(function (c) { return '<button class="chip soft" data-node="' + esc(c[0]) + '">' + esc(c[0]) + "</button>"; }).join("") + "</div>" : "";
  }
  function objHTML(ex, d, o) {
    var id = oid(ex.key, o.n);
    return '<details class="obj" id="' + id + '" data-oref="' + ex.key + ":" + o.n + '"><summary><span class="onum d' + d.num + '">' + o.n + '</span><span class="otitle">' + esc(L(o.t)) + "</span>" + (st.done[id] ? '<span class="check" aria-label="' + u("studied") + '">✓</span>' : "") + '</summary><div class="obody"><ul>' +
      o.p.map(function (p) { return "<li>" + esc(L(p)) + "</li>"; }).join("") + "</ul>" + (o.x ? '<p class="tip"><b>' + u("tip") + "</b> " + esc(L(o.x)) + "</p>" : "") + consHTML(ex.key + ":" + o.n) + Hub.objExtra(ex, o) +
      '<div class="row actions"><label class="chk"><input type="checkbox" id="c-' + id + '" data-done="' + id + '"' + (st.done[id] ? " checked" : "") + "> " + u("studied") + '</label><button class="btn sm" data-map="obj:' + ex.key + ":" + o.n + '">' + u("seeMap") + '</button><button class="btn sm" data-quiz="' + ex.key + '" data-qdom="' + d.num + '">' + u("quizDomain") + "</button></div></div></details>";
  }
  function domsHTML(ex, q) {
    var out = "";
    ex.domains.forEach(function (d) {
      var objs = d.objs.filter(function (o) { return !q || (o.n + " " + o.t.join(" ") + " " + o.p.map(function (p) { return typeof p === "string" ? p : p.join(" "); }).join(" ")).toLowerCase().indexOf(q) >= 0; });
      if (!objs.length) return;
      var dd = domDone(ex.key, d.num), s = domStat(ex.key, d.num);
      out += '<section class="dom" id="d-' + ex.key + "-" + d.num + '"><div class="domh"><h2><span class="dbadge d' + d.num + '">' + d.num + ".0</span> " + esc(L(d.t)) + '</h2><p class="domstat num">' + d.w + "% · " + dd.done + "/" + dd.tot + " " + u("studied").toLowerCase() + (s.n ? " · quiz " + s.pct + "%" : "") + "</p></div>" + objs.map(function (o) { return objHTML(ex, d, o); }).join("") + "</section>";
    });
    return out || '<p class="empty">' + u("noRes") + "</p>";
  }
  function examHTML(ex) {
    var s = examStats(ex);
    var h = '<header class="exhead ex-' + ex.key + '"><p class="eyebrow">' + ex.code + " · " + ex.ver + "</p><h1>CompTIA " + ex.name + "</h1>" + facts(ex) + '<p class="sm"><b>' + u("experience") + ":</b> " + esc(L(ex.exp)) + '</p><p class="note">' + esc(L(ex.note)) + '</p><div class="prog"><div class="prog-h"><span>' + u("progress") + '</span><span class="num" id="exnum">' + s.done + "/" + s.tot + "</span></div>" + meter(s.pct) + "</div></header>";
    h += '<section class="panel"><h2>' + u("weights") + "</h2>" + weightBar(ex) + "</section>" + Hub.examExtra(ex);
    h += '<div class="searchbox"><label for="q" class="vh">' + u("filter") + '</label><input id="q" type="search" placeholder="' + esc(u("filter")) + '" value="' + esc(filter) + '"></div><div id="doms">' + domsHTML(ex, filter.trim().toLowerCase()) + "</div>";
    h += '<section class="panel" id="sheets"><h2>' + u("sheets") + "</h2>" + ex.sheets.map(function (sh) {
      return '<details class="sheet"><summary>' + esc(L(sh.t)) + '</summary><div class="tw"><table><thead><tr>' + sh.cols.map(function (c) { return "<th>" + esc(L(c)) + "</th>"; }).join("") + "</tr></thead><tbody>" + sh.rows.map(function (r) { return "<tr>" + r.map(function (c, i) { return "<td" + (i < 2 ? ' class="mono"' : "") + ">" + esc(L(c)) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div></details>";
    }).join("") + "</section>";
    return h + '<p class="fine"><a href="' + ex.official + '" target="_blank" rel="noopener">' + u("official") + " ↗</a></p>";
  }
  function refChip(ref) {
    var r = findObj(ref); if (!r) return "";
    return '<button class="chip ex-' + r.ex.key + '" data-ref="' + ref + '"><b>' + r.ex.name + " " + r.o.n + "</b> " + esc(L(r.o.t)) + "</button>";
  }
  function liteHTML(ex) {
    var h = '<header class="exhead ex-p"><p class="eyebrow">' + ex.code + " · " + ex.ver + " · " + u("liteTag") + "</p><h1>CompTIA " + ex.name + "</h1>" + facts(ex) + '<p class="sm"><b>' + u("experience") + ":</b> " + esc(L(ex.exp)) + '</p><p class="note">' + esc(L(ex.note)) + '</p></header><section class="panel"><h2>' + u("weights") + "</h2>" + weightBar(ex) + "</section>";
    ex.domains.forEach(function (d) {
      h += '<section class="dom"><div class="domh"><h2><span class="dbadge d' + d.num + '">' + d.num + ".0</span> " + esc(L(d.t)) + '</h2><p class="domstat num">' + d.w + "% · " + d.n + " " + u("objCount") + '</p></div><div class="litecard"><p>' + esc(L(d.desc)) + "</p><h3>" + u("prereq") + '</h3><div class="chips">' + d.pre.map(refChip).join("") + "</div></div></section>";
    });
    return h + '<section class="panel"><h2>' + u("plan") + '</h2><ol class="plan">' + ex.plan.map(function (p) { return "<li>" + esc(L(p)) + "</li>"; }).join("") + '</ol></section><p class="fine"><a href="' + ex.official + '" target="_blank" rel="noopener">' + u("official") + " ↗</a></p>";
  }

  function openRef(ref) { var r = findObj(ref); if (!r) return; pending = oid(r.ex.key, r.o.n); go(r.ex.hash); }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-nav],[data-go],[data-quiz],[data-ref],[data-map],[data-node],[data-dom],#lang");
    if (!t) return; var d = t.dataset;
    if (t.id === "lang") { st.lang = st.lang === "it" ? "en" : "it"; save(); render(); }
    else if (d.nav != null) go(d.nav === "home" ? "" : d.nav);
    else if (d.go != null) go(d.go);
    else if (d.quiz) Hub.quizGo(d.quiz, d.qdom || "all", d.qsrc || "all");
    else if (d.ref) openRef(d.ref);
    else if (d.map) Hub.mapGo(d.map);
    else if (d.node) Hub.mapGo("con:" + d.node);
    else if (d.dom) { var p = d.dom.split(":"); pending = p[1] === "sheets" ? "sheets" : "d-" + p[0] + "-" + p[1]; go(EX[p[0]].hash); }
  });
  document.addEventListener("change", function (e) {
    var t = e.target; if (!t.dataset) return;
    if (t.dataset.done) {
      if (t.checked) st.done[t.dataset.done] = 1; else delete st.done[t.dataset.done]; save();
      var sum = document.getElementById(t.dataset.done).querySelector("summary"), c = sum.querySelector(".check");
      if (t.checked && !c) sum.insertAdjacentHTML("beforeend", '<span class="check">✓</span>'); else if (!t.checked && c) c.remove();
      var s = examStats(EX[view]), m = document.querySelector(".exhead .meter i"), nn = document.getElementById("exnum");
      if (m) m.style.width = s.pct + "%"; if (nn) nn.textContent = s.done + "/" + s.tot;
    } else if (t.dataset.date) { if (t.value) st.dates[t.dataset.date] = t.value; else delete st.dates[t.dataset.date]; save(); render(); }
  });
  document.addEventListener("toggle", function (e) { var t = e.target; if (t.open && t.dataset && t.dataset.oref) { st.last = t.dataset.oref; save(); } }, true);
  document.addEventListener("input", function (e) {
    if (e.target.id === "q") { filter = e.target.value; document.getElementById("doms").innerHTML = domsHTML(EX[view], filter.trim().toLowerCase()); if (filter.trim()) document.querySelectorAll("#doms details").forEach(function (d, i) { if (i < 5) d.open = true; }); }
  });
  var Hub = { L: L, esc: esc, EX: EX, st: st, save: save, findObj: findObj, oid: oid, refChip: refChip, go: go, render: render, views: {}, meter: meter, domDone: domDone, domStat: domStat, examStats: examStats, view: function () { return view; } };
  (window.HubMods || []).forEach(function (m) { m(Hub); });
  window.addEventListener("hashchange", route);
  route();
})();
