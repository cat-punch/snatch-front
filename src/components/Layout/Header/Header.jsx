import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { SNATCH_COLOR } from 'constants/snatchTheme';

const StyledTabs = styled(Tabs)({
  backgroundColor: 'transparent', // 탭 배경색
  '& .MuiTabs-indicator': {
    display: 'none', // 기본 MUI 하단 바 숨기기
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',                // 텍스트 대문자로 변환 방지
  width: '120px',                       // 강조선 길이 (픽셀로 유지)
  minWidth: 70,                         // 최소 너비 (픽셀로 유지)
  fontWeight: 500,                      // 텍스트 굵기
  fontSize: '16px',                     // 폰트 크기
  color: SNATCH_COLOR.white,            // 기본 탭 텍스트 색상 (비활성)
  '&.Mui-selected': {
    color: SNATCH_COLOR.pointBlue,      // 선택된 탭 텍스트 색상
  },
  '&:after': {
    content: '""',
    display: 'block',
    width: '100%',                      // 각 탭 하단의 강조선
    height: '3px',                      // 강조선 두께
    backgroundColor: SNATCH_COLOR.white,// 기본 강조선 색상 흰색
    marginTop: '8px',                   // 강조선 위쪽 여백
  },
  '&.Mui-selected:after': {
    backgroundColor: SNATCH_COLOR.pointBlue, // 선택된 탭 강조선 색상
  },
}));

const Header = () => {
  const [selectTab, setSelectTab] = useState(0);

  const TabChange = (event, newValue) => {
    setSelectTab(newValue);
  };

  const renderContent = () => {
    switch (selectTab) {
      case 0:
        return <div>Chat Content</div>;
      case 1:
        return <div>DB Content</div>;
      case 2:
        return <div>Monitor Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <AppBar 
        position="static" 
        style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar 
            style={{ 
                justifyContent: 'flex-start', // 좌측 정렬을 유지
                paddingLeft: '20%',   // 사이드바 공간 고려 (퍼센트 단위)
            }}>
          
          {/* 탭을 커스터마이징한 StyledTabs와 StyledTab을 사용 */}
            <StyledTabs 
                value={selectTab} 
                onChange={TabChange} 
                sx={{ 
                    marginRight: 'auto', // 탭과 버튼 사이 간격 자동으로 최대로 늘림
                    marginTop: '20px',
                    paddingRight: '2%'  // 요소의 내용과 요소의 경계(테두리) 사이의 공간을 정의
                }}
            >
              <StyledTab label="Chat" />
              <StyledTab label="DB" />
              <StyledTab label="Monitor" />
            </StyledTabs>


          <div style={{ marginLeft: 'auto', marginTop: '20px' }}>
            <Button 
              sx={{ 
                backgroundColor: SNATCH_COLOR.white, 
                width: '100px',  // 버튼 크기 고정 (픽셀)
                color: SNATCH_COLOR.deepDark,            
                boxShadow: 'none',
                border: 'none',
                borderRadius: '50px',
                marginRight: '10px', // 버튼 간의 간격 (픽셀)
                textTransform: 'none',             
                '&:hover': { 
                  backgroundColor: SNATCH_COLOR.white,
                }
              }}
            >
              Admin
            </Button>

            <Button 
              sx={{
                backgroundColor: SNATCH_COLOR.pointBlue,
                color: SNATCH_COLOR.white,
                width: '100px',  // 버튼 크기 고정 (픽셀)
                borderRadius: '50px',
                textTransform: 'none',
              }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* 선택된 탭에 따른 페이지를 렌더링 */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Header;
