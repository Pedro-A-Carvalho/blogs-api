'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('posts_categories', { 
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'post_id',
        references: {
          model: 'blog_posts',
          key: 'id',
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('posts_categories');
  }
};
