import express from 'express';

import {
    limitOrderController,
    balanceController,
    depthController,
    orderController,
    orderlistController
} from '../controllers';

const router = express.Router()

router
    .post('/order', limitOrderController)
    .get('/order', orderController)
    .get('/balance/:userId', balanceController)
    .get('/depth', depthController)
    .get('/orderlist', orderlistController)
    .get('/', (req, res) => {
        res.sendFile('/public/index.html');
      }); 
    // TODO: Write an HTML file to display the orderlist 
    // => asks on top in red, bids on bottom with green
    // TODO: Add multiple TICKETS besides GOOGLE

export default router;