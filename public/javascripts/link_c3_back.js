$(document).ready(function(){
     
    
   
     $("#c_9").parent().parent().remove();


     $(".shanchu").click(function(){ 
     	$(this).parent().parent().remove();

     });
    
     //  如果用户是超级管理员则 可以更改用户角色 ； 
     var x=$("#top").find("#shenfen").html();
     $(".xiugai").click(function(){
        
        
        //  1 超级管理员；

        if(x=="超级管理员")
	     {
	     	 var p=$(this).parent().parent();
	     	 var a=$(p).find(".a").html();
	     	 var b=$(p).find(".b").html();
	     	 var c=$(p).find(".c").html();
	     	 var d=$(p).find(".d").html();
	     	 var e=$(p).find(".e").html();
	     	 var f=$(p).find(".f").html();
	     	 var g=$(p).find(".g").html();

	     	 var p2=$("#new").clone(true);
	     	 $(p2).insertBefore(p).show();
	     	 $(p2).find(".a_x").val(a);
	     	 $(p2).find(".b_x").val(b);
	     	 $(p2).find(".c_x").val(c);
	     	 $(p2).find(".d_x").val(d);
	     	 $(p2).find(".e_x").val(e);
	     	 $(p2).find(".f_x").val(f);
	     	 $(p2).find(".g_x").val(g);

	     	 var s=$(p2).find(".op2");

	     	 if(e=="管理员") { $(".o0").attr("selected", true); }

	     	 if(e=="普通用户") { $(".o1").attr("selected", true); }


	     	 if (c=="练习生") { $(".op0").attr("selected",true); }
	     	  if (c=="开发组") { $(".op1").attr("selected",true); }
	     	   if (c=="运维组") { $(".op2").attr("selected",true); }
	     	    if (c=="设计组") { $(".op3").attr("selected",true); }
	     	     if (c=="产品组") { $(".op4").attr("selected",true); }
	     	      if (c=="营销组") { $(".op5").attr("selected",true); }
     	 }

         // 2 普通管理员

         else
         {
         	 var p=$(this).parent().parent();
	     	 var a=$(p).find(".a").html();
	     	 var b=$(p).find(".b").html();
	     	 var c=$(p).find(".c").html();
	     	 var d=$(p).find(".d").html();
	     	 var e=$(p).find(".e").html();
	     	 var f=$(p).find(".f").html();
	     	 var g=$(p).find(".g").html();

	     	 var p2=$("#new_2").clone(true);
	     	 $(p2).insertBefore(p).show();
	     	 $(p2).find(".a_x").val(a);
	     	 $(p2).find(".b_x").val(b);
	     	 $(p2).find(".c_x").val(c);
	     	 $(p2).find(".d_x").val(d);
	     	 $(p2).find(".e_x").val(e);
	     	 $(p2).find(".f_x").val(f);
	     	 $(p2).find(".g_x").val(g);

             $(p2).find(".e_x").html(e);  
          
	     	 if (c=="练习生") { $(".op0").attr("selected",true); }
	     	  if (c=="开发组") { $(".op1").attr("selected",true); }
	     	   if (c=="运维组") { $(".op2").attr("selected",true); }
	     	    if (c=="设计组") { $(".op3").attr("selected",true); }
	     	     if (c=="产品组") { $(".op4").attr("selected",true); }
	     	      if (c=="营销组") { $(".op5").attr("selected",true); }
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

     	var p2 =$("#old").clone(true);
     	$(p2).insertBefore(p).show();
     	$(p2).find(".a").html(a_x);
     	$(p2).find(".b").html(b_x);
     	$(p2).find(".c").html(c_x);
     	$(p2).find(".d").html(d_x);
     	$(p2).find(".e").html(e_x);
     	$(p2).find(".f").html(f_x);
     	$(p2).find(".g").html(g_x);

      	p.remove();
         
       
     });
     $(".o").change(function(){
     	 if(this.value == 0)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".c_x").val("练习生");
        	
        }
         if(this.value == 1)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".c_x").val("开发组");
        	
        }
         if(this.value == 2)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".c_x").val("运维组");
        	
        }
         if(this.value == 3)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".c_x").val("设计组");
        	
        }
         if(this.value == 4)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".c_x").val("产品组");
        	
        }
         if(this.value == 5)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".c_x").val("营销组");
        	
        }
     });
     $(".o2").change(function(){
        if(this.value == 0)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".e_x").val("管理员");
        	
        }
        if(this.value == 1)
        {
        	var p=$(this).parent().parent();
        	$(p).find(".e_x").val("普通用户");
        
        }
   
     });




   

});