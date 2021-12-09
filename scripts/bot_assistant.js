const text = require('../texts.json')
const config = require('../config.json')
const fs = require('fs')
const prompt = require('prompt-sync')({sigint: true});

answer = prompt(text.bot_chelper.isCreated)

function promptToken(text) {
    return prompt(text)
}

function writeToken(token, isConfigured=true) {
    config.bot.token = token
    config.bot.isConfigured = isConfigured
    fs.writeFileSync('./config.json', JSON.stringify(config, null, '\t'));
}

if (answer === 'n') {
    console.log(text.bot_chelper.creationInstruction)
    writeToken(promptToken(text.bot_chelper.tokenPrompt))
}
else if (answer === 'y') {
    writeToken(promptToken(text.bot_chelper.tokenPrompt))
}
else if (answer === 'r') {
    writeToken(null, false)
    console.log(text.bot_chelper.settingsReset)
}
else {
    console.log(text.bot_chelper.incorrectAnswer)
}

prompt('Press enter to exit program...')
process.exit(0);