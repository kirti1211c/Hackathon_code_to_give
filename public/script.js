jQuery(document).ready(function ($) {
    var feedbackSlider = $(".feedback-slider");
    feedbackSlider.owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        autoplay: true,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        navText: [
            "<i class='fa fa-long-arrow-left'></i>",
            "<i class='fa fa-long-arrow-right'></i>"
        ],
        responsive: {
            // breakpoint from 767 up
            767: {
                nav: true,
                dots: false
            }
        }
    });

    feedbackSlider.on("translate.owl.carousel", function () {
        $(".feedback-slider-item h3")
            .removeClass("animated fadeIn")
            .css("opacity", "0");
        $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating")
            .removeClass("animated zoomIn")
            .css("opacity", "0");
    });

    feedbackSlider.on("translated.owl.carousel", function () {
        $(".feedback-slider-item h3").addClass("animated fadeIn").css("opacity", "1");
        $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating")
            .addClass("animated zoomIn")
            .css("opacity", "1");
    });
    feedbackSlider.on("changed.owl.carousel", function (property) {
        var current = property.item.index;
        var prevThumb = $(property.target)
            .find(".owl-item")
            .eq(current)
            .prev()
            .find("img")
            .attr("src");
        var nextThumb = $(property.target)
            .find(".owl-item")
            .eq(current)
            .next()
            .find("img")
            .attr("src");
        var prevRating = $(property.target)
            .find(".owl-item")
            .eq(current)
            .prev()
            .find("span")
            .attr("data-rating");
        var nextRating = $(property.target)
            .find(".owl-item")
            .eq(current)
            .next()
            .find("span")
            .attr("data-rating");
        $(".thumb-prev").find("img").attr("src", prevThumb);
        $(".thumb-next").find("img").attr("src", nextThumb);
        $(".thumb-prev")
            .find("span")
            .next()
            .html(prevRating + '<i class="fa fa-star"></i>');
        $(".thumb-next")
            .find("span")
            .next()
            .html(nextRating + '<i class="fa fa-star"></i>');
    });
    $(".thumb-next").on("click", function () {
        feedbackSlider.trigger("next.owl.carousel", [300]);
        return false;
    });
    $(".thumb-prev").on("click", function () {
        feedbackSlider.trigger("prev.owl.carousel", [300]);
        return false;
    });
}); //end ready



$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 3,
        margin: 30,
        loop: true,
        dots: true
    });
});


var i = 0;
var txt = '';
var speed = 25;

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("#about_us").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    if (i == 15) {
        speed = 10;
    }
}

window.onload = typeWriter();

function login() {
    var alertmsg = document.getElementById('alertt');
    var okbtn = document.getElementById('okbtn');
    var survey = document.getElementById('ibutton');
    var form = document.getElementById('form');
    survey.classList.add('hidden');
    alertmsg.classList.remove('hidden');


    form.addEventListener('submit', function (e) {
        alertmsg.classList.add('hidden');
        survey.classList.remove('hidden');
        e.preventDefault();
        var sign = document.getElementById('exampleInputPassword1').value;
        if (sign === "breads") {
            window.location.href = "./admin";
        }

    });


}

function survey_redirect() {
    window.location.href = "./survey";
    console.log("survey");
}
document.getElementById("login").addEventListener("click", login);
document.getElementById("ibutton").addEventListener("click", survey_redirect);




