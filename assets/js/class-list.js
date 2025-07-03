// Toàn bộ dữ liệu sẽ dùng cho các trang khác (window.classes)
// Nếu đã có dữ liệu trong localStorage, không ghi đè!
if (!localStorage.getItem('classes')) {
  window.classes = [
    {
      class_id: "SE1801",
      subject_code: "ABC101",
      name: "Critical Thinking Basics",
      status: "In Progress",
      semester: "Semester 1 - 2025",
      members: 60,
      slots: 10,
      teacher: "Nguyen Van A",
      topics: [
        {
          topic_id: "T1",
          title: "Đâu là kỹ năng tư duy phản biện quan trọng nhất?",
          description: "Hãy chia sẻ quan điểm của bạn.",
          created_by: "Nguyen Van A",
          created_at: "2025-07-04 10:12",
          answers: [
            {
              answer_id: "A1",
              content: "Theo tôi là đặt câu hỏi đúng.",
              created_by: "Nguyen Van B",
              created_at: "2025-07-04 20:12"
            }
          ]
        }
      ]
    },
    {
      class_id: "SE1802",
      subject_code: "DEF202",
      name: "Advanced Critical Thinking",
      status: "Not Started",
      semester: "Semester 2 - 2025",
      members: 35,
      slots: 8,
      teacher: "Tran Thi B",
      topics: []
    },
    {
      class_id: "SE1803",
      subject_code: "GHI303",
      name: "Academic Writing Skills",
      status: "Completed",
      semester: "Semester 1 - 2025",
      members: 42,
      slots: 10,
      teacher: "Le Phuoc C",
      topics: []
    },
  ];
  localStorage.setItem('classes', JSON.stringify(window.classes));
}

let classes = JSON.parse(localStorage.getItem('classes'));

let currentStatus = "All";
let currentSemester = "All";

function renderClasses() {
  const container = document.getElementById("classList");
  container.innerHTML = "";

  let filtered = classes.filter((cls) => {
    const matchStatus = currentStatus === "All" || cls.status === currentStatus;
    const matchSemester = currentSemester === "All" || cls.semester === currentSemester;
    return matchStatus && matchSemester;
  });

  filtered.forEach((cls) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="relative bg-white rounded-lg shadow p-4 h-full flex flex-col justify-between">
            <div class="absolute top-2 right-3 text-sm text-gray-500">${cls.status}</div>
            <h2 class="text-lg font-semibold text-gray-800 mb-3">${cls.name}</h2>
            <ul class="text-sm text-gray-700 space-y-2 mb-4">
            <li class="flex items-center gap-2"><span>Class ID: <strong>${cls.class_id}</strong></span></li>
            <li class="flex items-center gap-2"><span>Subject Code: <strong>${cls.subject_code}</strong></span></li>
            <li class="flex items-center gap-2"><span>Teacher: <strong>${cls.teacher}</strong></span></li>
            <li class="flex items-center gap-2"><span>Members: <strong>${cls.members}</strong></span></li>
            <li class="flex items-center gap-2"><span>Semester: <strong>${cls.semester}</strong></span></li>
            </ul>
            <div class="flex justify-between items-center mt-auto pt-2">
            <button onclick="goToClass('${cls.class_id}')" class="px-5 py-2 border border-gray-300 text-sm font-medium text-gray-800 rounded-md bg-white hover:bg-gray-100 transition">View</button>
            <span class="text-sm text-gray-600">${cls.slots} Slots</span>
            </div>
        </div>
        `;
    container.appendChild(card);
  });
}

function goToClass(classId) {
  window.location.href = `class-detail.html?id=${classId}`;
}

// Lọc theo trạng thái
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentStatus = btn.getAttribute("data-status");
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("bg-blue-100", "text-blue-700"));
    btn.classList.add("bg-blue-100", "text-blue-700");
    renderClasses();
  });
});

// Lọc theo kỳ học
document.getElementById("semesterFilter").addEventListener("change", (e) => {
  currentSemester = e.target.value;
  renderClasses();
});

renderClasses();
