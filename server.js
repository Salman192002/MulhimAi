const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ استخدم مفتاح Google Gemini API
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "AIzaSyDjgsPIYh0XxyFwsFHJUyILxvBR9WnbfYc";

// ✅ تعليمات مُلهم AI عند بدء المحادثة
const SYSTEM_PROMPT = "أنت مُلهم AI، مساعد أكاديمي ذكي. مهمتك تقديم النصائح للكوادر التعليمية حول التدريس، الأبحاث، وتطوير المهارات الأكاديمية. تحدث بأسلوب داعم واحترافي.";

// ✅ المحادثة تبدأ بتعليمات النظام
let conversationHistory = [{ role: "user", parts: [{ text: SYSTEM_PROMPT }] }];

app.post("/chat", async (req, res) => {
    console.log("📩 طلب جديد وصل من المتصفح:", req.body);

    try {
        const userInput = req.body.text;
        console.log("📝 النص المُرسل لتحليله:", userInput);

        // ✅ إضافة إدخال المستخدم إلى المحادثة
        conversationHistory.push({ role: "user", parts: [{ text: userInput }] });

        // ✅ إرسال الطلب إلى Google Gemini API
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            { contents: conversationHistory },
            { headers: { "Content-Type": "application/json" } }
        );

        // ✅ استخراج الرد من API
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            const aiResponse = response.data.candidates[0].content.parts[0].text.trim();

            // ✅ إضافة رد المساعد إلى المحادثة
            conversationHistory.push({ role: "assistant", parts: [{ text: aiResponse }] });

            console.log("✅ استجابة Google Gemini API:", aiResponse);
            res.json({ advice: aiResponse });
        } else {
            throw new Error("❌ استجابة غير متوقعة من Google Gemini API.");
        }

    } catch (error) {
        console.error("❌ خطأ أثناء الاتصال بـ Google Gemini API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "حدث خطأ أثناء معالجة الطلب.", details: error.response ? error.response.data : error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`));
