"""ep1.html(호흡 시리즈) 틀 + 공용 3D 엔진(src/lib.js) + 편 설정(src/epN.js) → episodes/epN.html
사용: python examples/move-ch1/gen_episodes.py"""
import pathlib, re
HERE = pathlib.Path(__file__).resolve().parent
TPL = (HERE.parent / "breath-series" / "episodes" / "ep1.html").read_text(encoding="utf-8")
LIB = (HERE / "src" / "lib.js").read_text(encoding="utf-8")

EPS = [
 dict(n=1, title="세포막과 이온 기울기", sub="전기 신호의 배터리", h1='세포막과 <span class="text-blue-400">이온</span> <span class="text-orange-400">기울기</span>',
  tabs=["01. 흥분성 세포", "02. 인지질 이중층", "03. 이온 분포", "04. 평형전위", "05. 평형전위 실험"],
  over="세포막 안팎의 이온 불균형이 어떻게 전기 신호의 '배터리'가 되는지, 인지질 이중층과 이온 분포, 평형전위를 3D로 탐험하세요.",
  g1="평형전위 / 유출", g2="E(Na⁺) / 전하",
  legend=("Na⁺ · K⁺ 평형전위 (37 ℃)", [("text-orange-300","● E(K⁺)","약 −94 mV"),("text-blue-300","● E(Na⁺)","약 +61 mV"),("text-lime-300","● E(Cl⁻)","약 −87 mV"),("text-emerald-300","● E(Ca²⁺)","약 +130 mV")]),
  presets=[("normal","정상 (밖 K⁺ 4 mM)"),("hyper","고칼륨혈증 (8 mM)"),("hypo","저칼륨혈증 (2.5 mM)")], hold=("누르고 있으면 Na⁺ 통로 열기", "Na⁺ 통로 열림… (떼면 닫힘)"),
  nxt="2편 안정막전위의 비밀"),
 dict(n=2, title="안정막전위의 비밀", sub="K⁺ 누출 · Na⁺ 누출 · 펌프", h1='<span class="text-sky-300">안정막전위</span>의 비밀',
  tabs=["01. 막전위 측정", "02. K⁺ 누출 통로", "03. Na⁺ 누출", "04. 펌프의 역할", "05. 막전위 실험"],
  over="미세전극으로 막전위를 재고, K⁺ 누출 통로 · 약간의 Na⁺ 누출 · Na⁺-K⁺ 펌프가 어떻게 약 −70~−90 mV를 만드는지 3D로 확인하세요.",
  g1="Na⁺/K⁺ 투과성", g2="세포 안 K⁺ · 펌프",
  legend=("안정막전위 만들기 (큰 신경섬유)", [("text-orange-300","● K⁺만","약 −94 mV"),("text-blue-300","● + Na⁺ 누출","약 −86 mV"),("text-indigo-300","● + 펌프","약 −90 mV"),("text-sky-300","● 신경세포체","약 −65~−70 mV")]),
  presets=[("normal","정상"),("na","Na⁺ 투과성 증가"),("nopump","펌프 정지 (ATP 고갈)")], hold=("누르고 있으면 세포 밖 K⁺ 증가", "세포 밖 K⁺ 10 mM… (떼면 정상)"),
  nxt="3편 이온 펌프"),
 dict(n=3, title="이온 펌프", sub="Na⁺-K⁺ 펌프 · Ca²⁺ 펌프 · NCX", h1='이온 <span class="text-indigo-300">펌프</span>: Na⁺-K⁺ 펌프와 <span class="text-emerald-400">Ca²⁺</span> 펌프',
  tabs=["01. 펌프가 없다면", "02. Na⁺-K⁺ 펌프", "03. Ca²⁺ 펌프", "04. NCX 교환체", "05. 펌프 실험"],
  over="ATP를 써서 이온을 거꾸로 퍼 올리는 Na⁺-K⁺ 펌프와 Ca²⁺ 펌프, 그 기울기를 빌려 쓰는 NCX 교환체의 작동을 3D로 따라가 보세요.",
  g1="이온 기울기", g2="세포 안 Ca²⁺",
  legend=("펌프와 교환체 비교", [("text-indigo-300","● Na⁺-K⁺ 펌프","ATP 1 → 3Na⁺ 밖 · 2K⁺ 안"),("text-emerald-300","● SERCA","ATP 1 → Ca²⁺ 2 세망 안"),("text-emerald-200","● PMCA","ATP 1 → Ca²⁺ 1 밖"),("text-teal-300","● NCX","3Na⁺ 안 ↔ 1Ca²⁺ 밖")]),
  presets=[("normal","정상 (모두 작동)"),("atp","ATP 고갈"),("dig","디곡신 (Na⁺-K⁺ 펌프 억제)")], hold=("누르고 있으면 펌프 속도 2배", "펌프 빠르게… (떼면 정상)"),
  nxt="4편 활동전위"),
 dict(n=4, title="활동전위", sub="전압개폐 Na⁺ · K⁺ 통로", h1='<span class="text-amber-300">활동전위</span>: 전압개폐 <span class="text-blue-400">Na⁺</span> · <span class="text-orange-400">K⁺</span> 통로',
  tabs=["01. 안정 상태", "02. 역치와 탈분극", "03. 재분극", "04. 후과분극", "05. 자극 실험"],
  over="역치에서 Na⁺ 통로가 열리고, 불활성화문과 느린 K⁺ 통로가 막전위를 되돌리는 활동전위의 전 과정을 3D 통로 모형으로 보세요.",
  g1="Na⁺ 통로", g2="K⁺ 통로",
  legend=("활동전위 단계 (신경세포)", [("text-sky-300","● 안정","약 −70 mV"),("text-rose-300","● 역치","약 −55 mV"),("text-amber-300","● 정점","약 +35 mV"),("text-indigo-300","● 후과분극","약 −80 mV")]),
  presets=[("sub","역치 미만 자극"),("supra","역치 이상 자극"),("block","국소마취제 (Na⁺ 통로 차단)")], hold=("누르고 있으면 계속 자극", "자극 중… (불응기 간격으로만 발화)"),
  nxt="5편 불응기와 전도"),
 dict(n=5, title="불응기와 전도", sub="절대·상대불응기 · 도약전도", h1='<span class="text-rose-300">불응기</span>와 <span class="text-emerald-400">도약전도</span>',
  tabs=["01. 절대불응기", "02. 상대불응기", "03. 연속 전도", "04. 도약전도", "05. 전도 실험"],
  over="활동전위가 한 방향으로만, 그리고 말이집 섬유에서 결절을 건너뛰며 빠르게 전달되는 원리와 탈말이집 질환의 전도 차단을 3D로 확인하세요.",
  g1="전도 속도", g2="불응기",
  legend=("전도 속도 (근사값)", [("text-sky-300","● 가는 무말이집","약 0.25~2 m/s"),("text-emerald-300","● 굵은 말이집","최대 약 100 m/s"),("text-rose-300","● 탈말이집","느려짐 · 차단"),("text-amber-300","● 절대불응기","약 1 ms 안팎")]),
  presets=[("unmyel","무말이집 섬유"),("myel","말이집 (도약전도)"),("demyel","탈말이집 (다발경화증)")], hold=("누르고 있으면 연속 자극", "연속 자극 중… (불응기 간격)"),
  nxt="인체의 움직임 조절 2편 근수축 (웹앱)"),
]

