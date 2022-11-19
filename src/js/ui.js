

document.addEventListener("DOMContentLoaded", function() {
  commonLayout();
    comboFunc();
    dynamicTab();
    quickMenu();
    searchForm();
});


window.addEventListener("load",()=>{
    localLayer();
});


function menuRock(item){
    let itemObj = document.querySelector(item);
    if(itemObj !== null){
        itemObj.classList.add("active");
    } 
}

function commonLayout(){
    const btn_pageTop = document.querySelector("#btn_pageTop");
    const htmlDocu = document.querySelector("html");
    const bodyDOM = document.querySelector("body");
    bodyDOM.style.minWidth = (1920 - getScrollBarWidth()) + "px";

    if(btn_pageTop !== null){
        btn_pageTop.addEventListener("click",(e)=>{
            e.preventDefault();
            htmlDocu.classList.add("smooth");
            setTimeout(()=>{
                window.scrollTo(0,0);
            },30);
        });
        window.addEventListener("scroll",()=>{
            if(window.scrollY === 0){
                htmlDocu.classList.remove("smooth");
            }
        });
    }
}
var dataTableFunc = {
    bindEvent(){
        addDynamicEventListener(document.body, 'click', '.fold_item', function(e) {
            e.preventDefault();
            
            let thisObj = e.target;
            let thisObjParent = thisObj.closest(".depth_one");
            let thisObjParent2 = thisObj.closest(".fk_tb_tr_group");
            let thisObjParentTarget = thisObjParent.nextElementSibling;
            if(thisObj.classList.contains(".fold_item")){
                thisObj.classList.toggle("active");
            }else{
                thisObj.closest(".fold_item").classList.toggle("active");
            }
            thisObjParentTarget.classList.toggle("active");
            if(thisObjParent2 !== null){
                thisObjParent2.classList.toggle("active");
            }
        },false);
        addDynamicEventListener(document.body, 'click', '[name="total_check"]', function(e) {
            let etarget = e.target;
            let etargetParent = etarget.closest(".data_table_wrap");
            let etargetBody = etargetParent.querySelector(".tbody_table_wrap");
            let etargetBodycheck = etargetBody.querySelectorAll(".design_check");
            etargetBodycheck.forEach((element)=>{
                element.checked = etarget.checked;
            })
        },false);
    },
    drawCallBack(target){
        var targetObj = document.querySelector(target);
        if(targetObj ===null){return;}
        var thisHeadwrap = targetObj.querySelector(".thead_table_wrap");
        var thisBodywrap = targetObj.querySelector(".tbody_table_wrap");
        var thisFootwrap = targetObj.querySelector(".tfoot_table_wrap");
        var optionRow = parseInt(targetObj.getAttribute("data-row"));
        var getPosDom = thisBodywrap.querySelectorAll("tr:not(.depth_two)")[optionRow];
        if(getPosDom !== undefined){
            thisBodywrap.style.maxHeight = getPosDom.offsetTop + "px";
            // thisHeadwrap.style.paddingRight = getScrollBarWidth() + "px";
            // if(thisFootwrap !== null){
            //     thisFootwrap.style.paddingRight = getScrollBarWidth() + "px";
            // }
        }
    }
}
// function dataTableFunc(){
//     let data_table_wrap = document.querySelectorAll(".data_table_wrap");
//     addDynamicEventListener(document.body, 'click', '.fold_item', function(e) {
//         e.preventDefault();
        
//         let thisObj = e.target;
//         let thisObjParent = thisObj.closest(".depth_one");
//         let thisObjParentTarget = thisObjParent.nextElementSibling;

//         if(thisObj.classList.contains(".fold_item")){
//             thisObj.classList.toggle("active");
//         }else{
//             thisObj.closest(".fold_item").classList.toggle("active");
//         }
//         thisObjParentTarget.classList.toggle("active");

//     },false);
//     data_table_wrap.forEach((element) => {
//         let thisTbwrap = element;
//         let thisHeadwrap = thisTbwrap.querySelector(".thead_table_wrap");
//         let thisBodywrap = thisTbwrap.querySelector(".tbody_table_wrap");
//         let thisFootwrap = thisTbwrap.querySelector(".tfoot_table_wrap");
//         let thisTotalCheck = thisHeadwrap.querySelector("[name='total_check']");
//         let thisBodyCheck = thisTbwrap.querySelectorAll(".design_check");
//         let optionRow = parseInt(thisTbwrap.getAttribute("data-row"));
//         let getPosDom = thisBodywrap.querySelectorAll("tr:not(.depth_two)")[optionRow];
//         if(getPosDom !== undefined){
//             thisBodywrap.style.maxHeight = getPosDom.offsetTop + "px";
//             thisHeadwrap.style.paddingRight = getScrollBarWidth() + "px";
//             thisFootwrap.style.paddingRight = getScrollBarWidth() + "px";
//         }
        
//         thisTotalCheck.addEventListener("click",(e)=>{
//             thisBodyCheck.forEach((element)=>{
//                 element.checked = thisTotalCheck.checked;
//             })
//         });
//     });
// }


