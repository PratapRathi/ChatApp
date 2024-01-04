import React from 'react'
import { Box, Stack, IconButton, TextField, InputAdornment } from '@mui/material';
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react';
import { styled, useTheme } from '@mui/material/styles';


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px"
    }
}))

const Footer = () => {
    const theme = useTheme();

  return (
    <Box p={2} sx={{ width: "100%", boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default }}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <StyledInput fullWidth placeholder='Write a message...' variant='filled'
                        InputProps=
                        {{
                            disableUnderline: true,
                            startAdornment: <InputAdornment><IconButton><LinkSimple /></IconButton></InputAdornment>,
                            endAdornment: <InputAdornment><IconButton><Smiley /></IconButton></InputAdornment>
                        }}>
                    </StyledInput>

                    <Box sx={{ height: 48, width: 48, borderRadius: 1.5, backgroundColor: theme.palette.primary.main }}>
                        <Stack alignItems="center" justifyContent="center" sx={{ width: "100%", height: "100%" }}>
                            <IconButton>
                                <PaperPlaneTilt color='#fff' />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
  )
}

export default Footer
