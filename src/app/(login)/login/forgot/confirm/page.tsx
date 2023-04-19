"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Link as MuiLink, Alert } from "@mui/material";
import Link from "next/link";
import { useState, FormEvent } from "react";

const Page = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordField, setPasswordField] = useState('');
    const [passwordConfirmField, setPasswordConfirmField] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!passwordField || !passwordConfirmField) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        if (passwordField !== passwordConfirmField) {
            setError('As senhas devem ser iguais.');
            return;
        }
        setError('');
        setSuccess('');
        setLoading(true);
        const result = await api.redefinePassword(passwordField, '123');
        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            setSuccess('Senha alterada com sucess.');
            setPasswordField('');
            setPasswordConfirmField('');
        }
    }

    return (
        <>
            <Typography component="h6" variant="h6" sx={{ textAlign: "center", mt: 2, color: '#555' }}>Redefinir Senha</Typography>
            <Typography component="p" sx={{ textAlign: "center", mb: 2, color: '#555' }}>Digite sua nova senha para redefinir.</Typography>
            <Box component="form" onSubmit={handleSubmit}>
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
                <TextField
                    label="Confirme sua senha"
                    name="passwordConfirm"
                    type="password"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={e => setPasswordConfirmField(e.target.value)}
                    value={passwordConfirmField}
                    disabled={loading}
                />
                <Button type="submit" fullWidth variant="contained" disabled={loading}>{loading ? 'Aguarde, carregando...' : 'Redefinir Senha'}</Button>
                {error &&
                    <Alert variant="filled" severity="error" sx={{ mt: 3 }}>{error}</Alert>
                }
                {success &&
                    <Alert variant="filled" severity="success" sx={{ mt: 3 }}>{success}</Alert>
                }
            </Box >
        </>
    );
}

export default Page;