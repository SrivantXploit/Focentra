/* ═══════════════════════════════════════════════════════════════════
   StudyPilot Premium Enhancements — iQOO Hackathon
   ═══════════════════════════════════════════════════════════════════
   Injects UI elements ON TOP of existing React app.
   DOES NOT modify any existing DOM, logic, routing, or data.
   Only ADDS new visual elements and micro-interactions.
   ═══════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Wait for React app to mount
  function waitForApp(cb, maxWait) {
    maxWait = maxWait || 8000;
    var start = Date.now();
    function check() {
      var root = document.getElementById('root');
      if (root && root.children.length > 0) {
        setTimeout(cb, 300);
      } else if (Date.now() - start < maxWait) {
        requestAnimationFrame(check);
      }
    }
    check();
  }

  // ─── Floating Gradient Blobs ───────────────────────────────────
  function createBlobs() {
    var blobs = [
      { w: 400, h: 400, bg: 'rgba(124,77,255,0.05)', top: '10%', left: '5%', dur: '18s' },
      { w: 300, h: 300, bg: 'rgba(6,182,212,0.04)', top: '60%', left: '75%', dur: '22s' },
      { w: 250, h: 250, bg: 'rgba(79,140,255,0.035)', top: '30%', left: '60%', dur: '25s' }
    ];
    blobs.forEach(function(b) {
      var el = document.createElement('div');
      el.className = 'sp-blob';
      el.style.cssText = 'width:'+b.w+'px;height:'+b.h+'px;background:'+b.bg+';top:'+b.top+';left:'+b.left+';animation-duration:'+b.dur+';';
      document.body.appendChild(el);
    });
  }

  // ─── Floating Particles ───────────────────────────────────────
  function createParticles() {
    for (var i = 0; i < 15; i++) {
      var p = document.createElement('div');
      p.className = 'sp-particle';
      var size = 2 + Math.random() * 3;
      var left = Math.random() * 100;
      var dur = 12 + Math.random() * 18;
      var delay = Math.random() * 15;
      var hue = Math.random() > 0.5 ? '124,77,255' : '6,182,212';
      p.style.cssText = 'width:'+size+'px;height:'+size+'px;left:'+left+'%;background:rgba('+hue+',0.5);animation-duration:'+dur+'s;animation-delay:'+delay+'s;';
      document.body.appendChild(p);
    }
  }

  // ─── Notification Bell ─────────────────────────────────────────
  function createNotificationBell() {
    // Remove any previously injected sidebar bell
    var stale = document.querySelectorAll('.sp-notif-bell');
    stale.forEach(function(el) { el.remove(); });

    // Find the EXISTING notification button in the top-right navbar
    var existingBtn = document.querySelector('button[aria-label="View Notifications"]') ||
                      document.querySelector('header button:has(.bg-rose-500), header button:has(.bg-red-500)') ||
                      document.querySelector('.top-navbar button, header button');
    if (!existingBtn) return;

    // If we already enhanced it, skip
    if (existingBtn.dataset.spEnhanced === 'true') return;
    existingBtn.dataset.spEnhanced = 'true';

    // Style the existing button to ensure visibility
    existingBtn.style.position = 'relative';
    existingBtn.style.borderRadius = '12px';
    existingBtn.style.color = '#ffffff';
    existingBtn.style.opacity = '1';

    // Inject bell SVG icon if missing (the button has badge but no icon)
    var hasSvg = existingBtn.querySelector('svg');
    if (!hasSvg) {
      var bellSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      bellSvg.setAttribute('width', '20');
      bellSvg.setAttribute('height', '20');
      bellSvg.setAttribute('viewBox', '0 0 24 24');
      bellSvg.setAttribute('fill', 'none');
      bellSvg.setAttribute('stroke', '#ffffff');
      bellSvg.setAttribute('stroke-width', '2');
      bellSvg.setAttribute('stroke-linecap', 'round');
      bellSvg.setAttribute('stroke-linejoin', 'round');
      bellSvg.setAttribute('class', 'lucide lucide-bell');
      bellSvg.style.cssText = 'width:20px;height:20px;color:#ffffff;stroke:#ffffff;display:inline-block;vertical-align:middle;';
      bellSvg.innerHTML = '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>';
      existingBtn.insertBefore(bellSvg, existingBtn.firstChild);
    }

    // Build the notification dropdown and attach to the existing button
    if (existingBtn.querySelector('.sp-notif-dropdown')) return;

    var dropdown = document.createElement('div');
    dropdown.className = 'sp-notif-dropdown';
    var notifications = [
      { icon: '🔴', bg: 'rgba(244,63,94,0.12)', title: 'DSP Exam Tomorrow!', time: '2 hours ago' },
      { icon: '✅', bg: 'rgba(16,185,129,0.12)', title: 'Unit 3 Revision Completed', time: '4 hours ago' },
      { icon: '🔥', bg: 'rgba(245,158,11,0.12)', title: 'Study Streak: 4 Days!', time: '5 hours ago' },
      { icon: '🤖', bg: 'rgba(124,77,255,0.12)', title: 'AI generated a new study plan', time: '6 hours ago' }
    ];

    var dropdownHTML = '<div style="padding:12px 14px 8px;font-size:13px;font-weight:700;color:#e2e8f0;display:flex;justify-content:space-between;align-items:center;">Notifications <span style="font-size:11px;color:#64748b;font-weight:500;cursor:pointer;">Mark all read</span></div>';
    notifications.forEach(function(n) {
      dropdownHTML += '<div class="sp-notif-item"><div class="sp-notif-icon" style="background:'+n.bg+'">'+n.icon+'</div><div class="sp-notif-text"><div class="sp-notif-title">'+n.title+'</div><div class="sp-notif-time">'+n.time+'</div></div></div>';
    });
    dropdown.innerHTML = dropdownHTML;
    existingBtn.appendChild(dropdown);

    existingBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', function() {
      dropdown.classList.remove('open');
    });
  }

  // ─── AI Mission Control ────────────────────────────────────────
  function createMissionControl() {
    // Only inject on Dashboard
    var contentBody = document.querySelector('.content-body');
    if (!contentBody) return;

    // Check if we're on the dashboard by looking for dashboard indicators
    var firstChild = contentBody.children[0];
    if (!firstChild) return;

    // Check if mission control already injected
    if (document.querySelector('.sp-mission-control')) return;

    var now = new Date();
    var hour = now.getHours();
    var greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    var dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    var mc = document.createElement('div');
    mc.className = 'sp-mission-control';
    mc.innerHTML =
      '<div class="sp-mc-header">' +
        '<div class="sp-mc-avatar">🧠</div>' +
        '<div>' +
          '<div class="sp-mc-greeting">Good day, Srivant <span class="sp-wave">👋</span></div>' +
          '<div class="sp-mc-sub">AI Mission Control · ' + dateStr + ' · Semester 6</div>' +
        '</div>' +
      '</div>' +
      '<div class="sp-mc-stats">' +
        '<div class="sp-mc-stat"><div class="sp-mc-stat-value" style="color:#7C4DFF">87<span style="font-size:14px;color:#64748b">%</span></div><div class="sp-mc-stat-label">Productivity</div></div>' +
        '<div class="sp-mc-stat"><div class="sp-mc-stat-value" style="color:#06B6D4">92<span style="font-size:14px;color:#64748b">%</span></div><div class="sp-mc-stat-label">AI Confidence</div></div>' +
        '<div class="sp-mc-stat"><div class="sp-mc-stat-value" style="color:#f59e0b">🔥 4</div><div class="sp-mc-stat-label">Day Streak</div></div>' +
        '<div class="sp-mc-stat"><div class="sp-mc-stat-value" style="color:#10b981">6<span style="font-size:14px;color:#64748b">hrs</span></div><div class="sp-mc-stat-label">Daily Target</div></div>' +
      '</div>' +
      '<div class="sp-mc-actions">' +
        '<button class="sp-mc-action primary" id="btn-study-now">⚡ What Should I Study Now?</button>' +
        '<button class="sp-mc-action secondary" id="btn-generate-plan">📅 Generate Today\'s Plan</button>' +
        '<button class="sp-mc-action secondary" id="btn-focus-session">🎯 Start Focus Session</button>' +
      '</div>';

    contentBody.insertBefore(mc, firstChild);

    // Attach click listeners to AI buttons
    var btnStudyNow = mc.querySelector('#btn-study-now');
    var btnPlan = mc.querySelector('#btn-generate-plan');
    var btnFocus = mc.querySelector('#btn-focus-session');

    if (btnStudyNow) btnStudyNow.addEventListener('click', openStudyNowModal);
    if (btnPlan) btnPlan.addEventListener('click', openGeneratePlanModal);
    if (btnFocus) btnFocus.addEventListener('click', openFocusSessionModal);
  }

  // ─── Ripple Effect on Buttons ──────────────────────────────────
  function addRippleEffect() {
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('button, .btn, [role="button"]');
      if (!btn) return;

      // Don't add to notification bell
      if (btn.closest('.sp-notif-bell') || btn.closest('.sp-notif-dropdown')) return;

      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'sp-ripple';
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';

      // Ensure parent has relative positioning for ripple
      var pos = getComputedStyle(btn).position;
      if (pos === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';

      btn.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 700);
    });
  }

  // ─── Scroll Reveal ─────────────────────────────────────────────
  function setupScrollReveal() {
    // We'll observe content body cards for scroll reveal
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Observe sp-cards that are deeper in the page
    function observeCards() {
      var cards = document.querySelectorAll('.sp-card:not(.sp-reveal):not(.visible)');
      cards.forEach(function(card, i) {
        if (card.getBoundingClientRect().top > window.innerHeight * 0.6) {
          card.classList.add('sp-reveal');
          card.style.transitionDelay = (i * 0.04) + 's';
          observer.observe(card);
        }
      });
    }

    observeCards();
    // Re-observe on navigation changes
    var mo = new MutationObserver(function() {
      setTimeout(observeCards, 200);
    });
    var contentBody = document.querySelector('.content-body');
    if (contentBody) {
      mo.observe(contentBody, { childList: true, subtree: false });
    }
  }

  // ─── Track Navigation Changes ─────────────────────────────────
  function onNavChange(callback) {
    var contentBody = document.querySelector('.content-body');
    if (!contentBody) return;

    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          setTimeout(callback, 200);
          break;
        }
      }
    });

    observer.observe(contentBody, { childList: true });
  }

  // ─── Handle Dashboard Detection ────────────────────────────────
  function isDashboard() {
    var cb = document.querySelector('.content-body');
    if (!cb) return false;
    var text = cb.textContent || '';
    return (text.indexOf('StudyPilot') > -1 && text.indexOf('Dashboard') > -1) ||
           (text.indexOf('Overall Progress') > -1) ||
           (text.indexOf('Study Streak') > -1 && text.indexOf('Next Exam') > -1);
  }

  function handleNavigation() {
    // Remove mission control if not on dashboard
    var mc = document.querySelector('.sp-mission-control');
    if (mc && !isDashboard()) {
      mc.remove();
    }
    // Add mission control if on dashboard
    if (!mc && isDashboard()) {
      createMissionControl();
    }
    // Re-check notification bell
    createNotificationBell();
  }

  // ─── Animated Counters ─────────────────────────────────────────
  function animateCounters() {
    var statValues = document.querySelectorAll('.sp-mc-stat-value');
    statValues.forEach(function(el) {
      var text = el.textContent.trim();
      var match = text.match(/(\d+)/);
      if (!match) return;
      var target = parseInt(match[1], 10);
      if (el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';

      var current = 0;
      var duration = 1200;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out
        var eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);
        el.innerHTML = text.replace(/\d+/, current);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    });
  }

  // ─── Offline AI Recommendation Engine ───────────────────────────
  window.StudyPilotAI = {
    getRecommendations: function() {
      var subjects = [
        { name: 'Digital Signal Processing', code: 'DSP', progress: 45, examDays: 1, difficulty: 5 },
        { name: 'VLSI Design', code: 'VLSI', progress: 60, examDays: 3, difficulty: 4 },
        { name: 'Computer Networks', code: 'CN', progress: 75, examDays: 7, difficulty: 3 },
        { name: 'Embedded Systems', code: 'ES', progress: 80, examDays: 12, difficulty: 3 }
      ];
      var ranked = subjects.map(function(s) {
        var score = Math.round(((100 - s.progress) * s.difficulty) / Math.max(1, s.examDays));
        return { subject: s, score: score };
      }).sort(function(a, b) { return b.score - a.score; });
      var top = ranked[0].subject;
      return {
        topSubject: top.name,
        code: top.code,
        urgency: 'HIGH (Exam in ' + top.examDays + ' day' + (top.examDays > 1 ? 's' : '') + ')',
        progress: top.progress + '%',
        recommendedTopic: 'Unit 3: Fast Fourier Transform (FFT) & Spectral Analysis',
        aiConfidence: '94%',
        estDuration: '45 mins',
        ranked: ranked
      };
    },
    generateDailyPlan: function() {
      var rec = this.getRecommendations();
      return [
        { time: '09:00 - 10:15 AM', subject: rec.topSubject, topic: rec.recommendedTopic, tag: 'HIGH PRIORITY', color: '#7C4DFF' },
        { time: '10:30 - 11:45 AM', subject: 'VLSI Design', topic: 'CMOS Inverter Dynamics & Propagation Delay', tag: 'CORE FOCUS', color: '#06B6D4' },
        { time: '02:00 - 03:00 PM', subject: 'Computer Networks', topic: 'TCP/IP Flow Control & Congestion Mitigation', tag: 'PRACTICE', color: '#4F8CFF' },
        { time: '04:15 - 04:45 PM', subject: 'AI Study Coach', topic: 'Feynman Explanation Mode & Quick Review', tag: 'ACTIVE RECALL', color: '#10b981' }
      ];
    }
  };

  // ─── Lightweight Modal Overlay Generator ────────────────────────
  function createModalOverlay(title, bodyHTML) {
    var existing = document.querySelector('.sp-modal-backdrop');
    if (existing) existing.remove();

    var backdrop = document.createElement('div');
    backdrop.className = 'sp-modal-backdrop';
    backdrop.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(5,8,22,0.75);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:20px;animation:spFadeIn 0.25s ease;';

    var modal = document.createElement('div');
    modal.className = 'sp-modal-content';
    modal.style.cssText = 'background:rgba(17,24,39,0.92);border:1px solid rgba(124,77,255,0.3);border-radius:24px;width:100%;max-width:540px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(124,77,255,0.2);color:#f8fafc;position:relative;animation:spSlideUp 0.3s cubic-bezier(0.16,1,0.3,1);';

    modal.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">' +
        '<h3 style="margin:0;font-size:20px;font-weight:700;background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">' + title + '</h3>' +
        '<button class="sp-modal-close" style="background:rgba(255,255,255,0.08);border:none;color:#94a3b8;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;">✕</button>' +
      '</div>' +
      '<div>' + bodyHTML + '</div>';

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    var closeBtn = modal.querySelector('.sp-modal-close');
    closeBtn.addEventListener('click', function() { backdrop.remove(); });
    backdrop.addEventListener('click', function(e) { if (e.target === backdrop) backdrop.remove(); });
  }

  function openStudyNowModal() {
    var rec = window.StudyPilotAI.getRecommendations();
    var html =
      '<div style="background:rgba(124,77,255,0.08);border:1px solid rgba(124,77,255,0.2);border-radius:16px;padding:16px;margin-bottom:16px;">' +
        '<div style="font-size:12px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">🎯 Recommended Target</div>' +
        '<div style="font-size:18px;font-weight:700;color:#fff;margin-bottom:4px;">' + rec.topSubject + '</div>' +
        '<div style="font-size:13px;color:#94a3b8;">' + rec.recommendedTopic + '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">' +
        '<div style="background:rgba(255,255,255,0.04);padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">' +
          '<div style="font-size:11px;color:#64748b;">Urgency Level</div>' +
          '<div style="font-size:13px;font-weight:700;color:#f43f5e;">' + rec.urgency + '</div>' +
        '</div>' +
        '<div style="background:rgba(255,255,255,0.04);padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">' +
          '<div style="font-size:11px;color:#64748b;">AI Confidence</div>' +
          '<div style="font-size:13px;font-weight:700;color:#10b981;">' + rec.aiConfidence + '</div>' +
        '</div>' +
      '</div>' +
      '<button onclick="this.closest(\'.sp-modal-backdrop\').remove()" style="width:100%;padding:14px;background:linear-gradient(135deg,#7C4DFF,#4F8CFF);border:none;border-radius:14px;color:#fff;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 8px 20px rgba(124,77,255,0.3);transition:all 0.2s;">🚀 Start 45-Min Focused Session</button>';
    createModalOverlay('⚡ What Should I Study Now?', html);
  }

  function openGeneratePlanModal() {
    var plan = window.StudyPilotAI.generateDailyPlan();
    var listHTML = plan.map(function(item) {
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:rgba(255,255,255,0.04);border-radius:12px;margin-bottom:8px;border-left:4px solid ' + item.color + ';">' +
        '<div>' +
          '<div style="font-size:13px;font-weight:700;color:#fff;">' + item.subject + '</div>' +
          '<div style="font-size:11px;color:#94a3b8;">' + item.topic + '</div>' +
        '</div>' +
        '<div style="text-align:right;">' +
          '<div style="font-size:11px;font-weight:700;color:' + item.color + ';">' + item.tag + '</div>' +
          '<div style="font-size:11px;color:#64748b;">' + item.time + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    var html = listHTML +
      '<button onclick="this.closest(\'.sp-modal-backdrop\').remove()" style="width:100%;margin-top:16px;padding:14px;background:linear-gradient(135deg,#06B6D4,#4F8CFF);border:none;border-radius:14px;color:#fff;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 8px 20px rgba(6,182,212,0.3);">📅 Apply Today\'s AI Plan</button>';
    createModalOverlay('📅 Today\'s AI Recommended Schedule', html);
  }

  function openFocusSessionModal() {
    var html =
      '<div style="text-align:center;padding:10px 0 20px;">' +
        '<div style="font-size:48px;font-weight:800;letter-spacing:2px;color:#fff;font-family:monospace;margin-bottom:8px;">25:00</div>' +
        '<div style="font-size:13px;color:#06B6D4;font-weight:600;margin-bottom:20px;">Pomodoro Focus Mode · Digital Signal Processing</div>' +
        '<div style="display:flex;gap:12px;justify-content:center;">' +
          '<button onclick="this.textContent = this.textContent === \'⏸ Pause\' ? \'▶ Resume\' : \'⏸ Pause\'" style="padding:12px 28px;background:linear-gradient(135deg,#7C4DFF,#5B5CFF);border:none;border-radius:12px;color:#fff;font-weight:700;cursor:pointer;">⏸ Pause</button>' +
          '<button onclick="this.closest(\'.sp-modal-backdrop\').remove()" style="padding:12px 28px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:#cbd5e1;font-weight:600;cursor:pointer;">End Session</button>' +
        '</div>' +
      '</div>';
    createModalOverlay('🎯 Active Focus Session', html);
  }

  // ─── AI Study Coach Reconnection ─────────────────────────────────
  function setupAICoachHandlers() {
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('button, .sp-coach-btn, [data-action]');
      if (!btn) return;
      var text = (btn.textContent || '').trim();

      if (text.indexOf('AI Mock Test') > -1) {
        var input = document.querySelector('textarea, input[placeholder*="Ask"], input[placeholder*="coach"]');
        if (input) {
          input.value = 'Generate a 5-question AI Mock Test on Digital Signal Processing Unit 3.';
          input.focus();
        } else {
          openStudyNowModal();
        }
      } else if (text.indexOf('Feynman Mode') > -1) {
        var inputFey = document.querySelector('textarea, input[placeholder*="Ask"], input[placeholder*="coach"]');
        if (inputFey) {
          inputFey.value = 'Explain Fast Fourier Transform using the Feynman Technique (simple terms & everyday analogy).';
          inputFey.focus();
        }
      } else if (text.indexOf('Brain Break') > -1) {
        openFocusSessionModal();
      }
    });
  }

  // ─── Init Everything ───────────────────────────────────────────
  waitForApp(function() {
    createBlobs();
    createParticles();
    createNotificationBell();
    setupAICoachHandlers();

    if (isDashboard()) {
      createMissionControl();
    }

    addRippleEffect();
    setupScrollReveal();
    animateCounters();

    onNavChange(handleNavigation);

    // Periodically re-check for notification bell (in case header re-renders)
    setInterval(function() {
      var btn = document.querySelector('button[aria-label="View Notifications"]');
      if (btn && btn.dataset.spEnhanced !== 'true') {
        createNotificationBell();
      }
    }, 3000);
  });

})();
