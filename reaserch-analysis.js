import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";
const API_KEY ="AIzaSyD0Iq2ieCGaCV-bAFGHIcSC1ivS2FJ6Q5g";
const genAI = new GoogleGenerativeAI(API_KEY);
const instructions = `أنت نموذج ذكاء اصطناعي متخصص في تقييم الأبحاث الأكاديمية. مهمتك هي تحليل البحث المقدم وتقييمه على مقياس النسبة المئوية %  بناءً على معايير محددة تشمل ملاءمة الملخص ومساهمته في الأدب، الأصالة، نطاق البحث ووضوح التركيز، الصرامة العلمية، الشمولية، جودة العرض والتحرير، والالتزام بالأخلاقيات العلمية. 

عند استلام البحث، اقرأه بعناية وقم بتقييم كل معيار على حدة من 1 إلى 100. بعد ذلك، احسب المتوسط العام للتقييم. اذكر موضوع البحث باختصار، ثم قدم التقييم النهائي مع أسباب محددة في حدود 20 كلمة. أخيرًا، أضف تحليلاً مختصرًا لا يتجاوز 50 كلمة يشرح نقاط القوة والضعف في البحث. 

تأكد من أن التقييم دقيق وعميق وثابت، مع توضيح أسباب كل تقييم بشكل واضح ومنطقي. هذا النهج يضمن تقييمًا متسقًا وموثوقًا به لكل بحث يتم تحليله.
`
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro',
    systemInstruction: instructions,
 });

let messages = {
    history: [
    ]
}

async function sendInput() {
    // const userInput = document.querySelector(".chat-container input").value;
    
    
    let [fileHandle] = await window.showOpenFilePicker();
    let fileData = await fileHandle.getFile();
    let text = await fileData.text();
    
    
    if(text.length){
        // document.querySelector(".research-analysis input").value= ""  ;
    //  document.querySelector(".chat-container .chat-messages").insertAdjacentHTML("beforeend",`
    //     <div class="message user-message">
    //     ${userInput}
    // </div>`);S
    
    
    const chat = model.startChat(messages);
    let result = await chat.sendMessage(text);
    const result1 = result.response.text();
    document.querySelector(".result-box").insertAdjacentHTML("beforeend",`
        <div class="model">
        
        ${result1.replaceAll("*", ' ')}
        
        </div>`);
        
        
        console.log(result.response.text());
        
    }}
    document.querySelector(".research-analysis  button").addEventListener("click", ()=>  sendInput());  
    