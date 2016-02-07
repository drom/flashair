#!/usr/bin/env node
'use strict';

var yargs = require('yargs'),
    request = require('request');

var argv = yargs.argv;

if (argv.url) {
    request(argv.url, function (error, response, body) {
        if (error) {
            throw error;
        }
        console.log(response);
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
} else {
    console.log(argv);
}
