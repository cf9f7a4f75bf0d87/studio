/**
 * Created by I on 2014/10/6.
 */
var mongoose=require('mongoose');
var user=require('./user');
var groups=require('./other').group;
var skills=require('./other').skill;
var projects=require('./other').project;
var studio=require("./studio").studio;
var e_db = require("./e_db");
var tools=require("./small");
var config = require("./config");
//用户登录验证函数..
function checkUser(username,password,callback){
  tools.odb(function(close){
        user.findOne({uname:username},'upwd',function(err,user){
            close();
            if(err){callback(err,null);}
            if(user==null){
                callback('no this user..',null);
            }else{
                console.log('user password is ..'+user.upwd);
                if(password!=user.upwd){
                    callback('password is wrong..',null);
                }else{
                    callback(null,user._id);
                }}})});}

/**
 * 获取用户信息..
 * @param req
 * @param res
 * @param name 所要查询的人的名字..
 * @param route  信息发送路径..
 */
function getInfo(username,callback){
    tools.odb(function(close){
        user.findOne({uname:username},function(err,user){
           tools.return_data(err,user,close,callback);
        });})};
//
//function getInfo(username,callback){
//        user.findOne({uname:username},function(err,user){
//            if(err)  callback(err);
//            if(user==null){
//                //db.close();
//                callback("not find your info..",null);
//            }else{
//                //db.close();
//                callback(null,user)
//            }
//        });
//
//}


/**
 * 返回数据库中 组的名字和对应id
 * 用于初始化某些界面
 * @param callback
 */
function groupInfo(callback){
  tools.odb(function(close) {
      groups.find({}, "gname _id", function (err, data) {
         tools.return_data(err,data,close,callback);
      });});}

/**
 * 获取所有技能..
 * 该部分逻辑已经写入config文件中..
 */
//function getAllSkills(callback){
//    skills.find({},function(err,docs){
//        if(err)callback(err,null);
//        else{
//            callback(null,docs);
//        }
//    })
//}
/**
 *  个人信息编辑..
 * @param _id 用户id
 * @param userId  学号吧..
 * @param userEmail
 * @param userGrade
 * @param userNickName
 * @param callback
 */
function infoEdit(_id,userId,userEmail,userGrade,userNickName,callback){

    tools.odb(function(close){
            console.log(_id+"   " + userEmail + "   " + userId);
        user.update({_id:_id},{$set:{uid:userId,uGrade:userGrade,uEmail:userEmail,unickName:userNickName}},function(err,num){
           tools.update_deal(close,err,num,callback);
        });});}
/**
 * 更改密码..
 * @param _id
 * @param oPwd
 * @param nPwd
 * @param callback
 */
function pwdEdit(_id,oPwd,nPwd,callback){
    tools.odb(function(close){
        user.findOne({_id:_id,upwd:oPwd},function(err,userone){
            if(err || userone == null){
                close();
               callback("your password is not correct..");
            }else{
                user.update({uid:userone.uid},{$set:{upwd:nPwd}},function(err,num){
                    tools.update_deal(close,err,num,callback);
                })}});});}

function getSkill(_id,callback){

        user.findOne({_id: _id}).populate('uskills',"skname -_id").exec(function (err, data) {
            if (err) callback(err, null);
            else {
                if(docs==null) callback("not find..",null);
                callback(null, data);
            }});}

/**
 * 获取用户的技能
 * @param _id
 * @param callback
 */
function userskill(_id,callback){
    tools.odb(function(close){
        user.findOne({_id: _id}).populate('uskills',"skname -_id").exec(function (err, data) {
            console.log(data.uskills);
            var skills = tools.str2arr(data.uskills);
            skills = skills?(skills.each(function(o){return o.skname})):[];
            console.log(skills);
           tools.return_data(err,skills,close,callback);
        });})}
///**
// * 编辑技能树.. 不再使用
// * @param req
// * @param res
// */
//function skillEdit(_id,skills,callback){
//   // skills=skills.toArray();
//    console.log(skills);
//    _id=mongoose.Types.ObjectId(_id);
//    //
//    //user.update({_id:_id},{$addToSet:{uskills:{$each:skills}}},function(err,numAffected,raw){
//                user.update({_id:_id},{$set:{uskills:skills}},function(err,numAffected,raw){
//                    if(err) callback(err);
//                    else if(numAffected == 0){
//                        callback("技能未更新成功..");
//                    }else{
//                        callback(null);
//                    }
//                });
//}

