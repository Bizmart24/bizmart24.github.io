HubMods.push(function (Hub) {
  "use strict";
  var L = Hub.L, esc = Hub.esc, EX = Hub.EX, st = Hub.st;
  var T = {
    today: ["Da fare oggi", "To do today"], cardsDue: ["schede da ripassare", "cards due for review"], cardsBtn: ["Ripassa ora", "Review now"], cardsNone: ["Nessuna scheda in scadenza: studiane di nuove.", "No cards due: study some new ones."], cardsNew: ["Schede nuove", "New cards"],
    errs: ["domande sbagliate da ripassare", "missed questions to review"], errBtn: ["Ripassa gli errori", "Review mistakes"],
    week: ["Questa settimana", "This week"], weekNone: ["Imposta la data d'esame nella scheda dell'esame per avere un piano settimanale.", "Set the exam date on the exam card to get a weekly plan."],
    ready: ["Pronto per l'esame?", "Ready for the exam?"], readyLead: ["Stima basata su studio, quiz, simulazioni e schede. Non è un punteggio d'esame.", "Estimate based on study, quizzes, simulations and cards. Not an exam score."],
    r0: ["All'inizio", "Getting started"], r1: ["In corsa", "On track"], r2: ["Quasi pronto", "Nearly ready"], r3: ["Pronto a prenotare", "Ready to book"],
    cStudy: ["Obiettivi studiati", "Objectives studied"], cQuiz: ["Quiz: almeno 85% su 60 o più risposte", "Quizzes: at least 85% over 60 or more answers"], cSim: ["2 simulazioni da 40+ domande con almeno 85%", "2 simulations of 40+ questions at 85% or more"], cCards: ["Schede dei concetti imparate", "Concept cards learned"], answers: ["risposte", "answers"],
    plan: ["Piano di studio fino all'esame", "Study plan to the exam"], planLead: ["Gli obiettivi non ancora studiati sono distribuiti sulle settimane che restano; l'ultima è riservata al ripasso.", "Objectives not yet studied are spread over the remaining weeks; the last one is kept for review."], wk: ["Settimana", "Week"],
    review: ["Ripasso finale: errori dei quiz, schede in scadenza e due simulazioni complete a tempo.", "Final review: quiz mistakes, due cards and two full timed simulations."], allDone: ["Hai studiato tutti gli obiettivi: usa il tempo che resta per quiz, schede ed esercizi pratici.", "You have studied every objective: use the remaining time for quizzes, cards and drills."],
    noDate: ["Imposta la data d'esame nella Home per generare il piano.", "Set the exam date on Home to generate the plan."], past: ["La data d'esame è passata: aggiornala nella Home.", "The exam date has passed: update it on Home."],
    gTitle: ["Guida all'esame", "Exam guide"], gLead: ["Come si svolge l'esame, come gestire tempo e domande, e cosa fare prima e dopo.", "How the exam works, how to handle time and questions, and what to do before and after."],
    backup: ["Sposta i progressi su un altro dispositivo", "Move your progress to another device"], backupLead: ["I progressi restano in questo browser. Copia il codice qui sotto e incollalo nell'hub sull'altro dispositivo.", "Progress lives in this browser. Copy the code below and paste it into the hub on the other device."],
    copy: ["Copia il codice", "Copy the code"], copied: ["Codice copiato.", "Code copied."], copyFail: ["Copia non riuscita: seleziona il testo e copialo a mano.", "Copy failed: select the text and copy it by hand."], paste: ["Incolla qui un codice", "Paste a code here"], imp: ["Importa", "Import"], impOk: ["Progressi importati.", "Progress imported."], impBad: ["Codice non valido: controlla di averlo copiato per intero.", "Invalid code: check you copied all of it."],
    reset: ["Azzera tutti i progressi", "Reset all progress"], reset2: ["Conferma: cancella tutto", "Confirm: delete everything"], resetOk: ["Progressi azzerati.", "Progress reset."], verified: ["Verifica", "Verification"]
  };
  function t(k) { return L(T[k]); }
  function days(k) { var v = st.dates[k]; if (!v) return null; var t0 = new Date(); t0.setHours(0, 0, 0, 0); return Math.round((new Date(v + "T00:00:00") - t0) / 864e5); }
  function dm(off) { var d = new Date(); d.setDate(d.getDate() + off); return d.getDate() + "/" + (d.getMonth() + 1); }
  function plan(k) {
    var n = days(k); if (n === null || n <= 0) return null;
    var rem = []; EX[k].domains.forEach(function (d) { d.objs.forEach(function (o) { if (!st.done[Hub.oid(k, o.n)]) rem.push(k + ":" + o.n); }); });
    var weeks = Math.max(1, Math.ceil(n / 7)), sw = weeks >= 3 ? weeks - 1 : weeks, per = Math.ceil(rem.length / sw) || 0, out = [];
    for (var w = 0; w < weeks; w++) out.push({ w: w + 1, from: dm(w * 7), to: dm(Math.min(n, w * 7 + 6)), refs: w < sw ? rem.slice(w * per, (w + 1) * per) : [], review: w >= sw || !rem.length });
    return out;
  }
  function ready(k) {
    var s = Hub.examStats(EX[k]), ok = 0, n = 0; EX[k].domains.forEach(function (d) { var x = Hub.domStat(k, d.num); ok += x.ok; n += x.n; });
    var acc = n ? Math.round(ok / n * 100) : 0, sims = st.hist.filter(function (h) { return h.m === "sim" && h.n >= 40 && h.pct >= 85 && (h.ex === k || h.ex === "all"); }).length, c = Hub.srLearned(k);
    var parts = [
      { lab: t("cStudy"), v: s.pct / 100, txt: s.done + "/" + s.tot, w: .3 },
      { lab: t("cQuiz"), v: Math.min(1, acc / 85) * Math.min(1, n / 60), txt: (n ? acc + "% · " : "") + n + " " + t("answers"), w: .35 },
      { lab: t("cSim"), v: Math.min(1, sims / 2), txt: sims + "/2", w: .2 },
      { lab: t("cCards"), v: c.tot ? c.n / c.tot : 0, txt: c.n + "/" + c.tot, w: .15 }
    ], tot = 0; parts.forEach(function (p) { tot += p.v * p.w; });
    return { pct: Math.round(tot * 100), parts: parts };
  }
  function readyHTML(k) {
    var r = ready(k), lab = r.pct >= 95 ? "r3" : r.pct >= 80 ? "r2" : r.pct >= 50 ? "r1" : "r0";
    return '<div class="readybox ex-' + k + '"><div class="prog-h"><span><b>' + EX[k].name + "</b> · " + t(lab) + '</span><span class="num">' + r.pct + "%</span></div>" + Hub.meter(r.pct) + '<ul class="rlist">' + r.parts.map(function (p) { return '<li class="' + (p.v >= .999 ? "ok" : "") + '"><span class="tick">' + (p.v >= .999 ? "✓" : "○") + "</span><span>" + p.lab + '</span><span class="num">' + p.txt + "</span></li>"; }).join("") + "</ul></div>";
  }
  Hub.homeExtra = function () {
    var due = Hub.srDue(), nw = Object.keys(st.wrong).length;
    var h = '<section class="panel todaybox"><h2>' + t("today") + '</h2><div class="trow"><span>' + (due ? '<b class="num">' + due + "</b> " + t("cardsDue") : t("cardsNone")) + '</span><button class="btn sm primary" data-cards="' + (due ? "today" : "new") + '">' + (due ? t("cardsBtn") : t("cardsNew")) + "</button></div>";
    if (nw) h += '<div class="trow"><span><b class="num">' + nw + "</b> " + t("errs") + '</span><button class="btn sm" data-quiz="all" data-qsrc="wrong">' + t("errBtn") + "</button></div>";
    var any = false;
    ["n", "s"].forEach(function (k) { var p = plan(k); if (!p) return; any = true; h += '<div class="twk ex-' + k + '"><h3>' + t("week") + " · " + EX[k].name + " (" + p[0].from + " - " + p[0].to + ")</h3>" + (p[0].refs.length ? '<div class="chips">' + p[0].refs.map(Hub.refChip).join("") + "</div>" : '<p class="sm">' + t(p[0].review && !p[0].refs.length ? "review" : "allDone") + "</p>") + "</div>"; });
    if (!any) h += '<p class="sm muted">' + t("weekNone") + "</p>";
    h += '</section><section class="panel"><h2>' + t("ready") + '</h2><p class="muted sm">' + t("readyLead") + "</p>" + readyHTML("n") + readyHTML("s") + "</section>";
    return h;
  };
  Hub.examExtra = function (ex) {
    var k = ex.key, n = days(k), p = plan(k), h = '<section class="panel"><h2>' + t("ready") + "</h2>" + readyHTML(k) + (ex.verified ? '<p class="fine"><b>' + t("verified") + ":</b> " + esc(L(ex.verified)) + "</p>" : "") + '</section><section class="panel"><h2>' + t("plan") + "</h2>";
    if (n === null) return h + '<p class="muted sm">' + t("noDate") + "</p></section>";
    if (n <= 0) return h + '<p class="muted sm">' + t("past") + "</p></section>";
    h += '<p class="muted sm">' + t("planLead") + "</p>" + p.map(function (w) {
      return '<details class="wkrow"' + (w.w === 1 ? " open" : "") + "><summary><b>" + t("wk") + " " + w.w + '</b> <span class="num muted">' + w.from + " - " + w.to + '</span><span class="num cnt">' + (w.refs.length || "↻") + "</span></summary>" + (w.refs.length ? '<div class="chips">' + w.refs.map(Hub.refChip).join("") + "</div>" : '<p class="sm">' + t(w.review ? "review" : "allDone") + "</p>") + "</details>";
    }).join("");
    return h + "</section>";
  };

  var G = [
    [["Formato", "Format"], [["Network+ e Security+: fino a 90 domande in 90 minuti. PenTest+: fino a 90 domande in 165 minuti.", "Network+ and Security+: up to 90 questions in 90 minutes. PenTest+: up to 90 questions in 165 minutes."], ["Punteggio su scala 100-900: servono 720 per Network+, 750 per Security+ e PenTest+. Il punteggio è scalato, quindi non equivale a una percentuale di risposte corrette.", "Scored on a 100-900 scale: 720 to pass Network+, 750 for Security+ and PenTest+. The score is scaled, so it is not a percentage of correct answers."], ["Due tipi di domande: a scelta multipla (una o più risposte) e performance-based (PBQ), in cui si svolge un compito in un ambiente simulato.", "Two question types: multiple choice (one or more answers) and performance-based (PBQ), where you complete a task in a simulated environment."]]],
    [["Gestire il tempo", "Managing time"], [["Con 90 domande in 90 minuti hai circa un minuto a domanda: le PBQ ne richiedono di più, quindi le domande semplici vanno chiuse in fretta.", "With 90 questions in 90 minutes you have about a minute each: PBQs take longer, so simple questions must be closed quickly."], ["Le PBQ di solito arrivano all'inizio. Se una ti blocca, segnala la domanda per la revisione, vai avanti e torna alla fine.", "PBQs usually come first. If one stalls you, flag it for review, move on and come back at the end."], ["Non lasciare domande senza risposta: una domanda saltata conta come sbagliata, quindi una risposta ragionata vale sempre il tentativo.", "Leave no question blank: a skipped question counts as wrong, so a reasoned answer is always worth the attempt."], ["Allenati con la simulazione a tempo di questo hub usando 90 domande.", "Train with this hub's timed simulation using 90 questions."]]],
    [["Leggere le domande", "Reading the questions"], [["Cerca la parola chiave: BEST, MOST likely, FIRST, NEXT, NOT. Spesso più risposte sono vere, ma una sola risponde a quella parola.", "Find the keyword: BEST, MOST likely, FIRST, NEXT, NOT. Often several answers are true, but only one answers that word."], ["Elimina prima le due risposte chiaramente fuori tema, poi scegli tra le due rimaste.", "Eliminate the two clearly off-topic answers first, then choose between the remaining two."], ["Negli obiettivi che iniziano con \"Given a scenario\" non basta ricordare la definizione: devi applicarla al caso descritto. Gli esercizi della sezione Pratica servono a questo.", "For objectives starting with \"Given a scenario\" recalling the definition is not enough: you must apply it to the case described. The Practice drills are for this."], ["Nelle domande di troubleshooting segui la metodologia: la risposta giusta è quasi sempre il passo successivo previsto, non la soluzione più drastica.", "In troubleshooting questions follow the methodology: the right answer is nearly always the expected next step, not the most drastic fix."]]],
    [["Ultima settimana", "Final week"], [["Niente argomenti nuovi: ripassa gli errori dei quiz, le schede in scadenza e i domini segnati come deboli.", "No new topics: review quiz mistakes, due cards and the domains flagged as weak."], ["Fai almeno due simulazioni complete a tempo e punta all'85%.", "Take at least two full timed simulations and aim for 85%."], ["Riscrivi a memoria le tabelle chiave: porte, tabella CIDR, passi del troubleshooting, formule del rischio.", "Rewrite the key tables from memory: ports, CIDR table, troubleshooting steps, risk formulas."]]],
    [["Giorno dell'esame", "Exam day"], [["Gli esami si sostengono con Pearson VUE, in un centro d'esame oppure online con sorveglianza remota.", "Exams are taken with Pearson VUE, at a test centre or online with remote proctoring."], ["Porta i documenti d'identità richiesti nella conferma di prenotazione e arriva in anticipo; online, prova prima computer, webcam e connessione.", "Bring the identity documents listed in your booking confirmation and arrive early; online, test computer, webcam and connection beforehand."], ["Appena inizia l'esame, scrivi sul foglio o sulla lavagna fornita la tabella CIDR e le porte: ti libera la mente per il resto.", "As the exam starts, write the CIDR table and ports on the sheet or whiteboard provided: it frees your mind for the rest."]]],
    [["Dopo l'esame", "After the exam"], [["Le certificazioni CompTIA valgono tre anni e si rinnovano con il programma di formazione continua.", "CompTIA certifications are valid for three years and are renewed through the continuing education programme."], ["Security+: la versione SY0-801 è uscita il 17 novembre 2026; la SY0-701 resta prenotabile in inglese fino all'11 giugno 2027. La certificazione ottenuta è la stessa.", "Security+: version SY0-801 launched on November 17, 2026; SY0-701 stays bookable in English until June 11, 2027. The certification earned is the same."], ["Prezzi e regole di ripetizione dell'esame cambiano: controllali sul sito CompTIA prima di acquistare il voucher.", "Prices and retake rules change: check them on the CompTIA site before buying the voucher."]]]
  ];
  var msg = "", armed = false;
  function code() { try { return btoa(unescape(encodeURIComponent(JSON.stringify(st)))); } catch (e) { return ""; } }
  Hub.views.guide = {
    html: function () {
      var h = '<div class="guideview"><header class="hero slim"><h1>' + t("gTitle") + '</h1><p class="lead">' + t("gLead") + "</p></header>" + G.map(function (s, i) { return '<section class="panel gsec"><h2><span class="gn">' + (i + 1) + "</span>" + L(s[0]) + "</h2><ul>" + s[1].map(function (p) { return "<li>" + esc(L(p)) + "</li>"; }).join("") + "</ul></section>"; }).join("");
      h += '<section class="panel" id="backup"><h2>' + t("backup") + '</h2><p class="muted sm">' + t("backupLead") + '</p><label class="vh" for="bk-out">' + t("copy") + '</label><textarea id="bk-out" class="codebox" readonly rows="3">' + esc(code()) + '</textarea><div class="row"><button class="btn primary" data-bk="copy">' + t("copy") + '</button></div><label class="flabel" for="bk-in">' + t("paste") + '</label><textarea id="bk-in" class="codebox" rows="3"></textarea><div class="row"><button class="btn" data-bk="import">' + t("imp") + '</button><button class="btn danger" data-bk="reset">' + (armed ? t("reset2") : t("reset")) + "</button></div>" + (msg ? '<p class="bkmsg" role="status">' + esc(msg) + "</p>" : "") + "</section>";
      return h + "</div>";
    },
    mount: function (root) {
      root.querySelector(".guideview").addEventListener("click", function (e) {
        var b = e.target.closest("[data-bk]"); if (!b) return; var a = b.dataset.bk;
        if (a === "copy") { var ta = root.querySelector("#bk-out"); ta.select(); try { navigator.clipboard.writeText(ta.value).then(function () { msg = t("copied"); Hub.render(); }, function () { msg = t("copyFail"); Hub.render(); }); } catch (x) { msg = t("copyFail"); Hub.render(); } return; }
        if (a === "import") {
          try { var o = JSON.parse(decodeURIComponent(escape(atob(root.querySelector("#bk-in").value.trim())))); if (!o || typeof o !== "object" || !o.done) throw 0; Object.keys(st).forEach(function (k) {
            if (o[k] == null) return;
            if (Array.isArray(st[k])) { st[k].length = 0; (o[k] || []).forEach(function (x) { st[k].push(x); }); }
            else if (st[k] && typeof st[k] === "object") { Object.keys(st[k]).forEach(function (x) { delete st[k][x]; }); Object.keys(o[k]).forEach(function (x) { st[k][x] = o[k][x]; }); }
            else st[k] = o[k];
          }); Hub.save(); msg = t("impOk"); } catch (x) { msg = t("impBad"); }
        } else if (a === "reset") {
          if (!armed) { armed = true; msg = ""; } else { armed = false; ["done", "known", "dates", "wrong", "flag", "seen", "dstat", "sr"].forEach(function (k) { Object.keys(st[k]).forEach(function (x) { delete st[k][x]; }); }); st.hist.length = 0; st.last = null; Hub.save(); msg = t("resetOk"); }
        }
        Hub.render();
      });
    }
  };
  document.addEventListener("click", function (e) { var b = e.target.closest("[data-cards]"); if (b) Hub.cardsGo(b.dataset.cards); });
});
