'use strict';
export default (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    'Attachment',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      taskId: { type: DataTypes.INTEGER, allowNull: false, field: 'task_id' },
      fileName: { type: DataTypes.STRING(255), field: 'file_name' },
      filePath: { type: DataTypes.STRING(255), field: 'file_path' },
      uploadedBy: { type: DataTypes.INTEGER, allowNull: false, field: 'uploaded_by' },
    },
    {
      tableName: 'attachments',
      createdAt: 'uploadedAt',
      updatedAt: false,
      underscored: true,
    }
  );

  // Attachment.associate = (models) => {
  //   Attachment.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task', onDelete: 'CASCADE' });
  //   Attachment.belongsTo(models.User, { foreignKey: 'uploadedBy', as: 'uploader' });
  // };


  Attachment.associate = (models) => {
    Attachment.belongsTo(models.Task, {
      foreignKey: { name: 'taskId', field: 'task_id', onDelete: 'CASCADE' },
      as: 'task',
    });

    Attachment.belongsTo(models.User, {
      foreignKey: { name: 'uploadedBy', field: 'uploaded_by' },
      as: 'uploader',
    });
  };

  return Attachment;
};
