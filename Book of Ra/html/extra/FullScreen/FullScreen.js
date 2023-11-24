'use strict';
(function () {
	var path = "/html/extra/FullScreen/";
	var callback = function (configStr) {
		var config = JSON.parse(configStr);
		var swipeContainer = null;
		var isVisible = false;

		if (ignoreSwipe()) {
			return;
		}

		if (isIPhone() && isSafari() && isMobileSafari()) {
			init();
			var canvasInterval = setInterval(function () {
				if (document.getElementsByTagName('canvas').length > 0) {
					var canvas = document.getElementsByTagName('canvas')[0];
					document.getElementById('gameContainer').appendChild(canvas);
					clearInterval(canvasInterval);
				}
			}, 100);
		}

		function addCssStyle() {
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.id = 'style';
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = path + 'style.css';
			link.media = 'all';
			head.appendChild(link);
		}

		function addGameContainer() {
			var div = document.createElement("div");
			div.id = "gameContainer";
			document.body.appendChild(div);
		}

		function init() {
			addCssStyle();
			addGameContainer();

			swipeContainer = createSwipe();
			document.body.appendChild(swipeContainer);

			setVisible(false);

			window.addEventListener("resize", onResize, false);
			onResize();
		}

		function onResize() {
			setTimeout(checkSize, 100);
		}

		function checkSize() {
			if (window.innerHeight < document.documentElement.clientHeight && !isPortrait()) {
				showSwipe();
			} else {
				hideSwipe();
			}
		}

		function hideSwipe() {
			if (isVisible) {
				setVisible(false);
			}
		}

		function showSwipe() {
			if (!isVisible) {
				setVisible(true);
				window.scrollTo(0, 0);
			}
		}

		function createSwipe() {
			var container = document.createElement("div");
			container.className = "swipeToFullscreenContainer";
			container.style.zIndex = "999999999";

			var bg = document.createElement("div");
			bg.className = "swipeToFullscreenBg";
			container.appendChild(bg);

			var img = document.createElement("div");
			img.className = "swipeToFullscreenImg";
			container.appendChild(img);

			return container;
		}

		function setVisible(value) {
			isVisible = value;
			if (isIPhone6AndBigger() || !isTopFrame()) {
				swipeContainer.style.display = value ? "block" : "none";
			} else {
				swipeContainer.style.visibility = value ? "visible" : "hidden";
			}
		}

		function ignoreSwipe() {
			var ignoredList = config.ignored;
			var data = window.houdini && window.houdini.configuration;
			if (data && ignoredList) {
				return ignoredList.indexOf(data.gameCode) !== -1;
			}
			return false;
		}
	};

	function loadJSON(url, callback) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', url, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	}

	function getUserAgent() {
		return navigator.userAgent;
	};

	function isIPhone() {
		return getUserAgent().match(/iPhone/i) && !isIEMobile();
	}

	function isSafari() {
		var uagent = getUserAgent().toLowerCase();
		return /safari/.test(uagent) && /applewebkit/.test(uagent) && !/chrome/.test(uagent);
	};

	function isIOS() {
		return getUserAgent().match(/iPhone|iPad|iPod/i) && !isIEMobile();
	};

	function isMobileSafari() {
		return isIOS() && getUserAgent().match(/AppleWebKit/) && getUserAgent().match(/Version/);
	}

	function isIEMobile() {
		return getUserAgent().indexOf("IEMobile") >= 0;
	};

	function isPortrait() {
		return document.documentElement.clientWidth < document.documentElement.clientHeight;;
	}

	function isIPhone6AndBigger() {
		var screenMaxSize = Math.max(window.screen.width, window.screen.height);
		return isIPhone() && (screenMaxSize >= 667.0);
	}

	function isTopFrame() {
		return window.top === window.self;
	}

	loadJSON(path + 'config.json' + '?v=' + (new Date()).getTime(), callback);
})();