window.DATA = window.DATA || { exams: {}, quiz: {} };
DATA.exams.n = {
  key: "n", name: "Network+", code: "N10-009", ver: "V9", hash: "network",
  questions: 90, minutes: 90, pass: 720,
  launched: ["20 giugno 2024", "June 20, 2024"],
  exp: ["A+ consigliata, 9-12 mesi di esperienza in ambito networking", "A+ recommended, 9-12 months of networking experience"],
  note: ["N10-009 è la versione in vigore. CompTIA ha pubblicato una bozza degli obiettivi N10-010 (V10), ma senza data di lancio: il ritiro di N10-009 è stimato nel 2027.", "N10-009 is the live version. CompTIA has published draft N10-010 (V10) objectives with no launch date: N10-009 retirement is estimated for 2027."],
  official: "https://www.comptia.org/en-us/certifications/network/",
  domains: [
    { num: 1, w: 23, t: ["Concetti di networking", "Networking Concepts"], objs: [
      { n: "1.1", t: ["Modello OSI", "Explain concepts related to the OSI reference model"], p: [
        ["Layer 1 Physical: bit, cavi, segnali, hub, repeater, transceiver.", "Layer 1 Physical: bits, cables, signals, hubs, repeaters, transceivers."],
        ["Layer 2 Data Link: frame, indirizzi MAC, switch, bridge, VLAN, ARP opera tra L2 e L3.", "Layer 2 Data Link: frames, MAC addresses, switches, bridges, VLANs; ARP works between L2 and L3."],
        ["Layer 3 Network: pacchetti, indirizzi IP, router, ICMP, routing.", "Layer 3 Network: packets, IP addresses, routers, ICMP, routing."],
        ["Layer 4 Transport: segmenti TCP (affidabile, three-way handshake SYN / SYN-ACK / ACK) e datagrammi UDP (senza connessione), porte.", "Layer 4 Transport: TCP segments (reliable, three-way handshake SYN / SYN-ACK / ACK) and UDP datagrams (connectionless), ports."],
        ["Layer 5 Session: apertura, gestione e chiusura delle sessioni.", "Layer 5 Session: session setup, maintenance and teardown."],
        ["Layer 6 Presentation: formato dei dati, cifratura (TLS), compressione, codifica.", "Layer 6 Presentation: data format, encryption (TLS), compression, encoding."],
        ["Layer 7 Application: protocolli usati dalle applicazioni (HTTP, DNS, SMTP, FTP).", "Layer 7 Application: protocols used by applications (HTTP, DNS, SMTP, FTP)."],
        ["Incapsulamento in discesa (dati, segmento, pacchetto, frame, bit), decapsulamento in salita. PDU = unità dati di ogni layer.", "Encapsulation going down (data, segment, packet, frame, bits), decapsulation going up. PDU = each layer's data unit."]
      ], x: ["Molte domande descrivono un sintomo e chiedono il layer: cavo o segnale = L1, MAC o VLAN = L2, IP o routing = L3, porta bloccata = L4.", "Many questions describe a symptom and ask for the layer: cable or signal = L1, MAC or VLAN = L2, IP or routing = L3, blocked port = L4."] },
      { n: "1.2", t: ["Apparati, applicazioni e funzioni di rete", "Compare and contrast networking appliances, applications, and functions"], p: [
        ["Apparati fisici e virtuali: router (L3), switch (L2, o L3 multilayer), firewall, IDS (rileva) e IPS (blocca, in linea).", "Physical and virtual appliances: router (L3), switch (L2, or multilayer L3), firewall, IDS (detects) and IPS (blocks, inline)."],
        ["Load balancer: distribuisce il traffico su più server. Proxy: intermediario per le richieste dei client (filtro, cache).", "Load balancer: spreads traffic across servers. Proxy: intermediary for client requests (filtering, caching)."],
        ["Storage: NAS (file, via rete IP: SMB, NFS) contro SAN (blocchi, rete dedicata: Fibre Channel, iSCSI).", "Storage: NAS (file level over IP: SMB, NFS) versus SAN (block level, dedicated network: Fibre Channel, iSCSI)."],
        ["Wireless: access point (AP) e controller che gestisce centralmente gli AP.", "Wireless: access point (AP) and controller that centrally manages APs."],
        ["Applicazioni: CDN (Content Delivery Network), contenuti in cache vicino agli utenti.", "Applications: CDN (Content Delivery Network), content cached close to users."],
        ["Funzioni: VPN (tunnel cifrato), QoS (priorità del traffico, es. voce), TTL (limite di hop, evita loop infiniti).", "Functions: VPN (encrypted tunnel), QoS (traffic priority, e.g. voice), TTL (hop limit, prevents endless loops)."]
      ] },
      { n: "1.3", t: ["Concetti cloud e opzioni di connettività", "Summarize cloud concepts and connectivity options"], p: [
        ["NFV (Network Functions Virtualization): funzioni di rete eseguite come software su hardware standard.", "NFV (Network Functions Virtualization): network functions run as software on standard hardware."],
        ["VPC (Virtual Private Cloud): rete isolata nel cloud pubblico. Network security group (regole su istanza/interfaccia) e network security list (regole su subnet).", "VPC (Virtual Private Cloud): isolated network in a public cloud. Network security groups (rules on instance/interface) and network security lists (rules on subnet)."],
        ["Cloud gateway: Internet gateway (accesso pubblico bidirezionale) e NAT gateway (uscita verso Internet per risorse private).", "Cloud gateways: Internet gateway (two-way public access) and NAT gateway (outbound Internet for private resources)."],
        ["Connettività verso il cloud: VPN (su Internet, cifrata) o Direct Connect (collegamento privato dedicato).", "Cloud connectivity: VPN (over the Internet, encrypted) or Direct Connect (dedicated private link)."],
        ["Modelli di deployment: public, private, hybrid. Modelli di servizio: SaaS, PaaS, IaaS.", "Deployment models: public, private, hybrid. Service models: SaaS, PaaS, IaaS."],
        ["Scalability (crescere), elasticity (crescere e ridursi in automatico secondo il carico), multitenancy (più clienti sulla stessa infrastruttura).", "Scalability (grow), elasticity (grow and shrink automatically with load), multitenancy (many customers on shared infrastructure)."]
      ] },
      { n: "1.4", t: ["Porte, protocolli, servizi e tipi di traffico", "Explain common networking ports, protocols, services, and traffic types"], p: [
        ["Porte da memorizzare: vedi la scheda rapida Porte e protocolli in fondo a questa pagina.", "Ports to memorise: see the Ports and protocols quick sheet at the bottom of this page."],
        ["Protocolli IP: ICMP (ping, messaggi di errore), TCP (affidabile), UDP (veloce, senza conferma), GRE (tunnel senza cifratura).", "IP protocols: ICMP (ping, error messages), TCP (reliable), UDP (fast, no acknowledgement), GRE (tunnel without encryption)."],
        ["IPsec: AH (integrità e autenticazione, niente cifratura), ESP (cifratura più integrità), IKE (negoziazione delle chiavi).", "IPsec: AH (integrity and authentication, no encryption), ESP (encryption plus integrity), IKE (key negotiation)."],
        ["Tipi di traffico: unicast (uno a uno), multicast (uno a un gruppo), anycast (uno al più vicino), broadcast (uno a tutti, solo IPv4).", "Traffic types: unicast (one to one), multicast (one to a group), anycast (one to nearest), broadcast (one to all, IPv4 only)."],
        ["Versioni sicure da preferire: SSH al posto di Telnet, SFTP al posto di FTP, HTTPS al posto di HTTP, LDAPS al posto di LDAP, SNMPv3.", "Prefer secure versions: SSH over Telnet, SFTP over FTP, HTTPS over HTTP, LDAPS over LDAP, SNMPv3."]
      ], x: ["Le porte sono punti quasi garantiti. Impara anche TCP o UDP: DNS usa entrambi, DHCP, TFTP, SNMP e NTP usano UDP.", "Ports are near-guaranteed points. Learn TCP versus UDP too: DNS uses both; DHCP, TFTP, SNMP and NTP use UDP."] },
      { n: "1.5", t: ["Mezzi trasmissivi e transceiver", "Compare and contrast transmission media and transceivers"], p: [
        ["Wireless: 802.11 (Wi-Fi), cellulare, satellite (latenza alta).", "Wireless: 802.11 (Wi-Fi), cellular, satellite (high latency)."],
        ["Rame 802.3: twisted pair (Cat 5e 1 Gbps, Cat 6 10 Gbps fino a 55 m, Cat 6a 10 Gbps a 100 m, Cat 8 25/40 Gbps a 30 m), coassiale, DAC/twinax per brevi tratte in data center.", "Copper 802.3: twisted pair (Cat 5e 1 Gbps, Cat 6 10 Gbps to 55 m, Cat 6a 10 Gbps at 100 m, Cat 8 25/40 Gbps at 30 m), coaxial, DAC/twinax for short data-centre runs."],
        ["Fibra: single-mode (laser, lunghe distanze, core piccolo) contro multimode (LED, brevi distanze, core più grande).", "Fibre: single-mode (laser, long distance, small core) versus multimode (LED, short distance, larger core)."],
        ["Plenum (guaina resistente al fuoco, obbligatoria nei controsoffitti con ricircolo d'aria) contro non-plenum (PVC).", "Plenum (fire-rated jacket, required in air-handling spaces) versus non-plenum (PVC)."],
        ["Transceiver: protocolli Ethernet e Fibre Channel; form factor SFP (1 Gbps), SFP+ (10 Gbps), QSFP (40 Gbps), QSFP28 (100 Gbps).", "Transceivers: Ethernet and Fibre Channel protocols; form factors SFP (1 Gbps), SFP+ (10 Gbps), QSFP (40 Gbps), QSFP28 (100 Gbps)."],
        ["Connettori: fibra SC, LC, ST, MPO; rame RJ11 (telefono), RJ45 (Ethernet); coassiale F-type e BNC.", "Connectors: fibre SC, LC, ST, MPO; copper RJ11 (phone), RJ45 (Ethernet); coax F-type and BNC."]
      ] },
      { n: "1.6", t: ["Topologie, architetture e tipi di rete", "Compare and contrast network topologies, architectures, and types"], p: [
        ["Topologie: mesh (completa o parziale, molta ridondanza), star / hub and spoke (un punto centrale), point to point, hybrid.", "Topologies: mesh (full or partial, high redundancy), star / hub and spoke (central point), point to point, hybrid."],
        ["Spine and leaf: ogni leaf è collegato a ogni spine, latenza prevedibile, tipica dei data center.", "Spine and leaf: every leaf connects to every spine, predictable latency, typical of data centres."],
        ["Three-tier: core (backbone veloce), distribution (routing e policy), access (porte utente). Collapsed core unisce core e distribution.", "Three-tier: core (fast backbone), distribution (routing and policy), access (user ports). Collapsed core merges core and distribution."],
        ["Flussi: north-south (tra data center e esterno) ed east-west (tra server nello stesso data center).", "Traffic flows: north-south (between data centre and outside) and east-west (server to server inside the data centre)."]
      ] },
      { n: "1.7", t: ["Indirizzamento IPv4", "Given a scenario, use appropriate IPv4 network addressing"], p: [
        ["Privati RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. APIPA 169.254.0.0/16 (DHCP non raggiungibile). Loopback 127.0.0.0/8.", "RFC 1918 private: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. APIPA 169.254.0.0/16 (DHCP unreachable). Loopback 127.0.0.0/8."],
        ["Classi: A 1-126 (/8), B 128-191 (/16), C 192-223 (/24), D 224-239 (multicast), E 240-255 (sperimentale).", "Classes: A 1-126 (/8), B 128-191 (/16), C 192-223 (/24), D 224-239 (multicast), E 240-255 (experimental)."],
        ["Subnetting: host utilizzabili = 2^(bit host) - 2. La dimensione del blocco è 256 meno l'ottetto della maschera.", "Subnetting: usable hosts = 2^(host bits) - 2. Block size is 256 minus the mask octet."],
        ["VLSM: maschere di lunghezza diversa nella stessa rete per non sprecare indirizzi. CIDR: notazione /n senza classi.", "VLSM: different mask lengths within one network to avoid waste. CIDR: classless /n notation."],
        ["Esempio: 192.168.10.77/26, blocco 64, rete 192.168.10.64, broadcast 192.168.10.127, host .65-.126.", "Example: 192.168.10.77/26, block 64, network 192.168.10.64, broadcast 192.168.10.127, hosts .65-.126."]
      ], x: ["Scrivi la tabella CIDR sul foglio appena inizia l'esame: fa risparmiare minuti nelle domande di subnetting.", "Write the CIDR table on your notes as the exam starts: it saves minutes on subnetting questions."] },
      { n: "1.8", t: ["Ambienti di rete moderni", "Summarize evolving use cases for modern network environments"], p: [
        ["SDN: piano di controllo separato dal piano dati. SD-WAN: application aware, zero-touch provisioning, transport agnostic, gestione centralizzata delle policy.", "SDN: control plane separated from data plane. SD-WAN: application aware, zero-touch provisioning, transport agnostic, central policy management."],
        ["VXLAN: incapsula frame Layer 2 in UDP per estendere reti L2 tra data center (DCI, Data Center Interconnect).", "VXLAN: encapsulates Layer 2 frames in UDP to stretch L2 networks between data centres (DCI, Data Center Interconnect)."],
        ["ZTA (Zero Trust Architecture): mai fidarsi, verificare sempre; autenticazione basata su policy, autorizzazione, least privilege.", "ZTA (Zero Trust Architecture): never trust, always verify; policy-based authentication, authorization, least privilege."],
        ["SASE unisce rete (SD-WAN) e sicurezza erogata dal cloud; SSE è la sola parte di sicurezza.", "SASE combines networking (SD-WAN) with cloud-delivered security; SSE is the security part alone."],
        ["IaC (Infrastructure as Code): playbook, template, task riutilizzabili, controllo della configuration drift, inventari dinamici; source control con versioni, repository centrale, branching, gestione dei conflitti.", "IaC (Infrastructure as Code): playbooks, templates, reusable tasks, configuration drift control, dynamic inventories; source control with versioning, central repository, branching, conflict identification."],
        ["IPv6: 128 bit, risolve l'esaurimento degli indirizzi. Compatibilità: tunneling, dual stack, NAT64.", "IPv6: 128 bits, solves address exhaustion. Compatibility: tunnelling, dual stack, NAT64."]
      ] }
    ] },
    { num: 2, w: 20, t: ["Implementazione della rete", "Network Implementation"], objs: [
      { n: "2.1", t: ["Tecnologie di routing", "Explain characteristics of routing technologies"], p: [
        ["Routing statico (manuale) contro dinamico (i router si scambiano le rotte).", "Static routing (manual) versus dynamic (routers exchange routes)."],
        ["OSPF: link-state, interno, metrica cost, aree. EIGRP: ibrido, interno, origine Cisco. BGP: path-vector, esterno, tra autonomous system (Internet).", "OSPF: link-state, interior, cost metric, areas. EIGRP: hybrid, interior, Cisco origin. BGP: path-vector, exterior, between autonomous systems (Internet)."],
        ["Scelta della rotta, in ordine: prefisso più lungo (più specifico), poi administrative distance più bassa, poi metrica più bassa.", "Route selection, in order: longest prefix (most specific), then lowest administrative distance, then lowest metric."],
        ["NAT traduce indirizzi privati in pubblici; PAT molti privati su un solo pubblico usando le porte.", "NAT translates private to public addresses; PAT maps many private addresses to one public using ports."],
        ["FHRP (First Hop Redundancy Protocol): gateway ridondante con un VIP (virtual IP) condiviso, es. HSRP e VRRP.", "FHRP (First Hop Redundancy Protocol): redundant gateway sharing a VIP (virtual IP), e.g. HSRP and VRRP."],
        ["Subinterface: più interfacce logiche su una fisica, usate per il routing tra VLAN (router on a stick).", "Subinterfaces: several logical interfaces on one physical port, used for inter-VLAN routing (router on a stick)."]
      ] },
      { n: "2.2", t: ["Tecnologie di switching", "Given a scenario, configure switching technologies and features"], p: [
        ["VLAN: segmentazione logica a Layer 2. VLAN database e SVI (Switch Virtual Interface, interfaccia L3 della VLAN).", "VLAN: logical Layer 2 segmentation. VLAN database and SVI (Switch Virtual Interface, the VLAN's L3 interface)."],
        ["Porte access (una VLAN) e trunk (più VLAN con tag 802.1Q). Native VLAN: traffico senza tag sul trunk. Voice VLAN per i telefoni IP.", "Access ports (one VLAN) and trunk ports (many VLANs with 802.1Q tags). Native VLAN: untagged traffic on the trunk. Voice VLAN for IP phones."],
        ["Link aggregation (LACP, 802.3ad): più link fisici come uno logico per banda e ridondanza.", "Link aggregation (LACP, 802.3ad): several physical links as one logical link for bandwidth and redundancy."],
        ["Speed e duplex devono coincidere ai due capi: un duplex mismatch causa collisioni tardive e lentezza.", "Speed and duplex must match at both ends: a duplex mismatch causes late collisions and slowness."],
        ["Spanning Tree (STP, 802.1D; RSTP 802.1w): evita i loop a Layer 2 bloccando i percorsi ridondanti.", "Spanning Tree (STP, 802.1D; RSTP 802.1w): prevents Layer 2 loops by blocking redundant paths."],
        ["MTU standard 1500 byte; jumbo frame fino a circa 9000 byte, usati per storage, vanno abilitati su tutto il percorso.", "Standard MTU 1500 bytes; jumbo frames up to about 9000 bytes, used for storage, must be enabled end to end."]
      ] },
      { n: "2.3", t: ["Dispositivi e tecnologie wireless", "Given a scenario, select and configure wireless devices and technologies"], p: [
        ["Canali: larghezza (20/40/80/160 MHz), canali non sovrapposti a 2,4 GHz (1, 6, 11), 802.11h (DFS e controllo potenza a 5 GHz).", "Channels: width (20/40/80/160 MHz), non-overlapping 2.4 GHz channels (1, 6, 11), 802.11h (DFS and power control at 5 GHz)."],
        ["Frequenze: 2,4 GHz (più portata, più interferenze), 5 GHz (più velocità), 6 GHz (Wi-Fi 6E). Band steering sposta i client sulla banda migliore.", "Frequencies: 2.4 GHz (more range, more interference), 5 GHz (more speed), 6 GHz (Wi-Fi 6E). Band steering moves clients to the better band."],
        ["SSID (nome rete), BSSID (MAC dell'AP), ESSID (stesso SSID su più AP per il roaming).", "SSID (network name), BSSID (AP MAC), ESSID (same SSID across APs for roaming)."],
        ["Tipi di rete: infrastructure, ad hoc, mesh, point to point.", "Network types: infrastructure, ad hoc, mesh, point to point."],
        ["Cifratura: WPA2 (AES-CCMP), WPA3 (SAE al posto del PSK, più resistente agli attacchi a dizionario). Autenticazione PSK contro Enterprise (802.1X con RADIUS).", "Encryption: WPA2 (AES-CCMP), WPA3 (SAE replaces PSK, resists dictionary attacks). Authentication PSK versus Enterprise (802.1X with RADIUS)."],
        ["Guest network con captive portal. Antenne omnidirezionali contro direzionali. AP autonomi contro lightweight (gestiti da controller).", "Guest networks with captive portals. Omnidirectional versus directional antennas. Autonomous versus lightweight APs (controller managed)."]
      ] },
      { n: "2.4", t: ["Installazioni fisiche", "Explain important factors of physical installations"], p: [
        ["MDF (Main Distribution Frame, punto principale) e IDF (Intermediate, di piano). Dimensione rack in unità U.", "MDF (Main Distribution Frame, main point) and IDF (Intermediate, per floor). Rack size in U units."],
        ["Flusso d'aria: port-side exhaust o intake, da allineare a corridoi caldi e freddi.", "Airflow: port-side exhaust or intake, aligned with hot and cold aisles."],
        ["Cablaggio: patch panel (rame), fiber distribution panel, armadi con serratura.", "Cabling: patch panel (copper), fibre distribution panel, lockable cabinets."],
        ["Alimentazione: UPS (batteria a breve termine), PDU (distribuzione nel rack), carico e tensione da calcolare.", "Power: UPS (short-term battery), PDU (rack power distribution), load and voltage to calculate."],
        ["Ambiente: umidità, temperatura, sistemi antincendio (a gas, non ad acqua, per le sale apparati).", "Environment: humidity, temperature, fire suppression (clean agent, not water, for equipment rooms)."]
      ] }
    ] },
    { num: 3, w: 19, t: ["Operazioni di rete", "Network Operations"], objs: [
      { n: "3.1", t: ["Processi e procedure organizzative", "Explain the purpose of organizational processes and procedures"], p: [
        ["Documentazione: diagrammi fisici e logici, rack diagram, cable map, diagrammi Layer 1/2/3, inventario asset (hardware, software, licenze, garanzie).", "Documentation: physical and logical diagrams, rack diagrams, cable maps, Layer 1/2/3 diagrams, asset inventory (hardware, software, licensing, warranty)."],
        ["IPAM (gestione indirizzi IP), SLA (livelli di servizio concordati), wireless survey e heat map.", "IPAM (IP address management), SLA (agreed service levels), wireless survey and heat map."],
        ["Life-cycle: EOL (fine vendita), EOS (fine supporto, niente patch), gestione software (patch, OS, firmware), decommissioning.", "Life cycle: EOL (end of sale), EOS (end of support, no patches), software management (patches, OS, firmware), decommissioning."],
        ["Change management: richiesta, approvazione, tracciamento, piano di rollback.", "Change management: request, approval, tracking, rollback plan."],
        ["Configuration management: configurazione di produzione, backup, baseline o golden configuration.", "Configuration management: production configuration, backup configuration, baseline or golden configuration."]
      ] },
      { n: "3.2", t: ["Tecnologie di monitoraggio", "Given a scenario, use network monitoring technologies"], p: [
        ["SNMP: trap (avvisi inviati dall'apparato), MIB (database degli oggetti), v2c (community string in chiaro), v3 (autenticazione e cifratura).", "SNMP: traps (alerts sent by the device), MIB (object database), v2c (cleartext community strings), v3 (authentication and encryption)."],
        ["Flow data (NetFlow): chi parla con chi e quanto. Packet capture: contenuto completo dei pacchetti.", "Flow data (NetFlow): who talks to whom and how much. Packet capture: full packet contents."],
        ["Baseline: valori normali di riferimento; gli scostamenti generano anomaly alert.", "Baseline: normal reference values; deviations raise anomaly alerts."],
        ["Log aggregation: syslog collector e SIEM (correlazione di eventi). Integrazione via API. Port mirroring (SPAN) per copiare il traffico verso un analizzatore.", "Log aggregation: syslog collector and SIEM (event correlation). API integration. Port mirroring (SPAN) copies traffic to an analyser."],
        ["Soluzioni: network discovery (ad hoc o pianificata), analisi del traffico, monitoraggio di prestazioni, disponibilità e configurazione.", "Solutions: network discovery (ad hoc or scheduled), traffic analysis, performance, availability and configuration monitoring."]
      ] },
      { n: "3.3", t: ["Disaster recovery", "Explain disaster recovery (DR) concepts"], p: [
        ["RPO: quanti dati posso perdere (tempo dall'ultimo backup). RTO: entro quanto devo ripartire.", "RPO: how much data can be lost (time since last backup). RTO: how fast service must be restored."],
        ["MTTR: tempo medio di riparazione. MTBF: tempo medio tra i guasti (più alto è meglio).", "MTTR: mean time to repair. MTBF: mean time between failures (higher is better)."],
        ["Siti DR: cold (solo spazio e corrente), warm (hardware pronto, dati da ripristinare), hot (replica attiva, ripartenza quasi immediata).", "DR sites: cold (space and power only), warm (hardware ready, data to restore), hot (live replica, near-immediate failover)."],
        ["Alta disponibilità: active-active (tutti i nodi lavorano) contro active-passive (un nodo in standby).", "High availability: active-active (all nodes work) versus active-passive (one node on standby)."],
        ["Test: tabletop exercise (simulazione a tavolino) e validation test (prova reale del ripristino).", "Testing: tabletop exercises (discussion walkthrough) and validation tests (real restore proof)."]
      ] },
      { n: "3.4", t: ["Servizi di rete IPv4 e IPv6", "Given a scenario, implement IPv4 and IPv6 network services"], p: [
        ["DHCP (processo DORA): scope, lease time, reservation (IP fisso per MAC), exclusion, options (gateway, DNS), relay / IP helper per raggiungere altre subnet.", "DHCP (DORA process): scope, lease time, reservations (fixed IP per MAC), exclusions, options (gateway, DNS), relay / IP helper to reach other subnets."],
        ["SLAAC: in IPv6 l'host si autoconfigura l'indirizzo dal prefisso annunciato dal router.", "SLAAC: in IPv6 the host self-configures its address from the router-advertised prefix."],
        ["Record DNS: A (IPv4), AAAA (IPv6), CNAME (alias), MX (posta), TXT (SPF, verifica), NS (name server), PTR (reverse).", "DNS records: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (SPF, verification), NS (name server), PTR (reverse)."],
        ["Zone: forward e reverse, primary e secondary, authoritative contro non-authoritative, query ricorsive. File hosts locale.", "Zones: forward and reverse, primary and secondary, authoritative versus non-authoritative, recursive queries. Local hosts file."],
        ["Sicurezza DNS: DNSSEC (firma dei record, integrità), DoH (DNS over HTTPS, 443), DoT (DNS over TLS, 853).", "DNS security: DNSSEC (signed records, integrity), DoH (DNS over HTTPS, 443), DoT (DNS over TLS, 853)."],
        ["Tempo: NTP (UDP 123), PTP (precisione sub-microsecondo), NTS (NTP protetto).", "Time: NTP (UDP 123), PTP (sub-microsecond precision), NTS (secured NTP)."]
      ] },
      { n: "3.5", t: ["Accesso e gestione della rete", "Compare and contrast network access and management methods"], p: [
        ["VPN site-to-site (collega due sedi) e client-to-site (utente remoto); clientless via browser.", "Site-to-site VPN (links two sites) and client-to-site (remote user); clientless via browser."],
        ["Split tunnel (solo il traffico aziendale nel tunnel) contro full tunnel (tutto il traffico nel tunnel).", "Split tunnel (only corporate traffic in the tunnel) versus full tunnel (all traffic in the tunnel)."],
        ["Metodi di connessione: SSH, GUI, API, console.", "Connection methods: SSH, GUI, API, console."],
        ["Jump box / jump host: punto intermedio controllato per amministrare sistemi in zone protette.", "Jump box / jump host: controlled intermediate point to administer systems in protected zones."],
        ["In-band (gestione sulla rete di produzione) contro out-of-band (rete o porta dedicata, funziona anche se la produzione è giù).", "In-band (management over the production network) versus out-of-band (dedicated network or port, works when production is down)."]
      ] }
    ] },
    { num: 4, w: 14, t: ["Sicurezza di rete", "Network Security"], objs: [
      { n: "4.1", t: ["Concetti base di sicurezza di rete", "Explain the importance of basic network security concepts"], p: [
        ["Cifratura dei dati in transito (TLS, IPsec) e a riposo (disco, database). Certificati: PKI e self-signed.", "Encryption of data in transit (TLS, IPsec) and at rest (disk, database). Certificates: PKI and self-signed."],
        ["IAM, autenticazione: MFA, SSO, RADIUS (UDP, cifra solo la password), TACACS+ (TCP 49, cifra tutto, separa AAA), LDAP, SAML, time-based.", "IAM, authentication: MFA, SSO, RADIUS (UDP, encrypts only the password), TACACS+ (TCP 49, encrypts everything, separates AAA), LDAP, SAML, time-based."],
        ["Autorizzazione: least privilege e RBAC (Role-Based Access Control). Geofencing: accesso in base alla posizione.", "Authorization: least privilege and RBAC (Role-Based Access Control). Geofencing: access by location."],
        ["Sicurezza fisica: telecamere, serrature. Deception: honeypot (un sistema esca) e honeynet (rete di esche).", "Physical security: cameras, locks. Deception: honeypot (decoy system) and honeynet (decoy network)."],
        ["Termini: risk, vulnerability (debolezza), exploit (sfruttamento), threat (minaccia), triade CIA (Confidentiality, Integrity, Availability).", "Terms: risk, vulnerability (weakness), exploit, threat, CIA triad (Confidentiality, Integrity, Availability)."],
        ["Conformità: data locality, PCI DSS (carte di pagamento), GDPR (dati personali UE). Segmentazione per IoT/IIoT, SCADA/ICS/OT, guest, BYOD.", "Compliance: data locality, PCI DSS (payment cards), GDPR (EU personal data). Segmentation for IoT/IIoT, SCADA/ICS/OT, guest, BYOD."]
      ] },
      { n: "4.2", t: ["Tipi di attacco", "Summarize various types of attacks and their impact to the network"], p: [
        ["DoS / DDoS: saturano risorse per negare il servizio (DDoS da molte sorgenti).", "DoS / DDoS: exhaust resources to deny service (DDoS from many sources)."],
        ["VLAN hopping (switch spoofing o double tagging), MAC flooding (riempie la tabella CAM, lo switch si comporta da hub).", "VLAN hopping (switch spoofing or double tagging), MAC flooding (fills the CAM table, switch behaves like a hub)."],
        ["ARP poisoning / spoofing: associa il MAC dell'attaccante all'IP del gateway. DNS poisoning / spoofing: risposte DNS false.", "ARP poisoning / spoofing: ties the attacker's MAC to the gateway IP. DNS poisoning / spoofing: forged DNS answers."],
        ["Dispositivi e servizi rogue: DHCP server o AP non autorizzati. Evil twin: AP falso con lo stesso SSID.", "Rogue devices and services: unauthorised DHCP server or AP. Evil twin: fake AP with the same SSID."],
        ["On-path attack (ex man-in-the-middle): l'attaccante si inserisce nella comunicazione.", "On-path attack (formerly man-in-the-middle): the attacker sits inside the conversation."],
        ["Social engineering: phishing, dumpster diving, shoulder surfing, tailgating. Malware.", "Social engineering: phishing, dumpster diving, shoulder surfing, tailgating. Malware."]
      ] },
      { n: "4.3", t: ["Funzioni e tecniche di difesa", "Given a scenario, apply network security features, defense techniques, and solutions"], p: [
        ["Hardening: disabilitare porte e servizi inutilizzati, cambiare le password di default.", "Hardening: disable unused ports and services, change default passwords."],
        ["NAC (Network Access Control): port security (limite di MAC per porta), 802.1X (autenticazione per porta con RADIUS), MAC filtering.", "NAC (Network Access Control): port security (MAC limit per port), 802.1X (port authentication with RADIUS), MAC filtering."],
        ["Key management: creazione, rotazione e custodia delle chiavi.", "Key management: key creation, rotation and safekeeping."],
        ["Regole: ACL (lette dall'alto, primo match, deny implicito alla fine), URL filtering, content filtering.", "Rules: ACLs (read top down, first match, implicit deny at the end), URL filtering, content filtering."],
        ["Zone: trusted contro untrusted, screened subnet (ex DMZ) per i servizi esposti a Internet.", "Zones: trusted versus untrusted, screened subnet (formerly DMZ) for Internet-facing services."]
      ] }
    ] },
    { num: 5, w: 24, t: ["Troubleshooting di rete", "Network Troubleshooting"], objs: [
      { n: "5.1", t: ["Metodologia di troubleshooting", "Explain the troubleshooting methodology"], p: [
        ["1. Identificare il problema: raccogliere informazioni, interrogare gli utenti, individuare i sintomi, capire cosa è cambiato, replicare il problema, affrontare più problemi uno alla volta.", "1. Identify the problem: gather information, question users, identify symptoms, determine what changed, duplicate the problem, approach multiple problems individually."],
        ["2. Stabilire una teoria della causa probabile: mettere in dubbio l'ovvio, approccio top-to-bottom o bottom-to-top sul modello OSI, divide and conquer.", "2. Establish a theory of probable cause: question the obvious, top-to-bottom or bottom-to-top OSI approach, divide and conquer."],
        ["3. Verificare la teoria: se confermata si passa al piano, altrimenti nuova teoria o escalation.", "3. Test the theory: if confirmed move to the plan, otherwise new theory or escalate."],
        ["4. Definire un piano d'azione e individuarne i possibili effetti.", "4. Establish a plan of action and identify potential effects."],
        ["5. Implementare la soluzione o fare escalation.", "5. Implement the solution or escalate as necessary."],
        ["6. Verificare la piena funzionalità del sistema e applicare misure preventive.", "6. Verify full system functionality and implement preventive measures."],
        ["7. Documentare risultati, azioni, esiti e lezioni apprese.", "7. Document findings, actions, outcomes and lessons learned."]
      ], x: ["L'ordine dei 7 passi è materia d'esame: la domanda tipica chiede qual è il passo successivo.", "The order of the 7 steps is tested: the typical question asks what the next step is."] },
      { n: "5.2", t: ["Problemi di cablaggio e interfacce fisiche", "Given a scenario, troubleshoot common cabling and physical interface issues"], p: [
        ["Cavo sbagliato: single-mode contro multimode, categoria (Cat 5/6/7/8), STP contro UTP.", "Wrong cable: single-mode versus multimode, category (Cat 5/6/7/8), STP versus UTP."],
        ["Degrado del segnale: crosstalk, interferenza (EMI), attenuazione (distanza eccessiva). Terminazione errata. TX/RX invertiti.", "Signal degradation: crosstalk, interference (EMI), attenuation (too much distance). Improper termination. TX/RX transposed."],
        ["Contatori in aumento: CRC (cavo o interferenza), runt (frame sotto 64 byte, collisioni), giant (frame oltre MTU), drop.", "Rising counters: CRC (cable or interference), runts (frames under 64 bytes, collisions), giants (frames over MTU), drops."],
        ["Stato porta: error disabled (bloccata da una protezione, es. port security o BPDU guard), administratively down (shutdown manuale), suspended.", "Port status: error disabled (shut by a protection such as port security or BPDU guard), administratively down (manual shutdown), suspended."],
        ["PoE: budget di potenza superato o standard errato (802.3af 15,4 W, 802.3at 30 W, 802.3bt fino a 90 W).", "PoE: power budget exceeded or wrong standard (802.3af 15.4 W, 802.3at 30 W, 802.3bt up to 90 W)."],
        ["Transceiver: tipo non corrispondente o potenza del segnale insufficiente.", "Transceivers: mismatched type or insufficient signal strength."]
      ] },
      { n: "5.3", t: ["Problemi dei servizi di rete", "Given a scenario, troubleshoot common issues with network services"], p: [
        ["Switching, STP: loop di rete (broadcast storm), elezione del root bridge, ruoli e stati delle porte. VLAN assegnata in modo errato. ACL che bloccano.", "Switching, STP: network loops (broadcast storm), root bridge selection, port roles and states. Incorrect VLAN assignment. Blocking ACLs."],
        ["Routing: tabella di routing, rotta mancante, default route errata.", "Routing: routing table, missing route, wrong default route."],
        ["Esaurimento del pool DHCP: i client ricevono un indirizzo APIPA 169.254.x.x.", "DHCP pool exhaustion: clients fall back to an APIPA 169.254.x.x address."],
        ["Default gateway errato: funziona la rete locale ma non le reti remote.", "Incorrect default gateway: local network works but remote networks do not."],
        ["IP errato o duplicato, subnet mask errata: comunicazione parziale con alcuni host.", "Incorrect or duplicate IP, wrong subnet mask: partial communication with some hosts."]
      ] },
      { n: "5.4", t: ["Problemi di prestazioni", "Given a scenario, troubleshoot common performance issues"], p: [
        ["Congestione / contesa, colli di bottiglia, banda e throughput insufficienti.", "Congestion / contention, bottlenecking, insufficient bandwidth and throughput."],
        ["Latency (ritardo), packet loss (pacchetti persi), jitter (variazione del ritardo, critico per voce e video).", "Latency (delay), packet loss, jitter (delay variation, critical for voice and video)."],
        ["Wireless: interferenza e sovrapposizione dei canali, degrado o perdita del segnale, copertura insufficiente.", "Wireless: interference and channel overlap, signal degradation or loss, insufficient coverage."],
        ["Wireless: disassociazione dei client, roaming mal configurato.", "Wireless: client disassociation issues, roaming misconfiguration."]
      ] },
      { n: "5.5", t: ["Strumenti e protocolli di diagnosi", "Given a scenario, use the appropriate tool or protocol to solve networking issues"], p: [
        ["Software: protocol analyzer (Wireshark), nmap (porte e host), LLDP/CDP (scoperta dei vicini), speed tester.", "Software: protocol analyser (Wireshark), nmap (ports and hosts), LLDP/CDP (neighbour discovery), speed tester."],
        ["Riga di comando: ping, traceroute / tracert, nslookup, dig, tcpdump, netstat, ip / ifconfig / ipconfig, arp.", "Command line: ping, traceroute / tracert, nslookup, dig, tcpdump, netstat, ip / ifconfig / ipconfig, arp."],
        ["Hardware: toner (trova il cavo), cable tester (continuità e mappatura dei fili), tap, Wi-Fi analyzer, visual fault locator (rotture della fibra).", "Hardware: toner (finds the cable), cable tester (continuity and wire map), tap, Wi-Fi analyser, visual fault locator (fibre breaks)."],
        ["Comandi sugli apparati: show mac-address-table, show route, show interface, show config, show arp, show vlan, show power.", "Device commands: show mac-address-table, show route, show interface, show config, show arp, show vlan, show power."]
      ], x: ["Abbina sintomo e strumento: nome non risolto = nslookup o dig; dove si ferma il percorso = traceroute; connessioni e porte locali = netstat.", "Match symptom to tool: name not resolving = nslookup or dig; where the path stops = traceroute; local connections and ports = netstat."] }
    ] }
  ],
  sheets: [
    { t: ["Porte e protocolli", "Ports and protocols"], cols: [["Protocollo", "Protocol"], ["Porta", "Port"], ["Uso", "Use"]], rows: [
      ["FTP", "TCP 20/21", ["Trasferimento file (in chiaro)", "File transfer (cleartext)"]],
      ["SSH / SFTP", "TCP 22", ["Shell remota e file transfer cifrati", "Encrypted remote shell and file transfer"]],
      ["Telnet", "TCP 23", ["Shell remota in chiaro", "Cleartext remote shell"]],
      ["SMTP", "TCP 25", ["Invio posta tra server", "Mail transfer between servers"]],
      ["DNS", "TCP/UDP 53", ["Risoluzione dei nomi", "Name resolution"]],
      ["DHCP", "UDP 67/68", ["Assegnazione automatica IP", "Automatic IP assignment"]],
      ["TFTP", "UDP 69", ["File transfer semplice, senza autenticazione", "Simple file transfer, no authentication"]],
      ["HTTP", "TCP 80", ["Web in chiaro", "Cleartext web"]],
      ["NTP", "UDP 123", ["Sincronizzazione oraria", "Time synchronisation"]],
      ["SNMP", "UDP 161/162", ["Monitoraggio (162 = trap)", "Monitoring (162 = traps)"]],
      ["LDAP", "TCP 389", ["Servizi di directory", "Directory services"]],
      ["HTTPS", "TCP 443", ["Web cifrato con TLS", "TLS-encrypted web"]],
      ["SMB", "TCP 445", ["Condivisione file Windows", "Windows file sharing"]],
      ["Syslog", "UDP 514", ["Raccolta log", "Log collection"]],
      ["SMTPS", "TCP 587", ["Invio posta cifrato", "Encrypted mail submission"]],
      ["LDAPS", "TCP 636", ["LDAP su TLS", "LDAP over TLS"]],
      ["SQL Server", "TCP 1433", ["Database Microsoft", "Microsoft database"]],
      ["RDP", "TCP 3389", ["Desktop remoto", "Remote desktop"]],
      ["SIP", "TCP/UDP 5060/5061", ["Segnalazione VoIP (5061 = TLS)", "VoIP signalling (5061 = TLS)"]]
    ] },
    { t: ["Tabella CIDR", "CIDR table"], cols: ["CIDR", ["Maschera", "Mask"], ["Blocco", "Block"], ["Host utili", "Usable hosts"]], rows: [
      ["/24", "255.255.255.0", "256", "254"], ["/25", "255.255.255.128", "128", "126"], ["/26", "255.255.255.192", "64", "62"],
      ["/27", "255.255.255.224", "32", "30"], ["/28", "255.255.255.240", "16", "14"], ["/29", "255.255.255.248", "8", "6"],
      ["/30", "255.255.255.252", "4", "2"], ["/16", "255.255.0.0", "65 536", "65 534"], ["/8", "255.0.0.0", "16 777 216", "16 777 214"]
    ] },
    { t: ["Standard Wi-Fi", "Wi-Fi standards"], cols: ["Standard", ["Nome", "Name"], ["Banda", "Band"], ["Velocità max", "Max speed"]], rows: [
      ["802.11a", "-", "5 GHz", "54 Mbps"], ["802.11b", "-", "2.4 GHz", "11 Mbps"], ["802.11g", "-", "2.4 GHz", "54 Mbps"],
      ["802.11n", "Wi-Fi 4", "2.4 / 5 GHz", "600 Mbps"], ["802.11ac", "Wi-Fi 5", "5 GHz", "~6.9 Gbps"], ["802.11ax", "Wi-Fi 6 / 6E", "2.4 / 5 / 6 GHz", "~9.6 Gbps"]
    ] }
  ]
};
