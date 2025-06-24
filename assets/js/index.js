function closeSignup() {
  document.querySelector('.signup-box').style.display = 'none';
}
function updateFlag(value) {
  const flagMap = {
    us: 'https://flagcdn.com/w40/us.png',
    vn: 'https://flagcdn.com/w40/vn.png'
  };
  document.getElementById('flag').src = flagMap[value];
}