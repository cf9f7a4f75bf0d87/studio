/**
 * Created by I on 2014/10/10.
 */
var mongoose =require("mongoose");
var Schema = mongoose.Schema;
//转换为小写,防止邮箱重复注册..

function toLower(val){
    return val.toLowerCase();
}


var newsSchema=mongoose.Schema({

    ntitle: {type:String},//新闻题目

    npic: {type:String},//新闻配图url

    ncontent: {type:String},//新闻内容

    npublisher: {type:String},//发布者

    npubTime: {type:Date,default:Date()}//发布时间

});

var eventSchema=mongoose.Schema({//大事件


    etitle:{type:String},//事件标题

    epics:[{type:String}],//大事件图组 url

    econtent:{type:String},//大事件内容

    epubTime:{type:Date,default:Date()}//发布时间

});

var achievementSchema=mongoose.Schema({//成就集合

    atitle:{type:String},//成就标题

    apic:{type:String},//成就图片url

    atime:{type:Date,default:Date()},//时间

    acontent:{type:String}//成就内容

});

var exampleSchema=mongoose.Schema({//榜样集合,

    etitle: {type:String},//榜样名称（或者名字）

    epic: {type:String},//图url

    etime:{type:Date,default:Date()},

    econtent:{ type:String }//榜样介绍

});
var cultureSchema = mongoose.Schema(//文化 (包含于studio,用于介绍工作室..)

    {cname:{type:String},ccontent:{type:String},ctime:{type:Date,default:Date()}}//文化id，名字，内容

);

//回复。。
var revisionSchema = mongoose.Schema(
    {uname:{type:String},uemail:{type:String},mcontent:{type:String},mtime:{type:Date,default:Date()}}
)

//新增--各个组发布的信息。。
/**
 * 组别，发布人，发布（更新时间），关联图片。。
 */
var omsgSchema = mongoose.Schema({
    ogroup:{type:String},
    oleader:{type:String},
    otime:{type:Date,default:Date()},
    uptime:{type:Date,default:Date()},
    ocontent:{type:String},
    opic:String
});

//新增--退出项目申请
var qProjectsSchema=mongoose.Schema({
    user:{type:Schema.ObjectId,ref:'user'},
    project:{type:Schema.ObjectId,ref:'project'},
    content:{type:String},
    otime:{type:Date,default:Date()},
    reply:{type:Number,default:0}   //0,未审核, 1.同意, 2.拒绝
})



var studioSchema= mongoose.Schema({
    //工作室集合（only one item）



        sname:{type:String},//工作室名称

        scontent:{type:String},//介绍

        svisited:Number,//访问次数

        svisitedToday:Number,//今天访问的次数

        steacher:[{type:Schema.Types.ObjectId,ref:'user'}],//指导教师

        teacher:{type:String},  //指导教师

        sleader:[{type:Schema.Types.ObjectId,ref:'user'}],//负责人

        leader:{type:String},

        stelephone:Number,//联系电话

        semail:{type:String},//邮箱

        saddress:{type:String},//地址

        uptime:{type:Date},

        sculture:[//文化集合

            cultureSchema

        ],
        soMessages:[
            omsgSchema
        ] ,
        qProjects:[
            qProjectsSchema
        ],
        sfeedbackMessages:[//用户反馈

            {

                smid:{type:String},//id

                uname:{type:String},//反馈人姓名

                uemail:{type:String},//反馈人邮箱

                mcontent:{type:String},//反馈内容

                mtime:{type:Date,default:Date()},//反馈时间

                mstaute:{type:Number, default:0},//审核状态..0未审核, 1审核通过..

                reversions:[//针对这个反馈的回复

                    {uname:{type:String},uemail:{type:String},mcontent:{type:String},mtime:{type:Date,default:Date()}}//回复id，发送人，其邮箱，内容，时间
                ]

            }

        ],

sleaveMessages:[//留言（内容同用户反馈）

    {

       // smid:{type:String},//留言id 时间戳+随机数,手动生成

        uname:{type:String},//留言者雅号

        uemail:{type:String},

        mcontent:{type:String},//留言内容

        mtime:{type:Date,default: new Date()},//留言时间

        mstaute:{type:Number, default:0},//审核状态..0未审核, 1审核通过..

        reversions:[//针对这个留言的回复

            revisionSchema


            ]

        }

    ],

sprojectMessages:[//项目申请

    {

        uid:{type:Schema.Types.ObjectId,ref:'user'},//id

        pid:{type:Schema.Types.ObjectId,ref:'project'},//項目id

        uname:{type:String},//申请人姓名

        uemail:{type:String,default:null},//申请人邮箱

        mcontent:{type:String,default:null},//申请人说明

        mtime:{type:Date,default:Date()},//申请时间

        mstaute:{type:Number, default:0}//审核状态..0未审核, 1审核通过..

    }

],

joinMessages:[//加入申请

    {

        uid:{type:Schema.Types.ObjectId,ref:'user'},//id

        uname:{type:String},//申请人姓名

        uemail:{type:String},//申请人邮箱

        mcontent:{type:String},//申请人说明

        gid:{type:Schema.Types.ObjectId,ref:'project'},

        mtime:{type:Date,default:Date()},//申请时间

        mstaute:{type:Number, default:0}//审核状态..0未审核, 1审核通过..2不通过

    }

],


    snews:[newsSchema],//新闻集合..

    sevents:[eventSchema],//大事件集合

    sachievements:[achievementSchema],//成就集合..

    sexamples:[exampleSchema],//榜样集合..

    sstaute:Number//0：未开始招新，1：开始招新，2：网站维护中

});

exports.studio=mongoose.model("studio",studioSchema);
exports.news=mongoose.model("news",newsSchema);
exports.event=mongoose.model("event",eventSchema);
exports.achievement=mongoose.model("achievement",achievementSchema);
exports.example=mongoose.model("example",exampleSchema);
exports.culture=mongoose.model('culture',cultureSchema);
exports.culture=mongoose.model('message',omsgSchema);