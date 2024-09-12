import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, Typography, Button, IconButton, Box } from '@mui/material';
import chatLogData from 'api/chatLog';
import ExPage from 'pages/Chat/Examples/ExPage';

import { SNATCH_COLOR, SNATCH_HEIGHT } from 'constants/snatchTheme';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export const StyledTypography = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: '600',
  color: SNATCH_COLOR.deepDark,
  alignContent: 'center',
}));

const ChattingLog = () => {
  const [chatLog, setChatLog] = useState(chatLogData);

  const handleNewChat = () => {
    // chatId 11로 된 새로운 객체 생성
    const newChat = {
      chatId: 10,
      timestamp: new Date().toISOString(), // 현재 시간으로 timestamp 설정
      title: '대화 10',
      contents: '',
    };

    setChatLog((prevLog) => [...prevLog, newChat]);
    console.log(chatLog);
  };

  return (
    <Box className="flex flex-col flex-1 w-[70%] h-full">
      <div className="flex justify-end h-[10%] items-center">
        <IconButton className="w-[30px] h-[30px] ml-auto" onClick={handleNewChat} component={Link} to="/chatpage/10">
          <EditNoteOutlinedIcon />
        </IconButton>
      </div>
      <StyledTypography sx={{ marginBottom: '10px' }}>Chatting Log</StyledTypography>
      <Box
        className="flex-col w-full h-[80%] overflow-y-auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: SNATCH_COLOR.light,
            borderRadius: '30px',
          },
        }}
      >
        {chatLogData.map((log) => (
          <Button
            key={log.chatId}
            className="w-full overflow-hidden text-left normal-case justify-flex-start whitespace-nowrap text-ellipsis"
            sx={{
              fontSize: '15px',
              display: 'block',
              marginTop: 1,
              textTransform: 'none',
              fontWeight: '400',
              borderRadius: '0px',
              borderBottom: `1px solid ${SNATCH_COLOR.light}`,
              color: SNATCH_COLOR.deepDark,
            }}
            component={Link}
            to={`/chatpage/${log.chatId}`}
          >
            {log.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ChattingLog;