MOBILE_CSS = """
    /* ===== 휴대폰 세로 화면 ===== */
    @media (max-width: 640px) {
      #viewportContainer { aspect-ratio: auto !important; min-height: 0 !important; height: 64vh; max-height: 620px; }
      #telemetryHud { width: auto !important; padding: 5px 9px !important; }
      #telemetryHud .tel-head, #telemetryHud .tel-extra { display: none !important; }
      #telemetryHud .flex.items-baseline { margin: 0 !important; gap: 6px; }
      div:has(> #zoomOutBtn) { display: none !important; }
      .spatial-tag { font-size: 9px !important; padding: 1px 6px !important; }
      .scene-slide .sc-txt > p { display: none !important; }
      .scene-slide .sc-txt h2 { font-size: 11px !important; }
      .scene-slide .sub-box { padding: 6px 10px !important; }
      .scene-slide .sub-box p { font-size: 11.5px !important; line-height: 1.5 !important; }
      #simulatorControls { top: 3.1rem !important; bottom: auto !important; padding: 6px !important; border-radius: 12px !important; }
      #simulatorControls > div { gap: 5px !important; }
      #simulatorControls > div > div { flex-wrap: nowrap !important; overflow-x: auto; justify-content: flex-start !important; width: 100%; scrollbar-width: none; }
      #simulatorControls > div > div > span { display: none !important; }
      #simulatorControls .sim-preset-btn { padding: 4px 8px !important; font-size: 11px !important; white-space: nowrap; flex: none; }
      #manualHoldBtn { padding: 6px 10px !important; font-size: 12px !important; }
      .scene-slide .sc-txt:first-child { max-width: 56% !important; }
      #telemetryHud span { font-size: 11px; }
      header > div:first-child > span { display: none !important; }
      #muteBtnLabel, #resetCameraBtn span { display: none !important; }
      header { padding: 6px 10px !important; gap: 6px !important; }
      #scene4OrganLegend { display: none !important; }
      header h1 { font-size: 13px !important; }
      header p { display: none !important; }
      main { padding: 6px !important; }
    }
"""

