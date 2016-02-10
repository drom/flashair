'use strict';

var fs = require('fs-extra'),
    path = require('path'),
    request = require('request');

function download (url, dir, filelist, ret) {

    function copy (e, ret0) {
        var fileURL = url + e.dir + '/' + e.name;
        var filePath = path.resolve(process.cwd(), './' + dir, './' + e.dir, './' + e.name);
        // console.log(fileURL, filePath);
        process.stdout.write(fileURL);
        request(fileURL, { encoding: 'binary' }, function (error, response, body) {
            if (error) {
                throw error;
            }
            process.stdout.write(' -> ');
            if (!error && response.statusCode == 200) {
                fs.outputFile(filePath, body, { encoding: 'binary' }, function (error1) {
                    if (error1) {
                        throw error1;
                    }
                    process.stdout.write(filePath + '\n');
                    ret0();
                });
            }
        });
    }

    var i = 0, ilen = filelist.length;

    function iterate () {
        copy(filelist[i], function () {
            if (i < ilen) {
                i += 1;
                iterate ();
            } else {
                ret();
            }
        });
    }

    iterate();
}

module.exports = download;
