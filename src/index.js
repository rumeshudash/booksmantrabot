var app = require('express')();
var server = require('http').Server(app);
var MessengerPlatform = require('facebook-bot-messenger');
var bot = MessengerPlatform.create({
    pageID: '<your page id>',
    appID: '<your app id>',
    appSecret: '<your app secret>',
    validationToken: '<your validation token>',
    pageToken: '<your page token>'
}, server);

app.get('/', function(req, res) {
    res.status(200).send('Welcome to Booksmantra FB Messenger Bot!');
})

app.use(bot.webhook('/webhook'));
bot.on(MessengerPlatform.Events.MESSAGE, function(userId, message) {
    // add code below.
    console.log( userId, message );
});

server.listen(8080, () => console.log('Express server is listening on port 8080'));