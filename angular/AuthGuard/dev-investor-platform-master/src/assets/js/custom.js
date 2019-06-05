jQuery(document).ready(function ($) {
    $('[data-toggle="tooltip"]').tooltip();
    if ($("#editor").length > 0) {
        $("#editor").editor({
            uiLibrary: 'bootstrap4'
        });
    }
});

/*Change tabs to accordion for mobile*/
// heavily modified BS4 version of https://github.com/openam/bootstrap-responsive-tabs
var fakewaffle = (function ($, fakewaffle) {
    'use strict';

    fakewaffle.responsiveTabs = function (collapseDisplayed) {

        fakewaffle.currentPosition = 'tabs';

        var tabGroups = $('.nav-accordion.responsive');
        var hidden = '';
        var visible = '';
        var activeTab = '';

        //    if ( collapseDisplayed === undefined ) {
        //      collapseDisplayed = [ 'xs', 'sm' ];
        //    }

        //    $.each( collapseDisplayed, function () {
        //      hidden  += ' banana-' + this;
        //      visible += ' visible-' + this;
        //    } );

        hidden = ' d-none d-md-flex';
        visible = ' d-md-none';

        $.each(tabGroups, function (index) {
            var collapseDiv;
            var $tabGroup = $(this);
            var tabs = $tabGroup.find('li a');

            if ($tabGroup.attr('id') === undefined) {
                $tabGroup.attr('id', 'tabs-' + index);
            }

            collapseDiv = $('<div></div>', {
                'class': 'card-soup responsive' + visible,
                'id': 'collapse-' + $tabGroup.attr('id')
            });

            $.each(tabs, function () {
                var $this = $(this);
                var oldLinkClass = $this.attr('class') === undefined ? '' : $this.attr('class');
                var newLinkClass = 'accordion-toggle';
                var oldParentClass = $this.parent().attr('class') === undefined ? '' : $this.parent().attr('class');
                var newParentClass = 'card';
                var newHash = $this.get(0).hash.replace('#', 'collapse-');

                if (oldLinkClass.length > 0) {
                    newLinkClass += ' ' + oldLinkClass;
                }

                if (oldParentClass.length > 0) {
                    oldParentClass = oldParentClass.replace(/\bactive\b/g, '');
                    newParentClass += ' ' + oldParentClass;
                    newParentClass = newParentClass.replace(/\s{2,}/g, ' ');
                    newParentClass = newParentClass.replace(/^\s+|\s+$/g, '');
                }

                if ($this.parent().hasClass('active')) {
                    activeTab = '#' + newHash;
                }

                collapseDiv.append(
                    $('<div>').attr('class', newParentClass).html(
                        $('<div>').attr('class', 'card-header').html(
                            $('<h4>').attr('class', 'card-title').html(
                                $('<a>', {
                                    'class': newLinkClass,
                                    'data-toggle': 'collapse',
                                    'data-parent': '#collapse-' + $tabGroup.attr('id'),
                                    'href': '#' + newHash,
                                    'html': $this.html()
                                })
                            )
                        )
                    ).append(
                        $('<div>', {
                            'id': newHash,
                            'class': 'collapse'
                        })
                    )
                );
            });

            $tabGroup.next().after(collapseDiv);
            $tabGroup.addClass(hidden);
            $('.tab-content.responsive').addClass(hidden);

            if (activeTab) {
                $(activeTab).collapse('show');
            }
        });

        fakewaffle.checkResize();
        fakewaffle.bindTabToCollapse();
    };

    fakewaffle.checkResize = function () {

        if ($('.card-soup.responsive').is(':visible') === true && fakewaffle.currentPosition === 'tabs') {
            fakewaffle.tabToPanel();
            fakewaffle.currentPosition = 'panel';
        } else if ($('.card-soup.responsive').is(':visible') === false && fakewaffle.currentPosition === 'panel') {
            fakewaffle.panelToTab();
            fakewaffle.currentPosition = 'tabs';
        }

    };

    fakewaffle.tabToPanel = function () {

        var tabGroups = $('.nav-accordion.responsive');

        $.each(tabGroups, function (index, tabGroup) {

            // Find the tab
            var tabContents = $(tabGroup).next('.tab-content').find('.tab-pane');

            $.each(tabContents, function (index, tabContent) {
                // Find the id to move the element to
                var destinationId = $(tabContent).attr('id').replace(/^/, '#collapse-');

                // Convert tab to panel and move to destination
                $(tabContent)
                    .removeClass('tab-pane')
                    .addClass('card-body fw-previous-tab-pane')
                    .appendTo($(destinationId));

            });

        });

    };

    fakewaffle.panelToTab = function () {

        var panelGroups = $('.card-soup.responsive');

        $.each(panelGroups, function (index, panelGroup) {

            var destinationId = $(panelGroup).attr('id').replace('collapse-', '#');
            var destination = $(destinationId).next('.tab-content')[0];

            // Find the panel contents
            var panelContents = $(panelGroup).find('.card-body.fw-previous-tab-pane');

            // Convert to tab and move to destination
            panelContents
                .removeClass('card-body fw-previous-tab-pane')
                .addClass('tab-pane')
                .appendTo($(destination));

        });

    };

    fakewaffle.bindTabToCollapse = function () {

        var tabs = $('.nav-accordion.responsive').find('li a');
        var collapse = $('.card-soup.responsive').find('.card-collapse');

        // Toggle the panels when the associated tab is toggled
        tabs.on('shown.bs.tab', function (e) {

            if (fakewaffle.currentPosition === 'tabs') {
                var $current = $(e.currentTarget.hash.replace(/#/, '#collapse-'));
                $current.collapse('show');

                if (e.relatedTarget) {
                    var $previous = $(e.relatedTarget.hash.replace(/#/, '#collapse-'));
                    $previous.collapse('hide');
                }
            }

        });

        // Toggle the tab when the associated panel is toggled
        collapse.on('shown.bs.collapse', function (e) {

            if (fakewaffle.currentPosition === 'panel') {
                // Activate current tabs
                var current = $(e.target).context.id.replace(/collapse-/g, '#');
                $('a[href="' + current + '"]').tab('show');

                // Update the content with active
                var panelGroup = $(e.currentTarget).closest('.card-soup.responsive');
                $(panelGroup).find('.card-body').removeClass('active');
                $(e.currentTarget).find('.card-body').addClass('active');
            }

        });
    };

    $(window).resize(function () {
        fakewaffle.checkResize();
    });

    return fakewaffle;
}(window.jQuery, fakewaffle || {}));

fakewaffle.responsiveTabs();

document.documentElement.setAttribute("lang", "en");
document.documentElement.removeAttribute("class");

// axe.run( function(err, results) {
//   console.log( results.violations );
// } );

// Get IE or Edge browser version
var version = detectIE();

if (version !== false) {
    alert('Please view in Chrome/Safari/Firefox');
}
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

//file input
jQuery(function ($) {
    // $('.datepicker').datepicker({
    //     format: 'mm/dd/yyyy',
    //     startDate: '-3d'
    // });

    function bs_input_file() {
        $(".input-file").before(
            function () {
                if (!$(this).prev().hasClass('input-ghost')) {
                    var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                    element.attr("name", $(this).attr("name"));
                    element.change(function () {
                        element.next(element).find('input').val((element.val()).split('\\').pop());
                    });
                    $(this).find("button.btn-choose").click(function () {
                        element.click();
                    });
                    $(this).find("button.btn-reset").click(function () {
                        element.val(null);
                        $(this).parents(".input-file").find('input').val('');
                    });
                    $(this).find('input').css("cursor", "pointer");
                    $(this).find('input').mousedown(function () {
                        $(this).parents('.input-file').prev().click();
                        return false;
                    });
                    return element;
                }
            }
        );
    }
    $(function () {
        bs_input_file();
    });


    $(".btn-submit").click(function (event) {

        // Fetch form to apply custom Bootstrap validation
        var form = $(".inner-form, .form-inner")

        if (form[0].checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.addClass('was-validated');

    });



});

jQuery(document).ready(function ($) {

    $(".input-first").focus(function () {

        $('.btn-indicator').addClass("active-btn");


    }).blur(function () {
        $('.btn-indicator').removeClass("active-btn");


    })

});

jQuery(document).ready(function ($) {

    $(".img-input input").focus(function () {


        $('.img-input').addClass("focused");

    }).blur(function () {

        $('.img-input').removeClass("focused");

    })

});

jQuery(function ($) {
    $.fn.extend({
        treeviewd: function (o) {

            var openedClass = 'fa-minus';
            var closedClass = 'fa-plus';

            if (typeof o != 'undefined') {
                if (typeof o.openedClass != 'undefined') {
                    openedClass = o.openedClass;
                }
                if (typeof o.closedClass != 'undefined') {
                    closedClass = o.closedClass;
                }
            };

            //initialize each of the top levels
            var treeview = $(this);
            treeview.addClass("treeview");
            treeview.find('li').has("ul").each(function () {
                var branch = $(this); //li with children ul
                branch.prepend("<i class='indicator  " + closedClass + "'></i>");
                branch.addClass('branch');
                branch.on('click', function (e) {
                    if (this == e.target) {
                        var icon = $(this).children('i:first');
                        icon.toggleClass(openedClass + " " + closedClass);
                        $(this).children().children().toggle();
                    }
                })
                branch.children().children().toggle();
            });
            //fire event from the dynamically added icon
            treeview.find('.branch .indicator').each(function () {
                $(this).on('click', function () {
                    $(this).closest('li').click();
                });
            });
            //fire event to open branch if the li contains an anchor instead of text
            treeview.find('.branch>a').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
            //fire event to open branch if the li contains a button instead of text
            treeview.find('.branch>button').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
        }
    });

    //Initialization of treeviewviews

    $('#treeview1').treeviewd();

    $('#treeview2').treeviewd({ openedClass: 'icon-Asset-icon2', closedClass: 'icon-Asset-icon1' });

    $('#treeview3').treeviewd({ openedClass: 'glyphicon-chevron-right', closedClass: 'glyphicon-chevron-down' });
});