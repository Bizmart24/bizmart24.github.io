DATA.exams.s = {
  key: "s", name: "Security+", code: "SY0-801", ver: "V8", hash: "security",
  questions: 90, minutes: 90, pass: 750,
  launched: ["17 novembre 2026", "November 17, 2026"],
  exp: ["Circa 2 anni di esperienza pratica come security administrator", "About 2 years of hands-on experience as a security administrator"],
  note: ["SY0-801 è la nuova versione (solo in inglese). La precedente SY0-701 resta prenotabile in inglese fino all'11 giugno 2027: entrambe danno la stessa certificazione. Questo hub segue SY0-801; i punti indicati come novità non sono nella 701.", "SY0-801 is the new version (English only). The previous SY0-701 stays bookable in English until June 11, 2027: both earn the same certification. This hub follows SY0-801; items flagged as new are not in 701."],
  official: "https://www.comptia.org/en-us/certifications/security/",
  domains: [
    { num: 1, w: 16, t: ["Concetti generali di sicurezza", "General Security Concepts"], objs: [
      { n: "1.1", t: ["Concetti e controlli di sicurezza", "Explain security concepts and controls"], p: [
        ["Categorie di controlli: technical (firewall, cifratura), managerial (policy, analisi del rischio), operational (formazione, procedure svolte da persone), physical (serrature, recinzioni).", "Control categories: technical (firewall, encryption), managerial (policies, risk assessment), operational (training, people-run procedures), physical (locks, fences)."],
        ["Tipi di controlli: preventive, deterring (scoraggia), detective (rileva), corrective (ripristina), compensating (alternativa quando il controllo principale non è possibile), directive (istruisce).", "Control types: preventive, deterring, detective, corrective, compensating (alternative when the primary control is not feasible), directive."],
        ["Triade CIA: Confidentiality, Integrity, Availability. Non-repudiation: non si può negare di aver compiuto un'azione (firma digitale).", "CIA triad: Confidentiality, Integrity, Availability. Non-repudiation: an action cannot be denied (digital signature)."],
        ["AAA: Authentication (chi sei), Authorization (cosa puoi fare), Accounting (cosa hai fatto).", "AAA: Authentication (who you are), Authorization (what you may do), Accounting (what you did)."],
        ["Defence in depth: più livelli di difesa sovrapposti. Least privilege: solo i permessi necessari.", "Defence in depth: layered overlapping defences. Least privilege: only the permissions needed."],
        ["Zero Trust: nessuna fiducia implicita. Control plane (policy engine, policy administrator) e data plane (policy enforcement point); identità adattiva, riduzione della superficie di minaccia.", "Zero Trust: no implicit trust. Control plane (policy engine, policy administrator) and data plane (policy enforcement point); adaptive identity, threat scope reduction."]
      ], x: ["Distingui categoria e tipo: una telecamera è physical (categoria) e detective (tipo); un cartello di avviso è deterring.", "Separate category from type: a camera is physical (category) and detective (type); a warning sign is deterring."] },
      { n: "1.2", t: ["Change management e sicurezza", "Given a scenario, demonstrate the impact of change management processes on security"], p: [
        ["Processo: richiesta, approvazione, owner, stakeholder, impact analysis, risultati dei test.", "Process: request, approval, ownership, stakeholders, impact analysis, test results."],
        ["Backout planning: come tornare allo stato precedente se la modifica fallisce.", "Backout planning: how to return to the previous state if the change fails."],
        ["Maintenance window: finestra concordata per ridurre l'impatto; valutare downtime e riavvii di servizi e applicazioni.", "Maintenance window: agreed slot to limit impact; assess downtime and service or application restarts."],
        ["Implicazioni tecniche: allow list e deny list, attività limitate, applicazioni legacy, dipendenze.", "Technical implications: allow lists and deny lists, restricted activities, legacy applications, dependencies."],
        ["Documentazione: aggiornare diagrammi, policy e procedure. Version control per tracciare le modifiche.", "Documentation: update diagrams, policies and procedures. Version control to track changes."],
        ["Novità 801: obiettivo ora basato su scenario.", "New in 801: this objective is now scenario based."]
      ] },
      { n: "1.3", t: ["Soluzioni crittografiche", "Explain the importance of using appropriate cryptographic solutions"], p: [
        ["Simmetrica: una sola chiave condivisa, veloce (AES). Asimmetrica: coppia pubblica e privata, più lenta (RSA, ECC).", "Symmetric: one shared key, fast (AES). Asymmetric: public and private key pair, slower (RSA, ECC)."],
        ["Key exchange: scambio sicuro della chiave di sessione (Diffie-Hellman).", "Key exchange: securely agreeing a session key (Diffie-Hellman)."],
        ["Hashing: impronta a senso unico per l'integrità (SHA-256). Salting: valore casuale aggiunto alla password prima dell'hash, contro le rainbow table.", "Hashing: one-way fingerprint for integrity (SHA-256). Salting: random value added to a password before hashing, defeats rainbow tables."],
        ["Firma digitale: hash cifrato con la chiave privata; garantisce integrità, autenticità e non-repudiation.", "Digital signature: hash encrypted with the private key; gives integrity, authenticity and non-repudiation."],
        ["PKI: CA (Certificate Authority), CSR (richiesta di firma), catena di fiducia, root of trust.", "PKI: CA (Certificate Authority), CSR (signing request), chain of trust, root of trust."],
        ["Certificati: revoca tramite CRL (lista) o OCSP (verifica in tempo reale); wildcard (*.dominio), self-signed (non firmato da una CA fidata).", "Certificates: revocation via CRL (list) or OCSP (real-time check); wildcard (*.domain), self-signed (not signed by a trusted CA)."],
        ["Livelli di cifratura: full-disk, partizione, file, volume, database, record; in transito (TLS).", "Encryption levels: full-disk, partition, file, volume, database, record; in transit (TLS)."]
      ], x: ["Riservatezza: si cifra con la chiave pubblica del destinatario. Firma: si firma con la propria chiave privata.", "Confidentiality: encrypt with the recipient's public key. Signature: sign with your own private key."] }
    ] },
    { num: 2, w: 24, t: ["Minacce, vulnerabilità e attacchi", "Threats, Vulnerabilities, and Attacks"], objs: [
      { n: "2.1", t: ["Caratteristiche di minacce e vulnerabilità", "Explain characteristics of threats and vulnerabilities"], p: [
        ["Novità 801: obiettivo nuovo dedicato a come si descrivono e misurano minacce e vulnerabilità.", "New in 801: a new objective on how threats and vulnerabilities are described and measured."],
        ["Likelihood (probabilità) e impact (impatto) determinano il livello di rischio.", "Likelihood and impact determine the level of risk."],
        ["Threat intelligence: threat feed, OSINT, fonti proprietarie o di terze parti, organizzazioni di information sharing, dark web.", "Threat intelligence: threat feeds, OSINT, proprietary or third-party sources, information-sharing organisations, dark web."],
        ["CVE (Common Vulnerabilities and Exposures): identificativo univoco di una vulnerabilità nota.", "CVE (Common Vulnerabilities and Exposures): unique identifier of a known vulnerability."],
        ["CVSS: punteggio di gravità da 0 a 10 (9.0-10.0 = critical).", "CVSS: severity score from 0 to 10 (9.0-10.0 = critical)."]
      ] },
      { n: "2.2", t: ["Threat actor e motivazioni", "Describe common threat actors and motivations"], p: [
        ["Attori: state-sponsored (risorse elevate, APT), crime syndicate / organized crime (profitto), hacktivist (ideologia), insider threat, unskilled attacker, competitor, shadow IT.", "Actors: state-sponsored (high resources, APT), crime syndicate / organized crime (profit), hacktivist (ideology), insider threat, unskilled attacker, competitor, shadow IT."],
        ["Attributi: interno o esterno, risorse e finanziamento, livello di sofisticazione.", "Attributes: internal or external, resources and funding, level of sophistication."],
        ["Motivazioni: esfiltrazione dati, spionaggio, interruzione del servizio, extortion, guadagno economico, ideologiche, politiche, etiche, vendetta, fear / chaos, guerra.", "Motivations: data exfiltration, espionage, service disruption, extortion, financial gain, ideological, political, ethical, revenge, fear / chaos, war."]
      ] },
      { n: "2.3", t: ["Vettori e fonti di minaccia", "Describe threat vectors and sources"], p: [
        ["Message-based: email, SMS, instant messaging. File e allegati malevoli.", "Message-based: email, SMS, instant messaging. Malicious files and attachments."],
        ["Image-based: QR code, CAPTCHA falsi. Browser-based: estensioni malevole, furto di session token.", "Image-based: QR codes, fake CAPTCHAs. Browser-based: malicious extensions, session token theft."],
        ["Remote access: RDP, VNC, VPN esposti. Living-off-the-land: uso di strumenti legittimi già presenti nel sistema.", "Remote access: exposed RDP, VNC, VPN. Living-off-the-land: abuse of legitimate tools already on the system."],
        ["Supply chain: MSP, fornitori, software di terze parti. Removable media (USB).", "Supply chain: MSPs, vendors, third-party software. Removable media (USB)."],
        ["Reti e dispositivi: wireless non sicuro, Bluetooth, NFC, IoT, OT, porte e servizi aperti, credenziali di default, sistemi non supportati.", "Networks and devices: insecure wireless, Bluetooth, NFC, IoT, OT, open ports and services, default credentials, unsupported systems."]
      ] },
      { n: "2.4", t: ["Tipi di vulnerabilità e superfici di attacco", "Explain types of vulnerabilities and attack surfaces"], p: [
        ["Applicazione: memory injection, buffer overflow, race condition (TOC/TOU), hardcoded secret, aggiornamenti malevoli.", "Application: memory injection, buffer overflow, race conditions (TOC/TOU), hardcoded secrets, malicious updates."],
        ["Sistemi non supportati o senza patch, zero-day (nessuna patch disponibile), misconfiguration.", "Unsupported or unpatched systems, zero-day (no patch available), misconfiguration."],
        ["Cloud: object storage pubblico, permessi eccessivi. Virtualizzazione: VM escape, riuso delle risorse.", "Cloud: public object storage, excessive permissions. Virtualisation: VM escape, resource reuse."],
        ["Rogue device e shadow IT ampliano la superficie di attacco senza controllo.", "Rogue devices and shadow IT widen the attack surface without oversight."],
        ["Mobile: sideloading, jailbreaking. Supply chain: fornitori di hardware, software e servizi. Novità 801: gli LLM compaiono come superficie di attacco.", "Mobile: sideloading, jailbreaking. Supply chain: hardware, software and service providers. New in 801: LLMs appear as an attack surface."]
      ] },
      { n: "2.5", t: ["Indicatori di attività malevola", "Given a scenario, analyze indicators of malicious activity"], p: [
        ["Malware: ransomware, trojan, worm (si propaga da solo), spyware, keylogger, logic bomb, rootkit, virus, fileless malware (vive in memoria).", "Malware: ransomware, trojan, worm (self-propagating), spyware, keylogger, logic bomb, rootkit, virus, fileless malware (lives in memory)."],
        ["Rete: DDoS (amplified, reflected), attacchi DNS, wireless, on-path, credential replay, protocol downgrade.", "Network: DDoS (amplified, reflected), DNS attacks, wireless, on-path, credential replay, protocol downgrade."],
        ["Applicazione: injection, buffer overflow, replay, privilege escalation, forgery, directory traversal.", "Application: injection, buffer overflow, replay, privilege escalation, forgery, directory traversal."],
        ["Credenziali: password spraying (poche password su molti account), brute force, credential stuffing, MFA bypass, user enumeration.", "Credentials: password spraying (few passwords across many accounts), brute force, credential stuffing, MFA bypass, user enumeration."],
        ["Social engineering: phishing, spear phishing, whaling (dirigenti), vishing, smishing, quishing (QR code), deepfake, BEC, pretexting, tailgating.", "Social engineering: phishing, spear phishing, whaling (executives), vishing, smishing, quishing (QR code), deepfakes, BEC, pretexting, tailgating."],
        ["Fisici: brute force, skimming, RFID cloning. Indicatori: account lockout, impossible travel, accessi concorrenti, log mancanti, consumo anomalo di risorse.", "Physical: brute force, skimming, RFID cloning. Indicators: account lockout, impossible travel, concurrent sessions, missing logs, abnormal resource consumption."],
        ["IoC (Indicators of Compromise): hash di file, indirizzi IP, domini, timestamp, stringhe in chiaro.", "IoCs (Indicators of Compromise): file hashes, IP addresses, domains, timestamps, plaintext strings."]
      ] },
      { n: "2.6", t: ["Minacce e vulnerabilità legate all'IA", "Summarize threats and vulnerabilities associated with artificial intelligence (AI) usage"], p: [
        ["Novità 801: primo obiettivo interamente dedicato all'intelligenza artificiale.", "New in 801: the first objective fully dedicated to artificial intelligence."],
        ["Prompt injection: istruzioni malevole inserite nell'input per deviare il modello. Jailbreaking: aggirare le protezioni del modello.", "Prompt injection: malicious instructions in the input that redirect the model. Jailbreaking: bypassing the model's safeguards."],
        ["Data poisoning: dati di addestramento manipolati. Model manipulation ed evasion: input costruiti per ingannare il modello.", "Data poisoning: tampered training data. Model manipulation and evasion: inputs crafted to fool the model."],
        ["Hallucination: risposte false ma plausibili. Bias: risultati distorti dai dati.", "Hallucinations: false but plausible answers. Bias: results skewed by the data."],
        ["Data loss e privacy: dati sensibili inseriti nei prompt o esposti dalle risposte. Session hijacking verso i servizi IA.", "Data loss and privacy: sensitive data placed in prompts or exposed in answers. Session hijacking against AI services."]
      ], x: ["Poisoning colpisce l'addestramento; prompt injection e jailbreaking colpiscono l'uso del modello.", "Poisoning targets training; prompt injection and jailbreaking target the model in use."] }
    ] },
    { num: 3, w: 19, t: ["Architettura di sicurezza", "Security Architecture"], objs: [
      { n: "3.1", t: ["Modelli di architettura", "Compare and contrast security implications of different architecture models"], p: [
        ["Cloud: matrice di responsabilità condivisa, hybrid, multicloud, fornitori terzi.", "Cloud: shared responsibility matrix, hybrid, multicloud, third-party vendors."],
        ["IaC (Infrastructure as Code), serverless, microservizi, container.", "IaC (Infrastructure as Code), serverless, microservices, containers."],
        ["On-premises, centralizzato contro decentralizzato, virtualizzazione.", "On-premises, centralised versus decentralised, virtualisation."],
        ["Air-gapped (isolamento fisico), segmentazione logica, SDN.", "Air-gapped (physical isolation), logical segmentation, SDN."],
        ["OT / ICS / SCADA, IoT, RTOS, embedded: difficili da patchare, priorità alla disponibilità.", "OT / ICS / SCADA, IoT, RTOS, embedded: hard to patch, availability comes first."],
        ["Fattori: disponibilità, resilienza, costo, reattività, scalabilità, facilità di deploy e di ripristino, patch availability.", "Considerations: availability, resilience, cost, responsiveness, scalability, ease of deployment and recovery, patch availability."]
      ] },
      { n: "3.2", t: ["Gestire l'architettura per proteggere l'infrastruttura", "Given a scenario, manage the security architecture to best protect the infrastructure"], p: [
        ["Posizionamento dei dispositivi, security zone, superficie di attacco, connettività.", "Device placement, security zones, attack surface, connectivity."],
        ["Failure mode: fail-open (resta aperto, privilegia la disponibilità) contro fail-closed (blocca, privilegia la sicurezza).", "Failure modes: fail-open (stays open, favours availability) versus fail-closed (blocks, favours security)."],
        ["Dispositivi: inline contro tap/monitor, attivi contro passivi; jump server, proxy, IPS/IDS, load balancer, sensori.", "Devices: inline versus tap/monitor, active versus passive; jump server, proxy, IPS/IDS, load balancer, sensors."],
        ["Firewall: WAF (applicazioni web), NGFW (ispezione applicativa), Layer 4 contro Layer 7.", "Firewalls: WAF (web applications), NGFW (application inspection), Layer 4 versus Layer 7."],
        ["Accesso remoto: VPN, tunneling con TLS e IPsec. Novità 801: Zero Trust architecture e SSE (Security Service Edge) al posto di SASE.", "Remote access: VPN, tunnelling with TLS and IPsec. New in 801: Zero Trust architecture and SSE (Security Service Edge) replacing SASE."],
        ["Identità: gestione degli account, gMSA (Group Managed Service Account), privilege creep (accumulo di permessi nel tempo).", "Identity: account management, gMSA (Group Managed Service Accounts), privilege creep (permissions piling up over time)."]
      ] },
      { n: "3.3", t: ["Protezione dei dati", "Summarize concepts and strategies used to protect data"], p: [
        ["Tipi: regulated, trade secret, proprietà intellettuale, legali, finanziari. Classificazioni: sensitive, confidential, public, restricted, private, critical.", "Types: regulated, trade secret, intellectual property, legal, financial. Classifications: sensitive, confidential, public, restricted, private, critical."],
        ["Stati: at rest, in transit, in use. Data sovereignty e geolocalizzazione.", "States: at rest, in transit, in use. Data sovereignty and geolocation."],
        ["Metodi: cifratura, hashing, masking (nasconde parte del dato), tokenization (sostituisce con un token), obfuscation, segmentazione, restrizioni geografiche e di permesso.", "Methods: encryption, hashing, masking (hides part of the data), tokenization (swaps in a token), obfuscation, segmentation, geographic and permission restrictions."],
        ["Ruoli: owner (decide), controller (determina finalità), processor (tratta per conto), custodian / steward (gestisce).", "Roles: owner (decides), controller (sets purposes), processor (processes on behalf), custodian / steward (maintains)."],
        ["Novità 801: ciclo di vita dei dati, dalla creazione alla conservazione fino alla distruzione.", "New in 801: data management life cycle, from creation to retention to destruction."]
      ] },
      { n: "3.4", t: ["Resilienza e ripristino", "Explain the importance of resilience and recovery in security architecture"], p: [
        ["Alta disponibilità: load balancing contro clustering. Siti: hot, warm, cold, dispersione geografica.", "High availability: load balancing versus clustering. Sites: hot, warm, cold, geographic dispersion."],
        ["Platform diversity, multicloud, continuity of operations, capacity planning (persone, tecnologia, infrastruttura).", "Platform diversity, multicloud, continuity of operations, capacity planning (people, technology, infrastructure)."],
        ["Test: tabletop exercise, failover, simulazione, parallel processing.", "Testing: tabletop exercises, failover, simulation, parallel processing."],
        ["Backup: onsite / offsite, frequenza, cifratura, snapshot, replication, journaling, prove di ripristino.", "Backups: onsite / offsite, frequency, encryption, snapshots, replication, journaling, recovery tests."],
        ["Alimentazione: generatori, UPS. DR e BCP; RTO (tempo massimo di fermo) e RPO (perdita massima di dati).", "Power: generators, UPS. DR and BCP; RTO (maximum downtime) and RPO (maximum data loss)."]
      ] }
    ] },
    { num: 4, w: 27, t: ["Operazioni di sicurezza", "Security Operations"], objs: [
      { n: "4.1", t: ["Controlli e soluzioni di mitigazione", "Given a scenario, apply mitigating controls, techniques, and solutions to secure the environment"], p: [
        ["Novità 801: qui confluiscono le mitigazioni che nella 701 erano nel dominio 2, più firewall, IDS/IPS, DLP, EDR ed email security.", "New in 801: mitigations that sat in domain 2 of 701 now live here, plus firewalls, IDS/IPS, DLP, EDR and email security."],
        ["Segmentazione, access control (ACL, permessi), application allow list, isolamento, patching, cifratura, monitoraggio, least privilege.", "Segmentation, access control (ACLs, permissions), application allow lists, isolation, patching, encryption, monitoring, least privilege."],
        ["Hardening: disabilitare porte e protocolli inutili, cambiare le password di default, rimuovere software superfluo, host-based firewall, HIPS.", "Hardening: disable unneeded ports and protocols, change default passwords, remove unnecessary software, host-based firewall, HIPS."],
        ["Sandboxing: eseguire codice sospetto in ambiente isolato. Endpoint: EDR / XDR.", "Sandboxing: run suspicious code in isolation. Endpoint: EDR / XDR."],
        ["NAC con 802.1X. Firewall (regole, ACL, porte), IDS/IPS (firme e tendenze), web filter, DLP.", "NAC with 802.1X. Firewalls (rules, ACLs, ports), IDS/IPS (signatures and trends), web filter, DLP."],
        ["Email authentication: SPF (server autorizzati), DKIM (firma del messaggio), DMARC (policy su SPF e DKIM), BIMI (logo del marchio verificato).", "Email authentication: SPF (authorised servers), DKIM (message signature), DMARC (policy over SPF and DKIM), BIMI (verified brand logo)."]
      ] },
      { n: "4.2", t: ["Gestione degli asset", "Explain the security implications of proper hardware, software, and data asset management"], p: [
        ["Acquisizione e procurement: valutare il fornitore prima dell'acquisto.", "Acquisition and procurement: vet the vendor before buying."],
        ["Assegnazione e accounting: ownership, classificazione.", "Assignment and accounting: ownership, classification."],
        ["Monitoraggio e tracciamento: inventario, enumeration.", "Monitoring and tracking: inventory, enumeration."],
        ["Dismissione: sanitization, destruction, certification di avvenuta distruzione, data retention.", "Disposal and decommissioning: sanitisation, destruction, certification of destruction, data retention."]
      ] },
      { n: "4.3", t: ["Vulnerability management", "Given a scenario, perform tasks associated with vulnerability management"], p: [
        ["Identificazione: vulnerability scan, analisi statica e dinamica, source code review, package monitoring, threat feed, penetration test, bug bounty, responsible disclosure.", "Identification: vulnerability scans, static and dynamic analysis, source code review, package monitoring, threat feeds, penetration tests, bug bounty, responsible disclosure."],
        ["Novità 801: CSPM (Cloud Security Posture Management) per individuare misconfiguration nel cloud.", "New in 801: CSPM (Cloud Security Posture Management) to find cloud misconfigurations."],
        ["Analisi: falso positivo, falso negativo, prioritizzazione con CVSS e CVE, exposure factor, impatto sull'organizzazione, risk tolerance.", "Analysis: false positive, false negative, prioritisation with CVSS and CVE, exposure factor, organisational impact, risk tolerance."],
        ["Risposta: patching, insurance, segmentazione, compensating control, eccezioni ed esenzioni.", "Response: patching, insurance, segmentation, compensating controls, exceptions and exemptions."],
        ["Verifica: rescan, audit, conferma della remediation. Reporting.", "Validation: rescan, audit, remediation verification. Reporting."]
      ] },
      { n: "4.4", t: ["Alerting e monitoraggio", "Explain security alerting and monitoring concepts and tools"], p: [
        ["Risorse da monitorare: sistemi, applicazioni, infrastruttura.", "Resources to monitor: systems, applications, infrastructure."],
        ["Attività: log aggregation, alerting, scanning, reporting, archiviazione, alert tuning per ridurre i falsi positivi, quarantine.", "Activities: log aggregation, alerting, scanning, reporting, archiving, alert tuning to cut false positives, quarantine."],
        ["Strumenti: SIEM (correlazione), SCAP e benchmark, agent contro agentless, antivirus, DLP.", "Tools: SIEM (correlation), SCAP and benchmarks, agent versus agentless, antivirus, DLP."],
        ["Rete: NetFlow, SNMP trap, syslog, port mirroring, dashboard.", "Network: NetFlow, SNMP traps, syslog, port mirroring, dashboards."]
      ] },
      { n: "4.5", t: ["Identity and access management", "Given a scenario, apply concepts related to identity and access management"], p: [
        ["Provisioning e deprovisioning degli account, identity proofing, access review periodiche.", "Account provisioning and deprovisioning, identity proofing, periodic access reviews."],
        ["SSO e federation: SAML (asserzioni XML), OAuth (autorizzazione delegata), OpenID Connect (autenticazione sopra OAuth), LDAP (directory).", "SSO and federation: SAML (XML assertions), OAuth (delegated authorisation), OpenID Connect (authentication on top of OAuth), LDAP (directory)."],
        ["Modelli di accesso: mandatory (MAC, etichette), discretionary (DAC, decide il proprietario), role-based (RBAC), rule-based, attribute-based (ABAC), time-of-day.", "Access models: mandatory (MAC, labels), discretionary (DAC, owner decides), role-based (RBAC), rule-based, attribute-based (ABAC), time-of-day."],
        ["MFA, fattori: something you know, have, are, somewhere you are. Token hardware e software, biometria, OTP.", "MFA factors: something you know, have, are, somewhere you are. Hard and soft tokens, biometrics, OTP."],
        ["Novità 801: passkey (credenziali resistenti al phishing), backup code, monitoraggio delle credenziali compromesse.", "New in 801: passkeys (phishing-resistant credentials), backup codes, compromised credential monitoring."],
        ["Tipi di account: privileged, service, third-party, emergency access. PAM: just-in-time, password vaulting. Password: lunghezza, complessità, password manager.", "Account types: privileged, service, third-party, emergency access. PAM: just-in-time, password vaulting. Passwords: length, complexity, password managers."]
      ] },
      { n: "4.6", t: ["Automazione e orchestrazione", "Given a scenario, apply automation and orchestration solutions to secure operations"], p: [
        ["Casi d'uso: provisioning di utenti e risorse, guard rail, security group, creazione di ticket, escalation, abilitazione e disabilitazione di servizi, CI/CD, integrazioni e API.", "Use cases: user and resource provisioning, guard rails, security groups, ticket creation, escalation, enabling and disabling services, CI/CD, integrations and APIs."],
        ["Novità 801: capacità IA, cioè strumenti agentici, chatbot, analisi predittiva.", "New in 801: AI capabilities, namely agentic tools, chatbots, predictive analysis."],
        ["Benefici: efficienza, baseline uniformi, configurazioni standard, scalabilità sicura, tempi di reazione ridotti, moltiplicatore di forza lavoro.", "Benefits: efficiency, enforced baselines, standard configurations, secure scaling, faster reaction time, workforce multiplier."],
        ["Rischi: complessità, costo, single point of failure, debito tecnico, supportabilità nel tempo.", "Considerations: complexity, cost, single point of failure, technical debt, ongoing supportability."]
      ] },
      { n: "4.7", t: ["Incident response", "Summarize concepts associated with incident response activities"], p: [
        ["Fasi: preparation, detection, analysis, containment, eradication, recovery, lessons learned.", "Phases: preparation, detection, analysis, containment, eradication, recovery, lessons learned."],
        ["Preparazione: playbook, formazione, tabletop exercise, simulazioni.", "Preparation: playbooks, training, tabletop exercises, simulations."],
        ["Analisi: root cause analysis, threat hunting.", "Analysis: root cause analysis, threat hunting."],
        ["Digital forensics: legal hold, chain of custody (tracciabilità delle prove), acquisition, preservation, e-discovery, reporting.", "Digital forensics: legal hold, chain of custody (evidence traceability), acquisition, preservation, e-discovery, reporting."],
        ["Novità 801: negotiation, notification e reporting esterno (clienti, forze dell'ordine, obblighi di legge), advisory interni ed esterni, PIR (post-incident report).", "New in 801: negotiation, notification and external reporting (customers, law enforcement, mandatory reporting), internal and external advisories, PIR (post-incident report)."]
      ], x: ["Prima si contiene, poi si elimina la causa, infine si ripristina: containment viene sempre prima di eradication.", "Contain first, then remove the cause, then restore: containment always precedes eradication."] },
      { n: "4.8", t: ["Dati e fonti per le indagini", "Given a scenario, use data, artifacts and sources to support a security investigation"], p: [
        ["Log: firewall, applicazione, endpoint, sicurezza del sistema operativo, IPS/IDS, rete, metadati.", "Logs: firewall, application, endpoint, OS security, IPS/IDS, network, metadata."],
        ["NetFlow / IPFIX (flussi), packet capture (contenuto), dashboard, report di vulnerability scan.", "NetFlow / IPFIX (flows), packet captures (content), dashboards, vulnerability scan reports."],
        ["Integrità di file e log: hash e confronto.", "File and log integrity: hashing and comparison."],
        ["Memory capture (dati volatili) e bit-level copy del disco per l'analisi forense.", "Memory captures (volatile data) and bit-level disk copies for forensic analysis."],
        ["Log parsing e tracce: estrarre e correlare gli eventi rilevanti.", "Log parsing and traces: extract and correlate the relevant events."]
      ] }
    ] },
    { num: 5, w: 14, t: ["Gestione e supervisione del programma di sicurezza", "Security Program Management and Oversight"], objs: [
      { n: "5.1", t: ["Governance, rischio e conformità", "Explain the importance of governance, risk, and compliance artifacts"], p: [
        ["Policy (cosa, obbligatoria), standard (requisiti misurabili), procedure (come, passo per passo), guideline (raccomandazioni).", "Policies (what, mandatory), standards (measurable requirements), procedures (how, step by step), guidelines (recommendations)."],
        ["Policy tipiche: AUP (uso accettabile), clean desk, data classification, vulnerability disclosure, information security.", "Typical policies: AUP (acceptable use), clean desk, data classification, vulnerability disclosure, information security."],
        ["Piani: BCP (continuità operativa), DR (ripristino), incident response.", "Plans: BCP (business continuity), DR (disaster recovery), incident response."],
        ["Strutture di governance: board, comitati, enti governativi; centralizzata contro decentralizzata.", "Governance structures: boards, committees, government entities; centralised versus decentralised."]
      ] },
      { n: "5.2", t: ["Gestione del rischio", "Explain the impact of risk management processes on the security of the organization"], p: [
        ["Identificazione e valutazione: ad hoc, ricorrente, una tantum, continua.", "Identification and assessment: ad hoc, recurring, one-time, continuous."],
        ["Analisi qualitativa (alto, medio, basso) e quantitativa: SLE = AV x EF; ALE = SLE x ARO.", "Qualitative analysis (high, medium, low) and quantitative: SLE = AV x EF; ALE = SLE x ARO."],
        ["Risk register: key risk indicator, risk owner, soglie.", "Risk register: key risk indicators, risk owners, thresholds."],
        ["Risk appetite (espansivo, conservativo, neutrale), risk tolerance, residual risk (ciò che resta dopo i controlli).", "Risk appetite (expansionary, conservative, neutral), risk tolerance, residual risk (what remains after controls)."],
        ["Quattro trattamenti: transfer (assicurazione), accept, avoid, mitigate.", "Four treatments: transfer (insurance), accept, avoid, mitigate."],
        ["BIA (Business Impact Analysis): RTO, RPO, MTTR, MTBF.", "BIA (Business Impact Analysis): RTO, RPO, MTTR, MTBF."]
      ], x: ["Esempio: asset da 100 000, EF 25% dà SLE 25 000; con ARO 2 l'ALE è 50 000.", "Example: a 100,000 asset with EF 25% gives SLE 25,000; with ARO 2 the ALE is 50,000."] },
      { n: "5.3", t: ["Rischio di terze parti", "Explain the assessment and management processes associated with third-party risk"], p: [
        ["Selezione del fornitore: RFI (richiesta informazioni), RFP (richiesta proposta), RFQ (richiesta preventivo), due diligence, conflitti di interesse.", "Vendor selection: RFI (request for information), RFP (request for proposal), RFQ (request for quote), due diligence, conflicts of interest."],
        ["Accordi: SLA (livelli di servizio), MOU (intesa non vincolante), MSA (contratto quadro), SOW (lavoro specifico), NDA (riservatezza).", "Agreements: SLA (service levels), MOU (non-binding understanding), MSA (master agreement), SOW (specific work), NDA (confidentiality)."],
        ["Valutazione: penetration test, right-to-audit clause, evidenze di audit interni, valutazioni indipendenti, analisi della supply chain.", "Assessment: penetration testing, right-to-audit clause, evidence of internal audits, independent assessments, supply chain analysis."],
        ["Monitoraggio continuo del fornitore, questionari, rules of engagement. Rischio di vendor lock-in.", "Ongoing vendor monitoring, questionnaires, rules of engagement. Vendor lock-in risk."]
      ] },
      { n: "5.4", t: ["Conformità", "Summarize elements of effective security compliance"], p: [
        ["Formazione sulla compliance, reporting interno ed esterno, monitoraggio (due diligence, attestazioni, automazione).", "Compliance training, internal and external reporting, monitoring (due diligence, attestation, automation)."],
        ["Conseguenze della non conformità: multe, sanzioni, danno reputazionale, perdita di licenze, impatto contrattuale.", "Consequences of non-compliance: fines, sanctions, reputational damage, loss of licence, contractual impact."],
        ["Legal hold e data retention.", "Legal holds and data retention."],
        ["Privacy: data subject, controller contro processor, right to be forgotten, inventario dei dati, ambito locale, nazionale, globale.", "Privacy: data subject, controller versus processor, right to be forgotten, data inventory, local, national, global scope."]
      ] },
      { n: "5.5", t: ["Audit e assessment", "Explain concepts associated with audit and assessment activities"], p: [
        ["Interni (compliance, audit committee, self-assessment) ed esterni (regolatori, terze parti indipendenti). Attestation.", "Internal (compliance, audit committee, self-assessment) and external (regulators, independent third parties). Attestation."],
        ["Penetration test: ambiente known, partially known, unknown; offensivo, difensivo, integrato; fisico.", "Penetration tests: known, partially known, unknown environment; offensive, defensive, integrated; physical."],
        ["Ricognizione passiva contro attiva, scoping, raccolta dei dati.", "Passive versus active reconnaissance, scoping, data gathering."],
        ["Novità 801: MITRE ATT&CK (tattiche e tecniche degli avversari) e Cyber Kill Chain (fasi di un attacco).", "New in 801: MITRE ATT&CK (adversary tactics and techniques) and Cyber Kill Chain (attack stages)."]
      ] },
      { n: "5.6", t: ["Security awareness", "Given a scenario, apply security awareness concepts to improve organizational security"], p: [
        ["Tipi e modalità di formazione, campagne di phishing simulate, come riconoscere e segnalare.", "Training types and delivery, simulated phishing campaigns, how to recognise and report."],
        ["Riconoscere comportamenti anomali: rischiosi, inattesi, involontari.", "Recognising anomalous behaviour: risky, unexpected, unintentional."],
        ["Temi: social engineering, BEC, gestione delle password, supporti rimovibili, insider threat, BYOD, lavoro remoto e ibrido.", "Topics: social engineering, BEC, password management, removable media, insider threat, BYOD, remote and hybrid work."],
        ["Misurare l'efficacia: metriche prima e dopo, monitoraggio e reporting.", "Measuring effectiveness: before and after metrics, monitoring and reporting."]
      ] }
    ] }
  ],
  sheets: [
    { t: ["Controlli: categorie e tipi", "Controls: categories and types"], cols: [["Tipo", "Type"], ["Scopo", "Purpose"], ["Esempio", "Example"]], rows: [
      ["Preventive", ["Impedisce l'evento", "Stops the event"], ["Firewall, serratura", "Firewall, lock"]],
      ["Deterring", ["Scoraggia l'attaccante", "Discourages the attacker"], ["Cartello di avviso", "Warning sign"]],
      ["Detective", ["Rileva l'evento", "Detects the event"], ["IDS, log, telecamera", "IDS, logs, camera"]],
      ["Corrective", ["Ripristina dopo l'evento", "Restores after the event"], ["Ripristino da backup", "Restore from backup"]],
      ["Compensating", ["Sostituisce un controllo non applicabile", "Replaces a control that cannot be applied"], ["Segmentare un sistema legacy", "Segmenting a legacy system"]],
      ["Directive", ["Indica cosa fare", "Tells people what to do"], ["Policy, procedura", "Policy, procedure"]]
    ] },
    { t: ["Formule del rischio", "Risk formulas"], cols: [["Sigla", "Term"], ["Significato", "Meaning"], ["Formula", "Formula"]], rows: [
      ["AV", ["Valore dell'asset", "Asset value"], "-"],
      ["EF", ["Percentuale di perdita per evento", "Share of loss per event"], "0-100%"],
      ["SLE", ["Perdita per singolo evento", "Single loss expectancy"], "AV x EF"],
      ["ARO", ["Frequenza annua dell'evento", "Annual rate of occurrence"], "-"],
      ["ALE", ["Perdita annua attesa", "Annualised loss expectancy"], "SLE x ARO"],
      ["RTO", ["Tempo massimo di fermo", "Maximum downtime"], "-"],
      ["RPO", ["Perdita massima di dati", "Maximum data loss"], "-"]
    ] },
    { t: ["Accordi con terze parti", "Third-party agreements"], cols: [["Sigla", "Term"], ["A cosa serve", "What it is for"]], rows: [
      ["SLA", ["Livelli di servizio misurabili e penali", "Measurable service levels and penalties"]],
      ["MOU", ["Intesa formale, di norma non vincolante", "Formal understanding, usually non-binding"]],
      ["MSA", ["Contratto quadro per rapporti ricorrenti", "Master contract for ongoing work"]],
      ["SOW", ["Attività, tempi e consegne di un singolo lavoro", "Tasks, timeline and deliverables for one job"]],
      ["NDA", ["Obbligo di riservatezza", "Confidentiality obligation"]],
      ["RFI / RFP / RFQ", ["Richiesta di informazioni / proposta / preventivo", "Request for information / proposal / quote"]]
    ] }
  ]
};
