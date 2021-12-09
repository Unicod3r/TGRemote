// your imports, do not import 'bot_assistant.js' or 'index.js'
const text = require('../texts.json')

// always named 'exec' and has 'debug' arg
function exec(debug) {
    // always should return reply and debug info if 'debug' is true,
    // or return reply, and debug info as empty string if 'debug' is false
    return [text.modules.ping.pong, (debug ? 'debug here!' : '')]
}

// do not forget to export your function
exports.exec = exec