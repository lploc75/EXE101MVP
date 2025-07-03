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
            topics: [
                {
                    topic_id: "T1",
                    title: "Chủ đề mẫu SE1802",
                    description: "Demo topic",
                    created_by: "Tran Thi B",
                    created_at: "2025-07-05 09:00",
                    answers: []
                }
            ]
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
        }
    ];
    localStorage.setItem('classes', JSON.stringify(window.classes));
}
