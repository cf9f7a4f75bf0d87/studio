/**
 * Created by I on 2014/12/7.
 * 測試的 路由文件。。
 */
var express = require('express');
var router = express.Router();
var test = require('../method/test');
var service = require('../method/service');
var adminCl = require("../method/adminCl");
var user = require("../method/user");
//var formidable = require("formidable");
var tools = require("../method/small");
var config = require("../method/config");


router.get("/:id/show",function(req,res){
    if(req.params.id == "3" || req.params.id==3){
       return req.flash('info',"aaa");
    }
    console.log(req.query);
    console.log(req.params);
    res.end();
})
router.get("/2temp/:id",function(req,res){
    console.log("2temp  " + req.query.id);
    tools.render_deal(null,res,null,"tmp");
})
router.delete("/2temp/:id",function(req,res){
    console.log("del"+req.params.id);
    tools.json_reply(null,res,"del")
})

router.post("/2temp/:id",function(req,res){
    console.log("pst"+req.params.id);
    tools.json_reply(null,res,"POST")
})


router.put("/2temp/:id",function(req,res){
    console.log("put"+req.params.id);
    tools.json_reply(null,res,"put")
})

router.get('/json',function(req,res){
    res.render('test',{});
});

router.post("/aa",function(req,res){
    console.log(req.body.msg);
    res.json({"ok":"true"});
})
router.post('/json',function(req,res){
    var data = req.body.uname;
    console.log(data);
    res.json({"message":"hello"});
});

//創建一個組。。
//值已經寫入代碼中。。
router.get('/creategroup',function(req,res){
    test.addGroup({gname:"test",gcontent:"for test",gbackgroundPic:"1.pic",gmember:[]},function(err){
        console.log(err);
        res.end();
    })
});


//創建項目接口。。
// get ti=?? -- title 項目名稱。。
router.get('/createProject',function(req,res){
    console.log(req.query);
    console.log(req.query.ti);
    if(typeof(req.query.ti)!='undefined'){
        test.addProject({ptitle:req.query.ti,pmembers:[],pdocs:[],ptime:Date()},function(err){
            console.log(err);
            res.end();
        })
    }
    else{
        res.json({hello:1});
    }

})
router.get('/simple',function(req,res){
   test.simple();
    res.end();
});

router.get('/test',function(req,res){
    var id= "5492d8a5d06e1084170a3e61";
        adminCl.leavemsgDelC(id,function(err){
        res.end();
   });

   // adminCl.leavemsgC("aaa","sss@qq.com","daisiki","5492cd445552f460143192c5",function(err){
    //    res.end();
    //})
});
router.get('/testFunction',function(req,res){
    var sname="RoseOffice";
    var msid="54cb672dc609b5e005841970";
    adminCl.projectmsgStringYes(sname,msid,function(err){
        console.log(err);
        console.log(err.sprojectMessages[0].uid);
        console.log(err.sprojectMessages[0].pid);

        res.end();
    })

})

router.get('/addculture',function(req,res){
    var title=req.query.t;
    if(title!=null||title!=""){
        adminCl.addculture(title,"for test..",function(err){
            console.log(err);
            res.end();
        })
    }
    else{
        res.json({error:1});
    }
})

router.get('/delculture',function(req,res){
    var cid="54d453531cfcb324084327c0";
    adminCl.delculture(cid,function(err){console.log(err);res.json({ok:1})});
})

router.get('/isodate',function(req,res){
    res.render('isodate',{});
})

router.get("/addmsg",function(req,res){
    var group=req.query.q;
    adminCl.addmsg(group,"aa","aa","aa","aa",function(err){console.log(err);res.end();})
})

router.get("/getid",function(req,res){
    adminCl.addmsgt("aaa","ssss","sss","sss","aa",function(err){
        res.end();
    })
})

router.get("/writefile",function(req,res){
    fs.writeFile(path.join(__dirname,"1.hel"),"hello world",function(err){if(err){console.log(err);}})
});

router.post("/uploads",function(req,res){
    console.log("test.");

    var path=req.files.file.path;
    console.log(typeof(path));
    path=path.replace(/public/,"");
    console.log(path);
    res.json({path:path});
})

router.get("/file",function(req,res){
    var fs=require("fs");

    fs.rename("C:/1.txt","2.txt",function(err){
        console.log(err);
    })
    res.end();
})

router.get("/uploads",function(req,res){
    res.render("upload",{});
})


router.get("/find",function(req,res){
    var name = req.query.n||null;
    console.log(name);
    tools.odb(function(close){
        if(name){
            user.findOne({uname:name},{_id:1},function(err,data){
                console.log(err+"  " +data);
                res.json(data);
                close();
            })
        }else{
            res.json({ok:0});
        }
    })
})

router.get("/n2i",function(req,res){
    res.json({data:config.skill_n2i,data2:config.group_n2i});
})

router.get("/arrayCha",function(req,res){
    var a=[1,2,3];
    var b= [2,1,5,6];
    test.arrayCha(a,b,function(err){
        res.end();
    })
})

//  user.find({uskills:{$in:skills},ugroupId:ugroup,ugrade:grade,uname:new RegExp(name,'i')},function(err,docs){
router.get("/one_test",function(req,res){
    tools.odb(function(close){
      //  user.find({uname:new RegExp(req.query.name,'i')},function(err,data){  //可以实现正则查找   含有name的条目都会被找出来
        var skills = ["skill4","skill7"];
        //cc4 cf7
        //cd5 cc
        var skills_id  = skills.each(function(o){return config.skill_n2i[o]})
        user.find({uskills:{$in:skills_id}},function(err,data){//$in  的意思   大概是   $in:[1,2]  可以匹配 [1],[2],[1,2],[1,3],[2,3],以及组合
            close();
            res.json({err:err,data:data});
        })
    })
})
module.exports = router;