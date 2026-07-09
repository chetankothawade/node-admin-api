'use strict';
export default (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      name: { type: DataTypes.STRING(150), allowNull: false },
      description: { type: DataTypes.TEXT },
      createdBy: { type: DataTypes.INTEGER, allowNull: false, field: 'created_by' },
      status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
    },
    {
      tableName: 'boards',
      timestamps: true,
      underscored: true,
    }
  );

  // Board.associate = (models) => {
  //   Board.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
  //   Board.hasMany(models.List, { foreignKey: 'boardId', as: 'lists', onDelete: 'CASCADE' });
  //   Board.hasMany(models.ActivityLog, { foreignKey: 'boardId', as: 'activityLogs', onDelete: 'CASCADE' });
  // };

  Board.associate = (models) => {
    Board.belongsTo(models.User, {
      foreignKey: { name: 'createdBy', field: 'created_by' },
      as: 'creator',
    });

    Board.hasMany(models.List, {
      foreignKey: { name: 'boardId', field: 'board_id', onDelete: 'CASCADE' },
      as: 'lists',
    });

    Board.hasMany(models.ActivityLog, {
      foreignKey: { name: 'boardId', field: 'board_id', onDelete: 'CASCADE' },
      as: 'activityLogs',
    });
  };

  return Board;
};
