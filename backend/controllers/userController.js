const getMe = async (req, res) => {
   try{
    const user = req.user; // Assuming user is set by the auth middleware

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    });

   }catch(error){
       console.error('Error fetching user:', error);
       res.status(500).json({ message: 'Server error' });
   }
}

module.exports = {
    getMe,
};