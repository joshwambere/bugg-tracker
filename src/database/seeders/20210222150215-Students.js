'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
     await queryInterface.bulkInsert('Students', [{
        StudentId:'21125',
        names:'Johnson Dusabe',
        gender:'Male',
        dob:'18-03-1999',
        registration:'["{\"name\":\"Bible doctrine\",\"code\":\"REL 201\",\"credit\":\"2\",\"price\":\"25000\"}","{\"name\":\"Linux Adminstration\",\"code\":\"COSC 231\",\"credit\":\"3\",\"price\":\"45000\"}","{\"name\":\"Software Quality Assurance\",\"code\":\"COSC 231\",\"credit\":\"4\",\"price\":\"65000\"}"]',
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
