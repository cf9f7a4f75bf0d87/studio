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
            alert(p.find('.e').val());
            $.ajax({
                url:"delAchievement",
                type:"post",
                data:{cid: p.find('.e').val()},
                dataType:"json",
                success:function(){
                    $(p).remove();
                },
                error:function(){
                    alert("error..");
                }
            })
        });



    $("#add").click(
        function()
        {
            var p= $("#new").clone(true);
            $(p).find('.c_x').val(new Date().toLocaleString());
            $(p).find('.queren2').removeClass().addClass("add_achievement");
            $(p).insertBefore($("#more")).show();
        }
    );

    $(document).on("click",".queren2",function()
    {
        var p2=$(this).parent();
        var a_x = p2.find(".a_x").val();             //   标题
        var c_x = p2.find(".c_x").val();             //   日期
        var text_x = p2.find(".text_x").val();      //   内容
        var e_x = p2.find(".e_x").val();             //   i d
        var pic = $(p2).find(".div2>img").attr("src");

        $.ajax({
            url: "editAchievement",
            type: "post",
            data: {cid:e_x,title: a_x, pic:pic,content:text_x,time:new Date(c_x)},
            dataType: "json",
            success: function () {
                var p=$("#old").clone(true);
                p.find(".a").html(a_x);
                p.find(".c").html(c_x);
                p.find(".e").val(e_x);
                p.find(".text").html(text_x);
                p.find(".div2>img").attr("src",pic);
                p.insertBefore(p2).show();

                $(p2).remove();
            },
            error: function () {
                alert("error..");
            }
        })
    });

    $(document).on('click',".add_achievement",function() {

        var p2=$(this).parent();
        var a_x = $(p2).find(".a_x").val();             //   标题
        var c_x = $(p2).find(".c_x").val();             //   日期
        var text_x = $(p2).find(".text_x").val();      //   内容
        var pic = $(p2).find(".div2>img").attr("src");


        $.ajax({
            url: "addAchievement",
            type: "post",
            data: {title: a_x, pic:pic,content:text_x,time:new Date(c_x)},
           dataType: "json",
            success: function (msg) {
            var p=$("#old").clone(true);
            p.find(".a").html(a_x);
            p.find(".c").html(c_x);
            p.find(".text").html(text_x);
            p.find(".e").val(msg.data);
            p.find(".div2 > img").attr("src",pic);
            p.insertBefore(p2).show();

            $(p2).remove();
        },
        error: function () {
            alert("error..");
        }
    })


});
var flag = false;

$(document).on("click",".div2",function(){
    var p = $(this);

    if(flag){
        var files = $(p).find(".add_img")[0].files;
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
                alert("success");
                $(p).find("img").attr("src",msg.data);
            },
            error:function(msg){alert("error");}

        })
        flag=false;
    }else{
        var i = $(p).find(".add_img");
        $(i).click();
        flag=true;
    }
})

});