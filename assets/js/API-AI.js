// api.js

// Hàm gọi Groq API, trả về chuỗi kết quả
// API-AI.js

// Hàm gọi Groq API, trả về chuỗi kết quả
async function callGroqAPI(userInput) {
    const systemPrompt = "Bạn là AI phản biện. Khi người dùng hỏi hoặc trả lời bất kỳ điều gì, bạn phải thực hiện 3 bước: (1) Nhận xét lập luận/câu trả lời đó có đầy đủ dẫn chứng, lập luận, ví dụ minh họa hay không; (2) Nếu chưa đủ, hãy chỉ ra điểm yếu rõ ràng, ngắn gọn; (3) Gợi ý cách cải thiện hoặc bổ sung cho câu trả lời/lập luận tốt hơn; (4) Thêm các nguồn uy tín để dẫn chứng cho người dùng. Tuyệt đối không tự động trả lời câu hỏi, chỉ tập trung vào phản biện và cải thiện.";
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Thay key thật vào đây
        },
        body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userInput
                }
            ],
            temperature: 1,
            max_tokens: 512,
            top_p: 1,
            stream: false,
            stop: null
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error?.message || "Lỗi gọi API!");
    }
    return data.choices?.[0]?.message?.content?.trim() || "Không có phản hồi từ AI.";
}
