export default (sequelize, DataTypes) => {
  const MessageFile = sequelize.define('MessageFile', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'message_id',
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'file_path',
    },
    fileType: {
      type: DataTypes.STRING(50),
      field: 'file_type',
    },
    fileSize: {
      type: DataTypes.BIGINT,
      field: 'file_size',
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'uploaded_at',
    },
  }, {
    tableName: 'messageFiles',
    timestamps: true,
    createdAt: 'uploadedAt',
    updatedAt: false,
    underscored: true,
  });

  return MessageFile;
};
