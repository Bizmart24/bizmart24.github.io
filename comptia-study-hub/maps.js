window.HubMods = window.HubMods || [];
HubMods.push(function (Hub) {
  "use strict";
  var L = Hub.L, esc = Hub.esc, EX = Hub.EX, C = DATA.concepts, conBy = {}, ORDER = ["n", "s", "p"];
  C.forEach(function (c) { conBy[c[0]] = c; });
  var T = {
    title: ["Mappe concettuali", "Concept maps"],
    leadG: ["Scendi un livello alla volta: esame, dominio, obiettivo, concetti. Tocca un riquadro per aprirlo, usa il percorso in alto per tornare indietro.", "Go down one level at a time: exam, domain, objective, concepts. Tap a box to open it, use the trail at the top to go back."],
    leadL: ["Un concetto al centro e, intorno, tutto ciò a cui è legato. Ogni riga spiega il perché del collegamento.", "One concept in the centre and, around it, everything it is tied to. Each line explains why the link exists."],
    guide: ["Percorso guidato", "Guided path"], links: ["Collegamenti", "Connections"],
    root: ["Percorso CompTIA", "CompTIA path"], rootSub: ["Tre certificazioni, dalla rete alla sicurezza fino alla verifica", "Three certifications, from networking to security to testing"],
    capRoot: ["3 certificazioni, in quest'ordine", "3 certifications, in this order"], capEx: ["è diviso in 5 domini", "is split into 5 domains"],
    capDom: ["contiene questi obiettivi", "contains these objectives"], capPre: ["richiede queste basi", "builds on these foundations"],
    capObj: ["si basa su questi concetti", "rests on these concepts"], capNoCon: ["nessun concetto collegato", "no linked concepts"],
    capIn: ["fa parte di questi obiettivi", "belongs to these objectives"], capRel: ["è collegato a questi concetti", "is connected to these concepts"],
    objs: ["obiettivi", "objectives"], cons: ["concetti", "concepts"], ofExam: ["dell'esame", "of the exam"], dom: ["Dominio", "Domain"],
    upto: ["fino a", "up to"], q: ["domande", "questions"], min: ["min", "min"], pass: ["minimo", "pass"],
    points: ["Punti chiave", "Key points"], open: ["Apri la sezione completa", "Open the full section"], quiz: ["Quiz sul dominio", "Domain quiz"], openEx: ["Apri la scheda d'esame", "Open the exam overview"],
    back: ["Indietro", "Back"], find: ["Cerca un concetto (es. VLAN, SIEM)", "Find a concept (e.g. VLAN, SIEM)"], shared: ["Comune a più esami", "Shared across exams"],
    sameObj: ["Stesso obiettivo", "Same objective"], sameDom: ["Stesso dominio", "Same domain"], bridge: ["Collega", "Bridges"], and: ["e", "and"], akin: ["Argomento affine", "Related topic"],
    explore: ["Concetti comuni a più esami", "Concepts shared across exams"], exploreLead: ["Buoni punti di partenza: studiandoli una volta valgono per più certificazioni.", "Good starting points: study them once and they count for several certifications."],
    stud: ["studiati", "studied"], weakTag: ["da rinforzare", "needs work"],
    seeLinks: ["Vedi i collegamenti", "See connections"], tapCon: ["Tocca un concetto per vedere a cosa è collegato.", "Tap a concept to see what it connects to."]
  };
  function t(k) { return L(T[k]); }
  var gs = { mode: "guide", path: ["n"], con: "Zero Trust", hist: [] };
  function exOf(r) { return r.split(":")[0]; }
  function consOf(ref) { return C.filter(function (c) { return c[2].indexOf(ref) >= 0; }); }
  function isShared(c) { var s = {}; c[2].forEach(function (r) { s[exOf(r)] = 1; }); return Object.keys(s).length > 1; }
  function kid(cls, attr, inner, i) { return '<button class="kid ' + cls + '" ' + attr + ' style="--i:' + i + '">' + inner + '<span class="chev" aria-hidden="true">›</span></button>'; }
  function stem(cap, n) { return '<div class="stemrow"><i class="stem"></i><span class="cap">' + (n != null ? "<b>" + n + "</b> " : "") + cap + '</span><i class="stem"></i></div>'; }
  function objKid(ref, i, showEx) {
    var r = Hub.findObj(ref), n = consOf(ref).length, done = Hub.st.done[Hub.oid(r.ex.key, r.o.n)];
    return kid("k-obj d" + r.d.num + " ex-" + r.ex.key + (done ? " done" : ""), 'data-g="obj:' + ref + '"', '<span class="knum">' + (showEx ? r.ex.name + " " : "") + r.o.n + '</span><span class="ktxt"><b>' + esc(L(r.o.t)) + '</b><small>' + (showEx ? t("dom") + " " + r.d.num + ": " + esc(L(r.d.t)) : n + " " + t("cons")) + (done ? " · ✓ " + t("stud") : "") + "</small></span>", i);
  }
  function conKid(c, i, sub) {
    return kid("k-con" + (isShared(c) ? " shared" : ""), 'data-c="' + esc(c[0]) + '"', '<span class="ktxt"><b lang="en">' + esc(c[0]) + "</b><small>" + esc(sub || L(c[1])) + "</small></span>", i);
  }

  function prog(k, num) {
    var ex = EX[k]; if (ex.lite) return "";
    var dd = Hub.domDone(k, num), s = Hub.domStat(k, num), weak = s.n >= 3 && s.pct < 70;
    return '<span class="kprog"><span class="kbar"><i style="width:' + (dd.tot ? Math.round(dd.done / dd.tot * 100) : 0) + '%"></i></span><span>' + dd.done + "/" + dd.tot + " " + t("stud") + (s.n ? " · quiz " + s.pct + "%" : "") + "</span>" + (weak ? '<span class="kweak">' + t("weakTag") + "</span>" : "") + "</span>";
  }
  function exProg(k) { var s = Hub.examStats(EX[k]); return '<span class="kprog"><span class="kbar"><i style="width:' + s.pct + '%"></i></span><span>' + s.done + "/" + s.tot + " " + t("stud") + "</span></span>"; }
  function crumbs() {
    var p = gs.path, h = '<nav class="crumbs" aria-label="' + t("guide") + '"><button data-g="root"' + (p.length ? "" : ' aria-current="true"') + ">CompTIA</button>";
    if (p[0]) h += '<span>›</span><button class="ex-' + p[0] + '" data-g="ex:' + p[0] + '"' + (p.length === 1 ? ' aria-current="true"' : "") + ">" + EX[p[0]].name + "</button>";
    if (p[1]) h += '<span>›</span><button data-g="dom:' + p[0] + ":" + p[1] + '"' + (p.length === 2 ? ' aria-current="true"' : "") + ">" + t("dom") + " " + p[1] + "</button>";
    if (p[2]) h += '<span>›</span><button aria-current="true">' + p[2] + "</button>";
    return h + "</nav>";
  }
  function sib(prev, next) {
    return '<div class="sibs">' + (prev ? '<button data-g="' + prev[0] + '">‹ ' + esc(prev[1]) + "</button>" : "<span></span>") + (next ? '<button data-g="' + next[0] + '">' + esc(next[1]) + " ›</button>" : "<span></span>") + "</div>";
  }
  function guideHTML() {
    var p = gs.path, h = crumbs();
    if (!p.length) {
      h += '<div class="gstage"><div class="parent p-root"><h2>' + t("root") + "</h2><p>" + t("rootSub") + "</p></div>" + stem(t("capRoot")) + '<div class="kids c1">' + ORDER.map(function (k, i) {
        var ex = EX[k]; return kid("k-ex ex-" + k, 'data-g="ex:' + k + '"', '<span class="knum">' + (i + 1) + '</span><span class="ktxt"><b>' + ex.name + "</b><small>" + ex.code + " · " + t("upto") + " " + ex.questions + " " + t("q") + " · " + ex.minutes + " " + t("min") + "</small>" + (ex.lite ? "" : exProg(k)) + "</span>", i);
      }).join("") + "</div></div>";
      return h;
    }
    var ex = EX[p[0]], k = ex.key;
    if (p.length === 1) {
      var oi = ORDER.indexOf(k);
      h += '<div class="gstage ex-' + k + '">' + sib(oi > 0 ? ["ex:" + ORDER[oi - 1], EX[ORDER[oi - 1]].name] : null, oi < 2 ? ["ex:" + ORDER[oi + 1], EX[ORDER[oi + 1]].name] : null) +
        '<div class="parent p-ex"><p class="pk">' + ex.code + " · " + ex.ver + "</p><h2>CompTIA " + ex.name + "</h2><p>" + t("upto") + " " + ex.questions + " " + t("q") + " · " + ex.minutes + " " + t("min") + " · " + t("pass") + " " + ex.pass + "</p></div>" + stem(t("capEx")) +
        '<div class="kids c2">' + ex.domains.map(function (d, i) {
          return kid("k-dom d" + d.num, 'data-g="dom:' + k + ":" + d.num + '"', '<span class="knum">' + d.num + '</span><span class="ktxt"><b>' + esc(L(d.t)) + "</b><small>" + d.w + "% " + t("ofExam") + "</small>" + prog(k, d.num) + "</span>", i);
        }).join("") + "</div></div>";
      return h;
    }
    var d = ex.domains[p[1] - 1];
    if (p.length === 2) {
      var items = ex.lite ? d.pre : d.objs.map(function (o) { return k + ":" + o.n; });
      h += '<div class="gstage ex-' + k + " d" + d.num + '">' + sib(d.num > 1 ? ["dom:" + k + ":" + (d.num - 1), t("dom") + " " + (d.num - 1)] : null, d.num < 5 ? ["dom:" + k + ":" + (d.num + 1), t("dom") + " " + (d.num + 1)] : null) +
        '<div class="parent p-dom"><p class="pk">' + ex.name + " · " + d.w + "% " + t("ofExam") + "</p><h2>" + d.num + ". " + esc(L(d.t)) + "</h2>" + (ex.lite ? "<p>" + esc(L(d.desc)) + "</p>" : prog(k, d.num)) + "</div>" + stem(ex.lite ? t("capPre") : t("capDom"), items.length) +
        '<div class="kids c1">' + items.map(function (r, i) { return objKid(r, i, ex.lite); }).join("") + "</div>" +
        (ex.lite ? '<div class="row"><button class="btn sm primary" data-go="pentest">' + t("openEx") + " →</button></div>" : '<div class="row"><button class="btn sm" data-quiz="' + k + '" data-qdom="' + d.num + '">' + t("quiz") + "</button></div>") + "</div>";
      return h;
    }
    var idx = -1; d.objs.forEach(function (o, i) { if (o.n === p[2]) idx = i; });
    var o = d.objs[idx], ref = k + ":" + o.n, cons = consOf(ref), pv = d.objs[idx - 1], nx = d.objs[idx + 1];
    h += '<div class="gstage ex-' + k + " d" + d.num + '">' + sib(pv ? ["obj:" + k + ":" + pv.n, pv.n] : null, nx ? ["obj:" + k + ":" + nx.n, nx.n] : null) +
      '<div class="parent p-obj"><p class="pk">' + ex.name + " · " + t("dom") + " " + d.num + '</p><h2><span class="pnum">' + o.n + "</span> " + esc(L(o.t)) + "</h2></div>" + stem(cons.length ? t("capObj") : t("capNoCon"), cons.length || null) +
      '<div class="kids c2">' + cons.map(function (c, i) { return conKid(c, i); }).join("") + '</div><p class="fine">' + t("tapCon") + '</p><section class="gdetail"><h3>' + t("points") + "</h3><ul>" + o.p.slice(0, 4).map(function (x) { return "<li>" + esc(L(x)) + "</li>"; }).join("") + "</ul>" +
      '<div class="row"><button class="btn sm primary" data-ref="' + ref + '">' + t("open") + ' →</button><button class="btn sm" data-quiz="' + k + '" data-qdom="' + d.num + '">' + t("quiz") + "</button></div></section></div>";
    return h;
  }
  function reason(a, b) {
    var sh = a[2].filter(function (r) { return b[2].indexOf(r) >= 0; });
    if (sh.length) { var r = Hub.findObj(sh[0]); return t("sameObj") + ": " + r.ex.name + " " + r.o.n; }
    var da = {}, hit = null; a[2].forEach(function (r) { da[exOf(r) + ":" + r.split(":")[1].split(".")[0]] = 1; });
    b[2].forEach(function (r) { var key = exOf(r) + ":" + r.split(":")[1].split(".")[0]; if (da[key] && !hit) hit = key; });
    if (hit) { var ex = EX[hit.split(":")[0]], dn = +hit.split(":")[1]; return t("sameDom") + ": " + ex.name + " " + dn + ". " + L(ex.domains[dn - 1].t); }
    var ea = exOf(a[2][0]), eb = exOf(b[2][0]);
    return ea !== eb ? t("bridge") + " " + EX[ea].name + " " + t("and") + " " + EX[eb].name : t("akin");
  }
  function linksHTML() {
    var c = conBy[gs.con] || C[0], rel = c[3].map(function (x) { return conBy[x]; });
    C.forEach(function (o) { if (o[3].indexOf(c[0]) >= 0 && rel.indexOf(o) < 0) rel.push(o); });
    var i = 0, h = '<div class="lbar">' + (gs.hist.length ? '<button class="btn sm" data-lback="1">← ' + t("back") + "</button>" : "") + '<div class="searchbox"><label class="vh" for="mq">' + t("find") + '</label><input id="mq" type="search" list="mlist" placeholder="' + esc(t("find")) + '"><datalist id="mlist">' + C.map(function (x) { return '<option value="' + esc(x[0]) + '">'; }).join("") + "</datalist></div></div>";
    h += '<div class="gstage links"><div class="parent p-con">' + (isShared(c) ? '<p class="pk">' + t("shared") + "</p>" : "") + '<h2 lang="en">' + esc(c[0]) + "</h2><p>" + esc(L(c[1])) + "</p>" + Hub.conExtra(c) + '</div><div class="kids c1 long"><div class="capline"><span class="cap"><b>' + c[2].length + "</b> " + t("capIn") + "</span></div>" +
      c[2].map(function (r) { return objKid(r, i++, true); }).join("") + '<div class="capline"><span class="cap"><b>' + rel.length + "</b> " + t("capRel") + "</span></div>" +
      rel.map(function (o) { return conKid(o, i++, reason(c, o)); }).join("") + "</div></div>";
    h += '<section class="panel"><h2>' + t("explore") + '</h2><p class="muted sm">' + t("exploreLead") + '</p><div class="chips">' + C.filter(isShared).map(function (x) { return '<button class="chip soft' + (x === c ? " cur" : "") + '" data-c="' + esc(x[0]) + '">' + esc(x[0]) + "</button>"; }).join("") + "</div></section>";
    return h;
  }
  function html() {
    return '<div class="mapsview"><header class="hero slim"><h1>' + t("title") + '</h1><p class="lead">' + t(gs.mode === "guide" ? "leadG" : "leadL") + '</p></header><div class="seg2" role="tablist">' + ["guide", "links"].map(function (m) { return '<button role="tab" aria-selected="' + (gs.mode === m) + '" data-mmode="' + m + '">' + t(m) + "</button>"; }).join("") + "</div>" + (gs.mode === "guide" ? guideHTML() : linksHTML()) + "</div>";
  }
  function trunks(root) {
    root.querySelectorAll(".kids").forEach(function (k) { var last = k.lastElementChild; if (last) k.style.setProperty("--th", (last.offsetTop + 30) + "px"); });
  }
  function aim(id) {
    var p = id.split(":");
    if (p[0] === "root") { gs.mode = "guide"; gs.path = []; }
    else if (p[0] === "ex") { gs.mode = "guide"; gs.path = [p[1]]; }
    else if (p[0] === "dom") { gs.mode = "guide"; gs.path = [p[1], +p[2]]; }
    else if (p[0] === "obj") { var r = Hub.findObj(p[1] + ":" + p[2]); if (!r) return false; gs.mode = "guide"; gs.path = [p[1], r.d.num, p[2]]; }
    else if (p[0] === "con") { var key = id.slice(4); if (!conBy[key]) return false; if (gs.mode === "links" && gs.con !== key) gs.hist.push(gs.con); gs.mode = "links"; gs.con = key; }
    else return false;
    return true;
  }
  function mount(root) {
    trunks(root);
    var v = root.querySelector(".mapsview");
    v.addEventListener("click", function (e) {
      var b = e.target.closest("[data-mmode],[data-g],[data-c],[data-lback]"); if (!b) return; var d = b.dataset;
      if (d.mmode) gs.mode = d.mmode;
      else if (d.g) { if (!aim(d.g)) return; }
      else if (d.c) { if (!aim("con:" + d.c)) return; }
      else if (d.lback) gs.con = gs.hist.pop();
      Hub.render(); window.scrollTo(0, 0);
    });
    var q = root.querySelector("#mq");
    if (q) q.addEventListener("change", function (e) {
      var val = e.target.value.trim().toLowerCase(); if (!val) return;
      var c = C.filter(function (x) { return x[0].toLowerCase() === val; })[0] || C.filter(function (x) { return x[0].toLowerCase().indexOf(val) >= 0; })[0];
      e.target.value = ""; e.target.blur();
      if (c) setTimeout(function () { if (aim("con:" + c[0])) { Hub.render(); window.scrollTo(0, 0); } }, 0);
    });
  }
  window.addEventListener("resize", function () { var r = document.querySelector(".mapsview"); if (r) trunks(r); });
  Hub.views.maps = { html: html, mount: mount };
  Hub.mapx = { gs: gs, guideHTML: guideHTML, linksHTML: linksHTML, mount0: mount, prog: prog, consOf: consOf, isShared: isShared };
  Hub.mapGo = function (id) { if (aim(id)) Hub.go("mappe"); };
});
