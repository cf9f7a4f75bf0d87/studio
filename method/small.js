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

//处理仅查找数据,然后返回数据的逻辑
function return_data(err,data,close,callback){
    if(err){callback(err,null);}
    else{callback(null,data)}
}

exports.json_reply      = json_reply;
exports.update_deal     = update_deal;
exports.render_deal     = render_deal;
exports.return_data     = return_data;