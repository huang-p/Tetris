$(document).on('click', '#ctrl-bar button', function() {
	msgCenter.postMsg('block.' + $(this).attr('class'), 1);
});