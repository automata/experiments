(function(){
  "use strict";

  var toKieler = function (graph) {
    var kGraph = {id: "root", children: [], edges: []};

    // encode nodes
    var processes = graph.processes;
    var nodeKeys = Object.keys(processes);
    var nodes = nodeKeys.map(function (key) {
      var process = processes[key];
      kGraph.children.push({id: key, 
                            labels: [{text: process.metadata.label}], 
                            width: 72, 
                            height: 72});
    });

    // encode edges
    var currentEdge = 0;
    var connections = graph.connections;
    var edges = connections.map(function (connection) {
      if (connection.data !== undefined) {
        return;
      }
      var source = connection.src.process;
      var target = connection.tgt.process;
      kGraph.edges.push({id: "e" + currentEdge++, 
                         source: source,
                         target: target});
    });

    return kGraph;
  };
       
  window.loadGraph = function (graph) {
    var kGraph = toKieler(graph);

    // some layout options
    var options = {
      spacing: 15,
      algorithm: "de.cau.cs.kieler.klay.layered"
    };
  
    // perform the layout request
    $.kielerLayout({
      server: 'http://layout.rtsys.informatik.uni-kiel.de:9444',
      graph: kGraph,
      options: options,
      iFormat: 'org.json',
      oFormat: 'org.w3.svg',
      // pass a callback method, which is used upon success
      success : function (data) {
        console.log(data);
        $('#content').html(data);
      },
      // in case of an error, write it to the log
      error : function (error) {
        console.log("Error: " + JSON.stringify(error));             
      }
    });
  };

  window.onload = function () {
    var script = document.createElement('script');
    script.src = 'noflo.json.js';
    document.head.appendChild(script);
  };

})();
