const text = require('../texts.json')

function exec(debug) {
    return [text.modules.ping.pong, (debug ? 'Ping worked succesfully.' : null)]
}

exports.exec = exec