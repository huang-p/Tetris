$(document).on('keyup', function(e) {
	switch (e.which) {
		case 87: // W
			msgCenter.postMsg('block.rotate', 1);
			break;
		case 83: // S
			msgCenter.postMsg('block.movedown', 1);
			break;
		case 65: // A
			msgCenter.postMsg('block.moveleft', 1);
			break;
		case 68: // D
			msgCenter.postMsg('block.moveright', 1);
			break;
		case 38: // UP
			msgCenter.postMsg('block.rotate', 2);
			break;
		case 40: // DOWN
			msgCenter.postMsg('block.movedown', 2);
			break;
		case 37: // LEFT
			msgCenter.postMsg('block.moveleft', 2);
			break;
		case 39: // RIGHT
			msgCenter.postMsg('block.moveright', 2);
			break;
	}
});