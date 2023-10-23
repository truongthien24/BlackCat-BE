const Users = require('../models/Users');

const getAllUser = async (req, res) => {
    try {
        const users = await Users.find({}).sort({createdAt: -1});
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postCreateUser = async (req, res) => {
    const {email, userName, password} = req?.body;
    try {
        const users = await Users.create({email, userName, password});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {postCreateUser, getAllUser};
