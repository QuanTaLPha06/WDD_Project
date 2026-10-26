// ============================================================
// jobs.js — Job Finder (arrays, loops, filter, DOM)
// ============================================================

// ── Job Data Array (objects array from course) ────────────────
var allJobs = [
  {
    id       : 1,
    title    : 'Frontend Developer',
    company  : 'TechNova Pvt. Ltd.',
    location : 'Mumbai',
    exp      : '0–1 year',
    salary   : '₹4–6 LPA',
    category : 'frontend',
    skills   : ['HTML5', 'CSS3', 'JavaScript'],
    readiness: 'ready'
  },
  {
    id       : 2,
    title    : 'React Developer',
    company  : 'Webify Solutions',
    location : 'Pune',
    exp      : '1–2 years',
    salary   : '₹6–9 LPA',
    category : 'frontend',
    skills   : ['React.js', 'JavaScript', 'REST API'],
    readiness: 'almost'
  },
  {
    id       : 3,
    title    : 'Node.js Backend Developer',
    company  : 'BackendPro',
    location : 'Bangalore',
    exp      : '1–2 years',
    salary   : '₹7–10 LPA',
    category : 'backend',
    skills   : ['Node.js', 'Express', 'MongoDB'],
    readiness: 'almost'
  },
  {
    id       : 4,
    title    : 'Python Developer',
    company  : 'DataSoft',
    location : 'Hyderabad',
    exp      : '1–3 years',
    salary   : '₹6–10 LPA',
    category : 'backend',
    skills   : ['Python', 'Django', 'SQL'],
    readiness: 'not-ready'
  },
  {
    id       : 5,
    title    : 'Data Analyst',
    company  : 'Insightify',
    location : 'Chennai',
    exp      : '0–2 years',
    salary   : '₹5–8 LPA',
    category : 'data',
    skills   : ['SQL', 'Excel', 'Python', 'Tableau'],
    readiness: 'almost'
  },
  {
    id       : 6,
    title    : 'UI/UX Developer',
    company  : 'CreativeHub',
    location : 'Mumbai',
    exp      : '0–1 year',
    salary   : '₹4–7 LPA',
    category : 'design',
    skills   : ['Figma', 'HTML', 'CSS'],
    readiness: 'ready'
  },
  {
    id       : 7,
    title    : 'Full Stack Developer',
    company  : 'StackMasters',
    location : 'Delhi',
    exp      : '2–4 years',
    salary   : '₹10–15 LPA',
    category : 'backend',
    skills   : ['React', 'Node.js', 'MongoDB', 'AWS'],
    readiness: 'not-ready'
  },
  {
    id       : 8,
    title    : 'Junior Web Developer',
    company  : 'StartupGrid',
    location : 'Remote',
    exp      : '0–6 months',
    salary   : '₹2–4 LPA',
    category : 'frontend',
    skills   : ['HTML', 'CSS', 'JavaScript'],
    readiness: 'ready'
  }
];

// ── Current filter state ──────────────────────────────────────
var currentCategory = 'all';

// ── Render Jobs into DOM using for loop ──────────────────────
function renderJobs(jobs) {
  var container = document.getElementById('jobsContainer');
  var noMsg     = document.getElementById('noJobsMsg');
  var countEl   = document.getElementById('jobCount');

  container.innerHTML = '';  // clear

  if (jobs.length === 0) {
    noMsg.style.display     = 'block';
    countEl.textContent     = '';
    return;
  }

  noMsg.style.display   = 'none';
  countEl.textContent   = 'Showing ' + jobs.length + ' job' + (jobs.length !== 1 ? 's' : '');

  // Build each job card using for loop (from course)
  for (var i = 0; i < jobs.length; i++) {
    var job     = jobs[i];
    var card    = document.createElement('div');
    card.className = 'job-card';

    // Readiness label using if-else (from course)
    var readinessLabel, readinessClass;
    if (job.readiness === 'ready') {
      readinessLabel = '✅ You\'re Ready';
      readinessClass = 'ready';
    } else if (job.readiness === 'almost') {
      readinessLabel = '⚡ Almost Ready';
      readinessClass = 'almost';
    } else {
      readinessLabel = '📚 Need More Skills';
      readinessClass = 'not-ready';
    }

    // Build skills tags using another loop
    var skillsHTML = '';
    for (var s = 0; s < job.skills.length; s++) {
      skillsHTML += '<span class="tag">' + job.skills[s] + '</span>';
    }

    // Set card inner HTML
    card.innerHTML =
      '<div>' +
        '<h3>' + job.title + '</h3>' +
        '<p class="company">' + job.company + ' &middot; ' + job.location + '</p>' +
        '<p class="job-meta">Experience: ' + job.exp + ' &nbsp;|&nbsp; Salary: ' + job.salary + '</p>' +
        '<div class="job-skills">' + skillsHTML + '</div>' +
      '</div>' +
      '<div style="text-align:right; margin-top:12px;">' +
        '<span class="readiness ' + readinessClass + '">' + readinessLabel + '</span>' +
        '<br><br>' +
        '<a href="register.html" class="btn btn-primary" style="padding:8px 18px; font-size:0.85rem;">Apply Now</a>' +
      '</div>';

    container.appendChild(card);
  }
}

// ── Filter by category (from filter buttons) ─────────────────
function setCategory(cat, btn) {
  currentCategory = cat;

  // Update active button
  var btns = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  btn.classList.add('active');

  filterJobs();
}

// ── Filter by search text + category ─────────────────────────
function filterJobs() {
  var query = document.getElementById('searchInput').value.toLowerCase().trim();

  // Use array .filter() (from course)
  var filtered = allJobs.filter(function(job) {
    var matchCat   = currentCategory === 'all' || job.category === currentCategory;
    var matchQuery = query === '' ||
      job.title.toLowerCase().indexOf(query) >= 0 ||
      job.company.toLowerCase().indexOf(query) >= 0 ||
      job.skills.join(' ').toLowerCase().indexOf(query) >= 0;
    return matchCat && matchQuery;
  });

  renderJobs(filtered);
}

// ── Initialise: render jobs on page load with assessment track check ──
window.addEventListener('DOMContentLoaded', function() {
  var storedAssessment = localStorage.getItem('fitry_assessment');
  if (storedAssessment) {
    try {
      var assess = JSON.parse(storedAssessment);
      if (assess && assess.trackKey) {
        var catKey = assess.trackKey;
        if (catKey === 'ml') catKey = 'data'; // align ML with data category
        var btn = document.querySelector('.filter-btn[onclick*="' + catKey + '"]');
        if (btn) {
          setCategory(catKey, btn);
          return;
        }
      }
    } catch(e) {
      console.error(e);
    }
  }
  renderJobs(allJobs);
});

