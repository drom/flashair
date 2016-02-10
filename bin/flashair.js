#!/usr/bin/env node
'use strict';

var yargs = require('yargs'),
    request = require('request'),
    lib = require('../lib');

var argv = yargs.argv;
var path;

if (typeof argv.url === 'string') {
    lib.filelist(
        argv.url,
        { dir: '', name: 'DCIM', attribute: 16 },
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
