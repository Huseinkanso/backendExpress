const asyncHandler=require('express-async-handler')

const User=require('../models/userModel')
const Ticket=require('../models/ticketModel')

// @desc get user tickets
// @route get /api/tickets
// @access private
const getTickets=asyncHandler(async(req,res)=>{
    const user = User.findById(req.user.id);
    if(!user)
    {
        res.status(401);
        throw new Error('user not found');
    }
    const tickets=await Ticket.find({user:req.user.id})
    res.status(200).json(tickets);
})


// @desc get user sinlge ticket
// @route get /api/tickets/:id
// @access private
const getTicket=asyncHandler(async(req,res)=>{
    const user = User.findById(req.user.id);
    if(!user)
    {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket=await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404);;
        throw new Error('tikcket not found');
    }
    if(ticket.user.toString()!==req.user.id)
    {
        res.status(400);
        throw new Error('user not authorized');
    }
    res.status(200).json(ticket);
})


// @desc get user sinlge ticket
// @route delete /api/tickets/:id
// @access private
const deleteTicket=asyncHandler(async(req,res)=>{
    const user = User.findById(req.user.id);
    if(!user)
    {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket=await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404);
        throw new Error('not found');
    }
    if(ticket.user.toString()!==req.user.id)
    {
        res.status(400);
        throw new Error('not authorized');
    }
    await ticket.deleteOne(ticket._id);
    // remove not working i dont know why
    // await ticket.remove();
    res.status(200).json({success:true});
})

// @desc update ticket
// @route put /api/tickets/:id
// @access private
const updateTicket=asyncHandler(async(req,res)=>{
    const user = User.findById(req.user.id);
    if(!user)
    {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket=await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404);;
        throw new Error('not found');
    }
    if(ticket.user.toString()!==req.user.id)
    {
        res.status(400);
        throw new Error('not authorized');
    }
    // const updatedTicket=await ticket.findByIdAndUpdate(req.params.id,req.body,{new:true})
    const updatedTicket=await ticket.updateOne({_id:req.params.id},req.body,{new:true})
    res.status(200).json(updateTicket);
})


// @desc get user tickets
// @route post /api/tickets
// @access private
const createTicket=asyncHandler(async(req,res)=>{
    const {product,description}=req.body;
    if(!product || !description)
    {
        res.status(400);
        throw new Error('Please add a product and a description')
    }
    const user = User.findById(req.user.id);
    if(!user)
    {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket=await Ticket.create({product,description,user:req.user.id,status:'new'})
    res.status(200).json(ticket);
})

module.exports={getTickets,createTicket,getTicket,updateTicket,deleteTicket}