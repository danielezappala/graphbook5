'use strict';



module.exports = (sequelize, DataTypes) => {

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase()
  }

  var User = sequelize.define('User', {
    avatar: DataTypes.STRING,
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    abbreviation: {
      type: DataTypes.VIRTUAL,
      get() {
         return `${capitalize(this.firstName)}${capitalize(this.lastName)}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
      
    }
  }, {});
  User.associate = function(models) {
    //User.hasMany(models.Post);
    //User.belongsToMany(models.Chat, { through: 'users_chats' });
  };
  return User;
};

