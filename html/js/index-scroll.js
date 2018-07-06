var myScroll,
pullDownEl, pullDownOffset,
pullUpEl, pullUpOffset,
generatedCount = 0;


function pullDownAction (str,thelist,myScroll) {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById(thelist);

		for (i=0; i<4; i++) {
			li = document.createElement('li');
			li.innerHTML=str;
			el.insertBefore(li, el.childNodes[0]);
		}
		
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction (str,thelist,myScroll) {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById(thelist);
		
		for (i=0; i<4; i++) {
			li = document.createElement('li');
			li.innerHTML=str;
			el.appendChild(li, el.childNodes[0]);
		}
		
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded(wrapper) {
  setTimeout(function () { document.getElementById(wrapper).style.left = '0'; }, 800);
}

loaded.prototype.makeScroll = function (str,wrapper,thelist,pullUp,pullDown){
	var pullDownEl = document.getElementById(pullDown);
	var pullUpEl = document.getElementById(pullUp);	
	var pullDownOffset =pullDownEl.offsetHeight;
	var pullUpOffset = pullUpEl.offsetHeight;
	this.wrapper=wrapper;
	var scroll = new iScroll(this.wrapper, {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {

			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction(str,thelist,scroll);	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction(str,thelist,scroll);	// Execute custom function (ajax call?)
			}
		}
	});

return scroll;
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

