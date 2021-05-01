'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bug_title: {
        type: Sequelize.STRING
      },
      bug_desc: {
        type: Sequelize.STRING
      },
      bug_priority: {
        type: Sequelize.STRING
      },
      bug_status: {
        type: Sequelize.STRING
      },
      added_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bugs');
  }
};