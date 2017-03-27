$(document).ready(function() {

    var audio_js_controls = false;

    /* pjaxify */
    $(document).pjax('a', '#main-container', {
        fragment: '#main-container',
        timeout: 3000
    });

    $(document).on('pjax:send', function() {
        console.log('pjax:send');
    });

    $(document).on('pjax:complete', function() {
        console.log('pjax:complete');
    });

    $(document).on('pjax:success', function() {
        console.log('pjax:success');
    });

    $(document).on('pjax:end', function() {
        console.log('pjax:end');
        Prism.highlightAll();
        loadTrack();
    });

    /* fixed header */
    var header = $('.header-wrap');
    setFixed = function(w) {
        if ($(w).scrollTop() > 100) {
            if (!$(header).hasClass("fixed")) {
                $(header).addClass("fixed");
            }
        } else {
            $(header).removeClass("fixed");
        }
    }

    $(window).scroll(function() {
        setFixed(this);
    });

    /* homepage scroll effect */
    var down_arrow = $('.down-arrow');


    $(down_arrow).click(function() {
        $('html, body').animate({
            scrollTop: $(".about").offset().top
        }, 1000);
    });

    // go!
    header.hide();
    setFixed(window);
    header.show();


    // audio stuff
    var audio = new WebAudio();
    var viz = new WebAudioViz();
    var visualizer = document.getElementById('player-viz');
    audio.init();
    viz.init(audio, visualizer);


    function doControls() {
        if (!audio_js_controls) {

            var logo_wrap = document.getElementById('logo-wrap');
            var global_play_button = document.createElement('span');
            var global_pause_button = document.createElement('span');

            global_play_button.onclick = function() {
                audio.start();
            }

            global_pause_button.onclick = function() {
                audio.pause();
            }

            global_play_button.className = 'icon-play3 player-start';
            global_pause_button.className = 'icon-pause2 player-pause';
            global_play_button.innerHTML = '';
            global_pause_button.innerHTML = '';

            logo_wrap.appendChild(global_play_button);
            logo_wrap.appendChild(global_pause_button);

            // delay adding the class so it animates
            setTimeout(function() {
                global_play_button.className += ' visible';
                global_pause_button.className += ' visible';
            }, 100);

            audio_js_controls = true;

        }
    }

    function loadTrack() {

        var track = document.getElementById('track');
        var play_button = document.getElementById('play-track');

        if (track) {

            if (play_button) {

                $(play_button).click(function() {
                    viz.start();
                    audio.start();

                    doControls();

                });
            }
            url = $(track).data('src');
            title = $(track).data('title');

            audio.addQueue({
                'file': url,
                'title': title,
                'play_button': play_button
            })

        } else {
            return;
        }

    }

    loadTrack();

});