function dynamicTab(){
    addDynamicEventListener(document.body, 'click', '[data-formTarget]', function(e) {
        tabRadioAction(e.target);
    });

    addDynamicEventListener(document.body, 'click', '.bartab_menu , .cont_tabmenu', function(e) {
        e.preventDefault();
        tabAction(e.target);
    });
    
    function tabAction(target){
        let thisTab = target;
        let thisTabLi = thisTab.closest("li");
        let thisTabTarget = thisTab.getAttribute("href");
        let thisTabTargetDom = document.querySelector(thisTabTarget);
        let thisTabParent = thisTab.closest("[data-targetGroup]");
        let thisTabParentNot = siblings(thisTabLi);
        let thisTargetGroup = thisTabParent.getAttribute("data-targetGroup");
        let thisTargetGroupDom = document.querySelector(thisTargetGroup);
        let thisTargetGroupCont = [].slice.call(thisTargetGroupDom.children);
        thisTargetGroupCont.forEach((element)=>{
            element.classList.remove("active");
        });
        thisTabTargetDom.classList.add("active");
        
        
        thisTabParentNot.forEach((element)=>{
            element.classList.remove("active");
        });
        thisTabLi.classList.add("active");
    }

    function tabRadioAction(target){
        let thisTab = target;
        let thisTabLi = thisTab.closest("li");
        let thisTabTarget = thisTab.getAttribute("data-formTarget");
        let thisTabTargetDom = document.querySelector(thisTabTarget);
        let thisTabParent = thisTab.closest("[data-formGroup]");
        let thisTabParentNot = siblings(thisTabLi);
        let thisTargetGroup = thisTabParent.getAttribute("data-formGroup");
        let thisTargetGroupDom = document.querySelector(thisTargetGroup);
        let thisTargetGroupCont = thisTargetGroupDom !== undefined ? [].slice.call(thisTargetGroupDom.children) : null;

        if(thisTab.disabled){return;}
        thisTargetGroupCont.forEach((element)=>{
            element.classList.remove("active");
        });
        thisTabTargetDom.classList.add("active");
        
        
        thisTabParentNot.forEach((element)=>{
            element.classList.remove("active");
        });
        thisTabLi.classList.add("active");
    }
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

let layerPopup = {
    show(option){
        var touchIs = "ontouchstart" in window,
			modal = document.querySelectorAll(".dimlayer_z"),
			target_obj = option.target,
			target_dom = null,
			app_wrap = document.querySelector("#app"),
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
            app_wrap = document.querySelector("#app");
        
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
            app_wrap.style.removeProperty('z-index')
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



function DesignModal(option) {
    this.message = option.message;
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector("#app");
    this.design_modal_wrap = null;
    this.btn_dmsmidentify = null;
    this.btn_dmsmcancel = null;
    this.btn_closeModal = null;
    this.duration = option.duration !== undefined ? option.duration : 400;

    this.initShow(option);
}

DesignModal.prototype.initShow = function (option) {
    var innerPublish = '';
	var objThis = this;

    var iconType = option.icontype !== undefined ? option.icontype : "";
    var titleText = option.title !== undefined ? option.title : "타이틀";

    innerPublish += "<div class='design_modal_wrap'>";
    innerPublish += "  <div class='bg_design_modal'></div>";
    innerPublish += "  <div class='design_modal_tb'>";
    innerPublish += "      <div class='design_modal_td'>";
    innerPublish += "          <div class='design_modal'>";
    innerPublish += "              <div class='design_modal_title_w'><div class='design_modal_title ico_"+iconType+"'><span class='design_modal_title_intext'>"+titleText+"</span></div></div>";
    innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
    innerPublish += "              <div class='btn_dmsm_wrap'>";
    if (option.type === "confirm") {
        innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>아니오</a>";
    }
    innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>예</a>";
    innerPublish += "              </div>";
    innerPublish += "              <a href='javascript:;' class='btn_modal_close'><span class='hdtext'>닫기</span></a>";
    innerPublish += "          </div>";
    innerPublish += "      </div>";
    innerPublish += "  </div>";
    innerPublish += "</div>";
    this.modalparent = document.createElement('div');
    this.pagewrap.appendChild(this.modalparent);
    this.modalparent.classList.add("design_modal_insert_wrap");
    this.modalparent.innerHTML = innerPublish;

    if (option.type === "confirm" || option.type === "alert") {
        this.design_modal_text = document.querySelector(".design_modal_text");
        this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
        this.design_modal_text.innerHTML = option.message;
    }
    if (option.type === "confirm") {
        this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
    }
    this.btn_closeModal = document.querySelector(".btn_modal_close");
    this.pagewrap.style.zIndex = 0;
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = -window.pageYOffset+"px";
    this.domHtml.classList.add("touchDis");
    this.design_modal_wrap = document.querySelector(".design_modal_wrap");
    this.closetrigger = document.querySelectorAll(".close_dmtrigger");
	this.design_modal_wrap.classList.add("active");
	setTimeout(function(){
		objThis.design_modal_wrap.classList.add("motion");
	},30);
    this.bindEvent(option);
}
DesignModal.prototype.removeHide = function () {
	var objThis = this;
	this.design_modal_wrap.classList.remove("motion");
	setTimeout(function(){
		objThis.design_modal_wrap.classList.remove("active");
    	document.querySelector(".design_modal_insert_wrap").remove();
		objThis.design_modal_wrap.remove();
		objThis.domHtml.classList.remove("touchDis");
		objThis.domBody.style.marginTop = 0;
		
		window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));
	},530);
}
DesignModal.prototype.bindEvent = function (option) {
    var objThis = this;
    for (var i = 0; i < this.closetrigger.length; i++) {
        this.closetrigger[i].addEventListener("click", function () {
            objThis.removeHide();
        }, false);
    }
    if (this.btn_dmsmidentify !== null) {
        this.btn_dmsmidentify.addEventListener("click", function () {
            if (option.identify_callback !== undefined) {
                option.identify_callback();
            }
        }, false);
    }
    if (this.btn_dmsmcancel !== null) {
        this.btn_dmsmcancel.addEventListener("click", function () {
            if (option.cancel_callback !== undefined) {
                option.cancel_callback();
            }
        }, false);
    }
    if (this.btn_closeModal !== null) {
        this.btn_closeModal.addEventListener("click", function () {
            objThis.removeHide();
        }, false);
    }
}

function callDimLayer(option){
    const d_layer_call = document.querySelectorAll(".d_layer_call");
    const appwrap = document.querySelector("#app");
    let dim_layer_wrap = document.querySelector(".dim_layer_wrap");
    d_layer_call.forEach((element) => {
        // action(element);
        element.addEventListener("click",(e)=>{
            let thisObj = e.currentTarget;
            action(thisObj);
        });
    });

    function action(target){
        let d_parent = target.closest(".d_parent");
        let dim_pos_wrap = dim_layer_wrap.querySelector(".dim_pos_wrap");
        d_parent.classList.add("call_open");
        dim_layer_wrap.classList.add("active");
        dim_pos_wrap.setAttribute("style",`top:${d_parent.getBoundingClientRect().top + d_parent.getBoundingClientRect().height + 10}px;left:${d_parent.getBoundingClientRect().left}px`)
        $('input.date_range_input').trigger("focus");
    }
    // 달력
    $('input.date_range_input').daterangepicker({
        autoUpdateInput : false, 
        showDropdowns: true,
        locale : {
            format : 'YYYY-MM-DD',
            "daysOfWeek": ["일","월","화","수","목","금","토"],
            "monthNames": ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
            cancelLabel: '취소',
            applyLabel: '적용'
        }
    });
    $("input.date_range_input").on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY년 MM월 DD일') + ' ~ ' + picker.endDate.format('YYYY년 MM월 DD일'));
    });
    $("input.date_range_input").on('hide.daterangepicker', function(ev, picker) {
        $(".choice_date_box").text(picker.startDate.format('YYYY년 MM월 DD일') + ' ~ ' + picker.endDate.format('YYYY년 MM월 DD일'));
        $(".dim_layer_wrap").removeClass("active").css({top : '', left : ''});
        if("hideCallback" in option){
            option.hideCallback();
        }
    });
}


