$(document).ready(function(){

    var flag = false;
    var type_d2n = {};
    var type_n2d = {};
    var status_d2n = {};
    var status_n2d = {};
    type_d2n_init();
    function type_d2n_init(){
        type_d2n["0"]="科研项目";
        type_d2n["1"]="外包项目";
        type_d2n["2"]="geek创意";
        type_d2n["3"]="校园作品";
        type_d2n["all"]="所有类型"
        type_n2d["科研项目"]="0";
        type_n2d["外包项目"]="1";
        type_n2d["geek创意"]="2";
        type_n2d["校园作品"]="3";
        type_n2d["所有类型"]="all"
    }

    status_d2n_init();
    function status_d2n_init(){
        status_d2n["0"]="开始报名";
        status_d2n["1"]="火热进行";
        status_d2n["2"]="圆满完成";
        status_d2n["3"]="有事烧纸";

        status_n2d["开始报名"]="0";
        status_n2d["火热进行"]="1";
        status_n2d["圆满完成"]="2";
        status_n2d["有事烧纸"]="3";
    }


   init();
    function init(){
        flag = false;
        var status = $("#status").val();
        var type = $("#cls").val();
        console.log(status+"   " + type);
        $(".t_old").remove();
        $.ajax({
            url:"projects",
            type:"post",
            data:{status:status,type:type},
            dataType:"json",
            success:function(msg){
                console.log(msg.data);
                var data = msg.data;
                if(data&&data.length>0){
                    for(var i=0;i<data.length;i++){
                        var p = $(".template").eq(0).clone(true);
                        $(p).removeClass().addClass('t_old');
                        p.find(".a").html(data[i].ptitle);
                        p.find(".b").html(status_d2n[data[i].pstaute]);
                        p.find(".l").html(type_d2n[data[i].ptype]);
                        p.find(".c").html(new Date(data[i].ptime).toLocaleDateString());
                        p.find(".text").html(data[i].pcontent);
                        p.find(".e").val(data[i]._id);
                        
                        var members = $(p).find(".n1>.members");
                        if(data[i].pmembers&&data[i].pmembers.length&&data[i].pmembers.length>0){
                            for(var j=0;j<data[i].pmembers.length;j++){
                                var member = $('<div class="member"><span class="d">'+data[i].pmembers[j].uname+'</span><input type="image" value="删除" src="/images/u53.png" class="del_member"></div>');
                                members.after(member);
                            }
                        }
                        var docs = $(p).find(".n2");
                        if(data[i].pdocs&&data[i].pdocs.length&&data[i].pdocs.length>0){
                            for(var k=0;k<data[i].pdocs.length;k++){
                                var doc = $('<div class="doc"><a href="'+data[i].pdocs[k]+'"><span>需求文档(doc)</span></a><input type="image" class="del_doc" value="删除" src="/images/u53.png"></div>')
                                doc.appendTo(docs);
                            }
                        }
                        $(p).insertBefore("#more");
                    }
                }
            },
            error:function(){
                alert("error..");
            }
        })
    }

    $("#status").change(function(){
        init();
    });
    $("#cls").change(function(){
        init();
    });


$(document).on("click",".edit_project",function(){
    var parent=$(this).parent();
    var tp=$(this).parent().parent();


    var a = parent.find(".a").html();
    var b = parent.find(".b").html();
    var l = parent.find(".l").html();
    var c = parent.find(".c").html();
    var text = parent.find(".text").html();
    var e = parent.find(".e").val();

    var parent2= $(".t_new").clone(true);
    parent2.removeClass().addClass("t_old").insertBefore($(tp)).show();

    parent2.find(".a_x").val(a);
    parent2.find(".status").val(status_n2d[b]);
    parent2.find(".cls").val(type_n2d[l]);
    parent2.find(".c_x").val(c);
    parent2.find(".e_x").val(e);
    parent2.find(".text_x").val(text);

    var member = $(tp).find(".n1>.member")||[];
    for(var i=0;i<member.length;i++){
        parent2.find(".n1>.members").after(member[i]);
    }
    var doc = $(tp).find(".n2>.doc")||[];
    for(var i=0;i<doc.length;i++){
        parent2.find(".n2>.docs>.up_doc").before(doc[i]);
    }

    parent2.find(".my_doc").show();
    parent2.find(".up_member").show();
    parent2.find(".del_member").show();
    parent2.find(".del_doc").show();



    $(tp).remove();


});


    $(document).on("click",".shanchu",function(){
    	   $(this).parent().parent().remove();
    	});
    $(document).on("click",".del_doc",function(){
         $(this).parent().remove();
      });
    $(document).on("click",".del_member",function(){
         $(this).parent().remove();
      });





   $("#add").click( 
      function()
      { 
        
        var x=$(".t_new").eq(0).clone(true); 
        $(x).find(".b_x").val("0");
        $(x).find(".l_x").val("0");
          $(x).find('.c_x').val(new Date().toLocaleDateString());
          $(x).find('.up_member').show();
        x.removeClass().addClass("t_old").insertBefore($("#more")).show();
      }

   );


   // 加号图标  添加文档

   $(document).on("click",".my_doc",
      function()
      {
        var p=$(this).parent();
        var q=$(this).parent().parent();


          if(flag){
              var data = new FormData();
              var files = $(p).find(".add_doc")[0].files;
              console.log(files);
              if(files){
                  data.append("file",files[0]);
              }
              $.ajax({
                  url:"/test/uploads",
                  type: "post",
                  data: data,
                  dataType:"json",
                  contentType:false,
                  processData:false,
                  success: function (msg) {
                      var doc = $('<div class="doc"><a href="'+msg.path+'"><span>需求文档(doc)</span></a><input type="image" class="del_doc" value="删除" src="/images/u53.png"></div>');
                      doc.insertBefore($(p)).show();
                      alert("insert");
                  },
                  error:function(msg){alert("error");}

              })
              flag=false;
          }else{
              var i = $(p).find(".add_doc");
              $(i).click();
              flag=true;
          }

      }
    );

    $(document).on("click",".add_member",
        function(){
            var members = $(this).parent().parent().find(".members");
            var name=$(this).parent().find(".member_name").val()||"undefined";
            var member = $('<div class="member"><span class="d">'+name+'</span><input type="image" src="/images/u53.png" class="del_member"></div>');
            members.after(member);
            member.find(".del_member").show();
        });



   $(".queren").click(function(){
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
           $(tp).find(".shanchu_renyuan").hide(); 
           $(tp).find(".add_wendang").hide();
           p2.remove();
        }
   });

$(document).on("click",".sub_project",function(){

    var p2=$(this).parent();
    var tp=$(this).parent().parent();

    //(pid,title,content,type,status,members,docs
    var a_x = p2.find(".a_x").val();   //title
    var cls = p2.find(".cls").val();  //type
    var status =p2.find(".status").val();  //status
    var e_x = p2.find(".e_x").val();  //pid
    var text_x = p2.find(".text_x").val(); //content

    var members = [];
    var tp_members = tp.find(".n1 .member");
    for(var i=0;i<tp_members.length;i++){
        members.push($(tp_members[i]).find(".d").html());
    }
    var docs = [];
    var tp_docs = tp.find(".n2>.docs>.doc");
    for(var i=0;i<tp_docs.length;i++){
        docs.push($(tp_docs[i]).find("a").attr("href"));
    }

    $.ajax({
        url:"projectEdit",
        type:"post",
        data:{pid:e_x,title:a_x,type:cls,status:status,content:text_x,members:members,docs:docs},
        dataType:"json",
        success:function(msg){
            console.log(msg);
            var parent = $(".template").eq(0).clone(true);
            parent.find(".a").html(a_x);
            parent.find(".b").html(status_d2n[status]);
            parent.find(".l").html(type_d2n[cls]);
            parent.find(".c").html(new Date().toLocaleDateString());
            parent.find(".text").html(text_x);
            parent.find(".e").val(e_x);

            var member = $(tp).find(".n1 .member")||[];
            for(var i=0;i<member.length;i++){
                parent.find(".n1>.members").after(member[i]);
            }
            var doc = $(tp).find(".n2 .doc")||[];
            for(var i=0;i<doc.length;i++){
                parent.find(".n2>.docs>.up_doc").before(doc[i]);
            }
            parent.removeClass().addClass("t_old");

            parent.insertBefore(tp).show();
            tp.remove();
        },
        error:function(){
            alert("error");
        }
    })
});

$(document).on("click",".cancel",function(){
    var p2=$(this).parent();
    var tp=$(this).parent().parent();

    var a_x = p2.find(".a_x").val();   //title
    var cls = p2.find(".cls").val();  //type
    var status =p2.find(".status").val();  //status
    var time = p2.find(".c_x").val();
    var e_x = p2.find(".e_x").val();  //pid
    var text_x = p2.find(".text_x").val(); //content

    var parent = $(".template").eq(0).clone(true);
    parent.find(".a").html(a_x);
    parent.find(".b").html(status_d2n[status]);
    parent.find(".l").html(type_d2n[cls]);
    parent.find(".c").html(new Date(time).toLocaleDateString());
    parent.find(".text").html(text_x);
    parent.find(".e").val(e_x);

    var member = $(tp).find(".n1 .member")||[];
    for(var i=0;i<member.length;i++){
        parent.find(".n1>.members").after(member[i]);
    }
    var doc = $(tp).find(".n2 .doc")||[];
    for(var i=0;i<doc.length;i++){
        parent.find(".n2>.docs>.up_doc").before(doc[i]);
    }
    parent.removeClass().addClass("t_old");

    parent.insertBefore(tp).show();
    tp.remove();

})
       
$(document).on("click",".del_project",function(){
    var tp = $(this).parent().parent();
    var pid = $(this).parent().find(".e").val();

    $.ajax({
        url:"projectDel",
        type:"post",
        data:{pid:pid},
        dataType:"json",
        success:function(){
            tp.remove();
        },
        error:function(){
            alert("error..");
        }
    })
})
});