const { User } = require("../../schemes/users/userSchema");
const path = require('path');
const fs = require('fs').promises;
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

const updateAvatar = async (req, res) => {
    const { _id, email } = req.user;
    const [, extension] = req.file.filename.split(".");
const { file } = req;
    try {
   const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filename = `User-${email}-avatar-${uuidv4()}.${extension}`; // 1591234567890-ava.jpg 

    const filepath = path.join(__dirname, '../../', 'public', 'avatars', filename); // /home/.../public/avatars/1591234567890-ava.jpg
    const tmpPath = file.path; 

    const image = await jimp.read(tmpPath);
    await image.cover(250, 250).quality(80).writeAsync(filepath); 
        
    await fs.unlink(tmpPath); 

  
    const avatarURL = `/avatars/${filename}`;
    user.avatarURL = avatarURL;
    await user.save();

    res.json({ avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error while file uploading' });
  }
}

module.exports = updateAvatar;