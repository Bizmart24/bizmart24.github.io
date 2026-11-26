HubMods.push(function (Hub) {
  "use strict";
  var L = Hub.L, esc = Hub.esc, EX = Hub.EX, st = Hub.st;
  var T = {
    title: ["Pratica", "Practice"], lead: ["Esercizi rapidi sulle abilità che l'esame chiede di applicare, non solo di ricordare.", "Quick drills on the skills the exam asks you to apply, not just recall."],
    subnet: ["Subnet", "Subnets"], ports: ["Porte", "Ports"], order: ["Sequenze", "Sequences"],
    sQ: ["Calcola la subnet di questo host", "Work out this host's subnet"], mask: ["Subnet mask", "Subnet mask"], net: ["Indirizzo di rete", "Network address"], bc: ["Indirizzo di broadcast", "Broadcast address"], hosts: ["Host utilizzabili", "Usable hosts"],
    check: ["Verifica", "Check"], next: ["Prossimo esercizio", "Next exercise"], sol: ["Soluzione", "Solution"], how: ["Come si calcola", "How to work it out"],
    how1: ["La maschera", "The mask"], how2: ["lascia", "leaves"], how3: ["bit per gli host. Nell'ottetto che cambia il blocco è 256 -", "host bits. In the changing octet the block is 256 -"], how4: ["La rete è il multiplo del blocco subito sotto l'indirizzo; il broadcast è l'ultimo indirizzo del blocco. Host utilizzabili: 2^", "The network is the block multiple just below the address; the broadcast is the block's last address. Usable hosts: 2^"],
    score: ["Corrette", "Correct"], streak: ["Serie", "Streak"], best: ["record", "best"],
    pq1: ["Quale porta usa", "Which port does"], pq1b: ["?", " use?"], pq2: ["Quale protocollo usa la porta", "Which protocol uses port"], right: ["Giusto.", "Right."], wrong: ["No:", "No:"],
    oLead: ["Metti i passaggi nell'ordine corretto con le frecce, poi verifica.", "Put the steps in the right order with the arrows, then check."], up: ["Sposta su", "Move up"], down: ["Sposta giù", "Move down"], allOk: ["Ordine corretto.", "Correct order."], someBad: ["Alcuni passaggi sono fuori posto: quelli in rosso vanno spostati.", "Some steps are out of place: move the red ones."], show: ["Mostra la soluzione", "Show the solution"], other: ["Altra sequenza", "Another sequence"],
    sTitle: ["Cerca", "Search"], sLead: ["Cerca in obiettivi, concetti e schede rapide di tutto l'hub.", "Search objectives, concepts and quick sheets across the hub."], sPh: ["Scrivi almeno 2 lettere (es. dns, 443, zero trust)", "Type at least 2 letters (e.g. dns, 443, zero trust)"],
    rObj: ["Obiettivi", "Objectives"], rCon: ["Concetti", "Concepts"], rSheet: ["Schede rapide", "Quick sheets"], rNone: ["Nessun risultato.", "No results."], rMore: ["altri risultati: restringi la ricerca", "more results: narrow your search"], seeSheet: ["Apri le schede rapide", "Open quick sheets"]
  };
  function t(k) { return L(T[k]); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function ipStr(n) { return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join("."); }
  function calc(ip, p) { var mask = (0xffffffff << (32 - p)) >>> 0, net = (ip & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0; return { mask: ipStr(mask), net: ipStr(net), bc: ipStr(bc), hosts: Math.pow(2, 32 - p) - 2 }; }
  Hub.subnetCalc = calc;
  function newSubnet() {
    var p = Math.random() < .72 ? 24 + rnd(7) : 17 + rnd(7), r = rnd(3), a = r === 0 ? [10, rnd(256)] : r === 1 ? [172, 16 + rnd(16)] : [192, 168];
    var ip = ((a[0] << 24) | (a[1] << 16) | (rnd(256) << 8) | (1 + rnd(254))) >>> 0;
    return { ip: ip, p: p, sol: calc(ip, p), ans: null };
  }
  var SETS = [
    { t: ["Metodologia di troubleshooting (Network+ 5.1)", "Troubleshooting methodology (Network+ 5.1)"], ref: "n:5.1", s: [["Identificare il problema", "Identify the problem"], ["Stabilire una teoria della causa probabile", "Establish a theory of probable cause"], ["Verificare la teoria", "Test the theory"], ["Definire un piano d'azione", "Establish a plan of action"], ["Implementare la soluzione o fare escalation", "Implement the solution or escalate"], ["Verificare la piena funzionalità", "Verify full system functionality"], ["Documentare", "Document findings"]] },
    { t: ["Fasi dell'incident response (Security+ 4.7)", "Incident response phases (Security+ 4.7)"], ref: "s:4.7", s: ["Preparation", "Detection", "Analysis", "Containment", "Eradication", "Recovery", "Lessons learned"] },
    { t: ["Modello OSI dal Layer 7 al Layer 1 (Network+ 1.1)", "OSI model from Layer 7 to Layer 1 (Network+ 1.1)"], ref: "n:1.1", s: ["Application", "Presentation", "Session", "Transport", "Network", "Data Link", "Physical"] },
    { t: ["Incapsulamento: dall'applicazione al cavo (Network+ 1.1)", "Encapsulation: from application to wire (Network+ 1.1)"], ref: "n:1.1", s: ["Data", "Segment", "Packet", "Frame", "Bits"] },
    { t: ["Processo DHCP (Network+ 3.4)", "DHCP process (Network+ 3.4)"], ref: "n:3.4", s: ["Discover", "Offer", "Request", "Acknowledge"] },
    { t: ["Scelta della rotta: cosa si valuta per primo (Network+ 2.1)", "Route selection: what is evaluated first (Network+ 2.1)"], ref: "n:2.1", s: [["Prefisso più lungo", "Longest prefix"], ["Administrative distance più bassa", "Lowest administrative distance"], ["Metrica più bassa", "Lowest metric"]] }
  ];
  var ps = { tab: "subnet", sub: newSubnet(), port: null, pStreak: 0, ord: null };
  var P = st.prac; P.sub = P.sub || { ok: 0, n: 0 }; P.port = P.port || { ok: 0, n: 0, best: 0 };
  function newPort() {
    var rows = EX.n.sheets[0].rows, r = rows[rnd(rows.length)], rev = Math.random() < .4, col = rev ? 0 : 1, opts = [r[col]];
    while (opts.length < 4) { var o = rows[rnd(rows.length)][col]; if (opts.indexOf(o) < 0) opts.push(o); }
    for (var i = 3; i > 0; i--) { var j = rnd(i + 1), x = opts[i]; opts[i] = opts[j]; opts[j] = x; }
    return { r: r, rev: rev, opts: opts, right: opts.indexOf(r[col]), ans: null };
  }
  function newOrder(skip) {
    var i; do { i = rnd(SETS.length); } while (i === skip);
    var n = SETS[i].s.length, ord = []; for (var k = 0; k < n; k++) ord.push(k);
    do { for (var a = n - 1; a > 0; a--) { var b = rnd(a + 1), x = ord[a]; ord[a] = ord[b]; ord[b] = x; } } while (ord.every(function (v, idx) { return v === idx; }));
    return { set: i, ord: ord, checked: false };
  }
  function field(id, lab, val, ok, sol) {
    return '<div class="field' + (ok == null ? "" : ok ? " fok" : " fbad") + '"><label for="' + id + '">' + lab + '</label><input id="' + id + '" inputmode="decimal" autocomplete="off" value="' + esc(val || "") + '"' + (ok == null ? "" : " readonly") + ">" + (ok === false ? '<small class="bad-t">' + t("sol") + ": <b class=\"mono\">" + sol + "</b></small>" : "") + "</div>";
  }
  function subnetHTML() {
    var s = ps.sub, a = s.ans, k = ["mask", "net", "bc", "hosts"], hb = 32 - s.p, oct = Math.min(3, Math.floor((s.p - 1) / 8)), mo = +s.sol.mask.split(".")[oct];
    var h = '<section class="panel drill"><p class="eyebrow">' + t("sQ") + '</p><p class="bigq mono">' + ipStr(s.ip) + " /" + s.p + '</p><form id="subf" class="setup">' + k.map(function (key) { return field("sf-" + key, t(key), a ? a[key] : "", a ? a[key] === String(s.sol[key]) : null, s.sol[key]); }).join("") +
      (a ? '<div class="how"><h3>' + t("how") + "</h3><p>" + t("how1") + ' <b class="mono">' + s.sol.mask + "</b> " + t("how2") + " " + hb + " " + t("how3") + " " + mo + " = <b>" + (256 - mo) + "</b>. " + t("how4") + hb + " - 2 = <b>" + s.sol.hosts + '</b>.</p></div><button class="btn primary big" type="button" data-pnext="sub">' + t("next") + "</button>" : '<button class="btn primary big" type="submit">' + t("check") + "</button>") + "</form>";
    return h + '<p class="sm muted">' + t("score") + ": " + P.sub.ok + "/" + P.sub.n + "</p></section>";
  }
  function portsHTML() {
    if (!ps.port) ps.port = newPort(); var q = ps.port, done = q.ans !== null;
    var h = '<section class="panel drill"><p class="bigq">' + (q.rev ? t("pq2") + ' <b class="mono">' + q.r[1] + "</b>?" : t("pq1") + ' <b class="mono">' + q.r[0] + "</b>" + t("pq1b")) + '</p><p class="sm muted">' + (q.rev ? "" : esc(L(q.r[2]))) + '</p><div class="opts two">' + q.opts.map(function (o, i) {
      var cls = "opt"; if (done) { if (i === q.right) cls += " ok"; else if (i === q.ans) cls += " bad"; }
      return '<button class="' + cls + ' mono" data-popt="' + i + '"' + (done ? " disabled" : "") + "><span>" + esc(o) + "</span></button>";
    }).join("") + "</div>";
    if (done) h += '<div class="fb ' + (q.ans === q.right ? "ok" : "bad") + '"><p><b>' + (q.ans === q.right ? t("right") : t("wrong")) + '</b> <span class="mono">' + q.r[0] + " = " + q.r[1] + "</span> · " + esc(L(q.r[2])) + '</p></div><button class="btn primary big" data-pnext="port">' + t("next") + "</button>";
    return h + '<p class="sm muted">' + t("score") + ": " + P.port.ok + "/" + P.port.n + " · " + t("streak") + ": " + ps.pStreak + " (" + t("best") + " " + P.port.best + ")</p></section>";
  }
  function orderHTML() {
    if (!ps.ord) ps.ord = newOrder(-1); var o = ps.ord, set = SETS[o.set], allOk = o.ord.every(function (v, i) { return v === i; });
    var h = '<section class="panel drill"><p class="eyebrow">' + esc(L(set.t)) + '</p><p class="sm muted">' + t("oLead") + '</p><ol class="olist">' + o.ord.map(function (v, i) {
      return '<li class="' + (o.checked ? (v === i ? "ok" : "bad") : "") + '"><span class="num">' + (i + 1) + '</span><span class="otxt">' + esc(L(set.s[v])) + '</span><span class="arr"><button data-pmove="' + i + ':-1" aria-label="' + t("up") + '"' + (i === 0 ? " disabled" : "") + '>▲</button><button data-pmove="' + i + ':1" aria-label="' + t("down") + '"' + (i === o.ord.length - 1 ? " disabled" : "") + ">▼</button></span></li>";
    }).join("") + "</ol>";
    if (o.checked) h += '<div class="fb ' + (allOk ? "ok" : "bad") + '"><p><b>' + (allOk ? t("allOk") : t("someBad")) + "</b></p></div>";
    h += '<div class="row"><button class="btn primary" data-pcheck="1">' + t("check") + "</button>" + (o.checked && !allOk ? '<button class="btn" data-pshow="1">' + t("show") + "</button>" : "") + '<button class="btn" data-pnext="ord">' + t("other") + "</button>" + Hub.refChip(set.ref) + "</div></section>";
    return h;
  }
  function html() {
    return '<div class="pracview"><header class="hero slim"><h1>' + t("title") + '</h1><p class="lead">' + t("lead") + '</p></header><div class="seg2 wrap" role="tablist">' + [["subnet", t("subnet")], ["ports", t("ports")], ["order", t("order")]].concat((Hub.drills || []).map(function (d) { return [d.id, L(d.label)]; })).map(function (m) { return '<button role="tab" aria-selected="' + (ps.tab === m[0]) + '" data-ptab="' + m[0] + '">' + m[1] + "</button>"; }).join("") + "</div>" + (ps.tab === "subnet" ? subnetHTML() : ps.tab === "ports" ? portsHTML() : ps.tab === "order" ? orderHTML() : drill().html()) + "</div>";
  }
  function drill() { return (Hub.drills || []).filter(function (d) { return d.id === ps.tab; })[0]; }
  function mount(root) {
    var v = root.querySelector(".pracview"); if (drill()) drill().mount(v);
    v.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ptab],[data-popt],[data-pnext],[data-pmove],[data-pcheck],[data-pshow]"); if (!b) return; var d = b.dataset;
      if (d.ptab) ps.tab = d.ptab;
      else if (d.popt != null) { var q = ps.port; if (q.ans !== null) return; q.ans = +d.popt; P.port.n++; if (q.ans === q.right) { P.port.ok++; ps.pStreak++; P.port.best = Math.max(P.port.best, ps.pStreak); } else ps.pStreak = 0; Hub.save(); }
      else if (d.pnext === "sub") ps.sub = newSubnet(); else if (d.pnext === "port") ps.port = newPort(); else if (d.pnext === "ord") ps.ord = newOrder(ps.ord.set);
      else if (d.pmove) { var m = d.pmove.split(":"), i = +m[0], j = i + (+m[1]), o = ps.ord.ord, x = o[i]; o[i] = o[j]; o[j] = x; ps.ord.checked = false; }
      else if (d.pcheck) ps.ord.checked = true;
      else if (d.pshow) { ps.ord.ord.sort(function (a, c) { return a - c; }); ps.ord.checked = true; }
      Hub.render();
    });
    v.addEventListener("submit", function (e) {
      if (e.target.id !== "subf") return; e.preventDefault(); var s = ps.sub, a = {};
      ["mask", "net", "bc", "hosts"].forEach(function (k) { a[k] = root.querySelector("#sf-" + k).value.trim().replace(/\s+/g, ""); });
      s.ans = a; P.sub.n++; if (["mask", "net", "bc", "hosts"].every(function (k) { return a[k] === String(s.sol[k]); })) P.sub.ok++; Hub.save(); Hub.render();
    });
  }
  Hub.views.practice = { html: html, mount: mount };

  /* ---- global search ---- */
  var sq = "";
  function mark(text, q) { var i = text.toLowerCase().indexOf(q); if (i < 0) return esc(text.length > 110 ? text.slice(0, 108) + "…" : text); var a = Math.max(0, i - 40), b = Math.min(text.length, i + q.length + 60); return (a ? "…" : "") + esc(text.slice(a, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length, b)) + (b < text.length ? "…" : ""); }
  function results() {
    var q = sq.trim().toLowerCase(); if (q.length < 2) return "";
    var objs = [], cons = [], rows = [];
    ["n", "s"].forEach(function (k) { EX[k].domains.forEach(function (d) { d.objs.forEach(function (o) {
      var title = o.n + " " + L(o.t), hit = title.toLowerCase().indexOf(q) >= 0 ? L(o.t) : null;
      if (!hit) o.p.some(function (p) { var s = L(p); if (s.toLowerCase().indexOf(q) >= 0) { hit = s; return true; } return (p.join ? p.join(" ") : p).toLowerCase().indexOf(q) >= 0 && (hit = s, true); });
      if (hit) objs.push('<button class="res ex-' + k + '" data-ref="' + k + ":" + o.n + '"><b>' + EX[k].name + " " + o.n + " · " + esc(L(o.t)) + "</b><span>" + mark(hit, q) + "</span></button>");
    }); }); });
    DATA.concepts.forEach(function (c) { if ((c[0] + " " + c[1].join(" ")).toLowerCase().indexOf(q) >= 0) cons.push('<button class="res" data-node="' + esc(c[0]) + '"><b class="mono">' + mark(c[0], q) + "</b><span>" + mark(L(c[1]), q) + "</span></button>"); });
    ["n", "s"].forEach(function (k) { EX[k].sheets.forEach(function (sh) { sh.rows.forEach(function (r) { var line = r.map(function (c) { return L(c); }).join(" · "); if (line.toLowerCase().indexOf(q) >= 0) rows.push('<button class="res ex-' + k + '" data-dom="' + k + ':sheets"><b>' + EX[k].name + " · " + esc(L(sh.t)) + '</b><span class="mono">' + mark(line, q) + "</span></button>"); }); }); });
    function group(title, list, max) { return list.length ? "<h3>" + title + " (" + list.length + ")</h3>" + list.slice(0, max).join("") + (list.length > max ? '<p class="sm muted">+ ' + (list.length - max) + " " + t("rMore") + "</p>" : "") : ""; }
    return group(t("rCon"), cons, 10) + group(t("rObj"), objs, 14) + group(t("rSheet"), rows, 8) || '<p class="empty">' + t("rNone") + "</p>";
  }
  Hub.views.search = {
    html: function () { return '<div class="searchview"><header class="hero slim"><h1>' + t("sTitle") + '</h1><p class="lead">' + t("sLead") + '</p></header><div class="searchbox"><label class="vh" for="gs">' + t("sTitle") + '</label><input id="gs" type="search" placeholder="' + esc(t("sPh")) + '" value="' + esc(sq) + '"></div><div id="gres" class="reslist">' + results() + "</div></div>"; },
    mount: function (root) { var i = root.querySelector("#gs"); i.addEventListener("input", function () { sq = i.value; root.querySelector("#gres").innerHTML = results(); }); if (!sq) setTimeout(function () { try { i.focus({ preventScroll: true }); } catch (e) {} }, 60); }
  };
});
