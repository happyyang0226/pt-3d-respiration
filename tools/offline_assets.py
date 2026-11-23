"""휴대폰·오프라인에서도 열리도록 편이 쓰는 Tailwind CSS를 미리 만들어 둔다(CDN 대신 포털에 내장).
사용: python tools/offline_assets.py examples/<시리즈>/series.json
준비: npm i --prefix /tmp/vend tailwindcss@3.4.17
결과: examples/<시리즈>/tw.css  (three.js는 vendor/offline/three.r128.min.js 를 그대로 씀)"""
import json, pathlib, subprocess, sys, tempfile
TOOLS = pathlib.Path(__file__).resolve().parent
REPO = TOOLS.parent
sys.path.insert(0, str(TOOLS))
from patch_episode import build_episode

cfg_path = pathlib.Path(sys.argv[1]).resolve(); base = cfg_path.parent
cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
glossary = json.loads((base / cfg.get("glossary", "glossary.json")).read_text(encoding="utf-8"))
tmp = pathlib.Path(tempfile.mkdtemp())
for n, ep in enumerate(cfg["episodes"], 1):
    src = (base / ep["file"]).read_text(encoding="utf-8")
    (tmp / f"ep{n}.html").write_text(build_episode(src, ep.get("id", f"e{n}"), ep["title"], glossary, cfg.get("medical", True)), encoding="utf-8")
(tmp / "tw.config.js").write_text("module.exports={content:[%s],theme:{extend:{}},plugins:[]};" % json.dumps(str(tmp / "*.html")), encoding="utf-8")
(tmp / "in.css").write_text("@tailwind base;\n@tailwind components;\n@tailwind utilities;\n", encoding="utf-8")
cli = pathlib.Path("/tmp/vend/node_modules/.bin/tailwindcss")
subprocess.check_call([str(cli), "-c", str(tmp / "tw.config.js"), "-i", str(tmp / "in.css"), "-o", str(base / "tw.css"), "--minify"])
print(base / "tw.css", (base / "tw.css").stat().st_size // 1024, "KB")
