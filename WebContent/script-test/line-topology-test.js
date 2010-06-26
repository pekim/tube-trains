/**
 * Copyright 2010 Mike D Pilsbury. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 * 
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY MIKE D PILSBURY  ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MIKE D PILSBURY OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Mike D Pilsbury.
 */

tests.push(function () {
  module("LineTopology");
  
  var NL = '\n';
  
  test("mismatched line length", function() {
    var text = 
                "    EBY" + NL +
                "RMD ECM ";
    
    try {
      var topology = new LineTopology(text);
      ok(false, 'Expected exception');
    } catch (exception) {
      // Expected exception.
    }
  });
  
//  test("grid size", function() {
//    var text = 
//                "    EBY" + NL +
//                "     | " + NL +
//                "RMD ECM";
//    var topology = new LineTopology(text);
//
//    same(topology.width(), 2, "width");
//    same(topology.height(), 2, "height");
//  });
  
//  test("test", function() {
//                "    EBY" +
//                "     | " +
//                "RMD ECM" +
//                " |   | " +
//                "KEW ACT" +
//                " |   | " +
//                "GUN CHP" +
//                "  \  | " +
//                "    \| " +
//                "    TGR";
//    var topology = new LineTopology(text);
//
//    ok(true, "test");
//  });
});