function callCalendar(option){
    $(option.target).daterangepicker({
        autoUpdateInput : true, 
        showDropdowns: true,
        singleDatePicker: option.singleDatePicker,
        locale : {
            format : 'YYYY년 MM월 DD일',
            "daysOfWeek": ["일","월","화","수","목","금","토"],
            "monthNames": ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
            cancelLabel: '취소',
            applyLabel: '적용'
        }
    });
    $(option.target).on('apply.daterangepicker', function(ev, picker) {
        
    });
    $(option.target).on('hide.daterangepicker', function(ev, picker) {
        if("hideCallback" in option){
            option.hideCallback();
        }
    });
}



function scrollTableFunc(){
    const data_scroll_middle_wrap = document.querySelector(".data_scroll_middle_wrap");
    const data_scroll_head_inwrap = document.querySelector(".data_scroll_head_inwrap");
    const data_scroll_main_cell = document.querySelector(".data_scroll_main_cell");
    let table_scroll_zone = [data_scroll_head_inwrap,data_scroll_main_cell];
    const data_fixed_label_group = document.querySelectorAll(".data_fixed_label_group");
    const data_indata_scroll_tr = document.querySelectorAll(".data_indata_scroll_tr");
    const data_label_toggle = document.querySelectorAll(".data_label_toggle");
    const data_scroll_depth_group = document.querySelectorAll(".data_scroll_depth_group");
    const data_fixed_depth_group = document.querySelectorAll(".data_fixed_depth_group");

    data_fixed_label_group.forEach((element,index)=>{
        if(data_indata_scroll_tr[index] !== undefined){
            let maxHeight = Math.max(element.getBoundingClientRect().height,data_indata_scroll_tr[index].getBoundingClientRect().height);
            element.style.minHeight = `${maxHeight}px`;
            data_indata_scroll_tr[index].style.minHeight = `${maxHeight}px`;
        }
    });

    data_label_toggle.forEach((element,index)=>{
        element.addEventListener("click",(e)=>{
            e.preventDefault();
            if(data_scroll_depth_group[index] !== undefined || data_fixed_depth_group[index] !== undefined){
                let fixed_dep_group = data_fixed_depth_group[index];
                let scroll_dep_group = data_scroll_depth_group[index];
                element.classList.toggle("active");
                fixed_dep_group.classList.toggle("active");
                scroll_dep_group.classList.toggle("active");
            }
        });
    });
    data_scroll_middle_wrap.classList.add("ready");
    
    
    let isDown = false;
    let startX;
    let scrollLeft;

    table_scroll_zone.forEach((element)=>{
        let thisScroll = element;

        // thisScroll.addEventListener("wheel", (e) => {
        //     let thisObj = e.currentTarget;
        //     let scrollLeftValue = thisObj.scrollLeft;
        //     e.preventDefault();
        //     thisScroll.scrollLeft = scrollLeftValue + e.deltaY;
        // },false);
        thisScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            thisScroll.classList.add('active');
            startX = e.pageX - thisScroll.offsetLeft;
            scrollLeft = thisScroll.scrollLeft;
        });
        thisScroll.addEventListener('mouseleave', () => {
            isDown = false;
            thisScroll.classList.remove('active');
        });
        thisScroll.addEventListener('mouseup', () => {
            isDown = false;
            thisScroll.classList.remove('active');
        });
        thisScroll.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - thisScroll.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            thisScroll.scrollLeft = scrollLeft - walk;
        });
        thisScroll.addEventListener("scroll",(e)=>{
           table_scroll_zone.forEach((element,index)=>{
            table_scroll_zone[index].scrollLeft = e.currentTarget.scrollLeft;
           })
            //thisScroll.scrollLeft = e.currentTarget.scrollLeft;
        })
    });



    // table_scroll_zone.forEach((element)=>{
    //     let isDown = false;
    //     let startX;
    //     let scrollLeft;

    //     let thisScroll = element;

    //     element.addEventListener("wheel", (e) => {
    //         let thisObj = e.currentTarget;
    //         let scrollLeftValue = thisObj.scrollLeft;
    //         e.preventDefault();
    //         thisObj.scrollLeft = scrollLeftValue + e.deltaY;
    //     },false);
    //     element.addEventListener('mousedown', (e) => {
    //         isDown = true;
    //         thisScroll.classList.add('active');
    //         startX = e.pageX - thisScroll.offsetLeft;
    //         scrollLeft = thisScroll.scrollLeft;
    //     });
    //     element.addEventListener('mouseleave', () => {
    //         isDown = false;
    //         thisScroll.classList.remove('active');
    //     });
    //     element.addEventListener('mouseup', () => {
    //         isDown = false;
    //         thisScroll.classList.remove('active');
    //     });
    //     element.addEventListener('mousemove', (e) => {
    //         if(!isDown) return;
    //         e.preventDefault();
    //         const x = e.pageX - thisScroll.offsetLeft;
    //         const walk = (x - startX) * 2; //scroll-fast
    //         thisScroll.scrollLeft = scrollLeft - walk;
    //     });
    // });


}

