'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserTypes', [{
      name: 'root',
      description: 'Usuário com permissões totais'
    }, {
      name: 'admin',
      description: 'Usuário com permissão de leitura e gravação'
    }, {
      name: 'geral',
      description: 'Usuário com permissão apenas de leitura'
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserTypes', null, {});
  }
};