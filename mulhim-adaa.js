
import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";
const API_KEY ="AIzaSyD0Iq2ieCGaCV-bAFGHIcSC1ivS2FJ6Q5g";
const genAI = new GoogleGenerativeAI(API_KEY);
const instructions = `أنت مُلهم AI، مساعد أكاديمي ذكي. مهمتك تقديم النصائح للكوادر التعليمية حول التدريس، الأبحاث، وتطوير المهارات الأكاديمية. تحدث بأسلوب داعم واحترافي.;
`
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp",
    systemInstruction: instructions,
 });

let messages = {
    history: [
    ]
  }
console.log(document.querySelector('.up').value());
async function sendInput() {
    const userInput = document.querySelector(".ai-tips textarea").value;
    
if(userInput.length){
    document.querySelector(".ai-tips textarea").value= ""  ;
    //  document.querySelector(".ai-tips .chat-messages").insertAdjacentHTML("beforeend",`
    //     <div class="message user-message">
    //     ${userInput}

    // </div>`);
    const chat = model.startChat(messages);
    
    let result = await chat.sendMessage(userInput);
    const result1 = result.response.text()
    document.querySelector(".ai-tips .ai-response").insertAdjacentHTML("beforeend",`
        <div class="model">
        ${result1.replaceAll('*', '')}

    </div>`);

    
    console.log(result.response.text());
      
}}
document.querySelector(".ai-tips .chat-container button").addEventListener("click", ()=>  sendInput());  
