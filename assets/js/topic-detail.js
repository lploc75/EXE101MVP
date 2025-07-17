// ================= Q&A Topic Detail ================
let classes = JSON.parse(localStorage.getItem("classes") || "[]"); // lấy thông tin lớp học từ localStorage
const googleUser = JSON.parse(localStorage.getItem("user") || "{}"); // lấy thông tin người dùng từ localStorage
const params = new URLSearchParams(window.location.search);
const classId = params.get("class_id");
const topicId = params.get("topic_id");

const cls = classes.find((c) => c.class_id === classId);
if (!cls) {
  document.body.innerHTML =
    '<div class="text-red-600 text-center text-xl mt-20">Không tìm thấy lớp học!</div>';
  throw "Class not found";
}
const topic = (cls.topics || []).find((t) => t.topic_id === topicId);
if (!topic) {
  document.body.innerHTML =
    '<div class="text-red-600 text-center text-xl mt-20">Không tìm thấy chủ đề!</div>';
  throw "Topic not found";
}

// Hiển thị header và prompt
document.getElementById("topicInfo").innerHTML = `
  <a href="javascript:history.back()" class="text-blue-600 text-sm">&larr; Back to class list</a>
  <h1 class="text-3xl font-bold mt-2 mb-2">${topic.title}</h1>
  <div class="flex items-center gap-2 text-sm text-gray-600">
    <span class="bg-gray-200 px-2 py-0.5 rounded-full text-xs font-semibold">${
      topic.role || "Teacher"
    }</span>
    <span>${topic.created_by}</span>
    <span>&bull;</span>
    <span>${topic.created_at}</span>
  </div>
`;
document.getElementById("promptBlock").innerHTML = `
  <p class="text-gray-800 mb-4">${topic.description}</p>
  <div class="flex items-center gap-6 text-sm text-gray-500">
    <div>❤️ ${topic.likes || 0}</div>
    <div>💬 ${topic.replies || (topic.answers || []).length} replies</div>
  </div>
`;

// Hàm render câu trả lời
function renderAnswers() {
  const box = document.getElementById("answersList");
  if (!topic.answers || !topic.answers.length) {
    box.innerHTML = `<div class="text-gray-500">Chưa có câu trả lời nào.</div>`;
    return;
  }

  box.innerHTML = topic.answers
    .map(
      (a, index) => `
    <div onclick="openAnswerDetail(${index})"
         class="bg-white p-4 rounded-xl shadow hover:shadow-xl transition border cursor-pointer transform hover:scale-[1.02]">
      <div class="flex items-center gap-3 mb-3">
        <img src="${
          a.picture
        }" alt="avatar" class="w-9 h-9 rounded-full object-cover"/>
        <div>
          <div class="font-semibold">${a.created_by}</div>
          <div class="text-xs text-gray-500">${a.created_at}</div>
        </div>
      </div>
      <div class="text-sm text-gray-700 max-h-32 overflow-y-auto whitespace-pre-line">
        ${a.content}
      </div>
      <div class="mt-3 text-sm text-gray-500">❤️ ${a.likes || 0}</div>
    </div>
  `
    )
    .join("");
}
renderAnswers();

// =================    Câu trả lời chi tiết ================
// xem chi tiết câu trả lời
function openAnswerDetail(index) {
  currentAnswerIndex = index;
  const ans = topic.answers[index];
  document.getElementById("answerModal").classList.remove("hidden");
  document.getElementById("answerAvatar").src = ans.picture || "https://via.placeholder.com/40";
  document.getElementById("answerAuthor").innerText =
    ans.created_by || "Lỗi hiển thị";
  document.getElementById("answerText").innerText = ans.content;
  document.getElementById("likeCount").innerText = `❤️ ${ans.likes || 0}`;
  document.getElementById("replyCount").innerText = `${
    ans.replies?.length || 0
  } replies`;

  renderReplies();
}

// đóng chi tiết câu trả lời
function closeAnswerDetail() {
  document.getElementById("answerModal").classList.add("hidden");
  currentAnswerIndex = null;
}

