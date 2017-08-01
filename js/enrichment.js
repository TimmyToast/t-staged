function getComments() {
    $.getJSON("https://travels.toa.st/siteForms/EnrichmentOfOther/CommentsJSON/", function(data) {

        $.each(data, function(index, value) {
            if (value[3] == "") {
                $('.enrichedComments').prepend('<div class="cmntHolder cmntNo' + value[0] + '" data-id=' + value[0] + '><p class="unnestedComment">' + '<span class="enrichName sansBook">' + value[1] + '</span><span class="timePosted sansBook">' + value[4] + '</span><br>' + value[2] + '<br /><a href="#" class="sansBook reply">reply</a></div>');
            } else {
                $('.cmntNo' + value[3]).append('<p class="nestedComment">' + '<span class="nestedName sansBook">' + value[1] + '</span><span class="timePosted">' + value[4] + '</span><br>' + value[2] + '</p>');
            }
        })
        replyToBind();
        getReplyCount();
        showReplies();
    })

}

// function getBlogposts() {
//     $.getJSON("https://travels.toa.st/three-posts/", function(data) {

//         $.each(data, function(index, value) {
//             if (index < 3) {
//                 $('.stories').append('<a href="' + value.url + '" title="' + value.title + '"><div class="col-xs-12 col-sm-4 storyBox"><img src="' + value.thumbnail + '"alt="' + value.title + '" class="img-responsive" />' + '<p class="story textBook"><span class="storyCat">' + value.category[0].cat_name + ' | </span><span class="storyDesc">' + value.title + '</span></p></div></a>');
//             }
//         })
//     })
// }

function getReplyCount() {
    for (var k = 0; k < $('.cmntHolder').length; k++) {
        if ($('.cmntHolder')[k].children.length > 1) {

            $($('.cmntHolder .unnestedComment')[k]).append('<a href="#" class="replies sansBook">' + ($('.cmntHolder')[k].children.length - 1) + ' Replies</a>');
        }
    };
}

$(document).ready(function() {
    getComments();
    //getBlogposts();
    instagramSlider();

});


$('.commentHere').click(function(e) {
    e.preventDefault();

    var cmntParent = $(this).parent().parent()[0];
    var commentId = $(cmntParent).attr('data-id');
    var windowWidth = $(document).width();
    var windowHeight = $(document).height();
    $('.commentLightbox').css('width', windowWidth);
    $('.commentLightbox').css('height', windowHeight);
    var cmntLightboxDisplay = $(window).scrollTop() + 120;
    var cmntScrollPos = $(window).scrollTop() - 100;

    if ($(window).width() < 768) {
        $('.commentLightboxInner').css('width', '95%');
        $('.commentLightboxInner').css('margin', '2.5%');
        $('.commentLightbox iframe').css('width', '100%');
        $(".commentLightbox").show();
        $('.commentLightboxInner').css('margin-top', cmntScrollPos);
        console.log(cmntScrollPos);
        $(".commentLightboxInner").append("<iframe src='https://travels.toa.st/siteForms/EnrichmentOfOther/index.php'></iframe>");
    } else {


        wwidth = $(window).width();
        fwidth = wwidth * 0.2;
        finalWidth = wwidth - fwidth;
        $('.commentLightboxInner').css('width', finalWidth);

        $(".commentLightbox").fadeIn(200);
        $('.commentLightboxInner').css('margin-top', cmntLightboxDisplay);
        $(".commentLightboxInner").append("<iframe src='https://travels.toa.st/siteForms/EnrichmentOfOther/index.php'></iframe>");

    }
})

