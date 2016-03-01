$(function(){

    $( '.site' ).niceScroll({
        cursorcolor: '#c00',
        mousescrollstep: $(window).height()
    });

    /*$( '.site' ).getNiceScroll(0).doScrollTop(y, 1);*/

    $( '.screen' ).each( function() {
        new Screen( $( this ) );
    } );

} );

var Screen = function (obj) {

    //private properties
    var _self = this,
        _obj = obj;

    _obj[ 0 ].obj = _self;

    //private methods
    var _onEvents = function () {

            _obj.on({
                'mousewheel': function(){


                }
            });

        },
        _init = function () {
            _onEvents();
        };

    //public properties

    //public methods
    _init();
};

/*var Screen = function (obj) {

    //private properties
    var _self = this,
        _obj = obj,
        _currentPageIndex = 0,
        _active = false,
        _duration = 1000,
        _pages = _obj.find( '.awards__page'),
        _loaded = false,
        _visible = false,
        _window = $( window ),
        _content = _obj.find( '.awards__text-content' ),
        _nextBtn = _obj.find( '.awards__next-page' );

    _obj[ 0 ].obj = _self;

    //private methods
    var _onEvents = function () {

            _obj.on({
                'DOMMouseScroll':function(e){
                    var delta =  e.originalEvent.detail;

                    if( delta ){
                        var direction = ( delta > 0 ) ? 1 : -1;

                        if( !_active ){
                            if( direction > 0 && _currentPageIndex < _pages.length - 1 ){
                                _nextPage();
                            } else if( direction < 0 && _currentPageIndex != 0 ) {
                                _prevPage();
                            }
                        }
                    }

                },
                'mousewheel': function(e){
                    var delta = e.originalEvent.wheelDelta;

                    if( delta ){
                        var direction = ( delta > 0 ) ? -1 : 1;


                        if( !_active ){

                            if( direction > 0 && _currentPageIndex < _pages.length - 1 ){
                                _nextPage();
                            } else if( direction < 0 && _currentPageIndex != 0 ) {
                                _prevPage();
                            }
                        }
                    }

                }
            });

            _window.on( {
                load: function(){
                    _loaded = true;
                },
                resize: function(){
                    _setContentHeight();
                }
            } );

            _nextBtn.on( {
                click: function(){
                    _nextPage();
                    return false;
                }
            } );

        },
        _init = function () {
            _onEvents();
            _setContentHeight();
            _setCupOrigin();
            _initContentScroll();
        },
        _initContentScroll = function(){
            _content.niceScroll({
                railalign: 'left',
                cursorcolor: '#fff',
                zindex: 10,
                autohidemode: false,
                horizrailenabled: false,
                cursorborderradius: 0,
                cursorwidth: '5px'

            });
        },
        _nextPage = function(){
            var curPage =_pages.eq( _currentPageIndex ),
                nextPage = curPage.next();

            _currentPageIndex++;

            _active = true;

            _pages.addClass( 'hidden' );
            curPage.removeClass( 'hidden' );
            nextPage.removeClass( 'hidden' );

            curPage.addClass( 'to-top' );
            nextPage.addClass( 'from-bottom' );

            setTimeout( function(){
                curPage.removeClass( 'to-top' );
                nextPage.removeClass( 'from-bottom' );
                curPage.addClass( 'hidden' );
                _active = false;
                _content.getNiceScroll().resize();

            }, _duration + 10 );
        },
        _prevPage = function(){
            var curPage =_pages.eq( _currentPageIndex ),
                nextPage = curPage.prev();

            _currentPageIndex--;

            _active = true;

            _pages.addClass( 'hidden' );
            curPage.removeClass( 'hidden' );
            nextPage.removeClass( 'hidden' );

            curPage.addClass( 'to-bottom' );
            nextPage.addClass( 'from-top' );

            setTimeout( function(){
                curPage.removeClass( 'to-bottom' );
                nextPage.removeClass( 'from-top' );
                curPage.addClass( 'hidden' );
                _active = false;

                _content.getNiceScroll().resize();


            }, _duration + 10 );
        },
        _setContentHeight = function(){
            _content.height( ( _window.height() / 2 ) - 157 );
        },
        _show = function(){
            _obj.addClass( 'awards_loaded' );

            setTimeout( function(){
                _obj.addClass( 'awards_visible' );
                _visible = true;
            }, 1500 )
        },
        _waitForLoad = function(){
            if( !_loaded ) {
                requestAnimationFrame( _waitForLoad );
            } else {
                _show();
            }
        };

    //public properties

    //public methods
    _self.setFirstPage = function(){
        _currentPageIndex = 0;
        _pages.addClass( 'hidden' );
        _pages.eq( 0 ).removeClass( 'hidden' );
    };

    _self.show = function(){

        if( !_loaded ){
            _waitForLoad();
        } else {
            _show();
        }

    };

    _init();
};*/
