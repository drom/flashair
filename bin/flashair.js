#!/usr/bin/env node
'use strict';

var yargs = require('yargs'),
    request = require('request'),
    lib = require('../lib');

var argv = yargs.argv;
var path;

if (argv.url) {
    lib.filelist(
        argv.url,
        { dir: '', name: 'DCIM', attribute: 16 },
        function (err, filelist) {
            // console.log(filelist.length);
            // console.log(JSON.stringify(filelist, null, 4));
            console.log(lib.filecount(filelist));
        }
    );
} else {
    console.log(argv);
}