function replyToBind() {
    $('.reply').click(function(e) {
        e.preventDefault();

        var cmntParent = $(this).parent().parent()[0];
        var commentId = $(cmntParent).attr('data-id');
        var windowWidth = $(document).width();
        var windowHeight = $(document).height();
        $('.commentLightbox').css('width', windowWidth);
        $('.commentLightbox').css('height', windowHeight);
        var cmntLightboxDisplay = $(window).scrollTop() + 120;
        var cmntScrollPos = $(window).scrollTop() - 100;


        if ($(window).width() < 768) {
            $('.commentLightboxInner').css('width', '100%');
            $('.commentLightbox iframe').css('width', '100%');
            $(".commentLightbox").show();
            console.log('hi ' + cmntScrollPos);
            $('.commentLightboxInner').css('margin-top', cmntScrollPos);
            $(".commentLightboxInner").append("<iframe src='https://travels.toa.st/siteForms/EnrichmentOfOther/index.php?replyID=" + commentId + "'></iframe>");
        } else {
            wwidth = $(window).width();
            fwidth = wwidth * 0.2;
            finalWidth = wwidth - fwidth;
            $('.commentLightboxInner').css('width', finalWidth);
            $(".commentLightbox").fadeIn(200);
            $('.commentLightboxInner').css('margin-top', cmntLightboxDisplay);
            $(".commentLightboxInner").append("<iframe src='https://travels.toa.st/siteForms/EnrichmentOfOther/index.php?replyID=" + commentId + "'></iframe>");


        }
    })
}


function showReplies() {
    $('.replies').click(function(e) {
        e.preventDefault();
        $(this).parent().parent().children().show();
        $(this).hide();
    })
}


/*Instagram include*/
function instagramSlider() {

    $.ajax({
        type: "GET",
        url: "https://api.instagram.com/v1/users/3351257/media/recent/?access_token=3351257.1677ed0.b27b02c841ca4128b3fcb97232c5f000",
        dataType: "jsonp",
        success: function(result) {


            var d = result.data;
            jQuery.each(d, function(i, val) {
                var s = "<a href='" + val.link + "' target='_blank'><div class='instagram-img-holder'><img src='" + val.images.standard_resolution.url + "' class='instagram-img' data-comments='" + val.comments.count + "' data-likes='" + val.likes.count + "' data-recent='" + val.created_time + "'/><div class='instagram-rollover'>" + val.caption.text + "</div></div></a>";
                $('#instagramInner').append($.parseHTML(s));
            });

        },
        async: false
    })

    var slideIndex = 0;
    var totalSlides = $(".instagram-img").length;
    var totalPages = Math.ceil(totalSlides / 6);
    var sliding = false;

    $("#instagramSlider .slide-right, #instagramSlider .slide-left").click(function() {
        if ($("#mediaChecker").css("content").match(/mobile/g)) {
            totalPages = totalSlides;
        } else {
            totalPages = Math.ceil(totalSlides / 6);
        }

        if (sliding === false) {
            sliding = true;

            var slideDirection = "left";

            if ($(this).hasClass("slide-right")) {
                slideDirection = "right";
                slideIndex++;
                if (slideIndex > 3) {
                    slideIndex = 0;
                    $("#instagramInner").animate({
                        marginLeft: "-" + parseInt((slideIndex) / 100) + "%"

                    }, function() {

                        sliding = false;
                    });
                }
            } else {

                slideIndex--;
                if (slideIndex === -1) {
                    slideIndex = 3;
                    $("#instagramInner").animate({
                        marginLeft: "-" + parseInt((slideIndex) * 100) + "%"

                    }, function() {

                        sliding = false;
                    });
                }
            }

            $("#instagramInner").animate({
                marginLeft: "-" + parseInt((slideIndex) * 100) + "%"
            }, function() {
                sliding = false;
            });
        }
    });

    $(".instagram-filter").click(function() {
        var filter = $(this).data("filter");
        $(".instagram-filter.selected-filter").removeClass("selected-filter");
        $(this).addClass("selected-filter");

        var instagramArray = [];
        $(".instagram-img").each(function(index) {
            instagramArray[index] = {
                "element": $(this),
                "comments": $(this).data("comments"),
                "likes": $(this).data("likes"),
                "recent": $(this).data("recent")
            };
        });
        0

        instagramArray.sort(function(a, b) {
            return parseFloat(b[filter]) - parseFloat(a[filter])
        });

        for (var i = 0; i < instagramArray.length; i++) {
            $("#instagramInner").append($(instagramArray[i].element).parent().parent());
        }

        $("#instagramInner").removeClass("fadeIn");
        setTimeout(function() {
            $("#instagramInner").addClass("fadeIn");
        }, 1);
    });

}