def one(src, old, new):
    assert src.count(old) == 1, old[:70]
    return src.replace(old, new)

for E in EPS:
    s = TPL
    n = E["n"]
    s = re.sub(r"<title>.*?</title>", f"<title>{E['title']}: {E['sub']} ({n}편 - True 3D)</title>", s, count=1)
    s = one(s, "TRUE 3D WEBGL · EPISODE 01", f"TRUE 3D WEBGL · EPISODE 0{n}")
    s = re.sub(r'(<h1 class="text-sm sm:text-base md:text-lg font-bold tracking-tight text-slate-100">\s*).*?(\s*</h1>)', lambda m: m.group(1) + E["h1"] + m.group(2), s, count=1, flags=re.S)
    a = s.index('<button data-scene="0"'); b = s.index('</div>', a)
    tabs = "".join(f'''        <button data-scene="{k}" class="scene-tab py-2.5 px-2 font-{'bold' if k==0 else 'medium'} text-center border-b-2 {'border-amber-400 text-amber-300 bg-slate-900/80' if k==0 else 'border-transparent text-slate-400 hover:text-slate-200'} transition truncate cursor-pointer">
          {t}
        </button>
''' for k, t in enumerate(E["tabs"]))
    s = s[:a] + tabs.lstrip() + "      " + s[b:]
    s = re.sub(r'(<h2 class="text-xl sm:text-3xl font-black text-white mb-3 tracking-tight">\s*).*?(\s*</h2>)', lambda m: m.group(1) + f"{E['title']}: {E['sub']}" + m.group(2), s, count=1, flags=re.S)
    s = re.sub(r'(<p class="text-xs sm:text-sm text-slate-300 max-w-xl mb-6 leading-relaxed">\s*).*?(\s*</p>)', lambda m: m.group(1) + E["over"] + m.group(2), s, count=1, flags=re.S)
    s = one(s, "  </style>\n</head>", MOBILE_CSS + "  </style>\n</head>")
    s = s.replace("Interactive Real-Time 3D Anatomy Engine", "Interactive Real-Time 3D Membrane Engine")
    # 텔레메트리 HUD
    a = s.index("          <!-- 생체 텔레메트리 HUD -->"); b = s.index("        <!-- 좌측 플로팅 해부학 콜아웃 카드 -->")
    hud = f'''          <!-- 생체 텔레메트리 HUD -->
          <div id="telemetryHud" class="glass-panel rounded-xl p-2.5 sm:p-3.5 w-44 sm:w-60 pointer-events-none">
            <div class="tel-head text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center border-b border-slate-800 pb-1">
              <span>MEMBRANE TELEMETRY</span>
              <span id="telemetryPhaseLabel" class="text-sky-300 font-bold">READY</span>
            </div>
            <div class="flex items-baseline justify-between mb-1">
              <span class="text-[11px] text-slate-300">막전위 (Vm)</span>
              <div class="font-mono-tech"><span id="hudVm" class="text-base sm:text-lg font-bold text-sky-300">-70</span> <span class="text-[10px] text-slate-400">mV</span></div>
            </div>
            <div class="tel-extra">
            <canvas id="vmScope" width="220" height="64" class="w-full h-12 sm:h-14 mb-2 rounded bg-slate-950/70 border border-slate-800"></canvas>
            <div class="mb-2">
              <div class="flex justify-between text-[11px] mb-1"><span class="text-slate-300">{E['g1']}</span><span id="hudG1Val" class="font-mono-tech font-bold text-amber-300">—</span></div>
              <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800"><div id="hudG1Bar" class="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 transition-all duration-150" style="width: 20%;"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-[11px] mb-1"><span class="text-slate-300">{E['g2']}</span><span id="hudG2Val" class="font-mono-tech font-bold text-sky-400">—</span></div>
              <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800"><div id="hudG2Bar" class="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-150" style="width: 20%;"></div></div>
            </div>
            </div>
          </div>
        </div>

'''
    s = s[:a] + hud + s[b:]
    # 4장면 범례
    a = s.index('<div id="scene4OrganLegend"'); b = s.index("        <!-- SCENE 5 전용")
    lt, rows = E["legend"]
    leg = f'''<div id="scene4OrganLegend" class="hidden absolute right-4 bottom-24 sm:bottom-28 z-20 glass-panel rounded-xl p-3 w-64 sm:w-72 pointer-events-none">
          <div class="text-[11px] font-bold text-emerald-300 mb-1.5 border-b border-slate-800 pb-1">{lt}</div>
          <ul class="text-[11px] text-slate-200 space-y-1">
''' + "".join(f'            <li class="flex justify-between"><span class="{c} font-semibold">{a1}</span><span>{b1}</span></li>\n' for c, a1, b1 in rows) + '''          </ul>
        </div>

'''
    s = s[:a] + leg + s[b:]
    # 시뮬레이터 컨트롤
    a = s.index('<div id="simulatorControls"'); b = s.index("        <!-- 하단 시네마틱 자막 오버레이 -->")
    pb = "".join(f'''              <button type="button" data-preset="{k}" class="sim-preset-btn px-2.5 py-1.5 rounded-lg text-xs {'font-bold bg-amber-500/25 text-amber-300 border border-amber-400/60' if j==0 else 'font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700'} transition cursor-pointer">{t}</button>
''' for j, (k, t) in enumerate(E["presets"]))
    sim = f'''<div id="simulatorControls" class="hidden absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl glass-panel rounded-2xl p-3 sm:p-3.5">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div class="flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
              <span class="text-[11px] font-semibold text-slate-400 mr-1">조건:</span>
{pb}            </div>
            <button id="manualHoldBtn" type="button"
              class="w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.35)] transition active:scale-95 cursor-pointer">
              {E['hold'][0]}
            </button>
          </div>
        </div>

'''
    s = s[:a] + sim + s[b:]
    s = re.sub(r"시리즈 다음 편: <strong class=\"text-slate-300\">.*?</strong>", f'시리즈 다음 편: <strong class="text-slate-300">{E["nxt"]}</strong>', s, count=1)
    s = re.sub(r'(<p id="floatingCardBody"[^>]*>\s*).*?(\s*</p>)', r"\1장면 설명이 여기에 나타납니다.\2", s, count=1, flags=re.S)
    s = re.sub(r'(<span id="hudSceneTitle"[^>]*>).*?(</span>)', r"\1" + E["title"] + r"\2", s, count=1)
    s = re.sub(r'(<div id="hudSubBadge"[^>]*>\s*<span>).*?(</span>)', r"\1" + E["sub"] + r"\2", s, count=1, flags=re.S)
    s = s.replace("3D CAM: ORBITAL TORSO VIEW", "3D CAM: MEMBRANE VIEW")
    s = re.sub(r'(<p id="subtitleText"[^>]*>\s*).*?(\s*</p>)', r"\1시작 버튼을 누르면 실시간 3D 세포막 애니메이션이 재생됩니다.\2", s, count=1, flags=re.S)
    # 스크립트
    a = s.index("    const SCENES = ["); b = s.index("    /**\n     * =========================================================================\n     * 한국어 음성 나레이션")
    ep = (HERE / "src" / f"ep{n}.js").read_text(encoding="utf-8")
    first = E["presets"][0][0]
    common = f'''
    const state = {{
      currentScene: 0, isPlaying: false, hasStarted: false, isMuted: false, sceneElapsedMs: 0, lastFrameTime: performance.now(),
      cam: {{ theta: SCENES[0].cameraTarget.theta, phi: SCENES[0].cameraTarget.phi, radius: SCENES[0].cameraTarget.radius, targetX: 0, targetY: 0, targetZ: 0,
        userThetaOffset: 0, userPhiOffset: 0, userZoomMult: 1.0, targetUserZoomMult: 1.0, userPanX: 0, userPanY: 0, targetUserPanX: 0, targetUserPanY: 0,
        dragMode: null, dragStartX: 0, dragStartY: 0, pinchStartDist: 0, pinchStartZoom: 1.0, pinchCenterX: 0, pinchCenterY: 0 }},
      simPreset: '{first}', manualModeActive: false, isManualHolding: false, simCycleTime: 0
    }};
    const dom = {{
      viewport: document.getElementById('viewportContainer'), threeContainer: document.getElementById('threeContainer'), spatialLabelsLayer: document.getElementById('spatialLabelsLayer'),
      startOverlay: document.getElementById('startOverlay'), startWithVoiceBtn: document.getElementById('startWithVoiceBtn'), startSilentBtn: document.getElementById('startSilentBtn'),
      resetCameraBtn: document.getElementById('resetCameraBtn'), zoomInBtn: document.getElementById('zoomInBtn'), zoomOutBtn: document.getElementById('zoomOutBtn'), zoomLevelLabel: document.getElementById('zoomLevelLabel'), hudResetViewBtn: document.getElementById('hudResetViewBtn'),
      muteToggleBtn: document.getElementById('muteToggleBtn'), iconSoundOn: document.getElementById('iconSoundOn'), iconSoundOff: document.getElementById('iconSoundOff'), muteBtnLabel: document.getElementById('muteBtnLabel'),
      ttsStatusText: document.getElementById('ttsStatusText'), ttsIndicatorDot: document.getElementById('ttsIndicatorDot'),
      sceneTabs: document.querySelectorAll('.scene-tab'), hudSceneNum: document.getElementById('hudSceneNum'), hudSceneTitle: document.getElementById('hudSceneTitle'), hudSubBadge: document.getElementById('hudSubBadge'), hudCameraInfo: document.getElementById('hudCameraInfo'),
      telemetryPhaseLabel: document.getElementById('telemetryPhaseLabel'), hudVm: document.getElementById('hudVm'), vmScope: document.getElementById('vmScope'),
      hudG1Val: document.getElementById('hudG1Val'), hudG1Bar: document.getElementById('hudG1Bar'), hudG2Val: document.getElementById('hudG2Val'), hudG2Bar: document.getElementById('hudG2Bar'),
      floatingCardTitle: document.getElementById('floatingCardTitle'), floatingCardBody: document.getElementById('floatingCardBody'), scene4OrganLegend: document.getElementById('scene4OrganLegend'), simulatorControls: document.getElementById('simulatorControls'),
      subtitleText: document.getElementById('subtitleText'), sceneProgressBar: document.getElementById('sceneProgressBar'), prevSceneBtn: document.getElementById('prevSceneBtn'), playPauseBtn: document.getElementById('playPauseBtn'),
      iconPlay: document.getElementById('iconPlay'), iconPause: document.getElementById('iconPause'), playPauseLabel: document.getElementById('playPauseLabel'), nextSceneBtn: document.getElementById('nextSceneBtn'),
      replayNarrationBtn: document.getElementById('replayNarrationBtn'), currentSceneCounter: document.getElementById('currentSceneCounter'),
      manualHoldBtn: document.getElementById('manualHoldBtn'), presetBtns: document.querySelectorAll('.sim-preset-btn')
    }};
'''
    s = s[:a] + ep + common + LIB + "\n" + s[b:]
    s = one(s, '"들숨 중... (손을 떼면 긴 날숨)"', '"' + E["hold"][1] + '"')
    s = one(s, '"누르고 있으면 들숨 / 떼면 긴 날숨"', '"' + E["hold"][0] + '"')
    (HERE / "episodes" / f"ep{n}.html").write_text(s, encoding="utf-8")
    print("wrote ep%d.html" % n, len(s))
