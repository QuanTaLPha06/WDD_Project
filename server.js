// ============================================================
// Fitry Lite - server.js
// Uses: http module, url module, path module + Express
// ============================================================

const express = require('express');
const http    = require('http');       // HTTP module (required by course)
const url     = require('url');        // URL module  (required by course)
const path    = require('path');       // Path module (required by course)

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all HTML / CSS / JS from the public/ folder
app.use(express.static(path.join(__dirname, 'public')));

// ── GET  /  → home page ──────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── GET  /search  → uses url module to parse query string ────
app.get('/search', (req, res) => {
  const parsedUrl = url.parse(req.url, true);   // url module in use
  const query     = parsedUrl.query.q || '';
  res.json({ message: `Searching jobs for: "${query}"`, query });
});

// ── In-memory "database" (CRUD demo without a real DB) ───────
let jobs = [
  { id: 1, title: 'Frontend Developer',    skills: ['HTML', 'CSS', 'JavaScript'], company: 'TechNova',   exp: '0-1 yr' },
  { id: 2, title: 'React Developer',       skills: ['React', 'JavaScript', 'CSS'], company: 'Webify',    exp: '1-2 yr' },
  { id: 3, title: 'Python Developer',      skills: ['Python', 'OOP', 'Django'],   company: 'DataSoft',   exp: '1-3 yr' },
  { id: 4, title: 'Node.js Developer',     skills: ['Node.js', 'Express', 'REST'],company: 'BackendPro', exp: '1-2 yr' },
  { id: 5, title: 'Data Analyst',          skills: ['SQL', 'Excel', 'Python'],    company: 'Insightify', exp: '0-2 yr' },
  { id: 6, title: 'UI/UX Developer',       skills: ['Figma', 'HTML', 'CSS'],      company: 'CreativeHub',exp: '0-1 yr' },
];

// READ all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// READ one job
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// CREATE a job
app.post('/api/jobs', (req, res) => {
  const { title, skills, company, exp } = req.body;
  const newJob = { id: jobs.length + 1, title, skills, company, exp };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// UPDATE a job
app.put('/api/jobs/:id', (req, res) => {
  const idx = jobs.findIndex(j => j.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  jobs[idx] = { ...jobs[idx], ...req.body };
  res.json(jobs[idx]);
});

// DELETE a job
app.delete('/api/jobs/:id', (req, res) => {
  const idx = jobs.findIndex(j => j.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  const deleted = jobs.splice(idx, 1);
  res.json({ message: 'Job deleted', job: deleted[0] });
});

// ── Create HTTP server using http module ─────────────────────
const server = http.createServer(app);   // http module wrapping Express

server.listen(PORT, () => {
  console.log(`\n🚀  Fitry Lite is running at http://localhost:${PORT}`);
  console.log(`📁  Serving static files from: ${path.join(__dirname, 'public')}`);
  console.log(`🔍  Job search endpoint: http://localhost:${PORT}/search?q=python\n`);
});
