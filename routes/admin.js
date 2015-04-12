/**
 * Created by I on 2014/10/6.
 */
/**
 * Created by I on 2014/10/5.
 */
var express = require('express');
var router = express.Router();
var adminCl=require('../method/adminCl');
var userCl=require('../method/userCl');
var async=require('async');
var mongoose=require('mongoose');
var tools=require('../method/small');
var config = require("../method/config");



/* GET home page. */
router.get('/', function(req, res) {
    //var sname=req.session.sname;
    var sname="RoseOffice";
adminCl.adminData(sname,function(err,data,msg){
    if(err) {
       console.log(err);
        res.render('error',{message:err});
    }
    else if(msg){
        res.render('error',{message:msg});
    }else{
        res.render('aindex',{title:sname,data:data});
    }
});
});
/**
 * 管理员通知界面..
 */
router.get('/tip',function(req,res){
//var sname=req.session.sname;
  var sname="RoseOffice";
  adminCl.adminTips(sname,function(err,data){
      if(err) {
          console.log(err);
          res.render('error',{message:err});
      }
      else{
          res.render('atip',{data:data});
      }
  })
});

/**
 * 游客留言信息处理
 */
router.get('/tip/leaveMsg',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";


adminCl.adminMsg_all(sname,"sleaveMessages",function(err,data){
    if(err) return console.log(err);
    else{
        console.log(data);
        res.render('aleavemsg',{data:data});
    }
})
});
/**
 * 游客留言信息处理..
 * 用ajax..
 */
router.post('/tip/leaveMsgOk',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var msg = req.body.msg;
    adminCl.leavemsg(sname,msg,1,function(err){
        if (err) {
                    console.log(err);
                    //res.json({success:0});
                   res.render("error",{message:err});
       } else {
                  //  res.json({success:1});
            //res.render("ok",{message:"success"});
            res.redirect("leavemsg");
       }
    });
});
router.post('/tip/leaveMsgOkJ',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var msg = req.body["msg[]"];

    adminCl.leavemsg(sname,msg,1,function(err){
        if (err) {
            console.log(err);
            res.json({success:0});
        } else {
              res.json({success:1});
        }
    });
});
//游客留言的拒绝ajax接口..

router.post('/tip/leaveMsgNo',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var msg = req.body.msg;

    adminCl.leavemsg(sname,msg,2,function(err){
        if (err) {
            console.log(err);
            res.json({success:0});
        } else {
            //res.json({success:1});
            res.redirect("leavemsg");
        }
    });
});
router.post('/tip/leaveMsgNoJ',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var msg = req.body["msg[]"];

    adminCl.leavemsg(sname,msg,2,function(err){
        if (err) {
            console.log(err);
            res.json({success:0});
        } else {
            res.json({success:1});
        }
    });
});


//游客留言的删除处理

router.post('/tip/leaveMsgDel',function(req,res){
    var ids=req.body.msg;
    console.log(ids);
    adminCl.leavemsgDel(ids,function(err){
        if (err) {
            console.log(err);
            //res.json({success:0});
            res.render("error",{message:err});
        } else {
            //  res.json({success:1});
            //res.render("ok",{message:"success"});
            res.redirect("leavemsg");
        }
    });
})

router.post('/tip/leaveMsgDelJ',function(req,res){
    var ids=req.body["msg[]"];
    console.log(ids);
    adminCl.leavemsgDel(ids,function(err){
        if (err) {
            console.log(err);
            res.json({success:0});
        } else {
            res.json({success:1});
        }
    });
})

router.post('/tip/leaveMsgC',function(req,res){
    var name=req.body.uname;
    var email=req.body.uemail;
    var content=req.body.content;
    var id=req.body.id;
    adminCl.leavemsgC(name,email,content,id,function(err){
        if (err) {
            console.log(err);
            //res.json({success:0});
            res.render("error",{message:err});
        } else {
            //  res.json({success:1});
            //res.render("ok",{message:"success"});
            res.redirect("leavemsg");
        }
    })
});
//留言的评论删除..
router.post('/tip/leaveMsgCDel',function(req,res){
    var id=req.body.id;
    console.log(id);
    adminCl.leavemsgDelC(id,function(err){
        if (err) {
            console.log(err);
            //res.json({success:0});
            res.render("error",{message:err});
        } else {
            //  res.json({success:1});
            //res.render("ok",{message:"success"});
            res.redirect("leavemsg");
        }
    })
});

