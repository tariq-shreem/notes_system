
/* 
add note 

update note 
delete note
get notes
*/
/* add */
const noteModel = require('../model/note.model');
module.exports.addNote = async(req,res)=>{
    const {title,desc,userId} = req.body;
    await noteModel.insertMany({title,desc,userId:req.user._id});
    res.json({message:'success'});
}
module.exports.getNotes = async(req,res)=>{
    const userId = req.header('userId');
    let page = req.query.page;
    if(page==undefined || page <= 0){
        page=1;
    }
    const page_limit=2;
    let skip = (page-1)*page_limit
    let data = await noteModel.find().populate('userId','name -_id').select('title -_id')
    .skip(skip).limit(page_limit);
    res.json({data});
}
module.exports.updateNote = async(req,res)=>{
    const {noteId,title,desc} = req.body;// ممكن من الهيدر كمان  بس الجيت فش بودي
    await noteModel.updateOne({_id:noteId},{title,desc});
    res.json({message:'update'});
}

module.exports.deleteNote = async(req,res)=>{
    const {noteId}  = req.body;
    await noteModel.deleteOne({_id:noteId});
    res.json({message:'success'});
}