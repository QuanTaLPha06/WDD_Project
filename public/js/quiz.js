// ============================================================
// quiz.js — Onboarding Career Decision Quiz (8 Questions) + MCQ
// Matches exact question bank, tags, trackMap, and computeResult
// ============================================================

// ─────────────────────────────────────────────────────────────
// 1. ONBOARDING CAREER DECISION QUESTION BANK & TRACK MAP
// ─────────────────────────────────────────────────────────────

var questions = [
  {
    id: 1,
    question: "When you encounter a problem you've never seen before, what's your first instinct?",
    options: [
      { label: "Break it into small logical steps", tags: { systems: 2, logic: 2 } },
      { label: "Look for patterns from things I already know", tags: { analytical: 2, data: 1 } },
      { label: "Visualize the end result first", tags: { creative: 2, web: 2 } },
      { label: "Try something and see what happens", tags: { creative: 1, web: 1, mobile: 1 } },
    ]
  },
  {
    id: 2,
    question: "Which of these excites you the most?",
    options: [
      { label: "Building apps people can actually see and use", tags: { web: 3, mobile: 2 } },
      { label: "Making machines learn from data", tags: { data: 3, ai: 3 } },
      { label: "Keeping systems secure from attackers", tags: { security: 3, systems: 1 } },
      { label: "Optimizing code that runs fast and efficiently", tags: { systems: 3, logic: 2 } },
    ]
  },
  {
    id: 3,
    question: "How do you feel about ambiguity — situations with no clear right answer?",
    options: [
      { label: "I love it. Exploring possibilities is fun.", tags: { creative: 2, data: 1 } },
      { label: "I'm okay with it but prefer structure eventually", tags: { web: 1, analytical: 2 } },
      { label: "I prefer clear rules and well-defined problems", tags: { systems: 2, logic: 3 } },
      { label: "I'll work through it if the goal is clear", tags: { mobile: 1, web: 1 } },
    ]
  },
  {
    id: 4,
    question: "Pick the project that sounds most interesting to you:",
    options: [
      { label: "A website that adapts to each user's personality", tags: { web: 3, creative: 2 } },
      { label: "A model that predicts stock prices", tags: { data: 3, ai: 2, analytical: 2 } },
      { label: "An app that tracks fitness goals", tags: { mobile: 3, web: 1 } },
      { label: "A program that cracks encrypted messages", tags: { security: 3, logic: 2 } },
    ]
  },
  {
    id: 5,
    question: "What kind of feedback motivates you most?",
    options: [
      { label: "Seeing something I built actually work", tags: { web: 2, mobile: 2 } },
      { label: "Numbers improving — accuracy, speed, efficiency", tags: { data: 2, systems: 2, analytical: 2 } },
      { label: "People telling me my work helped them", tags: { web: 1, mobile: 2, creative: 1 } },
      { label: "Solving something nobody else could figure out", tags: { security: 2, logic: 2 } },
    ]
  },
  {
    id: 6,
    question: "How do you feel about math and statistics?",
    options: [
      { label: "Love it — give me formulas and graphs", tags: { data: 3, ai: 2, analytical: 3 } },
      { label: "Fine with it when it serves a purpose", tags: { systems: 1, security: 1 } },
      { label: "I prefer logic over numbers", tags: { logic: 3, systems: 2 } },
      { label: "I try to avoid heavy math", tags: { web: 2, mobile: 2, creative: 2 } },
    ]
  },
  {
    id: 7,
    question: "Which describes how you prefer to work?",
    options: [
      { label: "Deep focus on one complex thing for hours", tags: { systems: 2, data: 1, logic: 2 } },
      { label: "Switching between tasks and experimenting", tags: { creative: 2, web: 1 } },
      { label: "Collaborating and building for an audience", tags: { web: 2, mobile: 2 } },
      { label: "Methodically following a process", tags: { security: 2, analytical: 2 } },
    ]
  },
  {
    id: 8,
    question: "If you had to choose a superpower, which fits you?",
    options: [
      { label: "X-ray vision — seeing hidden patterns in chaos", tags: { data: 3, ai: 2 } },
      { label: "Architect's eye — designing perfect structures", tags: { systems: 3, logic: 2 } },
      { label: "Artist's touch — making anything beautiful and usable", tags: { creative: 3, web: 3 } },
      { label: "Hacker's mind — finding flaws before anyone else", tags: { security: 3 } },
    ]
  },
];

