/*
 * KIELER - Kiel Integrated Environment for Layout Eclipse RichClient
 *
 * http://www.informatik.uni-kiel.de/rtsys/kieler/
 * 
 * Copyright 2013 by
 * + Christian-Albrechts-University of Kiel
 *   + Department of Computer Science
 *     + Real-Time and Embedded Systems Group
 * 
 * This code is provided under the terms of the Eclipse Public License (EPL).
 * See the file epl-v10.html for the license text.
 * 
 * @author uru
 */
(function($) {
  
  /**
   * Performs a layout request for the passed graph and returns a serialized version of the
   * requested output format.
   * 
   * All of the following parameters are to be passed as one object parameter.
   * 
   * {server}
   *            the location of the webserver, e.g., 'http://localhost:9444'.
   * {inFormat}
   *            the input format, e.g., 'org.json'.
   * {outFormat}
   *            the output format, e.g., 'org.w3.svg'.
   * {options}
   *            a json object containing (key, value) pairs representing layout options.
   * {graph}
   *            the graph in a serialized form of the input format. In case the 
   *            json format is used, json data is allowed.
   *            
   * {return} the layouted graph in a serialized form of the output format.
   */
  $.kielerLayout = function(opts) {

    // gather information
    var server = opts.server || "http://localhost:9444";
    var graph = opts.graph;
    var options = opts.options || {};
    var iFormat = opts.iFormat;
    var oFormat = opts.oFormat;
    var success = opts.success;
    var error = opts.error || function() {};
    
    // check whether the graph is a string or json
    if (typeof graph === 'object') {
      graph = JSON.stringify(graph)
    }
    
    $.ajax({
      type : 'POST',
      contentType : 'application/json',
      url : server + '/live',
      data : {
        graph : graph,
        config : JSON.stringify(options),
        iFormat : iFormat,
        oFormat : oFormat
      },
      success : success,
      error : error
    });
  };
}(jQuery));