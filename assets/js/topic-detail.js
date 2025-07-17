// ================= Q&A Topic Detail ================
let classes = JSON.parse(localStorage.getItem('classes') || '[]');
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

// Hiển thị header và prompt
document.getElementById("topicInfo").innerHTML = `
  <a href="javascript:history.back()" class="text-blue-600 text-sm">&larr; Back to class list</a>
  <h1 class="text-3xl font-bold mt-2 mb-2">${topic.title}</h1>
  <div class="flex items-center gap-2 text-sm text-gray-600">
    <span class="bg-gray-200 px-2 py-0.5 rounded-full text-xs font-semibold">${topic.role || 'Teacher'}</span>
    <span>${topic.created_by}</span>
    <span>&bull;</span>
    <span>${topic.created_at}</span>
  </div>
`;
document.getElementById("promptBlock").innerHTML = `
  <p class="text-gray-800 mb-4">${topic.description}</p>
  <div class="flex items-center gap-6 text-sm text-gray-500">
    <div>❤️ ${topic.likes || 0}</div>
    <div>💬 ${topic.replies || (topic.answers||[]).length} replies</div>
  </div>
`;

// Hàm render danh sách trả lời
function renderAnswers() {
  const box = document.getElementById("answersList");
  if (!topic.answers || topic.answers.length === 0) {
    box.innerHTML = `<div class="text-gray-500">Chưa có câu trả lời nào.</div>`;
    return;
  }
  box.innerHTML = topic.answers.map(a => `
    <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition border">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-9 h-9 bg-gray-300 rounded-full"></div>
        <div>
          <div class="font-semibold">${a.created_by}</div>
          <div class="text-xs text-gray-500">${a.created_at}</div>
        </div>
      </div>
      <div class="text-sm text-gray-700 line-clamp-4">${a.content}</div>
      <div class="mt-3 text-sm text-gray-500">❤️ ${a.likes||0}</div>
    </div>
  `).join('');
}
renderAnswers();

// Sự kiện gửi trả lời
document.getElementById('submitAnswer').onclick = sendAnswer;

function sendAnswer() {
    const textarea = document.getElementById('answerContent');
    const content = textarea.value.trim();
    if (!content) { alert('Nhập nội dung trả lời'); return; }
    topic.answers = topic.answers || [];
    topic.answers.unshift({
        answer_id: "A" + (topic.answers.length + 1),
        content,
        created_by: "Nguyen Van A",
        created_at: new Date().toLocaleString()
    });
    localStorage.setItem('classes', JSON.stringify(classes));
    textarea.value = '';
    textarea.style.height = 'auto';
    renderAnswers();
}

// Tự động giãn textarea trả lời
const answerContent = document.getElementById('answerContent');
answerContent.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});
answerContent.addEventListener('keydown', function (e) {
    // Shift+Enter xuống dòng, Enter gửi
    if (e.key === "Enter" && !e.shiftKey) {
        sendAnswer();
        e.preventDefault();
    }
});

// =============== AI Chatbot Popup ================
document.getElementById('openChat').onclick = () => toggleChat(true);
document.getElementById('closeChat').onclick = () => toggleChat(false);
document.getElementById('sendBtn').onclick = () => sendMessage();

function toggleChat(show) {
    document.getElementById('chatPopup').classList.toggle('hidden', !show);
    if (show) setTimeout(() => document.getElementById('userInput').focus(), 100);
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const messages = document.getElementById('messages');
    if (!input.value.trim()) return;

    messages.innerHTML += `<div class="mb-2 text-right">
      <span class="bg-blue-500 rounded-lg px-3 py-2 inline-block text-white break-words max-w-[80%] whitespace-pre-line">
        ${escapeHtml(input.value)}
      </span>
    </div>`;

    messages.innerHTML += `<div id="loading" class="mb-2"><span class="bg-gray-700 rounded-lg px-3 py-2 inline-block text-gray-300">AI đang trả lời...</span></div>`;
    messages.scrollTop = messages.scrollHeight;

    try {
        const aiReply = await callGroqAPI(input.value);
        document.getElementById('loading').remove();
        messages.innerHTML += `
        <div class="mb-2 text-left">
        <span class="bg-gray-800 rounded-lg px-3 py-2 inline-block text-white break-words max-w-[80%] whitespace-pre-line">
        ${marked.parse(aiReply)}
        </span>
        </div>`;
        messages.scrollTop = messages.scrollHeight;
    } catch (err) {
        document.getElementById('loading').remove();
        messages.innerHTML += `<div class="mb-2 text-left"><span class="bg-red-700 rounded-lg px-3 py-2 inline-block text-white">Lỗi: ${escapeHtml(err.message)}</span></div>`;
        messages.scrollTop = messages.scrollHeight;
    }

    input.value = '';
    input.style.height = 'auto';
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;',
            '"': '&quot;', "'": '&#39;'
        })[m];
    });
}

// Tự động giãn textarea chat AI
const userInput = document.getElementById('userInput');
userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});
userInput.addEventListener('keydown', function (e) {
    // Shift+Enter xuống dòng, Enter gửi
    if (e.key === "Enter" && !e.shiftKey) {
        sendMessage();
        e.preventDefault();
    }
});

