import { Box, Container, Paper, Typography } from '@mui/material';
import { height } from '@mui/system';
import React from 'react';

import logo from '../assets/logo.png';

function HeaderOnly() {
    return (
        <Container>
            <Box sx={{ height: '4em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <img src={logo} srcSet={logo} alt="Logo" loading="lazy" style={{ height: '4em' }} />
                <Paper elevation={2} sx={{ p: 1 }}>
                    <Typography variant="h5">Tra cứu điển cố</Typography>
                </Paper>
                <Box sx={{ visibility: 'hidden' }}>
                    <img src={logo} srcSet={logo} alt="Logo" loading="lazy" style={{ height: '4em' }} />
                </Box>
            </Box>
        </Container>
    );
}

export default HeaderOnly;
