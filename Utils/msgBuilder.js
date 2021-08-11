let BOT = null;

const init = ( bot ) => {
    BOT = bot;
}

const getUserProfile = ( user_id ) => {
    return BOT.getProfile(user_id).then( data => {
        return Promise.resolve(data);
    } ).catch( () => {
        return Promise.reject();
    });
}

const getFPLCodeMessage = async( message ) => {
    const profile = await getUserProfile( message.getUserId() );

    return `${profile && profile.first_name ? 'Dear ' + profile.first_name + ', ' : ''}FPL Code:  L91s6q

Please join the league. 
Also, don't forget to check Books Mantra page for great offers on books. Share with your friends. 🙂`;
}

module.exports = {
    init,
    getUserProfile,
    getFPLCodeMessage,
}