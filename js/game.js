function MsgCenter() {
	var msgQueue = [];
	var handlers = {};

	this.postMsg = function(msgName, msgData, immediately) {
		var msg = {
			name: msgName,
			data: msgData
		};
		immediately ? msgQueue.unshift(msg) : msgQueue.push(msg);
	};

	this.regHandler = function(msgName, host, handler) {
		if (!handlers[msgName]) {
			handlers[msgName] = {};
		}
		handlers[msgName][host] = handler;
		return this;
	};

	this.unregHandler = function(msgName, host) {
		if (handlers[msgName] && handlers[msgName][host]) {
			delete handlers[msgName][host];
		}
		return this;
	};

	var timer = setInterval(function() {
		var msg = msgQueue.shift();
		if (msg && handlers[msg.name]) {
			for (var i in handlers[msg.name]) {
				handlers[msg.name][i](msg.data);
			}
		}
	}, 10);

	this.reset = function() {
		msgQueue.splice(0);
	}
}

var msgCenter = new MsgCenter();

function Game() {
	this.level = 'easy';
	this.poolWidth = 12;
	this.poolHeight = 20;
	this.cellSize = 20;

	msgCenter.regHandler('game.start', null, function() {
		new Pool();
		new BlockFactory();
		new Gravity();
		new Score();
		msgCenter.postMsg('score.reset');
		msgCenter.postMsg('block.neednew');
	}).regHandler('game.over', null, function() {
		$('#board').hide();
		$('#over').show();
	}).regHandler('game.reset', null, function() {
		msgCenter.reset();
		msgCenter.postMsg('pool.reset');
		$('#over').hide();
		msgCenter.postMsg('score.reset');
		$('#board').show();
		msgCenter.postMsg('block.neednew');
	});
}

var game = new Game();

$(function() {
	msgCenter.postMsg('game.start');
});
