/*
TODO Some cases of click/touch events are undesirable, allow script to remove them (like click on <a> inside data-toggle)
TODO Allow binding of click/touch events with JS only
*/
;(function($){
  'use strict';
	$(window).on('load', function() {
		var touching = false;
		var tolerance = 10; // because sometimes, it's hard to touch without moving fingers
		var startX = null;
		var startY = null;
		$(document).on('touchstart', function(e) {
			startX = e.originalEvent.touches[0].screenX;
			startY = e.originalEvent.touches[0].screenY;
			touching = false;
		});
		$(document).on('touchmove', function(e) {
			touching = true;
		});
		var evt = 'ontouchend' in document ? 'touchend' : 'mouseup';
		$(document).on(evt, '[data-toggle]', function(e) {
			if (touching) {
				var endX = e.originalEvent.changedTouches[0].screenX;
				var endY = e.originalEvent.changedTouches[0].screenY;
				var delta = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)); // distance
				if (delta > tolerance) {
					return;
				}
			}
			var $target = $(e.target);
			var $that = $(this);
			var el = $(this).attr('data-toggle');
			var $el = $(el);
			var group = $(this).attr('data-toggle-group') || '';
			var className = $(this).attr('data-toggle-class') || 'active';
			var contained = false;
			if ($el.hasClass('active')) {
				for (var i = 0; i < $el.length; ++i) {
					if ($.contains($el[i], $target[0]) && !$target.is($($el[i])) && !$target.parent().is($($el[i]))) {
						contained = true;
					}
				}
			}
			if (
				$target.is('a') || $target.parent().is('a')
				|| (contained && !$target.is('[data-toggle]') && !$target.parent().is('[data-toggle]'))
			) { // fallback pour les cas particuliers à bugs…
				return true;
			}
			e.preventDefault();
			if (!!group) {
				$('[data-toggle-group="' + group + '"]').each(function() {
					if (! $(this).is($that)) {
						$(this).removeClass(className);
						var $dest = $(this).attr('data-toggle');
						$($dest).removeClass(className);
					}
				});
			}
			$el.toggleClass(className);
			$('[data-toggle="' + el + '"]').toggleClass(className, $el.filter('.' + className).length > 0);
			return false;
		});
	});
})(jQuery);