function localLayer(){
    addDynamicEventListener(document.body, 'click', '[data-popuptarget]', function (e) {
        let thisObj = e.target;
        let thisObj2 = thisObj.closest("[data-popuptarget]");
        let thisObj2_option = thisObj2.dataset.popupmargin !== undefined ? parseInt(thisObj2.dataset.popupmargin) : 12;
        let thisObjTarget = thisObj2.dataset.popuptarget;
        let thisObjTargetDom = null;
        if(thisObj2 !== undefined || thisObjTarget !== undefined){
            e.preventDefault();
            thisObjTargetDom = document.querySelector(thisObjTarget);
            thisObjTargetDom.style.top = `${thisObj2.getBoundingClientRect().top + thisObj2.getBoundingClientRect().height + window.scrollY + thisObj2_option}px`;
            thisObjTargetDom.classList.toggle("active");
            if(window.innerWidth > thisObj2.getBoundingClientRect().left + thisObjTargetDom.getBoundingClientRect().width){
                thisObjTargetDom.style.left = `${thisObj2.getBoundingClientRect().left}px`;
            }else{
                thisObjTargetDom.style.left = `${(thisObj2.getBoundingClientRect().left - thisObjTargetDom.getBoundingClientRect().width)+thisObj2.getBoundingClientRect().width}px`;
            }
        }
    });

    

    let localLayer = document.querySelectorAll(".local_layer");
    document.body.addEventListener('click',(e)=>{
        if(e.target.closest("[data-popuptarget") !== null || e.target.closest(".local_layer") !== null){
            return;
        }
        if(localLayer.length){
            localLayer.forEach((element)=>{
                if(element.classList.contains("active")){
                    element.classList.remove("active");
                }
            });
        }
    })
}


function multiRange(){
    let multi_range_z = document.querySelectorAll(".multi_range_z");
    
    multi_range_z.forEach(function(elem,index){
        let this_elem = elem;
        let inputLeft = this_elem.querySelector(".input-left"); 
        let inputRight = this_elem.querySelector(".input-right"); 
        let thumbLeft = this_elem.querySelector(".slider > .thumb.left"); 
        let thumbRight = this_elem.querySelector(".slider > .thumb.right"); 
        let range = this_elem.querySelector(".slider > .range");
        let setLeftValue = () => { 
            const _this = inputLeft; 
            const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
            
            // 교차되지 않게, 1을 빼준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
            _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1); 
            
            // input, thumb 같이 움직이도록 
            const percent = ((_this.value - min) / (max - min)) * 100; 
            thumbLeft.style.left = percent + "%"; 
            range.style.left = percent + "%"; 
        }; 
        let setRightValue = () => { 
            const _this = inputRight; 
            const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
            
            // 교차되지 않게, 1을 더해준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
            _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1); 
            
            // input, thumb 같이 움직이도록 
            const percent = ((_this.value - min) / (max - min)) * 100; 
            thumbRight.style.right = 100 - percent + "%"; 
            range.style.right = 100 - percent + "%"; 
        }; 
        inputLeft.addEventListener("input", setLeftValue); 
        inputRight.addEventListener("input", setRightValue);
    });
}

function textSelectFunc(){
    const text_select_group = document.querySelectorAll(".text_select_group");
    const newSpan = document.createElement("span");
    if(text_select_group.length === 0){return;}
    newSpan.classList.add("textrender");
    text_select_group.forEach((element,index)=>{
        let thisElement = element;
        thisElement.appendChild(newSpan.cloneNode())

        const thistext = thisElement.querySelector(".textrender");
        const thisSelect = thisElement.querySelector(".text_select");

        thisSelect.addEventListener("change",()=>{
            thistext.textContent = thisSelect.options[thisSelect.selectedIndex].innerHTML;
            thisSelect.style.width = thistext.getBoundingClientRect().width+"px";
        });

        let triggerEvent = new Event("change");
        thisSelect.dispatchEvent(triggerEvent);
    }); 
}