//router.post('/tip/leaveMsg',function(req,res){
//    //var sname=req.session.sname;
//    var sname="RoseOffice";
//    var msg=req.body.msg;
//    var msgno=req.body.msgno;
//    var i=0;
//
//    mongoose.connect("mongodb://localhost/studio");
//    var db=mongoose.connection;
//    console.log(sname);
//
//    db.on('error',console.error.bind(console,"connect error:"));
//    db.once('open',function() {
//        if (typeof(msg) == 'object') {
//            async.series([
//                function (callback) {
//                    msg.forEach(function (val) {
//                        adminCl.adminMsgOk(sname, "sleaveMessages", val, 1, function (err) {
//                            console.log("调用一次处理函数..");
//                            //adminCl.adminMsgOki(sname,val,1,function(){
//                            console.log('回调函数..');
//                            if (err) {
//                                callback(err);
//                            } else {
//                                callback(null);
//                            }
//                        });
//                    });
//                }
//
//            ], function (err) {
//                i++;
//                if (err) console.log(err);
//                if (i == msg.length) {
//                    db.close();
//                    res.redirect('/admin/tip/leaveMsg');
//                }
//            });
//        } else if (typeof(msg) == 'string') {
//            adminCl.adminMsgOk(sname, "sleaveMessages", msg, 1, function (err) {
//                if (err) {
//                    console.log(err);
//                    db.close();
//                    res.render("error", {message: err});
//                } else {
//                    db.close();
//                    res.render('ok', {message: "审核成功.."});
//                }
//
//            });
//        }
//        //拒绝消息的处理..
//        else if (typeof(msgno) == 'object') {
//            async.series([
//                function (callback) {
//                    msgno.forEach(function (val) {
//                        adminCl.adminMsgOk(sname, "sleaveMessages", val, 2, function (err) {
//                            console.log("调用一次处理函数..");
//                            //adminCl.adminmsgnoOki(sname,val,1,function(){
//                            console.log('回调函数..');
//                            if (err) {
//                                callback(err);
//                            } else {
//                                callback(null);
//                            }
//                        });
//                    });
//                }
//
//            ], function (err) {
//                i++;
//                if (err) console.log(err);
//                if (i == msgno.length) {
//                    db.close();
//                    res.redirect('/admin/tip/leaveMsg');
//                }
//            });
//        } else if (typeof(msgno) == 'string') {
//            adminCl.adminMsgOk(sname, "sleaveMessages", msgno, 2, function (err) {
//                if (err) {
//                    console.log(err);
//                    db.close();
//                    res.render("error", {message: err});
//                } else {
//                    db.close();
//                    res.render('ok', {message: "审核成功.."});
//                }
//
//            });
//        } else {
//            db.close();
//            res.render('error', {message: "未选择任何项.."});
//        }
//    });
//});

/*
*新成员反馈处理
* time 1/17
*
* */
router.get('/tip/feedback',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";

    adminCl.adminMsg_all(sname,"sfeedbackMessages",function(err,data){
        if(err) return console.log(err);
        else{
            console.log(data);
            res.render('afeedback',{data:data});
        }
    })
});
//成员反馈- 删除成员留言
router.post('/tip/feedbackDelJ',function(req,res) {
    var ids = req.body["msg[]"];
    console.log('test for feedback ids..');
    console.log(ids);
    console.log(req.body);
    adminCl.feedbackmsgDel(ids, function (err) {

        if (err) {
            console.log(err);
            res.json({success:0});
        } else {
            res.json({success:1});
        }
    })
});
router.post('/tip/feedbackDel',function(req,res) {
    var ids = req.body.msg;
    console.log(ids);
    adminCl.feedbackmsgDel(ids, function (err) {
        if (err) {
            console.log(err);
            //res.json({success:0});
            res.render("error", {message: err});
        } else {
            //  res.json({success:1});
            //res.render("ok",{message:"success"});
            res.redirect("feedback");
        }

    })
});

