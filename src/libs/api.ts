export const api = {
    login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (email !== 'teste@email.com') {
                    resolve({
                        error: 'Crendeciais inválidas!'
                    });
                } else {
                    resolve({
                        error: '',
                        token: '123'
                    });
                }
            }, 1000);
        })
    },
    forgot: async (email: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    error: ''
                });
            }, 1000);
        })
    },
    redefinePassword: async (password: string, token: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    error: ''
                });
            }, 1000);
        })
    },
}