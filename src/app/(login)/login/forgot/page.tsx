"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false);
    const [emailField, setEmailField] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailField) {
            setError('Digite seu e-mail.');
            return;
        }
        setError('');
        setSuccess('');
        setLoading(true);
        await api.forgot(emailField);
        setLoading(false);
        setSuccess('Recuperação de senha enviada para o seu e-mail');
        setEmailField('');
    }

    return (
        <>
            <Typography component="h6" variant="h6" sx={{ textAlign: "center", mt: 2, color: '#555' }}>Recuperar Senha</Typography>
            <Typography component="p" sx={{ textAlign: "center", mb: 2, color: '#555' }}>Envie seu email para recuperar a sua senha.</Typography>
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
                <Button type="submit" fullWidth variant="contained" disabled={loading}>{loading ? 'Aguarde, carregando...' : 'Recuperar a Senha'}</Button>
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