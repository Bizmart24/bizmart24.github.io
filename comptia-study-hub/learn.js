HubMods.push(function (Hub) {
  "use strict";
  var L = Hub.L, esc = Hub.esc, EX = Hub.EX, st = Hub.st;
  st.cases = st.cases || {};
  var T = {
    title: ["Impara", "Learn"], lead: ["Schemi animati che mostrano come funzionano le cose, casi pratici da risolvere e video per approfondire.", "Animated diagrams showing how things work, practical cases to solve and videos to go deeper."],
    dg: ["Schemi", "Diagrams"], cases: ["Casi", "Cases"], video: ["Video", "Videos"],
    step: ["Passo", "Step"], of: ["di", "of"], prev: ["Indietro", "Back"], next: ["Avanti", "Next"], play: ["Riproduci", "Play"], stop: ["Ferma", "Stop"], restart: ["Da capo", "Restart"],
    dgOpen: ["Schema animato", "Animated diagram"], vid: ["Video su YouTube", "Videos on YouTube"], caseBtn: ["Caso pratico", "Practical case"],
    sit: ["Situazione", "Situation"], clues: ["Indizi", "Clues"], sol: ["Come si risolve", "How it is solved"], mem: ["Da ricordare per l'esame", "Remember for the exam"], rel: ["Collegato a", "Related to"],
    right: ["Scelta corretta.", "Correct choice."], wrong: ["Non è la scelta migliore.", "Not the best choice."], solved: ["risolto", "solved"], back: ["Tutti i casi", "All cases"], nextCase: ["Prossimo caso", "Next case"], seeDg: ["Vedi lo schema", "See the diagram"],
    vLead: ["I video si aprono fuori dall'hub. I corsi qui sotto sono gratuiti; i pulsanti di ricerca aprono YouTube già sull'argomento.", "Videos open outside the hub. The courses below are free; the search buttons open YouTube already on the topic."],
    course: ["Corsi video gratuiti", "Free video courses"], cN: ["Professor Messer: corso Network+ N10-009 (87 video)", "Professor Messer: Network+ N10-009 course (87 videos)"], cS: ["Professor Messer: corso Security+ SY0-701 (121 video)", "Professor Messer: Security+ SY0-701 course (121 videos)"],
    cSnote: ["Per Security+ il corso gratuito trovato segue la SY0-701: la gran parte degli argomenti coincide, ma per le novità della 801 (IA, passkey, CSPM) usa le ricerche qui sotto.", "For Security+ the free course found follows SY0-701: most topics overlap, but for what is new in 801 (AI, passkeys, CSPM) use the searches below."],
    byTopic: ["Cerca per argomento", "Search by topic"], all: ["Tutti", "All"]
  };
  function t(k) { return L(T[k]); }
  function yt(q) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); }
  function vlink(q, label) { return '<a class="btn sm vbtn" href="' + yt(q) + '" target="_blank" rel="noopener">▶ ' + (label || t("vid")) + " ↗</a>"; }

  /* ---------- diagrams ---------- */
  function S(f, to, l, it, en) { return { f: f, t: to, l: l, c: [it, en] }; }
  var D = [
    { id: "tcp", t: ["Handshake TCP", "TCP handshake"], refs: ["n:1.1", "n:1.4"], cons: ["TCP"], a: [["Client", "c"], ["Server", "s"]], s: [
      S(0, 1, "SYN", "Il client chiede di aprire la connessione.", "The client asks to open the connection."), S(1, 0, "SYN-ACK", "Il server accetta e risponde.", "The server accepts and answers."),
      S(0, 1, "ACK", "Il client conferma: connessione stabilita.", "The client confirms: connection established."), S(0, 1, "DATA", "Ora i dati viaggiano, ogni segmento viene confermato.", "Data now flows, each segment is acknowledged."), S(0, 1, "FIN", "A fine scambio la connessione viene chiusa.", "When done the connection is closed.")] },
    { id: "dhcp", t: ["DHCP: processo DORA", "DHCP: the DORA process"], refs: ["n:3.4", "n:5.3"], cons: ["DHCP", "APIPA"], a: [["Client", "c"], ["DHCP server", "s"]], s: [
      S(0, 1, "Discover", "Il client appena acceso cerca un server in broadcast.", "The newly started client looks for a server by broadcast."), S(1, 0, "Offer", "Il server propone un indirizzo libero dello scope.", "The server offers a free address from the scope."),
      S(0, 1, "Request", "Il client chiede proprio quell'indirizzo.", "The client requests that address."), S(1, 0, "Acknowledge", "Il server conferma: IP, maschera, gateway, DNS e durata del lease.", "The server confirms: IP, mask, gateway, DNS and lease time."),
      S(0, 0, "169.254.x.x ?", "Se nessuno risponde, il client si assegna un indirizzo APIPA.", "If nobody answers, the client self-assigns an APIPA address.")] },
    { id: "dns", t: ["Risoluzione DNS", "DNS resolution"], refs: ["n:3.4"], cons: ["DNS", "DNSSEC"], a: [["Client", "c"], ["Resolver", "m"], ["Root / TLD", "s"], ["Authoritative", "s"]], s: [
      S(0, 1, "www.example.com ?", "Il client chiede al resolver ricorsivo.", "The client asks the recursive resolver."), S(1, 2, ".com ?", "Il resolver parte dalla root e dal TLD.", "The resolver starts from the root and the TLD."),
      S(2, 1, "NS example.com", "Riceve il rinvio al server autoritativo.", "It gets a referral to the authoritative server."), S(1, 3, "A ?", "Interroga il server autoritativo della zona.", "It queries the zone's authoritative server."),
      S(3, 1, "A = 93.184.x.x", "Arriva la risposta autoritativa.", "The authoritative answer arrives."), S(1, 0, "93.184.x.x", "Il resolver risponde al client e mette in cache per il TTL.", "The resolver answers the client and caches for the TTL.")] },
    { id: "arp", t: ["ARP: da IP a MAC", "ARP: from IP to MAC"], refs: ["n:1.1"], cons: ["Switch"], a: [["Host A", "c"], ["Host B", "s"]], s: [
      S(0, 1, "Who has .20 ?", "A conosce l'IP di B ma non il MAC: chiede in broadcast.", "A knows B's IP but not its MAC: it asks by broadcast."), S(1, 0, ".20 is at bb:bb", "Solo B risponde con il proprio MAC.", "Only B answers with its MAC."),
      S(0, 0, "ARP table", "A salva l'abbinamento nella tabella ARP.", "A stores the pair in its ARP table."), S(0, 1, "Frame → bb:bb", "Ora A può inviare il frame a Layer 2.", "A can now send the Layer 2 frame.")] },
    { id: "onpath", t: ["Attacco on-path con ARP poisoning", "On-path attack with ARP poisoning"], refs: ["n:4.2", "s:2.5"], cons: ["ARP poisoning", "On-path attack"], a: [["Victim", "c"], ["Attacker", "x"], ["Gateway", "s"]], s: [
      S(1, 0, "fake ARP", "L'attaccante dice alla vittima: il gateway sono io.", "The attacker tells the victim: I am the gateway."), S(1, 2, "fake ARP", "E dice al gateway: la vittima sono io.", "And tells the gateway: I am the victim."),
      S(0, 1, "traffic", "La vittima invia il traffico all'attaccante senza accorgersene.", "The victim unknowingly sends traffic to the attacker."), S(1, 2, "forwarded", "L'attaccante lo inoltra, così tutto sembra funzionare.", "The attacker forwards it, so everything seems to work."),
      S(0, 0, "TLS", "Difesa: cifratura end-to-end, segmentazione, protezioni ARP sugli switch.", "Defence: end-to-end encryption, segmentation, ARP protections on switches.")] },
    { id: "nat", t: ["NAT / PAT", "NAT / PAT"], refs: ["n:2.1", "n:1.7"], cons: ["NAT / PAT", "RFC 1918"], a: [["PC 10.0.0.5", "c"], ["Router NAT", "m"], ["Web server", "s"]], s: [
      S(0, 1, "src 10.0.0.5:51000", "Il PC esce con il suo indirizzo privato.", "The PC leaves with its private address."), S(1, 1, "table +1", "Il router registra l'abbinamento nella tabella di traduzione.", "The router records the pair in its translation table."),
      S(1, 2, "src 203.0.113.7:40001", "All'esterno si vede solo l'IP pubblico, con una porta diversa.", "Outside only the public IP is seen, with a different port."), S(2, 1, "dst 203.0.113.7:40001", "La risposta torna all'IP pubblico.", "The reply returns to the public IP."),
      S(1, 0, "dst 10.0.0.5:51000", "Il router ritraduce e consegna al PC giusto grazie alla porta.", "The router translates back and delivers to the right PC thanks to the port.")] },
    { id: "vlan", t: ["VLAN e trunk 802.1Q", "VLANs and 802.1Q trunk"], refs: ["n:2.2", "n:5.3"], cons: ["VLAN", "802.1Q trunk"], a: [["PC VLAN 10", "c"], ["Switch A", "m"], ["Switch B", "m"], ["PC VLAN 10", "s"]], s: [
      S(0, 1, "untagged", "Sulla porta access il frame entra senza tag.", "On the access port the frame enters untagged."), S(1, 2, "tag VLAN 10", "Sul trunk lo switch aggiunge il tag 802.1Q.", "On the trunk the switch adds the 802.1Q tag."),
      S(2, 3, "untagged", "Lo switch B toglie il tag e consegna solo alle porte della VLAN 10.", "Switch B strips the tag and delivers only to VLAN 10 ports."), S(2, 2, "VLAN 20 ✕", "Gli host di altre VLAN non vedono il frame: serve un router.", "Hosts in other VLANs never see the frame: a router is needed.")] },
    { id: "dot1x", t: ["802.1X: accesso alla rete", "802.1X: network access"], refs: ["n:4.3", "n:2.3", "s:4.1"], cons: ["802.1X", "RADIUS / TACACS+"], a: [["Supplicant", "c"], ["Switch / AP", "m"], ["RADIUS", "s"]], s: [
      S(0, 1, "EAP start", "Il dispositivo si collega: la porta è ancora bloccata.", "The device connects: the port is still blocked."), S(1, 2, "credentials", "Lo switch inoltra le credenziali al server RADIUS.", "The switch relays the credentials to the RADIUS server."),
      S(2, 1, "Access-Accept", "RADIUS verifica e risponde.", "RADIUS verifies and answers."), S(1, 0, "port open", "Solo ora la porta viene aperta, nella VLAN giusta.", "Only now is the port opened, in the right VLAN.")] },
    { id: "vpn", t: ["Tunnel VPN IPsec", "IPsec VPN tunnel"], refs: ["n:3.5", "n:1.4", "s:3.2"], cons: ["VPN", "IPsec"], a: [["Remote user", "c"], ["VPN gateway", "m"], ["Server", "s"]], s: [
      S(0, 1, "IKE", "Le due parti si autenticano e concordano le chiavi.", "Both sides authenticate and agree keys."), S(0, 1, "ESP (encrypted)", "I pacchetti viaggiano cifrati dentro il tunnel.", "Packets travel encrypted inside the tunnel."),
      S(1, 2, "cleartext", "Il gateway decifra e inoltra nella rete interna.", "The gateway decrypts and forwards into the internal network."), S(2, 1, "reply", "La risposta rientra nel tunnel.", "The reply goes back into the tunnel."), S(1, 0, "ESP (encrypted)", "E torna cifrata all'utente.", "And returns encrypted to the user.")] },
    { id: "asym", t: ["Cifratura asimmetrica", "Asymmetric encryption"], refs: ["s:1.3"], cons: ["Asymmetric encryption", "PKI"], a: [["Alice", "c"], ["Bob", "s"]], s: [
      S(1, 0, "public key", "Bob pubblica la sua chiave pubblica.", "Bob publishes his public key."), S(0, 0, "encrypt", "Alice cifra il messaggio con la chiave pubblica di Bob.", "Alice encrypts the message with Bob's public key."),
      S(0, 1, "ciphertext", "Il testo cifrato può viaggiare su una rete non sicura.", "The ciphertext can cross an insecure network."), S(1, 1, "decrypt", "Solo la chiave privata di Bob può decifrarlo.", "Only Bob's private key can decrypt it.")] },
    { id: "sign", t: ["Firma digitale", "Digital signature"], refs: ["s:1.3", "s:1.1"], cons: ["Digital signature", "Hashing", "Non-repudiation"], a: [["Alice", "c"], ["Bob", "s"]], s: [
      S(0, 0, "hash", "Alice calcola l'hash del documento.", "Alice computes the document's hash."), S(0, 0, "sign", "Cifra l'hash con la propria chiave privata: è la firma.", "She encrypts the hash with her private key: that is the signature."),
      S(0, 1, "doc + signature", "Invia documento e firma.", "She sends document and signature."), S(1, 1, "verify", "Bob apre la firma con la chiave pubblica di Alice e ricalcola l'hash.", "Bob opens the signature with Alice's public key and recomputes the hash."),
      S(1, 1, "match ✓", "Se coincidono: integrità, autenticità e non-repudiation.", "If they match: integrity, authenticity and non-repudiation.")] },
    { id: "tls", t: ["Certificato e sessione TLS", "Certificate and TLS session"], refs: ["s:1.3", "n:4.1"], cons: ["Certificates", "PKI"], a: [["Browser", "c"], ["Web server", "s"], ["CA / OCSP", "m"]], s: [
      S(0, 1, "hello", "Il browser avvia la connessione sicura.", "The browser starts the secure connection."), S(1, 0, "certificate", "Il server presenta il suo certificato.", "The server presents its certificate."),
      S(0, 2, "revoked ?", "Il browser controlla catena di fiducia e revoca.", "The browser checks the chain of trust and revocation."), S(2, 0, "good", "La CA conferma che il certificato è valido.", "The CA confirms the certificate is valid."),
      S(0, 1, "key exchange", "Si concorda la chiave di sessione.", "The session key is agreed."), S(0, 1, "encrypted", "Da qui il traffico è cifrato con chiave simmetrica.", "From here traffic is encrypted with a symmetric key.")] },
    { id: "sso", t: ["SSO con SAML", "SSO with SAML"], refs: ["s:4.5", "n:4.1"], cons: ["SSO", "SAML / OAuth", "MFA"], a: [["User", "c"], ["App", "s"], ["Identity provider", "m"]], s: [
      S(0, 1, "open app", "L'utente apre l'applicazione.", "The user opens the application."), S(1, 0, "redirect", "L'app non chiede la password: rimanda all'identity provider.", "The app asks for no password: it redirects to the identity provider."),
      S(0, 2, "login + MFA", "L'utente si autentica una sola volta.", "The user authenticates once."), S(2, 0, "SAML assertion", "Riceve un'asserzione firmata.", "They receive a signed assertion."),
      S(0, 1, "assertion", "La presenta all'app.", "They present it to the app."), S(1, 0, "access", "L'app si fida dell'identity provider e concede l'accesso.", "The app trusts the identity provider and grants access.")] },
    { id: "mail", t: ["SPF, DKIM e DMARC", "SPF, DKIM and DMARC"], refs: ["s:4.1"], cons: ["Email authentication", "Phishing"], a: [["Sender", "c"], ["Receiver", "s"], ["DNS", "m"]], s: [
      S(0, 1, "mail + DKIM", "Il mittente invia il messaggio firmato.", "The sender sends the signed message."), S(1, 2, "TXT records ?", "Il destinatario chiede al DNS i record del dominio mittente.", "The receiver asks DNS for the sending domain's records."),
      S(2, 1, "SPF, DKIM, DMARC", "Riceve server autorizzati, chiave pubblica e policy.", "It gets authorised servers, public key and policy."), S(1, 1, "SPF + DKIM", "Controlla l'IP mittente e la firma.", "It checks the sending IP and the signature."),
      S(1, 1, "DMARC", "La policy decide: consegna, quarantena o rifiuto.", "The policy decides: deliver, quarantine or reject.")] },
    { id: "zt", t: ["Accesso Zero Trust", "Zero Trust access"], refs: ["s:1.1", "s:3.2", "n:1.8"], cons: ["Zero Trust", "Least privilege"], a: [["User + device", "c"], ["Enforcement", "m"], ["Policy engine", "m"], ["Resource", "s"]], s: [
      S(0, 1, "request", "Ogni richiesta passa dal punto di controllo.", "Every request goes through the enforcement point."), S(1, 2, "allow ?", "Che chiede la decisione al motore delle policy.", "Which asks the policy engine for a decision."),
      S(2, 2, "identity, device", "Si valutano identità, stato del dispositivo e contesto.", "Identity, device health and context are evaluated."), S(2, 1, "allow (limited)", "Accesso concesso con il minimo privilegio.", "Access granted with least privilege."),
      S(1, 3, "session", "Sessione aperta solo verso quella risorsa.", "A session opens to that resource only."), S(2, 2, "re-check", "La verifica continua per tutta la sessione.", "Verification continues throughout the session.")] },
    { id: "prompt", t: ["Prompt injection", "Prompt injection"], refs: ["s:2.6", "s:4.6"], cons: ["Prompt injection", "AI in security operations"], a: [["User", "c"], ["AI assistant", "m"], ["Document", "x"]], s: [
      S(0, 1, "summarise this", "L'utente chiede di riassumere un documento esterno.", "The user asks for a summary of an external document."), S(1, 2, "read", "L'assistente legge il contenuto.", "The assistant reads the content."),
      S(2, 1, "hidden instruction", "Nel testo è nascosta un'istruzione per il modello.", "An instruction for the model is hidden in the text."), S(1, 1, "obeys ?", "Rischio: il modello la esegue come se venisse dall'utente.", "Risk: the model obeys it as if it came from the user."),
      S(1, 1, "guard rails", "Difesa: contenuti esterni trattati come dati, permessi minimi, conferma umana.", "Defence: external content treated as data, minimal permissions, human approval.")] },
    { id: "osi", t: ["Incapsulamento OSI", "OSI encapsulation"], refs: ["n:1.1"], cons: ["OSI model", "Encapsulation"], flow: [
      ["Layer 7-5 · Data", "L'applicazione produce i dati.", "The application produces the data."], ["Layer 4 · Segment", "Si aggiungono porte e controllo (TCP o UDP).", "Ports and control are added (TCP or UDP)."],
      ["Layer 3 · Packet", "Si aggiungono gli indirizzi IP di origine e destinazione.", "Source and destination IP addresses are added."], ["Layer 2 · Frame", "Si aggiungono gli indirizzi MAC e il controllo CRC.", "MAC addresses and the CRC check are added."],
      ["Layer 1 · Bits", "Il frame diventa segnale sul cavo, in fibra o via radio.", "The frame becomes a signal on cable, fibre or radio."]] },
    { id: "trouble", t: ["Metodologia di troubleshooting", "Troubleshooting methodology"], refs: ["n:5.1"], cons: ["Troubleshooting method"], flow: [
      ["1 · Identify", "Raccogli informazioni, interroga gli utenti, cosa è cambiato?", "Gather information, question users, what changed?"], ["2 · Theory", "Ipotizza la causa più probabile, partendo dall'ovvio.", "Theorise the most probable cause, starting with the obvious."],
      ["3 · Test", "Verifica la teoria; se non regge, nuova teoria o escalation.", "Test the theory; if it fails, new theory or escalate."], ["4 · Plan", "Pianifica l'intervento e valuta gli effetti.", "Plan the fix and weigh the effects."],
      ["5 · Implement", "Applica la soluzione oppure fai escalation.", "Implement the solution or escalate."], ["6 · Verify", "Controlla che tutto funzioni e previeni il ripetersi.", "Verify everything works and prevent recurrence."],
      ["7 · Document", "Documenta risultati, azioni ed esiti.", "Document findings, actions and outcomes."]] },
    { id: "ir", t: ["Fasi dell'incident response", "Incident response phases"], refs: ["s:4.7"], cons: ["Incident response", "Chain of custody"], flow: [
      ["Preparation", "Playbook, ruoli, formazione ed esercitazioni prima dell'incidente.", "Playbooks, roles, training and exercises before the incident."], ["Detection", "Un avviso o una segnalazione fa partire la risposta.", "An alert or report starts the response."],
      ["Analysis", "Cosa è successo, quanto è esteso, quali prove conservare.", "What happened, how far it spread, what evidence to keep."], ["Containment", "Isola i sistemi colpiti per fermare la propagazione.", "Isolate affected systems to stop the spread."],
      ["Eradication", "Rimuovi la causa: malware, account, vulnerabilità.", "Remove the cause: malware, accounts, vulnerabilities."], ["Recovery", "Ripristina da copie pulite e controlla che regga.", "Restore from clean copies and check it holds."],
      ["Lessons learned", "Root cause, report e miglioramenti.", "Root cause, report and improvements."]] },
    { id: "rpo", t: ["RPO e RTO sulla linea del tempo", "RPO and RTO on the timeline"], refs: ["s:3.4", "n:3.3", "s:5.2"], cons: ["RTO / RPO", "Backup"], flow: [
      ["Last backup", "L'ultimo salvataggio valido dei dati.", "The last valid copy of the data."], ["← RPO →", "Tutto ciò che è stato fatto dopo il backup va perso: questa finestra è l'RPO.", "Everything done after the backup is lost: this window is the RPO."],
      ["Incident", "Il guasto o l'attacco interrompe il servizio.", "The failure or attack interrupts service."], ["← RTO →", "Il tempo massimo accettabile per tornare operativi.", "The maximum acceptable time to be back up."],
      ["Service restored", "Il servizio riparte con i dati dell'ultimo backup.", "Service resumes with data from the last backup."]] },
    { id: "risk", t: ["Dal valore dell'asset all'ALE", "From asset value to ALE"], refs: ["s:5.2"], cons: ["Risk analysis", "Risk treatment"], flow: [
      ["AV · asset value", "Quanto vale ciò che vuoi proteggere.", "What the thing you protect is worth."], ["× EF", "Quale percentuale si perde in un singolo evento.", "What share is lost in a single event."],
      ["= SLE", "La perdita per un singolo evento.", "The loss from one event."], ["× ARO", "Quante volte l'anno ti aspetti che accada.", "How many times a year you expect it."],
      ["= ALE", "La perdita annua attesa: il tetto di spesa sensato per il controllo.", "The expected yearly loss: the sensible spending cap for the control."], ["Treatment", "Transfer, accept, avoid oppure mitigate.", "Transfer, accept, avoid or mitigate."]] }
  ];
  var dBy = {}; D.forEach(function (d) { dBy[d.id] = d; });
  var ds = {}, timers = {};
  function count(d) { return (d.s || d.flow).length; }
  function seqSVG(d, cur) {
    var n = d.a.length, W = 340, m = n === 2 ? 70 : n === 3 ? 52 : 44, gap = (W - 2 * m) / (n - 1), rows = d.s.length, RH = 46, H = 66 + rows * RH + 8, h = "";
    function x(i) { return m + i * gap; }
    d.a.forEach(function (a, i) { var bw = n === 4 ? 76 : 96; h += '<line class="life" x1="' + x(i) + '" y1="44" x2="' + x(i) + '" y2="' + (H - 6) + '"/><rect class="actor r-' + a[1] + '" x="' + (x(i) - bw / 2) + '" y="10" width="' + bw + '" height="32" rx="8"/><text class="atxt" x="' + x(i) + '" y="31">' + esc(a[0]) + "</text>"; });
    d.s.forEach(function (sp, i) {
      if (i > cur) return; var y = 82 + i * RH, cls = i === cur ? " cur" : " past";
      if (sp.f === sp.t) { var w = Math.max(70, sp.l.length * 6.6 + 18), nx = Math.min(W - w - 4, Math.max(4, x(sp.f) - w / 2)); h += '<g class="note' + cls + '"><rect x="' + nx + '" y="' + (y - 15) + '" width="' + w + '" height="26" rx="13"/><text x="' + (nx + w / 2) + '" y="' + (y + 3) + '">' + esc(sp.l) + "</text></g>"; }
      else { var xa = x(sp.f), xb = x(sp.t), dir = xb > xa ? 1 : -1; h += '<g class="msg' + cls + '"><text x="' + (xa + xb) / 2 + '" y="' + (y - 8) + '">' + esc(sp.l) + '</text><line x1="' + xa + '" y1="' + y + '" x2="' + (xb - dir * 7) + '" y2="' + y + '"/><path d="M' + xb + " " + y + "l" + (-dir * 9) + " -5v10z\"/>" + (i === cur ? '<circle class="pk" cy="' + y + '" r="5" style="--x0:' + xa + "px;--x1:" + xb + 'px"/>' : "") + "</g>"; }
    });
    return '<svg class="dgsvg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(L(d.t)) + '">' + h + "</svg>";
  }
  function flowHTML(d, cur) {
    return '<ol class="dgflow">' + d.flow.map(function (f, i) { return '<li class="' + (i === cur ? "cur" : i < cur ? "past" : "") + '"><span>' + esc(f[0]) + "</span></li>"; }).join("") + "</ol>";
  }
  function dgHTML(id) {
    var d = dBy[id], i = ds[id] || 0, n = count(d), cap = d.s ? L(d.s[i].c) : L([d.flow[i][1], d.flow[i][2]]), playing = !!timers[id];
    return '<div class="dg" data-dg="' + id + '"><p class="dgt">' + esc(L(d.t)) + "</p>" + (d.s ? seqSVG(d, i) : flowHTML(d, i)) + '<p class="dgcap" aria-live="polite"><b>' + t("step") + " " + (i + 1) + " " + t("of") + " " + n + "</b> " + esc(cap) + '</p><div class="dgctl"><button class="btn sm" data-dga="prev"' + (i === 0 ? " disabled" : "") + ">← " + t("prev") + '</button><button class="btn sm" data-dga="play">' + (playing ? "■ " + t("stop") : "▶ " + t("play")) + '</button><button class="btn sm primary" data-dga="' + (i === n - 1 ? "reset" : "next") + '">' + (i === n - 1 ? "↺ " + t("restart") : t("next") + " →") + "</button></div></div>";
  }
  function refresh(id) { document.querySelectorAll('.dg[data-dg="' + id + '"]').forEach(function (el) { el.outerHTML = dgHTML(id); }); }
  function stop(id) { clearInterval(timers[id]); delete timers[id]; }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-dga]"); if (!b) return; var box = b.closest(".dg"); if (!box) return; var id = box.getAttribute("data-dg"), d = dBy[id], n = count(d), a = b.dataset.dga;
    if (a === "play") {
      if (timers[id]) stop(id); else { if ((ds[id] || 0) >= n - 1) ds[id] = 0; timers[id] = setInterval(function () { if (!document.querySelector('.dg[data-dg="' + id + '"]')) return stop(id); if ((ds[id] || 0) >= n - 1) { stop(id); refresh(id); return; } ds[id] = (ds[id] || 0) + 1; refresh(id); }, 2600); }
    } else { stop(id); ds[id] = a === "reset" ? 0 : Math.max(0, Math.min(n - 1, (ds[id] || 0) + (a === "next" ? 1 : -1))); }
    refresh(id);
  });
  function dgDetails(id, open) { return '<details class="dgd"' + (open ? " open" : "") + '><summary>▶ ' + t("dgOpen") + ": " + esc(L(dBy[id].t)) + "</summary>" + dgHTML(id) + "</details>"; }

  /* ---------- cases ---------- */
  var CASES = [
    { id: "dhcp", ex: "n", t: ["Lunedì mattina senza rete", "Monday morning with no network"], refs: ["n:5.3", "n:3.4", "n:5.1"], dg: "dhcp",
      s: ["In uno studio di 60 persone, dopo il weekend metà dei PC non naviga. Venerdì erano arrivati 30 portatili nuovi per un corso.", "In a 60-person office, after the weekend half the PCs cannot browse. On Friday 30 new laptops arrived for a training course."],
      c: [["I PC che non funzionano hanno un indirizzo 169.254.x.x.", "The failing PCs have a 169.254.x.x address."], ["Quelli accesi da venerdì funzionano ancora.", "Those left on since Friday still work."], ["Lo scope DHCP è 192.168.1.100-199, lease di 8 giorni.", "The DHCP scope is 192.168.1.100-199, 8-day lease."]],
      q: ["Qual è la causa più probabile?", "What is the most likely cause?"], o: [["Il pool DHCP è esaurito", "The DHCP pool is exhausted"], ["Il server DNS è guasto", "The DNS server is down"], ["Un cavo di dorsale è danneggiato", "A backbone cable is damaged"]],
      sol: ["Cento indirizzi non bastano più per 60 PC, 30 portatili, telefoni e stampanti, e con un lease di 8 giorni gli indirizzi restano occupati. Si amplia lo scope (o si usa una subnet più grande) e si riduce il lease.", "A hundred addresses no longer cover 60 PCs, 30 laptops, phones and printers, and an 8-day lease keeps addresses tied up. Widen the scope (or use a larger subnet) and shorten the lease."],
      m: [["169.254.x.x = APIPA = il client non ha avuto risposta dal DHCP.", "169.254.x.x = APIPA = the client got no DHCP answer."], ["Chiediti sempre cosa è cambiato: qui, i 30 portatili.", "Always ask what changed: here, the 30 laptops."]] },
    { id: "loop", ex: "n", t: ["Il piccolo switch che ferma l'ufficio", "The little switch that stops the office"], refs: ["n:2.2", "n:5.3", "n:5.2"], dg: "trouble",
      s: ["Un dipendente porta da casa uno switch a 5 porte per avere più prese e lo collega con due cavi a due prese a muro. Dopo un minuto l'intero piano è bloccato.", "An employee brings a 5-port switch from home for extra sockets and plugs it into two wall jacks with two cables. A minute later the whole floor is frozen."],
      c: [["I LED di tutti gli switch lampeggiano senza sosta.", "LEDs on every switch blink constantly."], ["La CPU degli switch è al 100%.", "Switch CPU is at 100%."], ["Staccando uno dei due cavi tutto riparte.", "Unplugging one of the two cables restores everything."]],
      q: ["Cosa è successo?", "What happened?"], o: [["Un loop Layer 2 ha generato una broadcast storm", "A Layer 2 loop created a broadcast storm"], ["Lo switch ha esaurito il budget PoE", "The switch exceeded its PoE budget"], ["C'è un conflitto di indirizzi IP", "There is an IP address conflict"]],
      sol: ["Due collegamenti verso la stessa rete senza Spanning Tree creano un anello: i broadcast girano all'infinito. Si rimuove il loop e si protegge la rete con STP attivo, BPDU guard e port security sulle porte utente.", "Two links into the same network without Spanning Tree form a ring: broadcasts circulate forever. Remove the loop and protect the network with STP enabled, BPDU guard and port security on user ports."],
      m: [["Broadcast storm = loop a Layer 2 = problema di STP.", "Broadcast storm = Layer 2 loop = an STP problem."], ["Una porta bloccata da una protezione appare come error disabled.", "A port shut by a protection shows as error disabled."]] },
    { id: "wifi", ex: "n", t: ["Wi-Fi lento in sala riunioni", "Slow Wi-Fi in the meeting room"], refs: ["n:2.3", "n:5.4"], dg: null,
      s: ["In sala riunioni il Wi-Fi è lento solo quando la sala è piena. L'azienda ha aggiunto tre access point, tutti lasciati sul canale 6 a 2,4 GHz con potenza massima.", "In the meeting room Wi-Fi is slow only when the room is full. The company added three access points, all left on 2.4 GHz channel 6 at full power."],
      c: [["Il segnale è ottimo ovunque.", "Signal is excellent everywhere."], ["Con pochi utenti va bene.", "With few users it works fine."], ["I portatili restano agganciati all'AP più lontano.", "Laptops stay attached to the farthest AP."]],
      q: ["Qual è l'intervento più utile?", "What is the most useful fix?"], o: [["Distribuire gli AP sui canali 1, 6 e 11, ridurre la potenza e spingere i client a 5 GHz", "Spread APs over channels 1, 6 and 11, lower power and steer clients to 5 GHz"], ["Aumentare ancora la potenza degli AP", "Raise AP power further"], ["Allungare il lease DHCP", "Lengthen the DHCP lease"]],
      sol: ["Tre AP sullo stesso canale si disturbano a vicenda: più segnale non significa più velocità. Canali non sovrapposti, potenza ridotta per favorire il roaming e band steering verso 5 GHz risolvono.", "Three APs on one channel interfere with each other: more signal does not mean more speed. Non-overlapping channels, lower power to help roaming and band steering to 5 GHz fix it."],
      m: [["2,4 GHz: canali non sovrapposti 1, 6, 11.", "2.4 GHz: non-overlapping channels 1, 6, 11."], ["Segnale forte ma lento = interferenza o contesa, non copertura.", "Strong but slow = interference or contention, not coverage."]] },
    { id: "gw", ex: "n", t: ["La filiale che non vede il gestionale", "The branch that cannot reach the app"], refs: ["n:2.1", "n:5.5", "n:3.5"], dg: "vpn",
      s: ["Dopo la sostituzione del router in filiale, gli utenti navigano su Internet ma non raggiungono il gestionale in sede (10.10.0.20) attraverso la VPN.", "After the branch router was replaced, users browse the Internet but cannot reach the head-office application (10.10.0.20) over the VPN."],
      c: [["Il ping verso 8.8.8.8 funziona.", "Ping to 8.8.8.8 works."], ["Il tunnel VPN risulta attivo.", "The VPN tunnel shows as up."], ["traceroute verso 10.10.0.20 esce verso Internet invece che nel tunnel.", "traceroute to 10.10.0.20 leaves towards the Internet instead of the tunnel."]],
      q: ["Cosa manca nel nuovo router?", "What is missing on the new router?"], o: [["La rotta verso 10.10.0.0/16 attraverso il tunnel", "The route to 10.10.0.0/16 through the tunnel"], ["Il record DNS del gestionale", "The application's DNS record"], ["La VLAN voce", "The voice VLAN"]],
      sol: ["Senza una rotta specifica il traffico per la sede segue la default route verso Internet. Aggiunta la rotta per 10.10.0.0/16 nel tunnel, vince il prefisso più lungo e il gestionale torna raggiungibile.", "With no specific route, head-office traffic follows the default route to the Internet. Once the 10.10.0.0/16 route via the tunnel is added, the longest prefix wins and the app is reachable again."],
      m: [["traceroute mostra dove il percorso devia o si ferma.", "traceroute shows where the path diverges or stops."], ["Prefisso più lungo batte la default route.", "Longest prefix beats the default route."]] },
    { id: "voip", ex: "n", t: ["Telefonate a scatti", "Choppy phone calls"], refs: ["n:5.4", "n:2.2", "n:1.2"], dg: null,
      s: ["Ogni giorno verso le 13 le chiamate VoIP diventano a scatti per mezz'ora. Alla stessa ora parte il backup dei file verso il cloud.", "Every day around 1 pm VoIP calls turn choppy for half an hour. At the same time the file backup to the cloud starts."],
      c: [["La banda media giornaliera è ampiamente sufficiente.", "Average daily bandwidth is more than enough."], ["Durante il problema il jitter supera i 60 ms.", "During the problem jitter exceeds 60 ms."], ["Telefoni e PC sono nella stessa VLAN, senza priorità.", "Phones and PCs share one VLAN, with no priority."]],
      q: ["Qual è la soluzione corretta?", "What is the right solution?"], o: [["Voice VLAN e QoS per dare priorità alla voce, backup spostato o limitato", "Voice VLAN and QoS to prioritise voice, backup moved or rate limited"], ["Sostituire tutti i cavi con Cat 8", "Replace all cables with Cat 8"], ["Disattivare lo Spanning Tree", "Disable Spanning Tree"]],
      sol: ["La voce soffre il jitter più della mancanza di banda. Separare i telefoni in una voice VLAN e applicare QoS garantisce la priorità; spostare il backup di notte toglie la congestione.", "Voice suffers from jitter more than from low bandwidth. Putting phones in a voice VLAN and applying QoS guarantees priority; moving the backup to night removes the congestion."],
      m: [["Voce a scatti = jitter.", "Choppy voice = jitter."], ["QoS dà priorità, non aggiunge banda.", "QoS prioritises; it does not add bandwidth."]] },
    { id: "bec", ex: "s", t: ["La mail urgente del direttore", "The director's urgent email"], refs: ["s:2.5", "s:4.1", "s:5.6"], dg: "mail",
      s: ["La contabilità riceve una mail che sembra del direttore: chiede un bonifico urgente a un nuovo fornitore e di non telefonare perché è in riunione.", "Accounts receives an email that looks like it is from the director: it asks for an urgent transfer to a new supplier and says not to call because he is in a meeting."],
      c: [["Il dominio mittente differisce di una lettera da quello aziendale.", "The sender domain differs by one letter from the company's."], ["Tono di urgenza e richiesta di segretezza.", "Urgent tone and a request for secrecy."], ["L'IBAN è di un Paese con cui l'azienda non lavora.", "The IBAN is from a country the company does not deal with."]],
      q: ["Cosa deve fare l'impiegata?", "What should the employee do?"], o: [["Verificare con il direttore tramite un canale diverso e segnalare la mail", "Verify with the director through a different channel and report the email"], ["Eseguire il bonifico e avvisare dopo", "Make the transfer and tell someone later"], ["Rispondere alla mail chiedendo conferma", "Reply to the email asking for confirmation"]],
      sol: ["È una business email compromise. La difesa è una procedura: verifica fuori banda per ogni pagamento insolito, più formazione e controlli tecnici (SPF, DKIM, DMARC) che ostacolano i domini falsificati.", "This is business email compromise. The defence is a procedure: out-of-band verification for any unusual payment, plus training and technical controls (SPF, DKIM, DMARC) that hinder spoofed domains."],
      m: [["Urgenza + segretezza + pagamento = BEC.", "Urgency + secrecy + payment = BEC."], ["Rispondere alla stessa mail non verifica nulla: risponde l'attaccante.", "Replying to the same email verifies nothing: the attacker answers."]] },
    { id: "ransom", ex: "s", t: ["Ransomware il venerdì sera", "Ransomware on Friday evening"], refs: ["s:4.7", "s:3.4", "s:2.5"], dg: "ir",
      s: ["Venerdì alle 19 un file server mostra file cifrati e una richiesta di riscatto. Altri due PC iniziano a mostrare lo stesso comportamento.", "On Friday at 7 pm a file server shows encrypted files and a ransom note. Two more PCs start showing the same behaviour."],
      c: [["La cifratura si sta ancora propagando sulle condivisioni di rete.", "Encryption is still spreading across network shares."], ["I backup notturni sono su uno storage immutabile.", "Nightly backups are on immutable storage."], ["Non è ancora chiaro da dove sia entrato.", "It is not yet clear how it got in."]],
      q: ["Qual è la prima azione?", "What is the first action?"], o: [["Isolare dalla rete i sistemi colpiti", "Isolate affected systems from the network"], ["Ripristinare subito i backup", "Restore the backups straight away"], ["Formattare il file server", "Format the file server"]],
      sol: ["Prima si contiene: isolare i sistemi ferma la propagazione e conserva le prove. Poi si analizza l'ingresso, si elimina la causa e solo allora si ripristina dai backup immutabili. Infine notifiche obbligatorie e lessons learned.", "Contain first: isolating systems stops the spread and preserves evidence. Then analyse the entry point, remove the cause and only then restore from the immutable backups. Finally mandatory notifications and lessons learned."],
      m: [["Ordine: containment, eradication, recovery.", "Order: containment, eradication, recovery."], ["Ripristinare prima di eliminare la causa significa reinfettarsi.", "Restoring before removing the cause means reinfection."]] },
    { id: "bucket", ex: "s", t: ["Lo storage cloud aperto a tutti", "The cloud storage open to everyone"], refs: ["s:2.4", "s:4.3", "s:3.1"], dg: null,
      s: ["Un ricercatore esterno avvisa che un archivio cloud dell'azienda, con contratti di clienti, è leggibile da chiunque abbia il link.", "An outside researcher warns that a company cloud store holding customer contracts is readable by anyone with the link."],
      c: [["Lo storage è stato creato da uno sviluppatore per un test.", "The store was created by a developer for a test."], ["Il provider cloud non ha subito alcuna violazione.", "The cloud provider suffered no breach."], ["Nessuno strumento controllava le configurazioni.", "No tool was checking configurations."]],
      q: ["Di chi è la responsabilità e come si previene?", "Whose responsibility is it and how is it prevented?"], o: [["Del cliente: è una misconfiguration, da prevenire con CSPM e policy", "The customer's: it is a misconfiguration, prevented with CSPM and policy"], ["Del provider cloud, che deve bloccare gli accessi pubblici", "The cloud provider's, which must block public access"], ["Del ricercatore, che non doveva guardare", "The researcher's, who should not have looked"]],
      sol: ["Nel modello di responsabilità condivisa la configurazione dei dati è del cliente. Si chiude l'accesso, si valuta l'esposizione e si adotta un CSPM che segnala gli storage pubblici, con una responsible disclosure policy per chi segnala.", "Under shared responsibility, data configuration belongs to the customer. Close access, assess the exposure and adopt a CSPM that flags public storage, with a responsible disclosure policy for reporters."],
      m: [["Object storage pubblico = misconfiguration, non attacco al provider.", "Public object storage = misconfiguration, not an attack on the provider."], ["CSPM = controllo continuo delle configurazioni cloud.", "CSPM = continuous checking of cloud configurations."]] },
    { id: "vendor", ex: "s", t: ["Il fornitore compromesso", "The compromised supplier"], refs: ["s:2.3", "s:5.3", "s:4.5"], dg: null,
      s: ["Il fornitore che gestisce da remoto il sistema di climatizzazione subisce una violazione. Il suo account ha accesso permanente alla rete aziendale, la stessa dei server.", "The supplier remotely managing the air-conditioning system is breached. Its account has permanent access to the corporate network, the same one as the servers."],
      c: [["L'account del fornitore non ha MFA.", "The supplier account has no MFA."], ["Il contratto non prevede verifiche di sicurezza.", "The contract has no security checks."], ["Il sistema di climatizzazione non è segmentato.", "The air-conditioning system is not segmented."]],
      q: ["Quale combinazione riduce meglio questo rischio?", "Which combination best reduces this risk?"], o: [["Segmentazione, accesso just-in-time con MFA e clausola right-to-audit", "Segmentation, just-in-time access with MFA and a right-to-audit clause"], ["Un antivirus più recente sui server", "A newer antivirus on the servers"], ["Cambiare la password una volta l'anno", "Changing the password once a year"]],
      sol: ["È un rischio di supply chain. Sul piano tecnico: sistemi OT segmentati e accesso del fornitore solo quando serve, con MFA. Sul piano contrattuale: due diligence, right-to-audit e monitoraggio del fornitore.", "This is supply chain risk. Technically: segmented OT systems and supplier access only when needed, with MFA. Contractually: due diligence, right to audit and vendor monitoring."],
      m: [["Account di terze parti: least privilege e just-in-time.", "Third-party accounts: least privilege and just-in-time."], ["Right-to-audit = diritto di verificare i controlli del fornitore.", "Right to audit = the right to verify the supplier's controls."]] },
    { id: "creep", ex: "s", t: ["Tre ruoli, tutti i permessi", "Three roles, every permission"], refs: ["s:3.2", "s:4.5", "s:1.1"], dg: "zt",
      s: ["Una dipendente è passata in cinque anni da magazzino a contabilità a risorse umane. Un audit scopre che può ancora modificare ordini, pagamenti e buste paga.", "In five years an employee moved from warehouse to accounts to HR. An audit finds she can still change orders, payments and payroll."],
      c: [["Ogni cambio di ruolo ha aggiunto permessi, senza toglierne.", "Each role change added permissions without removing any."], ["Non esistono revisioni periodiche degli accessi.", "There are no periodic access reviews."], ["I permessi sono assegnati alla persona, non al ruolo.", "Permissions are assigned to the person, not the role."]],
      q: ["Come si chiama il problema e qual è il rimedio?", "What is the problem called and what is the remedy?"], o: [["Privilege creep: RBAC e access review periodiche", "Privilege creep: RBAC and periodic access reviews"], ["Privilege escalation: installare una patch", "Privilege escalation: install a patch"], ["Shadow IT: bloccare i servizi cloud", "Shadow IT: block cloud services"]],
      sol: ["Il privilege creep è l'accumulo di permessi nel tempo. Si risolve assegnando i permessi al ruolo (RBAC), togliendo quelli vecchi a ogni cambio e verificando periodicamente con access review.", "Privilege creep is permissions piling up over time. It is fixed by assigning permissions to the role (RBAC), removing old ones at each change and checking periodically with access reviews."],
      m: [["Creep = accumulo lento e legittimo; escalation = attacco.", "Creep = slow, legitimate build-up; escalation = an attack."], ["Least privilege va mantenuto nel tempo, non solo all'assunzione.", "Least privilege must be maintained over time, not only at hiring."]] },
    { id: "ai", ex: "s", t: ["L'assistente IA troppo obbediente", "The over-obedient AI assistant"], refs: ["s:2.6", "s:4.6"], dg: "prompt",
      s: ["L'azienda collega un assistente IA alla posta e all'archivio documenti. Un cliente invia un PDF; il riassunto prodotto dall'assistente contiene dati di un altro cliente.", "The company connects an AI assistant to mail and the document archive. A customer sends a PDF; the assistant's summary contains another customer's data."],
      c: [["Nel PDF c'è testo bianco su bianco con istruzioni per il modello.", "The PDF holds white-on-white text with instructions for the model."], ["L'assistente può leggere tutto l'archivio.", "The assistant can read the whole archive."], ["Nessuno controlla le risposte prima dell'invio.", "Nobody checks answers before they are sent."]],
      q: ["Quale rischio si è verificato?", "Which risk occurred?"], o: [["Prompt injection con perdita di dati", "Prompt injection with data loss"], ["Data poisoning del modello", "Data poisoning of the model"], ["Hallucination", "Hallucination"]],
      sol: ["Le istruzioni nascoste nel documento hanno deviato il modello. Si limita ciò che l'assistente può leggere (least privilege), si trattano i contenuti esterni come dati e si aggiunge un controllo umano sulle azioni sensibili.", "Hidden instructions in the document redirected the model. Limit what the assistant can read (least privilege), treat external content as data and add human review of sensitive actions."],
      m: [["Injection colpisce l'uso; poisoning colpisce l'addestramento.", "Injection targets use; poisoning targets training."], ["Anche per l'IA valgono least privilege e guard rail.", "Least privilege and guard rails apply to AI too."]] },
    { id: "ale", ex: "s", t: ["Conviene comprare il controllo?", "Is the control worth buying?"], refs: ["s:5.2"], dg: "risk",
      s: ["Un negozio online vale 200 000. Un fermo di un giorno fa perdere il 10% e capita due volte l'anno. Un servizio di protezione da 15 000 l'anno ridurrebbe gli episodi a uno ogni due anni.", "An online shop is worth 200,000. A one-day outage loses 10% and happens twice a year. A 15,000-a-year protection service would cut events to one every two years."],
      c: [["SLE = 200 000 x 10% = 20 000.", "SLE = 200,000 x 10% = 20,000."], ["ALE attuale = 20 000 x 2 = 40 000.", "Current ALE = 20,000 x 2 = 40,000."], ["ALE con il controllo = 20 000 x 0,5 = 10 000.", "ALE with the control = 20,000 x 0.5 = 10,000."]],
      q: ["Conviene acquistare il servizio?", "Is the service worth buying?"], o: [["Sì: riduce la perdita annua di 30 000 e ne costa 15 000", "Yes: it cuts yearly loss by 30,000 and costs 15,000"], ["No: costa più del singolo evento", "No: it costs more than a single event"], ["Non si può dire senza un'analisi qualitativa", "Impossible to say without a qualitative analysis"]],
      sol: ["Si confronta il risparmio sull'ALE con il costo annuo: 40 000 - 10 000 = 30 000 risparmiati contro 15 000 spesi. Il controllo conviene; i 10 000 che restano sono il residual risk.", "Compare the ALE saving with the yearly cost: 40,000 - 10,000 = 30,000 saved against 15,000 spent. The control pays off; the remaining 10,000 is the residual risk."],
      m: [["Un controllo conviene se costa meno della riduzione di ALE.", "A control pays off if it costs less than the ALE reduction."], ["Ciò che resta dopo il controllo è il residual risk.", "What remains after the control is residual risk."]] }
  ];
  var cBy = {}; CASES.forEach(function (c) { cBy[c.id] = c; });
  var ls = { tab: "dg", ex: "all", open: null, ans: null, order: null };
  function openCase(id) { ls.tab = "cases"; ls.open = id; ls.ans = null; var o = [0, 1, 2]; for (var i = 2; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = o[i]; o[i] = o[j]; o[j] = x; } ls.order = o; }
  function caseHTML(c) {
    var d = ls.ans !== null, idx = CASES.indexOf(c), nx = CASES[(idx + 1) % CASES.length];
    var h = '<article class="panel case ex-' + c.ex + '"><button class="link" data-lback="1">← ' + t("back") + '</button><p class="eyebrow">' + EX[c.ex].name + "</p><h2>" + esc(L(c.t)) + "</h2><h3>" + t("sit") + "</h3><p>" + esc(L(c.s)) + "</p><h3>" + t("clues") + '</h3><ul class="clues">' + c.c.map(function (x) { return "<li>" + esc(L(x)) + "</li>"; }).join("") + '</ul><p class="bigq sm2">' + esc(L(c.q)) + '</p><div class="opts">' + ls.order.map(function (oi, i) {
      var cls = "opt"; if (d) { if (oi === 0) cls += " ok"; else if (i === ls.ans) cls += " bad"; }
      return '<button class="' + cls + '" data-copt="' + i + '"' + (d ? " disabled" : "") + "><b>" + "ABC"[i] + "</b><span>" + esc(L(c.o[oi])) + "</span></button>";
    }).join("") + "</div>";
    if (d) {
      h += '<div class="fb ' + (ls.order[ls.ans] === 0 ? "ok" : "bad") + '"><p><b>' + (ls.order[ls.ans] === 0 ? t("right") : t("wrong")) + "</b></p></div><h3>" + t("sol") + "</h3><p>" + esc(L(c.sol)) + "</p><h3>" + t("mem") + '</h3><ul class="memo">' + c.m.map(function (x) { return "<li>" + esc(L(x)) + "</li>"; }).join("") + "</ul>" + (c.dg ? dgDetails(c.dg, false) : "") + "<h3>" + t("rel") + '</h3><div class="chips">' + c.refs.map(Hub.refChip).join("") + '</div><div class="row"><button class="btn primary" data-case="' + nx.id + '">' + t("nextCase") + " →</button>" + vlink("CompTIA " + EX[c.ex].name + " " + c.t[1]) + "</div>";
    }
    return h + "</article>";
  }
  function html() {
    var h = '<div class="learnview"><header class="hero slim"><h1>' + t("title") + '</h1><p class="lead">' + t("lead") + '</p></header><div class="seg2" role="tablist">' + [["dg", t("dg") + " (" + D.length + ")"], ["cases", t("cases") + " (" + CASES.length + ")"], ["video", t("video")]].map(function (m) { return '<button role="tab" aria-selected="' + (ls.tab === m[0]) + '" data-ltab="' + m[0] + '">' + m[1] + "</button>"; }).join("") + "</div>";
    if (ls.tab === "cases" && ls.open) return h + caseHTML(cBy[ls.open]) + "</div>";
    if (ls.tab !== "video") h += '<div class="tabs">' + ["all", "n", "s"].map(function (k) { return '<button class="tab ' + (k === "all" ? "" : "ex-" + k) + '" aria-selected="' + (ls.ex === k) + '" data-lex="' + k + '">' + (k === "all" ? t("all") : EX[k].name) + "</button>"; }).join("") + "</div>";
    if (ls.tab === "dg") h += D.filter(function (d) { return ls.ex === "all" || d.refs.some(function (r) { return r.charAt(0) === ls.ex; }); }).map(function (d) { return '<section class="panel dgcard" id="dg-' + d.id + '">' + dgHTML(d.id) + '<div class="chips">' + d.refs.map(Hub.refChip).join("") + "</div></section>"; }).join("");
    else if (ls.tab === "cases") h += '<div class="caselist">' + CASES.filter(function (c) { return ls.ex === "all" || c.ex === ls.ex; }).map(function (c) { return '<button class="casecard ex-' + c.ex + '" data-case="' + c.id + '"><span class="eyebrow">' + EX[c.ex].name + (st.cases[c.id] ? " · ✓ " + t("solved") : "") + "</span><b>" + esc(L(c.t)) + "</b><span>" + esc(L(c.s).slice(0, 110)) + "…</span></button>"; }).join("") + "</div>";
    else {
      h += '<section class="panel"><h2>' + t("course") + '</h2><p class="muted sm">' + t("vLead") + '</p><div class="vlist"><a class="btn" href="https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/" target="_blank" rel="noopener">' + t("cN") + ' ↗</a><a class="btn" href="https://www.professormesser.com/?p=630435" target="_blank" rel="noopener">' + t("cS") + ' ↗</a></div><p class="fine">' + t("cSnote") + "</p></section>";
      ["n", "s"].forEach(function (k) { h += '<section class="panel ex-' + k + '"><h2>' + t("byTopic") + " · " + EX[k].name + "</h2>" + EX[k].domains.map(function (d) { return "<h3>" + d.num + ". " + esc(L(d.t)) + '</h3><div class="chips">' + d.objs.map(function (o) { return '<a class="chip" href="' + yt("CompTIA " + EX[k].name + " " + EX[k].code + " " + o.n + " " + o.t[1]) + '" target="_blank" rel="noopener"><b>' + o.n + "</b> " + esc(L(o.t)) + " ↗</a>"; }).join("") + "</div>"; }).join("") + "</section>"; });
    }
    return h + "</div>";
  }
  function mount(root) {
    root.querySelector(".learnview").addEventListener("click", function (e) {
      var b = e.target.closest("[data-ltab],[data-lex],[data-copt],[data-lback]"); if (!b) return; var d = b.dataset;
      if (d.ltab) { ls.tab = d.ltab; ls.open = null; } else if (d.lex) ls.ex = d.lex; else if (d.lback) ls.open = null;
      else if (d.copt != null) { if (ls.ans !== null) return; ls.ans = +d.copt; st.cases[ls.open] = 1; Hub.save(); }
      Hub.render(); if (d.ltab || d.lback) window.scrollTo(0, 0);
    });
    if (ls.focus) { var el = document.getElementById("dg-" + ls.focus); ls.focus = null; if (el) setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 60); }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-case],[data-dgo]"); if (!b) return;
    if (b.dataset["case"]) { openCase(b.dataset["case"]); if (Hub.view() === "learn") { Hub.render(); window.scrollTo(0, 0); } else Hub.go("impara"); }
    else { ls.tab = "dg"; ls.ex = "all"; ls.open = null; ls.focus = b.dataset.dgo; Hub.go("impara"); }
  });
  Hub.views.learn = { html: html, mount: mount };
  Hub.objExtra = function (ex, o) {
    var ref = ex.key + ":" + o.n, dgs = D.filter(function (d) { return d.refs.indexOf(ref) >= 0; }), cs = CASES.filter(function (c) { return c.refs.indexOf(ref) >= 0; });
    return '<div class="xtra">' + dgs.map(function (d) { return dgDetails(d.id, false); }).join("") + '<div class="row">' + cs.map(function (c) { return '<button class="btn sm" data-case="' + c.id + '">' + t("caseBtn") + ": " + esc(L(c.t)) + "</button>"; }).join("") + vlink("CompTIA " + ex.name + " " + ex.code + " " + o.n + " " + o.t[1]) + "</div></div>";
  };
  Hub.conExtra = function (c) {
    var dgs = D.filter(function (d) { return d.cons.indexOf(c[0]) >= 0; });
    return '<div class="xtra">' + dgs.map(function (d) { return dgDetails(d.id, false); }).join("") + '<div class="row ctrrow">' + vlink("CompTIA " + c[0] + " explained") + "</div></div>";
  };
  Hub.learnCounts = function () { return { dg: D.length, cases: CASES.length, done: Object.keys(st.cases).length }; };
});