//成员反馈-添加回复
router.post('/tip/feedbackC',function(req,res){
    var name=req.body.uname;
    var email=req.body.uemail;
    var content=req.body.content;
    var id=req.body.id;
    adminCl.feedbackmsgC(name,email,content,id,function(err){
        if (err) {
            console.log(err);
            //res.json({success:0});
            res.render("error",{message:err});
        } else {
            //  res.json({success:1});
            //res.render("ok",{message:"success"});
            res.redirect("feedback");
        }
    })
});
//成员反馈- 删除回复
router.post('/tip/feedbackCDel',function(req,res){
    var id=req.body.id;
    adminCl.feedbackmsgDelC(id,function(err){
        if (err) {
            console.log(err);
            //res.json({success:0});
            res.render("error",{message:err});
        } else {
            //  res.json({success:1});
            //res.render("ok",{message:"success"});
            res.redirect("feedback");
        }
    })
});

 /**
 * 成员反馈界面 - old
 */
//router.get('/tip/feedback',function(req,res){
//    //var sname=req.session.sname;
//    var sname="RoseOffice";
//    adminCl.adminMsg(sname,"sfeedbackMessages",0,function(err,data){
//        if(err) return console.log(err);
//        else{
//            res.render('afeedback',{data:data});
//
//        }
//    })
//});

/**
 * 成员反馈处理界面..过期
 */
/*
router.post('/tip/feedback',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    var msg=req.body.msg;
    var msgno=req.body.msgno;
    var i=0;

    mongoose.connect("mongodb://localhost/studio");
    var db=mongoose.connection;
    console.log(sname);

    db.on('error',console.error.bind(console,"connect error:"));
    db.once('open',function() {
        if (typeof(msg) == 'object') {
            async.series([
                function (callback) {
                    msg.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sfeedbackMessages", val, 1, function (err) {
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }
            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msg.length) {
                    db.close();
                    res.redirect('/admin/tip/feedback');
                }
            });
        } else if (typeof(msg) == 'string') {
            adminCl.adminMsgOk(sname, "sfeedbackMessages", msg, 1, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        }
        //拒绝消息的处理..
        else if (typeof(msgno) == 'object') {
            async.series([
                function (callback) {
                    msgno.forEach(function (val) {
                        adminCl.adminMsgOk(sname, "sfeedbackMessages", val, 2, function (err) {
                            console.log("调用一次处理函数..");
                            //adminCl.adminmsgnoOki(sname,val,1,function(){
                            console.log('回调函数..');
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });
                    });
                }

            ], function (err) {
                i++;
                if (err) console.log(err);
                if (i == msgno.length) {
                    db.close();
                    res.redirect('/admin/tip/leaveMsg');
                }
            });
        } else if (typeof(msgno) == 'string') {
            adminCl.adminMsgOk(sname, "sfeedbackMessages", msgno, 2, function (err) {
                if (err) {
                    console.log(err);
                    db.close();
                    res.render("error", {message: err});
                } else {
                    db.close();
                    res.render('ok', {message: "审核成功.."});
                }

            });
        } else {
            db.close();
            res.render('error', {message: "未选择任何项.."});
        }

    });
});
*/

/**
 * 加入创新组信息处理界面
 */
router.get('/tip/joinMsg',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.joingroupmsg(sname,function(err,data){
        if(err) {console.log(err);res.render('error',{message:err});}
        else{
            console.log(data);
            console.log(typeof(data[0]._id));
            res.render('ajoinmsg',{data:data});
        }
    })
});

//旧版本,处理两种情况..
/*
router.post('/tip/joinMsg',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";

    var msg = req.body.msg;
    var msgno = req.body.msgno;

    adminCl.joingroupEx(sname,msg,1,function(err){
        if(err){
            console.log(err);
            res.render("error",{message:err});
        }else{
            adminCl.joingroupEx(sname,msgno,2,function(err){
                if(err){
                    console.log(err);
                    res.render("error",{message:err});
                }else{
                    res.redirect("tip/");
                }
            })
        }
    })
});*/

//同意加入 - ajax 接口
router.post('/tip/joinMsgOkJ',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    if(typeof(req.body.msg)=='undefined'){
        var msg=req.body["msg[]"];
    }else{
        var msg = req.body.msg;
    }

    adminCl.joingroupEx(sname,msg,1,function(err){
        if(err){
            console.log(err);
            res.json({success:0});
        }else{
            res.json({success:1});
        }
    })
});
//不同意加入 - ajax 接口
router.post('/tip/joinMsgNoJ',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    if(typeof(req.body.msg)=='undefined'){
        var msg=req.body["msg[]"];
    }else{
        var msg = req.body.msg;
    }
    adminCl.joingroupEx(sname,msg,2,function(err){
        if(err){
            console.log(err);
            res.json({success:0});
        }else{
            res.json({success:1});
        }
    })
});



