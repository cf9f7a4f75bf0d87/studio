$(document).ready(function(){
   
   var t;
   // $(".div_shanchu_img").hide();

   $(".xiugai").click(
   	   function()
   	   {
   	   	  $(this).parent().hide();
          t=$(this).parent();

          var parent=$(this).parent();
   	   	  var a = parent.find(".a").html();
          var b = parent.find(".b").html();
          var c = parent.find(".c").html();
           var i = parent.find(".i").val();
          var text = parent.find(".text").html();
          

                                                       //   $("#new").clone(true).insertAfter($("#div3")).show();

          var parent2= $("#new").clone(true);
          parent2.insertBefore( $(t) ).show();
 
          parent2.find(".a_x").val(a);
          parent2.find(".c_x").val(c);
           parent2.find(".i_x").val(i);
          parent2.find(".text_x").val(text);

           var all= $(this).parent().parent();
           var add= $(all).find(".add");
           $(add).show();

           var div_shanchu_img= $(all).find(".div_shanchu_img");
           $(div_shanchu_img).show();

   	   }
   	);



     
    $(".shanchu").click(
    	function(){
            var i = $(this).parent().find(".i");
            var p = $(this).parent().parent();
            alert($(i).val());
            $.ajax({
                url:"delEvent",
                type: "post",
                data: {cid:$(i).val()},
                dataType:"json",
                success: function (msg) {
                    $(p).remove();
                },
                error: function(msg){
                    alert("error");
                }
            });
    	});

    $(document).on("click",".div_shanchu_img",function(){
         $(this).parent().remove();
      });

  
   var add_flag=false;
   //当编辑时点击加号图标 
   $(document).on("click",".add_img",function(){

      var p=$(this).parent().parent().parent();
     if(add_flag==false){
         var x=$(p).find(".file").click();
         add_flag=true;
     }else{
         add_flag=false;
         console.log("*****");
         var data= new FormData();
         var files = $(p).find(".file")[0].files;

         console.log(files);
         if(files){
             data.append("file",files[0]);
         }
         console.log("start");
         $.ajax({
             url:"/test/uploads",
             type: "post",
             data: data,
             dataType:"json",
             contentType:false,
             processData:false,
             success: function (msg) {
                 alert(msg);
                 var t=$("#div5").clone(true);
                 t.addClass("div4");
                 t.appendTo(p);
                 msg.path.replace(/public/,"");
                 $(t).find(".upimg").attr("src",msg.path);
                 $(t).show();
             },
             error:function(msg){alert("error");}
         })
         console.log("end");
     }
    });
   //添加时 加号图标
      $("#add_img_new").click(function(){
          var p=$(this).parent().parent().parent();
          var div_shanchu_img=$(p).find(".div_shanchu_img");
          $(div_shanchu_img).show();

          if(add_flag==false){
              var x=$(p).find(".file").click();
              add_flag=true;
          }else{
              add_flag=false;
              console.log("*****");
              var data= new FormData();
              var files = $(p).find(".file")[0].files;

              console.log(files);
              if(files){
                  data.append("file",files[0]);
              }
              console.log("start");
              $.ajax({
                  url:"/test/uploads",
                  type: "post",
                  data: data,
                  dataType:"json",
                  contentType:false,
                  processData:false,
                  success: function (msg) {
                      alert(msg);
                      var t=$("#div5").clone(true).appendTo(p);
                      $(t).addClass("div4");
                      $(t).find(".upimg").attr("src",msg.path);
                      $(t).show();

                  },
                  error:function(msg){alert("error");}
              })
              console.log("end");
          }
    });


  

   //点击添加时
   $("#add").click( 
      function()
      { 
        
        var p = $("#t_new").clone(true);
          $(p).find(".queren2").removeClass().addClass("add_event");

          p.insertBefore($("#more")).show();

      }
   );

    //点击添加新事件
    $(document).on("click",".add_event",function(){
        var p=$(this).parent().parent().find(".old");
        var p2=$(this).parent();

        var a_x = p2.find(".a_x").val();  //标题
        var time= new Date();
        var c_x = p2.find(".c_x").val(); //时间
        var text_x = p2.find(".text_x").val(); //内容
        var imgs = $(this).parent().parent().find(".div4 >.upimg");
        var pics=[];
        console.log("start");
        console.log(imgs);
        console.log($(imgs).attr("src"));
        console.log("******");
        console.log(imgs.length);
        for(var i=0;i<imgs.length;i++){
            pics.push($(imgs[i]).attr("src"));
            console.log(pics[i]);
        }
        console.log("end");
        console.log("start hide");
        var all= $(this).parent().parent();
        var add= $(all).find(".add");
        console.log(add);
        $(add).hide();
        console.log("end hide");


        $.ajax({
            url:"addEvent",
            type:"post",
            data:{title:a_x,time:time,content:text_x,pics:pics},
            dataType:"json",
            success:function(msg){
                alert("success");
                p.show();
                p.find(".a").html(a_x);
                p.find(".i").val(msg.data);
                p.find(".c").html(time.toLocaleDateString());
                p.find(".text").html(text_x);

                var div_shanchu_img= $(all).find(".div_shanchu_img");
                $(div_shanchu_img).hide();
                $(p2).remove();
            },
            error:function(){alert("error");}
        })
    })


 // 编辑时确认按钮
    $(document).on("click",".queren2",function(){
        {
           var p=$(this).parent().parent().find(".old");
           var p2=$(this).parent();

           var a_x = p2.find(".a_x").val();
           var i_x = p2.find(".i_x").val();
           var c_x = p2.find(".c_x").val();
           var text_x = p2.find(".text_x").val();

            var imgs = $(this).parent().parent().find(".div4 >.upimg");
            var pics=[];
            console.log(imgs);
            console.log($(imgs).attr("src"));
            console.log(imgs.length);
            for(var i=0;i<imgs.length;i++){
                pics.push($(imgs[i]).attr("src"));
                console.log(pics[i]);
            }
            var all= $(this).parent().parent();
            var add= $(all).find(".add");

            alert(new Date(c_x));
            $.ajax({
                url:"editEvent",
                type:"post",
                data:{cid:i_x,title:a_x,time:new Date(c_x),content:text_x,pics:pics},
                dataType:"json",
                success:function(msg){
                    alert("success");
                    $(add).hide();
                    p.show();
                    p.find(".a").html(a_x);
                    p.find(".i").val(i_x);
                    p.find(".c").html(c_x);
                    p.find(".text").html(text_x);

                    var div_shanchu_img= $(all).find(".div_shanchu_img");
                    $(div_shanchu_img).hide();
                    $(p2).remove();
                },
                error:function(){alert("error");}
            })
       }
   });

});