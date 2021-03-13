'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserTypes',
          key: 'id',
        },
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ATIVO', 'INATIVO'],
        allowNull: false,
        defaultValue: 'ATIVO'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password_salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'
      },
      deleted: Sequelize.BOOLEAN
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};