/**
 * 新增自定义技能
 */
function skilladd(skill,callback){
    tools.odb(function(close){
        skills.create({skname:skill,skowners:[]},function(err){
            close();
            config.skill_n2i_init(function(){
                callback(err);
            })})})}
/**
 * 求出新增技能,加入技能列表中;减少的技能,从列表中移除
 */
function skilledit(uid,skills,callback){
    tools.odb(function(close){
        uid     = mongoose.Types.ObjectId(uid);
        user.findOne({_id:uid},{uskills:1},function(err,userone){
            var old_skills = userone.uskills;
            skills = tools.str2arr(skills);
            var add        = skills.uniquelize().each(function(o){return old_skills.contains(o)?null:o});

            skillsadd(add,uid,function(err){
                if(err){console.log(err);}  // 没有处理错误
                else{
                    var del        = old_skills.uniquelize().each(function(o){return skills.contains(o)?null:o});
                    skillsdel(del,uid,function(err){
                        if(err){console.log(err);} // 没有处理错误
                        else{
                            var skills_id = skills.uniquelize().each(function(o){return config.skill_n2i[o];});
                           user.update({_id:uid},{$set:{uskills:skills_id}},function(err,num){
                               tools.update_deal(close,err,num,callback);
                           })}})}});});})}

function skillsadd(add,uid,callback){
    if(add.length>0){
        var addone= add.pop();
        tools.skillin(uid,config.skill_n2i[addone],function(err){
            console.log("error   ( skillsadd ) "+ err);
            skillsadd(add,uid,callback);
        })
    }else{
        //当遍历完毕时 调用回调函数,
        //未保存出错信息, 以后改进
        callback(null);
    }}


function skillsdel(del,uid,callback){
    if(del.length>0){
        var delone= del.pop();
        tools.skillsout(uid,config.skill_n2i[delone],function(err){
            console.log("error   ( skillsdel ) "+ err);
            skillsdel(del,uid,callback);
        })
    }else{
        //当遍历完毕时 调用回调函数,
        //未保存出错信息, 以后改进
        callback(null);
    }}
/**
 * 加入创新组
 * @param username 用户名
 * @param groupId 创新组的id
 * @param content 申请理由
 * @param callback 回调函数..(err, num(1,表示成功))
 */
function joinGroup(username,groupId,content,callback){

    tools.odb(function(close){
        user.findOne({uname: username}, function (err, userone) {
            if (err) {db.close();callback(err)}
            else if (userone == null) {
               close();
                callback(null,"no this user");
            } else if (userone.ugroupId != null) {
                close();
                callback(null,'you have a group');
            } else {
                //var gid=mongoose.Types.ObjectId(groupId);//这个如果是用 自身转换为自身转化赋值的话,会出错..记住咯.
                //console.log(gid);
                console.log(userone._id);
                var uid=mongoose.Types.ObjectId(userone._id);
                console.log(uid);
               studio.update({sname:"RoseOffice"},{$push:{joinMessages:{uid:uid,uname:userone.uname,uemail:userone.uemail,mcontent:content,gid:groupId}}},function(err,num){
                   close();
                   if(err)   callback(err,0);
                   else{
                      console.log(num);
                      callback(null,num);
                  }});}});});}
