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
        {
            dir: '',
            name: 'DCIM',
            size: 0,
            attribute: 16,
            data: 0,
            time: 0
        },
        function (filelist) {
            console.log(filelist)
        }
    );
} else {
    console.log(argv);
}
