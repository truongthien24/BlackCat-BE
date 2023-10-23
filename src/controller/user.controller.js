const postCreateUser = (req, res) => {
    console.log('req', req?.body);
    const email = req?.body?.email;
    const userName = req?.body?.userName;
    const password = req?.body?.password;
}

module.exports = {postCreateUser};
