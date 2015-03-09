$(document).ready(function() {
	$("#s").hide();

    $(document).on("click",".del",function(){
        var p = $(this).parent();
        var val = $(p).find("input").val();

        var child =  $('<span><input value="'+val+'" readonly><img class="add" src="/images/u77.png"></span>');
        $("#wei").append(child);
        $(p).remove();
    });

    $(document).on("click",".add",function(){
        var p = $(this).parent();
        var val = $(p).find("input").val();

        var child = $('<span><input value="'+val+'" readonly><img class="del" src="/images/u53.png"></span>');
        $("#sel").append(child);
        $(p).remove();
    })

    $('.submit').click(function(){
        alert("submit..");
        var skills = [];
        var sel = $("#sel").find("input");
        for(var i=0;i<sel.length;i++){
            skills.push($(sel[i]).val());
        }
        console.log(skills);
        var group = $("input[name=group]:checked").val();
        var grade = $("input[name=grade]:checked").val();
        alert(grade);

        var findName = $("input[name=findName]").val();

        $.ajax({
            url:'find',
            type:"post",
            data:{skills:skills,group:group,grade:grade,name:findName},
            dataType:"json",
            success:function(msg){
                console.log(msg.data);
                $("#show tbody").children().remove();
                for(var i=0;i<msg.data.length;i++){
                var tr = $('<tr><td>'+msg.data[i].uname+'</td><td>'+msg.data[i].uid+'</td><td>'+msg.data[i].ugroupId+'</td><td>'+msg.data[i].uemail+'</td><td>'+msg.data[i].uroll+'</td><td>'+msg.data[i].ugrade+'</td><td>'+msg.data[i].uscore+'</td><td><img src="/images/u59.png"></td><td><img src="/images/u53.png"></td></tr>');
                $("#show tbody").append(tr);
                }
            },
            error:function(){
                alert("error..");
            }
        })
    })
   
});
