function Gravity() {
	var interval = 1000;
	var delta = -50;
	var delay = 10;
	var delayCounter = 0;

	setInterval(function() {
		if (++delayCounter * delay >= interval) {
			delayCounter = 0;
			msgCenter.postMsg('block.movedown');
		}
	}, delay);

	msgCenter.regHandler('pool.clear100', null, function() {
		if (interval + delta > 0) {
			interval += delta;
		}
	})
}