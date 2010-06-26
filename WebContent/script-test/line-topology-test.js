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
  module('LineTopology');
  
  var NL = '\n';
  
  test('mismatched line length', function() {
    var text = 
      '    EBY' + NL +
      'RMD ECM ';
    
    try {
      new LineTopology(text);
      ok(false, 'Expected exception');
    } catch (exception) {
      ok(exception.indexOf('length') != -1, 'expect exception - line length');
    }
  });
  
  test('number of lines', function() {
    var topology = new LineTopology('   ');
    ok(topology, '1 line');

    try {
      new LineTopology('   ' + NL + '   ');
      ok(false, 'Expected exception');
    } catch (exception) {
      ok(exception.indexOf('number of lines') != -1, '2 lines');
    }

    topology = new LineTopology('   ' + NL + '   ' + NL + '   ');
    ok(topology, '3 lines');
  });
  
  test('even lines have station codes', function() {
    goodLine('EBY', 'one station');
    goodLine('EBY CHP', 'two stations');
    goodLine('    CHP', 'absent station');

    badLine('EBY-CHP', 'invalid character between codes');
    badLine('A?C', 'invalid character in code');
    badLine('EBY CHP ', 'trailing space');

    function goodLine(line, description) {
      new LineTopology(line);
      ok(true, description);
    }

    function badLine(line, description) {
      try {
        new LineTopology(line);
        ok(false, description);
      } catch (exception) {
        ok(exception.indexOf('station names line') != -1, 'expect exception - ' + description);
      }
    }
  });
  
  test('odd lines have track joining symbols', function() {
    var stationLine = 'EBY CHP';
    
    goodLine(' |  \\|/', 'all valid characters');
    goodLine('     | ', 'absent info');

    badLine(' ?     ', 'invalid character');

    function goodLine(line, description) {
      new LineTopology(stationLine + NL + line + NL + stationLine);
      ok(true, description);
    }

    function badLine(line, description) {
      try {
        new LineTopology(stationLine + NL + line + NL + stationLine);
        ok(false, description);
      } catch (exception) {
        ok(exception.indexOf('track') != -1, 'expect exception - ' + description);
      }
    }
  });
  
  test('grid size - 1 x 1', function() {
    var topology = new LineTopology('EBY');
    same(topology.gridWidth(), 1, 'width');
    same(topology.gridHeight(), 1, 'height');
  });
  
  test('grid size - 2 x 2', function() {
    var topology = new LineTopology('EBY TGR' + NL + ' |   | ' + NL + 'RMD ECM');
    same(topology.gridWidth(), 2, 'width');
    same(topology.gridHeight(), 2, 'height');
  });
});
