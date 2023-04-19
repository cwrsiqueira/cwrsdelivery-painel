"use client";

import Header from '@/components/Header';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box, Container, Typography } from '@mui/material';

type Props = {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <html lang='pt-br'>
            <body style={{ margin: 0, padding: 0, boxSizing: 'border-box', height: '100vh' }}>
                <Header />
                <Container component="section" maxWidth="lg">
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {children}
                    </Box>
                </Container>
            </body>
        </html>
    );
}

export default Layout;