function dataTableSetting(){
    const data_table_global_zone = document.querySelectorAll(".data_table_global_zone");
    const data_body_table = document.querySelector(".data_tbody");
    const data_body_local_call = data_body_table.querySelectorAll(".local_call");
    const head_local_call = document.querySelector(".data_thead .local_call");
    const data_local_layer = document.querySelector(".data_local_layer");
    const btn_local_close = document.querySelector(".btn_local_close");
    data_body_local_call.forEach((element,index)=>{
      const thisObj = element;
      const thisIndex = index;
      thisObj.addEventListener("click",(e)=>{
        const thisEventObj = e.currentTarget;
        const thisObj_tr = thisEventObj.closest("tr");
        const thisObj_zone = thisEventObj.closest(".data_table_global_zone");
        if(head_local_call.checked){return;}
        // data_body_local_call.forEach((element,index)=>{
        //     if(thisIndex === index){return;}
        //     element.checked = false;
        // });
        if(thisEventObj.checked){
            data_local_layer.classList.add("active");
            data_local_layer.style.top = `${window.scrollY + thisObj_tr.getBoundingClientRect().top}px`;
            data_local_layer.style.left = `${thisObj_zone.getBoundingClientRect().left + thisObj_zone.getBoundingClientRect().width - data_local_layer.getBoundingClientRect().width}px`;
        }else{
            data_local_layer.classList.remove("active");
        }
      });
    });
    if(head_local_call !== null){
        head_local_call.addEventListener("click",(e)=>{
            const thisEventObj = e.currentTarget;
            data_local_layer.classList.remove("active");
    
            data_body_local_call.forEach((element)=>{
                element.checked = thisEventObj.checked;
            });
        });
    }
    if(btn_local_close !== null){
        btn_local_close.addEventListener("click",(e)=>{
            const thisEventObj = e.currentTarget;
            const thisObj_layer = thisEventObj.closest(".data_local_layer");
            thisObj_layer.classList.remove("active");
        });
    }
    data_table_global_zone.forEach((element)=>{
      const thisObj = element;
      const thisHead = thisObj.querySelector(".data_thead");
      const thisBody = thisObj.querySelector(".data_tbody");
      if(thisBody.querySelector("colgroup") !== null){
          thisBody.querySelector("colgroup").innerHTML = thisHead.querySelector("colgroup").innerHTML
      }
    })
  }


  function tableToggle(){
    const btn_tbtoggle = document.querySelectorAll(".btn_tbtoggle");
    const define_toggle_cont = document.querySelectorAll(".define_toggle_cont");
    if(btn_tbtoggle.length){
        btn_tbtoggle.forEach((element,index)=>{
            let forIndex = index;
            element.addEventListener("click",(e)=>{
                const thisObjEvent = e.currentTarget;
                const thisObjEventParent = thisObjEvent.closest(".define_toggle_target");
                const thisTarget = thisObjEventParent.nextElementSibling;


                btn_tbtoggle.forEach((element,index)=>{
                    if(forIndex === index){return;}
                    if(element.classList.contains("active")){
                        element.classList.remove("active");
                        element.closest(".define_toggle_target").nextElementSibling.classList.remove("active");
                    }
                });

                thisObjEvent.classList.toggle("active");
                thisTarget.classList.toggle("active");
            });
        });
    }
    // addDynamicEventListener(document.body, 'click', '.btn_tbtoggle', function (e) {
    //     let thisObj = e.target;
    //     let thisObjParent = thisObj.closest(".define_toggle_target");
    //     let thisTarget = thisObjParent.nextElementSibling;
    //     e.preventDefault();


    //     btn_tbtoggle.forEach((element,index)=>{
    //         if(thisObj)
    //         if(element.classList.contains("active")){
    //             element.classList.remove("active");
    //         }
    //     });


    //     define_toggle_cont.forEach((element,index)=>{
    //         if(element.classList.contains("active")){
    //             element.classList.remove("active");
    //         }
    //     });

    //     thisObj.classList.toggle("active");
    //     thisTarget.classList.toggle("active");
    // });
  }


  function controlBoxFunc(target){
    let targetObj = target;
    if(targetObj === undefined){return;}
    const targetDom = document.querySelector(targetObj);
    const targetDomNext = targetDom.nextElementSibling;
    let targetDomNextHeight = targetDomNext.getBoundingClientRect().height;
    const cbox_mid_row = targetDom.querySelectorAll(".cbox_mid_row");
    const mid_right_cols = targetDom.closest(".mid_right_cols");
    let mid_right_cols_pd = mid_right_cols !== null ? parseInt(getComputedStyle(mid_right_cols).getPropertyValue("padding-bottom")) : 0;
    const fullpop_contlow = targetDom.closest(".fullpop_contlow");
    const fullpop_contlow_in = targetDom.closest(".fullpop_contlow_in");
    let fullpop_contlow_in_pd = 0;
    const bodyDom = document.querySelector("body");
    
    window.addEventListener("resize",()=>{
        setTimeout(()=>{
            insertAction();
        },30);
    });
    insertAction();

    function insertAction(){
        targetDomNextHeight = targetDomNext.getBoundingClientRect().height;
        if(mid_right_cols !==  null){
            cbox_mid_row.forEach((element)=>{
                element.style.removeProperty("height");
                
                if(window.innerHeight>500){
                     element.style.height = `${window.innerHeight-(element.getBoundingClientRect().top + targetDomNextHeight + mid_right_cols_pd)}px`;
                    bodyDom.classList.add("scroll_disabled");
                }else{
                     element.style.height = `500px`;
                }
            });
        }else if(fullpop_contlow !== null){
            fullpop_contlow_in_pd = fullpop_contlow_in !== null ? parseInt(getComputedStyle(fullpop_contlow_in).getPropertyValue("padding-bottom")) : 0;
            cbox_mid_row.forEach((element)=>{
                element.style.removeProperty("height");
                element.style.height = `${fullpop_contlow.getBoundingClientRect().height-(element.offsetTop + targetDomNextHeight + fullpop_contlow_in_pd)}px`;
            });
            fullpop_contlow.classList.add("scroll_disabled");
        }
    }

    return {
        "insertAction" : insertAction
    }
  }


  function scrollTabSwiper(target){
    let targetObj = target;
    if(targetObj === undefined){return;}
    const targetDom = document.querySelector(targetObj);
    const targetDomWrapper = targetDom.querySelector(".swiper-wrapper");
    const targetDomSlide = targetDom.querySelectorAll(".swiper-slide");
    const swiperControl = targetDom.querySelectorAll(".btn_swiper_control");
    const prevSwiperControl = targetDom.querySelector(".btn_swiper_control.prev");
    const nextSwiperControl = targetDom.querySelector(".btn_swiper_control.next");
    nextSwiperControl.classList.add("active");
    if(targetDomSlide.length){
        targetDomSlide.forEach((element,index)=>{
            element.setAttribute("data-index",index);
        });
    }
    let tabSwiper = new Swiper(`#${targetDom.id}`,{
        slidesPerView: 'auto',
        mousewheel: true,
        freeMode: true,
        allowTouchMove: true,
        //touchRatio : 0,
        on : {
            init :false
        }
    });
    tabSwiper.on("setTranslate",()=>{
        swiperControlAction();
    });
    tabSwiper.on("slideChange",()=>{
        swiperControlAction();
    });
    var controlClickIs = false;
    function swiperControlAction(){
        if(swiperControl.length === 0){return;}
        
        if(getTranslateXY(targetDomWrapper).translateX >= 0){
            prevSwiperControl.classList.remove("active");
            nextSwiperControl.classList.add("active");
        }else{
            prevSwiperControl.classList.add("active");
            nextSwiperControl.classList.remove("active");
            // if(tabSwiper.isEnd){
            //     nextSwiperControl.classList.remove("active");
            // }else{
            //     nextSwiperControl.classList.add("active");
            //     prevSwiperControl.classList.add("active");
            // }
        }
    }

    prevSwiperControl.addEventListener("click",(e)=>{
        e.preventDefault();
        prevSwiperControl.classList.remove("active");
        tabSwiper.slideTo(0);
        setTimeout(()=>{
            prevSwiperControl.classList.remove("active");
            nextSwiperControl.classList.add("active");
            controlClickIs = false;
        },510);
    });
    
    nextSwiperControl.addEventListener("click",(e)=>{
        controlClickIs = true;
        e.preventDefault();
        nextSwiperControl.classList.remove("active");
        tabSwiper.slideTo(targetDomSlide[targetDomSlide.length-1].dataset.index);
        setTimeout(()=>{
            nextSwiperControl.classList.remove("active");
            prevSwiperControl.classList.add("active");
        },510);
    });
  }

  
  function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}


