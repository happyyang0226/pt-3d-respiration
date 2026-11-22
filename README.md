# pt-3d-respiration · 3D 강의 애니메이션 통합 포털 만들기

여러 편의 True 3D 강의 애니메이션(Three.js, 장면 5개, 한국어 음성 나레이션)을 **HTML 파일 하나짜리 통합 포털**로 묶는다.
첫 사례: `examples/breath-series` (호흡 생리학 4부작).

포털에 들어가는 것
- 처음 화면: 편 카드, 청암대학교 상단 띠·색, ✍ 내 노트 모아보기, 🖊 교수용 · 내용 수정 상자
- 편 보기: 위쪽 막대(처음 화면 · 편 탭 · 이전/다음 편 · ✍ 내 노트 · 🔊 나레이션)
- 고도화 나레이션(`engine/narration_engine.js`): 문장 단위 읽기, 일시정지 후 이어 읽기, 다 읽은 뒤 다음 장면, 읽는 문장 자막, 발음 사전(CO₂·pH·Ca²⁺ → 우리말, 조사 자동 교정), 목소리·속도·높이·음량·쉼 설정
- student-notes 스킬의 학생 필기(코드 1)·용어 찾기(코드 2)·교수용 내용 수정(코드 3) — `vendor/student-notes`
  - 장면 5개를 `section.scene-slide`로 펼쳐 장면마다 필기·메모·수정
  - 펜이나 수정 모드를 켜면 재생이 자동으로 멈춤
  - 다른 편 검색, 노트 모아보기·파일 저장·백업, 수정본 파일 저장(포털 틀이 처리)

## 폴더
```
index.html                      배포용 완성본(호흡 생리학 4부작 포털) — Vercel이 이 파일을 보여 줌
engine/narration_engine.js      고도화 나레이션 엔진 (각 편의 ttsManager 자리에 들어감)
portal/portal_template.html     포털 틀 (__SERIES_TITLE__ 등 자리 표시자)
tools/check_episode.py          편이 '편 규약'을 지키는지 확인
tools/patch_episode.py          편 하나에 장면 슬라이드·나레이션·필기·용어·수정을 넣음
tools/build.py                  series.json → 통합 포털 HTML 한 개
tools/test_portal.py            Playwright 점검 45항목 (student-notes 점검 목록 + 나레이션·포털)
vendor/student-notes/           student-notes 스킬 코드 1·2·3 (스킬이 바뀌면 여기도 갱신)
examples/breath-series/         호흡 생리학 4부작: series.json, glossary.json, episodes/ep1~4.html
```

## 사용
```bash
python tools/check_episode.py examples/breath-series/episodes/*.html
python tools/build.py examples/breath-series/series.json
# 점검(선택): pip install playwright && npm i --prefix /tmp/vend three@0.128.0 @tailwindcss/browser@4
python tools/test_portal.py examples/breath-series/series.json
```
결과: `examples/<시리즈>/<output>` (series.json의 `output`).

## 편 규약 (새 편을 만들 때 반드시 지킬 것)
가장 쉬운 방법은 `examples/breath-series/episodes/ep1.html`을 복사해 **SCENES 내용과 3D 모델 함수만** 바꾸는 것이다.
`check_episode.py`가 아래를 확인한다.

1. 한 파일 HTML. `<head>`에 Tailwind CDN, Three.js r128 CDN, Noto Sans KR. 화면 글에 `$CO_2$` 같은 수식 표기 금지(유니코드 CO₂, Ca²⁺).
2. `const SCENES = [ ... ];` 장면 5개, 각 장면 필드: `num, title, badgeText, badgeClass, camInfo, cardTitle, cardColor, cardBody, subtitleHtml, narrationText` (+ `cameraTarget, durationMs`). 마지막 장면은 시뮬레이터(`durationMs: 999999`).
3. 전역 `state`(isPlaying, hasStarted, isMuted, sceneElapsedMs, currentScene), `dom`(startOverlay, subtitleText, ttsStatusText, ttsIndicatorDot …), 함수 `goToScene(index, autoSpeak)`, `setPlayState(playing)`.
4. 다음 고정 문자열이 **정확히 한 번씩** 있어야 한다(들여쓰기 포함). `tools/patch_episode.py`의 `ANCHORS` 참고.
   - `    const ttsManager = { … \n    };` 블록 (엔진으로 통째로 바뀜)
   - mainLoop의 `const progress = Math.min(100, …)` 줄과 `if (state.sceneElapsedMs >= scene.durationMs) {` 줄
   - 다시 듣기 처리의 `state.sceneElapsedMs = 0;` 다음 줄 `if (state.isMuted) {`
   - 왼쪽 위 HUD `div`, `#sceneFloatingInfo`, 아래 자막 `div` (숨기고 장면 슬라이드로 대체)
   - `<!-- 시작 오버레이 -->` 주석, goToScene 안의 `const scene = SCENES[index];`
   - 헤더 오른쪽 `<div class="flex items-center gap-2">` 바로 다음 `<button id="resetCameraBtn"` (✏️📖✍ 버튼 자리)
   - `</style>\n</head>`, `</body>`
5. 3D 그림 속 이름표(spatial label)는 스크립트가 만드는 내용이라 화면 수정 대상이 아니다.

## series.json
- `series`: `id`(저장 키 접두어, 영문), `title`, `slug`(파일 이름용), `org`, `strip_sub`, `eyebrow`, `hero_html`, `narration_sample`
- `glossary`: 용어 사전 파일. 항목 `{t,en,a,d,ch}` — `t`는 의학용어 6판 표준, 옛 용어·약어는 `a`, `ch`는 편 번호
- `episodes[]`: `id, file, title, sub, desc, tags, c1, c2` (+ 선택 `label`, 예: "통합편")
- `test`: 점검용 단어(`select_word/expect`, `josa_query/expect`, `abbr_query/expect`, `local_term`, `remote_term`, `remote_expect_id`)

## 저장 키 (브라우저 localStorage)
- 노트 `mp-notes-v1:<편 id>`, 수정 `mp-edits-v1:<편 id>`, 수정 기능 켜기 `mp-edit-on`, 나레이션 설정 `<series id>-narration-v1`
- 편 id를 바꾸면 학생 노트가 이어지지 않는다. 한번 정한 id는 바꾸지 않는다.

## 배포 (Vercel)
- 이 저장소는 Vercel에 연결되어 있어, `main`에 push하면 저장소 맨 위의 `index.html`이 그대로 배포된다(빌드 과정 없음).
- 포털을 다시 만들면 결과를 `index.html`로 복사해 함께 커밋한다.
  `python tools/build.py examples/breath-series/series.json && cp "examples/breath-series/호흡생리학_4부작_통합포털.html" index.html`
- 다른 시리즈를 따로 배포하려면 그 시리즈용 저장소·Vercel 프로젝트를 새로 만들거나, `index.html` 대신 `<시리즈>/index.html`로 두고 처음 화면에서 링크한다.
