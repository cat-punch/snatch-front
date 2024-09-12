import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import QuestionChat from './QuestionChat';
import AnswerChat from './AnswerChat';
import chatLog from 'api/chatLog';
import { submitQuestion } from 'api/chattingApi'; // GPT API 연결
import { SNATCH_COLOR } from 'constants/snatchTheme';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

export const StyledBox = styled(Box)(() => ({
  border: 'none',
  backgroundColor: 'white',
  borderRadius: '30px',
  overflowY: 'auto',
}));

const ChatPage = () => {
  const { id } = useParams();
  const chatLogEntry = chatLog.find((log) => log.chatId === parseInt(id));
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // 페이지 로드 시 저장된 기록을 불러옵니다.
    const storedChatHistory = JSON.parse(localStorage.getItem(`chatHistory_${id}`)) || [];
    setChatHistory(storedChatHistory);
  }, [id]);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    const newChat = { type: 'question', text: question };
    const updatedChatHistory = [...chatHistory, newChat];
    setChatHistory(updatedChatHistory);

    // 기록을 localStorage에 저장합니다.
    localStorage.setItem(`chatHistory_${id}`, JSON.stringify(updatedChatHistory));

    try {
      const response = await submitQuestion(question); // GPT API에 질문 전송
      const answerChat = { type: 'answer', text: response.data.response }; // GPT의 답변 추가
      const updatedChatHistoryWithAnswer = [...updatedChatHistory, answerChat];
      setChatHistory(updatedChatHistoryWithAnswer);

      // 답변이 추가된 기록을 localStorage에 저장합니다.
      localStorage.setItem(`chatHistory_${id}`, JSON.stringify(updatedChatHistoryWithAnswer));
    } catch (error) {
      console.error('Error submitting question:', error);
    }

    setQuestion('');
  };

  return (
    <div className="flex flex-col h-full gap-5">
      <StyledBox
        className="flex flex-col w-full gap-10 p-10 h-[100%]"
        sx={{
          '&::-webkit-scrollbar': {
            width: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: SNATCH_COLOR.deepLight,
            borderRadius: '30px',
          },
        }}
      >
        {/* <h2>대화 {id}</h2> */}
        <h2>대화 10</h2>
        {chatHistory.map((chat, index) =>
          chat.type === 'question' ? (
            <QuestionChat key={index} question={chat.text} />
          ) : (
            <AnswerChat key={index} answer={chat.text} />
          ),
        )}
      </StyledBox>
      <TextField
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        variant="outlined"
        multiline
        placeholder="자유롭게 입력하세요."
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '30px',
            height: '50px',
            paddingX: 3,
            '& fieldset': {
              border: 'none',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className="mr-3">
              <IconButton edge="end" onClick={handleSubmit}>
                <ArrowCircleUpOutlinedIcon sx={{ fontSize: '30px', color: SNATCH_COLOR.pointBlue }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default ChatPage;
