import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";
const API_KEY ="AIzaSyD0Iq2ieCGaCV-bAFGHIcSC1ivS2FJ6Q5g";
const genAI = new GoogleGenerativeAI(API_KEY);
const instructions = `قم بتقييم طريقة وأسلوب الشرح واذكر نقاط القوة ونقاط الضعف فيهاباللغة العربية ولا تتجاوز المئتين كلمة بناء على الأساليب التالية:
أنواع أساليب التدريس المستخرجة من الملف:

التدريس المباشر

يعتمد على توجيه المدرس للطلبة باستخدام سلطته وتزويدهم بالمهارات المحددة.

التدريس غير المباشر

يشجع مشاركة الطلبة في العملية التعليمية من خلال أفكارهم وآرائهم.

التدريس القائم على المدح والنقد

يستخدم الثواب والعقاب المعتدل لتحفيز الطلبة.

التدريس القائم على التغذية الراجعة

يعتمد على تقديم ملاحظات فورية لتحسين تحصيل الطلبة.

التدريس القائم على استعمال أفكار الطالب

يساعد الطالب على استخراج الأفكار عبر التكرار والتعديل.

التدريس القائم على التنافس الفردي

يعزز التحصيل عبر التنافس الفردي بدلًا عن الجماعي.

التدريس القائم على المشروع

ينظم الطلبة نشاطات تعليمية لتحقيق أهداف محددة بتخطيط ذاتي.

التدريس الاستقرائي

ينتقل من الأمثلة الجزئية إلى التعميمات المجردة.

التدريس القياسي

يعتمد على استنتاج الحقائق الجزئية من خلال التفكير المنطقي.

التدريس القائم على تنوع الأسئلة

يستخدم تكرار الأسئلة لتعزيز التحصيل.

التدريس القائم على وضوح العرض

يركز على عرض المادة بشكل مفهوم لزيادة الاستيعاب.

التدريس الحماسي

يعتمد على حماس المدرس لرفع مستوى التحصيل.

التدريس بالإلقاء والمحاضرة

ينقل المعلومات من المدرس إلى الطالب في جو هادئ.

التدريس المبرمج

يتفاعل المدرس مع الطالب خطوة بخطوة مع تقويم مستمر.

التدريس باستخدام الوسائط المتعددة

يجمع بين النصوص، الصوت، الصور، والفيديو لإثراء التعليم.

التدريس وفق أنماط التعلم الشخصي

يشمل:

النظريون (التعلم بالمفاهيم المجردة).

الناشطون (التعلم بالتجربة المباشرة).

الانعكاسيون (التعلم بالملاحظة والتفكير).

الذرائعيون (التعلم بالتطبيق العملي)`
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash',
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
    document.querySelector(".teaching-analysis  button").addEventListener("click", ()=>  sendInput());  
    