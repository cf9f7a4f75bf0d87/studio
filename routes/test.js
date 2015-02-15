/**
 * Created by I on 2014/12/7.
 * 測試的 路由文件。。
 */
var express = require('express');
var router = express.Router();
var test = require('../method/test');
var service = require('../method/service');
var adminCl = require("../method/adminCl");
//var formidable = require("formidable");

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
module.exports = router;