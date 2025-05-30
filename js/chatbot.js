// OpenAI API 설정
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Render 서버의 환경 변수 사용

// DOM 요소
const chatbot = document.getElementById('chatbot');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-message');
const openChatButton = document.getElementById('open-chat');
const closeChatButton = document.getElementById('close-chat');

// 챗봇 UI 컨트롤
openChatButton.addEventListener('click', () => {
    chatbot.style.display = 'flex';
    openChatButton.style.display = 'none';
});

closeChatButton.addEventListener('click', () => {
    chatbot.style.display = 'none';
    openChatButton.style.display = 'block';
});

// 메시지 전송 처리
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // 사용자 메시지 표시
    appendMessage('user', message);
    userInput.value = '';

    try {
        const response = await callOpenAI(message);
        appendMessage('bot', response);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
}

// OpenAI API 호출
async function callOpenAI(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "당신은 HolatTrip의 여행 상담 전문가입니다. 고객의 여행 관련 문의에 친절하고 전문적으로 답변해주세요."
                }, {
                    role: "user",
                    content: message
                }]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}

// 메시지 표시 함수
function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
} 