//router.post('/tip/joinMsg',function(req,res) {
//    //var sname=req.session.sname;
//    var sname = "RoseOffice";
//
//    var msg=req.body.msg;
//    var msgno=req.body.msgno;
//    var i=0;
//
//    mongoose.connect("mongodb://localhost/studio");
//    var db=mongoose.connection;
//
//    db.on('error',console.error.bind(console,"connect error:"));
//    db.once('open',function() {
//        if (typeof(msg) == 'object') {
//            async.series([
//                function (callback) {
//                    msg.forEach(function (val) {
//                        adminCl.adminMsgOk(sname, "joinMessages", val, 1, function (err) {
//                            console.log('回调函数..');
//                            if (err) {
//                                callback(err);
//                            } else {
//                                callback(null);
//                            }
//                        });
//                    });
//                }
//            ], function (err) {
//                i++;
//                if (err) console.log(err);
//                if (i == msg.length) {
//                    db.close();
//                    res.redirect('/admin/tip/joinMsg');
//                }
//            });
//        } else if (typeof(msg) == 'string') {
//            adminCl.adminMsgOk(sname, "joinMessages", msg, 1, function (err) {
//                if (err) {
//                    console.log(err);
//                    db.close();
//                    res.render("error", {message: err});
//                } else {
//                    db.close();
//                    res.render('ok', {message: "审核成功.."});
//                }
//
//            });
//        }
//        //拒绝消息的处理..
//        else if (typeof(msgno) == 'object') {
//            async.series([
//                function (callback) {
//                    msgno.forEach(function (val) {
//                        adminCl.adminMsgOk(sname, "joinMessages", val, 2, function (err) {
//                            console.log("调用一次处理函数..");
//                            //adminCl.adminmsgnoOki(sname,val,1,function(){
//                            console.log('回调函数..');
//                            if (err) {
//                                callback(err);
//                            } else {
//                                callback(null);
//                            }
//                        });
//                    });
//                }
//
//            ], function (err) {
//                i++;
//                if (err) console.log(err);
//                if (i == msgno.length) {
//                    db.close();
//                    res.redirect('/admin/tip/joinMsg');
//                }
//            });
//        } else if (typeof(msgno) == 'string') {
//            adminCl.adminMsgOk(sname, "joinMessages", msgno, 2, function (err) {
//                if (err) {
//                    console.log(err);
//                    db.close();
//                    res.render("error", {message: err});
//                } else {
//                    db.close();
//                    res.render('ok', {message: "审核成功.."});
//                }
//
//            });
//        } else {
//            db.close();
//            res.render('error', {message: "未选择任何项.."});
//        }
//
//    });
//
//});
/**
 * 项目申请处理界面..
 */
router.get('/tip/projectMsg',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.projectsmsg(sname,function(err,data){
        if(err)  {console.log(err);res.render('error',{message:err})}
        else{
            console.log(data);
            res.render('apromsg',{data:data});
        }
    })
});

/**
 * 項目申請 -- 0120
 */

//同意加入 - ajax 接口
router.post('/tip/projectMsgOkJ',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var msg=null;
    if(typeof(req.body.msg)=='undefined'){
         msg=req.body["msg[]"];
    }else{
         msg = req.body.msg;
    }
    if(msg==null || typeof(msg)=='undefined'|| msg==""){
        console.log("msg 为空值 .. ");
        res.json({success:"error: msg is null"});
    }else{
        console.log(msg+"*****");
        adminCl.projectmsgDeal(sname,msg,1,function(err){
            if(err){
                console.log(err);
                res.json({success:0});
            }else{
                res.json({success:1});
            }
        })
    }

});
//不同意加入 - ajax 接口
router.post('/tip/projectMsgNoJ',function(req,res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var msg=null;
    if(typeof(req.body.msg)=='undefined'){
         msg=req.body["msg[]"];
    }else{
         msg = req.body.msg;
    }
    if(msg==null || typeof(msg)=='undefined'|| msg==""){
        console.log("msg 为空值 .. ");
        res.json({success:"error: msg is null"});
    }else{
        console.log(msg+"*****");
    adminCl.projectmsgDeal(sname,msg,0,function(err){
        if(err){
            console.log(err);
            res.json({success:0});
        }else{
            res.json({success:1});
        }
    })}
});




