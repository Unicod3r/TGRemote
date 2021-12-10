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
        bot.hears(modulesJ.modules[i][j].alias, (ctx) => {
            if (config.bot.trustedIds.length > 0) {
                if (!(config.bot.trustedIds.includes(ctx.message.chat.id))) {
                    ctx.reply('You are not in whitelist.')
                    if (config.main.debug) { console.log(`${text.other.separator30}\nUnauthorized user with ID ${ctx.message.chat.id} tried to use the bot.\n${text.other.separator30}`) }
                    return
                }
            }
            //ctx.reply(modulesR[modulesJ.modules[i][j].name].exec(config.main.debug)[0])
            var reply = modulesR[modulesJ.modules[i][j].name].exec(config.main.debug)[0]
            var debug = modulesR[modulesJ.modules[i][j].name].exec(config.main.debug)[1]
            ctx.reply(reply + (config.main.debug ? '\n\n' + debug : ''))
            if (config.main.debug) { console.log(`${text.other.separator30}\nModule ${modulesJ.modules[i][j].name} replied to user: ${ctx.message.chat.id}\n\nDebug: ${debug}\n${text.other.separator30}`) }
        })
        if (config.main.debug) { console.log(text.debug.moduleInit + modulesJ.modules[i][j].name) }
    }   
}

//modulesR['ping'].exec()
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))