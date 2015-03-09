/**
 * Created by I on 2015/2/5.
 */
var mongoose = require("mongoose");
var groups=require('./other').group;
var skills=require('./other').skill;
var projects=require('./other').project;


/*
* ==============关于数据处理部分==============
 */
/**
 *
 * @param err
 * @param res
 * @param data
 */
function json_reply(err,res,data){
    data = data || null;
    if (err) {
        console.log(err);
        res.json({success:0,data:data});
    } else {
        res.json({success:1,data:data});
    }
}

// 更新后的处理..
function update_deal(close,err,num,callback){
    close();
    if(err){console.error(err);callback(err);}
    else if(num!=1){callback("not update..");}
    else {callback(null);}
}
//不关闭数据库,仅为中间处理过程..
function update_pass(err,num,callback){
    if(err){console.log(err);}
    else if(num!=1){console.log("not update..");}
    callback();
}

//这是一个忽略错误的中间函数
//仅将错误信息打印出,但是继续往下执行..
function find_pass(err,data,callback){
    if(err){console.log(err);}
    else if(data==null){console.log("data is empty..");}
    callback();
}
//处理后页面的跳转传值..
function render_deal(err,res,data,path){
    if(err){
        res.render('error',{message:err});
    }else{
        res.render(path,{data:data});
    }
    //这一行作为查看数据用.. 之后需要删除
    console.log(err+ "( render_deal ) "+ data);
}

//处理仅查找数据,然后返回数据的逻辑
function return_data(err,data,close,callback){
    close();
    if(err){callback(err,null);}
    else{callback(null,data)}
    //这一行作为查看数据用.. 之后需要删除
    console.log(err+ "( return_data  ) "+ data);
}

//封装数据库..
function odb(f){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,"connect error"));
    db.once('open',function() {
        f(function(){db.close();});

    });
}

//单个字符串转数组,便于处理
function str2arr(str){
    return (typeof(str)=="string")?[str]:str;
}

/**
 * =========数据库简单操作=====================
 */

/**
 * 从组中删除 某人 | 未打开数据库
 * @param uid
 * @param gid
 * @param callback
 */
function groupout(uid,gid,callback){
    uid = mongoose.Types.ObjectId(uid);
    gid = mongoose.Types.ObjectId(gid);
    groups.update({_id:gid},{$pull:{gmember:uid}},function(err,num){
        console.log(num);
        callback((err)?err:((num==1)?null:null));
    })
}


/**
 * 向组中加入 某人 | 未打开数据库
 * @param uid
 * @param gid
 * @param callback
 */
function groupin(uid,gid,callback){
    uid = mongoose.Types.ObjectId(uid);
    gid = mongoose.Types.ObjectId(gid);
    groups.update({_id:gid},{$addToSet:{gmember:uid}},function(err,num){
        console.log(num);
        callback((err)?err:((num==1)?null:null));
    })
}

/**
 * 从项目中删除 某人 | 未打开数据库
 * @param uid
 * @param pid
 * @param callback
 */
function projectout(uid,pid,callback){
    uid = mongoose.Types.ObjectId(uid);
    pid = mongoose.Types.ObjectId(pid);
    projects.update({_id:pid},{$pull:{pmembers:uid}},function(err,num){
        console.log(num);
        callback((err)?err:((num==1)?null:null));
    })
}


/**
 * 向项目中加入 某人 | 未打开数据库
 * @param uid
 * @param pid
 * @param callback
 */
function projectin(uid,pid,callback){
    uid = mongoose.Types.ObjectId(uid);
    pid = mongoose.Types.ObjectId(pid);
    projects.update({_id:pid},{$addToSet:{pmembers:uid}},function(err,num){
        console.log(num);
        callback((err)?err:((num==1)?null:null));
    })
}

function skillsin(uid,sid,callback){
    uid = mongoose.Types.ObjectId(uid);
    sid = mongoose.Types.ObjectId(sid);
    skills.update({_id:sid},{$addToSet:{skowners:uid}},function(err,num){
        console.log(num);
        callback((err)?err:((num==1)?null:null));
    })
}

function skillsout(uid,sid,callback){
    uid = mongoose.Types.ObjectId(uid);
    sid = mongoose.Types.ObjectId(sid);
    skills.update({_id:sid},{$pull:{skowners:uid}},function(err,num){
        console.log(num);
        callback((err)?err:((num==1)?null:null));
    })
}


/*
定义数组函数
 */

Array.prototype.each = function(fn){
    fn = fn || Function.K;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for(var i = 0; i < this.length; i++){
        var res = fn.apply(this,[this[i],i].concat(args));
        if(res != null) a.push(res);
    }
    return a;
};

/**
 * 得到一个数组不重复的元素集合
 * 唯一化一个数组
 * @returns {Array} 由不重复元素构成的数组
 */
Array.prototype.uniquelize = function(){
    var ra = new Array();
    for(var i = 0; i < this.length; i ++){
        if(!ra.contains(this[i])){
            ra.push(this[i]);
        }
    }
    return ra;
};
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

exports.json_reply      = json_reply;
exports.update_deal     = update_deal;
exports.render_deal     = render_deal;
exports.return_data     = return_data;
exports.odb             = odb;
exports.update_pass     = update_pass;
exports.find_pass       = find_pass;
exports.str2arr         = str2arr;

//   数据库 简单操作
exports.skillin         = skillsin;
exports.skillsout       = skillsout;
