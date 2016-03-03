$(function () {
    if ($('.drop-menu').length) {
        menu = new Menu();
    }

    $('.site').each(function () {
        new Screen($(this));
    });

    $.each( $( '.formats__slider' ), function() {

        new SliderFormats ( $( this ) );

    } );

});

var Screen = function (obj) {

    //private properties
    var _self = this,
        _obj = obj;
    var _fullPage;
    var _item = _obj.find('.screen');

    _obj[0].obj = _self;

    //private methods


    var _initContentScroll = function () {

            //_obj.niceScroll({
            //    cursorcolor: '#000',
            //    zindex: 10,
            //    autohidemode: false,
            //    horizrailenabled: false,
            //    cursorborderradius: 0,
            //    cursorwidth: '5px',
            //    bouncescroll: true,
            //    mousescrollstep: 24,
            //    //usetransition: true,
            //    enablemousewheel: false,
            //    touchbehavior:false,
            //    cursorfixedheight: 50
            //});

            $('#fullpage').fullpage({
                loopHorizontal: false,
                normalScrollElementTouchThreshold: 50,
                afterResize:function(link,index) {

                },
                //onLeave:function(link,index) {
                //    console.log('leave');
                //},
                //onSlideLeave:function(link,index) {
                //    console.log('slideleave');
                //}
                scrollOverflow: true
            });

        },
        _onEvents = function () {
            $(window).resize(function () {
                //$.fn.fullpage.destroy('all');
                //$('#fullpage').fullpage({
                //    loopHorizontal: false,
                //    normalScrollElementTouchThreshold: 50,
                //    scrollOverflow: true
                //});
                _sizeEvents();
            });
        },
        _sizeEvents = function(){
            //if ($(window).width() <= 768) {
            //    $('.screen').css('min-height',$(window).height());
            //    $('.screen').removeAttr('height');
            //}
        },
        _init = function () {
            _initContentScroll();
            _sizeEvents();
            _onEvents();
        };

    //public properties

    //public methods
    _init();
};

var SliderFormats = function( obj ) {

    //private properties
    var _self = this,
        _obj = obj,
        _objInner = _obj.find( '>div'),
        _items = _objInner.find( '.formats__slider-item'),
        _itemsArrow = _items.find( '>span'),
        _textItems = _objInner.find( '.formats__slider-text>div'),
        _timer,
        _distance = 0 ,
        _window = $( window );

    //private methods
    var _addEvents = function() {

            _items.on( {
                'mouseenter': function() {

                    if( _window.width() >= 992 ) {

                        _changeText( $( this ) );

                    }
                }
            } );

            _items.on( {
                'click': function() {

                    if( _window.width() < 992 ) {

                        _changeText( $( this ) );

                    }

                    return false

                }
            } );

            _obj.on( {

                'mouseenter': function(){

                    clearInterval( _timer );

                },

                'mouseleave': function(){

                    _changeNext();

                }

            } );

            _window.on( {
                'resize': function() {

                    _positionItems();

                }
            } )

        },
        _changeText = function( item ) {

            var itemIndex = item.index(),
                textBlock = _textItems.eq( itemIndex );

            _items.removeClass( 'active' );

            item.addClass( 'active' );

            _textItems.removeClass( 'visible' );

            textBlock.addClass( 'visible' );

            clearInterval( _timer );

        },
        _positionItems = function() {

            if( _window.width() < 768 ) {

                _distance = 0;

            } else if( _window.width() >= 768 && _window.width() < 1200 ) {

                _distance = 70;

            } else {

                _distance = 54;

            }

            var radius = (_objInner.width() + _distance) / 2 + 'px',
                start = -90,
                numberOfElements = _items.length,
                slice = 360 / numberOfElements;

            _items.each( function( i ) {

                var curItem = $( this ),
                    rotate = slice * i + start,
                    rotateReverse = rotate * -1;

                curItem.css( {
                    '-webkit-transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)',
                    'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
                } );

                _itemsArrow.css( {
                    '-webkit-transform': 'rotate(' + rotate + 'deg) rotate(' + rotateReverse + 'deg)',
                    'transform': 'rotate(' + rotate + 'deg) rotate(' + rotateReverse + 'deg)'
                } );

            } );
        },
        _changeNext = function() {

            _timer = setInterval( function() {

                var activeItem = _items.filter( '.active'),
                    nextItem = activeItem.next(),
                    nextItemIndex = nextItem.index(),
                    currentTextBlock = _textItems.eq( nextItemIndex );

                if( nextItem.index() == - 1 ) {

                    nextItem = _items.eq( 0 );
                    currentTextBlock = _textItems.eq( 0 );

                }

                _items.removeClass( 'active' );

                _textItems.removeClass( 'visible' );

                nextItem.addClass( 'active' );

                currentTextBlock.addClass( 'visible' );

            }, 5000 );

        },
        _startView = function() {


            setTimeout( function () {

                clearInterval( _timer );

                _items.eq(0).addClass( 'active' );

                var activeItem = _items.filter( '.active'),
                    activeItemIndex = activeItem.index(),
                    currentTextBlock = _textItems.eq( activeItemIndex );

                currentTextBlock.addClass( 'visible' );

            },3000 );


            _changeNext();

        },
        _init = function() {

            _obj[ 0 ].obj = _self;
            _startView();
            _positionItems();
            _addEvents();

        };

    _init();
};

var Menu = function () {
    var _self = this,
        _btn = $('.drop-menu-btn'),
        _dropdown = $('.drop-menu');

    var is_article = false;
    var onEvents = function () {
        _btn.on({
            click: function () {

            }
        });

    },
    init = function () {
        onEvents();
    };

    init()
};
