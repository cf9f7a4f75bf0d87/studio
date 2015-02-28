/**
 * Created by I on 2015/2/19.
 */

/**
 * group   name - id 映射表
 */
var tools = require("./small");
var skills = require("./other").skill;

var group_n2i = {};
group_n2i["group0"] = "5437c5fe229fe3981c6135dc";
group_n2i["group1"] = "5437c5fe229fe3981c6135dd";
group_n2i["group2"] = "5437c5fe229fe3981c6135de";
group_n2i["group3"] = "5437c5fe229fe3981c6135df";
group_n2i["group4"] = "5437c5fe229fe3981c6135e0";
group_n2i["group5"] = "5437c5fe229fe3981c6135e1";

var skill_n2i = {};
var skill_name = [];

function skill_n2i_init(callback){
    tools.odb(function(close){
        skill_name = [];
        skills.find({},{skname:1},function(err,data){

            for(var i=0;i<data.length;i++){
                skill_n2i[data[i].skname]=data[i]._id;
                skill_name.push(data[i].skname);
                if(i==data.length-1){
                    close();
                    callback();
                    exports.skill_name = skill_name;
                    exports.skill_n2i = skill_n2i;
                }
            }
        })
    })
}

skill_n2i_init(function(){});

exports.group_n2i = group_n2i;
exports.skill_n2i_init      =    skill_n2i_init;
