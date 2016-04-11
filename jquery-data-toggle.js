/*
	The MIT License (MIT)

	Copyright (c) 2016 Christopher Machicoane-Hurtaud

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

// TODO - Create function to refresh all binds

;(function($) {
	'use strict';

	var touching = false;
	var startX = null;
	var startY = null;

	$.dataToggle = $.fn.dataToggle = function(target, options) {
		this.each(function() {
			$.dataToggle.bind($(this), target, options);
		});
		return this;
	};

	$.fn.dataToggle.settings = {
		allowTouching: true,
		touchTolerance: 10,
		activeClasses: ['active'],
		preventingCallback: function() {
			return false;
		}
	};

	$.fn.dataToggle.bind = function(trigger, target, options) {
		if (typeof trigger === "string") {
			trigger = $(trigger);
		}

		var triggerDataToggle = function(e) {
			if ($.fn.dataToggle.settings.allowTouching && touching) {
				var endX = e.originalEvent.changedTouches[0].screenX;
				var endY = e.originalEvent.changedTouches[0].screenY;
				var delta = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY));
				if (delta > $.dataToggle.settings.tolerance) {
					return;
				}
			}

			var $that = $(this);
			var $target = typeof target === "string" ? $(target) : target;
			var $el = $(e.target);
			var groups = (typeof options.groups === "string" ? options.groups.split(' ') : options.groups) || [];
			var events = (typeof options.events === "string" ? options.events.split(' ') : options.events) || [];
			var classes = (typeof options.classes === "string" ? options.classes.split(' ') : options.classes) || $.fn.dataToggle.settings.activeClasses;

			var contained = false;
			if ($target.is('.' + classes.join(', .'))) {
				for (var i = 0; i < $el.length; ++i) {
					var contains = false;
					for (var j = 0; j < $target.length; ++j) {
						if ($.contains($target[j], $el[i])) {
							contains = true;
						}
					}
					if (contains && !$target.is($($that[i])) && !$target.parent().is($($el[i]))) {
						contained = true;
					}
				}
			}

			if (
				$el.is('a') || $el.parent().is('a')
				|| (contained && !$el.is('[data-toggle]') && !$el.parent().is('[data-toggle]'))
				|| $.fn.dataToggle.settings.preventingCallback($that, $target, $el, options)
			) {
				return true;
			}

			e.preventDefault();
			var className = classes.join(' ');

			if (groups.length > 0) {
				for (var i = 0; i < groups.length; ++i) {
					var group = groups[i];
					$('[data-toggle-group="' + group + '"]').each(function() {
						if (! $(this).is($that)) {
							$(this).removeClass(className);
							var $dest = $(this).data('toggle');
							$($dest).removeClass(className);
							for (var j = 0; j < events.length; ++j) {
								var ev = events[j];
								$($dest).trigger(ev, [false]);
							}
						}
					});
				}
			}

			$target.toggleClass(className);
			$('[data-toggle="' + $that.data('toggle') + '"]').each(function() {
				var status = $target.filter('.' + className).length > 0;
				$(this)[status ? 'addClass' : 'removeClass'](className);
				for (var j = 0; j < events.length; ++j) {
					var ev = events[j];
					$target.trigger(ev, [status]);
				}
			});

			return false;
		};

		trigger.on($.fn.dataToggle.settings.triggeringEvent, triggerDataToggle);
		trigger.on('keyup', function(e) {
			if (e.which == 13 || e.keyCode == 13) {
				e.preventDefault();
				e.stopPropagation();
				triggerDataToggle.call(this, e);
			}
		});
	};

	$.fn.dataToggle.init = function(params) {
		$.fn.dataToggle.settings = $.extend($.fn.dataToggle.settings, params);
		$.fn.dataToggle.settings.triggeringEvent = $.fn.dataToggle.settings.allowTouching && 'ontouchend' in document
			? 'touchend'
			: 'mouseup';

		if ($.fn.dataToggle.settings.allowTouching) {
			$(document).on('touchstart', function(e) {
				startX = e.originalEvent.touches[0].screenX;
				startY = e.originalEvent.touches[0].screenY;
				touching = false;
			});

			$(document).on('touchmove', function(e) {
				touching = true;
			});
		}

		$(window).on('load', function() {
			$('[data-toggle]').each(function() {
				var target = $(this).data('toggle');
				var groups = $(this).data('toggle-group');
				var events = $(this).data('toggle-event');
				var classes = $(this).data('toggle-class');
				$(this).dataToggle(target, {
					groups: groups,
					events: events,
					classes: classes
				});
			});
		});
	};
})(jQuery);
