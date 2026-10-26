// ============================================================
// validation.js — Form Validation using RegEx (Exp 6)
// Used by: register.html, login.html
// ============================================================

// ── Helper: show or hide an error message ────────────────────
function toggleError(id, show) {
  var el = document.getElementById(id);
  if (!el) return;
  if (show) el.classList.add('show');
  else      el.classList.remove('show');
}

// ── RegEx Patterns (from Exp 6) ──────────────────────────────
var REGEX = {
  name    : /^[A-Za-z\s]{3,}$/,               // letters + spaces, min 3
  email   : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,     // has @ and .
  phone   : /^[0-9]{10}$/,                    // exactly 10 digits
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  // at least 1 lowercase, 1 uppercase, 1 digit, 1 special char, min 8 chars
};

// ── Main Registration Validation (onsubmit) ──────────────────
function validateRegisterForm(e) {
  e.preventDefault();

  var name       = document.getElementById('fullname');
  var email      = document.getElementById('email');
  var phone      = document.getElementById('phone');
  var dob        = document.getElementById('dob');
  var track      = document.getElementById('track');
  var password   = document.getElementById('password');
  var confirmP   = document.getElementById('confirmPass');
  var terms      = document.getElementById('terms');

  var isValid = true;

  // 1. Name — letters only
  if (!REGEX.name.test(name.value.trim())) {
    toggleError('err-fullname', true);
    if (isValid) name.focus();
    isValid = false;
  } else {
    toggleError('err-fullname', false);
  }

  // 2. Email validation
  if (!REGEX.email.test(email.value.trim())) {
    toggleError('err-email', true);
    if (isValid) email.focus();
    isValid = false;
  } else {
    toggleError('err-email', false);
  }

  // 3. Phone — 10 digits
  if (!REGEX.phone.test(phone.value.trim())) {
    toggleError('err-phone', true);
    if (isValid) phone.focus();
    isValid = false;
  } else {
    toggleError('err-phone', false);
  }

  // 4. Date of birth — must be selected
  if (!dob.value) {
    toggleError('err-dob', true);
    if (isValid) dob.focus();
    isValid = false;
  } else {
    toggleError('err-dob', false);
  }

  // 5. Track — must select something
  if (track.selectedIndex < 1) {
    toggleError('err-track', true);
    if (isValid) track.focus();
    isValid = false;
  } else {
    toggleError('err-track', false);
  }

  // 6. Password — strong password regex
  if (!REGEX.password.test(password.value)) {
    toggleError('err-password', true);
    if (isValid) password.focus();
    isValid = false;
  } else {
    toggleError('err-password', false);
  }

  // 7. Confirm password must match
  if (confirmP.value !== password.value || confirmP.value === '') {
    toggleError('err-confirmPass', true);
    if (isValid) confirmP.focus();
    isValid = false;
  } else {
    toggleError('err-confirmPass', false);
  }

  // 8. Gender — radio button must be selected
  var genders  = document.querySelectorAll('input[name="gender"]');
  var gPicked  = false;
  for (var i = 0; i < genders.length; i++) {
    if (genders[i].checked) { gPicked = true; break; }
  }
  toggleError('err-gender', !gPicked);
  if (!gPicked) isValid = false;

  // 9. Terms — checkbox must be ticked
  if (!terms.checked) {
    toggleError('err-terms', true);
    isValid = false;
  } else {
    toggleError('err-terms', false);
  }

  // ── If all valid → show success ───────────────────────────
  if (isValid) {
    var userObj = {
      name: name.value.trim(),
      email: email.value.trim(),
      track: track.value,
      registered: true
    };
    localStorage.setItem('fitry_user', JSON.stringify(userObj));
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('successMsg').classList.remove('hidden');
    setTimeout(function() {
      window.location.href = 'quiz.html?mode=assessment';
    }, 1500);
  }

  return false;  // always prevent default
}
