"use client";

import { Link as MuiLink, Alert } from "@mui/material";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <Alert variant="filled" severity="error" sx={{ mt: 3, mb: 3 }}>Link expirado. Redefina a senha novamente.</Alert>
            <MuiLink href="/login/forgot" variant="body2" component={Link}>Redefinir Senha</MuiLink>
        </>
    );
}

export default Page;