///**
// * old 废弃..
// * 找出技能相似的人..(貌似只要名字就行)..
// * @param req
// * @param res
// * 思路: 通过用户的技能id数组,找出对应的技能
// * 对于每一个技能,找出其用户组
// * 遍历每一个用户组,把他们的名字存到数组中
// * 将技能名和对应姓名组打包压入data数组..
// * 最后将data数组发给ejs..
// */
//function findSameSkillUser(req,res) {
//    var username = req.session.name;
//    mongoose.connect("mongodb://localhost/studio");
//    var db = mongoose.connection;
//    console.log("find username "+username);
//    db.on('error', console.error.bind(console, 'connection error:******'));
//
//    db.once('open', function () {
//        console.log('mongodb is open..' + username);
//    //    wrap = function(param,cb){
//     //       cbb()
//    //    }
//        user.findOne({uname: username}, function (err, userone) {
//            if (err) return handleError(err);
//            if (userone == null) {
//                db.close();
//                res.render('error', {message: "not find your info.."});
//            }else {
//                //通过技能id找到技能所有者的id
//                console.log(userone.uskills);
//                skills.find({}).where('ID').in(userone.uskills).select('-_id skowners skname').exec(function (err, msg) {
//                    console.log("技能知道的同学" + msg+"  err:"+err);
//                    var query=[];//查询语句数组
//
//                    var data=[];//数据数组..{技能名,[玩家名]}
//                    var names=[];//暂存用户名..数组
//                    msg.forEach(function(one){
//                        query="{'ID':{$in:["+one.skowners+"]}}";
//                        console.log("owner******"+query);
//
////                        user.find({}).where('ID').in("["+one.skowners+"]").select('-_id uname').exec(function(err,docs){
//                        user.find({}).or([query]).select('-_id uname').exec(function(err,docs){
//                            console.log(err + "              "+docs);
//                            docs.forEach(function(doc){
//                                names.push(doc.uname);
//                               // console.log(doc.uname);
//                            });
//                            data.push({skname:one.skname,names:names});
//                            names=[];
//                            console.log(data.length);
//                            if(data.length==msg.length){
//                                db.close();
//                                res.render('skillSame',{data:data});}});
//
//                        //@原计划,所有一次查找..所以组合了字符串..
//                       // queryArray.push("{'ID':{$in:["+one.skowners+"]}}");
//                    });
//
//
////                    //@
////                    var query=queryArray.join(',');
////                    console.log(query);
////                    user.find().or([query]).select('uname -_id').exec(function(err,docs){
////                        console.log(err+"    "+docs);
////                        var nameArray=[];
////                        docs.forEach(function(e){
////                            nameArray.push(e.uname);
////                        });
////
////                        db.close();
////                        res.render('skillSame',{names:nameArray});});
//
//
//              //  });
//                // res.render(route,{userone:user});}});
//                // });}
/**
 * 新版本 志同道合..1117 搞了一下午,我擦,就数据库写错了..
 * @param uid
 * @param callback
 */
function findSameSkillUsers(uid,callback){
   tools.odb(function(close) {
       // skills.find({skowners:id},"skname -_id skowners",function(err,docs){
       skills.find({skowners:uid},{skowners:1,skname:1}).populate("skowners","uname",'user',null,{multi:true}).exec(function(err,data){
           tools.return_data(err, data, close, callback);
       });});}
/**
 * 用户项目信息..
 * @param username
 * @param callback
 * 用户做过的项目,正在做的项目  正在进行的项目..(projects)
 * 传出的数据格式  {正在做的项目的个数,做过的项目的个数,正在招募人员的项目的个数}
 */
function userProjectInfo(username,callback){
       tools.odb(function(close){
            user.findOne({uname: username}, '-_id uprojectsTaked uprojectsTaking', function (err, userone) {
                if (err){
                    close();
                    callback(err,null);
                }
                else if(userone==null)
                {
                    close();
                    callback("no this user..", null);
                }
                else{
                    projects.find({pstaute: 0}).count().exec(function (err, docs) {
                        close();
                        var data = {};
                        data.pTaked = userone.uprojectsTaked.length;
                        data.pTaking = userone.uprojectsTaking.length;
                        data.pGoing = docs;
                        callback(null, data);
                    });}});});}
/**
 * 我的项目..  原始版本
 * @param req
 * @param res
 * 返回项目数组..
 */
//function projectMy(req,res){
//    var username=req.session.name;
//    //var username='test1';
//    mongoose.connect("mongodb://localhost/studio");
//    var db=mongoose.connection;
//    db.on('error',console.error.bind(console,"connection error:"));
//
//    db.once('open',function(){
//        projects.find({pleader:username},function(err,docs){
//            if(err) return handleError(err);
//            else{
//                console.log(docs);
//                var members=[];//将成员的姓名存到数组中..
//                var data=[];//姓名数组+项目信息..
//                docs.forEach(function(doc){
//                    console.log(doc.pmembers);
//                    user.find().where('_id').in(doc.pmembers).select('uname').exec(function(err,users){
//                        users.forEach(function(userone){
//                            members.push(userone.uname);
//                            console.log(userone.uname);
//                        });
//                        data.push({projects:doc,members:members});
//                        members=[];
//                        if(data.length==docs.length){
//
//                            db.close();
//                            return res.render('projectMy',{data:data});
//                        }
//                    });
//                });
//
//            }
//        });
//    });
//
//}
/**
 * 新版本-我的项目
 * @param uname
 * @param uid
 * @param callback
 */
