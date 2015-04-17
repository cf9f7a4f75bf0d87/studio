window.onload=function(){
       var ln = document.getElementById('leftnav');
       var lna = ln.getElementsByTagName('a');
       lna[0].innerText="个人资料";
       lna[1].innerText="申请项目";
       lna[2].innerText="发送反馈";
       lna[3].innerText="加入组织";
       lna[4].innerText=""; 
z
       lna[0].setAttribute("href","/user/");
       lna[1].setAttribute("href","/use/projectsList");
       lna[2].setAttribute("href","/user/sendFeedBack");
       lna[3].setAttribute("href","/user/joinGroup");
}