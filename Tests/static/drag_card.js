function dragElement(){
var elemnt = document.getElementById(this.id)
    var pos3 = 0, pos4 = 0;
    document.getElementById(this.id).onmousedown = dragMouseDown;

function dragMouseDown(e){
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
}

function elementDrag(e){
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    elemnt.style.left = (pos3 - elemnt.offsetWidth/ 2) + "px";
    elemnt.style.top = (pos4 - elemnt.offsetHeight/ 2) + "px";
}

function closeDragElement(){
    document.onmouseup = null;
    document.onmousemove = null;
}
}