$(document).ready(function(){
     
    
   
     $("#c_9").parent().parent().remove();


     $(".shanchu").click(function(){
         var p=$(this).parent().parent();
         var i=$(p).find(".i").html();   // id
         $.ajax({
             url:"delUser",
             type:"post",
             data:{cid:i},
             dataType:"json",
             success:function(msg){
                 alert(msg);
                 $(p).remove();
             },
             error:function(){
                 alert("error");
             }
         })


     });
    
     //  如果用户是超级管理员则 可以更改用户角色 ； 
     var x=$("#top").find("#shenfen").html();
     $(".xiugai").click(function(){
        
        //  1 超级管理员；
        if(x!="超级管理员")
	     {
	     	 var p=$(this).parent().parent();
	     	 var a=$(p).find(".a").html();   // name
	     	 var b=$(p).find(".b").html();   // email
	     	 var c=$(p).find(".c").html();   // gname
	     	 var d=$(p).find(".d").html();   // email
	     	 var e=$(p).find(".e").html();   // roll
	     	 var f=$(p).find(".f").html();   // grade
	     	 var g=$(p).find(".g").html();   // score
             var i=$(p).find(".i").html();   // id


	     	 var p2=$("#new").clone(true);
	     	 $(p2).insertBefore(p).show();
	     	 $(p2).find(".a_x").val(a);
	     	 $(p2).find(".b_x").val(b);
	     	 $(p2).find(".c_x").val(c);
	     	 $(p2).find(".d_x").val(d);
	     	 $(p2).find(".e_x").val(e);
	     	 $(p2).find(".f_x").val(f);
	     	 $(p2).find(".g_x").val(g);
             $(p2).find(".i_x").val(i);

	     	 var s=$(p2).find(".op2");

	     	 if(e=="管理员") { $(".o0").attr("selected", true); }

	     	 if(e=="普通用户") { $(".o1").attr("selected", true); }

            $(p2).find(".o>[value="+c+"]").attr("selected",true);
             alert(c);
             alert($(".o > [value="+c+"]").val())

     	 }

         // 2 普通管理员

         else
         {
             var p=$(this).parent().parent();
             var a=$(p).find(".a").html();   // name
             var b=$(p).find(".b").html();   // email
             var c=$(p).find(".c").html();   // gname
             var d=$(p).find(".d").html();   // email
             var e=$(p).find(".e").html();   // roll
             var f=$(p).find(".f").html();   // grade
             var g=$(p).find(".g").html();   // score
             var i=$(p).find(".i").html();   // id

	     	 var p2=$("#new_2").clone(true);
	     	 $(p2).insertBefore(p).show();
	     	 $(p2).find(".a_x").val(a);
	     	 $(p2).find(".b_x").val(b);
	     	 $(p2).find(".c_x").val(c);
	     	 $(p2).find(".d_x").val(d);
	     	 $(p2).find(".e_x").val(e);
	     	 $(p2).find(".f_x").val(f);
	     	 $(p2).find(".g_x").val(g);
             $(p2).find(".i_x").val(i);

             $(p2).find(".e_x").html(e);

             $(".o[value="+c+"]").attr("selected",true);
             alert(c);
             alert($(".o > [value="+c+"]").val());
         }
         p.remove();
     });
    

     $(".queren").click(function(){
     	var p=$(this).parent().parent();
     	var a_x = $(p).find(".a_x").val();
     	var b_x = $(p).find(".b_x").val();
     	var c_x = $(p).find(".c_x").val();
     	var d_x = $(p).find(".d_x").val();
     	var e_x = $(p).find(".e_x").val();
     	var f_x = $(p).find(".f_x").val();
     	var g_x = $(p).find(".g_x").val();
         var i_x = $(p).find(".i_x").val();

         $.ajax({
             url: "infoEdit",
             type: "post",
             data: {cid: i_x, name: a_x, uid: b_x, gname:c_x,email:d_x,roll:e_x,grade:f_x,score:g_x},
             dataType: "json",
             success: function (msg) {
                 var p2 =$("#old").clone(true);
                 $(p2).insertBefore(p).show();
                 $(p2).find(".a").html(a_x);
                 $(p2).find(".b").html(b_x);
                 $(p2).find(".c").html(c_x);
                 $(p2).find(".d").html(d_x);
                 $(p2).find(".e").html(e_x);
                 $(p2).find(".f").html(f_x);
                 $(p2).find(".g").html(g_x);
                 $(p2).find(".i").html(i_x);

                 p.remove();
             },
             error: function () {
                 alert("error..");
             }
         });
     });
     $(".o").change(function(){
         var p=$(this).parent().parent();
         $(p).find(".c_x").val($(this).val());
     });
});