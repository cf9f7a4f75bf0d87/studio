/**
 * Created by I on 2015/2/5.
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

//处理后页面的跳转传值..
function render_deal(err,res,data,path){
    if(err){
        res.render('error',{message:err});
    }else{
        res.render(path,{data:data});
    }
}

exports.json_reply      = json_reply;
exports.update_deal     = update_deal;
exports.render_deal     = render_deal;