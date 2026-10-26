// ============================================================
// dashboard.js — XP system, Date object, DOM updates
// Uses: variables, functions, Date object, DOM manipulation,
//       Math object, switch statement
// ============================================================

// ── XP State ─────────────────────────────────────────────────
var xp        = 350;
var xpToLevel = 500;
var level     = 4;

// ── Update XP Display ────────────────────────────────────────
function updateXPDisplay() {
  document.getElementById('xpDisplay').textContent = xp;

  var pct = Math.min(Math.round((xp / xpToLevel) * 100), 100);
  document.getElementById('xpBar').style.width    = pct + '%';
  document.getElementById('xpLabel').textContent  = xp + ' / ' + xpToLevel + ' XP';

  // Level up check using if-else (from course)
  if (xp >= xpToLevel) {
    level++;
    xp = xp - xpToLevel;   // carry over excess XP
    xpToLevel = Math.round(xpToLevel * 1.3);  // level up threshold grows
    alert('🎉 Level Up! You are now Level ' + level + '!');
    updateXPDisplay();
  }
}

// ── Add XP function ───────────────────────────────────────────
function addXP(amount) {
  xp += amount;
  updateXPDisplay();
}

// ── Reset XP ──────────────────────────────────────────────────
function resetXP() {
  if (confirm('Reset all XP? This cannot be undone.')) {
    xp = 0;
    updateXPDisplay();
  }
}

// ── Mark lesson done ─────────────────────────────────────────
function markDone(btn, xpAmount) {
  var item = btn.parentElement;

  // Disable button (from Exp 6 pattern)
  btn.disabled          = true;
  btn.textContent       = '✅ Done';
  btn.style.background  = 'var(--muted)';
  btn.style.cursor      = 'not-allowed';

  // Strike through lesson name (DOM style update)
  var lessonName = item.querySelector('span');
  lessonName.style.textDecoration = 'line-through';
  lessonName.style.color          = 'var(--muted)';

  addXP(xpAmount);
}

// ── Date Object (from course) ─────────────────────────────────
function displayDate() {
  var now      = new Date();
  var days     = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months   = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  var dayName  = days[now.getDay()];
  var date     = now.getDate();
  var month    = months[now.getMonth()];
  var year     = now.getFullYear();

  document.getElementById('todayDate').textContent =
    dayName + ', ' + date + ' ' + month + ' ' + year;

  // switch statement for season — multiple grouped cases (from Exp 5)
  var monthNum = now.getMonth(); // 0 = Jan
  var season;
  switch (monthNum) {
    case 11:  // December
    case 0:   // January
    case 1:   // February
      season = '❄️ Winter';
      break;
    case 2:   // March
    case 3:   // April
    case 4:   // May
      season = '☀️ Summer';
      break;
    case 5:   // June
    case 6:   // July
    case 7:   // August
    case 8:   // September
      season = '🌧️ Monsoon';
      break;
    case 9:   // October
    case 10:  // November
      season = '🍂 Autumn';
      break;
    default:
      season = '';
  }

  document.getElementById('todaySeason').textContent = 'Season: ' + season;
}

// ── Fibonacci function (from Exp 5 task) ─────────────────────
function fibonacci(n) {
  var fib = [0, 1];
  for (var i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib.slice(0, n);
}

// ── Personalization from Assessment & Enrollment ─────────────
function personalizeDashboard() {
  var storedUser = localStorage.getItem('fitry_user');
  var storedAssessment = localStorage.getItem('fitry_assessment');
  var storedActiveCourse = localStorage.getItem('fitry_active_course');

  var user = null;
  var assessment = null;
  var activeCourse = null;

  if (storedUser) {
    try { user = JSON.parse(storedUser); } catch(e){}
  }
  if (storedAssessment) {
    try { assessment = JSON.parse(storedAssessment); } catch(e){}
  }
  if (storedActiveCourse) {
    try { activeCourse = JSON.parse(storedActiveCourse); } catch(e){}
  }

  // Update profile name
  if (user && user.name) {
    var nameEl = document.getElementById('profileName');
    if (nameEl) nameEl.textContent = user.name;
  }

  // Update banner & profile track
  if (assessment) {
    var banner = document.getElementById('dashAssessmentBanner');
    if (banner) {
      banner.style.display = 'flex';
      var titleEl = document.getElementById('dashBannerTitle');
      if (titleEl) titleEl.textContent = 'Target Role: ' + assessment.trackTitle;
      var currentCourse = (activeCourse && activeCourse.courseTitle) ? activeCourse.courseTitle : assessment.recommendedCourse;
      var descEl = document.getElementById('dashBannerDesc');
      if (descEl) descEl.innerHTML = 'Current Focus: <strong>' + currentCourse + '</strong> (' + assessment.matchScore + ')';
    }

    var trackEl = document.getElementById('profileTrack');
    if (trackEl) trackEl.textContent = assessment.trackTitle;

    // Tailor today's lessons according to track
    var lessonList = document.getElementById('lessonList');
    if (lessonList) {
      var lessons = [];
      if (assessment.trackKey === 'backend') {
        lessons = [
          { title: "📘 Node.js Event Loop & Architecture", xp: 15 },
          { title: "📗 Express Middleware & Routing", xp: 20 },
          { title: "📙 REST API CRUD Operations", xp: 25 }
        ];
      } else if (assessment.trackKey === 'data') {
        lessons = [
          { title: "📘 SQL Queries & Aggregations", xp: 15 },
          { title: "📗 Excel Pivot Tables & VLOOKUP", xp: 20 },
          { title: "📙 Python Pandas Data Cleaning", xp: 25 }
        ];
      } else if (assessment.trackKey === 'ml') {
        lessons = [
          { title: "📘 Python Core & OOP Review", xp: 15 },
          { title: "📗 NumPy Array Operations", xp: 20 },
          { title: "📙 Scikit-learn Linear Regression", xp: 25 }
        ];
      } else {
        lessons = [
          { title: "📘 HTML5 Semantic Structure", xp: 15 },
          { title: "📗 CSS Flexbox & Responsive Layouts", xp: 20 },
          { title: "📙 JavaScript DOM Event Handling", xp: 25 }
        ];
      }

      lessonList.innerHTML = '';
      for (var i = 0; i < lessons.length; i++) {
        var item = document.createElement('div');
        item.className = 'lesson-item';
        item.innerHTML = 
          '<span>' + lessons[i].title + '</span>' +
          '<button class="btn btn-success" style="padding:6px 16px; font-size:0.85rem;" onclick="markDone(this, ' + lessons[i].xp + ')">Mark Done (+' + lessons[i].xp + ' XP)</button>';
        lessonList.appendChild(item);
      }
    }
  }
}

// ── Initialise ────────────────────────────────────────────────
updateXPDisplay();
displayDate();
personalizeDashboard();

