
$(document).ready(function(){

$(".menu_butt").on("click", function () {
			$(".nav_menu").slideToggle();

			})
 $(".enroll_butt").on("click", function () {
			$("#registration").slideToggle();

			})
  $(".close2").on("click", function () {
			$("#registration").slideToggle();
			})
		$('.menu_butt').on("click", function () {
			$(this).toggleClass('active');
			$("body").toggleClass('active')
			})
	$(".nav_menu ul li").on("click", function () {
			$(".nav_menu ul li").removeClass('active');
			$(this).toggleClass('active');
			$("body").removeClass('active')
			})
	$(".nav_menu ul li").on("click", function () {
			$(".nav_menu").slideToggle();
			$("body").removeClass('active')
			})
	$(".close").on("click", function () {
			$(".nav_menu").slideToggle();
			$("body").removeClass('active')
			})
  function my(){
  	if(window.matchMedia('(max-width: 750px)').matches){
      	$('.sled').addClass("sliders")
      }
      else{
      		$('.sled').removeClass("sliders")
      }

  }
  window.addEventListener("orientationchange", function() {

      	var x = document.getElementsByClassName("sled")
      	x.className += " sliders";

    }, false);
    $(document).ready(function(){
my()

      	$('.sliders').slick({
adaptiveHeight: true,
infinite: false,
  slidesToShow: 4,
   arrows: false,
   variableWidth: false,
   responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.5,


      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,

      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1.5,

      },
       breakpoint: 450,
      settings: {
        slidesToShow: 1,

      }
    }]
  })
      
  })

    $(document).ready(function(){
    	$('#fullphone').inputmask("+380 (99) 999 99 99");
        var jVal = {
                'fullName' : function() {
                        $('.form_input.fullName').append('<div id="nameInfo" class="info"></div>');
                        var nameInfo = $('#nameInfo');
                        var ele = $('#fullname');
                        var pos = ele.offset();
                        
                        if(ele.val().length < 6) {
                                jVal.errors = true;

                                        nameInfo.removeClass('correct').addClass('error').html('<img src="img/wrong.svg" alt="" /> <span>Слишком короткое</span>').show();
                                        ele.removeClass('normal').addClass('wrong');
                        } else {
                                        nameInfo.removeClass('error').addClass('correct').html('<img src="img/right.svg" alt="" />').show();
                                        ele.removeClass('wrong').addClass('normal');
                        }
                },
                'fullPhone' : function() {
                        $('.form_input.phone').append('<div id="phoneInfo" class="info"></div>');
                        var phoneInfo = $('#phoneInfo');
                        var ele = $('#fullphone');
                        var pos = ele.offset();
                        
                        if(ele.val().length != 19) {
                                jVal.errors = true;
                                        phoneInfo.removeClass('correct').addClass('error').html('<img src="img/wrong.svg" alt="" /> <span>Слишком короткий</span>').show();
                                        ele.removeClass('normal').addClass('wrong');
                        } else {
                                        phoneInfo.removeClass('error').addClass('correct').html('<img src="img/right.svg" alt="" />').show();
                                        ele.removeClass('wrong').addClass('normal');
                        }
                },
                'company' : function() {
                        $('.form_input.company2').append('<div id="companyInfo" class="info"></div>');
                        var companyInfo = $('#companyInfo');
                        var ele = $('#company');
                        var pos = ele.offset();
                        
                         if(ele.val().length == 0) {
                                jVal.errors = true;
                                        companyInfo.removeClass('correct').addClass('error').html('<img src="img/wrong.svg" alt="" /> <span>Слишком короткое</span>').show();
                                        ele.removeClass('normal').addClass('wrong');
                        } else {
                                        companyInfo.removeClass('error').addClass('correct').html('<img src="img/right.svg" alt="" />').show();
                                        ele.removeClass('wrong').addClass('normal');
                        }

                        
                },
               
                'email' : function() {
                        $('.form_input.email').append('<div id="emailInfo" class="info"></div>');
                        var emailInfo = $('#emailInfo');
                        var ele = $('#email');
                        var pos = ele.offset();
                        
                        var patt = /^.+@.+[.].{2,}$/i;
                        if(!patt.test(ele.val())) {
                                jVal.errors = true;
                                        emailInfo.removeClass('correct').addClass('error').html('<img src="img/wrong.svg" alt="" /> <span>Неправильный формат</span>').show();
                                        ele.removeClass('normal').addClass('wrong');
                        } else {
                                        emailInfo.removeClass('error').addClass('correct').html('<img src="img/right.svg" alt="" />').show();
                                        ele.removeClass('wrong').addClass('normal');
                        }
                },
                
                'sendIt' : function (){
                        if(!jVal.errors) {
                                $('#jform').submit();
                        }
                }
        };
// ====================================================== //
        $('#send').click(function (){
                var obj = $.browser.webkit ? $('body') : $('html');
                obj.animate({ scrollTop: $('#jform').offset().top }, 750, function (){
                        jVal.errors = false;
                        jVal.fullName();
                        jVal.fullPhone();
                        jVal.company();
                        jVal.vehicle();
                        jVal.email();
                        jVal.about();
                        jVal.sendIt();
                });
                return false;
        });
        $('#fullname').change(jVal.fullName);
        $('#fullphone').change(jVal.fullPhone);
        $('#company').change(jVal.company);
        $('#email').change(jVal.email);
        $('#about').change(jVal.about);

});

$("#jform").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);

        $.ajax({
            type: 'post',
            url: '../php/function-send-form.php',
            data: form.serialize(), // serializes the form's elements.
            dataType: "json",
            success: function(data)
            {
                console.log(data);
                if (data.error) {
                   
                   	$('.error_msg').empty().append("Заполните форму полностью")
                   
                }
                if (data.success) {
                	$('.error_msg').empty()
                    $("#registration").slideToggle();
		            $('.success').addClass('active')
					$('.success').attr('style', '');
					setTimeout(function(){$('.success').fadeOut('fast')},3000); 
                }
                else {
                    $('.error_msg').empty().append("Произошла ошибка")
                }
            }
        });

    });
$(function() {
$("a[href^='#']").click(function(e) {
	e.preventDefault();
	
	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({
		scrollTop: position
	} /* speed */ );
});
});
})