module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'Bob',
          lastName: 'User 1',
          email: 'testUser1@test.com',
          password:
            '$2a$10$onYlRIHDNLs4a0mb0ft.8uSl1hjW1ThoZVuyEh3LdBPzGrcGZKEzu',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 2,
        },
        {
          firstName: 'Tim',
          lastName: 'User 2',
          email: 'testUser2@test.com',
          password:
            '$2a$10$onYlRIHDNLs4a0mb0ft.8uSl1hjW1ThoZVuyEh3LdBPzGrcGZKEzu',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 2,
        },
        {
          firstName: 'Tom',
          lastName: 'User 3',
          email: 'testUser3@test.com',
          password:
            '$2a$10$onYlRIHDNLs4a0mb0ft.8uSl1hjW1ThoZVuyEh3LdBPzGrcGZKEzu',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          roleId: 2,
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
