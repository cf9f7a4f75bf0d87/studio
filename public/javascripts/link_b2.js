$(document).ready(function(){
																		
      $(".xiugai").click(function()
       {    $(this).parent().hide();
			//获取未点击修改链接之前的内容
			var tuandui = $("#tuandui").html();
			var fuzeren = $("#fuzeren").html();
			var laoshi = $("#laoshi").html();
            var gengxinriqi = $("#gengxinriqi").html();
			var youxiang = $("#youxiang").html();
			var dizhi = $("#dizhi").html();
			var dianhua = $("#dianhua").html();
			var p1 = $("#p1").html();
			
			
			$("#editDiv").show();

			$("#tuandui_x").val(tuandui);
			$("#fuzeren_x").val(fuzeren);
			$("#laoshi_x").val(laoshi);
			$("#gengxinriqi_x").val(gengxinriqi);
			$("#youxiang_x").val(youxiang);
			$("#dizhi_x").val(dizhi);
			$("#dianhua_x").val(dianhua);
			$("#content_x").val(p1);
			
		}
     );
															//点击保存，保存编辑过的信息
        $(document).on('click',".queren",function()
		{


            var gengxinriqi_x = $("#gengxinriqi_x").val();

            if(!getTime(gengxinriqi_x)){alert("date format should like '2015-02-30 11:22:33', or it can't be deal..");  $("#editDiv").hide(); $("#old").show();return;}

            var tuandui_x = $("#tuandui_x").val();
			var fuzeren_x = $("#fuzeren_x").val();
			var laoshi_x = $("#laoshi_x").val();
			var dianhua_x = $("#dianhua_x").val();
			var youxiang_x = $("#youxiang_x").val();
			var dizhi_x = $("#dizhi_x").val();
			var content_x = $("#content_x").val();

            $.ajax({
                    url: "infoEdit",
                    type: "post",
                    data: {sname:tuandui_x,teacher:laoshi_x,leader:fuzeren_x,stel:dianhua_x,semail:youxiang_x,saddress:dizhi_x,scontent:content_x,uptime:new Date(gengxinriqi_x)},
                    dataType: "json",
                    success:function(){
                        $("#fuzeren").html(fuzeren_x);
                        $("#laoshi").html(laoshi_x);
                        $("#gengxinriqi").html(gengxinriqi_x);
                        $("#dianhua").html(dianhua_x);
                        $("#youxiang").html(youxiang_x);
                        $("#dizhi").html(dizhi_x);
                        $("#tuandui").html(tuandui_x);
                        $("#p1").html(content_x);

                    },
                    error:function(){
                        alert("failed to update, please reload this page..");
                    }
                }
            );
            $("#editDiv").hide();
            $("#old").show();

		}
     );

      $(document).on("click",".text_edit",function(){
             var p1=$(this).parent();
             var t0=$(p1).find(".t0").html();// id
             var t2=$(p1).find(".t2").html();// date
             var t1=$(p1).find(".t1").html();// title
             var t3=$(p1).find(".t3").html();// content

	      	 var p2= $("#t_new").clone(true);
	      	 p2.insertBefore( $(p1) ).show();

             $(p2).find(".t0_x").val(t0);
             $(p2).find(".t2_x").val(t2);
	      	 $(p2).find(".t1_x").val(t1);
	      	 $(p2).find(".t3_x").val(t3);

	      	 $(p1).remove();
            
	      }
      );
    $(document).on("click",".text_del",function(){
            var p1=$(this).parent();
            var t0=$(p1).find(".t0").html();

            $.ajax({
                url: "delculture",
                type: "post",
                data: {cid: t0},
                dataType: "json",
                success: function () {
                    $(p1).remove();
                },
                error:function(){
                    alert("error..please reload this page..");
                }
            });

        }
    );
      $(document).on("click",".text_queren",function()
      	{
             var p1=$(this).parent();
             var t0=$(p1).find(".t0_x").val();
             var t2=$(p1).find(".t2_x").val();
             var t1=$(p1).find(".t1_x").val();
             var t3=$(p1).find(".t3_x").val();

            $.ajax({
                url: "editCulture",
                type: "post",
                data: {title:t1,content:t3,cid:t0},
                dataType: "json",
                success:function(){
                    var p2=$("#t_old").clone(true);
                    p2.insertBefore( $(p1) ).show();

                    $(p2).find(".t");
                    $(p2).find(".t0").html(t0);
                    $(p2).find(".t2").html(t2);
                    $(p2).find(".t1").html(t1);
                    $(p2).find(".t3").html(t3);
                    $(p1).remove();
                },
                error:function(){
                    alert("error..please reload this page..");

                }
            })

      	});

    $(document).on('click',".add_culture",function() {
        var p1 = $(this).parent();
        var t0 = $(p1).find(".t0_x").val();
        var t2 = new Date().toLocaleDateString();
        var t1 = $(p1).find(".t1_x").val();
        var t3 = $(p1).find(".t3_x").val();
        $.ajax({
            url: "addCulture",
            type: "post",
            data: {title: t1, content: t3},
            dataType: "json",
            success: function () {
                var p2 = $("#t_old").clone(true);
                p2.insertBefore($(p1)).show();

                $(p2).find(".t");
                $(p2).find(".t0").html(t0);
                $(p2).find(".t2").html(t2);
                $(p2).find(".t1").html(t1);
                $(p2).find(".t3").html(t3);

                $(p1).remove();
            },
            error: function () {
                alert("error..");

            }
        })
    });

        $("#add").click(function()
	      	{  
	      		var p2=$("#t_new").clone(true);
                $(p2).find(".text_queren").removeClass().addClass("add_culture");
                $(".add_culture").bind("click ",function(){

                });
                        p2.insertBefore($("#more")).show();

     	 	}
      	);

      $("#change").click(
      	function()
      	{
      		$(".file").click();
      	});

});