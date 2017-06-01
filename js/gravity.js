function Gravity() {
	setInterval(function() {
		msgCenter.postMsg('block.movedown');
	}, 1000);
}