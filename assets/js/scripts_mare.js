;(function () {
  "use strict";

  var $document = $(document);
  $document.ready(function () {

    var bestPictures = new Bloodhound({
      datumTokenizer: function(d) { 
        console.log(d.tokens);
        return d.tokens;
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: '/search.json'
    });

    var autocompletar = $('#prefetch .typeahead').typeahead(null, {
      name: 'best-pictures',
      displayKey: 'value',
      source: bestPictures
    });
    autocompletar.on('typeahead:selected', function (evt, data) {
      window.location = data.url;
    });
  });

})(jQuery);
