    const SCENES = [
      {
        id: 0, num: "SCENE 01", title: "흥분성 세포 — 전기를 쓰는 세포",
        badgeText: "흥분성 세포 · 신경과 근육", badgeClass: "bg-sky-500/20 border-sky-400/40 text-sky-200",
        camInfo: "3D CAM: MEMBRANE OVERVIEW · ECF / ICF",
        cameraTarget: { theta: 0.35, phi: 1.32, radius: 17, targetX: 0, targetY: 0, targetZ: 0 },
        cardTitle: "움직임은 막전위에서 시작한다", cardColor: "text-sky-300",
        cardBody: "대뇌의 명령도, 근육의 수축도 결국 세포막 안팎의 전기 차이(막전위)가 바뀌는 신호로 전달된다. 이 차이를 만드는 것이 이온 기울기다.",
        durationMs: 15000,
        subtitleHtml: "신경세포와 근육세포는 <span class='text-sky-300 font-bold'>세포막 안팎의 전기 차이</span>로 신호를 만든다. 세포 밖(위)에는 <span class='text-blue-400 font-bold'>Na⁺</span>, 세포 안(아래)에는 <span class='text-orange-400 font-bold'>K⁺</span>가 많다.",
        narrationText: "움직임은 생각보다 아주 작은 곳에서 시작됩니다. 신경세포와 근육세포는 세포막 안팎의 전기 차이, 즉 막전위를 바꾸어 신호를 만듭니다. 화면 위쪽이 세포 밖, 아래쪽이 세포 안입니다. 세포 밖에는 파란 나트륨 이온이, 세포 안에는 주황색 칼륨 이온이 많이 모여 있습니다. 이 불균형이 바로 전기 신호의 배터리입니다."
      },
      {
        id: 1, num: "SCENE 02", title: "인지질 이중층과 막단백질",
        badgeText: "절연체와 문 · 인지질 이중층 + 막단백질", badgeClass: "bg-amber-500/20 border-amber-400/45 text-amber-200",
        camInfo: "3D CAM: MACRO · LIPID BILAYER CUTAWAY",
        cameraTarget: { theta: 0.55, phi: 1.42, radius: 9.2, targetX: 0.6, targetY: 0, targetZ: 0 },
        cardTitle: "이온은 막을 그냥 통과하지 못한다", cardColor: "text-amber-300",
        cardBody: "친수성 머리가 물 쪽, 소수성 꼬리가 안쪽을 향한 이중층은 전하를 띤 이온을 막는 절연체다. 이온은 통로·운반체·펌프 같은 막단백질을 거쳐야 한다.",
        durationMs: 16000,
        subtitleHtml: "<span class='text-amber-300 font-bold'>인지질 이중층</span>은 이온을 막는 절연체이고, <span class='text-orange-400 font-bold'>통로</span>와 <span class='text-indigo-300 font-bold'>펌프</span> 같은 막단백질이 이온이 다니는 문이다.",
        narrationText: "세포막을 가까이 들여다보겠습니다. 노란 머리는 물을 좋아하는 친수성 부분이고, 막 안쪽의 가는 꼬리는 물을 싫어하는 소수성 부분입니다. 이 인지질 이중층은 전하를 띤 이온을 통과시키지 않는 절연체입니다. 그래서 이온은 반드시 막단백질을 거쳐야 합니다. 주황색 기둥은 이온이 흘러가는 통로이고, 보라색 단백질은 에이티피를 써서 이온을 퍼 올리는 펌프입니다."
      },
      {
        id: 2, num: "SCENE 03", title: "세포 안팎의 이온 분포",
        badgeText: "Na⁺ 밖 약 10배 · K⁺ 안 약 35배", badgeClass: "bg-blue-500/20 border-blue-400/45 text-blue-200",
        camInfo: "3D CAM: ION DISTRIBUTION · CONCENTRATION MAP",
        cameraTarget: { theta: -0.25, phi: 1.36, radius: 14.5, targetX: 0, targetY: 0, targetZ: 0 },
        cardTitle: "바다는 짜고, 세포 안은 칼륨 주머니", cardColor: "text-blue-300",
        cardBody: "세포 밖 Na⁺ 약 142 mM, 안 약 14 mM. K⁺는 밖 약 4 mM, 안 약 140 mM. Cl⁻는 밖에, 음전하 단백질(A⁻)은 안에 많다. Ca²⁺은 세포 안에 극히 적다.",
        durationMs: 16000,
        subtitleHtml: "세포 밖: <span class='text-blue-400 font-bold'>Na⁺</span> · <span class='text-lime-400 font-bold'>Cl⁻</span> · <span class='text-emerald-400 font-bold'>Ca²⁺</span> / 세포 안: <span class='text-orange-400 font-bold'>K⁺</span> · <span class='text-purple-400 font-bold'>음전하 단백질(A⁻)</span>",
        narrationText: "세포 안팎의 이온 분포를 정리해 보겠습니다. 나트륨 이온은 세포 밖에 약 백사십이 밀리몰, 안에 약 십사 밀리몰로 밖에 열 배쯤 많습니다. 칼륨 이온은 반대로 세포 안에 약 백사십 밀리몰, 밖에 약 사 밀리몰로 안에 서른다섯 배쯤 많습니다. 초록색 염소 이온은 밖에, 보라색 음전하 단백질은 안에 많고, 칼슘 이온은 세포 안에 거의 없습니다. 이 수치는 교재 기준 근사값입니다."
      },
      {
        id: 3, num: "SCENE 04", title: "확산과 평형전위",
        badgeText: "농도 기울기 ⇄ 전기 기울기 · 평형전위", badgeClass: "bg-orange-500/20 border-orange-400/45 text-orange-200",
        camInfo: "3D CAM: K⁺ LEAK CHANNEL · CHARGE SEPARATION",
        cameraTarget: { theta: 0.2, phi: 1.4, radius: 11.5, targetX: 1.8, targetY: 0, targetZ: 0 },
        cardTitle: "나가려는 힘 = 끌어당기는 힘", cardColor: "text-orange-300",
        cardBody: "K⁺가 농도 기울기를 따라 밖으로 새어 나가면 안쪽에 음전하가 남아 K⁺를 다시 끌어당긴다. 두 힘이 같아지는 막전위가 K⁺의 평형전위(약 −94 mV)다.",
        durationMs: 17000,
        subtitleHtml: "<span class='text-orange-400 font-bold'>K⁺</span>가 빠져나갈수록 안쪽은 <span class='text-sky-300 font-bold'>음(−)</span>, 바깥은 <span class='text-rose-300 font-bold'>양(+)</span>이 된다 → 두 힘이 같아지는 <span class='text-amber-300 font-bold'>평형전위</span>(Nernst 방정식)",
        narrationText: "이제 칼륨 누출 통로를 열어 보겠습니다. 칼륨 이온은 많은 곳에서 적은 곳으로, 즉 세포 밖으로 새어 나갑니다. 그런데 양전하가 빠져나간 만큼 세포 안쪽에는 음전하가 남고, 이 음전하가 칼륨 이온을 다시 끌어당깁니다. 나가려는 농도의 힘과 끌어당기는 전기의 힘이 같아지면 더 이상 알짜 이동이 없습니다. 이때의 막전위를 평형전위라고 하며, 칼륨 이온의 평형전위는 약 마이너스 구십사 밀리볼트입니다."
      },
      {
        id: 4, num: "SCENE 05", title: "평형전위 시뮬레이터",
        badgeText: "세포 밖 K⁺ 농도를 바꿔 보기", badgeClass: "bg-amber-500/25 border-amber-400/50 text-amber-200",
        camInfo: "3D CAM: INTERACTIVE 360° · DRAG TO ORBIT",
        cameraTarget: { theta: 0.3, phi: 1.38, radius: 14, targetX: 0.8, targetY: 0, targetZ: 0 },
        cardTitle: "직접 바꿔 보는 이온 기울기", cardColor: "text-sky-300",
        cardBody: "아래 버튼으로 세포 밖 K⁺ 농도를 바꾸고, 버튼을 누르고 있으면 Na⁺ 통로가 열린다. 막전위가 어느 평형전위를 향해 가는지 오른쪽 위 계기에서 확인하자.",
        durationMs: 999999,
        subtitleHtml: "<span class='text-amber-300 font-bold'>고칼륨혈증</span>이면 E<sub>K</sub>가 덜 음성 → 막이 탈분극된다. 버튼을 누르면 막전위가 <span class='text-blue-400 font-bold'>Na⁺ 평형전위(약 +61 mV)</span> 쪽으로 간다.",
        narrationText: "이제 직접 실험해 볼 차례입니다. 아래의 버튼으로 세포 밖 칼륨 이온 농도를 바꿔 보세요. 고칼륨혈증처럼 바깥 칼륨이 늘어나면 칼륨 평형전위가 덜 음성이 되어 막이 탈분극됩니다. 가운데 버튼을 누르고 있으면 나트륨 통로가 열려, 막전위가 나트륨 평형전위인 플러스 육십일 밀리볼트 쪽으로 이동합니다."
      }
    ];
    const EP = {
      dens: i => i === 3 ? 0.7 : 1,
      slots: [[1.6, -1.4], [3.7, 1.4], [-1.2, 1.9], [-3.4, -0.7, 1.25]],
      channels: [{ name: 'k1', type: 'kleak', pos: [1.6, -1.4] }, { name: 'k2', type: 'kleak', pos: [3.7, 1.4] }, { name: 'n1', type: 'naleak', pos: [-1.2, 1.9] }],
      pumps: [{ name: 'p1', type: 'nak', pos: [-3.4, -0.7] }],
      cut: i => i === 1,
      labels: [
        { id: 'out', scenes: [0, 2, 4], text: '세포 밖 (세포외액)', color: '#93c5fd', pos: [-5.2, 4.3, 0] },
        { id: 'in', scenes: [0, 2, 4], text: '세포 안 (세포내액)', color: '#fdba74', pos: [-5.2, -4.4, 0] },
        { id: 'head', scenes: [1], text: '친수성 머리', color: '#fcd34d', pos: [2.2, 1.6, -1.6] },
        { id: 'tail', scenes: [1], text: '소수성 꼬리 (절연)', color: '#cbd5e1', pos: [2.4, 0.3, -2.2] },
        { id: 'ch', scenes: [1, 3], text: 'K⁺ 누출 통로', color: '#fb923c', pos: [1.6, 2.1, -1.4] },
        { id: 'pump', scenes: [1], text: 'Na⁺-K⁺ 펌프 (ATP)', color: '#a5b4fc', pos: [-3.4, 2.2, -0.7] },
        { id: 'na', scenes: [2], text: 'Na⁺ 142 mM (밖)', color: '#60a5fa', pos: [2.5, 3.6, 2] },
        { id: 'k', scenes: [2], text: 'K⁺ 140 mM (안)', color: '#fb923c', pos: [2.5, -3.4, 2] },
        { id: 'cl', scenes: [2], text: 'Cl⁻ 103 mM (밖)', color: '#a3e635', pos: [-3, 3.2, 2] },
        { id: 'a', scenes: [2], text: 'A⁻ 음전하 단백질 (안)', color: '#c084fc', pos: [-3, -3.2, 2] },
        { id: 'grad', scenes: [3], text: '농도 기울기 ↑ (밖으로)', color: '#fb923c', pos: [4.4, -2.6, 0] },
        { id: 'elec', scenes: [3], text: '전기 기울기 ↓ (안으로 끌어당김)', color: '#38bdf8', pos: [4.4, 2.7, 0] }
      ],
      vm: -70, ko: 4,
      enter(i) { this.t0 = performance.now(); if (i === 3) this.vm = 0; },
      update(dt, now, i) {
        const el = (now - (this.t0 || now)) / 1000;
        const full = { Na: [22, 3], K: [2, 22], Cl: [18, 2], A: [0, 12], Ca: [6, 0] };
        let vt = -70, kRate = 0, naRate = 0;
        if (i === 0) { setPools(full); vt = -70; kRate = 1.2; }
        else if (i === 1) { setPools({ Na: [8, 1], K: [1, 8], Cl: [6, 1], A: [0, 4] }); vt = -70; kRate = 2; }
        else if (i === 2) { setPools(full); vt = -70; }
        else if (i === 3) { setPools(full); vt = -94 * (1 - Math.exp(-el / 4)); kRate = 6 * Math.max(0.15, 1 - el / 9); }
        else {
          const p = state.simPreset; this.ko = p === 'hyper' ? 8 : p === 'hypo' ? 2.5 : 4;
          const ek = 61.5 * Math.log10(this.ko / 140), ena = 61.5 * Math.log10(142 / 14);
          vt = state.isManualHolding ? ena * 0.85 : ek * 0.95; kRate = state.isManualHolding ? 1 : 3; naRate = state.isManualHolding ? 9 : 0;
          setPools({ Na: [22, 3 + (state.isManualHolding ? 3 : 0)], K: [Math.round(this.ko / 2), 22], Cl: [18, 2], A: [0, 12], Ca: [6, 0] });
          setHud({ g1: [Math.min(100, Math.abs(ek)), 'E(K⁺) ' + Math.round(ek) + ' mV'], g2: [ena, 'E(Na⁺) +' + Math.round(ena) + ' mV'] });
          W.chans.n1.open = state.isManualHolding ? 1 : 0.15;
        }
        if (i < 4) { W.chans.n1.open = 0.15; }
        this.vm += (vt - this.vm) * Math.min(1, dt * (i === 3 ? 0.01 : 0.003));
        flux('k1', 'K', 'out', kRate, dt); flux('k2', 'K', 'out', kRate * 0.8, dt); flux('n1', 'Na', 'in', naRate, dt);
        setCharge(i === 1 || i === 2 ? 0 : this.vm);
        const phase = ['RESTING', 'BILAYER', 'IONS', 'DIFFUSION', 'SIMULATOR'][i];
        if (i < 4) setHud({ g1: [i === 3 ? kRate / 6 * 100 : 30, i === 3 ? 'K⁺ 유출 ' + (kRate > 1.5 ? '많음' : '거의 멈춤') : '누출 약간'], g2: [i === 3 ? Math.abs(this.vm) : 0, i === 3 ? '분리된 전하 ' + Math.round(Math.abs(this.vm) / 94 * 100) + '%' : '—'] });
        setHud({ phase: phase, vm: this.vm });
      }
    };
