// filepath: d:\HOC\Ki 7\EXE101\MVP\assets\js\sign-in.js
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-password');
const eyeIcon = document.getElementById('eye-icon');

toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

  toggleBtn.title = isPassword ? 'Hide password' : 'Show password';
  toggleBtn.ariaLabel = toggleBtn.title;

  eyeIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
});

function showAlert() {
  alert('Xin chào từ JavaScript!');
}
