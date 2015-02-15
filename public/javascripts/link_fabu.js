window.onload=function(){

       var ln = document.getElementById('leftnav');
       var lna = ln.getElementsByTagName('a');
       lna[0].innerText="团队介绍";
       lna[1].innerText="组织信息发布";
       lna[2].innerText="新闻发布";
       lna[3].innerText="大事件发布";
       lna[4].innerText="成果展示发布"; 
       lna[5].innerText="榜样发布"; 
       lna[6].innerText="项目发布"; 


       lna[0].setAttribute("href","b_2tuanduijieshao");
       lna[1].setAttribute("href","b_3zuzhixinxifabu");
       lna[2].setAttribute("href","b_4xinwenfabu");
       lna[3].setAttribute("href","b_5dashijianfabu");
       lna[4].setAttribute("href","b_6chengguozhanshifabu");
       lna[5].setAttribute("href","b_7bangyangfabu");
       lna[6].setAttribute("href","b_8xiangmufabu");
      
 
}
$(document).ready(function(){
    
    $("#div2").hide();
    $("#div3").hide();


    $(".op").change(function(){
        if( this.value == 0 )
        {   
            $("#div1").fadeIn("slow");
            $("#div2").hide();
            $("#div3").hide();
        }
        if( this.value == 1 )
        {
            $("#div2").fadeIn("slow");
            $("#div1").hide();
            $("#div3").hide();
        }
        if ( this.value == 2) 
       {
            $("#div3").fadeIn("slow");
            $("#div2").hide();
            $("#div1").hide();

       };
    });
    
});