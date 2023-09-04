const express=require('express')
const router=express.Router()
const {protect}=require('../middleware/authMiddleware')
const {getNotes,addNote}=require('../controllers/noteController')
const { model } = require('mongoose')

router.route('/').get(protect,getNotes).post(protect,addNote)

module.exports=router