/**
 * 项目申请处理界面..  -  old
 *
// */
//router.get('/tip/projectMsg',function(req,res) {
////var sname=req.session.sname;
//    var sname = "RoseOffice";
//
//    var msg=req.body.msg;
//    var msgno=req.body.msgno;
//    var i=0;
//
//    mongoose.connect("mongodb://localhost/studio");
//    var db=mongoose.connection;
//    console.log(sname);
//
//    db.on('error',console.error.bind(console,"connect error:"));
//    db.once('open',function() {
//        if (typeof(msg) == 'object') {
//            async.series([
//                function (callback) {
//                    msg.forEach(function (val) {
//                        adminCl.adminMsgOk(sname, "sprojectMessages", val, 1, function (err) {
//                            console.log('回调函数..');
//                            if (err) {
//                                callback(err);
//                            } else {
//                                callback(null);
//                            }
//                        });
//                    });
//                }
//            ], function (err) {
//                i++;
//                if (err) console.log(err);
//                if (i == msg.length) {
//                    db.close();
//                    res.redirect('/admin/tip/joinMsg');
//                }
//            });
//        } else if (typeof(msg) == 'string') {
//            adminCl.adminMsgOk(sname, "sprojectMessages", msg, 1, function (err) {
//                if (err) {
//                    console.log(err);
//                    db.close();
//                    res.render("error", {message: err});
//                } else {
//                    db.close();
//                    res.render('ok', {message: "审核成功.."});
//                }
//
//            });
//        }
//        //拒绝消息的处理..
//        else if (typeof(msgno) == 'object') {
//            async.series([
//                function (callback) {
//                    msgno.forEach(function (val) {
//                        adminCl.adminMsgOk(sname, "sprojectMessages", val, 2, function (err) {
//                            console.log("调用一次处理函数..");
//                            //adminCl.adminmsgnoOki(sname,val,1,function(){
//                            console.log('回调函数..');
//                            if (err) {
//                                callback(err);
//                            } else {
//                                callback(null);
//                            }
//                        });
//                    });
//                }
//
//            ], function (err) {
//                i++;
//                if (err) console.log(err);
//                if (i == msgno.length) {
//                    db.close();
//                    res.redirect('/admin/tip/joinMsg');
//                }
//            });
//        } else if (typeof(msgno) == 'string') {
//            adminCl.adminMsgOk(sname, "sprojectMessages", msgno, 2, function (err) {
//                if (err) {
//                    console.log(err);
//                    db.close();
//                    res.render("error", {message: err});
//                } else {
//                    db.close();
//                    res.render('ok', {message: "审核成功.."});
//                }
//
//            });
//        } else {
//            db.close();
//            res.render('error', {message: "未选择任何项.."});
//        }
//
//    });
//

//});
//**************************发布模块********************************88

/**
 * 发布信息统计..
 */
router.get('/sendout/',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.teamData(sname,function(err,data){
        if(err){
            res.render('error',{message:err});
        }else{

            res.render('ateamdata',{data:data});
        }
    });

});

/**
 * 团队介绍
 */
router.get('/sendout/teaminfo',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.teamInfo(sname,function(err,data){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('ateaminfo',{data:data});
        }
    });

});
/**
 * 编辑工作室基本信息..
 */
router.post('/sendout/infoEdit',function(req,res){
    if(req.body.sname==null||req.body.sname==""||req.body.semail==null||req.body.semail==""||req.body.scontent==null||req.body.scontent==""||req.body.teacher==null||req.body.teacher==""||req.body.leader==null||req.body.leader==""||req.body.stel==null||req.body.stel==""||req.body.saddress==null||req.body.saddress==""){
        console.log("参数不完整..");
        res.json({"success":0})
    }else{
        adminCl.teamInfoEdit(req.body.sname,req.body.scontent,req.body.teacher,req.body.leader,req.body.stel,req.body.semail,req.body.saddress,function(err){
            if(err){
                console.error(err);
                res.json({"success":"0"});
            }else{
                res.json({"success":"1"});
            }
        })
    }
})
/**
 * 编辑团队文化
 */
router.post('/sendout/editCulture',function(req,res){
   adminCl.editculture(req.body.cid,req.body.title,req.body.content,function(err){
       if(err){
           console.error(err);
           res.json({"success":"0"});
       }else{
           res.json({"success":"1"});
       }
   });
});
/**
 * 添加团队文化..
 */
router.post('/sendout/addCulture',function(req,res){
   adminCl.addculture(req.body.title,req.body.content,function(err){tools.json_reply(err,res)});
});
/**
 * 删除团队文化
 */
