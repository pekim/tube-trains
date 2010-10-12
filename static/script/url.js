/**
 * Exposes detail regarding the current window's location (URL).
 */
require.def({
  /**
   * Get the value for a named pararameter (argument) in the URL.
   *
   * @param name the paramater name
   * @returns the parameter's value, if found. Otherwise nothing.
   */
  getParameter: function (name) { 
    var query = window.location.search.substring(1); 
    var vars = query.split("&"); 
    for (var v = 0; v < vars.length; v++) { 
      var pair = vars[v].split("="); 
      if (pair[0] === name) { 
        return undefined || pair[1]; 
      } 
    }
  }
});
