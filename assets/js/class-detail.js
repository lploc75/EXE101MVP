let classes = JSON.parse(localStorage.getItem('classes'));

// Lấy class_id từ URL (?id=SE1801)
const params = new URLSearchParams(window.location.search);
const classId = params.get("id");

const cls = classes.find(c => c.class_id === classId);

if (!cls) {
    document.body.innerHTML = '<div class="text-red-600 text-center text-xl mt-20">Không tìm thấy lớp này!</div>';
    throw "Class not found";
}

document.getElementById("className").innerText = cls.name;
document.getElementById("classInfo").innerHTML = `
  <div><strong>Class ID:</strong> ${cls.class_id}</div>
  <div><strong>Subject Code:</strong> ${cls.subject_code}</div>
  <div><strong>Teacher:</strong> ${cls.teacher}</div>
  <div><strong>Semester:</strong> ${cls.semester}</div>
  <div><strong>Status:</strong> ${cls.status}</div>
  <div><strong>Members:</strong> ${cls.members}</div>
`;

function renderTopics() {
    const topicsList = document.getElementById("topicsList");
    if (!cls.topics || cls.topics.length === 0) {
        topicsList.innerHTML = "<div class='text-gray-500'>Chưa có topic nào.</div>";
        return;
    }
    topicsList.innerHTML = cls.topics.map(t => `
    <div class="bg-white rounded shadow p-3 mb-3 hover:bg-blue-50 cursor-pointer"
      onclick="goToTopic('${cls.class_id}','${t.topic_id}')">
      <div class="font-semibold text-blue-700 mb-1">${t.title}</div>
      <div class="text-sm mb-1">${t.description}</div>
      <div class="text-xs text-gray-500">Tạo bởi: ${t.created_by} | ${t.created_at} | Bình luận: ${(t.answers ? t.answers.length : 0)}</div>
    </div>
  `).join('');
}
window.goToTopic = function (classId, topicId) {
    window.location.href = `topic-detail.html?class_id=${classId}&topic_id=${topicId}`;
};

renderTopics();

document.getElementById("addTopicBtn").onclick = () => {
    const title = document.getElementById("topicTitle").value.trim();
    const desc = document.getElementById("topicDesc").value.trim();
    if (!title) { alert("Nhập tiêu đề."); return; }
    cls.topics = cls.topics || [];
    cls.topics.unshift({
        topic_id: "T" + (cls.topics.length + 1),
        title,
        description: desc,
        created_by: "Nguyen Van A",
        created_at: new Date().toLocaleString(),
        answers: []
    });
    // Lưu lại tất cả thay đổi
    localStorage.setItem('classes', JSON.stringify(classes));
    renderTopics();
    document.getElementById("topicTitle").value = '';
    document.getElementById("topicDesc").value = '';
};
