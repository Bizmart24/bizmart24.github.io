HubMods.push(function (Hub) {
  "use strict";
  var L = Hub.L, esc = Hub.esc, C = DATA.concepts, A = DATA.acronyms, st = Hub.st, INT = [1, 3, 7, 14, 30];
  st.known = st.known || {}; st.sr = st.sr || {};
  var T = {
    title: ["Schede e glossario", "Cards and glossary"],
    lead: ["Le schede tornano a intervalli crescenti (1, 3, 7, 14, 30 giorni): se la sai si allontana, se sbagli ricomincia. Così ripassi solo ciò che serve oggi.", "Cards come back at growing intervals (1, 3, 7, 14, 30 days): know it and it moves away, miss it and it restarts. You review only what is due today."],
    flash: ["Flashcard", "Flashcards"], gloss: ["Glossario", "Glossary"], acr: ["Sigle", "Acronyms"], all: ["Tutti", "All"], con: ["Concetti", "Concepts"],
    mToday: ["Ripasso di oggi", "Due today"], mNew: ["Nuove", "New"], mAll: ["Tutte", "All"], deck: ["Mazzo", "Deck"], what: ["Cosa", "What"],
    tap: ["Tocca per vedere la risposta", "Tap to see the answer"], know: ["La so", "I know it"], again: ["Da ripassare", "Review again"], nextIn: ["torna tra", "back in"], days: ["giorni", "days"], day: ["giorno", "day"],
    card: ["Scheda", "Card"], of: ["di", "of"], learned: ["imparate", "learned"], due: ["da ripassare oggi", "due today"],
    doneToday: ["Per oggi hai finito questo mazzo. Torna domani, oppure passa alle schede nuove.", "You are done with this deck for today. Come back tomorrow, or move on to new cards."], goNew: ["Studia schede nuove", "Study new cards"], goAll: ["Ripassa tutto", "Review everything"],
    map: ["Vedi i collegamenti", "See connections"], search: ["Cerca nel glossario", "Search the glossary"], searchA: ["Cerca una sigla o il suo significato", "Search an acronym or its meaning"], objs: ["Obiettivi", "Objectives"], none: ["Nessun risultato.", "No results."]
  };
  function t(k) { return L(T[k]); }
  function today(off) { var d = new Date(); d.setDate(d.getDate() + (off || 0)); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  var cs = { tab: "flash", kind: "con", ex: "all", mode: null, deck: null, i: 0, flip: false, q: "" };
  function inEx(tags) { return cs.ex === "all" || tags.indexOf(cs.ex) >= 0; }
  function items(kind) {
    return (kind || cs.kind) === "con"
      ? C.map(function (c) { return { id: "C:" + c[0], front: c[0], back: L(c[1]), c: c, tags: c[2].map(function (r) { return r.charAt(0); }).join("") }; })
      : A.map(function (a) { return { id: "A:" + a[0], front: a[0], back: a[1], tags: a[2] }; });
  }
  function isDue(it) { var s = st.sr[it.id]; return s && s.due <= today(); }
  function pool() { return items().filter(function (it) { return inEx(it.tags); }); }
  function build() {
    var p = pool();
    if (!cs.mode) cs.mode = p.some(isDue) ? "today" : "new";
    var d = p.filter(function (it) { return cs.mode === "today" ? isDue(it) : cs.mode === "new" ? !st.sr[it.id] : true; });
    for (var i = d.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = d[i]; d[i] = d[j]; d[j] = x; }
    cs.deck = d; cs.i = 0; cs.flip = false;
  }
  Hub.srDue = function () { var n = 0; ["con", "acr"].forEach(function (k) { items(k).forEach(function (it) { if (isDue(it)) n++; }); }); return n; };
  Hub.srLearned = function (ex) { var p = C.filter(function (c) { return c[2].some(function (r) { return r.charAt(0) === ex; }); }), n = 0; p.forEach(function (c) { var s = st.sr["C:" + c[0]]; if (s && s.b >= 1) n++; }); return { n: n, tot: p.length }; };
  Hub.cardsGo = function (mode) { cs.tab = "flash"; cs.mode = mode || "today"; cs.ex = "all"; cs.deck = null; Hub.go("schede"); };
  function seg(attr, list, cur, cls) { return '<div class="seg2 ' + (cls || "") + '" role="tablist">' + list.map(function (m) { return '<button role="tab" aria-selected="' + (cur === m[0]) + '" ' + attr + '="' + m[0] + '">' + m[1] + "</button>"; }).join("") + "</div>"; }
  function html() {
    if (!cs.deck) build();
    var p = pool(), learned = p.filter(function (it) { var s = st.sr[it.id]; return s && s.b >= 1; }).length, due = p.filter(isDue).length;
    var h = '<div class="cardsview"><header class="hero slim"><h1>' + t("title") + '</h1><p class="lead">' + t("lead") + "</p></header>" + seg("data-ctab", [["flash", t("flash")], ["gloss", t("gloss")], ["acr", t("acr")]], cs.tab);
    h += '<div class="tabs">' + ["all", "n", "s"].map(function (k) { return '<button class="tab ' + (k === "all" ? "" : "ex-" + k) + '" aria-selected="' + (cs.ex === k) + '" data-cex="' + k + '">' + (k === "all" ? t("all") : Hub.EX[k].name) + "</button>"; }).join("") + "</div>";
    if (cs.tab === "flash") {
      h += '<div class="deckbar"><div class="field"><span class="flabel">' + t("what") + "</span>" + seg("data-ckind", [["con", t("con")], ["acr", t("acr")]], cs.kind, "small") + '</div><div class="field"><span class="flabel">' + t("deck") + "</span>" + seg("data-cmode", [["today", t("mToday") + " (" + due + ")"], ["new", t("mNew")], ["all", t("mAll")]], cs.mode, "small") + "</div></div>";
      h += '<div class="prog"><div class="prog-h"><span>' + learned + "/" + p.length + " " + t("learned") + '</span><span class="num">' + due + " " + t("due") + "</span></div>" + Hub.meter(p.length ? Math.round(learned / p.length * 100) : 0) + "</div>";
      var it = cs.deck[cs.i];
      if (!it) h += '<section class="panel"><p>' + t("doneToday") + '</p><div class="row"><button class="btn primary" data-cmode="new">' + t("goNew") + '</button><button class="btn" data-cmode="all">' + t("goAll") + "</button></div></section>";
      else {
        var s = st.sr[it.id], nb = Math.min(5, ((s && s.b) || 0) + 1), nd = INT[nb - 1];
        h += '<p class="sm muted">' + t("card") + " " + (cs.i + 1) + " " + t("of") + " " + cs.deck.length + '</p><button class="flash' + (cs.flip ? " flipped" : "") + '" data-cflip="1"><span class="face front"><span class="term" lang="en">' + esc(it.front) + '</span><span class="hint">' + t("tap") + '</span></span><span class="face back"><span class="term sm2" lang="en">' + esc(it.front) + '</span><span class="def">' + esc(it.back) + "</span></span></button>";
        h += '<div class="row grow"><button class="btn big" data-cknow="0">' + t("again") + '</button><button class="btn big primary okb" data-cknow="1">' + t("know") + '</button></div><p class="sm muted ctr">' + t("know") + ": " + t("nextIn") + " " + nd + " " + (nd === 1 ? t("day") : t("days")) + "</p>";
        if (it.c) h += '<div class="chips">' + it.c[2].map(Hub.refChip).join("") + '</div><div class="row"><button class="btn sm" data-node="' + esc(it.c[0]) + '">' + t("map") + " →</button></div>";
      }
    } else if (cs.tab === "gloss") h += '<div class="searchbox"><label class="vh" for="gq">' + t("search") + '</label><input id="gq" type="search" placeholder="' + esc(t("search")) + '" value="' + esc(cs.q) + '"></div><div id="glist">' + glist() + "</div>";
    else h += '<div class="searchbox"><label class="vh" for="gq">' + t("searchA") + '</label><input id="gq" type="search" placeholder="' + esc(t("searchA")) + '" value="' + esc(cs.q) + '"></div><div id="glist">' + alist() + "</div>";
    return h + "</div>";
  }
  function glist() {
    var q = cs.q.trim().toLowerCase();
    var list = C.filter(function (c) { return inEx(c[2].map(function (r) { return r.charAt(0); }).join("")) && (!q || (c[0] + " " + c[1].join(" ")).toLowerCase().indexOf(q) >= 0); }).sort(function (a, b) { return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1; });
    if (!list.length) return '<p class="empty">' + t("none") + "</p>";
    return list.map(function (c) {
      var s = st.sr["C:" + c[0]];
      return '<details class="obj gl"><summary><span class="otitle" lang="en"><b>' + esc(c[0]) + "</b></span>" + (s && s.b >= 1 ? '<span class="check">✓</span>' : "") + '</summary><div class="obody"><p>' + esc(L(c[1])) + "</p><h3>" + t("objs") + '</h3><div class="chips">' + c[2].map(Hub.refChip).join("") + "</div>" +
        (c[3].length ? '<div class="chips rel">' + c[3].map(function (o) { return '<button class="chip soft" data-node="' + esc(o) + '">' + esc(o) + "</button>"; }).join("") + "</div>" : "") + '<div class="row"><button class="btn sm" data-node="' + esc(c[0]) + '">' + t("map") + " →</button></div></div></details>";
    }).join("");
  }
  function alist() {
    var q = cs.q.trim().toLowerCase(), list = A.filter(function (a) { return inEx(a[2]) && (!q || (a[0] + " " + a[1]).toLowerCase().indexOf(q) >= 0); });
    if (!list.length) return '<p class="empty">' + t("none") + "</p>";
    return '<dl class="acrlist">' + list.map(function (a) { return "<div><dt class=\"mono\">" + esc(a[0]) + '</dt><dd lang="en">' + esc(a[1]) + '<span class="tags">' + (a[2].indexOf("n") >= 0 ? '<i class="ex-n">N+</i>' : "") + (a[2].indexOf("s") >= 0 ? '<i class="ex-s">S+</i>' : "") + "</span></dd></div>"; }).join("") + "</dl>";
  }
  function mount(root) {
    var v = root.querySelector(".cardsview");
    v.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ctab],[data-cex],[data-cflip],[data-cknow],[data-ckind],[data-cmode]"); if (!b) return; var d = b.dataset;
      if (d.ctab) { cs.tab = d.ctab; cs.q = ""; }
      else if (d.cex) { cs.ex = d.cex; cs.deck = null; }
      else if (d.ckind) { cs.kind = d.ckind; cs.mode = null; cs.deck = null; }
      else if (d.cmode) { cs.mode = d.cmode; cs.deck = null; }
      else if (d.cflip) { cs.flip = !cs.flip; b.classList.toggle("flipped", cs.flip); return; }
      else if (d.cknow) {
        var it = cs.deck[cs.i], s = st.sr[it.id] || { b: 0 };
        if (d.cknow === "1") { s.b = Math.min(5, s.b + 1); s.due = today(INT[s.b - 1]); if (it.c) st.known[it.c[0]] = 1; }
        else { s.b = 0; s.due = today(); if (it.c) delete st.known[it.c[0]]; if (cs.deck.length - cs.i > 1) cs.deck.push(it); }
        st.sr[it.id] = s; Hub.save(); cs.i++; cs.flip = false;
      }
      Hub.render();
    });
    v.addEventListener("input", function (e) { if (e.target.id === "gq") { cs.q = e.target.value; root.querySelector("#glist").innerHTML = cs.tab === "acr" ? alist() : glist(); } });
  }
  Hub.views.cards = { html: html, mount: mount };
});
