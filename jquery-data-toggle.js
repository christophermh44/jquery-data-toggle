;(function($){
  'use strict';
	$(document).on('click', '[data-toggle]', function(e) {
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
