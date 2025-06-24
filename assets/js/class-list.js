const classes = [
  {
    class_id: "SE1801",
    subject_code: "ABC101",
    name: "Critical Thinking Basics",
    status: "In Progress",
    semester: "Semester 1 - 2025",
    members: 60,
    slots: 10,
    teacher: "Nguyen Van A",
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
  },
];

let currentStatus = "All";
let currentSemester = "All";
function renderClasses() {
  const container = document.getElementById("classList");
  container.innerHTML = "";

  let filtered = classes.filter((cls) => {
    const matchStatus = currentStatus === "All" || cls.status === currentStatus;
    const matchSemester =
      currentSemester === "All" || cls.semester === currentSemester;
    return matchStatus && matchSemester;
  });

  filtered.forEach((cls) => {
    const card = document.createElement("div");

    card.innerHTML = `
  <div class="relative bg-white rounded-lg shadow p-4 h-full flex flex-col justify-between">
    <!-- Top right: status -->
    <div class="absolute top-2 right-3 text-sm text-gray-500">
      ${cls.status}
    </div>

    <!-- Title -->
    <h2 class="text-lg font-semibold text-gray-800 mb-3">${cls.name}</h2>

    <!-- Class info -->
    <ul class="text-sm text-gray-700 space-y-2 mb-4">
      <li class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
        </svg>
        <span>Class ID: <strong>${cls.class_id}</strong></span>
      </li>

      <li class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
      </svg>
        <span>Subject Code: <strong>${cls.subject_code}</strong></span>
      </li>

      <li class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
        <span>Teacher: <strong>${cls.teacher}</strong></span>
      </li>

      <li class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
        <span>Members: <strong>${cls.members}</strong></span>
      </li>

      <li class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
      </svg>
        <span>Semester: <strong>${cls.semester}</strong></span>
      </li>
    </ul>

    <!-- Button + Slots -->
    <div class="flex justify-between items-center mt-auto pt-2">
      <button onclick="goToClass('${cls.class_id}')" class="px-5 py-2 border border-gray-300 text-sm font-medium text-gray-800 rounded-md bg-white hover:bg-gray-100 transition">
        View
      </button>
      <span class="text-sm text-gray-600">${cls.slots} Slots</span>
    </div>
  </div>
`;
    container.appendChild(card);
  });
}

function goToClass(classId) {
  alert("Redirecting to class: " + classId);
}

// Lọc theo trạng thái
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentStatus = btn.getAttribute("data-status");
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("bg-blue-100", "text-blue-700"));
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
