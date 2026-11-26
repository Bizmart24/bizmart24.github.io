HubMods.push(function (Hub) {
  "use strict";
  var L = Hub.L, esc = Hub.esc, EX = Hub.EX, st = Hub.st;
  var T = {
    title: ["Quiz", "Quiz"],
    note: ["Domande originali scritte sugli obiettivi, non domande reali d'esame. Sono in inglese come all'esame; le spiegazioni seguono la lingua scelta. Punta ad almeno l'85% prima di prenotare.", "Original questions written from the objectives, not real exam questions. They are in English, as in the exam; explanations follow the chosen language. Aim for at least 85% before booking."],
    exam: ["Esame", "Exam"], mixed: ["Misto Network+ e Security+", "Mixed Network+ and Security+"], domain: ["Dominio", "Domain"], allDomains: ["Tutti i domini", "All domains"],
    source: ["Quali domande", "Which questions"], sAll: ["Tutte", "All"], sWrong: ["Solo quelle sbagliate", "Only missed ones"], sFlag: ["Solo quelle segnate", "Only flagged ones"], sNew: ["Solo mai viste", "Only unseen"],
    count: ["Numero di domande", "Number of questions"], mode: ["Modalità", "Mode"], practice: ["Allenamento: risposta e spiegazione subito", "Practice: answer and explanation straight away"], sim: ["Simulazione: a tempo, risultati alla fine", "Simulation: timed, results at the end"],
    start: ["Inizia il quiz", "Start quiz"], empty: ["Nessuna domanda con questi filtri.", "No questions match these filters."], avail: ["domande disponibili", "questions available"],
    next: ["Avanti", "Next"], prev: ["Indietro", "Back"], finish: ["Termina e vedi i risultati", "Finish and see results"], quit: ["Esci", "Leave"],
    qOf: ["Domanda", "Question"], of: ["di", "of"], correct: ["Corretto.", "Correct."], wrong: ["Sbagliato.", "Incorrect."], rightIs: ["Risposta corretta:", "Correct answer:"], yours: ["La tua risposta:", "Your answer:"], none: ["nessuna", "none"],
    flag: ["Segna da rivedere", "Flag for review"], flagged: ["Segnata", "Flagged"], review: ["Ripassa l'obiettivo", "Review objective"],
    result: ["Risultato", "Result"], byDomain: ["Per dominio", "By domain"], toReview: ["Domande da rivedere", "Questions to review"], allRight: ["Nessun errore: tutte le risposte sono corrette.", "No mistakes: every answer is correct."],
    again: ["Nuovo quiz", "New quiz"], redo: ["Ripeti subito gli errori", "Retry the mistakes now"], timeUp: ["Tempo scaduto.", "Time is up."],
    ready: ["Pronto per prenotare", "Ready to book"], almost: ["Quasi: ripassa i domini deboli", "Close: review the weak domains"], more: ["Serve altro studio", "More study needed"],
    hist: ["Ultimi risultati", "Recent results"], histNone: ["Qui vedrai l'andamento dei tuoi quiz.", "Your quiz trend will appear here."], stats: ["Andamento per dominio", "Performance by domain"],
    pentest: ["Per PenTest+ questo hub offre la scheda d'esame e il piano di studio, senza quiz.", "For PenTest+ this hub offers the exam overview and study plan, without a quiz."], seen: ["viste", "seen"], toFix: ["da ripassare", "to review"]
  };
  function t(k) { return L(T[k]); }
  var su = { ex: "n", dom: "all", src: "all", count: 10, mode: "practice" }, qz = null, timer = null;
  function qid(k, q) { return k + ":" + DATA.quiz[k].indexOf(q); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function pool() {
    var p = [];
    (su.ex === "all" ? ["n", "s"] : [su.ex]).forEach(function (k) {
      DATA.quiz[k].forEach(function (q) {
        var id = qid(k, q);
        if (su.ex !== "all" && su.dom !== "all" && q.d !== +su.dom) return;
        if (su.src === "wrong" && !st.wrong[id]) return; if (su.src === "flag" && !st.flag[id]) return; if (su.src === "new" && st.seen[id]) return;
        p.push({ k: k, q: q, id: id });
      });
    });
    return p;
  }
  function begin(items, mode) {
    qz = { items: items.map(function (it) { var o = shuffle(it.q.a); return { k: it.k, q: it.q, id: it.id, opts: o, right: o.indexOf(it.q.a[0]), ans: null, rec: false }; }), i: 0, mode: mode, done: false, left: items.length * 60, timeUp: false };
    clearInterval(timer);
    if (mode === "sim") timer = setInterval(function () {
      if (!qz || qz.done) { clearInterval(timer); return; }
      qz.left--; var el = document.getElementById("timer"); if (el) el.textContent = fmt(qz.left);
      if (qz.left <= 0) { qz.timeUp = true; end(); }
    }, 1000);
    Hub.render(); window.scrollTo(0, 0);
  }
  function fmt(s) { s = Math.max(0, s); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }
  function record(it) {
    if (it.rec) return; it.rec = true; var ok = it.ans === it.right, key = it.k + it.q.d;
    st.seen[it.id] = 1; if (ok) delete st.wrong[it.id]; else st.wrong[it.id] = 1;
    st.dstat[key] = st.dstat[key] || { ok: 0, n: 0 }; st.dstat[key].n++; if (ok) st.dstat[key].ok++;
  }
  function end() {
    clearInterval(timer); qz.items.forEach(record); qz.done = true;
    var ok = qz.items.filter(function (it) { return it.ans === it.right; }).length;
    st.hist.push({ d: new Date().toISOString().slice(0, 10), ex: su.ex, pct: Math.round(ok / qz.items.length * 100), n: qz.items.length, m: qz.mode }); if (st.hist.length > 12) st.hist.shift();
    Hub.save(); Hub.render(); window.scrollTo(0, 0);
  }
  function opt(v, lab, cur) { return '<option value="' + v + '"' + (String(cur) === String(v) ? " selected" : "") + ">" + lab + "</option>"; }
  function setupHTML() {
    var ex = su.ex, max = pool().length, nw = Object.keys(st.wrong).length, nf = Object.keys(st.flag).length;
    var counts = [10, 20, 40, 60, 90].filter(function (n) { return n < max; }); counts.push(max); if (counts.indexOf(su.count) < 0) su.count = counts[0];
    var h = '<header class="hero slim"><h1>' + t("title") + '</h1><p class="lead">' + t("note") + '</p></header><form class="panel setup" id="setup">';
    h += '<div class="field"><label for="s-ex">' + t("exam") + '</label><select id="s-ex">' + opt("n", "Network+ N10-009", ex) + opt("s", "Security+ SY0-801", ex) + opt("all", t("mixed"), ex) + "</select></div>";
    h += '<div class="field"><label for="s-dom">' + t("domain") + '</label><select id="s-dom"' + (ex === "all" ? " disabled" : "") + ">" + opt("all", t("allDomains"), su.dom) + (ex === "all" ? "" : EX[ex].domains.map(function (d) { return opt(d.num, d.num + ". " + esc(L(d.t)), su.dom); }).join("")) + "</select></div>";
    h += '<div class="field"><label for="s-src">' + t("source") + '</label><select id="s-src">' + opt("all", t("sAll"), su.src) + opt("wrong", t("sWrong") + " (" + nw + ")", su.src) + opt("flag", t("sFlag") + " (" + nf + ")", su.src) + opt("new", t("sNew"), su.src) + "</select></div>";
    if (max) h += '<div class="field"><label for="s-count">' + t("count") + '</label><select id="s-count">' + counts.map(function (n) { return opt(n, n, su.count); }).join("") + '</select><small class="muted">' + max + " " + t("avail") + "</small></div>";
    h += '<fieldset class="field"><legend>' + t("mode") + '</legend><label class="radio"><input type="radio" name="mode" id="m-practice" value="practice"' + (su.mode === "practice" ? " checked" : "") + "> " + t("practice") + '</label><label class="radio"><input type="radio" name="mode" id="m-sim" value="sim"' + (su.mode === "sim" ? " checked" : "") + "> " + t("sim") + "</label></fieldset>";
    h += (max ? '<button class="btn primary big" type="submit">' + t("start") + "</button>" : '<p class="empty">' + t("empty") + "</p>") + "</form>";
    h += '<section class="panel"><h2>' + t("hist") + "</h2>" + (st.hist.length ? '<div class="histbars">' + st.hist.map(function (r) { return '<div class="hb ' + (r.pct >= 85 ? "ok" : r.pct >= 70 ? "mid" : "bad") + '" title="' + r.d + '"><span class="num">' + r.pct + '</span><i style="height:' + Math.max(6, r.pct) + '%"></i><small>' + (r.ex === "all" ? "N+S" : r.ex.toUpperCase() + "+") + "</small></div>"; }).join("") + "</div>" : '<p class="muted sm">' + t("histNone") + "</p>") + "</section>";
    h += '<section class="panel"><h2>' + t("stats") + "</h2>" + ["n", "s"].map(function (k) {
      return '<h3 class="ex-' + k + '">' + EX[k].name + "</h3>" + EX[k].domains.map(function (d) { var s = Hub.domStat(k, d.num); return '<div class="brow"><div class="prog-h"><span>' + d.num + ". " + esc(L(d.t)) + '</span><span class="num">' + (s.n ? s.pct + "% · " + s.ok + "/" + s.n : "—") + "</span></div>" + Hub.meter(s.pct || 0, "d" + d.num) + "</div>"; }).join("");
    }).join("") + '</section><p class="fine">' + t("pentest") + "</p>";
    return h;
  }
  function runHTML() {
    var it = qz.items[qz.i], n = qz.items.length, answered = it.ans !== null, show = qz.mode === "practice" && answered, fl = st.flag[it.id];
    var h = '<div class="qbar"><span>' + t("qOf") + " <b>" + (qz.i + 1) + "</b> " + t("of") + " " + n + "</span>" + (qz.mode === "sim" ? '<span class="timer" id="timer">' + fmt(qz.left) + "</span>" : "") + '<button class="link" data-qquit="1">' + t("quit") + "</button></div>" + Hub.meter(Math.round((qz.i + (answered ? 1 : 0)) / n * 100), "thin");
    h += '<article class="qcard ex-' + it.k + '"><div class="qtop"><p class="eyebrow">' + EX[it.k].name + " · " + t("domain") + " " + it.q.d + " · " + it.q.o + '</p><button class="flagb' + (fl ? " on" : "") + '" data-qflag="1" aria-pressed="' + !!fl + '">⚑ ' + (fl ? t("flagged") : t("flag")) + '</button></div><h2 lang="en">' + esc(it.q.q) + '</h2><div class="opts" lang="en">' + it.opts.map(function (o, i) {
      var cls = "opt"; if (show) { if (i === it.right) cls += " ok"; else if (i === it.ans) cls += " bad"; } else if (i === it.ans) cls += " sel";
      return '<button class="' + cls + '" data-qopt="' + i + '"' + (show ? " disabled" : "") + "><b>" + "ABCD"[i] + "</b><span>" + esc(o) + "</span></button>";
    }).join("") + "</div>";
    if (show) h += '<div class="fb ' + (it.ans === it.right ? "ok" : "bad") + '"><p><b>' + (it.ans === it.right ? t("correct") : t("wrong")) + "</b> " + esc(L(it.q.e)) + '</p><button class="btn sm" data-ref="' + it.k + ":" + it.q.o + '">' + t("review") + " " + it.q.o + "</button></div>";
    h += '</article><div class="row between">' + (qz.mode === "sim" && qz.i > 0 ? '<button class="btn" data-qnav="-1">' + t("prev") + "</button>" : "<span></span>");
    var dis = qz.mode === "practice" && !answered ? " disabled" : "";
    h += qz.i < n - 1 ? '<button class="btn primary" data-qnav="1"' + dis + ">" + t("next") + "</button>" : '<button class="btn primary" data-qend="1"' + dis + ">" + t("finish") + "</button>";
    return h + "</div>";
  }
  function resultHTML() {
    var n = qz.items.length, ok = 0, by = {}, wrong = [];
    qz.items.forEach(function (it) { var key = it.k + it.q.d; by[key] = by[key] || { k: it.k, d: it.q.d, ok: 0, n: 0 }; by[key].n++; if (it.ans === it.right) { ok++; by[key].ok++; } else wrong.push(it); });
    var pct = Math.round(ok / n * 100), v = pct >= 85 ? "ready" : pct >= 70 ? "almost" : "more";
    var h = '<header class="hero slim"><h1>' + t("result") + "</h1>" + (qz.timeUp ? '<p class="lead">' + t("timeUp") + "</p>" : "") + '</header><section class="panel score ' + v + '"><p class="big-num">' + pct + '%</p><p class="num">' + ok + " / " + n + '</p><p class="pill">' + t(v) + "</p></section>";
    h += '<div class="row">' + (wrong.length ? '<button class="btn primary big" data-qredo="1">' + t("redo") + "</button>" : "") + '<button class="btn big" data-qquit="1">' + t("again") + "</button></div>";
    h += '<section class="panel"><h2>' + t("byDomain") + "</h2>" + Object.keys(by).sort().map(function (key) { var b = by[key]; return '<div class="brow"><div class="prog-h"><span>' + EX[b.k].name + " " + b.d + ". " + esc(L(EX[b.k].domains[b.d - 1].t)) + '</span><span class="num">' + b.ok + "/" + b.n + "</span></div>" + Hub.meter(Math.round(b.ok / b.n * 100), "d" + b.d) + "</div>"; }).join("") + "</section>";
    h += '<section class="panel"><h2>' + t("toReview") + "</h2>" + (wrong.length ? wrong.map(function (it) {
      return '<div class="rev"><p class="eyebrow">' + EX[it.k].name + " · " + it.q.o + '</p><p lang="en"><b>' + esc(it.q.q) + '</b></p><p class="sm bad-t">' + t("yours") + " " + (it.ans === null ? t("none") : esc(it.opts[it.ans])) + '</p><p class="sm ok-t">' + t("rightIs") + " " + esc(it.q.a[0]) + '</p><p class="sm">' + esc(L(it.q.e)) + '</p><button class="btn sm" data-ref="' + it.k + ":" + it.q.o + '">' + t("review") + " " + it.q.o + "</button></div>";
    }).join("") : "<p>" + t("allRight") + "</p>") + "</section>";
    return h;
  }
  function html() { return '<div class="quizview">' + (qz ? (qz.done ? resultHTML() : runHTML()) : setupHTML()) + "</div>"; }
  function mount(root) {
    var v = root.querySelector(".quizview");
    v.addEventListener("click", function (e) {
      var b = e.target.closest("[data-qopt],[data-qnav],[data-qend],[data-qquit],[data-qflag],[data-qredo]"); if (!b || !qz) return; var d = b.dataset, it = qz.items[qz.i];
      if (d.qopt != null) { if (qz.mode === "practice" && it.ans !== null) return; it.ans = +d.qopt; if (qz.mode === "practice") { record(it); Hub.save(); } }
      else if (d.qnav) { qz.i = Math.max(0, Math.min(qz.items.length - 1, qz.i + (+d.qnav))); window.scrollTo(0, 0); }
      else if (d.qend) return end();
      else if (d.qflag) { if (st.flag[it.id]) delete st.flag[it.id]; else st.flag[it.id] = 1; Hub.save(); }
      else if (d.qredo) return begin(qz.items.filter(function (x) { return x.ans !== x.right; }), "practice");
      else if (d.qquit) { clearInterval(timer); qz = null; window.scrollTo(0, 0); }
      Hub.render();
    });
    v.addEventListener("change", function (e) {
      var x = e.target;
      if (x.id === "s-ex") { su.ex = x.value; su.dom = "all"; } else if (x.id === "s-dom") su.dom = x.value; else if (x.id === "s-src") su.src = x.value;
      else if (x.id === "s-count") { su.count = +x.value; return; } else if (x.name === "mode") { su.mode = x.value; return; } else return;
      Hub.render();
    });
    v.addEventListener("submit", function (e) { e.preventDefault(); var p = shuffle(pool()).slice(0, su.count); if (p.length) begin(p, su.mode); });
  }
  Hub.views.quiz = { html: html, mount: mount };
  Hub.quizGo = function (ex, dom, src) { clearInterval(timer); qz = null; su.ex = ex; su.dom = ex === "all" ? "all" : (dom || "all"); su.src = src || "all"; Hub.go("quiz"); };
});