var trackMap = {
  web:        { key: 'web',        roleKey: 'frontend', label: 'Web Development',           lang: 'HTML/CSS, JS, React',             why: 'You think visually and love building things people interact with.', startingCourse: 'HTML & CSS Fundamentals', courseTrack: 'web' },
  mobile:     { key: 'mobile',     roleKey: 'frontend', label: 'Mobile Development',         lang: 'React Native (iOS/Android)',      why: 'You want to build for people on the go and love hands-on usability.', startingCourse: 'JavaScript DOM & Events', courseTrack: 'web' },
  data:       { key: 'data',       roleKey: 'data',     label: 'Data Science & Analysis',    lang: 'Python, Pandas, SQL',             why: 'You love patterns, numbers, and finding meaning in information.', startingCourse: 'Data Analytics Intro', courseTrack: 'data' },
  ai:         { key: 'ai',         roleKey: 'ml',       label: 'Artificial Intelligence',    lang: 'Python, ML Foundations',          why: 'You want to build intelligent systems that learn and adapt.', startingCourse: 'Machine Learning Basics', courseTrack: 'ml' },
  security:   { key: 'security',   roleKey: 'backend',  label: 'Cybersecurity',              lang: 'Python, Linux, Security Basics',  why: 'You think like an attacker, love puzzles, and want to protect systems.', startingCourse: 'Python Basics', courseTrack: 'py' },
  systems:    { key: 'systems',    roleKey: 'backend',  label: 'Systems & Backend',          lang: 'C++, Go, Java',                   why: 'You love performance, efficiency, and the engine under the hood.', startingCourse: 'Node.js & Express APIs', courseTrack: 'web' },
  logic:      { key: 'logic',      roleKey: 'backend',  label: 'Algorithms & CP',            lang: 'C++, Java, Algorithms',           why: 'You are drawn to pure problem-solving and elegant logic.', startingCourse: 'Python Basics', courseTrack: 'py' },
  analytical: { key: 'analytical', roleKey: 'data',     label: 'Data & Databases',           lang: 'SQL, Database Design',            why: 'You love structured systems that process and move data at scale.', startingCourse: 'Data Analytics Intro', courseTrack: 'data' },
  creative:   { key: 'creative',   roleKey: 'frontend', label: 'UI/UX Engineering',          lang: 'Design + React.js',               why: 'Design and code intersect for you — you make technology feel human.', startingCourse: 'HTML & CSS Fundamentals', courseTrack: 'web' },
};

function computeResult(answers) {
  var scores = {};
  answers.forEach(function(ans) {
    if (ans && ans.tags) {
      Object.entries(ans.tags).forEach(function(entry) {
        var tag = entry[0];
        var val = entry[1];
        scores[tag] = (scores[tag] || 0) + val;
      });
    }
  });
  var sorted = Object.entries(scores).sort(function(a, b) {
    return b[1] - a[1];
  });
  return sorted.slice(0, 2).map(function(item) {
    var tag = item[0];
    return trackMap[tag] || trackMap.web;
  });
}

// ─────────────────────────────────────────────────────────────
// 2. ONBOARDING QUIZ STATE & CONTROLLERS
// ─────────────────────────────────────────────────────────────

var currentQIndex = 0;
var quizAnswers   = [];
var currentSelectedOption = null;
var computedTracksResult = null;

// Start Quiz (Intro → Question 1)
function startOnboardingQuiz() {
  document.getElementById('quizIntroView').classList.add('hidden');
  document.getElementById('quizQuestionsView').classList.remove('hidden');
  document.getElementById('quizResultView').classList.add('hidden');

  currentQIndex = 0;
  quizAnswers   = [];
  currentSelectedOption = null;
  loadOnboardingQuestion();
}

// Skip Quiz
function skipOnboardingQuiz() {
  var storedUser = localStorage.getItem('fitry_user');
  if (storedUser) {
    try {
      var user = JSON.parse(storedUser);
      user.quizSkipped = true;
      localStorage.setItem('fitry_user', JSON.stringify(user));
    } catch(e){}
  }
  window.location.href = 'dashboard.html';
}

