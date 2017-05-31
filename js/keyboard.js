$(document).on('keyup', function (e) {
	switch (e.which) {
		case 38:
			msgCenter.postMsg('block.rotate');
			break;
		case 40:
			msgCenter.postMsg('block.movedown');
			break;
		case 37:
			msgCenter.postMsg('block.moveleft');
			break;
		case 39:
			msgCenter.postMsg('block.moveright');
			break;
	}
});