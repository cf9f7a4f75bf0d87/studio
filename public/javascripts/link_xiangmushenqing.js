$(document).ready(function(){
    
    $("#text1").hide();
    $("#text2").hide();
    $("#text3").hide();

    $(".op").change(function(){
        if( this.value == 0 )
        {
            $("#text0").fadeIn();
            $("#text1").hide();
            $("#text2").hide();
            $("#text3").hide();
        }
         if( this.value == 1 )
        {   
            $("#text1").fadeIn();
            $("#text0").hide();
            $("#text2").hide();
            $("#text3").hide();
        }
         if( this.value == 2 )
        {
            $("#text2").fadeIn();
            $("#text0").hide();
            $("#text1").hide();
            $("#text3").hide();
        }

        if( this.value == 3 )
        {
            $("#text3").fadeIn();
            $("#text0").hide();
            $("#text1").hide();
            $("#text2").hide();
        }
    });


            $(".shanchu").click
        (
            function()
                 {
                     var j = $(this).siblings()[0];


                    $.ajax({
                         url:"projectMsgNoJ",
                         type:"post",
                         data:{msg: j.value},
                         dataType:"json",
                         success:function(){

                             $(this).parent().parent().remove();
                         },
                         error:function(req,txt){
                             alert("error: " + req.status + " " + txt );
                         }
                     });
                 }
        );


        $(".queren").click
        (
            function()
                 {
                     var j = $(this).siblings()[0];
                     $.ajax({
                         url:"projectMsgOkJ",
                         type:"post",
                         data:{msg: j.value},
                         dataType:"json",
                         success:function(){
                             $(this).parent().parent().remove();
                         },
                         error:function(req,txt){
                             alert("error: " + req.status + " " + txt );
                         }
                     });
                 }
        );
        

        $(".j1").click(
           function()
              {     
                            var a = [];
                            $("#text0 input[name='msgs']").each(function (i, o) {
                                if ($(o).is(":checked")) {
                                    //alert($(o).val());
                                    a.push($(o).val());
                                }
                            })
                            alert(a);

                            $.ajax({
                                    url: "projectMsgNoJ",
                                    type: "post",
                                    data: {msg: a},
                                    dataType: "json",
                                    success: function (req, txt) {
                                        $("#text0 .checkbox1").each
                                        (
                                            function () {
                                                if (this.checked == true) {
                                                    $(this).parent().parent().remove();
                                                }

                                            }
                                        )
                                    },
                                    error: function (err, txt) {
                                        alert(err.status + "  " + txt);
                                    }
                        }
                     )
              }
        );

        $(".t1").click(
           function()
              {

                  var a = [];
                  $("#text0 input[name='msgs']").each(function (i, o) {
                      if ($(o).is(":checked")) {
                          a.push($(o).val());
                      }
                  })
                  alert(a);

                  $.ajax({
                      url: "projectMsgOkJ",
                      type: "post",
                      data: {msg: a},
                      dataType: "json",
                      success: function (req, txt) {
                          $("#text0 .checkbox1").each
                          (
                              function () {
                                  if (this.checked == true) {
                                      $(this).parent().parent().remove();
                                  }
                              }
                          )
                      },
                      error: function (err, txt) {
                          alert(err.status + "  " + txt);
                      }
                  });

              }
        );

    $(".j2").click(
        function()
        {
            var a = [];
            $("#text1 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    //alert($(o).val());
                    a.push($(o).val());
                }
            })
            alert(a);

            $.ajax({
                    url: "projectMsgNoJ",
                    type: "post",
                    data: {msg: a},
                    dataType: "json",
                    success: function (req, txt) {
                        $("#text1 .checkbox1").each
                        (
                            function () {
                                if (this.checked == true) {
                                    $(this).parent().parent().remove();
                                }

                            }
                        )
                    },
                    error: function (err, txt) {
                        alert(err.status + "  " + txt);
                    }
                }
            )
        }
    );

    $(".t2").click(
        function()
        {

            var a = [];
            $("#text1 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    a.push($(o).val());
                }
            })
            alert(a);

            $.ajax({
                url: "projectMsgOkJ",
                type: "post",
                data: {msg: a},
                dataType: "json",
                success: function (req, txt) {
                    $("#text1 .checkbox1").each
                    (
                        function () {
                            if (this.checked == true) {
                                $(this).parent().parent().remove();
                            }
                        }
                    )
                },
                error: function (err, txt) {
                    alert(err.status + "  " + txt);
                }
            });

        }
    );


    $(".j3").click(
        function()
        {
            var a = [];
            $("#text1 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    //alert($(o).val());
                    a.push($(o).val());
                }
            })
            alert(a);

            $.ajax({
                    url: "projectMsgNoJ",
                    type: "post",
                    data: {msg: a},
                    dataType: "json",
                    success: function (req, txt) {
                        $("#text1 .checkbox1").each
                        (
                            function () {
                                if (this.checked == true) {
                                    $(this).parent().parent().remove();
                                }

                            }
                        )
                    },
                    error: function (err, txt) {
                        alert(err.status + "  " + txt);
                    }
                }
            )
        }
    );

    $(".t3").click(
        function()
        {

            var a = [];
            $("#text2 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    a.push($(o).val());
                }
            })
            alert(a);

            $.ajax({
                url: "projectMsgOkJ",
                type: "post",
                data: {msg: a},
                dataType: "json",
                success: function (req, txt) {
                    $("#text2 .checkbox1").each
                    (
                        function () {
                            if (this.checked == true) {
                                $(this).parent().parent().remove();
                            }
                        }
                    )
                },
                error: function (err, txt) {
                    alert(err.status + "  " + txt);
                }
            });

        }
    );


    $(".j4").click(
        function()
        {
            var a = [];
            $("#text3 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    //alert($(o).val());
                    a.push($(o).val());
                }
            })
            alert(a);

            $.ajax({
                    url: "projectMsgNoJ",
                    type: "post",
                    data: {msg: a},
                    dataType: "json",
                    success: function (req, txt) {
                        $("#text3 .checkbox1").each
                        (
                            function () {
                                if (this.checked == true) {
                                    $(this).parent().parent().remove();
                                }

                            }
                        )
                    },
                    error: function (err, txt) {
                        alert(err.status + "  " + txt);
                    }
                }
            )
        }
    );

    $(".t4").click(
        function()
        {

            var a = [];
            $("#text3 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    alert(a);
                    a.push($(o).val());
                }
            })
            alert(a);

            $.ajax({
                url: "projectMsgOkJ",
                type: "post",
                data: {msg: a},
                dataType: "json",
                success: function (req, txt) {
                    $("#text3 .checkbox1").each
                    (
                        function () {
                            if (this.checked == true) {
                                $(this).parent().parent().remove();
                            }
                        }
                    )
                },
                error: function (err, txt) {
                    alert(err.status + "  " + txt);
                }
            });

        }
    );





});