router.post('/sendout/delCulture',function(req,res){
    adminCl.delculture(req.body.cid,function(err){tools.json_reply(err,res)});
});

/**
 * 组织信息发布..
 * 需要设计数据库..
 */
router.get('/sendout/teaminfos',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";

    adminCl.teamInfoSendout(sname,function(err,data){
        if(err){
            res.render('error',{message:err});
        }else{
                    console.log(data);
            res.render('ateaminfos',{data:data});
        }
    });

});

/**
 * 组织信息发布..
 * 后台更新
 */
router.post('/sendout/addMsg',function(req,res){

    var group   = req.body.group;
    var leader  = req.body.leader;
    var content = req.body.content;
    var pic     = req.body.pic || "..";
    var date    = req.body.date;

    adminCl.addmsg(group,leader,content,pic,date,function(err,data){tools.json_reply(err,res,data);});
});

/**
 * 组织信息发布..
 * 修改
 */
router.post('/sendout/editMsg',function(req,res){

    var group   = req.body.group;
    var leader  = req.body.leader;
    var content = req.body.content;
    var pic     = req.body.pic || "..";
    var date    = req.body.date;
    var cid     = req.body.cid;

    adminCl.editmsg(cid,group,leader,content,pic,date,function(err){tools.json_reply(err,res);});
});

/**
 * 组织信息发布..
 * 删除
 */
router.post('/sendout/delMsg',function(req,res){
    var cid     = req.body.cid;
    adminCl.delmsg(cid,function(err){tools.json_reply(err,res);});
});
/**
 * 发布新闻...
 */
router.get('/sendout/news',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.newsInfo(function(err,data){tools.render_deal(err,res,data,"anews") });
});

router.post("/sendout/addNews",function(req,res){
    adminCl.addnews(req.body.title,req.body.publisher,req.body.content,req.body.pic||"",function(err,data){tools.json_reply(err,res,data);})
})

router.post("/sendout/editNews",function(req,res){
    adminCl.editnews(req.body.cid,req.body.title,req.body.publisher,req.body.content,req.body.pic||"",function(err){tools.json_reply(err,res);})
})

router.post("/sendout/delNews",function(req,res){
    adminCl.delnews(req.body.cid,function(err){tools.json_reply(err,res);})
})


/**
 * 大事件发布
 */
router.get('/sendout/events',function(req,res){
    //var sname=req.session.sname;
    var sname="RoseOffice";
    adminCl.eventsInfo(function(err,data){
        if(err){
            res.render('error',{message:err});
        }else{
            res.render('aevent',{data:data});
        }
    });
});

router.post("/sendout/addEvent",function(req,res){
    adminCl.addevent(req.body.title,req.body.content,req.body.pics||req.body["pics[]"],req.body.time,function(err,data){tools.json_reply(err,res,data);})
});

router.post("/sendout/editEvent",function(req,res){
    adminCl.editevent(req.body.cid,req.body.title,req.body.content,req.body.pics||req.body["pics[]"],req.body.time,function(err){tools.json_reply(err,res)})
});

router.post("/sendout/delEvent",function(req,res){
    adminCl.delevent(req.body.cid,function(err){tools.json_reply(err,res)})
});



//成果的发布..
router.get('/sendout/achievements',function(req,res){
    adminCl.acInfo(function(err,data){tools.render_deal(err,res,data,"aachievements"); });
});

router.post("/sendout/addAchievement",function(req,res){
    adminCl.addachievement(req.body.title,req.body.content,req.body.pic,req.body.time,function(err,data){tools.json_reply(err,res,data);});
})

router.post("/sendout/editAchievement",function(req,res){
    adminCl.editachievement(req.body.cid,req.body.title,req.body.content,req.body.pic,req.body.time,function(err,data){tools.json_reply(err,res,data);});
})

router.post("/sendout/delAchievement",function(req,res){
    adminCl.delachievement(req.body.cid,function(err){tools.json_reply(err,res);});
})


//榜样的发布..
router.get('/sendout/examples',function(req,res){
    adminCl.exampleInfo(function(err,data){tools.render_deal(err,res,data,"aexample");});
});

router.post("/sendout/addExample",function(req,res){
    adminCl.addexample(req.body.title,req.body.content,req.body.pic,req.body.time,function(err,data){tools.json_reply(err,res,data);});
})

