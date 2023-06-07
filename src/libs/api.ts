import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";

const tmpProduct: Product = {
    id: 999,
    image: 'https://photos.app.goo.gl/GNZLov3W631tYNNX6',
    category: {
        id: 99,
        name: 'Burgers'
    },
    name: 'Burgão Boladão',
    price: 35.3,
    description: 'Um burgão boladão legal demais'
}

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
    getOrders: async (): Promise<Order[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const orders: Order[] = [];
                const statuses: OrderStatus[] = ['preparing', 'sent', 'delivered'];

                for (let i = 0; i < 6; i++) {
                    orders.push({
                        id: parseInt('12' + i),
                        orderDate: '2023-05-07 02:40',
                        paymentType: 'card',
                        products: [
                            { qt: 2, product: tmpProduct },
                            { qt: 3, product: { ...tmpProduct, id: 123, name: 'X-Bacon Cheddar' } },
                        ],
                        ShippingAddress: {
                            id: 99,
                            address: 'Rua das Coves',
                            cep: '81020-235',
                            city: 'Curitiba',
                            neighborhood: 'Novo Mundo',
                            number: '4125',
                            state: 'Paraná',
                            complement: 'Apto 28',
                        },
                        shippingPrice: 12,
                        status: statuses[Math.floor(Math.random() * 3)],
                        subtotal: 99,
                        total: 120,
                        userId: '1',
                        userName: 'Carlos Wagner',
                        changeValue: 0,
                        cupom: 'CUPOM',
                        cupomDiscount: 2,
                    });
                }

                resolve(orders);
            }, 1000);
        })
    }
}