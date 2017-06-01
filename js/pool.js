function Pool() {
	var setting = {
		width: 12,
		height: 20,
		cellSize: 20
	};
	var $pool;
	var grid = [];
	var cellStatus = {
		empty: 0,
		block: 1,
		ice: 2
	};

	var clearLines = function() {
		var lines = 0;
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid[i].length; j++) {
				if (grid[i][j].status !== cellStatus.ice) {
					break;
				}
			}
			if (j === grid[i].length) {
				lines++;
				var line = [];
				for (var j = 0; j < setting.width; j++) {
					$('#' + grid[i][j].id).hide(400, function() { $(this).remove(); });
					line.push({ status: cellStatus.empty });
				}
				grid.splice(i, 1);
				grid.unshift(line);
				for (var j = 0; j <= i; j++) {
					for (var k = 0; k < grid[j].length; k++) {
						if (grid[j][k].id) {
							$('#' + grid[j][k].id).css({ top: j * setting.cellSize, left: k * setting.cellSize });
						}
					}
				}
			}
		}
		score.clBonus(lines);
	};

	var checkFull = function() {
		for (var i = 0; i < setting.width; i++) {
			if (grid[0][i].status === cellStatus.ice) {
				return true;
			}
		}
		return false;
	};

	this.init = function() {
		for (var i = 0; i < setting.height; i++) {
			var line = [];
			for (var j = 0; j < setting.width; j++) {
				line.push({ status: cellStatus.empty });
			}
			grid.push(line);
		}
		$pool = $('#pool');
		$pool.width(setting.width * setting.cellSize).height(setting.height * setting.cellSize);
	};

	this.reset = function() {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid[i].length; j++) {
				grid[i][j].status = cellStatus.empty;
				grid[i][j].id = null;
			}
		}
		$pool.empty();
	};

	this.isEmptyCell = function(pos) {
		if (pos[0] >= setting.height || pos[1] < 0 || pos[1] >= setting.width) {
			return false;
		} else if (pos[0] >= 0) {
			return grid[pos[0]][pos[1]].status === cellStatus.empty;
		} else {
			return true;
		}
	};

	var putIn = function(id, pos, cells) {
		var $block = $('<div class="block"></div>').attr('id', id).css({ top: pos[0] * setting.cellSize, left: pos[1] * setting.cellSize }).appendTo($pool);
		for (var i = 0; i < cells.length; i++) {
			$('<div class="cell"></div>').attr('id', id + '_' + i).width(setting.cellSize).height(setting.cellSize).css({ top: cells[i][0] * setting.cellSize, left: cells[i][1] * setting.cellSize }).appendTo($block);
		}
	};

	var setPosition = function(blockId, pos) {
		$('#' + blockId).css({ top: pos[0] * setting.cellSize, left: pos[1] * setting.cellSize });
	};

	var setDirection = function(blockId, cells) {
		var $block = $('#' + blockId);
		for (var i = 0; i < cells.length; i++) {
			$block.find('.cell:eq(' + i + ')').css({ top: cells[i][0] * setting.cellSize, left: cells[i][1] * setting.cellSize });
		}
	};

	var freezeBlock = function(blockId, pos, cells) {
		var $block = $('#' + blockId);
		var $cells = $($block.remove().html()).appendTo($pool);
		for (var i = 0; i < $cells.length; i++) {
			var r = pos[0] + cells[i][0];
			var c = pos[1] + cells[i][1];
			var id = $($cells[i]).css({ 'top': r * setting.cellSize, 'left': c * setting.cellSize }).addClass('ice').attr('id');
			if (r >= 0) {
				grid[r][c].status = cellStatus.ice;
				grid[r][c].id = id;
			}
		}
		clearLines();
		if (!checkFull()) {
			msgCenter.postMsg('block.neednew');
		} else {
			msgCenter.postMsg('game.over');
		}
	};

	msgCenter.regHandler('block.created', null, function(params) {
		putIn(params.id, params.pos, params.cells);
	}).regHandler('block.freeze', null, function(params) {
		freezeBlock(params.id, params.pos, params.cells);
	}).regHandler('block.setpos', null, function(params) {
		setPosition(params.id, params.pos);
	}).regHandler('block.setdir', null, function(params) {
		setDirection(params.id, params.cells);
	});
}