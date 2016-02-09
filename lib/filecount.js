'use strict';

function filecount (list) {
    if (Array.isArray(list)) {
        return list.reduce(function (res, e) {
            var tmp = filecount(e);
            res.files += tmp.files;
            res.size += parseInt(tmp.size, 10);
            return res;
        }, { files: 0, size: 0 });
    } else {
        return { files: 1, size: list.size };
    }
}

module.exports = filecount;
