

document.addEventListener("DOMContentLoaded", function() {
    // commonLayout();
   
});




function menuRock(item){
    
}

// function commonLayout(){
//     const htmlDocu = document.querySelector("html");
//     const bodyDOM = document.querySelector("body");
//     bodyDOM.style.minWidth = (1920 - getScrollBarWidth()) + "px";
// }

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
        var targetObjTr = targetObj.querySelectorAll(".data_tbody_tb tr:not(.nodata_tr)");
        var targetObjTrHasRowspan = null;
        var thisBodywrap = targetObj.querySelector(".data_tbody_row");
        var optionRow = parseInt(targetObj.getAttribute("data-row"));
        var getPosDom = thisBodywrap.querySelectorAll("tr:not(.nodata_tr)")[optionRow];
        var activeArray = [];
        if(getPosDom !== undefined){
            thisBodywrap.style.maxHeight = (getPosDom.offsetTop-1) + "px";
        }
        if(targetObjTr.length){
            
            targetObjTr.forEach((element)=>{
                if(element.querySelector("[rowspan]") !== null){
                    element.classList.add("has_rowspan");
                }
                element.addEventListener("mouseover",(e)=>{
                    let thisTarget = e.currentTarget;
                    let spreadDom = siblings(thisTarget);
                    if(targetObjTrHasRowspan.length === 0){return;}
                    activeReset();
                    //thisTarget.classList.add("hover");
                    spreadDom.forEach((spdom)=>{
                        if(thisTarget.dataset.name == spdom.dataset.name){
                            spdom.classList.add("hover");
                        }
                        activeArray.push(spdom);
                    });
                    activeArray.push(thisTarget);
                });
            });
            targetObjTrHasRowspan = targetObj.querySelectorAll("tbody .has_rowspan");
            if(targetObjTrHasRowspan !== null){
                targetObjTrHasRowspan.forEach((element,index)=>{
                    let thisElement = element;
                    let thisElementNext = nextSiblings(element);
                    thisElement.setAttribute("data-name","trgroup"+index);
                    thisElementNext.forEach((nextDom)=>{
                        nextDom.setAttribute("data-name","trgroup"+index);
                    })
                });
            }
        }

        targetObj.addEventListener("mouseout",()=>{
            activeReset();
        })

        function activeReset(){
            if(activeArray.length){
                activeArray.forEach((activeDom)=>{
                    activeDom.classList.remove("hover");
                });
            }
        }
    }
}


var designTableFunc = {
    drawCallBack(row){
        var targetObj = document.querySelectorAll(".design_tbody_table_scroll_wrap");
        if(targetObj.length===0){return;}
        targetObj.forEach((table_element)=>{
            var optionRow = row;
            var getPosDom = table_element.querySelectorAll("tr:not(.nodata_tr)")[optionRow];
            if(getPosDom !== undefined){
                table_element.style.maxHeight = (getPosDom.offsetTop) + "px";
            }
        });
    }
}

var dataListTableFunc = {
    drawCallBack(target){
        var targetObj = document.querySelectorAll(target);
        if(targetObj.length===0){return;}
        targetObj.forEach((table_element)=>{
            var optionRow = table_element.dataset.row;
            var getPosDom = table_element.querySelectorAll("tr:not(.nodata_tr)")[optionRow];
            if(getPosDom !== undefined){
                table_element.style.maxHeight = (getPosDom.offsetTop-1) + "px";
            }
        });
    }
}

function boxWinHeightFunc(){
    var box_winpop_render = document.querySelector(".box_winpop_render");
    if(box_winpop_render !== null){
        box_winpop_render.style.minHeight = (window.innerHeight - box_winpop_render.offsetTop - 30) + "px";
    }
}



const nextSiblings = (elem) => {
    // create an empty array
    let siblings = [];

    // loop through next siblings until `null`
    while (elem = elem.nextElementSibling) {
        // push sibling to array
        siblings.push(elem);
    }
    return siblings;
};