// Load Question into DOM
function loadOnboardingQuestion() {
  var q = questions[currentQIndex];
  var total = questions.length;

  // Header & Progress
  document.getElementById('quizCounterText').textContent = (currentQIndex + 1) + ' / ' + total;
  var pct = Math.round(((currentQIndex) / total) * 100);
  document.getElementById('quizProgressFill').style.width = pct + '%';

  // Question Text
  document.getElementById('quizQuestionText').textContent = q.question;

  // Back Button
  var backBtn = document.getElementById('quizBackBtn');
  if (currentQIndex > 0) {
    backBtn.style.visibility = 'visible';
  } else {
    backBtn.style.visibility = 'hidden';
  }

  // Next Button Label & State
  var nextBtn = document.getElementById('quizNextBtn');
  if (currentQIndex + 1 === total) {
    nextBtn.innerHTML = 'See My Path <span>→</span>';
  } else {
    nextBtn.innerHTML = 'Next <span>→</span>';
  }

  // Check if previously selected (when going Back)
  var prevAns = quizAnswers[currentQIndex];
  currentSelectedOption = prevAns || null;
  updateNextButtonState();

  // Render Options
  var container = document.getElementById('quizOptionsContainer');
  container.innerHTML = '';

  for (var i = 0; i < q.options.length; i++) {
    var opt = q.options[i];
    var letter = String.fromCharCode(65 + i);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option' + (currentSelectedOption === opt ? ' selected' : '');
    btn.setAttribute('data-idx', i);

    btn.innerHTML = 
      '<span class="option-letter">' + letter + '</span>' +
      '<span class="option-text">' + opt.label + '</span>' +
      (currentSelectedOption === opt ? '<span class="option-check">✓</span>' : '');

    btn.addEventListener('click', (function(optionObj) {
      return function() {
        selectOnboardingOption(optionObj);
      };
    })(opt));

    container.appendChild(btn);
  }
}

// Option click
function selectOnboardingOption(optionObj) {
  currentSelectedOption = optionObj;

  // Re-render selection state on buttons
  var options = document.querySelectorAll('.quiz-option');
  for (var i = 0; i < options.length; i++) {
    var idx = parseInt(options[i].getAttribute('data-idx'));
    var opt = questions[currentQIndex].options[idx];
    if (opt === optionObj) {
      options[i].classList.add('selected');
      if (!options[i].querySelector('.option-check')) {
        var check = document.createElement('span');
        check.className = 'option-check';
        check.textContent = '✓';
        options[i].appendChild(check);
      }
    } else {
      options[i].classList.remove('selected');
      var check = options[i].querySelector('.option-check');
      if (check) check.remove();
    }
  }

  updateNextButtonState();
}

function updateNextButtonState() {
  var nextBtn = document.getElementById('quizNextBtn');
  if (currentSelectedOption) {
    nextBtn.style.opacity = '1';
    nextBtn.style.pointerEvents = 'auto';
  } else {
    nextBtn.style.opacity = '0.5';
    nextBtn.style.pointerEvents = 'none';
  }
}

// Next button handler
function nextOnboardingQuestion() {
  if (!currentSelectedOption) return;

  quizAnswers[currentQIndex] = currentSelectedOption;

  if (currentQIndex + 1 >= questions.length) {
    // Finish Quiz!
    showOnboardingResult();
  } else {
    currentQIndex++;
    currentSelectedOption = quizAnswers[currentQIndex] || null;
    loadOnboardingQuestion();
  }
}

// Back button handler
function prevOnboardingQuestion() {
  if (currentQIndex > 0) {
    currentQIndex--;
    currentSelectedOption = quizAnswers[currentQIndex] || null;
    loadOnboardingQuestion();
  }
}

// Show Result View
function showOnboardingResult() {
  computedTracksResult = computeResult(quizAnswers);
  var primary = computedTracksResult[0] || trackMap.web;
  var secondary = computedTracksResult[1] || trackMap.mobile;

  // Save to localStorage
  var savedAssessment = {
    trackKey: primary.roleKey,
    trackTitle: primary.label,
    specificLabel: primary.label,
    heroIcon: primary.roleKey === 'frontend' ? '🎨' : (primary.roleKey === 'data' ? '📊' : (primary.roleKey === 'ml' ? '🧠' : '⚙️')),
    matchScore: '96% Career Fit',
    recommendedCourse: primary.startingCourse,
    courseTrack: primary.courseTrack,
    primaryTrack: primary,
    secondaryTrack: secondary,
    assessedAt: new Date().toISOString()
  };
  localStorage.setItem('fitry_assessment', JSON.stringify(savedAssessment));

  // Update user profile
  var storedUser = localStorage.getItem('fitry_user');
  if (storedUser) {
    try {
      var user = JSON.parse(storedUser);
      user.quizDone = true;
      user.track = primary.label;
      user.recommendedCourse = primary.startingCourse;
      localStorage.setItem('fitry_user', JSON.stringify(user));
    } catch(e){}
  }

  // Switch to result view
  document.getElementById('quizQuestionsView').classList.add('hidden');
  document.getElementById('quizResultView').classList.remove('hidden');

  // Render tracks
  var tracksContainer = document.getElementById('resultTracksContainer');
  tracksContainer.innerHTML = '';

  computedTracksResult.forEach(function(track, i) {
    var isPrimary = (i === 0);
    var div = document.createElement('div');
    div.className = 'result-track ' + (isPrimary ? 'primary' : 'secondary');

    div.innerHTML = 
      '<div class="track-rank">' + (isPrimary ? '— Best Match' : '— Also Fits') + '</div>' +
      '<h2 class="track-label">' + track.label + '</h2>' +
      '<p class="track-lang">&gt; Start with: ' + track.lang + '</p>' +
      '<p class="track-why">' + track.why + '</p>';

    tracksContainer.appendChild(div);
  });
}

