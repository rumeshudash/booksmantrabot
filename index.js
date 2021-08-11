var app = require('express')();
var server = require('http').Server(app);
var MessengerPlatform = require('facebook-bot-messenger');
var msgBuilder = require('./Utils/msgBuilder');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var bot = MessengerPlatform.create({
    pageID: process.env.PAGE_ID,
    appID: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    validationToken: process.env.VALIDATE_TOKEN,
    pageToken: process.env.PAGE_TOKEN,
}, server);

const port = process.env.PORT || 80;

app.get('/', function(req, res) {
    res.status(200).send('Welcome to Booksmantra FB Messenger Bot!');
})

msgBuilder.init(bot);
app.use(bot.webhook('/webhook'));
bot.on(MessengerPlatform.Events.MESSAGE, function(userId, message) {
    if( message.isTextMessage() ) {
        let msg = message.getText().toLowerCase();
        console.log('Req:', msg );
        if( msg.indexOf( "code" ) > -1 || msg.indexOf( "fpl" ) > -1 ) {
            bot.sendReadedAction(userId);
            bot.sendTypingAction(userId);

            setTimeout( async () => {
                const reply = await msgBuilder.getFPLCodeMessage( message );
                bot.sendTextMessage(userId, reply);
            }, 500 )
        }
    }
});

// if (process.env.NODE_ENV !== 'production') {
    server.listen(port, () => console.log('Server is listening on port ' + port));
// } else {

//     server.listen(()=> console.log("Started Production"));
// }