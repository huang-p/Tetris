function Score() {
	var $board = $('#board');
	var $score = $('#score');
	var pointUnit = 100;
	var points = 0;

	var setScore = function() {
		$score.text(('        ' + points).substr(-8));
	};

	this.clBonus = function(lines) {
		if (lines > 0) {
			points += pointUnit * (lines + (lines - 1) / 10);
			setScore();
		}
	};

	this.reset = function() {
		points = 0;
		setScore();
	};
}