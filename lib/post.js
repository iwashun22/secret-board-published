'use strict';
const { Sequelize, DataTypes } = require('sequelize');

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

const sequelize = process.env.DATABASE_URL ?
  // 本番環境 - deployment env
  new Sequelize(
    process.env.DATABASE_URL,
    {
      logging: false,
      dialectOptions
    }
  )
  :
  // 開発環境 - development env
  new Sequelize(
    'postgres://postgres:postgres@db/secret_board',
    {
      logging: false
    }
  );

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT
    },
    postedBy: {
      type: DataTypes.STRING
    },
    trackingCookie: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Post.sync();
module.exports = Post;