const prevSiblings = (elem) => {
    // create an empty array
    let siblings = [];

    // loop through prev siblings until `null`
    while (elem = elem.previousElementSibling) {
        siblings.push(elem);
    }
    return siblings;
};


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


function minHeightCard(items){
    if(items === undefined){return;}
    let itemsArray = items.split(",");
    let itemsArrayDom = document.querySelectorAll(itemsArray);

    function action(){
        itemsArrayDom.forEach((element)=>{
            let thisElement = element;
            thisElement.style.removeProperty('min-height');
            let thisPos = window.innerHeight - (thisElement.getBoundingClientRect().top) - 6 | 0;
            thisElement.setAttribute("style",`min-height:${thisPos}px`);
        });
    }
    function bindEvent(){
        window.addEventListener("resize",()=>{
            action();
        });
    }

    action();
    bindEvent();
}


let layerPopup = {
    show(option){
        var touchIs = "ontouchstart" in window,
			modal = document.querySelectorAll(".dimlayer_z"),
			target_obj = option.target,
			target_dom = null,
			app_wrap = document.querySelector(".page_wrap"),
			fullpop_item = null,
			fullpop_titlow = null,
			fullpop_contlow = null;

        
        var domHtml = document.querySelector("html");
        var domBody = document.querySelector("body");
       
        if(target_obj === null){
            return;
        }
        target_dom = document.querySelector(option.target);
        
        modal.forEach((element)=>{
            element.classList.remove("active");
        })
        target_dom.classList.add("active");
        if("beforeCallback" in option){
            option.beforeCallback();
        }
        setTimeout(()=>{
            target_dom.classList.add("motion");
        },30);
        setTimeout(()=>{
            if("openCallback" in option){
                option.openCallback();
            }
        },530);
        
        target_dom.style.minWidth = (1920 - getScrollBarWidth()) + "px";
        app_wrap.style.zIndex = "0";
        app_wrap.appendChild(target_dom);
        heightcheck();
        if(target_dom.classList.contains("fulltype")){
            fullpop_titlow = target_dom.querySelector(".fullpop_titlow");
            fullpop_contlow = target_dom.querySelector(".fullpop_contlow");
            fullpop_item = target_dom.querySelector(".fullpop_item");
        }
       
        function heightcheck(){
            if(touchIs){
                domBody.setAttribute("data-scr", window.pageYOffset);
                domBody.style.marginTop = -window.pageYOffset+"px";
                scrollValue = window.pageYOffset;
                domHtml.classList.add("touchDis");
            }
        }
    },
    hide(option){
        var touchIs = "ontouchstart" in window,
            target_obj = option.target,
			target_dom = null,
            app_wrap = document.querySelector(".page_wrap");
        
        var domHtml = document.querySelector("html");
        var domBody = document.querySelector("body");

        
        if(target_obj !== null || target_obj.length>0){
            target_dom = document.querySelectorAll(option.target);
            target_dom.forEach((element)=>{
                element.classList.remove("motion");
                setTimeout(()=>{
                    element.classList.remove("active");
                },530);
            })
            app_wrap.style.removeProperty('z-index');
            domBody.classList.remove("touchDis");
            scrollEnd();
            if("closeCallback" in option){
                option.closeCallback();
            }
            function scrollEnd(){
                if(touchIs){
                    domHtml.classList.remove("touchDis");
                    domBody.style.marginTop = 0;
                    window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
                }
            }
        }
    },
    bindEvent(){
        var objThis = this;
        addDynamicEventListener(document.body, 'click', '.btn_layerclose , .closetrigger , .fullpop_dim', function (e) {
            let thisObj = e.target;
            let thisObjParent = thisObj.closest(".dimlayer_z");
            e.preventDefault();
            objThis.hide({
                target : "."+thisObjParent.classList[0]
            });
        });
    }
}

layerPopup.bindEvent();