"""시리즈 설정(series.json)으로 통합 포털 HTML 한 개를 만든다.
사용: python tools/build.py examples/breath-series/series.json
"""
import base64, json, pathlib, re, sys
TOOLS = pathlib.Path(__file__).resolve().parent
REPO = TOOLS.parent
sys.path.insert(0, str(TOOLS))
from patch_episode import build_episode

cfg_path = pathlib.Path(sys.argv[1]).resolve()
base = cfg_path.parent
cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
S = cfg["series"]
glossary = json.loads((base / cfg.get("glossary", "glossary.json")).read_text(encoding="utf-8")) if cfg.get("glossary", "glossary.json") else []

built, episodes = [], []
for n, ep in enumerate(cfg["episodes"], 1):
    ep = dict(ep)
    ep.setdefault("id", f"{S['id']}-ep{n}")
    ep.setdefault("no", f"{n:02d}")
    src = (base / ep.pop("file")).read_text(encoding="utf-8")
    built.append(build_episode(src, ep["id"], f"{S['title']} {n}편 · {ep['title']}", glossary, cfg.get("medical", True)))
    episodes.append(ep)

payload = [base64.b64encode(h.encode("utf-8")).decode("ascii") for h in built]
code3 = (REPO / "vendor" / "student-notes" / "code3_edit.html").read_text(encoding="utf-8")
editc = re.search(r"/\*EDITC\*/(.*?)/\*/EDITC\*/", code3, re.S).group(1)
series_js = {"id": S["id"], "title": S["title"], "slug": S.get("slug", S["id"]), "org": S.get("org", "청암대학교 물리치료과")}

out = (REPO / "portal" / "portal_template.html").read_text(encoding="utf-8")
rep = {
    "__PAYLOAD__": json.dumps(payload),
    "__SERIES__": json.dumps(series_js, ensure_ascii=False),
    "__EPISODES__": json.dumps(episodes, ensure_ascii=False),
    "  __EDITC__": "  /*EDITC*/" + editc + "/*/EDITC*/",
    "__SERIES_TITLE__": S["title"],
    "__STRIP_SUB__": S.get("strip_sub", ""),
    "__EYEBROW__": S.get("eyebrow", "Cheongam Univ. · True 3D Series"),
    "__HERO_HTML__": S["hero_html"],
    "__SERIES_ID__": S["id"],
    "__NARR_SAMPLE__": json.dumps(S.get("narration_sample", "안녕하세요. 나레이션 목소리 미리 듣기입니다."), ensure_ascii=False),
    "__ORG__": S.get("org", "청암대학교 물리치료과"),
}
for k, v in rep.items():
    assert out.count(k) == 1, k
    out = out.replace(k, v)
# 오프라인·휴대폰용: three.js와 미리 만든 Tailwind CSS를 포털에 한 벌만 내장 → 편을 열 때 CDN 자리에 끼워 넣음
if cfg.get("offline"):
    three = (REPO / "vendor" / "offline" / "three.r128.min.js").read_text(encoding="utf-8")
    tw = (base / "tw.css").read_text(encoding="utf-8")
    assert "</script" not in three and "</script" not in tw
    vend = '<script type="text/plain" id="vend-three">' + three + '</script>\n<script type="text/plain" id="vend-tw">' + tw + '</script>\n'
    anchor = '<script type="application/json" id="payload">'
    assert out.count(anchor) == 1
    out = out.replace(anchor, vend + anchor)
dst = (base / cfg.get("output", "portal.html")).resolve()
dst.write_text(out, encoding="utf-8")
print(f"{dst}  ({dst.stat().st_size/1024:.0f} KB, {len(episodes)}편, 용어 {len(glossary)}개)")
