'use strict';

var request = require('request'),
    async = require('async');

function parse (txt) {
    var res;
    res = txt.split('\n');
    res.shift();
    res.pop();
    res = res.map(function (e0) {
        var a0 = e0.split(',').map(function (e1) {
            return e1.trim();
        });
        return {
            dir: a0[0],
            name: a0[1],
            size: a0[2],
            attribute: a0[3],
            data: a0[4],
            time: a0[5]
        }
    });
    return res;
}

function filelist (url, description, callback) {
    function rec (des, ret) {
        var path;
        if ((parseInt(des.attribute, 10) & 16) === 0) {
            ret(null, des);
        } else {
            path = url + '/command.cgi?op=100&DIR=' + des.dir + '/' + des.name;
            request(path, function (error, response, body) {
                var res;
                if (error) {
                    throw error;
                }
                if (!error && response.statusCode == 200) {
                    res = parse(body);
                    async.map(res, rec, function (err, dat) {
                        ret(null, dat);
                    });
                }
            });
        }
    }
    rec(description, callback);
}

module.exports = filelist;
