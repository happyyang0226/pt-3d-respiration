    /* ===== 공용 3D 엔진: 세포막 · 이온 · 통로 · 펌프 · 축삭 (인체의 움직임 조절 1편 시리즈) ===== */
    let scene3D, camera3D, renderer3D;
    const W = { ions: {}, chans: {}, pumps: {}, transit: [], vmHist: [] };
    const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
    const ION = {
      Na: { c: 0x60a5fa, r: 0.24, t: 'Na⁺' }, K: { c: 0xfb923c, r: 0.27, t: 'K⁺' }, Cl: { c: 0xa3e635, r: 0.24, t: 'Cl⁻' },
      A: { c: 0xc084fc, r: 0.36, t: 'A⁻' }, Ca: { c: 0x34d399, r: 0.25, t: 'Ca²⁺' }
    };
    const TEXC = {};
    function textTex(t, fg) {
      const k = t + fg; if (TEXC[k]) return TEXC[k];
      const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d');
      g.font = '800 64px "Noto Sans KR", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.lineWidth = 12; g.strokeStyle = 'rgba(2,6,23,.85)'; g.strokeText(t, 128, 66); g.fillStyle = fg || '#fff'; g.fillText(t, 128, 66);
      const tx = new THREE.CanvasTexture(c); TEXC[k] = tx; return tx;
    }
    function sprite(t, s, fg) { const m = new THREE.SpriteMaterial({ map: textTex(t, fg), depthTest: false, transparent: true }); const sp = new THREE.Sprite(m); sp.scale.set(s * 2, s, 1); sp.renderOrder = 20; return sp; }
    function glowMat(c, e) { return new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: e == null ? 0.35 : e, roughness: 0.35, metalness: 0.05, transparent: true, opacity: 1 }); }
    function rnd(s) { const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
    function ez(u) { u = Math.max(0, Math.min(1, u)); return u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
    const OUT = { y0: 1.75, y1: 4.0 }, INN = { y0: -4.0, y1: -1.75 };

    function initThree3D() {
      const rect = dom.viewport.getBoundingClientRect();
      const width = rect.width || 960, height = rect.height || 540;
      scene3D = new THREE.Scene();
      scene3D.fog = new THREE.FogExp2(0x040711, 0.028);
      camera3D = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      renderer3D = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer3D.setSize(width, height);
      renderer3D.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer3D.toneMapping = THREE.ACESFilmicToneMapping;
      renderer3D.toneMappingExposure = 1.2;
      dom.threeContainer.appendChild(renderer3D.domElement);
      scene3D.add(new THREE.AmbientLight(0x1e293b, 1.5));
      const key = new THREE.DirectionalLight(0xe0f2fe, 1.6); key.position.set(6, 9, 8); scene3D.add(key);
      const rim = new THREE.DirectionalLight(0x38bdf8, 1.1); rim.position.set(-7, 4, -8); scene3D.add(rim);
      const fill = new THREE.DirectionalLight(0xfbbf24, 0.5); fill.position.set(0, -8, 4); scene3D.add(fill);
      const sg = new THREE.BufferGeometry(), sp = new Float32Array(260 * 3);
      for (let i = 0; i < 260; i++) { sp[i * 3] = (Math.random() - .5) * 24; sp[i * 3 + 1] = (Math.random() - .5) * 18; sp[i * 3 + 2] = (Math.random() - .5) * 24; }
      sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
      W.stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.07, transparent: true, opacity: 0.4 })); scene3D.add(W.stars);
      W.mem = new THREE.Group(); scene3D.add(W.mem);
      W.axonG = new THREE.Group(); scene3D.add(W.axonG); W.axonG.visible = false;
      buildMembrane(EP.slots || []);
      buildIons();
      (EP.channels || []).forEach(c => buildChannel(c));
      (EP.pumps || []).forEach(p => buildPump(p));
      buildCharge(); buildTransit(); if (EP.electrode) buildElectrode(); if (EP.axon) buildAxon();
      if (EP.build) EP.build();
      initSpatialLabels();
      window.addEventListener('resize', onViewportResize);
    }
    function onViewportResize() {
      if (!renderer3D || !camera3D) return;
      const rect = dom.viewport.getBoundingClientRect();
      camera3D.aspect = (rect.width || 960) / (rect.height || 540); camera3D.updateProjectionMatrix();
      renderer3D.setSize(rect.width || 960, rect.height || 540);
    }
    /* --- 인지질 이중층 --- */
    function buildMembrane(slots) {
      const L = [];
      for (let x = -6.4; x <= 6.41; x += 0.55) for (let z = -3.6; z <= 3.61; z += 0.55) {
        const px = x + (rnd(x * 7 + z * 13) - .5) * .16, pz = z + (rnd(x * 3 + z * 5) - .5) * .16;
        if (slots.some(s => Math.hypot(px - s[0], pz - s[1]) < (s[2] || 0.95))) continue;
        [1, -1].forEach(sd => L.push({ x: px, z: pz, s: sd, ph: rnd(px * 11 + pz * 17 + sd) * 6.28 }));
      }
      W.lip = L;
      W.heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.23, 12, 10), new THREE.MeshStandardMaterial({ color: 0xf4c96b, emissive: 0x7c4a03, emissiveIntensity: 0.25, roughness: 0.5 }), L.length);
      const tg = new THREE.CylinderGeometry(0.04, 0.035, 0.95, 5);
      W.tails = new THREE.InstancedMesh(tg, new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8, transparent: true, opacity: 0.85 }), L.length * 2);
      W.mem.add(W.heads); W.mem.add(W.tails);
      const dmy = new THREE.Object3D();
      W.updLip = function (now, cut) {
        const w = now * 0.001;
        L.forEach((l, i) => {
          const b = Math.sin(w * 1.4 + l.ph) * .035, k = (cut && l.z > 0.3) ? 1e-4 : 1;
          dmy.position.set(l.x, l.s * 1.4 + b, l.z); dmy.rotation.set(0, 0, 0); dmy.scale.setScalar(k); dmy.updateMatrix(); W.heads.setMatrixAt(i, dmy.matrix);
          for (let t = 0; t < 2; t++) { dmy.position.set(l.x + (t ? .07 : -.07), l.s * 0.88 + b, l.z); dmy.rotation.set(0, 0, Math.sin(w + l.ph + t) * .08); dmy.updateMatrix(); W.tails.setMatrixAt(i * 2 + t, dmy.matrix); }
        });
        W.heads.instanceMatrix.needsUpdate = true; W.tails.instanceMatrix.needsUpdate = true;
      };
      W.updLip(0, false);
    }
    /* --- 이온 무리 (세포 밖 / 안) --- */
    function ionMesh(type) {
      const d = ION[type]; const m = new THREE.Mesh(new THREE.SphereGeometry(d.r, 18, 14), glowMat(d.c, 0.45));
      const s = sprite(d.t, d.r * 1.25); m.add(s); m.userData.sp = s; return m;
    }
    function setOp(m, o) { m.material.opacity = o; m.visible = o > 0.02; if (m.userData.sp) m.userData.sp.material.opacity = o; }
    function buildIons() {
      Object.keys(ION).forEach((type, ti) => {
        W.ions[type] = { out: [], in: [], nOut: 0, nIn: 0 };
        ['out', 'in'].forEach((side, si) => {
          const R = side === 'out' ? OUT : INN;
          for (let k = 0; k < 26; k++) {
            const m = ionMesh(type); const sd = ti * 100 + si * 50 + k;
            m.userData.b = V3((rnd(sd) - .5) * 12, R.y0 + rnd(sd + .3) * (R.y1 - R.y0), (rnd(sd + .7) - .5) * 7);
            m.userData.ph = rnd(sd + .1) * 6.28; m.position.copy(m.userData.b); setOp(m, 0); W.mem.add(m); W.ions[type][side].push(m);
          }
        });
      });
    }
    function setPools(p) { const f = EP.dens ? EP.dens(state.currentScene) : 1; Object.keys(W.ions).forEach(t => { const v = p[t] || [0, 0]; W.ions[t].nOut = Math.round(v[0] * f); W.ions[t].nIn = Math.round(v[1] * f); }); }
    function updIons(dt, now) {
      const w = now * 0.001;
      Object.keys(W.ions).forEach(t => {
        const I = W.ions[t];
        ['out', 'in'].forEach(side => {
          const n = side === 'out' ? I.nOut : I.nIn;
          I[side].forEach((m, k) => {
            const tgt = k < n ? 1 : 0; const o = m.material.opacity + (tgt - m.material.opacity) * Math.min(1, dt * 0.004);
            setOp(m, o); const b = m.userData.b, ph = m.userData.ph;
            m.position.set(b.x + Math.sin(w * .8 + ph) * .28, b.y + Math.cos(w * .7 + ph * 1.3) * .2, b.z + Math.sin(w * .6 + ph * .7) * .28);
          });
        });
      });
    }
    /* --- 이온 통로 --- */
    const CHC = { kleak: 0xfb923c, naleak: 0x60a5fa, nav: 0x3b82f6, kv: 0xf97316 };
    function buildChannel(c) {
      const g = new THREE.Group(); g.position.set(c.pos[0], 0, c.pos[1]); W.mem.add(g);
      const col = CHC[c.type], mat = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.25, roughness: 0.4, transparent: true, opacity: 0.92 });
      for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const m = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3.1, 14), mat); m.position.set(Math.cos(a) * 0.45, 0, Math.sin(a) * 0.45); g.add(m); }
      const o = { type: c.type, name: c.name, g: g, mat: mat, open: c.type.indexOf('leak') > 0 ? 1 : 0, inact: 0, pos: V3(c.pos[0], 0, c.pos[1]) };
      if (c.type === 'nav') {
        o.hA = new THREE.Group(); o.hA.position.set(-0.55, 1.62, 0); const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.1, 28), glowMat(0x22c55e, 0.5)); lid.position.x = 0.55; o.hA.add(lid); g.add(o.hA);
        o.hI = new THREE.Group(); o.hI.position.set(0.5, -1.62, 0.5); o.hI.rotation.y = 2.36; const lid2 = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.12, 24), glowMat(0xef4444, 0.5)); lid2.position.x = 0.72; o.hI.add(lid2); g.add(o.hI);
      }
      if (c.type === 'kv') { o.hK = new THREE.Group(); o.hK.position.set(-0.55, -1.62, 0); const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.1, 28), glowMat(0xeab308, 0.5)); lid.position.x = 0.55; o.hK.add(lid); g.add(o.hK); }
      W.chans[c.name] = o; return o;
    }
    function updChannels() {
      Object.values(W.chans).forEach(o => {
        if (o.hA) o.hA.rotation.z = 1.35 * o.open;
        if (o.hI) o.hI.rotation.z = -1.25 * (1 - o.inact);
        if (o.hK) o.hK.rotation.z = -1.35 * o.open;
        o.mat.emissiveIntensity = 0.2 + 0.6 * (o.open * (1 - o.inact));
      });
    }
    /* --- 지나가는 이온 (통로·펌프를 통과) --- */
    function buildTransit() {
      for (let i = 0; i < 70; i++) { const m = ionMesh('Na'); setOp(m, 0); W.mem.add(m); W.transit.push({ m: m, u: -1 }); }
    }
    function spawnTransit(type, from, to, through, dur) {
      const t = W.transit.find(x => x.u < 0); if (!t) return;
      const d = ION[type]; t.m.material.color.setHex(d.c); t.m.material.emissive.setHex(d.c); t.m.userData.sp.material.map = textTex(d.t); t.m.scale.setScalar(d.r / 0.24);
      const up = from.y > 0 ? 1 : -1;
      t.curve = new THREE.CatmullRomCurve3([from, V3(through.x, up * 1.9, through.z), V3(through.x, -up * 1.9, through.z), to]);
      t.u = 0; t.dur = dur || 1.3;
    }
    function rndIn(side, near) { const R = side === 'out' ? OUT : INN; const x = near ? near.x + (Math.random() - .5) * 4 : (Math.random() - .5) * 11; const z = near ? near.z + (Math.random() - .5) * 3 : (Math.random() - .5) * 6; return V3(x, R.y0 + Math.random() * (R.y1 - R.y0), z); }
    const FLX = {};
    function flux(chName, type, dir, rate, dt) {
      const ch = W.chans[chName]; if (!ch) return; FLX[chName] = (FLX[chName] || 0) + rate * dt / 1000;
      while (FLX[chName] >= 1) { FLX[chName] -= 1; const a = dir === 'in' ? 'out' : 'in', b = dir === 'in' ? 'in' : 'out'; spawnTransit(type, rndIn(a, ch.pos), rndIn(b, ch.pos), ch.pos); }
    }
    function updTransit(dt) {
      W.transit.forEach(t => { if (t.u < 0) return; t.u += dt / 1000 / t.dur; if (t.u >= 1) { t.u = -1; setOp(t.m, 0); return; } t.m.position.copy(t.curve.getPoint(ez(t.u))); setOp(t.m, t.u > .85 ? (1 - t.u) / .15 : 1); });
    }
    /* --- 펌프 (Na⁺-K⁺ · Ca²⁺ · NCX) --- */
    function buildPump(p) {
      const g = new THREE.Group(); g.position.set(p.pos[0], 0, p.pos[1]); W.mem.add(g);
      const col = { nak: 0x818cf8, ca: 0x10b981, ncx: 0x2dd4bf }[p.type];
      const o = { type: p.type, name: p.name, g: g, t: 0, run: false, speed: 1, halves: [], carry: [], cycles: 0, pos: V3(p.pos[0], 0, p.pos[1]) };
      [-1, 1].forEach(s => { const h = new THREE.Group(); h.position.x = 0.32 * s; g.add(h); const m = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.4, 22), new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.25, roughness: 0.4 })); m.scale.z = 1.5; h.add(m); o.halves.push(h); o.mat = m.material; });
      const lab = { nak: 'Na⁺-K⁺ 펌프', ca: 'Ca²⁺ 펌프', ncx: 'NCX' }[p.type];
      o.atp = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12), glowMat(0xfacc15, 0.7)); const as = sprite('ATP', 0.32); o.atp.add(as); o.atp.userData.sp = as; W.mem.add(o.atp); setOp(o.atp, 0);
      const spec = p.type === 'nak' ? [['Na', 'in2out'], ['Na', 'in2out'], ['Na', 'in2out'], ['K', 'out2in'], ['K', 'out2in']] : p.type === 'ca' ? [['Ca', 'in2out'], ['Ca', 'in2out']] : [['Na', 'out2in'], ['Na', 'out2in'], ['Na', 'out2in'], ['Ca', 'in2out']];
      spec.forEach((s, i) => { const m = ionMesh(s[0]); setOp(m, 0); W.mem.add(m); o.carry.push({ m: m, type: s[0], dir: s[1], k: i, a: null, b: null }); });
      W.pumps[p.name] = o; return o;
    }
    function updPumps(dt) {
      Object.values(W.pumps).forEach(o => {
        if (o.run) { o.t += dt / 1000 / (o.type === 'nak' ? 6.0 : 5.0) * o.speed; if (o.t >= 1) { o.t -= 1; o.cycles++; } }
        const t = o.t, P = o.pos;
        let s;
        if (o.type === 'ncx') s = Math.sin(t * Math.PI * 2) * 0.4;
        else if (o.type === 'nak') s = t < .3 ? -1 : t < .42 ? -1 + 2 * ez((t - .3) / .12) : t < .7 ? 1 : t < .82 ? 1 - 2 * ez((t - .7) / .12) : -1;
        else s = t < .3 ? -1 : t < .42 ? -1 + 2 * ez((t - .3) / .12) : t < .65 ? 1 : t < .77 ? 1 - 2 * ez((t - .65) / .12) : -1;
        o.halves[0].rotation.z = s * 0.16; o.halves[1].rotation.z = -s * 0.16;
        const flash = (o.type !== 'ncx' && t > .2 && t < .3) ? 1 : 0; o.mat.emissiveIntensity = 0.25 + flash * 0.8;
        const atpOn = o.type !== 'ncx' && o.run;
        const aS = V3(P.x + 1.6, -3.2, P.z + 1.2), aB = V3(P.x + 0.2, -1.95, P.z + 0.5);
        o.atp.position.copy(t < .2 ? aS.clone().lerp(aB, ez(t / .2)) : t < .3 ? aB : aB.clone().lerp(V3(P.x - 1.5, -3.6, P.z + 1.4), ez((t - .3) / .2)));
        o.atp.userData.sp.material.map = textTex(t > .27 ? 'ADP' : 'ATP');
        setOp(o.atp, atpOn ? (t < .05 ? t / .05 : t < .3 ? 1 : Math.max(0, 1 - (t - .3) / .2)) : 0);
        o.carry.forEach(c => {
          if (!c.a) { const sideA = c.dir === 'in2out' ? 'in' : 'out'; c.a = rndIn(sideA, P); c.b = rndIn(sideA === 'in' ? 'out' : 'in', P); c.off = V3((c.k % 3 - 1) * 0.22, 0, (c.k > 2 ? .2 : -.15)); }
          let w0, w1, op = 1;
          if (o.type === 'nak') { if (c.type === 'Na') { w0 = .0; w1 = .45; } else { w0 = .5; w1 = .95; } }
          else if (o.type === 'ca') { w0 = 0; w1 = .6; } else { w0 = .05; w1 = .85; }
          const u = (t - w0) / (w1 - w0);
          const site = P.clone().add(c.off);
          const ySign = c.dir === 'in2out' ? -1 : 1;
          let pos;
          if (u <= 0 || u >= 1) { op = 0; pos = c.a; if (u >= 1) { c.a = null; } }
          else if (u < .35) pos = c.a.clone().lerp(V3(site.x, ySign * 0.2, site.z), ez(u / .35));
          else if (u < .65) pos = V3(site.x, ySign * 0.2 - ySign * 0.4 * ez((u - .35) / .3), site.z);
          else pos = V3(site.x, -ySign * 0.2, site.z).lerp(c.b, ez((u - .65) / .35));
          if (!o.run) op = 0;
          c.m.position.copy(pos); setOp(c.m, op * (u < .08 ? u / .08 : u > .92 ? (1 - u) / .08 : 1));
        });
      });
    }
    /* --- 막 양쪽 전하 (+ / −) --- */
    function buildCharge() {
      W.chg = { out: [], in: [] };
      ['out', 'in'].forEach(side => {
        for (let i = 0; i < 24; i++) { const s = sprite('+', 0.42, '#f87171'); s.position.set(-5.5 + (i % 8) * 1.57, side === 'out' ? 2.0 : -2.0, -2.6 + Math.floor(i / 8) * 2.6); s.material.opacity = 0; W.mem.add(s); W.chg[side].push(s); }
      });
    }
    function setCharge(vm) {
      const a = Math.min(1, Math.abs(vm) / 80), neg = vm < 0;
      W.chg.out.forEach(s => { s.material.map = textTex(neg ? '+' : '−', neg ? '#f87171' : '#60a5fa'); s.material.opacity = a * 0.95; });
      W.chg.in.forEach(s => { s.material.map = textTex(neg ? '−' : '+', neg ? '#60a5fa' : '#f87171'); s.material.opacity = a * 0.95; });
    }
    /* --- 미세전극 --- */
    function buildElectrode() {
      const g = new THREE.Group(); const glass = new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.45, roughness: 0.1, emissive: 0x0ea5e9, emissiveIntensity: 0.15 });
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 4, 16), glass); tube.position.y = 6.2; g.add(tube);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.22, 4.2, 16), glass); cone.rotation.x = Math.PI; cone.position.y = 2.1; g.add(cone);
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 7.5, 6), glowMat(0xe5e7eb, 0.3)); wire.position.y = 4; g.add(wire);
      g.position.set(-4.2, 0, 1.6); W.mem.add(g); W.electrode = g; g.userData.tipY = -2.1;
    }
    /* --- 축삭 (전도) --- */
    function buildAxon() {
      const G = W.axonG;
      const ax = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 15, 32, 1, true), new THREE.MeshStandardMaterial({ color: 0xfde68a, emissive: 0x854d0e, emissiveIntensity: 0.2, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
      ax.rotation.z = Math.PI / 2; G.add(ax); W.axMesh = ax;
      W.myel = []; W.nodes = [];
      for (let i = 0; i < 6; i++) { const cx = -6.3 + i * 2.5; const m = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 2.1, 32), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, emissive: 0x334155, emissiveIntensity: 0.2, transparent: true, opacity: 0.85, roughness: 0.4 })); m.rotation.z = Math.PI / 2; m.position.x = cx; G.add(m); W.myel.push(m); }
      for (let i = 0; i < 7; i++) W.nodes.push(-7.55 + i * 2.5);
      W.apRing = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.13, 12, 40), glowMat(0xfacc15, 1.4)); W.apRing.rotation.y = Math.PI / 2; G.add(W.apRing); W.apRing.visible = false;
      W.refr = []; for (let i = 0; i < 30; i++) { const m = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.06, 8, 30), glowMat(0x60a5fa, 0.8)); m.rotation.y = Math.PI / 2; m.visible = false; G.add(m); W.refr.push({ m: m, life: 0 }); }
      W.spark = []; for (let i = 0; i < 26; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0x93c5fd })); m.visible = false; G.add(m); W.spark.push(m); }
      W.ap = { on: false, x: -7.4, mode: 'myel', last: -99, amp: 1, nodeIdx: 0, dwell: 0, fails: false };
      W.recX = 2.0; W.rec = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.4, 10), glowMat(0x38bdf8, 0.6)); W.rec.rotation.x = Math.PI; W.rec.position.set(W.recX, 1.6, 0); G.add(W.rec);
    }
    function axonSetup(mode) { W.ap.mode = mode; W.myel.forEach((m, i) => { m.visible = mode === 'myel' || (mode === 'demyel' && i !== 2 && i !== 3); }); }
    function fireAP(nowS) { if (W.ap.on && W.ap.x < 6) return 'busy'; if (nowS - W.ap.last < 0.45) return 'refr'; W.ap.on = true; W.ap.x = -7.4; W.ap.amp = 1; W.ap.nodeIdx = 0; W.ap.dwell = 0; W.ap.last = nowS; return 'ok'; }
    function updAxon(dt, nowS) {
      if (!W.apRing) return 0;
      const A = W.ap, s = dt / 1000;
      if (A.on) {
        if (A.mode === 'unmyel') A.x += 2.2 * s;
        else { const inDemyel = A.mode === 'demyel' && A.x > -2.0 && A.x < 2.9; if (inDemyel) { A.x += 1.6 * s; A.amp -= 0.33 * s; } else { A.dwell += s; if (A.dwell > 0.16) { A.dwell = 0; A.nodeIdx++; A.x = W.nodes[Math.min(W.nodes.length - 1, A.nodeIdx)]; if (A.mode === 'demyel' && A.x > -2.0 && A.x < 2.9) A.x = -1.9; } } }
        if (A.amp < 0.55) { A.on = false; A.fails = true; }
        if (A.x > 7.4) A.on = false;
        const fr = W.refr.find(r => r.life <= 0); if (fr && Math.random() < 0.5) { fr.life = 1; fr.m.position.x = A.x; }
      }
      W.apRing.visible = A.on; W.apRing.position.x = A.x; W.apRing.scale.setScalar(0.8 + A.amp * 0.4); W.apRing.material.emissiveIntensity = 0.6 + A.amp;
      W.refr.forEach(r => { if (r.life > 0) { r.life -= s * 0.9; r.m.visible = true; r.m.material.opacity = r.life * 0.7; } else r.m.visible = false; });
      W.spark.forEach((m, i) => { m.visible = A.on; if (A.on) { const a = i / W.spark.length * 6.28 + nowS * 3; m.position.set(A.x + (Math.random() - .5) * .3, Math.cos(a) * (1.1 - (nowS * 2 + i) % 1 * .6), Math.sin(a) * (1.1 - (nowS * 2 + i) % 1 * .6)); } });
      const d = Math.abs(A.x - W.recX); return A.on && d < 0.9 ? -70 + 105 * A.amp * (1 - d / 0.9) : (nowS - A.last < 1.2 && A.last > 0 && !A.on ? -78 : -70);
    }
    /* --- 3D 공간 이름표 --- */
    const spatialLabelNodes = {};
    function initSpatialLabels() {
      dom.spatialLabelsLayer.innerHTML = '';
      (EP.labels || []).forEach(def => {
        const el = document.createElement('div');
        el.className = 'spatial-tag px-2.5 py-1 rounded-lg bg-slate-950/85 border text-[11px] font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5';
        el.style.borderColor = def.color; el.style.color = def.color;
        el.innerHTML = `<span class="w-1.5 h-1.5 rounded-full" style="background:${def.color}"></span><span>${def.text}</span>`;
        dom.spatialLabelsLayer.appendChild(el); spatialLabelNodes[def.id] = el;
      });
    }
    function updateSpatialLabelsProjection() {
      if (!camera3D) return;
      const rect = dom.viewport.getBoundingClientRect();
      (EP.labels || []).forEach(def => {
        const el = spatialLabelNodes[def.id]; if (!el) return;
        if (!def.scenes.includes(state.currentScene)) { el.style.opacity = '0'; return; }
        const p = (typeof def.pos === 'function' ? def.pos() : V3(def.pos[0], def.pos[1], def.pos[2])).clone();
        if (def.dyn) { const tx = def.dyn(); if (!tx || !tx.trim()) { el.style.opacity = '0'; return; } if (el._t !== tx) { el._t = tx; el.lastChild.textContent = tx; } }
        p.project(camera3D);
        if (p.z > 1) { el.style.opacity = '0'; return; }
        el.style.left = `${(p.x * .5 + .5) * rect.width}px`; el.style.top = `${(-p.y * .5 + .5) * rect.height}px`; el.style.opacity = '0.95';
      });
    }
    /* --- 텔레메트리 HUD --- */
    const HUD = { phase: '', vm: -70, g1: [0, ''], g2: [0, ''] };
    function setHud(o) { Object.assign(HUD, o); }
    function syncTelemetryHUD() {
      dom.telemetryPhaseLabel.textContent = HUD.phase;
      dom.hudVm.textContent = (HUD.vm > 0 ? '+' : '') + Math.round(HUD.vm);
      dom.hudVm.className = 'text-base sm:text-lg font-bold ' + (HUD.vm > -50 ? 'text-amber-300' : 'text-sky-300');
      dom.hudG1Val.textContent = HUD.g1[1]; dom.hudG1Bar.style.width = Math.max(4, Math.min(100, HUD.g1[0])) + '%';
      dom.hudG2Val.textContent = HUD.g2[1]; dom.hudG2Bar.style.width = Math.max(4, Math.min(100, HUD.g2[0])) + '%';
      W.vmHist.push(HUD.vm); if (W.vmHist.length > 180) W.vmHist.shift();
      const cv = dom.vmScope; if (!cv) return; const g = cv.getContext('2d'), w = cv.width, h = cv.height; g.clearRect(0, 0, w, h);
      const Y = v => 6 + (45 - v) / 140 * (h - 12);
      g.strokeStyle = 'rgba(248,113,113,.6)'; g.setLineDash([3, 3]); g.beginPath(); g.moveTo(0, Y(-55)); g.lineTo(w, Y(-55)); g.stroke(); g.setLineDash([]);
      g.strokeStyle = 'rgba(148,163,184,.35)'; g.beginPath(); g.moveTo(0, Y(0)); g.lineTo(w, Y(0)); g.stroke();
      g.strokeStyle = '#38bdf8'; g.lineWidth = 2; g.beginPath(); W.vmHist.forEach((v, i) => { const x = i / 179 * w; i ? g.lineTo(x, Y(v)) : g.moveTo(x, Y(v)); }); g.stroke();
    }
    /* --- 카메라 + 장면 갱신 --- */
    let lastSceneSet = -1;
    function updateSimulationAnd3D(dt, now) {
      const target = SCENES[state.currentScene].cameraTarget;
      const lerp = 1 - Math.exp(-dt * 0.0042);
      ['theta', 'phi', 'radius', 'targetX', 'targetY', 'targetZ'].forEach(k => { state.cam[k] += (target[k] - state.cam[k]) * lerp; });
      const userLerp = 1 - Math.exp(-dt * 0.014);
      state.cam.userZoomMult += (state.cam.targetUserZoomMult - state.cam.userZoomMult) * userLerp;
      state.cam.userPanX += (state.cam.targetUserPanX - state.cam.userPanX) * userLerp;
      state.cam.userPanY += (state.cam.targetUserPanY - state.cam.userPanY) * userLerp;
      if (dom.zoomLevelLabel) dom.zoomLevelLabel.textContent = `${Math.round(state.cam.userZoomMult * 100)}%`;
      if (!state.cam.dragMode) state.cam.theta += Math.sin(now * 0.00065) * 0.00045;
      const effTheta = state.cam.theta + state.cam.userThetaOffset;
      const effPhi = Math.max(0.35, Math.min(2.65, state.cam.phi + state.cam.userPhiOffset));
      const asp = camera3D.aspect || 1.6, fit = asp < 1.3 ? Math.min(2.0, Math.pow(1.6 / asp, 0.8)) : 1; /* 세로 화면이면 뒤로 물러나 전체가 보이게 */
      const effRadius = Math.max(3.6, Math.min(34.0, state.cam.radius * fit / state.cam.userZoomMult));
      const lx = state.cam.targetX + state.cam.userPanX, ly = state.cam.targetY + state.cam.userPanY, lz = state.cam.targetZ;
      camera3D.position.set(lx + effRadius * Math.sin(effPhi) * Math.sin(effTheta), ly + effRadius * Math.cos(effPhi), lz + effRadius * Math.sin(effPhi) * Math.cos(effTheta));
      camera3D.lookAt(lx, ly, lz);
      if (lastSceneSet !== state.currentScene) { lastSceneSet = state.currentScene; EP.enter && EP.enter(state.currentScene); }
      EP.update(dt, now, state.currentScene);
      W.updLip && W.updLip(now, !!EP.cut && EP.cut(state.currentScene));
      updIons(dt, now); updChannels(); updTransit(dt); updPumps(dt);
      if (W.stars) W.stars.rotation.y += dt * 0.00004;
      syncTelemetryHUD(); updateSpatialLabelsProjection();
    }
    function mainLoop(now) {
      const dt = Math.min(50, now - state.lastFrameTime);
      state.lastFrameTime = now;
      if (state.isPlaying && state.hasStarted && state.currentScene < 4) {
        const scene = SCENES[state.currentScene];
        state.sceneElapsedMs += dt;
        const progress = Math.min(100, (state.sceneElapsedMs / scene.durationMs) * 100);
        dom.sceneProgressBar.style.width = `${progress}%`;
        if (state.sceneElapsedMs >= scene.durationMs) {
          goToScene(state.currentScene + 1, true);
        }
      }
      updateSimulationAnd3D(dt, now);
      if (renderer3D && scene3D && camera3D) renderer3D.render(scene3D, camera3D);
      requestAnimationFrame(mainLoop);
    }

    function apAt(u, blocked, weak) {
      const o = { vm: -70, nav: 0, inact: 0, kv: 0, naF: 0, kF: 0 };
      if (u < 0) return o;
      if (weak) { o.vm = u < .8 ? -70 + 9 * ez(u / .8) : -61 - 9 * ez((u - .8) / 1.2); return o; }
      if (u < .8) o.vm = -70 + 15 * ez(u / .8); else if (u < 1.1) o.vm = -55 + 7 * ez((u - .8) / .3);
      else if (blocked) o.vm = -48 - 22 * ez((u - 1.1) / 2);
      else if (u < 2.2) o.vm = -48 + 83 * ez((u - 1.1) / 1.1); else if (u < 2.6) o.vm = 35; else if (u < 4.2) o.vm = 35 - 117 * ez((u - 2.6) / 1.6); else o.vm = -82 + 12 * ez((u - 4.2) / 1.8);
      o.nav = u < .8 ? 0 : u < 1.1 ? ez((u - .8) / .3) : u < 4.2 ? 1 : 1 - ez((u - 4.2) / .4);
      o.inact = blocked ? 0 : u < 2.2 ? 0 : u < 2.6 ? ez((u - 2.2) / .4) : u < 4.4 ? 1 : 1 - ez((u - 4.4) / .8);
      if (blocked) o.nav = u < .8 ? 0 : u < 1.1 ? ez((u - .8) / .3) : Math.max(0, 1 - (u - 1.1) / 1.5);
      o.kv = blocked ? 0 : u < 2.0 ? 0 : u < 2.8 ? ez((u - 2.0) / .8) : u < 4.2 ? 1 : 1 - ez((u - 4.2) / 1.0);
      o.naF = blocked ? 0 : (u > 1.1 && u < 2.3 ? 16 : 0); o.kF = u > 2.4 && u < 4.4 ? 12 : 0;
      return o;
    }
