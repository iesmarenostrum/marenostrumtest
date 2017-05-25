---
---

(function () {
  "use strict";

  var $document = $(document);
  $document.ready(function () {

    var bestPictures = new Bloodhound({
      datumTokenizer: function(d) { 
        console.log(d.tokens);
        return d.tokens;
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: '{{ site.baseurl }}/search.json'
    });

    var autocompletar = $('#prefetch .typeahead').typeahead(null, {
      name: 'best-pictures',
      displayKey: 'value',
      source: bestPictures
    });
    autocompletar.on('typeahead:selected', function (evt, data) {
      window.location = '{{ site.baseurl }}' + data.url;
    });

    
    /* -------------------------- */
    // Línea de tiempo
    // load data via an ajax request. When the data is in, load the timeline
    $.ajax({
      url: '{{ site.baseurl }}/test.json',
      success: function (data) {
        console.log(data);
        // hide the "loading..." message
        document.getElementById('loading').style.display = 'none';

        // DOM element where the Timeline will be attached
        var container = document.getElementById('visualization');

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(data);

        // Configuration for the Timeline
        var options = {};

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, options);
      },
      error: function (err) {
        console.log('Error', err);
        // if (err.status === 0) {
        //   alert('Failed to load data/basic.json.\nPlease run this example on a server.');
        // }
        // else {
        //   alert('Failed to load data/basic.json.');
        // }
      }
    });
  });

})(jQuery);
