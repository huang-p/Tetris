function MsgCenter() {
	var msgQueue = [];
	var handlers = {};

	this.postMsg = function (msgName, msgData) {
		msgQueue.push({
			name: msgName,
			data: msgData
		});
	};

	this.regHandler = function (msgName, host, handler) {
		if (!handlers[msgName]) {
			handlers[msgName] = {};
		}
		handlers[msgName][host] = handler;
		return this;
	};

	this.unregHandler = function (msgName, host) {
		if (handlers[msgName] && handlers[msgName][host]) {
			delete handlers[msgName][host];
		}
		return this;
	};

	setInterval(function () {
		var msg = msgQueue.shift();
		if (msg && handlers[msg.name]) {
			for (var i in handlers[msg.name]) {
				handlers[msg.name][i](msg.data);
			}
		}
	}, 20);
}

var msgCenter = new MsgCenter();
var pool

$(function () {
	pool = new Pool();
	pool.init();
	new Block();
});