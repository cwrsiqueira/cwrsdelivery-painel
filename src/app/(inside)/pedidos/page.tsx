"use client";

import { OrderItem } from "@/components/OrderItem";
import { api } from "@/libs/api";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Refresh, Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { KeyboardEvent, useEffect, useState } from "react";

const Page = () => {
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        setSearchInput('');
        setFilteredOrders(orders);
    }, [orders])



    const getOrders = async () => {
        setSearchInput('');
        setOrders([]);
        setLoading(true);
        const orderList: Order[] = await api.getOrders();
        setOrders(orderList);
        setLoading(false);
    }

    const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code.toLowerCase() === 'enter' || event.code.toLowerCase() === 'numpadenter') {
            if (searchInput != '') {
                let newOrders: Order[] = [];
                for (let i in orders) {
                    if (orders[i].id.toString() === searchInput) {
                        newOrders.push(orders[i]);
                    }
                }
                setFilteredOrders(newOrders);
            } else {
                setFilteredOrders(orders);
            }
        }
    }

    const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
        await api.changeOrderStatus(id, newStatus);
        getOrders();
    }

    const skeletons = Array(8).fill(null);

    return (
        <Box sx={{ my: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 2 }}>Pedidos</Typography>
                    {loading && <CircularProgress size={24} />}
                    {!loading &&
                        <Button onClick={getOrders} size="small" sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
                            <Refresh />
                            <Typography component="div" sx={{ color: '#555', display: { xs: 'none', sm: 'block' } }}>Atualizar</Typography>
                        </Button>
                    }
                </Box>
                <TextField
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyUp={handleSearchKey}
                    placeholder="Busca..."
                    variant="standard"
                    disabled={loading}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
            <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4 }}>
                {loading &&
                    <>
                        {skeletons.map((_, index) => (
                            <Grid item xs={1} key={index}>
                                <Skeleton variant="rectangular" height={235} sx={{ borderRadius: 2 }} />
                            </Grid>
                        ))}
                    </>
                }
                {!loading && filteredOrders.length > 0 &&
                    filteredOrders.map((value, index) => (
                        <Grid item xs={1} key={index} >
                            <OrderItem item={value} onChangeStatus={handleChangeStatus} />
                        </Grid>
                    ))
                }
                {!loading && filteredOrders.length <= 0 &&
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', width: '100%' }}>
                        <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 2 }}>Nenhum pedido encontrado</Typography>
                    </Box>
                }
            </Grid>
        </Box>
    );
}

export default Page;