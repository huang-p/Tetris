$(document).on('click', '#ctrl-bar button', function() {
	msgCenter.postMsg('block.' + $(this).attr('class'), 1);
}).on('click', '#reset', function() {
	msgCenter.reset();
	msgCenter.postMsg('pool.reset');
	$('#over').hide();
	msgCenter.postMsg('score.reset');
	$('#board').show();
	msgCenter.postMsg('block.neednew');
});

