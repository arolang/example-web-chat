var m = document.getElementById('messages');
var s = document.getElementById('status');
var f = document.getElementById('f');
var i = document.getElementById('msg');

function fmt(t) {
    var d = new Date(t);
    var pad = function(n) { return n < 10 ? '0' + n : n; };
    return pad(d.getUTCDate()) + '.' + pad(d.getUTCMonth() + 1) + '.' + d.getUTCFullYear() + ' ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes());
}
function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

function add(msg) {
    var d = document.createElement('div');
    d.className = 'message';
    d.innerHTML = '<div class="time">' + fmt(msg.createdAt) + '</div><div>' + esc(msg.message) + '</div>';
    m.insertBefore(d, m.firstChild);
}

var ws;
function connect() {
    ws = new WebSocket((location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host + '/ws');
    ws.onopen = function() { s.textContent = 'Connected'; s.className = 'connected'; };
    ws.onmessage = function(e) { try { add(JSON.parse(e.data)); } catch(err) {} };
    ws.onclose = function() { s.textContent = 'Disconnected'; s.className = 'disconnected'; setTimeout(connect, 3000); };
}
connect();

f.onsubmit = function(e) {
    e.preventDefault();
    var msg = i.value.trim();
    if (!msg) return;
    fetch('/messages', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'message=' + encodeURIComponent(msg) });
    i.value = '';
};
