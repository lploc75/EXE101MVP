   
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
          <div class="relative bg-white rounded-lg shadow p-5 h-full flex flex-col justify-between">
            <div class="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">${cls.status}</div>
            
            <!-- Tiêu đề và Class ID -->
            <div class="mb-3">
              <h2 class="text-lg font-semibold text-gray-900">${cls.name}</h2>
              <p class="text-sm text-gray-500">Class ID: <span class="text-gray-800">${cls.class_id} • ${cls.subject_code}</span></p>
            </div>

            <!-- Thông tin chi tiết -->
            <ul class="text-sm text-gray-700 space-y-1 mb-4">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
                Teacher: ${cls.teacher}
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                ${cls.members}/70 members
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                </svg>
                ${cls.semester}
              </li>
            </ul>

            <div class="mt-4 flex justify-between items-center">
              <span class="text-xs text-gray-500">${cls.slots} slots available</span>
              <button onclick="goToClass('${cls.class_id}')" class="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">Join Class</button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function goToClass(classId) {
      window.location.href = `class-detail.html?id=${classId}`;
    }

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentStatus = btn.getAttribute("data-status");
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("bg-blue-100", "text-blue-700"));
        btn.classList.add("bg-blue-100", "text-blue-700");
        renderClasses();
      });
    });

    document.getElementById("semesterFilter").addEventListener("change", (e) => {
      currentSemester = e.target.value;
      renderClasses();
    });

    renderClasses();