// Action: Continue to Career Guide
function continueToCareerGuide() {
  if (computedTracksResult && computedTracksResult[0]) {
    var primary = computedTracksResult[0];
    window.location.href = 'career.html?track=' + primary.roleKey + '&specific=' + encodeURIComponent(primary.label);
  } else {
    window.location.href = 'career.html';
  }
}

// Action: Continue to Course
function continueToCourse() {
  if (computedTracksResult && computedTracksResult[0]) {
    var primary = computedTracksResult[0];
    window.location.href = 'courses.html?track=' + primary.courseTrack + '&highlight=' + encodeURIComponent(primary.startingCourse);
  } else {
    window.location.href = 'courses.html';
  }
}

// Retake Quiz
function retakeOnboardingQuiz() {
  currentQIndex = 0;
  quizAnswers   = [];
  currentSelectedOption = null;
  computedTracksResult = null;
  document.getElementById('quizResultView').classList.add('hidden');
  document.getElementById('quizIntroView').classList.remove('hidden');
}


// ─────────────────────────────────────────────────────────────
// 3. TECHNICAL MCQ QUIZ LOGIC (Preserved from Experiment 5)
// ─────────────────────────────────────────────────────────────

var mcqQuestions = [
  {
    q       : "What does HTML stand for?",
    options : ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Machine Logic", "None of the above"],
    answer  : 0
  },
  {
    q       : "Which CSS property is used to change the text color?",
    options : ["text-color", "font-color", "color", "background-color"],
    answer  : 2
  },
  {
    q       : "Which HTML tag is used to create an unordered list?",
    options : ["<ol>", "<list>", "<ul>", "<li>"],
    answer  : 2
  },
  {
    q       : "In JavaScript, which keyword is used to declare a variable that cannot be reassigned?",
    options : ["var", "let", "const", "static"],
    answer  : 2
  },
  {
    q       : "What does DOM stand for?",
    options : ["Document Object Model", "Data Object Machine", "Dynamic Output Module", "Display Object Manager"],
    answer  : 0
  },
  {
    q       : "Which operator checks both value AND type in JavaScript?",
    options : ["==", "=", "===", "!="],
    answer  : 2
  },
  {
    q       : "Which CSS property controls the spacing inside an element's border?",
    options : ["margin", "border-spacing", "padding", "spacing"],
    answer  : 2
  },
  {
    q       : "What does the 'C' stand for in CSS?",
    options : ["Colorful", "Cascading", "Computer", "Compiled"],
    answer  : 1
  },
  {
    q       : "Which Node.js module is used to create an HTTP server?",
    options : ["path", "fs", "url", "http"],
    answer  : 3
  },
  {
    q       : "Which HTML attribute is used to link an external CSS file?",
    options : ["src", "href", "link", "style"],
    answer  : 1
  }
];

var mcqIndex    = 0;
var mcqScore    = 0;
var mcqAnswered = false;

function loadMcqQuestion() {
  mcqAnswered = false;
  var q = mcqQuestions[mcqIndex];
  var total = mcqQuestions.length;

  var pct = Math.round(((mcqIndex) / total) * 100);
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('qNum').textContent = 'Question ' + (mcqIndex + 1) + ' of ' + total;
  document.getElementById('scoreDisplay').textContent = 'Score: ' + mcqScore;
  document.getElementById('feedback').textContent = '';
  document.getElementById('nextBtn').style.display = 'none';

  document.getElementById('questionText').textContent = q.q;

  var list = document.getElementById('optionsList');
  list.innerHTML = '';

  for (var i = 0; i < q.options.length; i++) {
    var li = document.createElement('li');
    li.textContent = q.options[i];
    li.setAttribute('data-index', i);
    li.addEventListener('click', handleMcqAnswer);
    list.appendChild(li);
  }
}