function ToastMessage(option){
    this.appBody = document.querySelector("#app");
    this.optionType = option.type;
    this.optionMessage = option.message;
    this.optionSpeed = option.speed !== undefined ? option.speed : 500;
    this.optionDelayTime = option.time !== undefined ? option.time : 1000;
    this.setTimeID_show = 0;
    this.setTimeID = 0;
    this.setTimeID_delay = 0;
    this.toastObj = null;

    let toastAppendParent = document.createElement("div");
    toastAppendParent.classList.add("toast_parent_layer");

    let templete = `
        <div class="toast_layer ${this.optionType}" style="transition-duration:${this.optionSpeed}ms"><span class="toast_message">${this.optionMessage}</span></div>
    `
    if(this.appBody !== null){
        toastAppendParent.innerHTML = templete;
       this.appBody.append(toastAppendParent);
       toastObj = document.querySelector(".toast_layer");
       setTimeout(()=>{
        toastObj.classList.add("in");
       },10);
       this.setTimeID_show = setTimeout(()=>{
            this.setTimeID_show = setTimeout(()=>{
                toastObj.classList.add("out");
                this.setTimeID = setTimeout(()=>{
                    toastObj.remove();
                },this.optionSpeed+30);
            },this.optionDelayTime);
       },500);
    }

    
}


