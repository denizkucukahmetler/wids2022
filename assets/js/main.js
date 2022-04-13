/**
* Template Name: Bethany - v2.2.0
* Template URL: https://bootstrapmade.com/bethany-free-onepage-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  $(window).on('load', function() {
    aos_init();
  });
  
  //BİO POP-OVER function
  $('.speaker').hover(function() {

   $(this).popover({
      trigger: 'hover',
      content: function() {

               // $(this) is set to the element with the popover
               // get your_data, 
			   var index = parseInt($(this).attr("id"));
      if($.i18n().locale == 'tr'){
        return biolist[index];
      }

            },
      placement: 'bottom'
    })
    .popover('show');

 });  
 
 	 var update_texts = function(){
		 $('body').i18n();
	 };
 
 $(document).ready(function() {
	 
	    $.i18n().load( 
		{

		"en": {
			"home": "Home",
			"about": "About",
			"speakers": "Speakers",
			"ambass": "Ambassadors",
			"volunteers": "Volunteers",
			"supporters": "Supporters",
			"register" : "Regıster",
			"abo" : "<br /> <br /> <br /> <br /> WiDS Istanbul is a technical conference for aiming to inspire, educate and support women in data science. Organized for the first time by <a id='stanf_link' class='cta-btn' href='https://www.stanford.edu/' target='blank'> Stanford University </a> in 2015, it turned into a worldwide conference with 150+ regional events in more than 60 countries, reaching 100,000 participants annually online and in person. <br /> <br /> WiDS Istanbul, organized by WiDS Istanbul <a href='#ambassadors'>ambassadors</a> and <a id='sabanci_link' class='cta-btn' href='https://www.sabanciuniv.edu/en/' target='blank'> Sabancı University </a> <a id='verim_link' class='cta-btn' href='https://verim.sabanciuniv.edu/en' target='blank'> VERIM</a> will be held online on May 21, 2022.  <br /> <br />  All genders are invited to attend WiDS events, which feature outstanding women doing outstanding work.",
      "amb": "Ambassadors",
      "buket":"Industrial Engineering Student at Sabanci University",
      "emine":"Computer Science and Engineering Master Student at Sabanci University",
      "deniz":"Computer Science and Engineering Student at Sabanci University",
      "oyku":"Computer Science and Engineering Master Student at Sabanci University",
      "ozlem":"Computer Science and Engineering Student at Erciyes University",
      "busra":"Data Science Master Student at Sabanci University and Data Scientist at Garanti BBVA",
      "busecarik":"Computer Science and Engineering Master Student at Sabanci University",
      "asuman":"Bioinformatics PhD Student at University College Cork",
      "emineAyseSunar":"Computer Science and Engineering Master Student at Sabanci University",
      "busek":"Data Science Master Student at Sabancı University and Data Analyst at ÇiçekSepeti",
      "elifoz": "Molecular Biology and Genetics Student at Acibadem University",
      "speakers_ab":"WiDS Istanbul will host 13 speakers this year.",
      "meltemBallan":" Principal and Founding Partner, Concrete Engine",
      "ozlemBilginer":" Senior Operations Research Scientist, Amazon",
      "zeynepErkinBaz":" Manager Data Science, Facebook",
      "fatmaGunturkun":" Research Fellow, The Univ. of Tennessee Health Science Center",
      "seymanurCapaoglu":" Data Analyst, Truepill",
      "gozdeBozdagi":"Professor, Department of Electrical Engineering, Middle East Technical University",
      "merveNoyan":" Developer, Hugging Face",
      "elifOzkirimli":"Head of Data Science and Advanced   Analytics, Pharma International Data and Analytics Chapter at Roche",
      "haticeOsmanbeyoglu":"Assistant Professor, Department of Biomedical Informatics, University of Pittsburgh",
      "begumYolcu":"Data Engineer, Vodafone",
      "sukejnaValjevac":"R&D Senior Data Scientist, HSBC, UK",
      "cisemAltan":" Senior Machine Learning Engineer, Dogma Alares",
      "wids":"Women in Data Science",
      "conference":"Conference 2022",
      "place":"ISTANBUL, TURKEY",
      "virtual":"VIRTUAL EVENT",
      "register2":"REGISTER FOR FREE",
      "spe": "Speakers",
      "team": "Team Members",
      "speakers2":"Speakers",
      "volunteers2": "Volunteers",
      "ambass2": "Ambassadors",
      "supporters2": "Supporters",
      "program":'<h3>Program Stream</h3><a id="program_link" class="cta-btn" href="https://drive.google.com/file/d/1IgYaglAdLQPMYSC2yALp8U1dOb6_N3kn/view?usp=sharing" target="blank">Download program stream</a>',
      "date":'MAY 21<span class="ordinal">th</span>, 2022',
      "aslihan":"Research Scientist at Vianai Systems Inc.",
      "oznur":"Assistant Professor at Sabanci University",
      "ozgeoz":"Data Science Instructor at BTK Akademi",
      "keynote":"KEYNOTE SPEAKER",
      "berrinYanikoglu": "Professor, Computer Science and Engineering, Sabanci University & Director of Center of Data Analytics  (VERİM) at Sabanci University",
    }

		} );
		update_texts();
 });

 
 $("#langlink, #langlink_sandwich").click(function(e) {
  e.preventDefault();
    $("#langlink, #langlink_sandwich").text(function(_,txt) {
        var ret='';

        if ( txt == 'Past Event' ) {
           ret = 'TR';
       $.i18n().locale = 'en';

        }else{
           ret = 'EN';
       $.i18n().locale = 'tr';
        }
    update_texts();
        return ret;
    });
    return false;
});



})(jQuery);