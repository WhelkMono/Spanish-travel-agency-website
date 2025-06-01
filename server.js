const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// OpenAI API 프록시 엔드포인트
app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "당신은 HolatTrip의 여행 상담 전문가입니다. 고객의 여행 관련 문의에 친절하고 전문적으로 답변해주세요."
                }, {
                    role: "user",
                    content: req.body.message
                }]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});

const PORT = process.env.PORT || 3000;  // Render가 제공하는 PORT 환경변수를 우선 사용
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 