
    function autoType(elementClass, typingSpeed){
      var item = $(elementClass);
      item.css({
        "position": "relative",
        "display": "inline-block"
      });
      item.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
      item = item.find(".text-js");
      var text = item.text().trim().split('');
      var amntOfChars = text.length;
      var newString = "";
      item.text("");
      setTimeout(function(){
        item.css("opacity",1);
        item.prev().removeAttr("style");
        item.text("");
        for(var i = 0; i < amntOfChars; i++){
          (function(i,char){
            setTimeout(function() {
              newString += char;
              item.text(newString);
            },i*typingSpeed);
          })(i+1,text[i]);
        }
      },1500);
    }

    $(document).ready(function(){
      // Now to start autoTyping just call the autoType function with the
      // class of outer div
      // The second paramter is the speed between each letter is typed.
      autoType(".type-js", 50);
    });