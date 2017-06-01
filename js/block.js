function Block() {
	var blockId = 'b' + Math.random().toString().substr(2);
	var shapes = Block.shapeDefines[Math.floor(Math.random() * 10000) % Block.shapeDefines.length];
	var direction = 0;
	var position = [-4, 4, 0, 0];
	for (var i = 0; i < shapes[direction].length; i++) {
		position[2] = shapes[direction][i][1] + 1 > position[2] ? shapes[direction][i][1] + 1 : position[2];
		position[3] = shapes[direction][i][0] + 1 > position[3] ? shapes[direction][i][0] + 1 : position[3];
	}
	position[0] = -position[3];

	var rotate = function() {
		var newDir = (direction + 1) % shapes.length;
		var shapeCells = shapes[newDir];
		for (var i = 0; i < shapeCells.length; i++) {
			if (!pool.isEmptyCell([shapeCells[i][0] + position[0], shapeCells[i][1] + position[1]])) {
				return false;
			}
		}
		direction = newDir;
		msgCenter.postMsg('block.setdir', { id: blockId, cells: shapeCells });
		return true;
	};

	var move = function(delta) {
		var shapeCells = shapes[direction];
		var newPos = [position[0] + delta[0], position[1] + delta[1], position[2], position[3]];
		for (var i = 0; i < shapeCells.length; i++) {
			if (!pool.isEmptyCell([shapeCells[i][0] + newPos[0], shapeCells[i][1] + newPos[1]])) {
				return false;
			}
		}
		position = newPos;
		msgCenter.postMsg('block.setpos', { id: blockId, pos: position });
		return true;
	};

	var freeze = function() {
		msgCenter.unregHandler('block.rotate', blockId).unregHandler('block.movedown', blockId).unregHandler('block.moveleft', blockId).unregHandler('block.moveright', blockId);
		msgCenter.postMsg('block.freeze', { id: blockId, pos: position, cells: shapes[direction] });
	};

	msgCenter.regHandler('block.rotate', blockId, function() {
		rotate();
	}).regHandler('block.movedown', blockId, function() {
		if (!move([1, 0])) {
			freeze();
		}
	}).regHandler('block.moveleft', blockId, function() {
		move([0, -1]);
	}).regHandler('block.moveright', blockId, function() {
		move([0, 1]);
	});

	msgCenter.postMsg('block.created', { id: blockId, pos: position, cells: shapes[direction] });
}

function BlockFactory() {
	msgCenter.regHandler('block.neednew', null, function() {
		new Block();
	});
}

Block.shapeDefines = [
	[ // L
		[
			[0, 0],
			[1, 0],
			[2, 0],
			[2, 1]
		],
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 0]
		],
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 1]
		],
		[
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2]
		]
	],
	[ // J
		[
			[0, 1],
			[1, 1],
			[2, 0],
			[2, 1]
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[1, 2]
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[2, 0]
		],
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 2]
		]
	],
	[ // T
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 1]
		],
		[
			[0, 1],
			[1, 0],
			[1, 1],
			[2, 1]
		],
		[
			[0, 1],
			[1, 0],
			[1, 1],
			[1, 2]
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 0]
		]
	],
	[ // Z
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[1, 2]
		],
		[
			[0, 1],
			[1, 0],
			[1, 1],
			[2, 0]
		]
	],
	[ // S
		[
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 1]
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[2, 1]
		]
	],
	[ // I
		[
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0]
		],
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3]
		]
	],
	[ // O
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1]
		]
	]
];