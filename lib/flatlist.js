'use strict';

function flatlist (list) {
    if (Array.isArray(list)) {
        return list.reduce(function (pre, e) {
            return pre.concat(flatlist(e));
        }, []);
    } else {
        return [list];
    }
}

module.exports = flatlist;
