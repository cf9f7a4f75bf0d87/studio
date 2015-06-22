/**
 * Created by i on 6/22/15.
 */
function getTime(time){
    if(/^(?:(20)||(19))\d{2}(-\d{1,2}){2} \d{2}(:\d{1,2}){2}$/.test(time)){
        return new Date(time);
    }else{
        return false;
    }
}