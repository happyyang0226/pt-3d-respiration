"""편(에피소드) HTML 하나에 다음을 넣는다.
1) 고도화 나레이션 엔진(engine/narration_engine.js) + '나레이션을 다 읽은 뒤 다음 장면'
2) 장면 5개(SCENES)를 section.scene-slide로 펼친 슬라이드 구조(필기·용어·수정 대상)
3) student-notes 코드 1·2·3(vendor/student-notes) + 용어 사전 + 포털 연동 스크립트

편 HTML은 '편 규약'(README.md)을 지켜야 한다. 먼저 tools/check_episode.py로 확인한다.
"""
import html, json, pathlib, re, subprocess

REPO = pathlib.Path(__file__).resolve().parent.parent
ENGINE = (REPO / "engine" / "narration_engine.js").read_text(encoding="utf-8")
VEND = REPO / "vendor" / "student-notes"
CODE1 = (VEND / "code1_study.html").read_text(encoding="utf-8")
CODE2 = (VEND / "code2_lookup.html").read_text(encoding="utf-8")
CODE3 = (VEND / "code3_edit.html").read_text(encoding="utf-8")

# 편 규약의 고정 문자열(앵커). 각 편에 정확히 한 번씩 있어야 한다.
ANCHORS = {
    "tts": r"    const ttsManager = \{.*?\n    \};\n",
    "scenes": r"    const SCENES = (\[.*?\n    \]);",
    "progress": "        const progress = Math.min(100, (state.sceneElapsedMs / scene.durationMs) * 100);",
    "advance": "        if (state.sceneElapsedMs >= scene.durationMs) {",
    "replay": "        state.sceneElapsedMs = 0;\n        if (state.isMuted) {",
    "hudTopLeft": '<div class="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none flex flex-col gap-1.5 max-w-[60%]">',
    "card": '<div id="sceneFloatingInfo" class="',
    "subtitle": '<div class="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl pointer-events-none">',
    "overlay": "        <!-- 시작 오버레이 -->",
    "goToScene": "      const scene = SCENES[index];\n",
    "mount": '<div class="flex items-center gap-2">\n      <button id="resetCameraBtn"',
    "styleEnd": "  </style>\n</head>",
    "bodyEnd": "</body>",
}
SCENE_FIELDS = ["num", "title", "badgeText", "badgeClass", "camInfo", "cardTitle", "cardColor", "cardBody", "subtitleHtml", "narrationText"]


def check(src):
    """규약 위반 목록을 돌려준다(빈 목록이면 통과)."""
    problems = []
    for k, a in ANCHORS.items():
        n = len(re.findall(a, src, re.S)) if k in ("tts", "scenes") else src.count(a)
        if n != 1:
            problems.append(f"앵커 '{k}'가 {n}번 있음(1번이어야 함)")
    if not problems:
        for i, sc in enumerate(extract_scenes(src)):
            miss = [f for f in SCENE_FIELDS if not sc.get(f)]
            if miss:
                problems.append(f"SCENES[{i}]에 빈 필드: {', '.join(miss)}")
    if re.search(r"\$[A-Za-z]+_?\{?[0-9+\-^{}]*\}?\$", src.split("<script>")[0]):
        problems.append("화면 글에 $CO_2$ 같은 수식 표기가 남아 있음(그대로 보임) → CO₂, Ca²⁺ 같은 유니코드로 바꿀 것")
    return problems


def extract_scenes(src):
    m = re.search(ANCHORS["scenes"], src, re.S)
    js = "const S=" + m.group(1) + ";console.log(JSON.stringify(S.map(x=>{const o={};" + \
         "".join(f"o.{f}=x.{f};" for f in SCENE_FIELDS) + "return o;})))"
    return json.loads(subprocess.check_output(["node", "-e", js]))


def _one(src, old, new):
    assert src.count(old) == 1, ("anchor not unique", old[:80])
    return src.replace(old, new)


def scene_sections(scenes):
    e = html.escape
    out = []
    for k, sc in enumerate(scenes):
        out.append(f'''        <section class="slide scene-slide{' on' if k == 0 else ''}" id="sc{k+1}" data-title="{e(sc['title'])}">
          <div class="sc-txt absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 max-w-[60%]">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel w-fit">
              <span class="text-xs font-mono-tech font-bold text-amber-400">{e(sc['num'])}</span>
              <span class="text-slate-600">|</span>
              <h2 class="text-xs sm:text-sm font-bold text-slate-100">{e(sc['title'])}</h2>
            </div>
            <p class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] w-fit backdrop-blur-sm {sc['badgeClass']}">{e(sc['badgeText'])}</p>
            <p class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/70 text-[10px] font-mono-tech text-slate-400 w-fit">{e(sc['camInfo'])}</p>
          </div>
          <div class="sc-txt sc-card hidden md:flex flex-col gap-2 absolute left-4 top-32 w-64 glass-panel rounded-xl p-3.5">
            <h3 class="text-xs font-bold {sc['cardColor']}">{e(sc['cardTitle'])}</h3>
            <p class="text-[11px] text-slate-300 leading-relaxed">{e(sc['cardBody'])}</p>
          </div>
          <div class="sc-txt absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl">
            <div class="sub-box bg-slate-950/90 border border-slate-800/90 backdrop-blur-md rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-center shadow-2xl">
              <p class="text-xs sm:text-sm md:text-base font-medium text-slate-100 leading-relaxed">{sc['subtitleHtml']}</p>
            </div>
          </div>
        </section>
''')
    return "".join(out)


