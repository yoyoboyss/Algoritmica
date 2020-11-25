var nowShow = 0;
        
function showDropMenu() {
    document.getElementById("listDropMenu").classList.toggle("show");
    nowShow = 1 - nowShow;
}
        
window.onclick = function(event) {
    if(!event.target.matches('.myDropMenu') && !event.target.matches('.algorithms') && nowShow == 1)
        showDropMenu();
}