window.__requirejsToggleBackup = {
    define: window.define,
    require: window.require,
    requirejs: window.requirejs
};

Object.keys(window.__requirejsToggleBackup).forEach(function(prop) {
    window[prop] = undefined;
});

var gamePath = window.houdini && window.houdini.configuration.game_path || "/html/";
var jsElm = document.createElement("script");
jsElm.type = "application/javascript";
jsElm.src = gamePath + "book_of_ra_deluxe/game.js" + '?_=' + (new Date()).getTime();
document.getElementsByTagName('head')[0].appendChild(jsElm);