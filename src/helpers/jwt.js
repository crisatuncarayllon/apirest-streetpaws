'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'sebitas';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name : user.name,
        email: user.email,
    
        iat :moment().unix(),
        exp: moment().add(7,'days').unix() 
    }

    return jwt.encode(payload,secret);
}