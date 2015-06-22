window.onload=function(){
       var ln = document.getElementById('leftnav');
       var lna = ln.getElementsByTagName('a');
       
       lna[0].innerText="人员详细信息";
       lna[1].innerText="全部人员";
       lna[2].innerText="练习生";
       lna[3].innerText="开发组"
       lna[4].innerText="运维组";
       lna[5].innerText="设计组";
       lna[6].innerText="产品组";
       lna[7].innerText="营销组";
       lna[8].innerText="找人";
       lna[9].innerText="添加用户"; 

 
    
       lna[0].setAttribute("href","/admin/sendout/");
       lna[1].setAttribute("href","/admin/sendout/apeopleall");
       lna[2].setAttribute("href","/admin/sendout/");
       lna[3].setAttribute("href","/admin/sendout/");
       lna[4].setAttribute("href","/admin/sendout/");
       lna[5].setAttribute("href","/admin/sendout/");
       lna[6].setAttribute("href","/admin/sendout/");
       lna[7].setAttribute("href","/admin/sendout/");
       lna[8].setAttribute("href","/admin/sendout/");
       lna[9].setAttribute("href","/admin/sendout/");
 
}