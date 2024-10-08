import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, IconButton, Box } from '@mui/material';
import infoCategoryData from 'api/infoCategory';
import { StyledTypography } from './ChattingLog';
import { SNATCH_COLOR } from 'constants/snatchTheme';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const InfoCategory = () => {
  return (
    <Box className="flex flex-col flex-1 w-[70%] h-full">
      <div className="flex justify-end h-[10%] items-center">
        <IconButton className="w-[30px] h-[30px] ml-auto">
          <AddBoxOutlinedIcon />
        </IconButton>
      </div>
      <Box
        className="flex-col w-full h-[90%] overflow-y-auto"
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
        {infoCategoryData.map((info, index) => (
          <Box key={index} mb={3}>
            <StyledTypography>{info.category}</StyledTypography>
            {info.tags &&
              Array.isArray(info.tags) &&
              info.tags.map((tag, idx) => (
                <Button
                  key={idx}
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
                  to={`/database/${info.category}?tag=${encodeURIComponent(tag.tag)}`}
                >
                  {tag.tag} {/* tag 객체의 tag 속성을 출력 */}
                </Button>
              ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InfoCategory;