SCENE_CSS = """
    /* ---- 장면 슬라이드 (필기·용어 찾기·내용 수정 대상) ---- */
    .scene-slide { position: absolute; inset: 0; z-index: 25; pointer-events: none; display: none; }
    .scene-slide.on { display: block; }
    .scene-slide .sc-txt { pointer-events: auto; user-select: text; -webkit-user-select: text; }
    .scene-slide .sc-txt h2, .scene-slide .sc-txt h3, .scene-slide .sc-txt p { margin: 0; }
    .scene-slide .sc-card h3::before { content: ""; display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #FBBF24; margin-right: 6px; vertical-align: 1px; }
    .scene-slide > .st-mark { top: auto; bottom: 96px; right: 16px; }
    #studyMount { flex-wrap: wrap; justify-content: flex-end; }
    body.ed-on .scene-slide [data-ed]:focus { background: rgba(31,138,76,.28); color: #fff; }
    /* 필기·수정 도구 막대가 열려 있으면 아래 재생 막대를 가리지 않도록 자리를 비움 */
    body:has(#stBar:not([hidden])), body:has(#edBar:not([hidden])) { padding-bottom: 68px; }
  </style>"""

NAV = """<script>
/* 포털에서 '그 장면 열기' 요청을 받으면 해당 장면으로 이동 */
window.addEventListener("message",function(ev){ var d=ev.data; if(!d||d.app!=="mp"||!d.slide||d.lookupRes) return;
  try{ window.STUDY_CFG.goTo(d.slide-1); }catch(e){} });
/* 펜으로 쓰거나 내용을 고치는 동안에는 장면이 저절로 넘어가지 않도록 일시정지 */
new MutationObserver(function(){ var c=document.body.classList;
  if((c.contains("st-pen")||c.contains("ed-on")) && state.isPlaying){ try{ setPlayState(false); }catch(e){} } })
  .observe(document.body,{attributes:true,attributeFilter:["class"]});
</script>
"""


def build_episode(src, app_id, title, glossary, medical=True):
    probs = check(src)
    assert not probs, "편 규약 위반:\n- " + "\n- ".join(probs)
    scenes = extract_scenes(src)

    # 1) 나레이션 엔진
    src = re.sub(ANCHORS["tts"], lambda m: ENGINE, src, count=1, flags=re.S)
    src = _one(src, ANCHORS["progress"], "        const progress = Math.min(ttsManager.canAdvance() ? 100 : 97, (state.sceneElapsedMs / scene.durationMs) * 100);")
    src = _one(src, ANCHORS["advance"], "        if (state.sceneElapsedMs >= scene.durationMs && ttsManager.canAdvance()) {")
    src = _one(src, ANCHORS["replay"], "        state.sceneElapsedMs = 0;\n        ttsManager.reset();\n        if (state.isMuted) {")

    # 2) 장면 슬라이드
    hide = ' style="display:none" aria-hidden="true"'
    src = _one(src, ANCHORS["hudTopLeft"], ANCHORS["hudTopLeft"][:-1] + hide + ">")
    src = _one(src, ANCHORS["card"], '<div id="sceneFloatingInfo"' + hide + ' class="')
    src = _one(src, ANCHORS["subtitle"], ANCHORS["subtitle"][:-1] + hide + ">")
    src = _one(src, ANCHORS["overlay"], "        <!-- 장면 슬라이드 -->\n" + scene_sections(scenes) + "\n" + ANCHORS["overlay"])
    src = _one(src, ANCHORS["goToScene"], ANCHORS["goToScene"] + "      document.querySelectorAll('.scene-slide').forEach((s, k) => s.classList.toggle('on', k === index));\n")
    src = _one(src, ANCHORS["mount"], ANCHORS["mount"].replace('<div class="flex', '<div id="studyMount" class="flex'))
    src = _one(src, ANCHORS["styleEnd"], SCENE_CSS + "\n</head>")

    # 3) 설정 + 필기 + 사전 + 용어 찾기 + 내용 수정 + 연동
    cfg = f"""<script>window.STUDY_CFG={{
  app:{json.dumps(app_id)},
  slides:".scene-slide",
  activeClass:"on",
  mount:"#studyMount",
  goTo:function(i){{
    if(!state.hasStarted){{ state.hasStarted=true; dom.startOverlay.classList.add('hidden'); }}
    if(state.isPlaying) setPlayState(false);
    goToScene(i,false);
  }},
  title:{json.dumps(title, ensure_ascii=False)},
  parentStore:true,
  medical:{'true' if medical else 'false'}
}};</script>
"""
    gl_json = json.dumps(glossary, ensure_ascii=False).replace("</", "<\\/")
    block = (cfg + CODE1 + "\n" + f'<script type="application/json" id="lkData">{gl_json}</script>\n'
             + CODE2 + "\n" + CODE3 + "\n" + NAV)
    src = _one(src, ANCHORS["bodyEnd"], block + "</body>")
    return src
