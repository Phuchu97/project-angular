/*js menu mobile*/
// function myTest() {
//     $(".list_language").slideToggle();
// };

function toggleMenu() {
    $(".mobile-main-menu").addClass('active');
    $(".menu_toggle").addClass('active');
}

function toggleLeftCategory() {
    $(".left_mpd").addClass('active');
    $(".side_bar_toggle").addClass('active');
}

function toggleRemoveLeftCategory() {
    $(".left_mpd").removeClass('active');
    $(".side_bar_toggle").removeClass('active');
}

var distance;
var x;
function countDownOTP() {
    // Set the date we're counting down to
    //document.getElementById("count_down").innerHTML = '';
    if(distance > 0){
      clearInterval(x);
    }
    $('#count_down').html('');
    $('#count_down').empty().removeClass('text-error');

    var d = new Date();
    var v = new Date();
    v.setMinutes(d.getMinutes() + 5);
    var countDownDate = v.getTime();
    // Update the count down every 1 second
    var minutes = 0;
    var seconds = 0;
    x= setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="demo"
        $('#count_down').html(minutes + ":" + seconds);
        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            $('#count_down').html("Mã xác minh đã hết thời hạn.").addClass('text-error');
        }
    }, 1000);

}
$(".btn-group, .dropdown").hover(
    function() {
        $('>.dropdown-menu', this).stop(true, true).fadeIn("fast");
        $(this).addClass('open');
    },
    function() {
        $('>.dropdown-menu', this).stop(true, true).fadeOut("fast");
        $(this).removeClass('open');
    });

    $('.list_ncc').owlCarousel({
        loop: false,
        rewind: true,
        margin: 5,
        dots: false,
        nav: true,
        autoplay: false,
        autoplayTimeout: 8000,
        autoplaySpeed: 1500,
        smartSpeed: 1200,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

