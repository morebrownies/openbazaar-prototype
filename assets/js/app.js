var pageViews = [{"page": "home", "active": true}]
var defaultPrimaryColor = "#086A9E";
var defaultSecondaryColor = "#327eb8";
var defaultTextColor = "#ffffff";
var delay = 1900; //3000
var fade = 500;
$store = {'avatar': '', 'name': '', 'description': '', 'colorprimary': '', 'colorsecondary': '', 'colortext': '', 'website': '', 'email': '', 'guid': '', 'handle': '', 'items': []};

$(function() {
  $.cssHooks.bgColor = {
    get: function(elem) {
      if (elem.currentStyle)
        var bg = elem.currentStyle["bgColor"];
      else if (window.getComputedStyle)
        var bg = document.defaultView.getComputedStyle(elem,
        null).getPropertyValue("background-color");
      if (bg.search("rgb") == -1)
        return bg;
      else {
        bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
    }
    }
  }

  // events
  $(document).on("keyup", keypress);
  $('#main').on("scroll", scroll);

  // functions
	function start(){
		Connect.load();
		Chat.loadMessages();
		Navigation.setArrowOpacity();
		setTimeout(function(){ Discover.populateFeed() }, delay);
	}

	function keypress(e){
  	e.stopPropagation();
    if($('.input-search').is(":focus") && e.which == 13){ Search.find(); }
    if($('.input-chat-new-message').is(":focus") && e.which == 13) { Chat.saveMessage(); }
    if($('.vendor-meta-name').is(':focus') && $('.vendor-meta-name').val() !== ""){ $('.vendor-banner-2 .vendor-name').html($('.vendor-meta-name').val()); }
    if($('.vendor-meta-description').is(':focus') && $('.vendor-meta-description').val() !== ""){ $('.vendor-banner-2 .vendor-description').html($('.vendor-meta-description').val()); }
    if($('.vendor-meta-avatar').is(':focus') && $('.vendor-meta-avatar').val() !== ""){ $('.vendor-banner-2 .vendor-avatar').css('background', 'url(' + $('.vendor-meta-avatar').val() + ') 50% 50% / cover no-repeat'); }
    
  	Navigation.setArrowOpacity();
	}

  function scroll(){
    if( ($('.vendor').is(':visible') || $('.contract-detail').is(':visible')) && $('#main').scrollTop() >= 168){
      $(".vendor-navigation").addClass('vendor-navigation-docked');
      $(".vendor").css('margin-top', '64px');
      $(".contract-detail").css('margin-top', '64px');
    }else{
      $(".vendor-navigation").removeClass('vendor-navigation-docked');
      $(".vendor").css('margin-top', '0');
      $(".contract-detail").css('margin-top', '0');
    }
  }

  start();
});