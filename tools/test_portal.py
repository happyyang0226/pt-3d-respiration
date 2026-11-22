import asyncio, json, pathlib, re, sys, threading, http.server, functools, base64, urllib.parse
from playwright.async_api import async_playwright

# 사용: python tools/test_portal.py examples/breath-series/series.json
# 준비: pip install playwright · npm i --prefix /tmp/vend three@0.128.0 @tailwindcss/browser@4 (인터넷 없는 곳에서 3D·디자인을 로컬로 대신 불러옴)
CFG_PATH = pathlib.Path(sys.argv[1]).resolve()
CFG = json.loads(CFG_PATH.read_text(encoding="utf-8")); T = CFG["test"]
ROOT = CFG_PATH.parent
VEND = pathlib.Path("/tmp/vend/node_modules")
PORTAL = CFG.get("output", "portal.html")
CHROME = next((p for p in ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"] if pathlib.Path(p).exists()), None)
OUT = ROOT / "_test"; OUT.mkdir(exist_ok=True)

def serve():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Q, directory=str(ROOT))
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    s = http.server.ThreadingHTTPServer(("127.0.0.1", 8799), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s

results = []
def check(name, ok, extra=""):
    results.append((name, bool(ok)))
    print(("✅" if ok else "❌"), name, extra)

async def route(r):
    u = r.request.url
    if "three.min.js" in u:
        await r.fulfill(path=str(VEND / "three/build/three.min.js"), content_type="application/javascript")
    elif "cdn.tailwindcss.com" in u:
        await r.fulfill(path=str(VEND / "@tailwindcss/browser/dist/index.global.js"), content_type="application/javascript")
    elif "fonts.googleapis" in u or "fonts.gstatic" in u:
        await r.fulfill(body="", content_type="text/css")
    else:
        await r.continue_()

async def frame_of(page):
    for _ in range(60):
        for f in page.frames:
            if f != page.main_frame:
                try:
                    if await f.evaluate("!!document.getElementById('startWithVoiceBtn') && !!window.STUDY"):
                        return f
                except Exception:
                    pass
        await page.wait_for_timeout(200)
    raise RuntimeError("frame not ready")

async def main():
    srv = serve()
    async with async_playwright() as p:
        br = await p.chromium.launch(executable_path=CHROME, args=["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
        ctx = await br.new_context(viewport={"width": 1366, "height": 860}, accept_downloads=True)
        await ctx.route("**/*", route)
        page = await ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        await page.goto(f"http://127.0.0.1:8799/{urllib.parse.quote(PORTAL)}")
        await page.wait_for_timeout(600)
        await page.screenshot(path=str(OUT / "01_home.png"))

        # ---- 1편 열기
        await page.click(".card >> nth=0")
        fr = await frame_of(page)
        fr.on = None
        await fr.click("#startSilentBtn")
        await page.wait_for_timeout(2500)
        await page.screenshot(path=str(OUT / "02_ep1.png"))
        check("편에 ✍ 📖 버튼이 위쪽 막대에 들어감", await fr.evaluate("!!document.querySelector('#studyMount #stBtn') && !!document.querySelector('#studyMount #lkBtn')"))
        check("수정 버튼은 기본으로 숨김", await fr.evaluate("document.getElementById('edBtn').hidden"))

        # ---- 펜
        await fr.click("#stBtn")
        await page.wait_for_timeout(300)
        cv = fr.locator(".scene-slide.on canvas.stcv")
        bb = await cv.bounding_box()
        check("펜 캔버스가 장면 전체를 덮음", bb and bb["width"] > 900, str(bb))
        check("펜을 켜면 장면 자동 넘김이 멈춤", not await fr.evaluate("state.isPlaying"))
        x0, y0 = bb["x"] + bb["width"] * 0.45, bb["y"] + bb["height"] * 0.45
        await page.mouse.move(x0, y0); await page.mouse.down()
        for k in range(12): await page.mouse.move(x0 + k * 12, y0 + (k % 3) * 6)
        await page.mouse.up()
        await page.wait_for_timeout(500)
        n1 = await fr.evaluate("Object.values(STUDY.data()).reduce((n,d)=>n+(d.strokes||[]).length,0)")
        check("펜 한 획 저장", n1 == 1, f"strokes={n1}")

        # ---- 도형: 네모(Shift → 정사각형), 동그라미, 직선(Shift → 수평), 화살표, 살짝 클릭 버리기
        async def pick_shape(k):
            await fr.click("#stBar button[data-t=shape]")
            await fr.click(f"#stShp button[data-k={k}]")
        async def drag(ax, ay, bx, by, shift=False):
            b2 = await cv.bounding_box(); dy = b2["y"] - bb["y"]; ay += dy; by += dy
            if shift: await page.keyboard.down("Shift")
            await page.mouse.move(ax, ay); await page.mouse.down()
            for k in range(1, 9): await page.mouse.move(ax + (bx - ax) * k / 8, ay + (by - ay) * k / 8)
            await page.mouse.up()
            if shift: await page.keyboard.up("Shift")
            await page.wait_for_timeout(150)
        bx, by = bb["x"], bb["y"]
        await pick_shape("rect"); await drag(bx + 300, by + 260, bx + 420, by + 330, shift=True)
        await pick_shape("ellipse"); await drag(bx + 500, by + 260, bx + 600, by + 300, shift=True)
        await pick_shape("line"); await drag(bx + 300, by + 400, bx + 450, by + 410, shift=True)
        await pick_shape("arrow"); await drag(bx + 700, by + 300, bx + 800, by + 380)
        await pick_shape("rect"); await drag(bx + 900, by + 200, bx + 901, by + 201)   # 살짝 클릭
        await page.wait_for_timeout(500)
        st = await fr.evaluate("Object.values(STUDY.data()).flatMap(d=>d.strokes||[])")
        shapes = [s for s in st if s.get("k")]
        check("도형 4개 저장(살짝 클릭은 버림)", len(shapes) == 4, str([s["k"] for s in shapes]))
        r = next(s for s in shapes if s["k"] == "rect"); e = next(s for s in shapes if s["k"] == "ellipse"); l = next(s for s in shapes if s["k"] == "line")
        check("Shift 네모 → 정사각형", abs(abs(r["p"][2]-r["p"][0]) - abs(r["p"][3]-r["p"][1])) < 1.5)
        check("Shift 동그라미 → 정원", abs(abs(e["p"][2]-e["p"][0]) - abs(e["p"][3]-e["p"][1])) < 1.5)
        check("Shift 직선 → 수평", abs(l["p"][3]-l["p"][1]) < 1.5)
        # 지우개로 네모 테두리
        await fr.click("#stBar button[data-t=er]")
        bb = await cv.bounding_box(); bx, by = bb["x"], bb["y"]
        k = bb["width"] / 1000
        ex, ey = bx + r["p"][0] * k, by + ((r["p"][1] + r["p"][3]) / 2) * k
        await page.mouse.move(ex, ey); await page.mouse.down(); await page.mouse.move(ex + 1, ey + 1); await page.mouse.up()
        await page.wait_for_timeout(400)
        left = await fr.evaluate("Object.values(STUDY.data()).flatMap(d=>d.strokes||[]).filter(s=>s.k==='rect').length")
        check("지우개로 네모 테두리 지움", left == 0)
        await fr.evaluate("STUDY.undo()")
        await page.wait_for_timeout(300)
        back = await fr.evaluate("Object.values(STUDY.data()).flatMap(d=>d.strokes||[]).filter(s=>s.k==='rect').length")
        check("되돌리기로 복구", back == 1)
        await page.screenshot(path=str(OUT / "03_pen_shapes.png"))

        # ---- 장면 이동 후 돌아와도 필기 유지
        await fr.click("#stBar button[data-t=none]")
        await fr.click("#nextSceneBtn"); await page.wait_for_timeout(400)
        cur2 = await fr.evaluate("document.querySelector('.scene-slide.on').id")
        await fr.click("#prevSceneBtn"); await page.wait_for_timeout(400)
        cnt = await fr.evaluate("(STUDY.data()['sc1']||{strokes:[]}).strokes.length")
        check("다음 장면 → 돌아와도 필기 유지", cur2 == "sc2" and cnt >= 5, f"{cur2} {cnt}")

        # ---- 메모
        await fr.click("#stBar button:has-text('📝 메모')")
        await fr.fill("#stTa", T["josa_expect"] + " 메모 시험")
        await fr.press("#stTa", "ArrowRight")
        await page.wait_for_timeout(600)
        same = await fr.evaluate("document.querySelector('.scene-slide.on').id")
        check("메모 입력란에서 → 키를 눌러도 장면 그대로", same == "sc1")
        await fr.click("#stPanel .star")   # 중요
        await page.wait_for_timeout(500)
        check("☆ 중요 → ★ 배지", await fr.evaluate("!!document.querySelector('#sc1 > .st-mark')"))
        await page.screenshot(path=str(OUT / "04_memo.png"))
        await fr.click("#stPanel .x")
        await fr.click("#stBar button:has-text('닫기')")

        # ---- 용어 찾기: 조사 붙은 단어를 드래그 선택 → 🔍 찾아보기
        await fr.evaluate(("""()=>{ const p=[...document.querySelectorAll('#sc1 .sc-txt p')].find(p=>p.firstChild&&p.firstChild.nodeType===3&&p.firstChild.nodeValue.includes(__W__)); const t=p.firstChild; const w=__W__; const i=t.nodeValue.indexOf(w); const r=document.createRange(); r.setStart(t,i); r.setEnd(t,i+w.length+1); const s=getSelection(); s.removeAllRanges(); s.addRange(r); }""").replace("__W__", json.dumps(T["select_word"])))
        await page.wait_for_timeout(500)
        bub = await fr.evaluate("!document.getElementById('lkBub').hidden")
        check("단어 선택 시 🔍 찾아보기 버튼", bub)
        await fr.click("#lkBub")
        await page.wait_for_timeout(400)
        t = await fr.evaluate("(document.querySelector('#lkBody .lk-card .t')||{}).textContent")
        check(f"'{T['select_word']}' 선택 → 사전 '{T['select_expect']}'", t == T["select_expect"], str(t))
        await fr.evaluate("q=>LOOKUP.run(q)", T["josa_query"]); await page.wait_for_timeout(300)
        t2 = await fr.evaluate("(document.querySelector('#lkBody .lk-card .t')||{}).textContent")
        check(f"조사 붙은 단어 '{T['josa_query']}' → {T['josa_expect']}", t2 == T["josa_expect"], str(t2))
        await fr.evaluate("q=>LOOKUP.run(q)", T["abbr_query"]); await page.wait_for_timeout(300)
        t3 = await fr.evaluate("(document.querySelector('#lkBody .lk-card .t')||{}).textContent")
        check(f"약어 '{T['abbr_query']}' → {T['abbr_expect']}", t3 == T["abbr_expect"], str(t3))
        await page.screenshot(path=str(OUT / "05_lookup.png"))
        # 이 장에서 나오는 곳
        await fr.evaluate("q=>LOOKUP.run(q)", T["local_term"]); await page.wait_for_timeout(300)
        hits = await fr.evaluate("[...document.querySelectorAll('#lkBody .lk-hit:not([data-m])')].map(b=>b.dataset.i)")
        target = next((h for h in hits if h != "0"), None)
        if target:
            await fr.click(f"#lkBody .lk-hit[data-i='{target}']:not([data-m])")
            await page.wait_for_timeout(500)
            onid = await fr.evaluate("document.querySelector('.scene-slide.on').id")
            hl = await fr.evaluate("CSS.highlights.has('lk')")
            check("'이 장에서 나오는 곳' → 장면 이동 + 강조", onid == f"sc{int(target)+1}" and hl, f"{onid} hl={hl}")
        else:
            check("'이 장에서 나오는 곳' 결과", False, str(hits))
        # 메모에 넣기
        await fr.evaluate("q=>LOOKUP.run(q)", T["select_expect"]); await page.wait_for_timeout(300)
        await fr.click("#lkBody .lk-card .add"); await page.wait_for_timeout(500)
        check("뜻을 메모에 넣기", await fr.evaluate("w=>Object.values(STUDY.data()).some(d=>(d.memo||'').includes('📖 '+w))", T["select_expect"]))
        # 사전에 없는 단어
        await fr.evaluate("LOOKUP.run('바나나우유')"); await page.wait_for_timeout(300)
        none = await fr.evaluate("!!document.querySelector('#lkBody .lk-none') && !document.querySelector('#lkBody .lk-card') && document.querySelectorAll('#lkBody .lk-web a').length>=3")
        check("사전에 없는 단어 → 없다고 알리고 인터넷 찾기만", none)
        # 다른 장에서 → 포털이 2편 열기
        await fr.evaluate("q=>LOOKUP.run(q)", T["remote_term"]); await page.wait_for_timeout(900)
        rem = await fr.evaluate("[...document.querySelectorAll('#lkRemote .lk-hit')].map(b=>b.dataset.m+':'+b.dataset.i)")
        check("다른 장에서 나오는 곳", any(r.startswith(T["remote_expect_id"]) for r in rem), str(rem[:4]))
        if rem:
            m, i = rem[0].split(":")
            await fr.click(f"#lkRemote .lk-hit[data-m='{m}'][data-i='{i}']")
            await page.wait_for_timeout(1500)
            fr2 = await frame_of(page)
            await page.wait_for_timeout(900)
            st2 = await fr2.evaluate("[document.title, document.querySelector('.scene-slide.on').id, CSS.highlights.has('lk')]")
            check("다른 장 결과 → 그 편·그 장면 열고 강조", st2[1] == f"sc{int(i)+1}" and st2[2], str(st2))
            await page.screenshot(path=str(OUT / "06_remote_open.png"))

        # ---- 교수용 수정: 처음 화면에서 켜기 → 1편
        await page.click("#homeBtn"); await page.wait_for_timeout(300)
        await page.click("#profBox summary"); await page.check("#edOn")
        await page.click(".card >> nth=0")
        fr = await frame_of(page)
        await fr.click("#startSilentBtn"); await page.wait_for_timeout(800)
        check("켜면 ✏️ 수정 버튼이 보임", await fr.evaluate("!document.getElementById('edBtn').hidden"))
        await fr.click("#edBtn")
        n_cells = await fr.evaluate("document.querySelectorAll('#sc1 [data-ed]').length")
        check("장면 글 칸이 고칠 수 있게 표시됨", n_cells >= 5, f"cells={n_cells}")
        h2 = fr.locator("#sc1 h2")
        await h2.click(); await page.keyboard.press("End"); await page.keyboard.type(" (수정)")
        await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowLeft")
        await page.wait_for_timeout(700)
        check("제목 고치고 ←/→ 눌러도 장면 그대로", await fr.evaluate("document.querySelector('.scene-slide.on').id") == "sc1")
        # 굵게
        await fr.evaluate("""()=>{const p=document.querySelector('#sc1 .sc-card p'); p.focus(); const t=p.firstChild; const r=document.createRange(); r.setStart(t,0); r.setEnd(t,4); const s=getSelection(); s.removeAllRanges(); s.addRange(r);}""")
        await fr.click("#edBar button:has-text('굵게')"); await page.wait_for_timeout(600)
        check("굵게", await fr.evaluate("!!document.querySelector('#sc1 .sc-card p b')"))
        await fr.click("#edBar button:has-text('이 칸 원래대로')"); await page.wait_for_timeout(600)
        check("이 칸 원래대로", await fr.evaluate("!document.querySelector('#sc1 .sc-card p b')"))
        check("수정 중 찾아보기 버튼 안 뜸", await fr.evaluate("""()=>{const h=document.querySelector('#sc1 h2');const r=document.createRange();r.selectNodeContents(h.firstChild);const s=getSelection();s.removeAllRanges();s.addRange(r);return new Promise(ok=>setTimeout(()=>ok(document.getElementById('lkBub').hidden),400));}"""))
        await page.screenshot(path=str(OUT / "07_edit.png"))
        await fr.click("#edBar .done"); await page.wait_for_timeout(500)
        cnt_txt = await page.evaluate("document.getElementById('edCounts').textContent")
        # 다시 열어도 유지(포털 저장소)
        await page.click("#nextBtn"); await page.wait_for_timeout(300); await page.click("#prevBtn")
        fr = await frame_of(page); await page.wait_for_timeout(800)
        check("편을 다시 열어도 고친 글 유지", await fr.evaluate("document.querySelector('#sc1 h2').textContent.includes('(수정)')"))
        # 수정본 저장
        await page.click("#homeBtn"); await page.wait_for_timeout(300)
        if not await page.evaluate("document.getElementById('profBox').open"): await page.click("#profBox summary")
        async with page.expect_download() as dlinfo:
            await page.click("#edBake")
        d = await dlinfo.value
        baked = OUT / "baked.html"; await d.save_as(str(baked))
        check("수정본 파일 내려받기", baked.stat().st_size > 500000, d.suggested_filename)

        # ---- 내 노트 모아보기 + 노트 파일
        await page.click("#openNotesHome"); await page.wait_for_timeout(400)
        items = await page.evaluate("document.querySelectorAll('#notesBody .it').length")
        check("✍ 내 노트에 장별로 모임", items >= 1, f"items={items}")
        await page.click("#notesFlt button[data-f=pen]"); await page.wait_for_timeout(200)
        check("필터(펜)", await page.evaluate("document.querySelectorAll('#notesBody .it').length") >= 1)
        await page.fill("#notesQ", T["josa_expect"]); await page.wait_for_timeout(200)
        await page.click("#notesFlt button[data-f=all]")
        check("검색", await page.evaluate("document.querySelectorAll('#notesBody mark').length") >= 1)
        await page.screenshot(path=str(OUT / "08_notes.png"), full_page=True)
        async with page.expect_download() as dlinfo:
            await page.click("#notesExport")
        nd = await dlinfo.value; npath = OUT / "notes.html"; await nd.save_as(str(npath))
        nh = npath.read_text(encoding="utf-8")
        check("노트 파일에 rect/ellipse/path/polyline", all(x in nh for x in ["<rect", "<ellipse", "<path", "<polyline"]) and "이름" in nh)
        await page.fill("#notesQ", "")
        await page.click("#notesBody .go2 >> nth=0"); fr = await frame_of(page); await page.wait_for_timeout(900)
        check("노트에서 '이 장면 열기'", await fr.evaluate("!!document.querySelector('.scene-slide.on')"))

        # ---- 저장소 비운 새 브라우저로 수정본 열기
        ctx2 = await br.new_context(viewport={"width": 1366, "height": 860})
        await ctx2.route("**/*", route)
        p2 = await ctx2.new_page(); err2 = []
        p2.on("pageerror", lambda e: err2.append(str(e)))
        await p2.goto("http://127.0.0.1:8799/_test/baked.html"); await p2.wait_for_timeout(500)
        check("수정본: 처음 화면으로 열림(카드 수 = 편 수, iframe 없음)", await p2.evaluate("n=>document.querySelectorAll('.card').length===n && !document.querySelector('#stage iframe') && !document.getElementById('home').hidden", len(CFG["episodes"])))
        await p2.click(".card >> nth=0"); f2 = await frame_of(p2)
        await p2.wait_for_timeout(500)
        res = await f2.evaluate("[document.querySelector('#sc1 h2').textContent, document.querySelectorAll('[contenteditable]').length, !!window.STUDY, !!window.LOOKUP]")
        check("수정본: 새 브라우저에서도 고친 글 + contenteditable 없음 + 기능 정상", "(수정)" in res[0] and res[1] == 0 and res[2] and res[3], str(res))
        check("수정본 페이지 오류 없음", not err2, str(err2[:2]))
        await ctx2.close()

        # ---- 휴대폰 너비
        m = await br.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        await m.route("**/*", route)
        mp = await m.new_page(); merr = []
        mp.on("pageerror", lambda e: merr.append(str(e)))
        await mp.goto(f"http://127.0.0.1:8799/{urllib.parse.quote(PORTAL)}"); await mp.wait_for_timeout(400)
        await mp.screenshot(path=str(OUT / "09_m_home.png"))
        await mp.click(".card >> nth=1"); mf = await frame_of(mp)
        await mf.click("#startSilentBtn"); await mp.wait_for_timeout(1500)
        await mf.click("#stBtn"); await mp.wait_for_timeout(300)
        bar = await mf.evaluate("(()=>{const b=document.getElementById('stBar');const cs=getComputedStyle(b);return [cs.flexWrap, b.scrollWidth>b.clientWidth, b.getBoundingClientRect().height]})()")
        check("휴대폰: 필기 도구 한 줄 가로 스크롤", bar[0] == "nowrap" and bar[2] < 60, str(bar))
        await mf.click("#stBar button[data-t=shape]"); await mp.wait_for_timeout(200)
        shp = await mf.evaluate("(()=>{const r=document.getElementById('stShp').getBoundingClientRect();return [r.left,r.right,innerWidth]})()")
        check("휴대폰: 도형 고르기 창이 화면 안", shp[0] >= 0 and shp[1] <= shp[2], str(shp))
        await mf.click("#stShp button[data-k=arrow]")
        await mf.click("#stBar button:has-text('📝 메모')"); await mp.wait_for_timeout(200)
        sheet = await mf.evaluate("(()=>{const p=document.getElementById('stPanel').getBoundingClientRect(),b=document.getElementById('stBar').getBoundingClientRect();return [Math.round(p.bottom),Math.round(b.top),Math.round(p.left)]})()")
        check("휴대폰: 메모 창이 아래 시트로, 도구 막대를 가리지 않음", sheet[0] <= sheet[1] and sheet[2] <= 12, str(sheet))
        await mp.screenshot(path=str(OUT / "10_m_memo.png"))
        await mf.click("#stPanel .x"); await mf.click("#stBar button:has-text('닫기')")
        await mf.evaluate("LOOKUP.run('알칼리증')"); await mp.wait_for_timeout(300)
        lp = await mf.evaluate("(()=>{const r=document.getElementById('lkPanel').getBoundingClientRect();return [Math.round(r.bottom),innerHeight,Math.round(r.top)]})()")
        check("휴대폰: 용어 창이 아래쪽", lp[0] >= lp[1] - 12 and lp[2] > 200, str(lp))
        await mp.screenshot(path=str(OUT / "11_m_lookup.png"))
        check("휴대폰 페이지 오류 없음", not merr, str(merr[:2]))
        await m.close()

        check("페이지 오류 없음", not errors, str(errors[:3]))
        await br.close()
    srv.shutdown()
    bad = [n for n, ok in results if not ok]
    print(f"\n{len(results)-len(bad)}/{len(results)} 통과", ("실패: " + ", ".join(bad)) if bad else "")

asyncio.run(main())
