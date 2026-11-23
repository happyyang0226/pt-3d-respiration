    const SCENES = [
      {
        id: 0, num: "SCENE 01", title: "막전위를 재 보자",
        badgeText: "안정막전위 · 미세전극 측정", badgeClass: "bg-sky-500/20 border-sky-400/40 text-sky-200",
        camInfo: "3D CAM: MICROELECTRODE · RECORDING",
        cameraTarget: { theta: 0.5, phi: 1.3, radius: 14, targetX: -2.2, targetY: 0.5, targetZ: 0 },
        cardTitle: "세포 안은 밖보다 음성", cardColor: "text-sky-300",
        cardBody: "유리 미세전극을 세포 안으로 넣는 순간 전압계가 0에서 약 −70 mV로 떨어진다. 자극을 받지 않은 흥분성 세포의 이 전위가 안정막전위다.",
        durationMs: 15000,
        subtitleHtml: "전극이 막을 뚫고 들어가는 순간 <span class='text-sky-300 font-bold'>0 mV → 약 −70 mV</span>. 이것이 <span class='text-amber-300 font-bold'>안정막전위</span>다 (큰 신경섬유·골격근은 약 −90 mV).",
        narrationText: "아주 가는 유리 미세전극을 세포막에 가까이 가져갑니다. 세포 밖에 있을 때 전압계는 영 밀리볼트를 가리킵니다. 전극이 막을 뚫고 세포 안으로 들어가는 순간, 바늘은 약 마이너스 칠십 밀리볼트로 뚝 떨어집니다. 자극을 받지 않은 흥분성 세포에서 측정되는 이 전위를 안정막전위라고 합니다. 큰 신경섬유와 골격근에서는 약 마이너스 구십 밀리볼트입니다."
      },
      {
        id: 1, num: "SCENE 02", title: "K⁺ 누출 통로가 만드는 음전위",
        badgeText: "K⁺만 통과한다면 → E(K⁺) 약 −94 mV", badgeClass: "bg-orange-500/20 border-orange-400/45 text-orange-200",
        camInfo: "3D CAM: K⁺ LEAK CHANNELS",
        cameraTarget: { theta: -0.3, phi: 1.4, radius: 11.5, targetX: 1.5, targetY: 0, targetZ: 0 },
        cardTitle: "안정 시 막은 K⁺에 잘 열려 있다", cardColor: "text-orange-300",
        cardBody: "안정 상태의 막은 K⁺ 누출 통로 때문에 K⁺ 투과성이 Na⁺보다 훨씬 크다(약 50~100배). K⁺만 통과한다면 막전위는 K⁺의 평형전위인 약 −94 mV가 된다.",
        durationMs: 15000,
        subtitleHtml: "<span class='text-orange-400 font-bold'>K⁺ 누출 통로</span>로 K⁺가 빠져나가 안쪽이 음성이 된다 → K⁺만 통과한다면 <span class='text-amber-300 font-bold'>약 −94 mV</span>",
        narrationText: "안정 상태의 세포막에는 늘 조금씩 열려 있는 칼륨 누출 통로가 많습니다. 그래서 칼륨 이온에 대한 투과성이 나트륨 이온보다 오십에서 백 배나 큽니다. 만약 칼륨 이온만 막을 통과한다면 막전위는 칼륨 평형전위인 약 마이너스 구십사 밀리볼트가 될 것입니다."
      },
      {
        id: 2, num: "SCENE 03", title: "약간의 Na⁺ 누출",
        badgeText: "Na⁺ 조금 유입 → 약 −86 mV (Goldman)", badgeClass: "bg-blue-500/20 border-blue-400/45 text-blue-200",
        camInfo: "3D CAM: Na⁺ LEAK · GHK WEIGHTED AVERAGE",
        cameraTarget: { theta: 0.4, phi: 1.36, radius: 12, targetX: -0.6, targetY: 0, targetZ: 0 },
        cardTitle: "투과성으로 가중 평균한 값", cardColor: "text-blue-300",
        cardBody: "실제 막은 Na⁺도 아주 조금 통과시킨다. 막전위는 여러 이온의 평형전위를 투과성으로 가중 평균한 값(Goldman 방정식) → 큰 신경섬유에서 약 −86 mV.",
        durationMs: 15000,
        subtitleHtml: "조금 새어 들어오는 <span class='text-blue-400 font-bold'>Na⁺</span>가 막전위를 E(Na⁺) 쪽으로 살짝 끌어올린다 → <span class='text-amber-300 font-bold'>약 −86 mV</span> (Goldman 방정식)",
        narrationText: "하지만 실제 세포막은 나트륨 이온도 아주 조금 통과시킵니다. 파란 나트륨 이온이 조금씩 새어 들어오면서 막전위를 나트륨 평형전위 쪽으로 살짝 끌어올립니다. 이처럼 막전위는 여러 이온의 평형전위를 각 이온의 투과성으로 가중 평균한 값이며, 이것을 골드만 방정식으로 계산합니다. 큰 신경섬유에서는 약 마이너스 팔십육 밀리볼트가 됩니다."
      },
      {
        id: 3, num: "SCENE 04", title: "Na⁺-K⁺ 펌프의 역할",
        badgeText: "기전성 펌프 −4 mV + 기울기 유지", badgeClass: "bg-indigo-500/20 border-indigo-400/45 text-indigo-200",
        camInfo: "3D CAM: Na⁺-K⁺ PUMP · GRADIENT KEEPER",
        cameraTarget: { theta: -0.45, phi: 1.36, radius: 10.5, targetX: -3.0, targetY: 0, targetZ: 0 },
        cardTitle: "펌프의 진짜 역할은 '기울기 유지'", cardColor: "text-indigo-300",
        cardBody: "펌프는 3Na⁺를 내보내고 2K⁺를 들여 양전하 1개를 밖으로 옮기므로 몇 mV(약 −4 mV)를 직접 보탠다. 더 중요한 일은 새어 나간 이온을 되돌려 기울기 자체를 유지하는 것이다.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-indigo-300 font-bold'>Na⁺-K⁺ 펌프</span>: 직접 보태는 전위는 약 −4 mV뿐 → 진짜 역할은 새어 나간 이온을 되돌려 <span class='text-amber-300 font-bold'>기울기를 유지</span>하는 것 (합계 약 −90 mV)",
        narrationText: "마지막으로 나트륨 칼륨 펌프가 일합니다. 펌프는 에이티피 하나로 나트륨 이온 세 개를 내보내고 칼륨 이온 두 개를 들여보내므로, 양전하 하나를 밖으로 옮겨 약 마이너스 사 밀리볼트를 직접 보탭니다. 그래서 큰 신경섬유의 안정막전위는 약 마이너스 구십 밀리볼트가 됩니다. 하지만 펌프의 진짜 역할은 누출 통로로 새어 나간 이온을 되돌려 이온 기울기 자체를 유지하는 것입니다."
      },
      {
        id: 4, num: "SCENE 05", title: "안정막전위 시뮬레이터",
        badgeText: "투과성 · 펌프 · 세포 밖 K⁺ 바꾸기", badgeClass: "bg-amber-500/25 border-amber-400/50 text-amber-200",
        camInfo: "3D CAM: INTERACTIVE 360° · DRAG TO ORBIT",
        cameraTarget: { theta: 0.25, phi: 1.36, radius: 14.5, targetX: -0.5, targetY: 0, targetZ: 0 },
        cardTitle: "Goldman 방정식을 눈으로", cardColor: "text-sky-300",
        cardBody: "Na⁺ 투과성을 키우거나 펌프를 멈추면 막전위가 어떻게 변하는지, 버튼을 누르고 있으면(세포 밖 K⁺ 증가) 고칼륨혈증처럼 탈분극되는지 확인하자.",
        durationMs: 999999,
        subtitleHtml: "<span class='text-blue-400 font-bold'>Na⁺ 투과성↑</span> → 탈분극 · <span class='text-indigo-300 font-bold'>펌프 정지</span> → 기울기가 서서히 무너져 0을 향함 · <span class='text-orange-400 font-bold'>세포 밖 K⁺↑</span> → 탈분극",
        narrationText: "이제 직접 바꿔 보세요. 나트륨 투과성을 높이면 막전위가 나트륨 쪽으로 올라가 탈분극됩니다. 펌프를 멈추면 당장은 큰 변화가 없지만, 이온 기울기가 서서히 무너지면서 막전위가 영을 향해 올라갑니다. 가운데 버튼을 누르고 있으면 세포 밖 칼륨이 늘어나 고칼륨혈증처럼 막이 탈분극됩니다."
      }
    ];
    const EP = {
      dens: i => i === 0 || i === 4 ? 1 : 0.6,
      slots: [[1.6, -1.3], [3.8, 1.2], [0.4, 2.2], [-1.0, -2.0], [-3.2, 0.3, 1.25]],
      channels: [{ name: 'k1', type: 'kleak', pos: [1.6, -1.3] }, { name: 'k2', type: 'kleak', pos: [3.8, 1.2] }, { name: 'k3', type: 'kleak', pos: [0.4, 2.2] }, { name: 'n1', type: 'naleak', pos: [-1.0, -2.0] }],
      pumps: [{ name: 'p1', type: 'nak', pos: [-3.2, 0.3] }],
      electrode: true,
      labels: [
        { id: 'el', scenes: [0], text: '미세전극', color: '#7dd3fc', pos: () => V3(-4.2, (W.electrode ? W.electrode.position.y : 0) + 4.6, 1.6) },
        { id: 'k', scenes: [1, 2], text: 'K⁺ 누출 통로', color: '#fb923c', pos: [1.6, 2.2, -1.3] },
        { id: 'na', scenes: [2], text: 'Na⁺ 누출 (조금)', color: '#60a5fa', pos: [-1.0, 2.2, -2.0] },
        { id: 'pump', scenes: [3, 4], text: 'Na⁺-K⁺ 펌프', color: '#a5b4fc', pos: [-3.2, 2.3, 0.3], dyn: () => { const p = W.pumps.p1; return p.run ? 'Na⁺-K⁺ 펌프 · ' + (p.t < .45 ? '3Na⁺ 밖으로' : '2K⁺ 안으로') : 'Na⁺-K⁺ 펌프 (정지)'; } },
        { id: 'out', scenes: [0, 4], text: '세포 밖', color: '#93c5fd', pos: [4.8, 4.3, 0] },
        { id: 'in', scenes: [0, 4], text: '세포 안', color: '#fdba74', pos: [4.8, -4.4, 0] }
      ],
      vm: 0, ki: 140, nai: 14,
      enter(i) { this.t0 = performance.now(); if (i === 0) this.vm = 0; if (i === 4) { this.ki = 140; this.nai = 14; } },
      update(dt, now, i) {
        const el = (now - (this.t0 || now)) / 1000, s = dt / 1000;
        let vt, PNa = 0.01, pump = true, ko = 4;
        const E = W.electrode; let tipIn = true;
        if (i === 0) { const y = Math.max(0, 4.5 - el * 1.4); E.position.y = y; tipIn = y + E.userData.tipY < -1.4; vt = tipIn ? -70 : 0; PNa = 0.01; pump = false; }
        else { E.position.y += (0 - E.position.y) * 0.05; }
        if (i === 1) { PNa = 0; pump = false; }
        if (i === 2) { PNa = 0.01; pump = false; }
        if (i === 3) { PNa = 0.01; pump = true; }
        if (i === 4) {
          const p = state.simPreset; PNa = p === 'na' ? 0.1 : 0.01; pump = p !== 'nopump';
          if (!pump) { this.ki = Math.max(60, this.ki - 1.6 * s); this.nai = Math.min(90, this.nai + 1.4 * s); } else { this.ki += (140 - this.ki) * s * 0.3; this.nai += (14 - this.nai) * s * 0.3; }
          ko = state.isManualHolding ? 10 : 4;
        } else { this.ki = 140; this.nai = 14; }
        const ghk = 61.5 * Math.log10((ko + PNa * 142) / (this.ki + PNa * this.nai)) + (pump ? -4 : 0);
        if (i !== 0) vt = ghk;
        this.vm += (vt - this.vm) * Math.min(1, dt * (i === 0 ? 0.012 : 0.004));
        setPools({ Na: [22, Math.round(3 + (this.nai - 14) / 8)], K: [Math.round(ko / 2), Math.round(22 * this.ki / 140)], Cl: [14, 2], A: [0, 10] });
        const kr = i === 0 ? 1 : 2.5; flux('k1', 'K', 'out', kr, dt); flux('k2', 'K', 'out', kr, dt); flux('k3', 'K', 'out', kr * .8, dt);
        W.chans.n1.open = PNa > 0 ? Math.min(1, 0.3 + PNa * 7) : 0; flux('n1', 'Na', 'in', PNa > 0 ? 1.2 + PNa * 60 : 0, dt);
        W.pumps.p1.run = pump && i >= 3; W.pumps.p1.speed = 1;
        setCharge(this.vm);
        setHud({ phase: ['RECORD', 'K⁺ ONLY', '+ Na⁺ LEAK', '+ PUMP', 'SIMULATOR'][i], vm: i === 0 && !tipIn ? 0 : this.vm,
          g1: [PNa * 500 + 4, 'Na⁺/K⁺ 투과성 ' + (PNa === 0 ? '0' : PNa.toFixed(2))], g2: [this.ki / 1.4, '세포 안 K⁺ ' + Math.round(this.ki) + ' mM · 펌프 ' + (W.pumps.p1.run ? 'ON' : 'OFF')] });
      }
    };
