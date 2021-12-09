const config = require('./config')
const text = require('./texts')
const modulesJ = require('./modules.json')
if (!config.bot.isConfigured) { const bassistant = require('./scripts/bot_assistant')}
const modulesR = []
const Telegraf = require('telegraf-sync')

var modules = []

const bot = new Telegraf(config.bot.token)

for (var i in modulesJ.modules) {
    for (var j in modulesJ.modules[i]) {
        modules[modulesJ.modules[i][j].name] = modulesJ.modules[i][j]
        modulesR[modulesJ.modules[i][j].name] = require(modulesJ.modules[i][j].path)
        bot.hears(modulesJ.modules[i][j].alias, (ctx) => ctx.reply(modulesR[modulesJ.modules[i][j].name].exec()))
    }
}

//modulesR['ping'].exec()
bot.command(modulesJ.modules[i][j].alias, Telegraf.reply(modulesR[modulesJ.modules[i][j].name].exec()))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))