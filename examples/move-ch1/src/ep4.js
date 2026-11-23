    const SCENES = [
      {
        id: 0, num: "SCENE 01", title: "안정 상태의 전압개폐 통로",
        badgeText: "−70 mV · 활성화문 닫힘 · 불활성화문 열림", badgeClass: "bg-sky-500/20 border-sky-400/40 text-sky-200",
        camInfo: "3D CAM: VOLTAGE-GATED Na⁺ / K⁺ CHANNELS",
        cameraTarget: { theta: 0.35, phi: 1.36, radius: 11.5, targetX: 0.2, targetY: 0, targetZ: 0 },
        cardTitle: "준비된 두 개의 문", cardColor: "text-sky-300",
        cardBody: "전압개폐 Na⁺ 통로는 바깥쪽 활성화문(초록)과 안쪽 불활성화문(빨강)을 가진다. 안정 시에는 활성화문이 닫혀 있고 불활성화문은 열려 있어 언제든 열릴 준비가 되어 있다. 전압개폐 K⁺ 통로(노랑 문)도 닫혀 있다.",
        durationMs: 15000,
        subtitleHtml: "<span class='text-blue-400 font-bold'>전압개폐 Na⁺ 통로</span>: 활성화문(초록) 닫힘 · 불활성화문(빨강) 열림 / <span class='text-orange-400 font-bold'>전압개폐 K⁺ 통로</span>: 닫힘",
        narrationText: "이번에는 활동전위를 만드는 전압개폐 통로를 살펴봅니다. 파란 기둥은 전압개폐 나트륨 통로입니다. 바깥쪽에 초록색 활성화문, 안쪽에 빨간 불활성화문이라는 두 개의 문이 있습니다. 안정 상태에서는 활성화문이 닫혀 있고 불활성화문은 열려 있어, 언제든 열릴 준비가 되어 있습니다. 주황색 기둥은 전압개폐 칼륨 통로로, 노란 문이 닫혀 있습니다."
      },
      {
        id: 1, num: "SCENE 02", title: "역치와 탈분극",
        badgeText: "−55 mV 역치 → Na⁺ 유입 → +35 mV", badgeClass: "bg-blue-500/20 border-blue-400/45 text-blue-200",
        camInfo: "3D CAM: Na⁺ INFLUX · DEPOLARIZATION",
        cameraTarget: { theta: 0.5, phi: 1.38, radius: 8.5, targetX: -1.2, targetY: 0, targetZ: 0.2 },
        cardTitle: "양성 되먹임 — 한꺼번에 열린다", cardColor: "text-blue-300",
        cardBody: "자극으로 막전위가 역치(약 −55 mV)에 닿으면 Na⁺ 통로의 활성화문이 빠르게 열린다. Na⁺가 들어올수록 더 탈분극되고, 그럴수록 통로가 더 열린다 → 막전위가 약 +35 mV까지 치솟는다.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-rose-300 font-bold'>역치(약 −55 mV)</span> → 활성화문 열림 → <span class='text-blue-400 font-bold'>Na⁺ 유입</span> → 탈분극 → 더 많은 통로 열림 (양성 되먹임) → <span class='text-amber-300 font-bold'>약 +35 mV</span>",
        narrationText: "자극이 들어와 막전위가 역치인 약 마이너스 오십오 밀리볼트에 닿으면, 나트륨 통로의 초록색 활성화문이 빠르게 열립니다. 파란 나트륨 이온이 농도와 전기의 기울기를 따라 세포 안으로 쏟아져 들어옵니다. 나트륨이 들어올수록 막은 더 탈분극되고, 그럴수록 더 많은 통로가 열리는 양성 되먹임이 일어나 막전위는 약 플러스 삼십오 밀리볼트까지 치솟습니다."
      },
      {
        id: 2, num: "SCENE 03", title: "재분극",
        badgeText: "Na⁺ 불활성화 + K⁺ 유출 → 다시 음성으로", badgeClass: "bg-orange-500/20 border-orange-400/45 text-orange-200",
        camInfo: "3D CAM: INACTIVATION GATE · K⁺ EFFLUX",
        cameraTarget: { theta: -0.35, phi: 1.38, radius: 9, targetX: 0.4, targetY: 0, targetZ: -0.2 },
        cardTitle: "시간 차가 만드는 짧은 스파이크", cardColor: "text-orange-300",
        cardBody: "Na⁺ 통로의 불활성화문이 조금 늦게 닫혀 Na⁺ 유입이 멈춘다. 이때 느린 전압개폐 K⁺ 통로가 열려 K⁺가 빠져나가 막전위가 다시 음성으로 돌아온다.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-red-400 font-bold'>불활성화문</span>이 닫혀 Na⁺ 유입 정지 + 느린 <span class='text-orange-400 font-bold'>K⁺ 통로</span>가 열려 K⁺ 유출 → <span class='text-sky-300 font-bold'>재분극</span>",
        narrationText: "막전위가 꼭대기에 이를 무렵, 나트륨 통로 안쪽의 빨간 불활성화문이 조금 늦게 닫히며 나트륨 유입이 멈춥니다. 동시에 느리게 반응하는 칼륨 통로의 노란 문이 열려, 주황색 칼륨 이온이 세포 밖으로 빠져나갑니다. 양전하가 빠져나가면서 막전위는 다시 음성으로 돌아옵니다. 이것이 재분극입니다. 활성화문과 불활성화문의 시간 차이가 활동전위를 짧은 스파이크로 만듭니다."
      },
      {
        id: 3, num: "SCENE 04", title: "후과분극과 회복",
        badgeText: "K⁺ 통로가 천천히 닫힘 → 잠시 더 음성", badgeClass: "bg-indigo-500/20 border-indigo-400/45 text-indigo-200",
        camInfo: "3D CAM: AFTER-HYPERPOLARIZATION · RECOVERY",
        cameraTarget: { theta: 0.15, phi: 1.34, radius: 12.5, targetX: -0.6, targetY: 0, targetZ: -0.4 },
        cardTitle: "실무율과 펌프의 뒷정리", cardColor: "text-indigo-300",
        cardBody: "K⁺ 통로가 천천히 닫혀 막전위가 잠시 안정막전위보다 더 음성이 된다(후과분극). 활동전위 한 번에 움직이는 이온은 아주 적어, 기울기는 펌프가 장기적으로 유지한다. 역치를 넘으면 늘 같은 크기 — 실무율.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-orange-400 font-bold'>K⁺ 통로</span>가 천천히 닫혀 잠시 <span class='text-indigo-300 font-bold'>후과분극</span> → 불활성화문 회복 → 안정 상태 · 역치를 넘으면 늘 같은 크기 (<span class='text-amber-300 font-bold'>실무율</span>)",
        narrationText: "칼륨 통로는 천천히 닫히기 때문에, 막전위는 잠시 안정막전위보다 더 음성이 됩니다. 이것을 후과분극이라고 합니다. 그 사이 나트륨 통로의 불활성화문이 다시 열리며 회복되고, 막은 안정 상태로 돌아옵니다. 활동전위 한 번에 실제로 움직이는 이온은 아주 적어서, 이온 기울기는 나트륨 칼륨 펌프가 장기적으로 유지합니다. 역치를 넘으면 활동전위는 언제나 같은 크기로 일어나며, 이를 실무율이라고 합니다."
      },
      {
        id: 4, num: "SCENE 05", title: "활동전위 시뮬레이터",
        badgeText: "역치 미만 · 역치 이상 · 국소마취제", badgeClass: "bg-amber-500/25 border-amber-400/50 text-amber-200",
        camInfo: "3D CAM: INTERACTIVE 360° · DRAG TO ORBIT",
        cameraTarget: { theta: 0.3, phi: 1.36, radius: 12, targetX: 0.2, targetY: 0, targetZ: 0 },
        cardTitle: "직접 자극해 보기", cardColor: "text-sky-300",
        cardBody: "자극 종류를 고르면 몇 초마다 자극이 들어간다. 오른쪽 위의 막전위 그래프에서 역치를 넘는지 확인하자. 버튼을 누르고 있으면 계속 자극 → 불응기 때문에 일정 간격으로만 발화한다.",
        durationMs: 999999,
        subtitleHtml: "<span class='text-slate-300 font-bold'>역치 미만</span> → 활동전위 없음 · <span class='text-amber-300 font-bold'>역치 이상</span> → 늘 같은 크기 · <span class='text-purple-300 font-bold'>국소마취제</span> → Na⁺ 통로 차단 → 활동전위 없음",
        narrationText: "이제 직접 자극해 보세요. 역치 미만 자극에서는 막전위가 조금 올라갔다가 그냥 돌아옵니다. 역치 이상 자극에서는 언제나 같은 크기의 활동전위가 일어납니다. 국소마취제는 나트륨 통로를 막아 활동전위가 생기지 못하게 하므로 통증 신호가 전달되지 않습니다. 가운데 버튼을 누르고 있으면 계속 자극하지만, 불응기 때문에 일정 간격으로만 발화합니다."
      }
    ];
    const EP = {
      dens: i => i === 1 || i === 2 ? 0.45 : 0.7,
      slots: [[-1.2, 0.2, 1.1], [1.6, -0.4, 1.1], [4.2, 1.8], [-4.2, -1.6, 1.25]],
      channels: [{ name: 'nav', type: 'nav', pos: [-1.2, 0.2] }, { name: 'kv', type: 'kv', pos: [1.6, -0.4] }, { name: 'k1', type: 'kleak', pos: [4.2, 1.8] }],
      pumps: [{ name: 'p1', type: 'nak', pos: [-4.2, -1.6] }],
      cut: i => i === 1 || i === 2,
      build() { this.drug = new THREE.Group(); [[0, 0, 0], [.15, .1, .05], [-.12, .08, -.06], [.03, -.14, .1]].forEach(q => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), glowMat(0x334155, 0.2)); m.position.set(q[0], q[1], q[2]); this.drug.add(m); }); this.drug.position.set(-1.2, -0.6, 0.2); W.mem.add(this.drug); this.drug.visible = false; },
      labels: [
        { id: 'nav', scenes: [0, 1, 2, 3, 4], text: '전압개폐 Na⁺ 통로', color: '#60a5fa', pos: [-1.2, 2.5, 0.2] },
        { id: 'kv', scenes: [0, 2, 3, 4], text: '전압개폐 K⁺ 통로', color: '#fb923c', pos: [1.6, 2.5, -0.4] },
        { id: 'act', scenes: [0, 1], text: '활성화문', color: '#22c55e', pos: [-1.9, 1.9, 0.9] },
        { id: 'inact', scenes: [0, 2, 3], text: '불활성화문', color: '#ef4444', pos: [-0.3, -2.4, 1.0] },
        { id: 'pump', scenes: [3], text: 'Na⁺-K⁺ 펌프 (뒷정리)', color: '#a5b4fc', pos: [-4.2, 2.3, -1.6] },
        { id: 'drug', scenes: [4], text: '국소마취제', color: '#cbd5e1', pos: () => V3(-0.2, -0.7, 1.2), dyn: () => state.simPreset === 'block' ? '국소마취제 (통로 차단)' : ' ' }
      ],
      u: -1, kind: 'supra', last: 0,
      enter(i) { this.t0 = performance.now(); this.u = -1; this.last = 0; },
      update(dt, now, i) {
        const el = (now - (this.t0 || now)) / 1000, s = dt / 1000;
        let blocked = false, weak = false;
        if (i === 0) this.u = -1;
        else if (i === 1) this.u = (el % 5.5) * 0.5;
        else if (i === 2) this.u = 2.0 + (el % 6.0) * 0.42;
        else if (i === 3) this.u = 3.8 + (el % 7.0) * 0.42;
        else {
          const p = state.simPreset; blocked = p === 'block'; weak = p === 'sub';
          if (this.u >= 0) this.u += s * 0.75;
          const canFire = this.u < 0 || this.u > 6.2 || (state.isManualHolding && this.u > 4.6);
          if (canFire && (state.isManualHolding || el - this.last > 5)) { this.u = 0; this.last = el; }
        }
        const a = apAt(this.u, blocked, weak);
        W.chans.nav.open = a.nav; W.chans.nav.inact = a.inact; W.chans.kv.open = a.kv;
        flux('nav', 'Na', 'in', a.naF, dt); flux('kv', 'K', 'out', a.kF, dt); flux('k1', 'K', 'out', 1, dt);
        this.drug.visible = i === 4 && blocked;
        W.pumps.p1.run = i === 3 || i === 4;
        setPools({ Na: [22, 3], K: [2, 22], Cl: [12, 2], A: [0, 8] });
        setCharge(a.vm);
        const ph = a.vm > -50 && a.nav > 0.5 && a.inact < 0.5 ? 'DEPOLARIZE' : a.kv > 0.4 && a.vm > -75 ? 'REPOLARIZE' : a.vm < -74 ? 'AHP' : 'RESTING';
        setHud({ phase: ph, vm: a.vm, g1: [a.nav * (1 - a.inact) * 100, 'Na⁺ 통로 ' + (a.inact > 0.5 ? '불활성' : a.nav > 0.5 ? '열림' : '닫힘')], g2: [a.kv * 100, 'K⁺ 통로 ' + (a.kv > 0.5 ? '열림' : '닫힘')] });
      }
    };
