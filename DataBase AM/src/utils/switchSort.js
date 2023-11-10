const User = require('../api/models/User.model');

const sortingFunction = async (req, res, requestSort) => {
  const allUsers = await User.find();
  if (allUsers.length > 0) {
    let order = req.body?.order == 'asc' ? 1 : -1;
    console.log(order);
    order === 1
      ? allUsers.sort((a, b) => a[requestSort].length - b[requestSort].length)
      : allUsers.sort((a, b) => b[requestSort].length - a[requestSort].length);
    return res.status(200).json(allUsers);
  } else return res.status(404).json('No users found.');
};

module.exports = sortingFunction;
