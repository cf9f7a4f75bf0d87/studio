window.onload=function(){
       var ln = document.getElementById('leftnav');
       var lna = ln.getElementsByTagName('a');
       lna[0].innerText="游客留言";
       lna[1].innerText="成员反馈";
       lna[2].innerText="加入申请";
       lna[3].innerText="项目申请";
      // lna[4].innerText=""; 

       lna[0].setAttribute("href","/admin/tip/leaveMsg");
       lna[1].setAttribute("href","/admin/tip/feedback");
       lna[2].setAttribute("href","/admin/tip/joinMsg");
       lna[3].setAttribute("href","/admin/tip/projectMsg");

 
}