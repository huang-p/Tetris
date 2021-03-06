function Block() {
	var blockId = 'b' + Math.random().toString().substr(2);
	var shapes = Block.shapeDefines[Math.floor(Math.random() * 10000) % (game.level === 'easy' ? 7 : Block.shapeDefines.length)];
	var direction = 0;
	var position = [-4, 4];
	var isDead = false;

	var rotate = function() {
		var newDir = (direction + 1) % shapes.length;
		var shapeCells = shapes[newDir];
		msgCenter.postMsg('pool.checkcell', {
			pos: position,
			cells: shapeCells,
			cb: function(ret) {
				if (ret) {
					direction = newDir;
					msgCenter.postMsg('block.setdir', { id: blockId, cells: shapeCells });
				}
			}
		});
	};

	var move = function(delta, movedown) {
		var shapeCells = shapes[direction];
		var newPos = [position[0] + delta[0], position[1] + delta[1]];
		msgCenter.postMsg('pool.checkcell', {
			pos: newPos,
			cells: shapeCells,
			cb: function(ret) {
				if (ret) {
					position = newPos;
					msgCenter.postMsg('block.setpos', { id: blockId, pos: position });
				} else if (movedown) {
					freeze();
				}
			}
		}, true);
	};

	var freeze = function() {
		isDead = true;
		msgCenter.unregHandler('block.rotate', blockId).unregHandler('block.movedown', blockId).unregHandler('block.moveleft', blockId).unregHandler('block.moveright', blockId);
		msgCenter.postMsg('block.freeze', { id: blockId, pos: position, cells: shapes[direction] });
	};

	msgCenter.regHandler('block.rotate', blockId, function() {
		!isDead && rotate();
	}).regHandler('block.movedown', blockId, function() {
		!isDead && move([1, 0], true);
	}).regHandler('block.moveleft', blockId, function() {
		!isDead && move([0, -1]);
	}).regHandler('block.moveright', blockId, function() {
		!isDead && move([0, 1]);
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
	],
	[ // U
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 2]
		],
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 0],
			[2, 1]
		],
		[
			[0, 0],
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2]
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[2, 0],
			[2, 1]
		]
	],
	[ // +
		[
			[0, 1],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 1]
		]
	],
	[ // 大T
		[
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 1],
			[2, 1]
		],
		[
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 2]
		],
		[
			[0, 1],
			[1, 1],
			[2, 0],
			[2, 1],
			[2, 2]
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 0]
		]
	],
	[ // 大Z
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 1],
			[2, 2]
		],
		[
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 0]
		]
	],
	[ // 大S
		[
			[0, 1],
			[0, 2],
			[1, 1],
			[2, 0],
			[2, 1]
		],
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 2]
		]
	]
];
