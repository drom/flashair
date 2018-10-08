'use strict';

var fs = require('fs-extra'),
    path = require('path'),
    request = require('request');

function download (url, dir, filelist, ret) {

    function copy (e, ret0) {
        var fileURL = url + e.dir + '/' + e.name;
        var justPath = path.resolve(process.cwd(), './' + dir, './' + e.dir);
        var filePath = path.resolve(justPath, './' + e.name);

        function finish (error1) {
            if (error1) {
                throw error1;
            }
            process.stdout.write(filePath + '\n');
            ret0();
        }

        fs.ensureDir(justPath);

        process.stdout.write(fileURL);
        fs.stat(
            filePath,
            function (err, stats) {
                if (!err && (stats.size == e.size)) {
                    process.stdout.write(' == \n');
                    ret0();
                } else {
                    process.stdout.write(' -> ');
                    request(fileURL)
                        .on('error', function (error) {
                            throw error;
                        })
                        .on('response', function (response) {
                            if (response.statusCode !== 200) {
                                throw new Err(response.statusCode);
                            }
                        })
                        .on('end', finish)
                        .pipe(fs.createWriteStream(filePath, {encoding: 'binary'}));
                }
            }
        );
    }

    var i = filelist.length - 1;

    function iterate () {
        copy(filelist[i], function () {
            if (i > 0) {
                i -= 1;
                iterate ();
            } else {
                ret();
            }
        });
    }

    iterate();
}

module.exports = download;
