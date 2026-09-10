jQuery(function() {
	
	jQuery(document).on('click', '.toggle-nav', function(e) {
		e.preventDefault();
		jQuery('#site-header nav').slideToggle();
	});

	// Animate 
	jQuery.fn.isInViewport = function() {
		var elementTop = jQuery(this).offset().top;
		var elementBottom = elementTop + jQuery(this).outerHeight();
		var viewportTop = jQuery(window).scrollTop();
		// var viewportBottom = viewportTop + ((jQuery(window).height()/3)*2);
		var viewportBottom = viewportTop + ((jQuery(window).height()/2)*2);
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	jQuery.fn.isFullInViewport = function() {
		var elementTop = jQuery(this).offset().top;
		var elementBottom = elementTop + jQuery(this).outerHeight();
		var viewportTop = jQuery(window).scrollTop();
		// var viewportBottom = viewportTop + ((jQuery(window).height()/3)*2);
		var viewportBottom = viewportTop + (jQuery(window).height());
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	var prev_scroll_pos = 0;
	function on_scroll() {
		jQuery('.animate').each(function() {
			var this_el = jQuery(this);
			if(this_el.isInViewport() && !jQuery(this).hasClass('animated')) {
				jQuery(this).removeClass('animate').addClass('animated').addClass(this_el.data('animate'));
			}
		});
		prev_scroll_pos = jQuery(window).scrollTop();
	}
	on_scroll();
	jQuery(window).scroll(function() { on_scroll(); });

	// Parallax elements
	// Simple parallax scroll effect for your masthead elements
	window.addEventListener('scroll', function() {
	    const scrollY = window.pageYOffset;
	    
	    // Get the elements
	    const elementA = document.querySelector('.masthead-parallax-a');
	    const elementB = document.querySelector('.masthead-parallax-b');
	    const elementToolsCta = document.querySelector('.enterprise-tools-parallax');
	    
	    if (elementA && elementB) {
	        // Apply subtle rotation and movement
	        const rotateA = scrollY * -0.02; // Counter-clockwise rotation
	        const rotateB = scrollY * 0.03; // Clockwise rotation
	        const moveB = scrollY * 0.2; // Slight downward movement
	        
	        // Apply transforms
	        elementA.style.transform = `rotate(${rotateA}deg)`;
	        elementB.style.transform = `translateY(${moveB}px) rotate(${rotateB}deg)`;
	    }

	    if (elementToolsCta) {
	        // Measure the parent SECTION's position, not the element's own,
	        // since the element's own rect would already include our transform
	        // from the previous tick and compound into runaway movement
	        const toolsCtaSection = elementToolsCta.closest('.page-block-enterprise-tools-with');
	        const toolsCtaTop = toolsCtaSection ? toolsCtaSection.getBoundingClientRect().top : 0;
	        const moveToolsCta = toolsCtaTop * -0.12;
	        elementToolsCta.style.transform = `translateY(${moveToolsCta}px)`;
	    }
	});

	// Optional: Throttle the scroll event for better performance
	let ticking = false;

	function updateParallax() {
	    const scrollY = window.pageYOffset;
	    
	    const elementA = document.querySelector('.masthead-parallax-a');
	    const elementB = document.querySelector('.masthead-parallax-b');
	    const elementToolsCta = document.querySelector('.enterprise-tools-parallax');
	    
	    if (elementA && elementB) {
	        const rotateA = scrollY * -0.02;
	        const rotateB = scrollY * 0.03;
	        const moveB = scrollY * 0.2;
	        
	        elementA.style.transform = `rotate(${rotateA}deg)`;
	        elementB.style.transform = `translateY(${moveB}px) rotate(${rotateB}deg)`;
	    }

	    if (elementToolsCta) {
	        const toolsCtaSection = elementToolsCta.closest('.page-block-enterprise-tools-with');
	        const toolsCtaTop = toolsCtaSection ? toolsCtaSection.getBoundingClientRect().top : 0;
	        const moveToolsCta = toolsCtaTop * -0.12;
	        elementToolsCta.style.transform = `translateY(${moveToolsCta}px)`;
	    }
	    
	    ticking = false;
	}

	// Throttled version (recommended for better performance)
	window.addEventListener('scroll', function() {
	    if (!ticking) {
	        requestAnimationFrame(updateParallax);
	        ticking = true;
	    }
	});

	// Modal
	jQuery(document).on('click', '.modal-link', function(e) {
		e.preventDefault();
		jQuery('body').addClass('modal-active');
		if(jQuery(this).attr('href') == '#join-waiting-list') {
			jQuery('.modal-form-checkboxes input').eq(0).prop('checked', false);
			jQuery('.modal-form-checkboxes input').eq(1).prop('checked', true);
		} else if(jQuery(this).attr('href') == '#get-a-demo') {
			jQuery('.modal-form-checkboxes input').eq(0).prop('checked', true);
			jQuery('.modal-form-checkboxes input').eq(1).prop('checked', false);
		}
	});
	jQuery(document).on('click', '.close-modal-window-link', function(e) {
		e.preventDefault();
		jQuery('body').removeClass('modal-active');
	});
	// jQuery(document).on('submit', '.modal-form form', function(e) {
	// 	e.preventDefault();
	// 	alert('When set up this will submit.');
	// 	jQuery(this).parent('.modal-form').parent('div').find('.modal-form-success').show();
	// 	jQuery(this).parent('.modal-form').hide();
	// });

});