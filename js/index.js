/*
 * @Author: Administrator
 * @Date:   2016-02-03 10:57:12
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-02-17 19:22:37
 */

'use strict';
$(function() {




  // 轮播图
  // 获取图片元素

  var timer;
  var num = 0;
  timer = setInterval(function() {
    num++;
    $($(".banner-wrap").find("li")[num]).fadeIn().siblings().fadeOut();
    num %= 8;
  }, 1000);


  // 搜索框
  $("#hotel_sub_tabs span").on("click", function() {
    $(this).addClass("on").siblings().removeClass("on");
  })

  // 手风琴图
  $("#tavern").find("li").on("mouseenter", function() {
    //console.log($(this));
    $(this).find(".mask_b").css("display", "none");
    $(this).stop().animate({
      width: "400px"
    }, 300, "swing").siblings().stop().animate({
      width: "133px"
    }, 300, "swing");
  });
  $("#tavern").find("li").on("mouseleave", function() {
    $(this).find(".mask_b").css("display", "block");
  })
  $("#tavern").find("ul").on("mouseleave", function() {
    $(this).find("li").animate({
      width: "170px"
    }, 300, "swing")
  });


  //旅游指南
  $(".guide-wrap-content-tab ul li").on("mouseenter", function() {
    var $index = $(this).data("index");
    $(this).addClass("on").siblings().removeClass("on");
    $(".guide-wrap-content-tab ol li").eq($index).addClass("show").siblings().removeClass("show");

  });

  //搜索框
  $(".service-wrap-email-input em input").on("focus", function() {
    if($(this).val() == "请输入您的E-mail") {
      $(this).val("");
    }
  })
  $(".service-wrap-email-input em input").on("focusout", function() {
    if($(this).val() == "") {
      $(this).val("请输入您的E-mail");
    }
  })
})
