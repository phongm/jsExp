$(function(){
	$("footer div").on("click", function(){
		$("footer div").each(function(index, element){
			$(element).removeClass("active");
		});
		$(this).addClass("active");
	});
	$(".home").on("click", function(){
		location.href="scene.html";
	});
	$(".discover").on("click", function(){
		location.href="discover.html";
	});
	$(".my").on("click", function(){
		location.href="my.html";
	});
});