function handleMcqAnswer(e) {
  if (mcqAnswered) return;
  mcqAnswered = true;

  var chosen = parseInt(e.target.getAttribute('data-index'));
  var correct = mcqQuestions[mcqIndex].answer;
  var feedback = document.getElementById('feedback');

  var items = document.querySelectorAll('#optionsList li');
  for (var i = 0; i < items.length; i++) {
    items[i].style.cursor = 'not-allowed';
    items[i].removeEventListener('click', handleMcqAnswer);
  }

  if (chosen === correct) {
    e.target.classList.add('correct');
    mcqScore++;
    feedback.textContent = '✅ Correct!';
    feedback.style.color = 'var(--success)';
  } else {
    e.target.classList.add('wrong');
    items[correct].classList.add('correct');
    feedback.textContent = '❌ Wrong! The correct answer was: ' + mcqQuestions[mcqIndex].options[correct];
    feedback.style.color = 'var(--danger)';
  }

  document.getElementById('scoreDisplay').textContent = 'Score: ' + mcqScore;
  document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
  mcqIndex++;
  if (mcqIndex < mcqQuestions.length) {
    loadMcqQuestion();
  } else {
    showMcqResult();
  }
}

function showMcqResult() {
  document.getElementById('quizArea').classList.add('hidden');
  document.getElementById('resultArea').classList.remove('hidden');

  var pct = Math.round((mcqScore / mcqQuestions.length) * 100);
  document.getElementById('finalScore').textContent =
    mcqScore + ' / ' + mcqQuestions.length + ' (' + pct + '%)';

  var emoji, title, msg;
  switch (true) {
    case (pct === 100):
      emoji = '🏆'; title = 'Perfect Score!';
      msg = 'Outstanding! You have mastered all the concepts.';
      break;
    case (pct >= 80):
      emoji = '🎉'; title = 'Excellent Work!';
      msg = 'Great job! You have a strong understanding of the material.';
      break;
    case (pct >= 60):
      emoji = '👍'; title = 'Good Effort!';
      msg = 'Decent result. Review the topics you missed and try again.';
      break;
    case (pct >= 40):
      emoji = '📚'; title = 'Keep Practising';
      msg = 'You need more study time. Go back to the course material.';
      break;
    default:
      emoji = '💪'; title = 'Don\'t Give Up!';
      msg = 'Difficult start, but every expert was once a beginner. Try again!';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMessage').textContent = msg;
}

function restartQuiz() {
  mcqIndex = 0;
  mcqScore = 0;
  mcqAnswered = false;
  document.getElementById('resultArea').classList.add('hidden');
  document.getElementById('quizArea').classList.remove('hidden');
  loadMcqQuestion();
}


// ─────────────────────────────────────────────────────────────
// 4. MODE SWITCHER & INITIALIZATION
// ─────────────────────────────────────────────────────────────

function switchQuizMode(mode) {
  var btnAssess = document.getElementById('btnModeAssessment');
  var btnMcq    = document.getElementById('btnModeMcq');
  var boxAssess = document.getElementById('assessmentContainer');
  var boxMcq    = document.getElementById('mcqContainer');

  if (mode === 'mcq') {
    btnAssess.classList.remove('active');
    btnMcq.classList.add('active');
    boxAssess.classList.add('hidden');
    boxMcq.classList.remove('hidden');
    loadMcqQuestion();
  } else {
    btnMcq.classList.remove('active');
    btnAssess.classList.add('active');
    boxMcq.classList.add('hidden');
    boxAssess.classList.remove('hidden');
    // Starts at Intro view
  }
}

// Read URL parameters on load
window.addEventListener('DOMContentLoaded', function() {
  // Clean any legacy salary data from localStorage
  try {
    var stored = localStorage.getItem('fitry_assessment');
    if (stored) {
      var parsed = JSON.parse(stored);
      if (parsed.salary) {
        delete parsed.salary;
        localStorage.setItem('fitry_assessment', JSON.stringify(parsed));
      }
    }
  } catch(e) {}

  var urlParams = new URLSearchParams(window.location.search);
  var modeParam = urlParams.get('mode');

  if (modeParam === 'mcq') {
    switchQuizMode('mcq');
  } else {
    // Default mode is the Onboarding Career Decision Quiz
    switchQuizMode('assessment');
  }
});

