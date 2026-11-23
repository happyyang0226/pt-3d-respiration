    const SCENES = [
      {
        id: 0, num: "SCENE 01", title: "펌프가 없다면?",
        badgeText: "누출만 계속되면 기울기가 무너진다", badgeClass: "bg-rose-500/20 border-rose-400/40 text-rose-200",
        camInfo: "3D CAM: LEAK ONLY · GRADIENT RUN-DOWN",
        cameraTarget: { theta: 0.3, phi: 1.34, radius: 16, targetX: 0, targetY: 0, targetZ: 0 },
        cardTitle: "새는 배터리", cardColor: "text-rose-300",
        cardBody: "통로로 Na⁺는 들어오고 K⁺는 나간다. 되돌리는 장치가 없으면 이온 기울기가 서서히 줄어 막전위도 0을 향해 무너진다.",
        durationMs: 14000,
        subtitleHtml: "누출 통로로 <span class='text-blue-400 font-bold'>Na⁺는 들어오고</span> <span class='text-orange-400 font-bold'>K⁺는 나간다</span> → 펌프가 멈추면 <span class='text-rose-300 font-bold'>이온 기울기가 무너진다</span>",
        narrationText: "세포막의 통로로는 나트륨 이온이 조금씩 들어오고 칼륨 이온이 조금씩 빠져나갑니다. 만약 이것을 되돌리는 장치가 없다면 어떻게 될까요? 이온 기울기는 서서히 줄어들고, 막전위도 영을 향해 무너집니다. 배터리가 새는 것과 같습니다. 그래서 세포는 에이티피를 써서 이온을 거꾸로 퍼 올리는 펌프를 끊임없이 돌립니다."
      },
      {
        id: 1, num: "SCENE 02", title: "Na⁺-K⁺ 펌프의 한 바퀴",
        badgeText: "ATP 1개 → 3Na⁺ 밖으로 · 2K⁺ 안으로", badgeClass: "bg-indigo-500/20 border-indigo-400/45 text-indigo-200",
        camInfo: "3D CAM: MACRO · Na⁺/K⁺-ATPase CYCLE",
        cameraTarget: { theta: 0.55, phi: 1.4, radius: 8.2, targetX: -2.8, targetY: 0, targetZ: 0 },
        cardTitle: "일차 능동 수송 · 기전성 펌프", cardColor: "text-indigo-300",
        cardBody: "안쪽으로 열린 펌프에 Na⁺ 3개가 붙고, ATP의 인산이 붙으면(인산화) 모양이 바뀌어 바깥쪽으로 열린다. Na⁺를 내보내고 K⁺ 2개를 받아 인산이 떨어지면 다시 안쪽으로 열린다.",
        durationMs: 18000,
        subtitleHtml: "<span class='text-blue-400 font-bold'>Na⁺ 3개 결합</span> → <span class='text-yellow-300 font-bold'>ATP 인산화</span> → 바깥쪽으로 열림 → <span class='text-orange-400 font-bold'>K⁺ 2개 결합</span> → 탈인산화 → 안쪽으로 열림",
        narrationText: "나트륨 칼륨 펌프의 한 바퀴를 따라가 보겠습니다. 먼저 세포 안쪽으로 열린 펌프에 나트륨 이온 세 개가 붙습니다. 노란 에이티피가 다가와 인산을 넘겨주면 펌프의 모양이 바뀌어 바깥쪽으로 열리고, 나트륨 이온 세 개를 세포 밖으로 내보냅니다. 이어서 바깥의 칼륨 이온 두 개가 붙고, 인산이 떨어지면 다시 안쪽으로 열리며 칼륨 이온을 세포 안으로 들여보냅니다. 한 바퀴마다 양전하 하나가 밖으로 나가므로 기전성 펌프라고 부릅니다."
      },
      {
        id: 2, num: "SCENE 03", title: "Ca²⁺ 펌프 — PMCA와 SERCA",
        badgeText: "세포질 Ca²⁺ ≈ 0.0001 mM 유지", badgeClass: "bg-emerald-500/20 border-emerald-400/45 text-emerald-200",
        camInfo: "3D CAM: Ca²⁺-ATPase · SERCA / PMCA",
        cameraTarget: { theta: -0.4, phi: 1.4, radius: 8.6, targetX: 2.8, targetY: 0, targetZ: -0.4 },
        cardTitle: "Ca²⁺은 강력한 세포 안 신호", cardColor: "text-emerald-300",
        cardBody: "Ca²⁺ 펌프는 ATP를 써서 세포질의 Ca²⁺을 세포 밖(PMCA) 또는 근형질세망 안(SERCA, ATP 1개당 Ca²⁺ 2개)으로 내보낸다. SERCA가 Ca²⁺을 거둬들여야 근육이 이완된다.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-emerald-400 font-bold'>Ca²⁺ 펌프</span>가 세포질 Ca²⁺을 아주 낮게 지킨다 → SERCA가 Ca²⁺을 거둬들여야 <span class='text-amber-300 font-bold'>근육이 이완</span>된다 (2편)",
        narrationText: "칼슘 이온은 세포 안 농도가 약 영 점 영영영일 밀리몰로 아주 낮게 유지됩니다. 그래서 조금만 들어와도 근수축이나 신경전달물질 분비를 일으키는 강력한 신호가 됩니다. 초록색 칼슘 펌프는 에이티피를 써서 칼슘 이온을 세포 밖이나 근형질세망 안으로 퍼 올립니다. 근형질세망의 칼슘 펌프인 서카는 에이티피 하나로 칼슘 이온 두 개를 옮기며, 이 펌프가 칼슘을 거둬들여야 근육이 이완됩니다."
      },
      {
        id: 3, num: "SCENE 04", title: "NCX — 기울기를 빌려 쓰는 교환체",
        badgeText: "Na⁺ 3개 유입 ↔ Ca²⁺ 1개 유출 (이차 능동 수송)", badgeClass: "bg-teal-500/20 border-teal-400/45 text-teal-200",
        camInfo: "3D CAM: Na⁺-Ca²⁺ EXCHANGER",
        cameraTarget: { theta: 0.2, phi: 1.32, radius: 9.5, targetX: 0.2, targetY: 0, targetZ: 1.8 },
        cardTitle: "펌프가 만든 기울기를 쓰는 수송", cardColor: "text-teal-300",
        cardBody: "NCX는 ATP를 직접 쓰지 않는다. Na⁺-K⁺ 펌프가 만든 Na⁺ 기울기를 따라 Na⁺ 3개가 들어오는 힘으로 Ca²⁺ 1개를 내보낸다. Na⁺-K⁺ 펌프가 약해지면 NCX도 약해진다.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-teal-300 font-bold'>NCX</span>: <span class='text-blue-400 font-bold'>Na⁺ 3개</span>가 기울기를 따라 들어오는 힘으로 <span class='text-emerald-400 font-bold'>Ca²⁺ 1개</span>를 내보낸다 → 이차 능동 수송",
        narrationText: "청록색 단백질은 나트륨 칼슘 교환체, 엔씨엑스입니다. 이 교환체는 에이티피를 직접 쓰지 않습니다. 나트륨 칼륨 펌프가 만들어 둔 나트륨 기울기를 따라 나트륨 이온 세 개가 들어오는 힘을 빌려, 칼슘 이온 하나를 세포 밖으로 내보냅니다. 이렇게 다른 펌프가 만든 기울기를 쓰는 수송을 이차 능동 수송이라고 합니다. 그래서 나트륨 칼륨 펌프가 약해지면 엔씨엑스도 함께 약해집니다."
      },
      {
        id: 4, num: "SCENE 05", title: "펌프 시뮬레이터",
        badgeText: "ATP 고갈 · 디곡신 · 펌프 속도", badgeClass: "bg-amber-500/25 border-amber-400/50 text-amber-200",
        camInfo: "3D CAM: INTERACTIVE 360° · DRAG TO ORBIT",
        cameraTarget: { theta: 0.3, phi: 1.34, radius: 15, targetX: 0, targetY: 0, targetZ: 0 },
        cardTitle: "펌프를 멈추면 무슨 일이?", cardColor: "text-sky-300",
        cardBody: "ATP가 고갈되면 모든 펌프가 멈춰 기울기가 무너지고 세포 안 Ca²⁺이 쌓인다. 디곡신은 Na⁺-K⁺ 펌프만 억제해 세포 안 Na⁺↑ → NCX 약화 → 세포 안 Ca²⁺↑(심근 수축력↑).",
        durationMs: 999999,
        subtitleHtml: "<span class='text-rose-300 font-bold'>ATP 고갈</span> → 모든 펌프 정지 · <span class='text-purple-300 font-bold'>디곡신</span> → Na⁺-K⁺ 펌프만 억제 → NCX 약화 → <span class='text-emerald-400 font-bold'>세포 안 Ca²⁺↑</span>",
        narrationText: "이제 펌프를 직접 조작해 보세요. 에이티피가 고갈되면 모든 펌프가 멈추고, 이온 기울기가 무너지면서 세포 안에 칼슘 이온이 쌓입니다. 심장약인 디곡신은 나트륨 칼륨 펌프만 억제합니다. 그러면 세포 안 나트륨이 늘어 엔씨엑스가 약해지고, 세포 안 칼슘이 늘어 심근의 수축력이 커집니다. 가운데 버튼을 누르고 있으면 펌프가 두 배로 빨리 돕니다."
      }
    ];
    const EP = {
      dens: i => i >= 1 && i <= 3 ? 0.45 : 0.8,
      slots: [[-2.8, 0, 1.25], [2.8, -0.4, 1.25], [0.2, 1.8, 1.0], [3.9, 2.4], [-4.6, 2.2]],
      channels: [{ name: 'k1', type: 'kleak', pos: [3.9, 2.4] }, { name: 'n1', type: 'naleak', pos: [-4.6, 2.2] }],
      pumps: [{ name: 'nak', type: 'nak', pos: [-2.8, 0] }, { name: 'ca', type: 'ca', pos: [2.8, -0.4] }, { name: 'ncx', type: 'ncx', pos: [0.2, 1.8] }],
      cut: i => i === 1 || i === 2 || i === 3,
      labels: [
        { id: 'nak', scenes: [1, 4], text: 'Na⁺-K⁺ 펌프', color: '#a5b4fc', pos: [-2.8, 2.3, 0], dyn: () => { const t = W.pumps.nak.t; return !W.pumps.nak.run ? 'Na⁺-K⁺ 펌프 (정지)' : t < .2 ? '① Na⁺ 3개 결합' : t < .3 ? '② ATP → 인산화' : t < .45 ? '③ 바깥쪽으로 열림 · Na⁺ 방출' : t < .7 ? '④ K⁺ 2개 결합' : t < .82 ? '⑤ 탈인산화 · 안쪽으로' : '⑥ K⁺ 2개 안으로'; } },
        { id: 'ca', scenes: [2, 4], text: 'Ca²⁺ 펌프', color: '#6ee7b7', pos: [2.8, 2.3, -0.4], dyn: () => W.pumps.ca.run ? 'Ca²⁺ 펌프 · ATP 1개당 Ca²⁺ 2개' : 'Ca²⁺ 펌프 (정지)' },
        { id: 'ncx', scenes: [3, 4], text: 'NCX 교환체', color: '#5eead4', pos: [0.2, 2.3, 1.8], dyn: () => W.pumps.ncx.run ? 'NCX · 3Na⁺ 안 ↔ 1Ca²⁺ 밖' : 'NCX (약해짐)' },
        { id: 'leakK', scenes: [0], text: 'K⁺ 유출', color: '#fb923c', pos: [3.9, 2.2, 2.4] },
        { id: 'leakNa', scenes: [0], text: 'Na⁺ 유입', color: '#60a5fa', pos: [-4.6, 2.2, 2.2] }
      ],
      grad: 100, cai: 1, vm: -90,
      enter(i) { this.t0 = performance.now(); if (i === 0 || i === 4) { this.grad = 100; this.cai = 1; } },
      update(dt, now, i) {
        const s = dt / 1000, P = W.pumps;
        let nak = true, ca = true, ncx = true, spd = 1, leak = 2;
        if (i === 0) { nak = ca = ncx = false; leak = 4; }
        if (i === 1) { ca = false; ncx = false; }
        if (i === 2) { nak = false; ncx = false; }
        if (i === 3) { ca = false; }
        if (i === 4) { const p = state.simPreset; if (p === 'atp') { nak = ca = false; ncx = this.grad > 40; } if (p === 'dig') { nak = false; } spd = state.isManualHolding ? 2 : 1; }
        const gradTarget = (nak ? 100 : 0); this.grad += (gradTarget - this.grad) * s * (nak ? 0.25 : 0.06);
        if (i === 1 || i === 2 || i === 3) this.grad = 100;
        const caOut = (ca ? 1.2 : 0) + (ncx ? 0.6 * this.grad / 100 : 0);
        this.cai += ((caOut > 1.4 ? 1 : caOut > 0.4 ? 6 : 14) - this.cai) * s * 0.35;
        if (i >= 1 && i <= 3) this.cai = 1;
        P.nak.run = nak; P.ca.run = ca; P.ncx.run = ncx && i !== 1; P.nak.speed = P.ca.speed = P.ncx.speed = spd;
        const g = this.grad / 100;
        setPools({ Na: [Math.round(8 + 14 * g), Math.round(3 + 10 * (1 - g))], K: [Math.round(2 + 8 * (1 - g)), Math.round(10 + 12 * g)], Ca: [12, Math.round(this.cai)], A: [0, 6] });
        flux('k1', 'K', 'out', leak, dt); flux('n1', 'Na', 'in', leak, dt);
        this.vm += ((-90 * g + -10 * (1 - g)) - this.vm) * s * 0.8; setCharge(this.vm);
        setHud({ phase: ['LEAK ONLY', 'Na⁺/K⁺-ATPase', 'Ca²⁺-ATPase', 'NCX', 'SIMULATOR'][i], vm: this.vm,
          g1: [this.grad, '이온 기울기 ' + Math.round(this.grad) + '%'], g2: [Math.min(100, this.cai * 7), '세포 안 Ca²⁺ ' + (this.cai < 2 ? '아주 낮음' : this.cai < 8 ? '증가' : '크게 증가')] });
      }
    };
