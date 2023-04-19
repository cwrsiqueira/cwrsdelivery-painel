"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Link as MuiLink, Alert } from "@mui/material";
import Link from "next/link";
import { useState, FormEvent } from "react";

const Page = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailField || !passwordField) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        setError('');
        setSuccess('');
        setLoading(true);
        const result = await api.login(emailField, passwordField);
        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            setSuccess('Login efetuado com sucesso');
            setEmailField('');
            setPasswordField('');
        }
    }

    return (
        <>
            <Typography component="h6" variant="h6" sx={{ textAlign: "center", mt: 2, color: '#555' }}>Login</Typography>
            <Typography component="p" sx={{ textAlign: "center", mb: 2, color: '#555' }}>Digite seus dados para entrar no painel administrativo.</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Digite seu email"
                    name="email"
                    type="email"
                    required
                    fullWidth
                    autoFocus
                    sx={{ mb: 2, mt: 2 }}
                    onChange={e => setEmailField(e.target.value)}
                    value={emailField}
                    disabled={loading}
                />
                <TextField
                    label="Digite sua senha"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={e => setPasswordField(e.target.value)}
                    value={passwordField}
                    disabled={loading}
                />
                <Button type="submit" fullWidth variant="contained" disabled={loading}>{loading ? 'Aguarde, carregando...' : 'Entrar'}</Button>
                {error &&
                    <Alert variant="filled" severity="error" sx={{ mt: 3 }}>{error}</Alert>
                }
                {success &&
                    <Alert variant="filled" severity="success" sx={{ mt: 3 }}>{success}</Alert>
                }
                <Box sx={{ mt: 3 }}>
                    <MuiLink href="/login/forgot" variant="body2" component={Link}>Esqueceu sua senha?</MuiLink>
                </Box>
            </Box >
        </>
    );
}

export default Page;