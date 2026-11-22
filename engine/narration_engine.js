    /**
     * =========================================================================
     * 고도화 한국어 음성 나레이션 엔진 (포털 공통)
     * - 문장 단위 분할 재생: 긴 문장이 중간에 끊기는 크롬 문제 방지 + 문장 사이 자연스러운 쉼
     * - 읽는 문장 자막: 지금 읽는 문장과 진행 표시(●○○)
     * - 일시정지 후 재생 시 끊긴 문장부터 이어서 읽기
     * - 나레이션이 끝난 뒤 다음 장면으로 넘어가기(장면 시간보다 나레이션이 길 때 잘리지 않음)
     * - 발음 사전: CO₂·pH·Ca²⁺ 등 기호를 우리말로 읽기
     * - 포털의 [나레이션 설정](목소리·속도·높이·음량·쉼)을 실시간 반영
     * =========================================================================
     */
    const ttsManager = (() => {
      const synth = window.speechSynthesis;
      const supported = !!synth && typeof window.SpeechSynthesisUtterance === 'function';

      const DEFAULTS = {
        voiceURI: '', rate: 1.0, pitch: 1.0, volume: 1.0,
        pauseMs: 350, waitForNarration: true, showCaption: true
      };
      function settings() {
        try {
          const bridge = window.parent && window.parent !== window ? window.parent.NarrationSettings : null;
          if (bridge) return Object.assign({}, DEFAULTS, bridge.get());
        } catch (e) {}
        return DEFAULTS;
      }

      const DIGIT = '영일이삼사오육칠팔구';
      const digits = n => String(n).split('').map(d => DIGIT[d]).join('');
      // 발음 사전 (화면 표기 → 읽는 소리)
      const LEXICON = [
        [/(\d+)s\s*:\s*(\d+)s/g, '$1초 들숨, $2초 날숨'],
        [/HCO₃⁻|HCO3-/g, '중탄산 이온'],
        [/H₂CO₃|H2CO3/g, '탄산'],
        [/CO₂|CO2/g, '이산화탄소'],
        [/O₂|O2/g, '산소'],
        [/Ca²⁺|Ca2\+/g, '칼슘 이온'],
        [/Na⁺|Na\+/g, '나트륨 이온'],
        [/H⁺|H\+/g, '수소 이온'],
        [/pH\s*(\d+)\.(\d+)/g, (_, a, b) => '피에이치 ' + digits(a) + ' 점 ' + b.split('').map(digits).join(' ')],
        [/\bpH\b/g, '피에이치'],
        [/\bATP\b/g, '에이티피'],
        [/\bCSF\b/g, '뇌척수액'],
        [/\bBPM\b/g, '비피엠'],
        [/mmHg/g, '밀리미터 수은주'],
        [/→/g, ', '],
        [/·/g, ', '],
        [/↑/g, ' 증가'],
        [/↓/g, ' 감소']
      ];
      // 바꾼 낱말 끝 받침에 맞춰 바로 뒤 조사 고치기 (예: Ca²⁺가 → 칼슘 이온이)
      function batchim(word) {
        const c = word.trim().slice(-1).charCodeAt(0);
        if (c < 0xAC00 || c > 0xD7A3) return null;
        return (c - 0xAC00) % 28; // 0: 받침 없음, 8: ㄹ
      }
      const JOSA = [['이', '가'], ['은', '는'], ['을', '를'], ['과', '와'], ['으로', '로'], ['이라', '라']];
      function fixJosa(rep, rest) {
        const b = batchim(rep);
        if (b === null) return rest;
        for (const [withB, noB] of JOSA) {
          const m = rest.match(new RegExp('^(' + withB + '|' + noB + ')(?![가-힣]{2})'));
          if (m && (m[1] === withB || m[1] === noB)) {
            let pick = b === 0 ? noB : withB;
            if (withB === '으로' && b === 8) pick = '로';
            return pick + rest.slice(m[1].length);
          }
        }
        return rest;
      }
      function toSpoken(text) {
        let t = text;
        LEXICON.forEach(([re, rep]) => {
          let out = '', last = 0, m;
          re.lastIndex = 0;
          while ((m = re.exec(t)) !== null) {
            const replaced = m[0].replace(new RegExp(re.source, re.flags.replace('g', '')), rep);
            out += t.slice(last, m.index) + replaced;
            last = m.index + m[0].length;
            const rest = t.slice(last);
            const fixed = fixJosa(replaced, rest);
            if (fixed !== rest) { t = t.slice(0, last) + fixed; }
            if (m[0].length === 0) re.lastIndex++;
          }
          t = out + t.slice(last);
        });
        return t.replace(/\s{2,}/g, ' ').replace(/\s+,/g, ',').trim();
      }

      // 문장 단위 분할 (너무 긴 문장은 쉼표에서 한 번 더 나눔)
      function splitSentences(text) {
        const raw = text.replace(/\s+/g, ' ').trim().split(/(?<=[.!?。])\s+/);
        const out = [];
        raw.forEach(s => {
          if (s.length <= 90) { if (s) out.push(s); return; }
          const parts = s.split(/(?<=,)\s+/);
          let buf = '';
          parts.forEach(p => {
            if ((buf + ' ' + p).trim().length > 90 && buf) { out.push(buf.trim()); buf = p; }
            else buf = (buf + ' ' + p).trim();
          });
          if (buf) out.push(buf.trim());
        });
        return out.map(s => ({ display: s, spoken: toSpoken(s) }));
      }

      // 목소리 선택: 설정값 → 고품질(Natural/Online/Google) 한국어 → 아무 한국어
      let voices = [];
      function loadVoices() { try { voices = synth.getVoices() || []; } catch (e) { voices = []; } }
      function pickVoice() {
        const s = settings();
        if (s.voiceURI) {
          const v = voices.find(v => v.voiceURI === s.voiceURI) || voices.find(v => v.name === s.voiceURI);
          if (v) return v;
        }
        const ko = voices.filter(v => /^ko/i.test(v.lang));
        const rank = v => (/natural|online|neural/i.test(v.name) ? 4 : 0) + (/google/i.test(v.name) ? 3 : 0) +
                          (/yuna|sunhi|injoon|heami|jimin/i.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1);
        return ko.sort((a, b) => rank(b) - rank(a))[0] || null;
      }

      // 읽는 문장 자막 (현재 장면의 자막 상자 아래에 붙임)
      let captionEl = null;
      function captionHost() {
        const box = document.querySelector('.scene-slide.on .sub-box');
        return box || (dom.subtitleText ? dom.subtitleText.parentElement : null);
      }
      function ensureCaption() {
        const host = captionHost();
        if (!host) return null;
        if (!captionEl) {
          captionEl = document.createElement('div');
          captionEl.className = 'narr-caption';
          captionEl.setAttribute('aria-live', 'polite');
          captionEl.setAttribute('data-noedit', '');
          captionEl.style.cssText = 'margin-top:8px;padding-top:7px;border-top:1px solid rgba(148,163,184,0.18);' +
            'font-size:12.5px;line-height:1.55;color:#FDE68A;display:none;align-items:flex-start;gap:8px;justify-content:center;text-align:left;';
        }
        if (captionEl.parentElement !== host) host.appendChild(captionEl);
        return captionEl;
      }
      function showCaption(i) {
        const el = ensureCaption();
        if (!el) return;
        if (!settings().showCaption) { el.style.display = 'none'; return; }
        const pips = queue.map((_, k) => `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:3px;background:${k < i ? '#FBBF24' : k === i ? '#FDE68A' : '#334155'}"></span>`).join('');
        el.innerHTML = `<span style="flex:0 0 auto;font-weight:700;color:#FBBF24">🔊</span>` +
          `<span style="flex:1 1 auto">${queue[i].display}<span style="display:block;margin-top:4px">${pips}</span></span>`;
        el.style.display = 'flex';
      }
      function hideCaption() { if (captionEl) captionEl.style.display = 'none'; }

      function setStatus(text, dotClass) {
        if (dom.ttsStatusText) dom.ttsStatusText.textContent = text;
        if (dom.ttsIndicatorDot && dotClass) dom.ttsIndicatorDot.className = 'w-2 h-2 rounded-full ' + dotClass;
      }

      // 재생 상태
      let queue = [];
      let idx = 0;
      let token = 0;
      let speaking = false;
      let finished = false;
      let resumeAt = null;
      let currentText = '';
      let endedAt = 0;
      let startedAt = 0;
      let watchdog = null;

      function clearWatchdog() { if (watchdog) { clearTimeout(watchdog); watchdog = null; } }

      function speakFrom(i, myToken) {
        if (myToken !== token) return;
        clearWatchdog();
        if (i >= queue.length) {
          speaking = false; finished = true; resumeAt = null; endedAt = performance.now();
          setStatus('나레이션 완료', 'bg-emerald-400');
          setTimeout(() => { if (myToken === token) hideCaption(); }, 1600);
          return;
        }
        idx = i;
        const s = settings();
        const item = queue[i];
        const u = new SpeechSynthesisUtterance(item.spoken);
        const v = pickVoice();
        if (v) u.voice = v;
        u.lang = (v && v.lang) || 'ko-KR';
        u.rate = s.rate; u.pitch = s.pitch; u.volume = s.volume;

        let advanced = false;
        const next = () => {
          if (advanced || myToken !== token) return;
          advanced = true;
          clearWatchdog();
          setTimeout(() => speakFrom(i + 1, myToken), Math.max(0, s.pauseMs));
        };
        u.onstart = () => {
          if (myToken !== token) return;
          setStatus(`나레이션 ${i + 1}/${queue.length}`, 'bg-amber-400 animate-ping');
          showCaption(i);
        };
        u.onend = next;
        u.onerror = (e) => {
          if (e && (e.error === 'interrupted' || e.error === 'canceled')) return;
          next();
        };
        // 크롬에서 onend가 오지 않는 경우를 대비한 안전장치
        const estMs = (item.spoken.length * 160) / Math.max(0.5, s.rate) + 4000;
        watchdog = setTimeout(() => { if (myToken === token && idx === i) { try { synth.cancel(); } catch (e) {} next(); } }, estMs);

        try { synth.resume(); } catch (e) {}
        showCaption(i);
        synth.speak(u);
      }

      return {
        supported,

        init() {
          if (!supported) { setStatus('음성 미지원 (자막 모드)'); return; }
          loadVoices();
          try { synth.onvoiceschanged = loadVoices; } catch (e) {}
        },

        speak(text) {
          if (!supported || state.isMuted || !state.hasStarted) return;
          if (text === currentText && (speaking || finished)) return; // 이미 읽는 중이거나 다 읽은 문장은 다시 시작하지 않음

          let startIdx = 0;
          if (text === currentText && resumeAt !== null) {
            startIdx = resumeAt;             // 일시정지했던 문장부터 이어서
          } else {
            currentText = text;
            queue = splitSentences(text);
          }
          resumeAt = null;
          finished = false;
          token++;
          clearWatchdog();
          try { synth.cancel(); } catch (e) {}
          speaking = true;
          startedAt = performance.now();
          endedAt = 0;
          const myToken = token;
          setTimeout(() => speakFrom(startIdx, myToken), 60);
        },

        stop() {
          if (!supported) return;
          token++;
          clearWatchdog();
          if (speaking) resumeAt = idx;
          speaking = false;
          try { synth.cancel(); } catch (e) {}
          hideCaption();
          setStatus(state.isMuted ? '음소거됨' : '일시정지됨', 'bg-slate-500');
        },

        // [다시 듣기]: 처음 문장부터 새로 읽기
        reset() {
          currentText = '';
          resumeAt = null;
          finished = false;
        },

        // 다음 장면으로 넘어가도 되는지 (나레이션이 끝나고 잠시 여유를 둔 뒤)
        canAdvance() {
          const s = settings();
          if (!s.waitForNarration || !supported || state.isMuted || !state.isPlaying) return true;
          if (speaking) return performance.now() - startedAt > 90000; // 비정상적으로 길면 강제 진행
          if (endedAt === 0) return true;
          return performance.now() - endedAt > 1200;
        }
      };
    })();
