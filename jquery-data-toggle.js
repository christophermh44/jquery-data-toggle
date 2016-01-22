;(function($){
  'use strict';
	$(document).on('mouseup', '[data-toggle]', function(e) {
		var $target = $(e.target);
		if ($target.is('a') || $target.parent().is('a')) { // fallback pour les options des dossiers
			return;
		}
		e.preventDefault();
		$that = $(this);
		var $el = $(this).attr('data-toggle');
		var group = $(this).attr('data-toggle-group') || '';
		if (!!group) {
			$('[data-toggle-group="' + group + '"]').each(function() {
				if (! $(this).is($that)) {
					$(this).removeClass('active');
					var $dest = $(this).attr('data-toggle');
					$($dest).removeClass('active');
				}
			});
		}
		$($el).toggleClass('active');
		$('[data-toggle="' + $el + '"]').toggleClass('active');
		return false;
	});
})(jQuery);
