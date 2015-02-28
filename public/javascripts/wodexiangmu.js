$(document).ready(function(){

    var a = $(":selected").val();


	$(".field").change(function(){
        alert(this.value);
        var sel = this.value;
        $.ajax({
            url:"myProjects",
            type:"post",
            data:{status:sel},
            dataType:"json",
            success:function(msg){
                alert("success");
                $(".text").remove();
                var data = msg.data;
                 for(var i=0; i<data.length;i++){
                    var div = $("<div class='text'></div>");
                     var front = $('<input type="hidden" class="pid" value="'+data[i]._id+'"><span class="span1">'+data[i].ptitle+'</span><span class="span2">类型：'+data[i].ptype+'</span><span class="span3">状态：'+data[i].pstaute+'</span><span class="span4">更新日期:'+data[i].ppubTime+'</span><p>'+data[i].pcontent+'</p>');
                     div.append(front);
                 for (var j=0;j<data[i].pdocs.length;j++){
                     var a = $('<a href="'+data[i].pdocs[j]+'"><span class="span7">需求文档</span></a>');
                     a.appendTo(div);
                 }
                     var exit = $('<span class="span8"><input type="submit" class="quitMyProject" value="我不想干啦"></span>')
                 if(sel==0){
                    exit.appendTo(div);
                 }
                     div.appendTo($("#content"));
                 }

            }
        })
    });
    $(document).on("click",".quitMyProject",function() {
        var p = $(this).parent().parent();
        var pid = $(p).find(".pid").val();
        alert(pid);
        $.ajax({
            url: "projectQuit",
            type: "post",
            data: {pid: pid},
            dataType: "json",
            success: function (msg) {
                if (msg.success == 1) {
                    $(p).remove();
                } else {
                    alert("your request is failed..");
                }
            },
            error: function (err) {
                alert("error" + err)
            }
        });
    });
});