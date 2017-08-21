// JavaScript Document

// CUSTOM JQUERY FUNCTIONS FOR TEMPLATES


$(document).ready(function() {
//FIX HEIGHT OF PAGE TO MAKE SCROLL
$('html,body').css('overflow-y','hidden');
	 if ($(window).height() > 230) {
				$(".content").height($(window).height() - 230);
				$(".content").css('max-height', $(window).height() - 230);
			}
			else {
				$(".content").height(250);
				$(".content").css('max-height', 250);
			}
	
			$(window).resize(function () {
				if ($(window).height() > 230) {
					$(".content").height($(window).height() - 230);
					$(".content").css('max-height', $(window).height() - 230);
				}
				else {
					$(".content").height(250);
					$(".content").css('max-height', 250);
				}
		});

});	