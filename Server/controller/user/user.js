const User = require('../../module/auth/user');


exports.loadUserDaten = async (req, res, next) => {
    try {
        const userId = req.userId;

        const user = await User.findByPk(userId);

        const _id = user.getDataValue('_id');
        const email = user.getDataValue('email');
        const username = user.getDataValue('username');

        const quize = await user.getQuizzes();
        const scoures = await user.getScoures();

        res.status(200).json({ message: "user information", daten: { id: _id, email: email, username: username, quize: quize, scoures: scoures } });

    } catch (err) {
        next(err)
    }
}

// TODO: 3. update password
