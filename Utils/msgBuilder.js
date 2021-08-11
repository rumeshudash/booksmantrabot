let BOT = null;

const init = ( bot ) => {
    BOT = bot;
}

const getUserProfile = ( user_id ) => {
    return BOT.getProfile(user_id).then( data => {
        return Promise.resolve(data);
    } ).catch( () => {
        return Promise.resolve();
    });
}

const getFPLCodeMessage = async( message ) => {
    let profile = null;
    try {
        profile = await getUserProfile( message.getUserId() );
    } catch (e) {
        console.log( e );
    }

    return `${profile && profile.first_name ? 'Dear ' + profile.first_name + ', ' : ''}FPL Code:  L91s6q

Please join the league. 
Also, don't forget to check Books Mantra page for great offers on books. Share with your friends. 🙂`;
}

module.exports = {
    init,
    getUserProfile,
    getFPLCodeMessage,
}