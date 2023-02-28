const asyncHandler = require('express-async-handler');
const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");

const accessChat = asyncHandler(async(req, res) => {    

    const userId = req.body;
    if(!userId){
        res.send(404);
    }
    var isChat = await ChatModel.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ],
    })
    .populate("users","-password")
    .populate("latestMessage")

    isChat = await UserModel.populate(isChat,{
        path:"latestMessage.sender",
        select:"name email pic"
    })

    if(isChat.length >0 ){
        res.send(isChat[0])
    }
    else{
        var chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }

        try {
            const createChat = await ChatModel.create(chatData)
            const FullChat = await ChatModel.findOne({_id:createChat._id}).populate("users","-password")
            res.status(200).json(FullChat)
        } catch (error) {
            throw new Error(error.message)            
        }
    }
})

const fetchChat = asyncHandler(async(req,res) =>{
    try {
        ChatModel.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage","-password")
        .sort({updatedAt:-1})
        .then(async(res) =>{
            res = await UserModel.populate(res,{
                path:"latestMessage.sender",
                select:"name, pic, email"
            })
            res.send(res).status(200)
        })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroup = asyncHandler(async(req,res) =>{

    if(!req.body.users || !req.body.name){
        res.send({message:"Please fill all the fields"}).status(400)
    }
    var users = JSON.parse(req.body.users)

    if(users.length<2){
        res
        .status(400)
        .send({message:"Minimum 2 members should be required to start a group chat"})
    }
    users.push(req.user)

    try {
        const groupChat = await ChatModel.create({
            chatName: req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin: req.user
        })

        const FullChat = await ChatModel.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")

        res.status(200).json(FullChat)
    } catch (error) {
        res
        .status(400)
        throw new Error(error.message)
    }
})

const renameGroup = asyncHandler(async(req,res) =>{
    const {chatId,chatName} = req.body;
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId,{
        chatName:chatName
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!updatedChat){
        throw new Error("Chat not found")
    }
    else{
        res.status(200).json(updatedChat)
    }
})

const addToGroup = asyncHandler(async(req,res) =>{
    const {chatId,userId} = req.body;

    const added = await ChatModel.findByIdAndUpdate(chatId,{
        $push:{users:userId},
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!added){
        res.status(400)
        throw new Error("Something went wrong")
    }
    else{
        res.status(200).json(added)
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

module.exports = {
    accessChat,
    fetchChat,
    createGroup,
    renameGroup,
    addToGroup,
    removeFromGroup
}
