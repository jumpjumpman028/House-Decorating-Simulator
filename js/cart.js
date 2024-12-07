function minus(){
    let n = document.getElementById("qty").value;
    if(parseInt(n)>0)document.getElementById("qty").value = parseInt(n)-1;
}
function plus(){
    let n = document.getElementById("qty").value;
    document.getElementById("qty").value = parseInt(n)+1;
}
function start(){
    document.getElementById("minus").addEventListener("click",minus,false);
    document.getElementById("plus").addEventListener("click",plus,false);
}

window.addEventListener("load",start,false);
