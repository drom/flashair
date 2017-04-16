#!/usr/bin/env node
'use strict';

var yargs = require('yargs'),
    lib = require('../lib');

var argv = yargs.argv;

if (typeof argv.url === 'string') {
    var from = argv.from || 'DCIM';
    lib.filelist(
        argv.url,
        { dir: '', name: from, attribute: 16 },
        function (err, filelist) {
            var flatlist = lib.flatlist(filelist);
            // console.log(flatlist);
            console.log(lib.filecount(flatlist));
            if (typeof argv.dir === 'string') {
                lib.download(argv.url, argv.dir, flatlist, function (err) {
                    // console.log('downloaded done');
                });
            }
            // console.log(JSON.stringify(filelist, null, 4));
        }
    );
} else {
    console.log(argv);
}
