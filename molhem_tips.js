// async function getAITips() {
//     const userInput = document.getElementById("userInput").value;

//     if (!userInput) {
//         alert("يرجى إدخال استفسارك أولًا!");
//         return;
//     }

//     try {
//         // 🔹 إرسال الطلب إلى الخادم
//         const response = await fetch("http://localhost:5000/chat", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ text: userInput })
//         });

//         // 🔹 التحقق من صحة الاستجابة
//         if (!response.ok) {
//             throw new Error(`❌ خطأ في الخادم: ${response.statusText}`);
//         }

//         const data = await response.json();

//         // 🔹 عرض الإجابة في الصفحة
//         const aiResponseDiv = document.getElementById("aiResponse");
//         aiResponseDiv.innerHTML = `<p class="ai-output">${data.advice}</p>`;
        
//         console.log("✅ استجابة المودل:", data.advice);

//     } catch (error) {
//         console.error("❌ خطأ في الاتصال بالخادم:", error);
//         document.getElementById("aiResponse").innerHTML = `<p class="error-message">❌ حدث خطأ أثناء الاتصال بالخادم.</p>`;
//     }
// }
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";
const API_KEY ="AIzaSyD0Iq2ieCGaCV-bAFGHIcSC1ivS2FJ6Q5g";
const genAI = new GoogleGenerativeAI(API_KEY);
const instructions = `اسمك مُلهم AI، مساعد أكاديمي ذكي. مهمتك تقديم النصائح للكوادر التعليمية حول التدريس، الأبحاث، وتطوير المهارات الأكاديمية. تحدث بأسلوب داعم واحترافي.;
`
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp",
    systemInstruction: instructions,
 });

let messages = {
    history: [
    ]
  }

async function sendInput() {
    const userInput = document.querySelector(".chat-container input").value;
    
if(userInput.length){
    document.querySelector(".chat-container input").value= ""  ;
     document.querySelector(".chat-container .chat-messages").insertAdjacentHTML("beforeend",`
        <div class="message user-message">
        ${userInput}

    </div>`);
    const chat = model.startChat(messages);
    
    let result = await chat.sendMessage(userInput);
    const result1 = result.response.text()
    document.querySelector(".chat-container .chat-messages").insertAdjacentHTML("beforeend",`
        <div class="message bot-message">
        ${result1}

    </div>`);

    
    console.log(result.response.text());
      
}}
document.querySelector(".chat-container .chat-input button").addEventListener("click", ()=>  sendInput());  
