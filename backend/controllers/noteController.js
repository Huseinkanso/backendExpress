const asyncHandler=require('express-async-handler')

const User=require('../models/userModel')
const Ticket=require('../models/ticketModel')
const Note=require('../models/noteModel')

// @desc get notes for a ticket
// @route get /api/tickets/:ticketid/notes
// @access private
const getNotes=asyncHandler(async(req,res)=>{
    const user = User.findById(req.user._id);
    if(!user)
    {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket=await Ticket.findById(req.params.ticketId)
    if(!ticket)
    {
        res.status(404);;
        throw new Error('ticket not found');
    }
    if(ticket.user.toString()!==req.user._id)
    {
        res.status(401);
        throw new Error('user not authorized');
    }
    const notes=await Note.find({ticket:req.params.ticketId})
    res.status(200).json(notes);
})

// @desc get notes for a ticket
// @route get /api/tickets/:ticketid/notes
// @access private
const addNote=asyncHandler(async(req,res)=>{
    const user = User.findById(req.user.id);
    if(!user)
    {
        res.status(401);
        throw new Error('user not found');
    }
    const ticket=await Ticket.findById(req.params.ticketId)
    if(!ticket)
    {
        res.status(404);;
        throw new Error('ticket not found');
    }
    if(ticket.user.toString()!==req.user.id)
    {
        res.status(401);
        throw new Error('user not authorized');
    }
    const notes=await Note.create({ticket:req.params.ticketId,text:req.body.text,isStaff:false,user:req.user._id})
    res.status(200).json(notes);
})

module.exports = {
    getNotes,
    addNote
}