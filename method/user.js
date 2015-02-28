/**
 * Created by I on 2014/10/7.
 */
var mongoose =require("mongoose");
var Schema=mongoose.Schema;
//转换为小写,防止邮箱重复注册..

function toLower(val){
    return val.toLowerCase();
}


var userSchema= mongoose.Schema({

    uname:{type:String},//姓名

    uid:{type:String},//学号

    unickname:{type:String},//昵称

    uemail:{ type:String,set:toLower},//电子邮箱

    upwd:{type:String},//用户密码

    ugroupId:{type:Schema.ObjectId,ref:'group'},//组别

    ugrade:{type:String},//年级

    uheadPic:{type:String,default:"/images/u67.png"},//头像url

    usex:{type:Number},//0：男，1：女

    uscore:{type:Number,default:10},//用户积分，default：10，注册就有十分，一个项目8分，leader10分

    uroll:{type:Number},//0：超级管理员，1：管理员，2：成员，3：申请者

    uregTime:{type:Date,default:Date()},//注册时间

    uskills:[{type:Schema.ObjectId,ref:'skill'}],//用户技能树

    uprojectsAsked:[{type:Schema.ObjectId,ref:'project'}],//用户待审核的项目

    uprojectsTaked:[{type:Schema.ObjectId,ref:'project'}],//用户参与过的项目

    uprojectsTaking:[{type:Schema.ObjectId,ref:'project'}]//用户参与的项目

});
module.exports=mongoose.model("user",userSchema);