$('.closeLb img').click(function() {


    $('.commentLightbox').hide();
    $('.commentLightbox iframe').remove();

})

vidDescs = ['<h3 class="textBook">Alys Fowler | Garden Writer</h3><p class="textBook"></p>', '<h3 class="textBook">Tracy Chevalier | Novelist</h3><p class="textBook"></p>', '<h3 class="textBook">Dan Pearson | Garden Designer & Writer</h3><p class="textBook"></p>'];
vidToPlay = 0;
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var tVideo = 'nuVVHxCJSQY';
var tVideo2 = 'nuVVHxCJSQY';

function onYouTubeIframeAPIReady() {

    /*$(document).ready(function(){*/

    function lightboxBoom() {
        var docHeight = $(document).height();
        $('body').prepend($('<div class="lbYTplayer"></div>'));
        $('.lbYTplayer').height(docHeight);
        $('.lbYTplayer').html($('.YThiddenContent').html());
        $('#ytLightboxbg').append(vidDesc);
        $('.lbYTplayer').fadeIn(200, function() {



            /*Tom Custom Insert*/
            if ($(document).width() < 768) {
                var ytLightboxDisplay = $(window).scrollTop() + 120;
                $('#ytLightboxbg').css('width', vidWidth);
                $('#ytLightBox iframe').css('width', '100%');
                $('#ytLightboxbg').css('left', vidOffsetL).css('top', vidOffsetTp);
                $('.lbYTplayer').css('background-color', 'rgba(255,255,255,0.9)');
            } else {
                var ytLightboxDisplay = $(window).scrollTop() + 120;
                $('#ytLightboxbg').css('width', '80%');
                $('#ytLightBox iframe').css('width', '100%');
                var wwwidth = $(window).width();
                var ifrwidth = $('#ytLightboxbg').width();
                var twidth = wwwidth - ifrwidth;
                var tfirstwidth = twidth / 2;
                $('#ytLightboxbg').css('left', tfirstwidth).css('top', ytLightboxDisplay);
            }


        });

    }

    $('.lbBtn').click(function(e) {

        if (!iOS) {

        vidOffsetTp = $(this).offset().top;
        vidOffsetL = $(this).offset().left;
        vidWidth = $(this).width();
        imageClicked = $(this).attr('data-video-index');
        vidDesc = vidDescs[imageClicked];
        vidClicked = parseInt(imageClicked);
        vidToPlay = vids[vidClicked];
        lightboxBoom();



        /*End custom insert*/



        $('.closeLBYT img').click(function() {
            $('.lbYTplayer').fadeOut(200);
            $('.lbYTplayer').remove();
        })


        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: vidToPlay,
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'showinfo': 0,
                'modestbranding': true,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        // 4. The API will call this function when the video player is ready.

        function onPlayerReady(event, videoId) {
            event.target.playVideo();
            player2 = new YT.Player('player2', {
                height: '390',
                width: '640',
                videoId: vidToPlay,
                autoplay: 1,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }

            });

        };


        var done = false;

        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                player.stopVideo();
                player.destroy();
                $('.lbYTplayer').fadeOut(200);
            }
        }

        function stopVideo() {
            player.stopVideo();
        }
}
    })



}

function formCompleted() {
    $('.commentLightbox').hide();
    $('.commentLightbox iframe').remove();
    getComments();
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function(e) {
    var key = e.message ? "message" : "data";
    var data = e[key];
    if (data == "formComplete") {
        formCompleted()
    }
}, false);


