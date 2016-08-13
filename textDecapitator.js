 /*
    textDecapitator.js 1.0.0
    https://github.com/maximecote57/textDecapitator.js
    Copyright 2016 @ Maxime Cote

    Licensed under the MIT license.
    http://en.wikipedia.org/wiki/MIT_License    
*/

(function($) {
    
    if ($.fn.textDecapitator) {
        return;
    }

    $.fn.textDecapitator.defaultOptions = {
        'truncateMode' : 'oneLine',
        'specificHeight' : 30,
        'cutRate' : 1
    };

    $.fn.textDecapitator.textDecapitator = function() {

        $.fn.textDecapitator.options = $.extend(true, {}, $.fn.textDecapitator.defaultOptions, customOptions);

        $('[data-text-decapitator]').each(function() {

            setDefaultCssProperties($(this));
            truncateElementIfNecessary($(this));

        })
    }

    function addFinalDotsToElement($element) {

        var elementText = $element.text();

        $element.text(elementText.substring(0, elementText.length - 3) + '...');

        return $element;

    }

    function getElementLineHeight($element) {

        var targetHeight;

        $element.css('white-space', 'nowrap');
        targetHeight = $element.height();
        $element.css('white-space', 'normal');

        return targetHeight;

    }

    function getElementHeightWithFinalDots($element) {

        var elementText = $element.text();
        var $elementWithFinalDots = addFinalDotsToElement($element);
        var elementHeight = $elementWithFinalDots.height();

        $element.text(elementText);

        return elementHeight;

    }

    function setDefaultCssProperties($element) {

        $element.css({
            'text-overflow' : 'ellipsis',
            'overflow' : 'hidden',
            'line-height' : '1.5'
        })

    }

    function truncateElementIfNecessary($element) {

        var elementHeight = $element.height();
        var oneLineHeight = getElementLineHeight($element);

        if(MEV.Modules.TextTruncator.options.truncateMode === "specificHeight") {
            var targetHeight = MEV.Modules.TextTruncator.options.specificHeight;
            if(targetHeight < oneLineHeight) {
                console.log('textDecapitator.js : specificHeight parameter is smaller than line-height of the target. Can\'t truncate.');
                return;
            }
            else if(elementHeight > targetHeight) {
                while(elementHeight > targetHeight && $element.text().length > 0) {
                    var elementText = $element.text();
                    $element.text(elementText.substring(0, elementText.length - MEV.Modules.TextTruncator.options.cutRate));
                    elementHeight = getElementHeightWithFinalDots($element);
                }
                addFinalDotsToElement($element)
            }
        }
        else if(MEV.Modules.TextTruncator.options.truncateMode === "oneLine"){
            $element.css({
                'white-space' : 'nowrap'
            })
        }
    }            

})(jQuery);