function sendReply() {
  const input = document.getElementById("replyInput");
  const replyText = input.value.trim();
  if (!replyText) return alert("Nhập phản hồi trước khi gửi!");

  const answer = topic.answers[currentAnswerIndex];
  answer.replies = answer.replies || [];

  answer.replies.push({
    by: googleUser.name || "Bạn",
    text: replyText,
    at: new Date().toLocaleString(),
    picture: googleUser.picture || "https://via.placeholder.com/40", // <== thêm dòng này
  });

  // Lưu lại
  localStorage.setItem("classes", JSON.stringify(classes));

  input.value = "";
  renderReplies();
}
function renderReplies() {
  const list = document.getElementById("replyList");
  const answer = topic.answers[currentAnswerIndex];
  const replies = answer.replies || [];

  if (!replies.length) {
    list.innerHTML = `<div class="text-gray-400 italic">Chưa có phản hồi nào.</div>`;
    return;
  }

  list.innerHTML = replies
    .map(
      (r) => `
  <div class="flex items-start gap-3">
<img src="${r.picture || "https://via.placeholder.com/40"}" alt="avatar"
     class="w-9 h-9 rounded-full object-cover shrink-0" />
    <div class="flex-1 bg-gray-100 rounded-lg px-4 py-3">
      <div class="flex justify-between items-center mb-1">
        <div class="font-medium text-sm text-gray-900">${r.by}</div>
        <div class="text-xs text-gray-500">${r.at}</div>
      </div>
      <div class="text-sm text-gray-800">${r.text}</div>
      <div class="mt-2 text-sm text-gray-500">♡ 0</div>
    </div>
  </div>
`
    )
    .join("");
}

// Sự kiện gửi trả lời
document.getElementById("submitAnswer").onclick = sendAnswer;

// Khi người dùng gửi trả lời
function sendAnswer() {
  const ta = document.getElementById("answerContent");
  const content = ta.value.trim();
  if (!content) return alert("Nhập nội dung trả lời");

  // Build object answer mới
  const newAnswer = {
    answer_id: "A" + ((topic.answers || []).length + 1),
    content,
    created_by: googleUser.name || "Bạn",
    created_at: new Date().toLocaleString(),
    likes: 0,
    picture: googleUser.picture || "https://via.placeholder.com/40",
  };

  // Thêm vào đầu mảng và lưu lại
  topic.answers = topic.answers || [];
  topic.answers.unshift(newAnswer);
  localStorage.setItem("classes", JSON.stringify(classes));

  // Reset textarea và re-render
  ta.value = "";
  ta.style.height = "auto";
  renderAnswers();
}

// Tự động giãn textarea trả lời
const answerContent = document.getElementById("answerContent");
answerContent.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
answerContent.addEventListener("keydown", function (e) {
  // Shift+Enter xuống dòng, Enter gửi
  if (e.key === "Enter" && !e.shiftKey) {
    sendAnswer();
    e.preventDefault();
  }
});

// =============== AI Chatbot Popup ================
document.getElementById("openChat").onclick = () => toggleChat(true);
document.getElementById("closeChat").onclick = () => toggleChat(false);
document.getElementById("sendBtn").onclick = () => sendMessage();

function toggleChat(show) {
  document.getElementById("chatPopup").classList.toggle("hidden", !show);
  if (show) setTimeout(() => document.getElementById("userInput").focus(), 100);
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const messages = document.getElementById("messages");
  if (!input.value.trim()) return;

  messages.innerHTML += `
  <div class="mb-1 flex justify-end">
    <div class="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs break-words">
      ${escapeHtml(input.value)}
    </div>
  </div>`;

  messages.innerHTML += `<div id="loading" class="mb-2"><span class="bg-gray-700 rounded-lg px-3 py-2 inline-block text-gray-300">AI đang trả lời...</span></div>`;
  messages.scrollTop = messages.scrollHeight;

  try {
    const aiReply = await callGroqAPI(input.value);
    document.getElementById("loading").remove();
    messages.innerHTML += `
        <div class="mb-2 text-left">
        <span class="bg-gray-800 rounded-lg px-3 py-2 inline-block text-white break-words max-w-[80%] whitespace-pre-line">
        ${marked.parse(aiReply)}
        </span>
        </div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    document.getElementById("loading").remove();
    messages.innerHTML += `<div class="mb-2 text-left"><span class="bg-red-700 rounded-lg px-3 py-2 inline-block text-white">Lỗi: ${escapeHtml(
      err.message
    )}</span></div>`;
    messages.scrollTop = messages.scrollHeight;
  }

  input.value = "";
  input.style.height = "auto";
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}

// Tự động giãn textarea chat AI
const userInput = document.getElementById("userInput");
userInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
userInput.addEventListener("keydown", function (e) {
  // Shift+Enter xuống dòng, Enter gửi
  if (e.key === "Enter" && !e.shiftKey) {
    sendMessage();
    e.preventDefault();
  }
});
  const textarea = document.getElementById("answerContent");
  const answerBar = document.getElementById("answerBar");

  textarea.addEventListener("focus", () => {
    answerBar.classList.add("fullscreen-answer");
  });

  textarea.addEventListener("blur", () => {
    // Delay để tránh mất khi click nút Gửi
    setTimeout(() => {
      answerBar.classList.remove("fullscreen-answer");
    }, 200);
  });
