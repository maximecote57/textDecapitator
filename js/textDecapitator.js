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

    $.fn.textDecapitator = function(customOptions) {

        if(this.length <= 0) {
            console.log('textDecapitator.js : No elements to decapitate.');
            return;
        }
        var arraysOfElementsToDecapitate = new Array();
        var selectors = this.selector.split(',');

        for (var i = selectors.length - 1; i >= 0; i--) {
            arraysOfElementsToDecapitate.push($(selectors[i]));
        }

        $.fn.textDecapitator.defaultOptions = {
            'nbOfLines' : 1,
            'cutRate' : 1
        }

        $.fn.textDecapitator.options = $.extend(true, {}, $.fn.textDecapitator.defaultOptions, customOptions);        

        $(arraysOfElementsToDecapitate).each(function(index, elementsToDecapitate) {
            if($.fn.textDecapitator.options.nbOfLines !== 1) {
                $.fn.textDecapitator.options.nbOfLinesHeight = $.fn.textDecapitator.options.nbOfLines * getElementLineHeight($(elementsToDecapitate[0]));
            } 
            $(elementsToDecapitate).each(function() {
                setDefaultCssProperties($(this));
                truncateElementIfNecessary($(this));
            })            
        })
    }

    function addFinalDotsToElement($element) {

        var elementText = $element.text();

        $element.text(elementText.substring(0, elementText.length - 3) + '...');

        return $element;

    }

    function getElementLineHeight($element) {

        var elementLineHeight;
        
        $element.css('white-space', 'nowrap');
        elementLineHeight = $element.height();
        $element.css('white-space', 'normal');

        return elementLineHeight;

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
            'word-wrap' : 'break-word'
        })

    }

    function truncateElementIfNecessary($element) {
        
        var elementHeight = $element.height();
        var oneLineHeight = getElementLineHeight($element);

        if($.fn.textDecapitator.options.nbOfLines !== 1) {
            var targetHeight = $.fn.textDecapitator.options.nbOfLinesHeight;
            if(elementHeight > targetHeight) {
                while(elementHeight > targetHeight && $element.text().length > 0) {
                    var elementText = $element.text();
                    $element.text(elementText.substring(0, elementText.length - $.fn.textDecapitator.options.cutRate));
                    elementHeight = getElementHeightWithFinalDots($element);
                }
                addFinalDotsToElement($element)
            }
        }
        else {
            $element.css({
                'white-space' : 'nowrap'
            })
        }
    }            

})(jQuery);