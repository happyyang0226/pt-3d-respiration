    const SCENES = [
      {
        id: 0, num: "SCENE 01", title: "절대불응기",
        badgeText: "Na⁺ 통로 불활성 → 어떤 자극에도 반응 없음", badgeClass: "bg-rose-500/20 border-rose-400/40 text-rose-200",
        camInfo: "3D CAM: INACTIVATED Na⁺ CHANNEL",
        cameraTarget: { theta: 0.4, phi: 1.38, radius: 9.5, targetX: -1.2, targetY: 0, targetZ: 0.2 },
        cardTitle: "닫힌 불활성화문은 다시 열리지 않는다", cardColor: "text-rose-300",
        cardBody: "활동전위 동안 Na⁺ 통로가 열려 있거나 불활성화문이 닫혀 있는 시기에는 아무리 강한 자극을 주어도 새 활동전위가 생기지 않는다. 이 덕분에 신호가 한 방향으로만 진행한다.",
        durationMs: 15000,
        subtitleHtml: "활동전위 도중 두 번째 자극 → <span class='text-red-400 font-bold'>불활성화문이 닫혀 있어</span> 반응 없음 = <span class='text-rose-300 font-bold'>절대불응기</span>",
        narrationText: "활동전위가 한창 진행 중일 때 두 번째 자극을 주면 어떻게 될까요? 나트륨 통로가 이미 열려 있거나 빨간 불활성화문이 닫혀 있기 때문에, 아무리 강한 자극을 주어도 새로운 활동전위가 생기지 않습니다. 이 시기를 절대불응기라고 합니다. 절대불응기 덕분에 신호는 되돌아가지 않고 한 방향으로만 진행하며, 신경이 발화할 수 있는 최대 빈도도 정해집니다."
      },
      {
        id: 1, num: "SCENE 02", title: "상대불응기",
        badgeText: "일부만 회복 → 평소보다 강한 자극이 필요", badgeClass: "bg-amber-500/20 border-amber-400/45 text-amber-200",
        camInfo: "3D CAM: RECOVERY · STRONGER STIMULUS",
        cameraTarget: { theta: -0.3, phi: 1.38, radius: 10, targetX: -0.6, targetY: 0, targetZ: 0 },
        cardTitle: "약하면 실패, 강하면 성공", cardColor: "text-amber-300",
        cardBody: "후과분극 시기에는 Na⁺ 통로 일부가 회복되었지만 K⁺ 통로가 아직 열려 있다. 평소 크기의 자극으로는 역치에 못 미치고, 더 강한 자극이어야 (조금 작은) 활동전위가 생긴다.",
        durationMs: 16000,
        subtitleHtml: "후과분극 중 <span class='text-slate-300 font-bold'>약한 자극 → 실패</span> · <span class='text-amber-300 font-bold'>강한 자극 → 성공</span> = <span class='text-amber-300 font-bold'>상대불응기</span>",
        narrationText: "막이 후과분극 상태로 회복되는 동안에는 나트륨 통로 일부가 다시 쓸 수 있게 되었지만, 칼륨 통로가 아직 열려 있습니다. 이때 평소 크기의 약한 자극을 주면 역치에 미치지 못해 실패합니다. 하지만 평소보다 강한 자극을 주면 조금 작은 활동전위가 생깁니다. 이 시기를 상대불응기라고 합니다."
      },
      {
        id: 2, num: "SCENE 03", title: "무말이집 섬유의 연속 전도",
        badgeText: "막을 따라 차례로 탈분극 → 느리다", badgeClass: "bg-sky-500/20 border-sky-400/45 text-sky-200",
        camInfo: "3D CAM: UNMYELINATED AXON · CONTINUOUS",
        cameraTarget: { theta: 0.35, phi: 1.25, radius: 15, targetX: 0, targetY: 0, targetZ: 0 },
        cardTitle: "이웃을 차례로 깨우는 전도", cardColor: "text-sky-300",
        cardBody: "활동전위가 생긴 곳의 양전하가 바로 옆 막을 역치까지 탈분극시키고, 그곳이 다시 활동전위를 만든다. 지나간 자리는 불응기라 되돌아가지 못한다. 가는 무말이집 섬유는 약 0.25~2 m/s로 느리다.",
        durationMs: 15000,
        subtitleHtml: "활동전위가 <span class='text-yellow-300 font-bold'>바로 옆 막을 차례로</span> 깨우며 진행 · 지나간 자리(<span class='text-blue-300 font-bold'>파란 고리</span>)는 불응기 → <span class='text-sky-300 font-bold'>한 방향 · 느린 전도</span>",
        narrationText: "이제 축삭 전체를 보겠습니다. 활동전위가 생긴 곳으로 들어온 양전하는 바로 옆의 막을 역치까지 탈분극시키고, 그곳에서 다시 활동전위가 만들어집니다. 이렇게 이웃을 차례로 깨우며 신호가 나아갑니다. 지나간 자리는 파란 고리처럼 불응기에 있어 신호가 되돌아가지 못합니다. 말이집이 없는 가는 섬유에서는 이 전도가 초속 영 점 이오에서 이 미터 정도로 느립니다."
      },
      {
        id: 3, num: "SCENE 04", title: "말이집과 도약전도",
        badgeText: "랑비에결절에서만 활동전위 → 빠르다", badgeClass: "bg-emerald-500/20 border-emerald-400/45 text-emerald-200",
        camInfo: "3D CAM: MYELINATED AXON · SALTATORY",
        cameraTarget: { theta: -0.3, phi: 1.25, radius: 15, targetX: 0, targetY: 0, targetZ: 0 },
        cardTitle: "결절에서 결절로 건너뛰기", cardColor: "text-emerald-300",
        cardBody: "말이집은 절연체라 전류가 새지 않고 멀리 퍼진다. Na⁺ 통로가 몰린 랑비에결절에서만 활동전위가 생겨 신호가 결절에서 결절로 건너뛴다 → 빠르고(최대 약 100 m/s) 에너지도 적게 든다.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-slate-200 font-bold'>말이집</span>(절연) 사이의 <span class='text-yellow-300 font-bold'>랑비에결절</span>에서만 활동전위 → <span class='text-emerald-400 font-bold'>도약전도</span> · 최대 약 100 m/s",
        narrationText: "말이집이 감싼 축삭을 보겠습니다. 흰 말이집은 전기가 새지 않게 하는 절연체입니다. 그래서 전류가 멀리까지 퍼지고, 나트륨 통로가 몰려 있는 랑비에결절에서만 활동전위가 만들어집니다. 신호는 결절에서 결절로 건너뛰듯 나아가는데, 이것을 도약전도라고 합니다. 굵은 말이집 섬유에서는 초속 최대 약 백 미터에 이르고 에너지도 적게 듭니다."
      },
      {
        id: 4, num: "SCENE 05", title: "전도 시뮬레이터",
        badgeText: "무말이집 · 말이집 · 탈말이집(다발경화증)", badgeClass: "bg-amber-500/25 border-amber-400/50 text-amber-200",
        camInfo: "3D CAM: INTERACTIVE 360° · DRAG TO ORBIT",
        cameraTarget: { theta: 0.2, phi: 1.25, radius: 15, targetX: 0, targetY: 0, targetZ: 0 },
        cardTitle: "말이집이 손상되면?", cardColor: "text-sky-300",
        cardBody: "섬유 종류를 고르면 활동전위가 출발한다. 탈말이집(다발경화증·길랭-바레 증후군)에서는 손상 부위에서 전도가 느려지다 막힐 수 있다. 버튼을 누르고 있으면 연속 자극 → 불응기 때문에 간격이 생긴다.",
        durationMs: 999999,
        subtitleHtml: "<span class='text-sky-300 font-bold'>무말이집</span> 느림 · <span class='text-emerald-400 font-bold'>말이집</span> 빠름 · <span class='text-rose-300 font-bold'>탈말이집</span> → 느려지거나 전도 차단 (근력 저하 · 감각 이상)",
        narrationText: "이제 섬유 종류를 골라 직접 전도를 비교해 보세요. 말이집 섬유는 결절을 건너뛰며 빠르게, 무말이집 섬유는 차례로 느리게 전도합니다. 다발경화증이나 길랭 바레 증후군처럼 말이집이 손상되면, 손상 부위에서 전도가 느려지다가 막힐 수 있어 근력 저하와 감각 이상이 생깁니다. 가운데 버튼을 누르고 있으면 연속으로 자극하지만, 불응기 때문에 일정한 간격으로만 신호가 출발합니다."
      }
    ];
    const EP = {
      dens: i => 0.6,
      slots: [[-1.2, 0.2, 1.1], [1.6, -0.4, 1.1]],
      channels: [{ name: 'nav', type: 'nav', pos: [-1.2, 0.2] }, { name: 'kv', type: 'kv', pos: [1.6, -0.4] }],
      axon: true,
      labels: [
        { id: 'nav', scenes: [0, 1], text: '전압개폐 Na⁺ 통로', color: '#60a5fa', pos: [-1.2, 2.5, 0.2], dyn: () => EP.msg || '전압개폐 Na⁺ 통로' },
        { id: 'inact', scenes: [0], text: '불활성화문', color: '#ef4444', pos: [-0.3, -2.4, 1.0] },
        { id: 'myel', scenes: [3, 4], text: '말이집 (절연)', color: '#e2e8f0', pos: [-3.8, 1.6, 0] },
        { id: 'node', scenes: [3], text: '랑비에결절', color: '#fde047', pos: [-0.05, -1.4, 0] },
        { id: 'refr', scenes: [2, 3], text: '지나간 자리 = 불응기', color: '#93c5fd', pos: () => V3((W.ap ? W.ap.x : 0) - 2.2, -1.3, 0) },
        { id: 'rec', scenes: [2, 3, 4], text: '기록 전극', color: '#38bdf8', pos: [2.0, 2.6, 0] },
        { id: 'dem', scenes: [4], text: '탈말이집 부위', color: '#fda4af', pos: [0.45, 1.4, 0], dyn: () => state.simPreset === 'demyel' ? '탈말이집 부위' : ' ' }
      ],
      vm: -70, msg: '',
      enter(i) { this.t0 = performance.now(); this.lastFire = -9; const ax = i >= 2; W.mem.visible = !ax; W.axonG.visible = ax; if (ax) axonSetup(i === 2 ? 'unmyel' : i === 3 ? 'myel' : state.simPreset); this.preset = null; },
      update(dt, now, i) {
        const el = (now - (this.t0 || now)) / 1000, nowS = now / 1000; let vm = -70, refrTxt = '—';
        if (i <= 1) {
          let u = el % 9, a, extra = '';
          if (i === 0) { a = apAt(u, false, false); if (u > 2.6 && u < 3.4) { extra = '✖ 2번째 자극: 반응 없음 (절대불응기)'; } }
          else {
            if (u < 4.6) a = apAt(u, false, false);
            else if (u < 5.6) { a = apAt(4.6, false, false); a.vm = -79 + 6 * Math.sin((u - 4.6) / 1 * Math.PI); extra = '약한 자극: 역치 미달 → 실패'; }
            else { const w = u - 5.6; a = apAt(w, false, false); a.vm = -80 + (a.vm + 70) * 0.8; a.inact = Math.max(a.inact, 0); extra = w < 3 ? '강한 자극: 성공 (조금 작은 활동전위)' : ''; }
          }
          this.msg = extra || '전압개폐 Na⁺ 통로';
          W.chans.nav.open = a.nav; W.chans.nav.inact = a.inact; W.chans.kv.open = a.kv;
          flux('nav', 'Na', 'in', a.naF, dt); flux('kv', 'K', 'out', a.kF, dt); setPools({ Na: [20, 3], K: [2, 20], A: [0, 6] }); setCharge(a.vm); vm = a.vm;
          refrTxt = a.inact > 0.5 ? '절대불응기' : a.vm < -73 ? '상대불응기' : '준비됨';
        } else {
          if (i === 4) { if (this.preset !== state.simPreset) { this.preset = state.simPreset; axonSetup(this.preset); W.ap.on = false; W.ap.last = -9; fireAP(nowS); } }
          if (i === 4 && state.isManualHolding) { if (nowS - this.lastFire > 0.12) { this.lastFire = nowS; fireAP(nowS); } }
          else if (!W.ap.on && nowS - W.ap.last > (i === 4 ? 4.5 : 5)) fireAP(nowS);
          vm = updAxon(dt, nowS);
          refrTxt = nowS - W.ap.last < 0.45 ? '절대불응기' : nowS - W.ap.last < 1.0 ? '상대불응기' : '준비됨';
        }
        this.vm = vm;
        const mode = i <= 1 ? '' : (W.ap ? W.ap.mode : '');
        const spd = mode === 'unmyel' ? [25, '느림 (연속 전도)'] : mode === 'myel' ? [95, '빠름 (도약전도)'] : mode === 'demyel' ? [W.ap.fails ? 5 : 35, W.ap.fails ? '전도 차단!' : '느려짐 (탈말이집)'] : [0, '—'];
        setHud({ phase: ['ABSOLUTE', 'RELATIVE', 'CONTINUOUS', 'SALTATORY', 'SIMULATOR'][i], vm: vm, g1: spd, g2: [refrTxt === '준비됨' ? 100 : refrTxt === '상대불응기' ? 50 : 10, refrTxt] });
      }
    };
