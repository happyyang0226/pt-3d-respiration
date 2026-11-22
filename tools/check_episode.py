"""편 HTML이 '편 규약'을 지키는지 확인한다.  사용: python tools/check_episode.py 편1.html 편2.html ..."""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from patch_episode import check, extract_scenes

bad = 0
for f in sys.argv[1:]:
    src = pathlib.Path(f).read_text(encoding="utf-8")
    probs = check(src)
    if probs:
        bad += 1
        print(f"❌ {f}"); [print("   -", p) for p in probs]
    else:
        sc = extract_scenes(src)
        print(f"✅ {f} · 장면 {len(sc)}개: " + " / ".join(s['title'] for s in sc))
sys.exit(1 if bad else 0)
