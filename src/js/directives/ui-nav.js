angular.module('app')
    .directive('uiNav', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                var _window = $(window),
                    _mb = 768,
                    wrap = $('.app-aside'),
                    next,
                    backdrop = '.dropdown-backdrop'
                // unfolded
                el.on('click', 'a', function(e) {
                    if($('.app-aside-folded').length) return;
                    if(next) next.trigger('mouseleave.nav');
                    var _this = $(this);
                    _this.parent().siblings( ".active" ).toggleClass('active');
                    if(_this.next().is('ul')) if(_this.parent().toggleClass('active'))  e.preventDefault();
                });

                // folded & fixed
                el.on('mouseenter', 'a', function(e){
                    if(next) next.trigger('mouseleave.nav');
                    $('> .nav', wrap).remove();
                    if (!$('.app-aside-folded').length) return;
                    var _this = $(e.target), top, w_h = $(window).height(), offset = 50, min = 150;

                    if(!_this.is('a')) _this = _this.closest('a');
                    if( _this.next().is('ul') ){
                        next = _this.next();
                    }else{
                        return;
                    }
                    _this.parent().addClass('active');
                    if($('.app-aside-fixed').length){
                        div = $("<div style='overflow: hidden' class='nav active'><div style='height:100%;overflow-y:auto'></div></div>");
                        divChild = $(div.children()[0]);
                        divChild.append(next);
                        div.appendTo(wrap);
                        top = _this.parent().position().top + offset;
                        div.css('top', top);
                        next.css('width',div.width());
                        if( top + next.height() > w_h ){
                            div.css('bottom', 0);
                            divChild.css('width',div.width()+50);
                            next.css('overflow','hidden');
                        }
                        if(top + min > w_h){
                            div.css('bottom', w_h - top - offset).css('top', 'auto');
                        }
                    }else{
                        div = $("<div style='overflow: hidden;position: fixed' class='nav active'><div style='height:100%;overflow-y:auto'></div></div>");
                        divChild = $(div.children()[0]);
                        divChild.append(next);
                        div.appendTo(wrap);
                        top = _this.parent().position().top - $(window).scrollTop();
                        div.css('top', top);
                        next.css('width',div.width());
                        if( top + next.height() > w_h ){
                            div.css('bottom', 0);
                            divChild.css('width',div.width()+50);
                            next.css('overflow','hidden');
                        }
                        if(top + min > w_h){
                            div.css('bottom', w_h - top - offset).css('top', 'auto');
                        }
                    }


                    next.on('mouseleave.nav', function(e){
                        $(backdrop).remove();
                        next.appendTo(_this.parent());
                        next.removeAttr('style');
                        next.off('mouseleave.nav');
                        _this.parent().removeClass('active');
                        $('> .nav', wrap).remove();
                    });
                });

                wrap.on('mouseleave', function(e){
                    if(next) next.trigger('mouseleave.nav');
                    $('> .nav', wrap).remove();
                });
            }
        };
    }]);
