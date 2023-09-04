const express=require('express')
const router=express.Router({mergeParams:true})
const {protect}=require('../middleware/authMiddleware')
const {getTickets,createTicket,getTicket,deleteTicket, updateTicket}=require('../controllers/ticketController')

// re-route into note router this work when mergeparams true
const noteRouter=require('./noteRoutes');
router.use('/:ticketId/notes',noteRouter);

router.route('/').get(protect,getTickets).post(protect,createTicket)
router.route('/:id').get(protect,getTicket).delete(protect,deleteTicket).put(protect,updateTicket)

module.exports=router