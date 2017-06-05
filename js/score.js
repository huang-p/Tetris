function Score() {
	var $score = $('#score');
	var pointUnit = 100;
	var points = 0;

	var setScore = function() {
		$score.text(('        ' + points).substr(-8));
	};

	var clBonus = function(lines) {
		if (lines > 0) {
			points += pointUnit * (lines + (lines - 1) / 10);
			setScore();
		}
	};

	var reset = function() {
		points = 0;
		setScore();
	};

	msgCenter.regHandler('score.clbonus', null, clBonus).regHandler('score.reset', null, reset);
}
