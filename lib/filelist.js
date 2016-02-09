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

function filelist (url, des, ret) {
    var res, path;
    console.log(JSON.stringify(des));
    if ((des.attribute && 16) === 0) {
        ret(des);
    } else {
        path = url + '/command.cgi?op=100&DIR=' + des.dir + '/' + des.name;
        request(path, function (error, response, body) {
            if (error) {
                console.log(des);
                throw error;
            }
            // console.log(response);
            if (!error && response.statusCode == 200) {
                res = parse(body);
                res.forEach(function (e, i) {
                    filelist(url, e, function (ee) {
                        res[i] = ee;
                        ret(res);
                    });
                });
            }
        });
    }
}

module.exports = filelist;