function comboFunc(){
    const combo_item = document.querySelectorAll(".combo_item");
    const combo_option_group = document.querySelectorAll(".combo_option_group");
    addDynamicEventListener(document.body, 'click', '.combo_target', function(e) {
        let thisTarget = e.target;
        let thisParent = thisTarget.closest(".combo_item");
        let thisOptionGroup = thisParent.querySelector(".combo_option_group");
        let appendOption = null;
        let combo_option_scroll = null;
        if(thisOptionGroup !== null){
            comboInit(thisParent);
        }
        comboPosAction();
        // not
        combo_item.forEach((element)=>{
            if(element !== thisParent){
                element.classList.remove("active");
            }
        });
        appendOption = document.querySelector(`[data-option='${thisParent.getAttribute("id")}']`);
        combo_option_scroll = appendOption.querySelector(".combo_option_scroll");
        appendOptionListOption = combo_option_scroll.getAttribute("data-rowCount") !== undefined ? combo_option_scroll.getAttribute("data-rowCount") : 5;
        combo_option_group.forEach((element)=>{
            if(element !== appendOption){
                element.classList.remove("active");
            }
        });
        thisParent.classList.toggle("active");
        appendOption.classList.toggle("active");
        if(appendOption.classList.contains("active")){
            if(combo_option_scroll.classList.contains("addHeight")){return;}
            if(appendOption.querySelectorAll("li")[appendOptionListOption] !== undefined){
                combo_option_scroll.style.maxHeight = `${appendOption.querySelectorAll("li")[appendOptionListOption].offsetTop+7}px`;
            }
            combo_option_scroll.classList.add("addHeight");
        }
    });
    addDynamicEventListener(document.body, 'click', '.combo_option', function(e) {
        let thisTarget = e.target;
        let thisParent = thisTarget.closest(".combo_option_group");
        let thisTargetText = thisTarget.textContent;
        let comboCallItem = document.querySelector(`[id='${thisParent.getAttribute('data-option')}']`);
        let comboCallTarget = comboCallItem.querySelector(".combo_target");
        
        if(thisTarget.classList.contains("disabled")){return;}
        comboCallTarget.textContent = thisTargetText;
        thisParent.classList.remove("active");
        comboCallItem.classList.remove("active");
    });
    document.addEventListener("click",(e)=>{
        if(e.target.closest(".combo_item") !== null){
            return;
        }
        comtoReset();
    });

    function comtoReset(){
        const combo_item = document.querySelectorAll(".combo_item");
        const combo_option_group = document.querySelectorAll(".combo_option_group");

        combo_item.forEach((element)=>{
            element.classList.remove("active");
        });
        combo_option_group.forEach((element)=>{
            element.classList.remove("active");
        });
    }

    function comboInit(){
        const combo_item = document.querySelectorAll(".combo_item");
        const appBody = document.querySelector("#app");
        
        combo_item.forEach((element,index)=>{
            let thisElement = element;
            let option_group = thisElement.querySelector(".combo_option_group");
            if(element.getAttribute("id") === null){
                thisElement.setAttribute("id",'combo_item_'+index);
                option_group.setAttribute("data-option",'combo_item_'+index);
            }else{
                option_group.setAttribute("data-option",thisElement.getAttribute("id"));
            }
            if(element.closest(".fullpop_contlow") !== null){
                element.closest(".fullpop_contlow").appendChild(option_group);
            }else{
                appBody.appendChild(option_group);
            }
        });
    }

    function comboPosAction(){
        const appendOption =  document.querySelectorAll(".combo_option_group");
        appendOption.forEach((element,index)=>{
            let comboCall = document.querySelector(`[id='${element.getAttribute("data-option")}']`);
            let combo_top = window.scrollY + comboCall.getBoundingClientRect().top;
            let fullpop_contlow_top = 0;
            let combo_left = comboCall.getBoundingClientRect().left;
            let fullpop_contlow_left = 0;

            if(comboCall.closest(".fullpop_contlow") !== null){
                fullpop_contlow_top = comboCall.closest(".fullpop_contlow").getBoundingClientRect().top;
                fullpop_contlow_left = comboCall.closest(".fullpop_contlow").getBoundingClientRect().left;
                element.setAttribute("style",`
                    top : ${(combo_top - fullpop_contlow_top) + comboCall.getBoundingClientRect().height + 5}px; 
                    left : ${combo_left - fullpop_contlow_left}px;
                    width : ${ comboCall.scrollWidth }px;
                `)
            }else{
                element.setAttribute("style",`
                    top : ${combo_top + comboCall.getBoundingClientRect().height + 5}px; 
                    left : ${combo_left}px;
                    width : ${ comboCall.scrollWidth }px;
                `)
            }
        });
    }
}

function comboChangeCallback(option){
    addDynamicEventListener(document.body, 'click', `[data-option='${option.target}'] .combo_option`, function(e) {
        let thisEventObj = e.target;
        let thisEventObjValue = thisEventObj.getAttribute("data-value");
        if("callback" in option){
            option.callback(thisEventObjValue);
        }
    });
}



