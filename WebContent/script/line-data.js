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
        }
    },
    stationsX: [
               { code: 'EBY',
                 name: 'Ealing Broadway',
                 tick: TICKSTYLE.BOTH
               },
               { code: 'ECM',
                 name: 'Ealing Common',
                 tick: TICKSTYLE.RIGHT
               },
               { code: 'ACT',
                 name: 'Acton Town',
                 tick: TICKSTYLE.RIGHT
               },
               { code: 'CHP',
                 name: 'Chiswick Park',
                 tick: TICKSTYLE.RIGHT
               },
               { code: 'TGR',
                 name: 'Turnham Green',
                 tick: TICKSTYLE.RIGHT
               },
               { code: 'RMD',
                 name: 'Richmond',
                 tick: TICKSTYLE.BOTH
               },
               { code: 'KEW',
                 name: 'Kew Gardens',
                 tick: TICKSTYLE.RIGHT
               },
               { code: 'GUN',
                 name: 'Gunnersbury',
                 tick: TICKSTYLE.RIGHT
               },
    ],
    topologyText: // The letters below correspond to the station codes.
              "    EBY" +
              "     | " +
              "RMD ECM" +
              " |   | " +
              "KEW ACT" +
              " |   | " +
              "GUN CHP" +
              "  \  | " +
              "    \| " +
              "    TGR"
  }
};
