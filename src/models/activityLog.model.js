'use strict';
export default (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define(
    'ActivityLog',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      boardId: { type: DataTypes.INTEGER, field: 'board_id' },
      listId: { type: DataTypes.INTEGER, field: 'list_id' },
      taskId: { type: DataTypes.INTEGER, field: 'task_id' },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
      action: { type: DataTypes.STRING(255), allowNull: false },
    },
    {
      tableName: 'activityLogs',
      createdAt: true,
      updatedAt: false,
      underscored: true,
    }
  );

  // ActivityLog.associate = (models) => {
  //   ActivityLog.belongsTo(models.Board, { foreignKey: 'boardId', as: 'board', onDelete: 'CASCADE' });
  //   ActivityLog.belongsTo(models.List, { foreignKey: 'listId', as: 'list', onDelete: 'CASCADE' });
  //   ActivityLog.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task', onDelete: 'CASCADE' });
  //   ActivityLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
  // };

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.Board, {
      foreignKey: { name: 'boardId', field: 'board_id', onDelete: 'CASCADE' },
      as: 'board',
    });
    ActivityLog.belongsTo(models.List, {
      foreignKey: { name: 'listId', field: 'list_id', onDelete: 'CASCADE' },
      as: 'list',
    });
    ActivityLog.belongsTo(models.Task, {
      foreignKey: { name: 'taskId', field: 'task_id', onDelete: 'CASCADE' },
      as: 'task',
    });
    ActivityLog.belongsTo(models.User, {
      foreignKey: { name: 'userId', field: 'user_id', onDelete: 'CASCADE' },
      as: 'user',
    });
  };
  return ActivityLog;
};