function projectsMy(uname,uid,callback){
   tools.odb(function(close){
       var id=mongoose.Types.ObjectId(uid);
        projects.find({$or:[{pleader:id},{pmembers:id}]}).populate("pleader","uname -_id","user",null).populate("pmembers","uname -_id","user",null).exec(function(err,data){
         tools.return_data(err,data,close,callback);
        })});}

//通过状态查找我的项目
//招募中, 进行中,已完成,已死..
function projectsClass(uid,cls,callback){
   tools.odb(function(close){
       var id = mongoose.Types.ObjectId(uid);
        projects.find({$or:[{pleader:id},{pmembers:id}],pstaute:cls}).populate("pleader","uname -_id","user",null).populate("pmembers","uname -_id","user",null).exec(function(err,data){
           tools.return_data(err,data,close,callback);
        })});}
/*
    用户未审核的项目
 */
function projectsnotcheck(uid,callback){
    tools.odb(function(close){
        user.findOne({_id:uid}).populate("uprojectsAsked").exec(function(err,data){
            tools.return_data(err,(data?data.uprojectsAsked||null:null),close,callback);
        })})}


function findmyprojects(uid,status,callback){
    switch(status){
        case 0:case "0":
            projectsnotcheck(uid,callback);
            break;
        case 1:case "1":
            projectsClass(uid,0,callback);
            break;
        case 2:case "2":
            projectsClass(uid,1,callback);
            break;
        case 3:case "3"://返回的是  状态为 已完成和已死的项目,  调用两次函数,最后回调传出两次的结果叠加
            projectsClass(uid,2,function(err1,data1){if(err1){console.log("(   find my porjects ) :   "+err1)}projectsClass(uid,3,function(err2,data2){if(err2){console.log("(    find my porjects ) :   "+err2)}callback(null,data1||[]+data2||[])});});
            break;
        default :
            callback("not found..",null);
    }}

/*
退出未审核的项目
 */
function quitmyproject(uid,pid,callback){
    tools.odb(function(close){
        console.log(pid+"<<<"+uid);
        studio.findOne({"sprojectMessages.uid":uid,"sprojectMessages.pid":pid},{},function(err,doc){
            if(err){close();callback(err)}
            else if(doc==null){close();callback("不符合要求..")}
            else{
                projects.update({_id:pid},{$pull:{pmembers:uid}},function(err,num){console.log("( quit my project ) "+ err + "<<num  " + num );
                    studio.update({},{$pull:{sprojectMessages:{uid:uid,pid:pid}}},function(err,num){console.log("( quit my project ) "+ err + "<<num  " + num );
                        user.update({_id:uid},{$pull:{uprojectsAsked:pid}},function(err,num){tools.update_deal(close,err,num,callback)});})})}})})}

//退出项目..
function projectQuit(uid,pid,content,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    var id=mongoose.Types.ObjectId(uid);
    pid=mongoose.Types.ObjectId(pid);

    db.on('error',console.error.bind(console,"connection error:"));
    db.once('open',function() {
        studio.update({},{$push:{qProjects:{user:id,project:pid,content:content}}},function(err,num){
            db.close();
            if(err||num!=1){callback(err)}
            else{callback(null)}})});}
/**
 * 获取正在找人的项目列表
 * @param ptype 项目类型
 * @param callback
 */
