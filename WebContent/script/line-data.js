var tubeLines = {
  district: {
    name: 'District',
    colour: 'rgb(0, 121, 52)',
    stations: {
        EBY: {
          name: 'Ealing Broadway',
          tick: TICKSTYLE.BOTH
        },
        ECM: {
          name: 'Ealing Common',
          tick: TICKSTYLE.RIGHT
        },
        ACT: {
          name: 'Acton Town',
          tick: TICKSTYLE.RIGHT
        },
        CHP: {
          name: 'Chiswick Park',
          tick: TICKSTYLE.RIGHT
        },
        TGR: {
          name: 'Turnham Green',
          tick: TICKSTYLE.RIGHT
        },
        RMD: {
          name: 'Richmond',
          tick: TICKSTYLE.RIGHT
        },
        KEW: {
          name: 'Kew Gardens',
          tick: TICKSTYLE.RIGHT
        },
        GUN: {
          name: 'Gunnersbury',
          tick: TICKSTYLE.RIGHT
        },
        STB: {
          name: 'Stamford Brook',
          tick: TICKSTYLE.RIGHT
        },
        RCP: {
          name: 'Ravenscourt Park',
          tick: TICKSTYLE.RIGHT
        },
        HMD: {
          name: 'Hammersmith',
          tick: TICKSTYLE.RIGHT
        },
        BCT: {
          name: 'Barron\'s Court',
          tick: TICKSTYLE.RIGHT
        },
        WKN: {
          name: 'West Kensington',
          tick: TICKSTYLE.RIGHT
        },
        ECT: {
          name: 'Earl\'s Court',
          tick: TICKSTYLE.RIGHT
        },
        WBT: {
          name: 'West Brompton',
          tick: TICKSTYLE.RIGHT
        },
        FBY: {
          name: 'Fulham Broadway',
          tick: TICKSTYLE.RIGHT
        },
        PGR: {
          name: 'Parson\'s Green',
          tick: TICKSTYLE.RIGHT
        },
        PUT: {
          name: 'Putney Bridge',
          tick: TICKSTYLE.RIGHT
        },
        EPY: {
          name: 'East Putney',
          tick: TICKSTYLE.RIGHT
        },
        SFS: {
          name: 'Southfields',
          tick: TICKSTYLE.RIGHT
        },
        WMP: {
          name: 'Wimbledon Park',
          tick: TICKSTYLE.RIGHT
        },
        WDN: {
          name: 'Wimbledon',
          tick: TICKSTYLE.RIGHT
        }
    },

//    topologyText: // The letters below correspond to the station codes.
//      '    EBY'   + '\n' +
//      '     | '   + '\n' +
//      'RMD ECM'   + '\n' +
//      ' |   | '   + '\n' +
//      'KEW ACT'   + '\n' +
//      ' |   | '   + '\n' +
//      'GUN CHP'   + '\n' +
//      '  \\ \\| ' + '\n' +
//      '    TGR'   + '\n' +
//      '     | '   + '\n' +
//      '    STB'   + '\n' +
//      '     | '   + '\n' +
//      '    RCP'   + '\n' +
//      '     | '   + '\n' +
//      '    HMD',

    topologyText:  // The letter groupings below correspond to the station codes.
                   // Valid track join characters:
                   //   ʅ
                   //   ʃ
                   //   u
                   //   n
        '        EBY' + '\n' +
        '         | ' + '\n' +
        '    RMD ECM' + '\n' +
        '     |   | ' + '\n' +
        'WDN KEW ACT' + '\n' +
        ' |   |   | ' + '\n' +
        'WMP GUN CHP' + '\n' +
        ' |   | ʃ   ' + '\n' +
        'SFS TGR    ' + '\n' +
        ' |   |     ' + '\n' +
        'EPY STB    ' + '\n' +
        ' |   |     ' + '\n' +
        'PUT RCP    ' + '\n' +
        ' |   |     ' + '\n' +
        'PGR HMD    ' + '\n' +
        ' |   |     ' + '\n' +
        'FBY BCT    ' + '\n' +
        ' |   |     ' + '\n' +
        'WBT WKN    ' + '\n' +
        '   ʅ |     ' + '\n' +
        '    ECT    '
  }
};
