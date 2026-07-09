export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
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
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'conversation_id',
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sender_id',
    },
    replyToMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'reply_to_message_id',
    },
    message: {
      type: DataTypes.TEXT,
    },
    messageType: {
      type: DataTypes.ENUM('text', 'file'),
      defaultValue: 'text',
      field: 'message_type',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'messages',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: true,
  });

  Message.associate = (models) => {
    // Message belongs to a sender (User)
    Message.belongsTo(models.User, {
      foreignKey: { name: "senderId", field: "sender_id" },
      as: "sender", // this alias must match your include
    });

    // Message has many files
    Message.hasMany(models.MessageFile, {
      foreignKey: { name: "messageId", field: "message_id" },
      as: "files",
    });

    // Optional: Message has many statuses
    Message.hasMany(models.MessageStatus, {
      foreignKey: { name: "messageId", field: "message_id" },
      as: "messageStatus",
    });

    // Message belongs to a Conversation
    Message.belongsTo(models.Conversation, {
      foreignKey: { name: "conversationId", field: "conversation_id" }
    });

    // ✅ Self association for reply
    Message.belongsTo(models.Message, {
      foreignKey: { name: "replyToMessageId", field: "reply_to_message_id" },
      as: "replyToMessage", // The message being replied to

    });

    Message.hasMany(models.Message, {
      foreignKey: { name: "replyToMessageId", field: "reply_to_message_id" },
      as: "repliesToMe", // Messages that reply to this one
      inverse: { as: "replyToMessage" }
    });

  };

  return Message;
};