router.post("/sendout/editExample",function(req,res){
    adminCl.editexample(req.body.cid,req.body.title,req.body.content,req.body.pic,req.body.time,function(err,data){tools.json_reply(err,res,data);});
})

router.post("/sendout/delExample",function(req,res){
    adminCl.delexample(req.body.cid,function(err){tools.json_reply(err,res);});
})


//项目的发布..
router.get('/sendout/projects',function(req,res){
    adminCl.projectInfo(function(err,data){tools.render_deal(err,res,data,"aprojects");});
});

router.post('/sendout/projects',function(req,res){
    var status =req.body.status||null;
    var type   = req.body.type||null;
    if(!status||!type){
        res.json({success:0,data:[]});
    }
    else if(status=="all"&&type=="all"){
        adminCl.projectInfo(function(err,data){tools.json_reply(err,res,data)});
    }else if( status=="all"&&type){
        adminCl.projectbytype(type,function(err,data){tools.json_reply(err,res,data)})
    }else if( type=="all"&&status){
        adminCl.projectbystatus(status,function(err,data){tools.json_reply(err,res,data)})
    }else{
        adminCl.projectbytypestatus(type,status,function(err,data){tools.json_reply(err,res,data)});
    }
});


router.post("/sendout/projectAdd",function(req,res) {
    var title = req.body.title;
    var content = req.body.content;

    var type = req.body.type;
    var status = req.body.status;
    var members = req.body.members||req.body["members[]"]||[];
    var docs= req.body.docs||req.body["docs[]"]||[];

    adminCl.addproject(title,content,type,status,tools.str2arr(members).each(function(o){return config.user_n2i[o]||null}),tools.str2arr(docs),function(err,data){
        tools.json_reply(err,res,data);
    })
});

router.post("/sendout/projectEdit",function(req,res) {
    var pid = req.body.pid;
    var title = req.body.title;
    var content = req.body.content;

    var type = req.body.type||-1;
    var status = req.body.status;
    var members = req.body.members||req.body["members[]"]||[];
    var docs= req.body.docs||req.body["docs[]"]||[];


    switch(type){
        case 0:case 1:case "0":case "1":
        adminCl.editproject(pid,title,content,type,status,tools.str2arr(members).each(function(o){return config.user_n2i[o]||null}),tools.str2arr(docs),function(err,data){
            tools.json_reply(err,res,data);
        });break;
        case 2:case 3:case "2":case "3":
        adminCl.endproject(pid,title,content,type,status,tools.str2arr(members).each(function(o){return config.user_n2i[o]||null}),tools.str2arr(docs),function(err,data){
            tools.json_reply(err,res,data);
        });break;
        default :
            res.json({success:0});
    }
});

router.post("/sendout/projectDel",function(req,res){
    var pid = req.body.pid||null;
    adminCl.delproject(pid,function(err){tools.json_reply(err,res)});
})

//通过姓名查找id..
router.post("/findId",function(req,res){
    var name = req.body.name||null;
    tools.odb(function(close){
        if(name){
            user.findOne({uname:name},{_id:1},function(err,data){
                console.log(err+"  " +data);
                res.json(data);
                close();
            })
        }else{
            res.json({_id:null});
        }
    })
})
//***************人员模块**********************

router.get('/people',function(req,res){
//   var sname=req.session.sname;
     var sname="RoseOffice";
    adminCl.peopleNum(sname,function(err,data){
        if(err)res.render("error",{message:err});
        else res.render('apeopleNum',{data:data});
    });
});


router.get('/people/allgroup', function(req, res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var pagesize =3;
    //var pagenow=req.body.pagenow;
    //var group=req.body.group;
    var pagenow=0;
    var group="all";
    adminCl.peopleInfo(sname,group,pagesize,pagenow,function(err,docs){
          if(err){res.render('error',{message:err})}
          else{
              res.render('group',{data:docs});
          }
    });

});

router.get("/people/peopleInfo",function(req,res){
    var pagesize = 3;
    var pagenow = (req.query.now<10||req.query.now>=0)?req.query.now:0;
    adminCl.peopleinfoall(pagesize,pagenow,function(err,data){
        tools.render_deal(err,res,data,"apeopleall");})
})

