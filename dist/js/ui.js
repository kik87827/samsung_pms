document.addEventListener("DOMContentLoaded", function() {
  commonLayout();
});




function menuRock(item) {

}

function commonLayout() {
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

  return tempArr.filter(function(e) {
    return e != t;
  });
}

function getScrollBarWidth() {
  let outerDivitem = document.createElement('div');
  let innerDivitem = document.createElement('div');
  let getWidth = 0;
  outerDivitem.setAttribute("style", `width: 100px; overflow:scroll; height:100px;outline:1px solid red`)
  document.body.append(outerDivitem);
  outerDivitem.append(innerDivitem);
  innerDivitem.setAttribute("style", `width: 100%;height:110%;`)
  getWidth = innerDivitem.getBoundingClientRect().width;
  outerDivitem.remove();
  return 100 - getWidth;
};


var dataTableFunc = {
  drawCallBack(target) {
    var targetObj = document.querySelector(target);
    var targetObjTr = targetObj.querySelectorAll("tr:not(.nodata_tr)");
    var targetObjTrHasRowspan = null;
    if (targetObj === null) {
      return;
    }
    var thisBodywrap = targetObj.querySelector(".data_tbody_row");
    var optionRow = parseInt(targetObj.getAttribute("data-row"));
    var getPosDom = thisBodywrap.querySelectorAll("tr:not(.nodata_tr)")[optionRow];
    var activeArray = [];
    if (getPosDom !== undefined) {
      thisBodywrap.style.maxHeight = (getPosDom.offsetTop - 1) + "px";
    }
    if (targetObjTr.length) {
      targetObjTr.forEach((element) => {
        if (element.querySelector("[rowspan]") !== null) {
          element.classList.add("has_rowspan");
        }
        element.addEventListener("mouseover", (e) => {
          let thisTarget = e.currentTarget;
          let spreadDom = siblings(thisTarget);

          activeReset();

          thisTarget.classList.add("hover");
          spreadDom.forEach((spdom) => {
            if (thisTarget.dataset.name == spdom.dataset.name) {
              spdom.classList.add("hover");
            }
            activeArray.push(spdom);
          });

          activeArray.push(thisTarget);
        });
      });
      targetObjTrHasRowspan = targetObj.querySelectorAll(".has_rowspan");
      if (targetObjTrHasRowspan !== null) {
        targetObjTrHasRowspan.forEach((element, index) => {
          let thisElement = element;
          let thisElementNext = nextSiblings(element);
          thisElement.setAttribute("data-name", "trgroup" + index);
          thisElementNext.forEach((nextDom) => {
            nextDom.setAttribute("data-name", "trgroup" + index);
          })
        });
      }
    }

    targetObj.addEventListener("mouseout", () => {
      activeReset();
    })

    function activeReset() {
      if (activeArray.length) {
        activeArray.forEach((activeDom) => {
          activeDom.classList.remove("hover");
        });
      }
    }
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

  return tempArr.filter(function(e) {
    return e != t;
  });
}