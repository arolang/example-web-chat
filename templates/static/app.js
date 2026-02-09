(function() {
    'use strict';
    var messages = document.getElementById('messages');
    var status = document.getElementById('status');
    var statusText = status.querySelector('.status-text');
    var form = document.getElementById('f');
    var input = document.getElementById('msg');

    function fmt(t) {
        var d = new Date(t);
        var pad = function(n) { return n < 10 ? '0' + n : n; };
        return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

    function add(msg) {
        var el = document.createElement('article');
        el.className = 'card message';
        el.innerHTML = '<time class="time">' + fmt(msg.createdAt) + '</time><p class="content">' + esc(msg.message) + '</p>';
        messages.insertBefore(el, messages.firstChild);
    }

    var ws, delay = 1000;
    function connect() {
        ws = new WebSocket((location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host + '/ws');
        ws.onopen = function() { status.className = 'status connected'; statusText.textContent = 'Connected'; delay = 1000; };
        ws.onmessage = function(e) { try { add(JSON.parse(e.data)); } catch(err) {} };
        ws.onclose = function() { status.className = 'status disconnected'; statusText.textContent = 'Reconnecting...'; setTimeout(connect, delay); delay = Math.min(delay * 2, 30000); };
        ws.onerror = function() { ws.close(); };
    }
    connect();

    form.onsubmit = function(e) {
        e.preventDefault();
        var msg = input.value.trim();
        if (!msg) return;
        fetch('/messages', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'message=' + encodeURIComponent(msg) });
        input.value = '';
    };

    input.focus();
})();
