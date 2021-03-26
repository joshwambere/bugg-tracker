'use strict';
import bcrypt from 'bcrypt';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
   await queryInterface.bulkInsert('users', [{
    names: 'johnson',
    email: 'josh@gmail.com',
    password:bcrypt.hashSync('okayfine', bcrypt.genSaltSync(10), null),
    user_type:"admin",
    createdAt: new Date(),
    updatedAt: new Date()
 }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
