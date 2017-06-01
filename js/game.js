function MsgCenter() {
	var msgQueue = [];
	var handlers = {};

	this.postMsg = function(msgName, msgData) {
		msgQueue.push({
			name: msgName,
			data: msgData
		});
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
	}, 20);

	this.reset = function() {
		msgQueue.splice(0);
	}
}

var msgCenter = new MsgCenter();
var blockFactory;
var pool;
var gravity;
var score;

msgCenter.regHandler('game.over', null, function() {
	$('#board').hide();
	$('#over').show();
});

$(document).on('click', '#reset', function() {
	msgCenter.reset();
	pool.reset();
	$('#over').hide();
	score.reset();
	$('#board').show();
	msgCenter.postMsg('block.neednew');
});

$(function() {
	pool = new Pool();
	pool.init();
	blockFactory = new BlockFactory();
	gravity = new Gravity();
	score = new Score();
	score.reset();
	msgCenter.postMsg('block.neednew');
});