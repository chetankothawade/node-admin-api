export default (sequelize, DataTypes) => {
  const MessageStatus = sequelize.define('MessageStatus', {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    status: {
      type: DataTypes.ENUM('sent', 'delivered', 'read'),
      defaultValue: 'sent',
    },
  }, {
    tableName: 'messageStatus',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updatedAt',
    underscored: true,
  });
  
  MessageStatus.associate = (models) => {
    MessageStatus.belongsTo(models.Message, { foreignKey: { name: "messageId", field: "message_id" } });
    MessageStatus.belongsTo(models.User, { foreignKey: { name: "userId", field: "user_id" } });
  };
  return MessageStatus;
};
