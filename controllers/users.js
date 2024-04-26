const { User } = require('../models/user');

exports.getUsers = async function (req, res) {
    try {

        const users = await User.find().select('name email id isAdmin');
        if (!users) {
            res.status(404).json({ message: 'Users not found' });
        }

        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ type: error.name, message: error.message });
    }
}

exports.getUserById = async function (req, res) {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash -resetPasswordOtp -resetPasswordOtpExpires -cart');

        if (!user) {
            res.status(404).json({ message: 'Users not found' });
        }

        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ type: error.name, message: error.message });
    }
}

exports.updateUser = async function (req, res) {
    try {
        const { name, email, phone } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'Users not found' });
        }
        user.passwordHash = undefined;
        user.cart = undefined;
        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ type: error.name, message: error.message });
    }
}