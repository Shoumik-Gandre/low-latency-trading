import { Box, Grid } from '@mui/material';
import LimitOrderForm from './components/LimitOrderForm';
import OrderList from './components/OrderList';


function App() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <LimitOrderForm />
        </Grid>
        <Grid item xs={8}>
          <OrderList />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
