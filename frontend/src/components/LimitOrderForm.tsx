import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material"
import { useState } from "react";
import { BACKEND_URI } from "../constants";


const LimitOrderForm = () => {

    const [side, setSide] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [userId, setUserId] = useState('')

    const handleSideChange = (event: SelectChangeEvent) => {
        setSide(event.target.value as string);
    };

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        fetch(`${BACKEND_URI}/order`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "userId": userId,
                "side": side,
                "price": Number(price),
                "quantity": Number(quantity)
            })
        }).then(value => console.log(value))
    }

    return (
        <Paper>
            <Stack
                component="form"
                // sx={{
                //     width: '25ch',
                // }}
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="UserId"
                    name="userId"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                />
                <TextField
                    label="Price ($)"
                    name="userId"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <TextField
                    label="Quantity"
                    name="userId"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Side</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={side}
                        label="Side"
                        onChange={handleSideChange}
                    >
                        <MenuItem value={"Ask"}>Ask</MenuItem>
                        <MenuItem value={"Bid"}>Bid</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </Button>
            </Stack>
        </Paper>
    )
}

export default LimitOrderForm