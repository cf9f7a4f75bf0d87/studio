$(document).ready(function() {
	$("#check input").hide();
	$("#qd").show();
	$("#check input").attr("checked",false);//选中的值s
	$("#s").hide();
	$("#yixuan input").hide();
	$("#yixuan img").hide();    //隐藏已选技能。

    $(document).on("click",".del",function(){
        var p = $(this).parent();
        var val = $(p).find("input").val();

        var child =  $('<span><input value="'+val+'" readonly><img class="add" src="/images/u77.png"></span>');
        $("#wei").append(child);
        $(p).remove();
    })
	
    $(document).on("click",".add",function(){
        var p = $(this).parent();
        var val = $(p).find("input").val();

        var child = $('<span><input value="'+val+'" readonly><img class="del" src="/images/u53.png"></span>');
        $("#sel").append(child);
        $(p).remove();
    })

    $(".sel_ok").click(function(){
        var inputs = $("#sel").find("input");
        console.log("-------break----------");
        var sel = [];
        for(var i=0;i<inputs.length;i++){
            sel.push($(inputs[i]).val());
        }
        console.log(sel);

        $.ajax({
            url:"skillEdit",
            type:"post",
            data:{skills:sel},
            dataType:"json",
            success:function(msg){
                console.log("success"+ msg);
                location.reload(true);
            },
            error:function(err){
                alert(err);
            }
        })
    });

    $("#zidingyi").click(function(){
        alert("提交中..");
        var skill = $(this).parent().find("input").val();
        $.ajax({
            url:"skillAdd",
            type:"post",
            data:{skill:skill},
            dataType:"json",
            success:function(msg){
                console.log("success"+ msg);
                alert("success");
                var child =  $('<span><input value="'+skill+'" readonly><img class="add" src="/images/u77.png"></span>');
                $("#wei").append(child);
            },
            error:function(err){
                alert(err);
            }
        })
    })
});