router.post("/people/infoEdit",function(req,res){
    adminCl.setpeopleinfo(req.body.cid,req.body.name,req.body.uid,req.body.email,req.body.gname,req.body.roll,req.body.grade,req.body.score,function(err){
        tools.json_reply(err,res);
    })
})
router.get('/people/adduser', function(req, res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    userCl.groupInfo(function(err,data){
        if(err){res.render("error",{message:err})}
        else{
            res.render('aadduser',{data:data});
        }
    })
});

router.post('/people/adduser', function(req, res) {
    //var sname=req.session.sname;
    var sname = "RoseOffice";
    var username=req.body.username;
    var uid = req.body.uid;
    var password=req.body.password;
    var email=req.body.email;
    var group=req.body.group;
    var role=req.body.role;
    var grade=req.body.grade;
    var sex=req.body.sex;
    var headPic="head.ico";
    adminCl.addUser(sname,username,uid,email,group,grade,headPic,sex,role,password,function(err){
        if(err){res.render('error',{message:err})}
        else{
            res.render('ok',{message:"add user success"});
        }
    });

});

router.get("/people/find",function(req,res){
    tools.render_deal(null,res,{group_name:config.group_name,skill_name:config.skill_name},"findpeople");
});

router.post("/people/find",function(req,res){
    adminCl.findPeople(req.body.skills||(req.body["skills[]"]?req.body["skills[]"].each(function(o){return config.skill_n2i[o]}):[]),req.body.group||null,req.body.grade||null,req.body.name||null,function(err,data){tools.json_reply(err,res,data)})
})

router.get('/index', function(req, res) {
    res.redirect("/admin/");
});


//*********测试用**************

router.get('/test',function(req,res){
//    mongoose.connect('mongodb://localhost/studio');
//    var db=mongoose.connection;
//    var Schema=mongoose.Schema;
//    var user=require('../method/user.js');
//    var projects= require('../method/other.js').project;
//    var studio = require('../method/studio.js').studio;
//    db.on('error',console.error.bind(console,"connect error.."));
//    db.once('open',function(){
////    var leader=new user({_id:"5437ce8a1cd44a881e78e118"});
////        console.log(leader);
//////
//        var id=mongoose.Types.ObjectId("5437ce8a1cd44a881e78e120");
//        studio.update({},{$push:{"sleader":{_id:id}}},function(err,num){
//            db.close();
//            console.log(err+"   " + num);
//
//        })
//
//
////        projects.findOne().populate('pleader').select('pleader').exec(function(err,doc){
////                db.close();
////            console.log("******");
////            if(err) console.log(err);
////            else console.log(doc);
////        })
//    });
    var sname="RoseOffice";
//    adminCl.addUser(sname,"aaa4","222","dd@q.com","5437c5fe229fe3981c6135dc","13","aa.pci",0,10,"aaa",function(err){
//        if(err)console.log(err);
//        else{
//            console.log("***************3");
//        }
//    });
//    adminCl.editUser(sname,"5466a80bcf375ba413076ace","aaa","333","aaa","dd@q.com","5437c5fe229fe3981c6135e5","13","aa.pci",0,10,0,["5437cc4eaa84a5141a2853cb"],function(err){
//        if(err)console.log(err);
//        else{
//            console.log("***************");
//        }
//    });
    //删除用户设置..
//    adminCl.removeUser(sname,"546621a965e516781b91a2c6",function(err){
//        console.log("(***********************)");
//        console.log(err);
//        console.log("(*****************************)");
//    })
    adminCl.findPeople(sname,["5437cc4eaa84a5141a2853cb"],"5437c5fe229fe3981c6135e5","13","user",function(err,data){
        console.log(err+ " *** " + data.length);
    });
    res.end();
});

/**
 * 登录模块了。。
 */

router.get("/login",function(req,res){
    res.render('login', { title: 'ADlogin'});
})

router.post("/login",function(req,res){
    if(req.session.pass=="ad_ok"){
        res.render('aindex',{title:req.session.name});
    }else{
        var username=req.body.username;
        var password=req.body.password;
        adminCl.checkUser(username,password,function(err,_id){
            if(err) res.redirect("/admin/login?err="+err);
            else{
                req.session.name=username;
                req.session._id=_id;
                req.session.pass="ad_ok";
                req.session.control = true;
                res.redirect("/admin/")
            }
        });

    }
});

router.get("/logout",function(req,res){
    req.session.destroy();
    res.writeHead(302, {'Location': '/user/login'});
    res.end();
});
router.get("/logout",function(req,res){
    req.session.destroy();
    res.json({logout:"ok"});
    res.end();
});

module.exports = router;