function projectsList(ptype,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    db.on('error',console.error.bind(console,"connection error:"));
    db.once('open',function(){

       projects.find({pstaute:0,ptype:ptype},function(err,docs){

          if(err) {
              console.log(err);
                callback(err,null);
          }
           else if(docs==null){
             callback(null,null);
          }
          else{
              var members=[];//将成员的姓名存到数组中..
              var data=[];//姓名数组+项目信息..
              console.log("docs"+docs.length    );
              docs.forEach(function(doc){
                  console.log(doc.pmembers);
                  user.find().where('_id').in(doc.pmembers).select('uname').exec(function(err,users){
                      if(err) return callback(err,null);
                      else{
                          console.log("users..");
                          users.forEach(function(userone){
                              members.push(userone.uname);
                              console.log(userone.uname);
                          });
                          data.push({projects:doc,members:members});
                          members=[];
                          if(data.length==docs.length){
                              db.close();
                              callback(null,data);
                          }}});});}});});}

/**
 * 新版--项目列表(正在招募中)
 * @param ptype
 * @param callback
 */
function projectsLists(ptype,callback){
   tools.odb(function(close){
        if(ptype=="all"){
            projects.find({pstaute:0}).populate('pleader','uname -_id','user',null).populate('pmembers','uname -_id',"user",null).exec(function(err,data){
                tools.return_data(err,data,close,callback);
            });
        }else{
            projects.find({pstaute:0,ptype:ptype}).populate('pleader','uname -_id','user',null).populate('pmembers','uname -_id',"user",null).exec(function(err,docs){
                tools.return_data(err,data,close,callback);
            });}});}

/**
 * 加入项目--   传入 个人和项目id,申请说明..
 * @param userid
 * @param pid
 * @param content
 * @param callback
 */
function joinProjects(userid,pid,content,callback){
    userid=mongoose.Types.ObjectId(userid);
    pid=mongoose.Types.ObjectId(pid);
  tools.odb(function(close){
        user.update({_id:userid},{$addToSet:{uprojectsAsked:pid}},function(err,num){
           tools.update_pass(err,num,function(){
                user.findOne({_id:userid},{uname:1,uemail:1},function(err,userone){
                  tools.find_pass(err,userone,function(){
                      studio.update({sname:"RoseOffice"},{$push:{sprojectMessages:{uid:userone._id,uname:userone.uname,uemail:userone.uemail,mcontent:content,pid:pid}}},function(err,num){
                          tools.update_deal(close,err,num,callback);

                   });})})});})});}
/**
 * 用户发送反馈消息..
 * @param username 用户名
 * @param content 内容
 * @param callback 回调函数(err,num(1,成功,其他为错误信息)..
 */
function sendFeedBack(username,content,callback){

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.on('error',console.error.bind(console,'connection error:******'));

    db.once('open',function() {
        console.log('mongodb is open..' + username);

        user.findOne({uname: username}, function (err, userone) {
            if (err) return handleError(err);
            else if (userone == null) {
                db.close();
                callback(null,"no this user");
            }
            else {

                studio.update({sname:"RoseOffice"},{$push:{sfeedbackMessages:{smid:userone._id,uname:userone.uname,uemail:userone.uemail,mcontent:content,reversions:[]}}},function(err,num){
                    db.close();
                    if(err) callback(err,0);
                    else{
                         callback(null,num);
                    }});}});});}


function leaveMsg(uname,email,content,callback){
    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;

    db.once('open',function(){
        studio.update({},{$push:{sleaveMessages:{uname:uname,uemail:email,mcontent:content,reversions:[]}}},function(err,num){
            db.close();
            console.log(err + "  " + num);
            callback(null);
        })})}
function logout(session){
    session.destroy();
}

exports.checkUser= checkUser;
exports.getInfo=getInfo;
exports.infoEdit=infoEdit;
exports.pwdEdit=pwdEdit;
exports.joinGroup=joinGroup;
exports.userProjectInfo=userProjectInfo;
exports.projectsList=projectsList;
exports.sendFeedBack=sendFeedBack;

exports.getSkill=getSkill;
exports.findSameSkillUsers=findSameSkillUsers;
exports.projectsMy=projectsMy;
exports.projectsLists=projectsLists;
exports.groupInfo=groupInfo;
exports.joinProjects=joinProjects;
exports.logout=logout;
exports.leaveMsg=leaveMsg;

exports.userskill    =  userskill;
exports.skilledit    =  skilledit;
exports.skilladd     =  skilladd;


exports.findmyprojects  = findmyprojects;
exports.quitmyproject   = quitmyproject;