'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('courses', [{

      code:'INSY 321',
      name:'Information management',
      credit: '3',
      price: 2100.80,
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {

      code:'SENG',
      name:'Testing TQS',
      credit: '3',
      price: 2500.60,
      createdAt: new Date(),
      updatedAt: new Date()

    }
  
  ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('courses', null, {});
   
  }
};