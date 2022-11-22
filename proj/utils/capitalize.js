const User = require("../models/User.model");

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = {
  capitalize,
}
