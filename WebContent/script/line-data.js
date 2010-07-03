var tubeLines = {
  district: {
    name: 'District',
    colour: 'rgb(0, 121, 52)',
    stations: {
//        EBY: {name: 'Ealing Broadway'},
//        ECM: {name: 'Ealing Common'},
//        ACT: {name: 'Acton Town'},
//        CHP: {name: 'Chiswick Park'},
//        TGR: {name: 'Turnham Green'},
//        RMD: {name: 'Richmond'},
//        KEW: {name: 'Kew Gardens'},
//        GUN: {name: 'Gunnersbury'},
//        STB: {name: 'Stamford Brook'},
//        RCP: {name: 'Ravenscourt Park'},
//        HMD: {name: 'Hammersmith'},
//        BCT: {name: 'Barron\'s Court'},
//        WKN: {name: 'West Kensington'},
//        ECT: {name: 'Earl\'s Court'},
//        WBT: {name: 'West Brompton'},
//        FBY: {name: 'Fulham Broadway'},
//        PGR: {name: 'Parson\'s Green'},
//        PUT: {name: 'Putney Bridge'},
//        EPY: {name: 'East Putney'},
//        SFS: {name: 'Southfields'},
//        WMP: {name: 'Wimbledon Park'},
//        WDN: {name: 'Wimbledon'},
//        OLY: {name: 'Kensington Olympia'},
//        
        ACT: {name: 'Acton Town'},
        ALE: {name: 'Aldgate East'},
        BKG: {name: 'Barking'},
        BAY: {name: 'Bayswater'},         // Guessed at code, because not in documentation.
        BCT: {name: 'Barons Court'},
        BEC: {name: 'Becontree'},
        BLF: {name: 'Blackfriars'},
        BWR: {name: 'Bow Road'},
        BBB: {name: 'Bromley-by-Bow'},
        CST: {name: 'Cannon Street'},
        CHP: {name: 'Chiswick Park'},
        DGE: {name: 'Dagenham East'},
        DGH: {name: 'Dagenham Heathway'},
        EBY: {name: 'Ealing Broadway'},
        ECM: {name: 'Ealing Common'},
        ECT: {name: 'Earl’s Court'},
        EHM: {name: 'East Ham'},
        EPY: {name: 'East Putney'},
        ERD: {name: 'Edgware Road'},
        EPK: {name: 'Elm Park'},
        EMB: {name: 'Embankment'},
        FBY: {name: 'Fulham Broadway'},
        GRD: {name: 'Gloucester Road'},
        GUN: {name: 'Gunnersbury'},
        HMD: {name: 'Hammersmith'},
        HST: {name: 'High Street Kensington'},
        HCH: {name: 'Hornchurch'},
        OLY: {name: 'Kensington (Olympia)'},
        KEW: {name: 'Kew Gardens'},
        MAN: {name: 'Mansion House'},
        MLE: {name: 'Mile End'},
        MON: {name: 'Monument'},
        NHG: {name: 'Notting Hill Gate'},
        PAD: {name: 'Paddington'},
        PGR: {name: 'Parsons Green'},
        PLW: {name: 'Plaistow'},
        PUT: {name: 'Putney Bridge'},
        RCP: {name: 'Ravenscourt Park'},
        RMD: {name: 'Richmond'},
        SSQ: {name: 'Sloane Square'},
        SKN: {name: 'South Kensington'},
        SFS: {name: 'Southfields'},
        SJP: {name: 'St. James’s Park'},
        STB: {name: 'Stamford Brook'},
        STG: {name: 'Stepney Green'},
        TEM: {name: 'Temple'},
        THL: {name: 'Tower Hill'},
        TGR: {name: 'Turnham Green'},
        UPM: {name: 'Upminster'},
        UPB: {name: 'Upminster Bridge'},
        UPY: {name: 'Upney'},
        UPK: {name: 'Upton Park'},
        VIC: {name: 'Victoria'},
        WBT: {name: 'West Brompton'},
        WHM: {name: 'West Ham'},
        WKN: {name: 'West Kensington'},
        WMS: {name: 'Westminster'},
        WCL: {name: 'Whitechapel'},
        WDN: {name: 'Wimbledon'},
        WMP: {name: 'Wimbledon Park'},
    },

    topologyText:  // The letter groupings below correspond to the station codes.
                   // Valid track join characters:
                   //   ʅ == \
                   //   ʃ == /
                   //   u == \/
                   //   n == /\
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
        'WBT WKN OLY' + '\n' +
        '   ʅ | ʃ   ' + '\n' +
        '    ECT    ' + '\n' +
        '     | ʅ   ' + '\n' +
        '    GRD HST' + '\n' +
        '     |   | ' + '\n' +
        '    SKN NHG' + '\n' +
        '     |   | ' + '\n' +
        '    SSQ BAY' + '\n' +
        '     |   | ' + '\n' +
        '    VIC PAD' + '\n' +
        '     |   | ' + '\n' +
        '    SJP ERD',
  }
};
