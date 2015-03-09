/**
 * Created by I on 2015/2/19.
 */

/**
 * group   name - id 映射表
 */
var tools = require("./small");
var skills = require("./other").skill;
var groups = require("./other").group;
var user = require("./user");

var group_n2i = {};
var group_name = [];

var skill_n2i = {};
var skill_name = [];

var user_n2i = {};
var user_name = {};

function group_n2i_init(callback){
        group_name = [];
        groups.find({},{gname:1},function(err,data){
            console.log("group  "+err+"<<<"+data);
            if(err){callback();}else{
            for(var i=0;i<data.length;i++){
                group_n2i[data[i].gname]=data[i]._id;
                group_name.push(data[i].gname);
                if(i==data.length-1){
                    callback();
                    exports.group_name   =  group_name;
                    exports.group_n2i    =  group_n2i;
                }
            }}
        })
}

function skill_n2i_init(callback){
        skill_name = [];
        skills.find({},{skname:1},function(err,sdata){
            console.log("skill  "+err+"<<<"+sdata);
            for(var i=0;i<sdata.length;i++){
                skill_n2i[sdata[i].skname]=sdata[i]._id;
                skill_name.push(sdata[i].skname);
                if(i==sdata.length-1){
                    callback();
                    exports.skill_name = skill_name;
                    exports.skill_n2i = skill_n2i;
                }
            }
        })
}


function user_n2i_init(callback){
    user_name = [];
    user.find({},{uname:1},function(err,udata){
        for(var i=0;i<udata.length;i++){
            user_n2i[udata[i].uname]=udata[i]._id;
            user_name.push(udata[i].uname);
            if(i==udata.length-1){
                callback();
                exports.user_name = user_name;
                exports.user_n2i = user_n2i;
            }
        }
    })
}


tools.odb(function(close){
user_n2i_init(function(){group_n2i_init(function(){skill_n2i_init(close)})});//close);//group_n2i_init(close));
});


exports.skill_n2i_init      =    skill_n2i_init;
exports.group_n2i_init      =    group_n2i_init;
exports.user_n2i_init       =    user_n2i_init;