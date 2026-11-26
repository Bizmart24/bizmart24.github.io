HubMods.push(function (Hub) {
  "use strict";
  var L = Hub.L, esc = Hub.esc, st = Hub.st, P = st.prac;
  ["acl", "ale", "match", "out"].forEach(function (k) { P[k] = P[k] || { ok: 0, n: 0 }; });
  var T = {
    next: ["Prossimo esercizio", "Next exercise"], check: ["Verifica", "Check"], score: ["Corrette", "Correct"], right: ["Giusto.", "Right."], wrong: ["Non è questa.", "Not this one."],
    aclQ: ["Quale riga decide la sorte di questo pacchetto?", "Which line decides what happens to this packet?"], aclLead: ["Le ACL si leggono dall'alto: vale la prima riga che corrisponde. Se nessuna corrisponde, il pacchetto è bloccato dal deny implicito.", "ACLs are read top down: the first matching line wins. If none matches, the implicit deny drops the packet."],
    implicit: ["deny implicito (nessuna riga corrisponde)", "implicit deny (no line matches)"], pkt: ["Pacchetto", "Packet"], res: ["Esito", "Result"], permitted: ["consentito", "permitted"], denied: ["bloccato", "denied"], line: ["riga", "line"],
    aleQ: ["Calcola SLE e ALE", "Work out SLE and ALE"], av: ["Valore dell'asset (AV)", "Asset value (AV)"], ef: ["Exposure factor (EF)", "Exposure factor (EF)"], aro: ["Frequenza annua (ARO)", "Annual rate (ARO)"], sol: ["Soluzione", "Solution"],
    matchLead: ["Scegli l'abbinamento corretto per ogni voce, poi verifica.", "Pick the right match for each item, then check."], choose: ["Scegli…", "Choose…"], show: ["Mostra la soluzione", "Show the solution"], other: ["Altro abbinamento", "Another set"],
    outLead: ["Leggi l'output e rispondi come in una domanda pratica d'esame.", "Read the output and answer as in a hands-on exam question."]
  };
  function t(k) { return L(T[k]); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(a) { return a[rnd(a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function foot(k) { return '<p class="sm muted">' + t("score") + ": " + P[k].ok + "/" + P[k].n + "</p>"; }
  function done(k, ok) { P[k].n++; if (ok) P[k].ok++; Hub.save(); }

  /* ---- ACL ---- */
  var NETS = ["10.1.10", "10.1.20", "192.168.5"], SV = [["tcp", 22, "SSH"], ["tcp", 80, "HTTP"], ["tcp", 443, "HTTPS"], ["udp", 53, "DNS"], ["tcp", 3389, "RDP"], ["tcp", 23, "Telnet"]];
  function newAcl() {
    var n = 3 + rnd(2), rules = [], i;
    for (i = 0; i < n; i++) rules.push({ act: Math.random() < .55 ? "permit" : "deny", src: Math.random() < .25 ? null : pick(NETS), sv: Math.random() < .2 ? null : pick(SV) });
    var p = { net: pick(NETS), host: 2 + rnd(250), sv: pick(SV) }, hit = rules.length;
    for (i = 0; i < n; i++) if ((!rules[i].src || rules[i].src === p.net) && (!rules[i].sv || rules[i].sv === p.sv)) { hit = i; break; }
    return { rules: rules, p: p, hit: hit, ans: null };
  }
  function ruleTxt(r) { return r.act + " " + (r.sv ? r.sv[0] : "ip") + " " + (r.src ? r.src + ".0/24" : "any") + " any" + (r.sv ? " eq " + r.sv[1] : ""); }
  var acl = newAcl();
  function aclHTML() {
    var a = acl, d = a.ans !== null, lines = a.rules.map(ruleTxt).concat([t("implicit")]), okRes = a.hit < a.rules.length && a.rules[a.hit].act === "permit";
    var h = '<section class="panel drill"><p class="eyebrow">' + t("aclQ") + '</p><p class="sm muted">' + t("aclLead") + '</p><p class="pktline mono"><b>' + t("pkt") + ":</b> " + a.p.net + "." + a.p.host + " → server · " + a.p.sv[0].toUpperCase() + " " + a.p.sv[1] + " (" + a.p.sv[2] + ')</p><div class="opts acl">' + lines.map(function (ln, i) {
      var cls = "opt mono"; if (d) { if (i === a.hit) cls += " ok"; else if (i === a.ans) cls += " bad"; }
      return '<button class="' + cls + '" data-acl="' + i + '"' + (d ? " disabled" : "") + "><b>" + (i < a.rules.length ? (i + 1) * 10 : "—") + "</b><span>" + esc(ln) + "</span></button>";
    }).join("") + "</div>";
    if (d) h += '<div class="fb ' + (a.ans === a.hit ? "ok" : "bad") + '"><p><b>' + (a.ans === a.hit ? t("right") : t("wrong")) + "</b> " + t("res") + ": <b>" + (okRes ? t("permitted") : t("denied")) + "</b> (" + (a.hit < a.rules.length ? t("line") + " " + (a.hit + 1) * 10 : t("implicit")) + ').</p></div><button class="btn primary big" data-dnext="acl">' + t("next") + "</button>";
    return h + foot("acl") + "</section>";
  }

  /* ---- ALE ---- */
  function newAle() { var av = pick([20000, 50000, 80000, 120000, 250000, 400000]), ef = pick([10, 20, 25, 40, 50]), aro = pick([0.1, 0.2, 0.5, 1, 2, 4]); return { av: av, ef: ef, aro: aro, sle: av * ef / 100, ale: Math.round(av * ef / 100 * aro), ans: null }; }
  var ale = newAle();
  function num(v) { return Number(String(v).replace(/[^\d.,]/g, "").replace(/[.,](?=\d{3}\b)/g, "").replace(",", ".")); }
  function fmtN(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function aleHTML() {
    var a = ale, d = a.ans, okS = d && num(d.sle) === a.sle, okA = d && num(d.ale) === a.ale;
    function f(id, lab, val, ok, sol) { return '<div class="field' + (d ? (ok ? " fok" : " fbad") : "") + '"><label for="' + id + '">' + lab + '</label><input id="' + id + '" inputmode="decimal" autocomplete="off" value="' + esc(val || "") + '"' + (d ? " readonly" : "") + ">" + (d && !ok ? '<small class="bad-t">' + t("sol") + ': <b class="mono">' + fmtN(sol) + "</b></small>" : "") + "</div>"; }
    var h = '<section class="panel drill"><p class="eyebrow">' + t("aleQ") + '</p><dl class="facts three"><div><dt>' + t("av") + "</dt><dd>" + fmtN(a.av) + "</dd></div><div><dt>" + t("ef") + "</dt><dd>" + a.ef + "%</dd></div><div><dt>" + t("aro") + "</dt><dd>" + a.aro + '</dd></div></dl><form id="alef" class="setup">' + f("al-sle", "SLE", d && d.sle, okS, a.sle) + f("al-ale", "ALE", d && d.ale, okA, a.ale) +
      (d ? '<div class="how"><p class="mono">SLE = AV x EF = ' + fmtN(a.av) + " x " + a.ef + "% = <b>" + fmtN(a.sle) + "</b><br>ALE = SLE x ARO = " + fmtN(a.sle) + " x " + a.aro + " = <b>" + fmtN(a.ale) + '</b></p></div><button class="btn primary big" type="button" data-dnext="ale">' + t("next") + "</button>" : '<button class="btn primary big" type="submit">' + t("check") + "</button>") + "</form>";
    return h + foot("ale") + "</section>";
  }

  /* ---- Matching ---- */
  var MSETS = [
    { t: ["Attacco e contromisura più adatta", "Attack and best countermeasure"], p: [["Evil twin", "WPA3-Enterprise / 802.1X"], ["MAC flooding", "Port security"], ["Phishing", ["Formazione + email authentication", "Awareness training + email authentication"]], ["DNS poisoning", "DNSSEC"], ["On-path attack", ["Cifratura (TLS)", "Encryption (TLS)"]], ["Password spraying", "MFA + account lockout"]] },
    { t: ["Comando e scopo", "Command and purpose"], p: [["ping", ["Verificare la raggiungibilità", "Test reachability"]], ["traceroute", ["Vedere gli hop del percorso", "Show the hops on the path"]], ["nslookup", ["Interrogare il DNS", "Query DNS"]], ["netstat", ["Porte in ascolto e connessioni", "Listening ports and connections"]], ["arp", ["Tabella IP-MAC", "IP-to-MAC table"]], ["tcpdump", ["Catturare pacchetti", "Capture packets"]]] },
    { t: ["Controllo e tipo", "Control and type"], p: [["Firewall", "Preventive"], [["Telecamera", "Camera"], "Detective"], [["Cartello di avviso", "Warning sign"], "Deterring"], [["Ripristino da backup", "Restore from backup"], "Corrective"], [["Policy di sicurezza", "Security policy"], "Directive"], [["Isolare un sistema legacy", "Isolating a legacy system"], "Compensating"]] },
    { t: ["Sintomo e causa più probabile", "Symptom and most likely cause"], p: [[["Indirizzo 169.254.x.x", "169.254.x.x address"], ["DHCP non raggiungibile", "DHCP unreachable"]], [["Rete locale ok, remota no", "Local works, remote fails"], ["Default gateway errato", "Wrong default gateway"]], [["Con l'IP funziona, col nome no", "IP works, names fail"], ["Problema DNS", "DNS problem"]], [["Errori CRC in aumento", "Rising CRC errors"], ["Cavo difettoso o interferenza", "Bad cable or interference"]], [["Chiamate VoIP a scatti", "Choppy VoIP calls"], "Jitter"], [["Porta error disabled", "Port error disabled"], ["Violazione di port security", "Port security violation"]]] },
    { t: ["Strumento di sicurezza e compito", "Security tool and job"], p: [["SIEM", ["Correlare i log", "Correlate logs"]], ["DLP", ["Bloccare l'uscita di dati sensibili", "Stop sensitive data leaving"]], ["EDR", ["Rilevare minacce sugli endpoint", "Detect threats on endpoints"]], ["WAF", ["Proteggere le applicazioni web", "Protect web applications"]], ["NAC", ["Verificare i dispositivi prima dell'accesso", "Check devices before access"]], ["CSPM", ["Trovare misconfiguration nel cloud", "Find cloud misconfigurations"]]] },
    { t: ["Record DNS e uso", "DNS record and use"], p: [["A", ["Nome verso IPv4", "Name to IPv4"]], ["AAAA", ["Nome verso IPv6", "Name to IPv6"]], ["CNAME", "Alias"], ["MX", ["Server di posta", "Mail server"]], ["PTR", ["Risoluzione inversa", "Reverse lookup"]], ["TXT", ["Testo: SPF e verifiche", "Text: SPF and verification"]]] },
    { t: ["Accordo e scopo", "Agreement and purpose"], p: [["SLA", ["Livelli di servizio misurabili", "Measurable service levels"]], ["NDA", ["Riservatezza", "Confidentiality"]], ["MOU", ["Intesa non vincolante", "Non-binding understanding"]], ["SOW", ["Attività e consegne di un lavoro", "Tasks and deliverables of one job"]], ["MSA", ["Contratto quadro", "Master contract"]]] }
  ];
  function newMatch(skip) { var i; do { i = rnd(MSETS.length); } while (i === skip); var n = MSETS[i].p.length, o = []; for (var k = 0; k < n; k++) o.push(k); return { set: i, opts: shuffle(o), ans: {}, checked: false }; }
  var mt = newMatch(-1);
  function isOk(i) { var a = mt.ans[i]; return a != null && a !== "" && +a === i; }
  function matchHTML() {
    var s = MSETS[mt.set], all = s.p.every(function (x, i) { return isOk(i); });
    var h = '<section class="panel drill"><p class="eyebrow">' + esc(L(s.t)) + '</p><p class="sm muted">' + t("matchLead") + '</p><div class="mrows">' + s.p.map(function (pr, i) {
      var ok = isOk(i);
      return '<div class="mrow' + (mt.checked ? (ok ? " ok" : " bad") : "") + '"><label for="mm-' + i + '" class="mono">' + esc(L(pr[0])) + '</label><select id="mm-' + i + '" data-mm="' + i + '"><option value="">' + t("choose") + "</option>" + mt.opts.map(function (j) { return '<option value="' + j + '"' + (String(mt.ans[i]) === String(j) ? " selected" : "") + ">" + esc(L(s.p[j][1])) + "</option>"; }).join("") + "</select></div>";
    }).join("") + '</div><div class="row"><button class="btn primary" data-mcheck="1">' + t("check") + "</button>" + (mt.checked && !all ? '<button class="btn" data-mshow="1">' + t("show") + "</button>" : "") + '<button class="btn" data-dnext="match">' + t("other") + "</button></div>";
    return h + foot("match") + "</section>";
  }

  /* ---- Output reading ---- */
  var OUTS = [
    { out: "C:\\> ipconfig\n   IPv4 Address. . . : 169.254.37.12\n   Subnet Mask . . . : 255.255.0.0\n   Default Gateway . :", q: "What is the most likely problem?", a: ["The client could not reach a DHCP server", "The DNS server is wrong", "The cable is unplugged", "There is a duplicate IP"], e: ["169.254.x.x senza gateway è un indirizzo APIPA: nessuna risposta dal DHCP.", "169.254.x.x with no gateway is APIPA: no DHCP answer."], ref: "n:5.3" },
    { out: "C:\\> ping 8.8.8.8\nReply from 8.8.8.8: bytes=32 time=14ms\n\nC:\\> ping www.example.com\nPing request could not find host www.example.com.", q: "Which service should be checked first?", a: ["DNS", "DHCP", "NTP", "Default gateway"], e: ["L'IP risponde ma il nome non si risolve: problema DNS.", "The IP answers but the name does not resolve: a DNS problem."], ref: "n:5.5" },
    { out: "Gi0/5 is up, line protocol is up\n  Full-duplex, 1000Mb/s\n  5 minute input rate 2000 bits/sec\n     0 runts, 0 giants\n     48213 input errors, 48190 CRC", q: "What should the technician do first?", a: ["Test or replace the cable", "Change the VLAN", "Increase the MTU", "Reboot the DHCP server"], e: ["Molti errori CRC indicano un cavo danneggiato o interferenza.", "Many CRC errors point to a damaged cable or interference."], ref: "n:5.2" },
    { out: "$ traceroute 203.0.113.50\n 1  192.168.1.1     1 ms\n 2  10.20.0.1       4 ms\n 3  * * *\n 4  * * *\n 5  * * *", q: "Where does the problem most likely begin?", a: ["After the second hop", "On the local workstation", "At the default gateway", "At the destination host"], e: ["Il percorso risponde fino all'hop 2: il problema è dopo quel router.", "The path answers up to hop 2: the problem is beyond that router."], ref: "n:5.5" },
    { out: "C:\\> arp -a\n  192.168.1.1    00-1a-2b-3c-4d-5e   dynamic\n  192.168.1.50   00-1a-2b-3c-4d-5e   dynamic\n  192.168.1.77   a4-5e-60-11-22-33   dynamic", q: "The gateway is 192.168.1.1. What does this output suggest?", a: ["ARP poisoning: another host claims the gateway's MAC", "A DHCP scope is exhausted", "A switching loop", "A duplex mismatch"], e: ["Lo stesso MAC per il gateway e un altro host è un indizio di ARP poisoning.", "The same MAC for the gateway and another host suggests ARP poisoning."], ref: "n:4.2" },
    { out: "09:14:02 FAIL user=a.rossi   pw=Winter2026!\n09:14:03 FAIL user=b.bianchi pw=Winter2026!\n09:14:04 FAIL user=c.verdi   pw=Winter2026!\n09:14:05 OK   user=d.neri    pw=Winter2026!", q: "Which attack does this authentication log show?", a: ["Password spraying", "Brute force on one account", "Credential stuffing", "Impossible travel"], e: ["Una sola password provata su molti account: password spraying.", "One password tried across many accounts: password spraying."], ref: "s:2.5" },
    { out: "$ netstat -an | find \"LISTENING\"\n  TCP  0.0.0.0:23     LISTENING\n  TCP  0.0.0.0:443    LISTENING\n  TCP  0.0.0.0:3389   LISTENING", q: "Which finding should be hardened first on this server?", a: ["Telnet is enabled on port 23", "HTTPS is enabled on port 443", "The server listens on all interfaces", "RDP uses a non-standard port"], e: ["Telnet (23) trasmette in chiaro: va disabilitato e sostituito con SSH.", "Telnet (23) is cleartext: disable it and use SSH."], ref: "n:4.3" },
    { out: "Switch# show interface status\nPort   Status        Vlan  Duplex Speed\nGi0/1  connected     10    a-full a-1000\nGi0/2  err-disabled  10    auto   auto\nGi0/3  disabled      1     auto   auto", q: "Which statement about Gi0/2 is most likely true?", a: ["A protection such as port security shut the port", "An administrator shut it down manually", "The cable is unplugged", "It is a trunk port"], e: ["err-disabled indica una protezione scattata; il down manuale è \"disabled\".", "err-disabled means a protection tripped; a manual shutdown shows \"disabled\"."], ref: "n:5.2" }
  ];
  function newOut(skip) { var i; do { i = rnd(OUTS.length); } while (i === skip); var o = shuffle(OUTS[i].a); return { i: i, opts: o, right: o.indexOf(OUTS[i].a[0]), ans: null }; }
  var ot = newOut(-1);
  function outHTML() {
    var s = OUTS[ot.i], d = ot.ans !== null;
    var h = '<section class="panel drill"><p class="sm muted">' + t("outLead") + '</p><pre class="term" tabindex="0">' + esc(s.out) + '</pre><p class="bigq sm2" lang="en">' + esc(s.q) + '</p><div class="opts" lang="en">' + ot.opts.map(function (o, i) {
      var cls = "opt"; if (d) { if (i === ot.right) cls += " ok"; else if (i === ot.ans) cls += " bad"; }
      return '<button class="' + cls + '" data-out="' + i + '"' + (d ? " disabled" : "") + "><b>" + "ABCD"[i] + "</b><span>" + esc(o) + "</span></button>";
    }).join("") + "</div>";
    if (d) h += '<div class="fb ' + (ot.ans === ot.right ? "ok" : "bad") + '"><p><b>' + (ot.ans === ot.right ? t("right") : t("wrong")) + "</b> " + esc(L(s.e)) + "</p>" + Hub.refChip(s.ref) + '</div><button class="btn primary big" data-dnext="out">' + t("next") + "</button>";
    return h + foot("out") + "</section>";
  }

  function mount(v) {
    v.addEventListener("click", function (e) {
      var b = e.target.closest("[data-acl],[data-dnext],[data-mcheck],[data-mshow],[data-out]"); if (!b) return; var d = b.dataset;
      if (d.acl != null) { if (acl.ans !== null) return; acl.ans = +d.acl; done("acl", acl.ans === acl.hit); }
      else if (d.out != null) { if (ot.ans !== null) return; ot.ans = +d.out; done("out", ot.ans === ot.right); }
      else if (d.dnext === "acl") acl = newAcl(); else if (d.dnext === "ale") ale = newAle(); else if (d.dnext === "match") mt = newMatch(mt.set); else if (d.dnext === "out") ot = newOut(ot.i);
      else if (d.mcheck) { if (!mt.checked) done("match", MSETS[mt.set].p.every(function (x, i) { return isOk(i); })); mt.checked = true; }
      else if (d.mshow) { MSETS[mt.set].p.forEach(function (x, i) { mt.ans[i] = i; }); }
      Hub.render();
    });
    v.addEventListener("change", function (e) { if (e.target.dataset.mm != null) { mt.ans[e.target.dataset.mm] = e.target.value; if (mt.checked) { mt.checked = false; Hub.render(); } } });
    v.addEventListener("submit", function (e) {
      if (e.target.id !== "alef") return; e.preventDefault();
      ale.ans = { sle: v.querySelector("#al-sle").value, ale: v.querySelector("#al-ale").value }; done("ale", num(ale.ans.sle) === ale.sle && num(ale.ans.ale) === ale.ale); Hub.render();
    });
  }
  Hub.drills = (Hub.drills || []).concat([
    { id: "acl", label: ["ACL", "ACL"], html: aclHTML, mount: mount }, { id: "out", label: ["Output", "Output"], html: outHTML, mount: mount },
    { id: "match", label: ["Abbina", "Match"], html: matchHTML, mount: mount }, { id: "ale", label: ["Rischio", "Risk"], html: aleHTML, mount: mount }
  ]);
});
