let classes = JSON.parse(localStorage.getItem('classes'));

const params = new URLSearchParams(window.location.search);
const classId = params.get("class_id");
const topicId = params.get("topic_id");

const cls = classes.find(c => c.class_id === classId);
if (!cls) {
    document.body.innerHTML = '<div class="text-red-600 text-center text-xl mt-20">Không tìm thấy lớp học!</div>';
    throw "Class not found";
}
const topic = (cls.topics || []).find(t => t.topic_id === topicId);
if (!topic) {
    document.body.innerHTML = '<div class="text-red-600 text-center text-xl mt-20">Không tìm thấy chủ đề!</div>';
    throw "Topic not found";
}

document.getElementById("topicInfo").innerHTML = `
  <div class="text-xl font-bold text-blue-800 mb-1">${topic.title}</div>
  <div class="text-gray-700 mb-2">${topic.description}</div>
  <div class="text-sm text-gray-500 mb-1">Tạo bởi: ${topic.created_by} | ${topic.created_at}</div>
`;

function renderAnswers() {
    const box = document.getElementById("answersList");
    if (!topic.answers || topic.answers.length === 0) {
        box.innerHTML = `<div class="text-gray-500">Chưa có câu trả lời nào.</div>`;
        return;
    }
    box.innerHTML = topic.answers.map(a => `
    <div class="bg-white p-3 rounded shadow mb-3">
      <div class="text-base">${a.content}</div>
      <div class="text-xs text-gray-500 mt-1">Bởi: ${a.created_by} | ${a.created_at}</div>
    </div>
  `).join('');
}
renderAnswers();

document.getElementById('showAnswerForm').onclick = () => {
    document.getElementById('answerFormWrapper').classList.remove('hidden');
    document.getElementById('answerContent').focus();
};
document.getElementById('closeAnswerForm').onclick = () => {
    document.getElementById('answerFormWrapper').classList.add('hidden');
};
document.getElementById('submitAnswer').onclick = () => {
    const content = document.getElementById('answerContent').value.trim();
    if (!content) { alert('Nhập nội dung trả lời'); return; }
    topic.answers = topic.answers || [];
    topic.answers.unshift({
        answer_id: "A" + (topic.answers.length + 1),
        content,
        created_by: "Nguyen Van A",
        created_at: new Date().toLocaleString()
    });
    // Lưu lại mọi thay đổi
    localStorage.setItem('classes', JSON.stringify(classes));
    document.getElementById('answerContent').value = '';
    document.getElementById('answerFormWrapper').classList.add('hidden');
    renderAnswers();
};
