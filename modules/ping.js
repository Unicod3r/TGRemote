const text = require('../texts.json')

function exec(debug) {
    return [text.modules.ping.pong, (debug ? 'debug here!' : null)]
}

exports.exec = exec