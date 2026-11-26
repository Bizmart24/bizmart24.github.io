HubMods.push(function (Hub) {
  "use strict";
  var X = Hub.mapx, gs = X.gs, L = Hub.L, esc = Hub.esc, EX = Hub.EX, C = DATA.concepts, st = Hub.st, conBy = {};
  C.forEach(function (c) { conBy[c[0]] = c; });
  st.mapPref = st.mapPref || {}; var P = st.mapPref; P.layout = P.layout || "guide"; P.style = P.style || "color";
  var T = {
    title: ["Mappe concettuali", "Concept maps"], lead: ["Scegli la disposizione e lo stile che preferisci: la posizione in cui ti trovi resta la stessa passando da una all'altra.", "Pick the layout and style you prefer: your position stays the same when you switch between them."],
    map: ["Mappa", "Map"], links: ["Collegamenti", "Connections"], layout: ["Disposizione", "Layout"], style: ["Stile", "Style"],
    guide: ["Guidata", "Guided"], mind: ["Mentale", "Mind map"], tree: ["Albero", "Tree"], radial: ["Raggiera", "Radial"], cols: ["Colonne", "Columns"],
    color: ["Colori", "Colour"], paper: ["Carta", "Paper"], chalk: ["Lavagna", "Chalkboard"], blue: ["Progetto", "Blueprint"],
    hintPZ: ["Tocca un nodo per aprirlo o chiuderlo. Trascina per spostarti, pizzica o usa + e − per lo zoom.", "Tap a node to open or close it. Drag to move, pinch or use + and − to zoom."],
    hintCols: ["Scegli un dominio, poi un obiettivo: le colonne scorrono verso destra.", "Pick a domain, then an objective: the columns scroll to the right."],
    expand: ["Apri tutto", "Expand all"], collapse: ["Chiudi tutto", "Collapse all"], fit: ["Vista intera", "Fit view"],
    doms: ["Domini", "Domains"], objs: ["Obiettivi", "Objectives"], cons: ["Concetti", "Concepts"], detail: ["Dettagli", "Details"], pickDom: ["Scegli un dominio.", "Pick a domain."], pickObj: ["Scegli un obiettivo.", "Pick an objective."], noCon: ["Nessun concetto collegato.", "No linked concepts."],
    open: ["Apri la sezione completa", "Open the full section"], quiz: ["Quiz sul dominio", "Domain quiz"], review: ["Vai alla sezione", "Go to the section"], seeLinks: ["Vedi i collegamenti", "See connections"], openEx: ["Apri", "Open"],
    ofExam: ["dell'esame", "of the exam"], selHint: ["Tocca un nodo per vedere qui i dettagli.", "Tap a node to see its details here."], inObjs: ["Compare in", "Appears in"], keyc: ["Concetti chiave", "Key concepts"], pre: ["Prerequisiti", "Prerequisites"]
  };
  function t(k) { return L(T[k]); }
  var exp = {}, sel = null, lastP = null, cams = {}, pz = null;
  function k0() { return gs.path[0] || "n"; }
  function cut(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function wrap(s, max, lines) {
    var out = [], cur = ""; s.split(" ").forEach(function (w) { if ((cur + " " + w).trim().length <= max) cur = (cur + " " + w).trim(); else { if (cur) out.push(cur); cur = w; } }); if (cur) out.push(cur);
    if (out.length > lines) { out = out.slice(0, lines); out[lines - 1] = cut(out[lines - 1] + "…", max); } return out.map(function (x) { return cut(x, max + 2); });
  }
  function build(k) {
    var ex = EX[k], root = { id: "ex:" + k, type: "ex", k: k, label: ex.name, sub: ex.code, ch: [] };
    ex.domains.forEach(function (d) {
      var dn = { id: "dom:" + k + ":" + d.num, type: "dom", k: k, d: d.num, label: L(d.t), w: d.w, ch: [], par: root };
      if (ex.lite) d.pre.forEach(function (r) { var f = Hub.findObj(r); dn.ch.push({ id: "pre:" + d.num + ":" + r, type: "pre", k: f.ex.key, d: d.num, ref: r, num: f.ex.name.charAt(0) + " " + f.o.n, label: L(f.o.t), ch: [], par: dn }); });
      else d.objs.forEach(function (o) {
        var ref = k + ":" + o.n, on = { id: "obj:" + ref, type: "obj", k: k, d: d.num, ref: ref, num: o.n, label: L(o.t), ch: [], par: dn, done: !!st.done[Hub.oid(k, o.n)] };
        X.consOf(ref).forEach(function (c) { on.ch.push({ id: "con:" + ref + ":" + c[0], type: "con", k: k, d: d.num, key: c[0], label: c[0], shared: X.isShared(c), ch: [], par: on }); });
        dn.ch.push(on);
      });
      root.ch.push(dn);
    });
    return root;
  }
  function find(n, id) { if (n.id === id) return n; for (var i = 0; i < n.ch.length; i++) { var r = find(n.ch[i], id); if (r) return r; } return null; }
  function sync() {
    var pid = gs.path.join("/"); if (pid === lastP) return; lastP = pid; var k = k0();
    if (gs.path[1]) exp["dom:" + k + ":" + gs.path[1]] = true; if (gs.path[2]) exp["obj:" + k + ":" + gs.path[2]] = true;
    sel = gs.path[2] ? "obj:" + k + ":" + gs.path[2] : gs.path[1] ? "dom:" + k + ":" + gs.path[1] : "ex:" + k;
  }
  function tap(id, single) {
    var k = k0(), n = find(build(k), id); if (!n) return;
    if (n.type === "ex") gs.path = [k];
    else if (n.type === "dom") { if (single) gs.path = (sel === id && gs.path.length === 2) ? [k] : [k, n.d]; else { if (exp[id] && sel === id) delete exp[id]; else exp[id] = true; gs.path = [k, n.d]; } }
    else if (n.type === "obj") { if (!single) { if (exp[id] && sel === id) delete exp[id]; else exp[id] = true; } gs.path = [k, n.d, n.num]; }
    sel = (single && n.type === "dom" && gs.path.length === 1) ? "ex:" + k : id; lastP = gs.path.join("/");
  }
  function vis(n) { return n.type === "ex" ? n.ch : exp[n.id] ? n.ch : []; }

  /* ---- detail panel (in page flow, never over the map) ---- */
  function detail(root) {
    var n = sel && find(root, sel), h = '<section class="mdet d' + ((n && n.d) || 1) + " ex-" + root.k + '" aria-live="polite">';
    if (!n) return h + '<p class="muted sm">' + t("selHint") + "</p></section>";
    if (n.type === "ex") { var ex = EX[n.k]; h += '<p class="eyebrow">' + ex.code + " · " + ex.ver + "</p><h2>CompTIA " + ex.name + '</h2><p class="sm">' + esc(L(ex.exp)) + '</p><div class="row"><button class="btn sm primary" data-go="' + ex.hash + '">' + t("openEx") + " " + ex.name + " →</button></div>"; }
    else if (n.type === "dom") {
      var d = EX[n.k].domains[n.d - 1]; h += '<p class="eyebrow">' + EX[n.k].name + " · " + d.w + "% " + t("ofExam") + "</p><h2>" + d.num + ". " + esc(L(d.t)) + "</h2>" + (EX[n.k].lite ? "<p>" + esc(L(d.desc)) + "</p><h3>" + t("pre") + '</h3><div class="chips">' + d.pre.map(Hub.refChip).join("") + "</div>" : X.prog(n.k, n.d) + '<div class="row"><button class="btn sm primary" data-dom="' + n.k + ":" + n.d + '">' + t("review") + ' →</button><button class="btn sm" data-quiz="' + n.k + '" data-qdom="' + n.d + '">' + t("quiz") + "</button></div>");
    } else if (n.type === "obj" || n.type === "pre") {
      var r = Hub.findObj(n.ref); h += '<p class="eyebrow ex-' + r.ex.key + '">' + r.ex.name + " · " + r.o.n + "</p><h2>" + esc(L(r.o.t)) + "</h2><ul>" + r.o.p.slice(0, 3).map(function (p) { return "<li>" + esc(L(p)) + "</li>"; }).join("") + "</ul>" +
        (n.ch.length ? "<h3>" + t("keyc") + '</h3><div class="chips">' + n.ch.map(function (c) { return '<button class="chip soft" data-n="' + esc(c.id) + '">' + esc(c.label) + "</button>"; }).join("") + "</div>" : "") +
        '<div class="row"><button class="btn sm primary ex-' + r.ex.key + '" data-ref="' + n.ref + '">' + t("open") + ' →</button><button class="btn sm" data-quiz="' + r.ex.key + '" data-qdom="' + r.d.num + '">' + t("quiz") + "</button></div>";
    } else { var c = conBy[n.key]; h += '<p class="eyebrow">' + t("keyc") + '</p><h2 lang="en">' + esc(c[0]) + "</h2><p>" + esc(L(c[1])) + "</p><h3>" + t("inObjs") + '</h3><div class="chips">' + c[2].map(Hub.refChip).join("") + '</div><div class="row"><button class="btn sm primary" data-c="' + esc(c[0]) + '">' + t("seeLinks") + " →</button></div>"; }
    return h + "</section>";
  }

  /* ---- tree (outline) ---- */
  function treeHTML(root) {
    function node(n) {
      var kids = vis(n), has = n.ch.length > 0, open = n.type === "ex" || !!exp[n.id];
      var lab = n.type === "ex" ? "<b>" + esc(n.label) + "</b><small>" + n.sub + "</small>" : n.type === "dom" ? '<i class="bd">' + n.d + "</i><b>" + esc(n.label) + "</b><small>" + n.w + "%</small>" : n.type === "con" ? "<b>" + esc(n.label) + "</b>" : '<i class="bn">' + n.num + "</i><b>" + esc(n.label) + "</b>" + (n.done ? '<small class="ok-t">✓</small>' : "");
      return '<li><button class="tn tn-' + n.type + " d" + (n.d || 1) + (sel === n.id ? " sel" : "") + (n.shared ? " shared" : "") + '" data-n="' + esc(n.id) + '"' + (has && n.type !== "ex" ? ' aria-expanded="' + open + '"' : "") + ">" + (has && n.type !== "ex" ? '<span class="car">' + (open ? "−" : "+") + "</span>" : "") + lab + "</button>" + (kids.length ? "<ul>" + kids.map(node).join("") + "</ul>" : "") + "</li>";
    }
    return '<div class="row"><button class="btn sm" data-xall="1">' + t("expand") + '</button><button class="btn sm" data-xall="0">' + t("collapse") + '</button></div><div class="mcanvas otreewrap ex-' + root.k + '"><ul class="otree">' + node(root) + "</ul></div>";
  }

  /* ---- columns ---- */
  function colsHTML(root) {
    var dn = gs.path[1] && find(root, "dom:" + root.k + ":" + gs.path[1]), on = gs.path[2] && find(root, "obj:" + root.k + ":" + gs.path[2]);
    function col(title, items, empty, i) { return '<section class="col" data-col="' + i + '"><h3>' + title + "</h3>" + (items.length ? items.join("") : '<p class="muted sm">' + empty + "</p>") + "</section>"; }
    function item(n, cur, inner) { return '<button class="ci ci-' + n.type + " d" + (n.d || 1) + (cur ? " sel" : "") + (n.shared ? " shared" : "") + '" data-n="' + esc(n.id) + '">' + inner + '<span class="chev">›</span></button>'; }
    return '<div class="mcanvas cols ex-' + root.k + '">' +
      col(t("doms"), root.ch.map(function (d) { return item(d, dn === d, '<i class="bd">' + d.d + "</i><span><b>" + esc(d.label) + "</b><small>" + d.w + "% " + t("ofExam") + "</small></span>"); }), "", 0) +
      col(dn && EX[root.k].lite ? t("pre") : t("objs"), dn ? dn.ch.map(function (o) { return item(o, on === o || sel === o.id, '<i class="bn">' + o.num + "</i><span><b>" + esc(o.label) + "</b>" + (o.done ? '<small class="ok-t">✓</small>' : "") + "</span>"); }) : [], t("pickDom"), 1) +
      col(t("cons"), on ? on.ch.map(function (c) { return item(c, sel === c.id, "<span><b>" + esc(c.label) + "</b><small>" + esc(cut(L(conBy[c.key][1]), 70)) + "</small></span>"); }) : [], on ? t("noCon") : t("pickObj"), 2) + "</div>";
  }

  /* ---- mind map (SVG) ---- */
  var SZ = { dom: [158, 48, 62], obj: [182, 54, 62], pre: [182, 54, 62], con: [0, 26, 32] };
  function mindSVG(root) {
    var b = { x0: -70, x1: 70, y0: -34, y1: 34 }, links = "", nodes = "", fb = null, COLX = { dom: 110, obj: 322, pre: 322, con: 554 };
    function w(n) { return n.type === "con" ? Math.min(190, n.label.length * 6.5 + 22) : SZ[n.type][0]; }
    function span(n) { var k = vis(n), s = 0; k.forEach(function (c) { s += span(c); }); return Math.max(SZ[n.type][2], s); }
    function place(n, s, y0, px, py, pw) {
      var sp = span(n), ww = w(n), hh = SZ[n.type][1], x = s * COLX[n.type], y = y0 + sp / 2, xa = s > 0 ? x : x - ww, far = x + s * ww, kids = vis(n), tot = 0;
      n._b = { x0: xa, x1: xa + ww, y0: y - hh / 2, y1: y + hh / 2 };
      var mx = (px + x) / 2; links += '<path class="ml d' + n.d + " l-" + n.type + '" d="M' + px + " " + py + "C" + mx + " " + py + " " + mx + " " + y + " " + x + " " + y + '"/>';
      var inner = "";
      if (n.type === "dom") { var ls = wrap(n.label, 17, 2); inner = '<circle class="bdc" cx="22" cy="' + hh / 2 + '" r="14"/><text class="bdt" x="22" y="' + (hh / 2 + 5) + '">' + n.d + "</text>" + ls.map(function (l, i) { return '<text class="mt" x="44" y="' + (hh / 2 + (ls.length === 1 ? 4 : i * 14 - 3)) + '">' + esc(l) + "</text>"; }).join(""); }
      else if (n.type === "con") inner = '<text class="mt c" x="' + ww / 2 + '" y="17">' + esc(cut(n.label, 27)) + "</text>";
      else { var lo = wrap(n.label, 27, 2); inner = '<text class="mnum" x="10" y="17">' + n.num + (n.done ? " ✓" : "") + "</text>" + lo.map(function (l, i) { return '<text class="mt s" x="10" y="' + (32 + i * 13) + '">' + esc(l) + "</text>"; }).join(""); }
      var has = n.ch.length > 0, ex2 = !!exp[n.id];
      nodes += '<g class="mn mn-' + n.type + " d" + n.d + (sel === n.id ? " sel" : "") + (n.shared ? " shared" : "") + (n.done ? " done" : "") + '" data-n="' + esc(n.id) + '" transform="translate(' + xa + "," + (y - hh / 2) + ')"><rect width="' + ww + '" height="' + hh + '" rx="' + (n.type === "con" ? 13 : 10) + '"/>' + inner + (has ? '<g class="tg" transform="translate(' + (s > 0 ? ww : 0) + "," + hh / 2 + ')"><circle r="9"/><text y="4">' + (ex2 ? "−" : "+") + "</text></g>" : "") + "</g>";
      b.x0 = Math.min(b.x0, xa - 12); b.x1 = Math.max(b.x1, xa + ww + 12); b.y0 = Math.min(b.y0, y - hh / 2 - 8); b.y1 = Math.max(b.y1, y + hh / 2 + 8);
      kids.forEach(function (c) { tot += span(c); }); var cy = y - tot / 2;
      kids.forEach(function (c) { place(c, s, cy, far, y, ww); cy += span(c); n._b.x0 = Math.min(n._b.x0, c._b.x0); n._b.x1 = Math.max(n._b.x1, c._b.x1); n._b.y0 = Math.min(n._b.y0, c._b.y0); n._b.y1 = Math.max(n._b.y1, c._b.y1); });
      if (sel === n.id) fb = { x0: Math.min(n._b.x0, s > 0 ? px - pw : n._b.x0) - 14, x1: Math.max(n._b.x1, s < 0 ? px + pw : n._b.x1) + 14, y0: Math.min(n._b.y0, py - 30) - 14, y1: Math.max(n._b.y1, py + 30) + 14 };
    }
    [[root.ch.slice(0, 3), 1], [root.ch.slice(3), -1]].forEach(function (g) { var tot = 0; g[0].forEach(function (d) { tot += span(d); }); var y = -tot / 2; g[0].forEach(function (d) { place(d, g[1], y, g[1] * 62, 0, 128); y += span(d); }); });
    nodes += '<g class="mn mn-ex ex-' + root.k + (sel === root.id ? " sel" : "") + '" data-n="' + root.id + '" transform="translate(-66,-30)"><rect width="132" height="60" rx="30"/><text class="mt c ext" x="66" y="27">' + esc(root.label) + '</text><text class="mt c exs" x="66" y="44">' + root.sub + "</text></g>";
    return { svg: '<g class="mlinks">' + links + "</g>" + nodes, box: b, focus: fb };
  }

  /* ---- radial (SVG) ---- */
  function radialSVG(root) {
    var tot = 0, a = -Math.PI / 2, h = "", out = 232, fb = null;
    function pt(r, an) { return (r * Math.cos(an)).toFixed(1) + " " + (r * Math.sin(an)).toFixed(1); }
    function arc(r0, r1, a0, a1) { var big = a1 - a0 > Math.PI ? 1 : 0; return "M" + pt(r1, a0) + "A" + r1 + " " + r1 + " 0 " + big + " 1 " + pt(r1, a1) + "L" + pt(r0, a1) + "A" + r0 + " " + r0 + " 0 " + big + " 0 " + pt(r0, a0) + "Z"; }
    root.ch.forEach(function (d) { tot += Math.max(1, d.ch.length); });
    root.ch.forEach(function (d) {
      var sp = 2 * Math.PI * Math.max(1, d.ch.length) / tot, mid = a + sp / 2, on = gs.path[1] === d.d;
      h += '<g class="rw d' + d.d + (on ? " on" : "") + (sel === d.id ? " sel" : "") + '" data-n="' + d.id + '"><path d="' + arc(66, 150, a + .012, a + sp - .012) + '"/><text class="rnum" x="' + (108 * Math.cos(mid)).toFixed(1) + '" y="' + (108 * Math.sin(mid) + 2).toFixed(1) + '">' + d.d + '</text><text class="rpct" x="' + (108 * Math.cos(mid)).toFixed(1) + '" y="' + (108 * Math.sin(mid) + 17).toFixed(1) + '">' + d.w + "%</text></g>";
      d.ch.forEach(function (o, j) {
        var a0 = a + sp * j / d.ch.length, a1 = a + sp * (j + 1) / d.ch.length, m = (a0 + a1) / 2, cur = sel === o.id || (gs.path[2] === o.num && gs.path[1] === d.d && root.k === o.k);
        h += '<g class="rc d' + d.d + (cur ? " sel" : "") + (o.done ? " done" : "") + '" data-n="' + esc(o.id) + '"><path d="' + arc(155, 216, a0 + .008, a1 - .008) + '"/><text x="' + (186 * Math.cos(m)).toFixed(1) + '" y="' + (186 * Math.sin(m) + 4).toFixed(1) + '">' + esc(o.num) + "</text></g>";
        if (cur && o.ch.length) {
          var step = Math.min(.125, 1.5 / o.ch.length); out = 420; fb = { x0: 200 * Math.cos(m) - 215, x1: 200 * Math.cos(m) + 215, y0: 200 * Math.sin(m) - 235, y1: 200 * Math.sin(m) + 235 };
          o.ch.forEach(function (c, i) {
            var an = m + (i - (o.ch.length - 1) / 2) * step, flip = Math.cos(an) < 0, deg = an * 180 / Math.PI + (flip ? 180 : 0), x = 236 * Math.cos(an), y = 236 * Math.sin(an);
            h += '<g class="rs d' + d.d + (sel === c.id ? " sel" : "") + '" data-n="' + esc(c.id) + '"><line x1="' + (218 * Math.cos(an)).toFixed(1) + '" y1="' + (218 * Math.sin(an)).toFixed(1) + '" x2="' + (230 * Math.cos(an)).toFixed(1) + '" y2="' + (230 * Math.sin(an)).toFixed(1) + '"/><text transform="translate(' + x.toFixed(1) + "," + y.toFixed(1) + ") rotate(" + deg.toFixed(1) + ')" style="text-anchor:' + (flip ? "end" : "start") + '" y="4">' + esc(cut(c.label, 26)) + "</text></g>";
          });
        }
      });
      a += sp;
    });
    h += '<g class="mn mn-ex ex-' + root.k + (sel === root.id ? " sel" : "") + '" data-n="' + root.id + '"><circle r="60"/><text class="mt c ext" y="-2">' + esc(root.label) + '</text><text class="mt c exs" y="15">' + root.sub + "</text></g>";
    return { svg: h, box: { x0: -out, x1: out, y0: -out, y1: out }, focus: fb };
  }
  function legend(root) { return '<div class="mlegend">' + root.ch.map(function (d) { return '<button class="lg d' + d.d + (gs.path[1] === d.d ? " sel" : "") + '" data-n="' + d.id + '"><i></i>' + d.d + ". " + esc(d.label) + "</button>"; }).join("") + "</div>"; }

  function seg(attr, list, cur, cls) { return '<div class="seg2 ' + cls + '" role="tablist">' + list.map(function (m) { return '<button role="tab" aria-selected="' + (cur === m) + '" ' + attr + '="' + m + '">' + t(m) + "</button>"; }).join("") + "</div>"; }
  var view = null;
  function html() {
    var mode = gs.mode === "links" ? "links" : "map", lay = P.layout, k = k0();
    var h = '<div class="mapsview"><header class="hero slim"><h1>' + t("title") + '</h1></header><div class="seg2" role="tablist"><button role="tab" aria-selected="' + (mode === "map") + '" data-mmode="guide">' + t("map") + '</button><button role="tab" aria-selected="' + (mode === "links") + '" data-mmode="links">' + t("links") + "</button></div>";
    h += '<div class="mopts">' + (mode === "map" ? '<div class="field"><span class="flabel">' + t("layout") + "</span>" + seg("data-lay", ["guide", "mind", "tree", "radial", "cols"], lay, "wrap small") + "</div>" : "") + '<div class="field"><span class="flabel">' + t("style") + "</span>" + seg("data-sty", ["color", "paper", "chalk", "blue"], P.style, "wrap small") + "</div></div>";
    h += '<div class="mstage ms-' + P.style + '">'; view = null;
    if (mode === "links") h += X.linksHTML();
    else if (lay === "guide") h += X.guideHTML();
    else {
      sync(); var root = build(k);
      h += '<div class="tabs" role="tablist">' + ["n", "s", "p"].map(function (x) { return '<button role="tab" class="tab ex-' + x + '" aria-selected="' + (x === k) + '" data-xex="' + x + '">' + EX[x].name + "</button>"; }).join("") + "</div>";
      if (lay === "tree") h += treeHTML(root);
      else if (lay === "cols") h += '<p class="fine">' + t("hintCols") + "</p>" + colsHTML(root);
      else {
        view = lay === "mind" ? mindSVG(root) : radialSVG(root);
        h += '<div class="mapbox mcanvas ex-' + k + '"><svg class="mapsvg mm-' + lay + '" role="img" aria-label="' + esc(t("title")) + '"><defs><filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="1" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter></defs><g class="vp">' + view.svg + '</g></svg><div class="mctl"><button data-z="1.35" aria-label="Zoom in">+</button><button data-z="0.74" aria-label="Zoom out">−</button><button data-z="0" aria-label="' + t("fit") + '">⤢</button></div></div><p class="fine">' + t("hintPZ") + "</p>" + (lay === "radial" ? legend(root) : "");
      }
      h += "</div>" + detail(root) + '<div class="mstage-end">';
    }
    return h + "</div></div>";
  }
  function panzoom(svg, vp, key, box, focus) {
    var rc = svg.getBoundingClientRect(), W = rc.width || 340, H = rc.height || 460, cam = cams[key] ? { x: cams[key].x, y: cams[key].y, k: cams[key].k } : null, anim = 0, pts = {}, drag = null;
    function apply() { vp.setAttribute("transform", "translate(" + cam.x.toFixed(1) + "," + cam.y.toFixed(1) + ") scale(" + cam.k.toFixed(4) + ")"); cams[key] = cam; }
    function target(b, maxK) { var k = Math.min(W / (b.x1 - b.x0), H / (b.y1 - b.y0), maxK || 1.15); return { x: W / 2 - (b.x0 + b.x1) / 2 * k, y: H / 2 - (b.y0 + b.y1) / 2 * k, k: k }; }
    function fly(tg) {
      cancelAnimationFrame(anim); if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { cam = tg; apply(); return; }
      var s = { x: cam.x, y: cam.y, k: cam.k }, t0 = null;
      (function step(ts) { if (t0 === null) t0 = ts; var p = Math.min(1, (ts - t0) / 480), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; cam = { x: s.x + (tg.x - s.x) * e, y: s.y + (tg.y - s.y) * e, k: s.k + (tg.k - s.k) * e }; apply(); if (p < 1) anim = requestAnimationFrame(step); })(performance.now());
    }
    function zoomAt(sx, sy, f) { var k2 = Math.max(.15, Math.min(3, cam.k * f)); cam = { x: sx - (sx - cam.x) * k2 / cam.k, y: sy - (sy - cam.y) * k2 / cam.k, k: k2 }; apply(); }
    if (!cam) { cam = target(focus || box); apply(); } else { apply(); fly(target(focus || box)); }
    svg.addEventListener("pointerdown", function (e) { pts[e.pointerId] = { x: e.clientX, y: e.clientY }; var nd = e.target.closest ? e.target.closest("[data-n]") : null; if (Object.keys(pts).length === 1) drag = { dist: 0, id: nd ? nd.getAttribute("data-n") : null }; else if (drag) drag.dist = 99; try { svg.setPointerCapture(e.pointerId); } catch (x) {} cancelAnimationFrame(anim); });
    svg.addEventListener("pointermove", function (e) {
      var p = pts[e.pointerId]; if (!p) return; var ids = Object.keys(pts), r = svg.getBoundingClientRect();
      if (ids.length === 1) { var dx = e.clientX - p.x, dy = e.clientY - p.y; if (drag) drag.dist += Math.abs(dx) + Math.abs(dy); if (!drag || drag.dist > 8) { cam.x += dx; cam.y += dy; apply(); } }
      else if (ids.length === 2) { var o = pts[ids[0] == e.pointerId ? ids[1] : ids[0]], d0 = Math.hypot(p.x - o.x, p.y - o.y) || 1, d1 = Math.hypot(e.clientX - o.x, e.clientY - o.y) || 1; zoomAt((e.clientX + o.x) / 2 - r.left, (e.clientY + o.y) / 2 - r.top, d1 / d0); }
      p.x = e.clientX; p.y = e.clientY;
    });
    function up(e) { if (!pts[e.pointerId]) return; delete pts[e.pointerId]; if (!Object.keys(pts).length) { var dg = drag; drag = null; if (dg && e.type === "pointerup" && dg.dist <= 8 && dg.id) { tap(dg.id, P.layout === "radial"); Hub.render(); } } }
    svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
    svg.addEventListener("wheel", function (e) { e.preventDefault(); var r = svg.getBoundingClientRect(); zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.15 : .87); }, { passive: false });
    return { zoom: function (f) { if (f) zoomAt(W / 2, H / 2, f); else fly(target(box)); } };
  }
  function mount(root) {
    X.mount0(root); pz = null;
    var v = root.querySelector(".mapsview"), svg = v.querySelector(".mapsvg");
    if (svg && view) pz = panzoom(svg, svg.querySelector(".vp"), P.layout + ":" + k0(), view.box, view.focus);
    var cols = v.querySelector(".cols");
    if (cols) { var idx = sel && sel.indexOf("con:") === 0 ? 2 : Math.max(0, gs.path.length - 1), c = cols.querySelector('[data-col="' + Math.min(2, idx) + '"]'); if (c) cols.scrollLeft = Math.max(0, c.offsetLeft - 14); }
    v.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lay],[data-sty],[data-xex],[data-xall],[data-z],[data-n]"); if (!b) return; var d = b.dataset;
      if (d.z != null) { if (pz) pz.zoom(+d.z); return; }
      if (d.lay) { P.layout = d.lay; if (!gs.path.length) gs.path = ["n"]; lastP = null; Hub.save(); }
      else if (d.sty) { P.style = d.sty; Hub.save(); }
      else if (d.xex) { gs.path = [d.xex]; exp = {}; lastP = null; }
      else if (d.xall) { exp = {}; if (d.xall === "1") { var r = build(k0()); r.ch.forEach(function (dn) { exp[dn.id] = true; dn.ch.forEach(function (o) { if (o.ch.length) exp[o.id] = true; }); }); } }
      else if (d.n) { if (b.closest(".mapsvg")) return; tap(d.n, P.layout === "cols" || P.layout === "radial"); }
      Hub.render();
    });
  }
  Hub.views.maps = { html: html, mount: mount };
});
