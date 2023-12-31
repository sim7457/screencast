"use strict";
$(function() {
  var stickyBreakpoint = 1025;
  var stickyHeaderElements = {
    desktop: "#sticky-header-desktop",
    mobile: "#sticky-header-mobile"
  };
  var stickyConfig = {
    topSpacing: 0
  };

  function stickyInit(target) {
    if ($(target).parent(".sticky-wrapper").length < 1) {
      $(target).sticky(stickyConfig)
    }
  }

  function stickyDestroy(target) {
    $(target).unstick()
  }
  $(window).resize(function() {
    var viewport = $(this).width();
    if (viewport >= stickyBreakpoint) {
      stickyInit(stickyHeaderElements.desktop);
      stickyDestroy(stickyHeaderElements.mobile)
    } else {
      stickyInit(stickyHeaderElements.mobile);
      stickyDestroy(stickyHeaderElements.desktop)
    }
  });
  if ($(window).width() >= stickyBreakpoint) {
    stickyInit(stickyHeaderElements.desktop)
  } else {
    stickyInit(stickyHeaderElements.mobile)
  }
});
