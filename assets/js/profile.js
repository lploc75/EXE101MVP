window.savePassword = function () {
    let pw = document.getElementById('new-password').value;
    if (!pw) {
        alert('Vui lòng nhập mật khẩu mới!');
        return;
    }
    // Giả lập update mật khẩu thành công
    alert('Mật khẩu đã được đổi!');
    document.getElementById('new-password').value = '';
}

window.logoutAccount = function () {
    // Tùy thực tế sẽ redirect hoặc clear session, ở đây chỉ demo
    alert('Đã đăng xuất!');
    // location.href = 'login.html';
}
// Giả lập load thông tin người dùng