function searchForm(){
    const search_field_wrap = document.querySelectorAll(".search_field_wrap");
    const search_field = document.querySelectorAll(".search_field");
    const auto_word_layer = document.querySelectorAll(".auto_word_layer");
    const searchInput = document.querySelectorAll(".input_search");
    var appendLayer = null;
    const appBody = document.querySelector("#app");
    if(searchInput.length){
        searchInput.forEach((element,index)=>{
            let eachElement = element;
            let eachElementParent = element.closest(".search_field_wrap");
            let eachElementField = element.closest(".search_field");
            let eachElementLayer = eachElementParent.querySelector(".auto_word_layer");
            let eachElementReset = eachElementParent.querySelector(".btn_reset_ico");

            eachElement.addEventListener("focus",(e)=>{
                if(eachElementLayer !== null){
                    autoLayerInit(eachElementParent,eachElementLayer,index);
                    autoLayerPos(eachElementParent);
                }
                if(eachElementField !== null){
                    eachElementField.classList.add("active");      
                }
            });
            eachElement.addEventListener("keydown",(e)=>{
                let thisEventObj = e.currentTarget;
                valueCheck(thisEventObj,eachElementParent);
            });
            eachElement.addEventListener("focusout",(e)=>{
                let thisEventObj = e.currentTarget;
                 if(eachElementField !== null){
                    eachElementField.classList.remove("active");      
                }
                valueCheck(thisEventObj,eachElementParent);
            });
            eachElementReset.addEventListener("click",(e)=>{
                let thisEventInputObj = eachElementParent.querySelector(".input_search");
                thisEventInputObj.value = "";
                eachElementParent.classList.remove("value_true");
                if(eachElementParent.getAttribute("data-autoLayer") == "true"){
                    document.querySelector(`[data-autoLayer='${eachElementParent.getAttribute("id")}']`).classList.remove("auto_mode");
                }
            });
        });

        document.querySelectorAll(".auto_word_item").forEach((element)=>{
            element.addEventListener("click",(e)=>{
                console.log(112);
                let thisEventObj = e.currentTarget;
                let thisEventParentLayer = thisEventObj.closest(".auto_word_layer");
                let thisEventParentCall = document.querySelector(`[id='${thisEventParentLayer.getAttribute("data-autolayer")}']`);
                let thisEventParentCallInput = thisEventParentCall.querySelector(".input_search");
                if(thisEventObj.classList.contains("disabled")){return;}
                thisEventParentCallInput.value = thisEventObj.textContent;
                thisEventParentLayer.classList.remove("auto_mode");
            });
        });

        document.body.addEventListener("click",(e)=>{
            if(e.target.closest(".search_field_wrap") !== null || e.target.closest(".auto_word_layer") !== null){
                return;
            }
            auto_word_layer.forEach((element)=>{
                element.classList.remove("auto_mode");
            });
        });

        
        function autoLayerInit(target,layer,index){
            let thisElement = target;
            let auto_word_layer = layer;

            if(thisElement.getAttribute("id") === null){
                thisElement.setAttribute("id",'search_item_'+index);
                auto_word_layer.setAttribute("data-autoLayer",'search_item_'+index);
            }
            if(thisElement.closest(".fullpop_contlow") !== null){
                thisElement.closest(".fullpop_contlow").appendChild(auto_word_layer);
            }else{
                appBody.appendChild(auto_word_layer);
            }
        }

        function autoLayerPos(target){
            const thisElement = target;
            appendLayer = document.querySelector(`[data-autoLayer='${thisElement.getAttribute("id")}']`);

            

            if(thisElement.closest(".fullpop_contlow") !== null){
                appendLayer.setAttribute("style",`
                    top : ${(thisElement.getBoundingClientRect().top - thisElement.closest(".fullpop_contlow").getBoundingClientRect().top) + thisElement.getBoundingClientRect().height + 5}px; 
                    left : ${thisElement.getBoundingClientRect().left - thisElement.closest(".fullpop_contlow").getBoundingClientRect().left}px;
                    width : ${ thisElement.scrollWidth }px;
                `)
            }else{
                appendLayer.setAttribute("style",`
                    top : ${window.scrollY + thisElement.getBoundingClientRect().top + thisElement.getBoundingClientRect().height + 5}px; 
                    left : ${thisElement.getBoundingClientRect().left }px;
                    width : ${ thisElement.scrollWidth }px;
                `)
            }
            
        }
    }


    function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    function valueCheck(target,parent){
        const thisElement = target;
        const thisElementParent = parent;
        appendLayer = document.querySelector(`[data-autoLayer='${thisElementParent.getAttribute("id")}']`);
        let auto_word_list_wrap = appendLayer.querySelector(".auto_word_list_wrap");
        let autoLayerCountOption = thisElementParent.getAttribute("data-rowCount") !== undefined ? thisElementParent.getAttribute("data-rowCount") : 5;
        if(thisElement.value.length){
            thisElementParent.classList.add("value_true");
            if(thisElementParent.getAttribute("data-autoLayer") == "true"){
                appendLayer.classList.add("auto_mode");
                if(appendLayer.querySelectorAll("li")[autoLayerCountOption] !== null){
                    auto_word_list_wrap.style.maxHeight = `${appendLayer.querySelectorAll("li")[autoLayerCountOption].offsetTop+7}px`;
                }
                appendLayer.classList.add("auto_scroll_show");
            }
        }else{
            thisElementParent.classList.remove("value_true");
            if(thisElementParent.getAttribute("data-autoLayer") == "true"){
                appendLayer.classList.remove("auto_mode");
                appendLayer.classList.remove("auto_scroll_show");
            }
        }
    }
}

function quickMenu(){
    const define_quick = document.querySelector(".define_quick");
    const btn_help = document.querySelector("#btn_help");

    if(define_quick !== null){
        define_quick.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector("html").classList.add("smooth");
            setTimeout(()=>{
                window.scrollTo(0,0);
            },20);
        });
        window.addEventListener("scroll",()=>{
            if(window.scrollY === 0){
                document.querySelector("html").classList.remove("smooth");
            }
        });
    }

    if(btn_help !== null){
        btn_help.addEventListener("click",(e)=>{
            e.preventDefault();
            layerPopup.show({
				target : "#help_layer",
				openCallback(){
					console.log('callback')
				}
			});
        });
        // var eventObj = document.createEvent('Event');
		// eventObj.initEvent('click', false, true);
		// btn_help.dispatchEvent(eventObj);
    }
}