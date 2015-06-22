$(document).ready(function(){

   $(".xiugai").click(
   	   function()
   	   {
          var parent=$(this).parent();

   	   	  var a = parent.find(".a").html();
          var b = parent.find(".b").html();
          var c = parent.find(".c").html();
          var e = parent.find(".e").val();
          var text = parent.find(".text").html();

          var parent2= $("#new").clone(true);
          parent2.find(".a_x").val(a);
          parent2.find(".b_x").val(b);
          parent2.find(".c_x").val(c);
          parent2.find(".e_x").val(e);
          parent2.find(".text_x").val(text);
          parent2.insertBefore(parent).show();

          $(parent).remove();
   	   }
   	);


     
    $(".shanchu").click(
    	function(){
            var p = $(this).parent();

            $.ajax({
                url:"delMsg",
                type:"post",
                data:{cid: p.find('.e').val()},
                dataType:"json",
                success:function(){
                    $(p).remove();
                },
                error:function(){
                    alert("failed to update.. please reload this page..");
                }
            })

    	});


    $(document).on('click',".add_msg",function() {
        var c_x = p2.find(".c_x").val();             //   日期

        if(!getTime(c_x)){alert("date format should like '2015-02-30 11:22:33', or it can't be deal..");return;}

        var p2=$(this).parent();
        var a_x = p2.find(".a_x").val();             //   组别
        var b_x = p2.find(".b_x").val();             //   负责人
        var text_x = p2.find(".text_x").val();       //    内容

        $.ajax({
            url: "addMsg",
            type: "post",
            data: {group: a_x, leader: b_x,content:text_x,date:new Date(c_x)},
            dataType: "json",
            success: function (msg) {
                var p=$("#old").clone(true);
                p.find(".a").html(a_x);
                p.find(".b").html(b_x);
                p.find(".c").html(new Date(c_x).toLocaleDateString());
                p.find(".text").html(text_x);
                p.find(".e").val(msg.data);
                p.insertBefore(p2).show();
                $(p2).remove();
            },
            error: function () {
                alert("failed to update.. please reload this page..");
            }
        })


    });
   $("#add").click(
      function()
      {
          var p= $("#new").clone(true);
          $(p).find('.c_x').val(new Date().toLocaleString());
          $(p).find('.c_x').val(new Date().toLocaleString());
          $(p).find('.queren2').removeClass().addClass("add_msg");
          p.insertBefore($("#more")).show();
      }

   );

    $(document).on("click",".queren2",function(){
        var p2=$(this).parent();
        var c_x = p2.find(".c_x").val();             //   日期

        if(!getTime(c_x)){alert("date format should like '2015-02-30 11:22:33', or it can't be deal..");return;}

        var a_x = p2.find(".a_x").val();             //   组别
        var b_x = p2.find(".b_x").val();             //   负责人
        var text_x = p2.find(".text_x").val();       //   内容
        var e_x = p2.find(".e_x").val();              //    id

        $.ajax({
            url: "editMsg",
            type: "post",
            data: {cid:e_x,group: a_x, leader: b_x,content:text_x,date:new Date(c_x)},
            dataType: "json",
            success: function () {
                var p=$("#old").clone(true);
                p.find(".a").html(a_x);
                p.find(".b").html(b_x);
                p.find(".c").html(new Date(c_x).toLocaleDateString());
                p.find(".e").val(e_x);
                p.find(".text").html(text_x);
                p.insertBefore(p2).show();

                $(p2).remove();
            },
            error: function () {
                alert("failed to update.. please reload this page..");
            }
        })


    })



});