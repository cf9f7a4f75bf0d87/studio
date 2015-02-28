$(document).ready(function(){
   
   $("#o").click(function(){ $(this).val("5"); });
   $("#o2").click(function(){ $(this).val("4"); });
   $("#o").change(
  
         function()
         {  
            
            if( this.value == 0 )
              {   
                  
                  $(".div").each(function()
                  {   
                      var t=$(this).find(".b").html();
                      if(t=="状态:招募成员中")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }
                  }
                  );
                  $("#o").val("0");
                
                
              }



                if( this.value == 1 )
              {
                  $(".div").each(function()
                  {
                      var t=$(this).find(".b").html();
                      if(t=="状态:进行中项目")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }

                  }
                  );
                  $("#o").val("1");
              }




                if( this.value == 2 )
              {
                  $(".div").each(function()
                  {
                      var t=$(this).find(".b").html();
                      if(t=="状态:成功项目")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }

                  }
                  );
                  $("#o").val("2");
                  
              }



              if( this.value == 3 )
              {
                  $(".div").each(function()
                  {
                      var t=$(this).find(".b").html();
                      if(t=="状态:已死项目")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }

                  }
                  );
                  $("#o").val("3");
              }

                if( this.value == 4 )
              {
                  $(".div").each(function()
                  {
                        $(this).show();
                  }
                  );
                  $("#o").val("4");
              }
         }
    );
     



    $("#o2").change(function(){
                if( this.value == 0 )
              {   
                     $(".div").each(function()
                  {
                      var t=$(this).find(".l").html();
                      if(t=="类型:geek创意")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }
                  }
                  );
              }
                if( this.value == 1 )
              {
                  $(".div").each(function()
                  {
                      var t=$(this).find(".l").html();
                      if(t=="类型:科研项目")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }

                  }
                  );
              }
                if( this.value == 2 )
              {
                  $(".div").each(function()
                  {
                      var t=$(this).find(".l").html();
                      if(t=="类型:外包项目")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }
                  }
                  );
              }
              if( this.value == 3 )
              {
                  $(".div").each(function()
                  {
                      var t=$(this).find(".l").html();
                      if(t=="类型:校园作品")
                      {
                        $(this).show();
                      }
                      else
                      {
                        $(this).hide();
                      }
                  }
                  );
              }
    });

   $(".xiugai").click(
   	   function()
   	   {
          var parent=$(this).parent();
          var tp=$(this).parent().parent();

   	   	  var a = parent.find(".a").html();
          var b = parent.find(".b").html();
          var l = parent.find(".l").html();
          var c = parent.find(".c").html();
          var d = parent.find(".d").html();
          var text = parent.find(".text").html();

                                                       //   $("#new").clone(true).insertAfter($("#div3")).show();

          var parent2= $("#new").clone(true);
          parent2.insertBefore( $(parent) ).show();
 
          parent2.find(".a_x").val(a);
          parent2.find(".b_x").val(b);
          parent2.find(".l_x").val(l);
          parent2.find(".c_x").val(c);
          parent2.find(".d_x").val(d);
          parent2.find(".text_x").val(text);
                                                      // $(".b_x").val(b);
                                                      // $(".c_x").val(c);
                                                      // $(".text_x").val(text);

           
             
            //  var op4=$(parent2).find(".op4");          option的value只能通过 .val()获得
            // if($(op4).val()==4)
            // {
            //    $(".op4").attr("selected", true);
            // }
            if(b=="状态:招募成员中") { $(".op0").attr("selected", true);}
            if(b=="状态:进行中项目") { $(".op1").attr("selected", true);}
            if(b=="状态:成功项目") { $(".op2").attr("selected", true);}
            if(b=="状态:已死项目") { $(".op3").attr("selected", true);}
            if(b=="状态:所有项目") { $(".op4").attr("selected", true);}

        

             $(".op").change(
                 function()
                 {  

                    var q=$(this).parent();
                    var b_x=$(q).find(".b_x");
                    if( this.value == 0 ){    $(q).find(".b_x").val("状态:招募成员中"); }
                    if( this.value == 1 ){    $(q).find(".b_x").val("状态:进行中项目"); }
                    if( this.value == 2 ){    $(q).find(".b_x").val("状态:成功项目"); }
                    if( this.value == 3 ){    $(q).find(".b_x").val("状态:已死项目"); }
                    if( this.value == 4 ){    $(q).find(".b_x").val("状态:所有项目"); }

                 });  

           $(tp).find(".shanchu_fujian").show();
           $(tp).find(".add_wendang").show();




            if(l=="类型:geek创意") {$(".o1").attr("selected", true); }
            if(l=="类型:科研项目") {$(".o2").attr("selected", true); }
            if(l=="类型:外包项目") {$(".o3").attr("selected", true); }
            if(l=="类型:校园作品") {$(".o4").attr("selected", true); }


            $(".op2").change(function(){
                     var q=$(this).parent();
                     var l_x=$(q).find(".l_x");
                    if( this.value == 0 ){    $(q).find(".l_x").val("类型:geek创意"); }
                    if( this.value == 1 ){    $(q).find(".l_x").val("类型:科研项目"); }
                    if( this.value == 2 ){    $(q).find(".l_x").val("类型:外包项目"); }
                    if( this.value == 3 ){    $(q).find(".l_x").val("类型:校园作品"); }
                    
            });

            parent.remove();
   	   }
   	);


    $(".shanchu").click(
    	function(){
    	   $(this).parent().parent().remove();
    	});
    $(".shanchu_fujian").click(
      function(){
         $(this).parent().remove();
      });





   $("#add").click( 
      function()
      { 
        
        var x=$("#t_new").clone(true); 
        $(x).find(".b_x").val("状态:招募成员中");
        $(x).find(".l_x").val("类型:geek创意");
        x.insertBefore($("#more")).show();
      }

   );


   // 加号图标

   $(".tianjia_fujian").click(
      function()
      {
        var p=$(this).parent();
        var q=$(this).parent().parent();
        $(p).find(".file").click();
        $(".wendang_1").eq(0).clone(true).insertBefore(p).show();
        q.find(".shanchu_fujian").show();
      
      }
    );

   $(".queren2").click(function(){
       {
           var x= $(this).parent();
           var p=$(".old").eq(0).clone(true);
           p.insertBefore($(x)).show();

           var p2=$(this).parent();
           var tp=$(this).parent().parent();

           var a_x = p2.find(".a_x").val();
           var b_x = p2.find(".b_x").val();
           var l_x = p2.find(".l_x").val();
           var c_x = p2.find(".c_x").val();
           var d_x = p2.find(".d_x").val();
           var text_x = p2.find(".text_x").val();

           
           p.find(".a").html(a_x);
           p.find(".b").html(b_x);
           p.find(".l").html(l_x);
           p.find(".c").html(c_x);
           p.find(".d").html(d_x);
           p.find(".text").html(text_x);
          
           
           $(tp).find(".shanchu_fujian").hide();
           $(tp).find(".add_wendang").hide();
           p2.remove();
        }


   });




       

});