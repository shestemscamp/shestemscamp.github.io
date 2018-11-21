$(window).scroll(function(e) {
  frames = 17;
  step = ($("body").height() - $(window).height()) / frames;
  scrollStep = parseInt($(window).scrollTop() / step);
  maskPosition = 100 / frames * scrollStep;
  $("#cover").css({
    "mask-position": maskPosition + "% 50%",
    "-webkit-mask-position": maskPosition + "% 50%"
  });
});
