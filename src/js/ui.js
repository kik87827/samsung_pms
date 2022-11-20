

document.addEventListener("DOMContentLoaded", function() {
    commonLayout();
});




function menuRock(item){
    
}

function commonLayout(){
    const htmlDocu = document.querySelector("html");
    const bodyDOM = document.querySelector("body");
    bodyDOM.style.minWidth = (1920 - getScrollBarWidth()) + "px";
}

function siblings(t) {
    var children = t.parentElement.children;
    var tempArr = [];

    for (var i = 0; i < children.length; i++) {
        tempArr.push(children[i]);
    }

    return tempArr.filter(function(e){
        return e != t;
    });
}

function getScrollBarWidth() {
  let outerDivitem = document.createElement('div');
  let innerDivitem = document.createElement('div');
  let getWidth = 0;
  outerDivitem.setAttribute("style",`width: 100px; overflow:scroll; height:100px;outline:1px solid red`)
  document.body.append(outerDivitem);
  outerDivitem.append(innerDivitem);
  innerDivitem.setAttribute("style",`width: 100%;height:110%;`)
  getWidth = innerDivitem.getBoundingClientRect().width;
  outerDivitem.remove();
  return 100 - getWidth;
};


var dataTableFunc = {
    drawCallBack(target){
        var targetObj = document.querySelector(target);
        if(targetObj ===null){return;}
        var thisBodywrap = targetObj.querySelector(".data_tbody_row");
        var optionRow = parseInt(targetObj.getAttribute("data-row"));
        var getPosDom = thisBodywrap.querySelectorAll("tr:not(.depth_two)")[optionRow];
        if(getPosDom !== undefined){
            thisBodywrap.style.maxHeight = (getPosDom.offsetTop-1) + "px";
        }
    }
}