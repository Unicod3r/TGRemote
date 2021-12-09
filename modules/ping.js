const text = require('../texts.json')

function exec() {
    return text.modules.ping.pong
}

exports.exec = exec