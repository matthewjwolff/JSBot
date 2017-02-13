var https = require('https')
var actions = require('actions.js')
// TODO: encapsulate bot information
var bot = require('bot.js')

https.createServer( (req, resp) => {
    var buffer = ''
    req.on('data', (chunk) {
        buffer+=chunk
    })

    req.on('end', () => {
//        resp.writeHead(200, headers)
        var data = JSON.parse(buffer)
        if(data.text.split()[0].charAt(0) == bot.triggerChar) {
            var botMsg = null
            try {
                botMsg = actions[data.text.split()[0].substring(1)].apply(null, data.text.split())
            } catch(e) {
                botMsg = "I didn't quite understand that."
            }
            if(botMsg != null && botMsg.length != 0) {
                resp.end(botMsg)
            }
    }
}.listen(8000)
