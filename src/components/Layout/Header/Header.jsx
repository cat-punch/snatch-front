import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { SNATCH_HEIGHT } from 'constants/snatchTheme';

const StyledTabs = styled(Tabs)({
  backgroundColor: 'transparent',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  width: '120px',
  minWidth: 70,
  fontWeight: 500,
  fontSize: '16px',
  color: '#FFFFFF',
  '&.Mui-selected': {
    color: '#2D58AC',
  },
  '&:after': {
    content: '""',
    display: 'block',
    width: '100%',
    height: '3px',
    backgroundColor: '#FFFFFF',
    marginTop: '8px',
  },
  '&.Mui-selected:after': {
    backgroundColor: '#2D58AC',
  },
}));

const Header = () => {
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);

  // 현재 경로에 따라 탭을 변경
  useEffect(() => {
    if (location.pathname.startsWith('/database')) {
      setTabValue(1);
    } else if (location.pathname.startsWith('/monitor')) {
      setTabValue(2);
    } else {
      setTabValue(0);
    }
  }, [location]);

  return (
    <div>
      <AppBar
        position="absolute"
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: '#000000',
          height: SNATCH_HEIGHT.header,
          justifyContent: 'center',
        }}
      >
        <Toolbar
          style={{
            justifyContent: 'flex-start',
            paddingLeft: '330px',
          }}
        >
          <StyledTabs
            value={tabValue}
            sx={{
              marginRight: 'auto',
              marginTop: '20px',
              paddingRight: '20px',
            }}
            onChange={(event, newValue) => setTabValue(newValue)}
          >
            <StyledTab label="Chat" component={Link} to="/" />
            <StyledTab label="DB" component={Link} to="/database" />
            <StyledTab label="Monitor" component={Link} to="/monitor" />
          </StyledTabs>

          <div style={{ marginLeft: 'auto', marginTop: '20px', marginRight: '2%' }}>
            <Button
              sx={{
                backgroundColor: '#FFFFFF',
                width: '100px',
                color: '#000',
                boxShadow: 'none',
                border: 'none',
                borderRadius: '50px',
                marginRight: '10px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              Admin
            </Button>

            <Button
              sx={{
                backgroundColor: '#2D58AC',
                color: '#FFF',
                width: '100px',
                borderRadius: '50px',
                textTransform: 'none',
              }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
