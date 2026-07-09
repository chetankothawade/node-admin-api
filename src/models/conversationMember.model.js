export default (sequelize, DataTypes) => {
    const ConversationMember = sequelize.define('ConversationMember', {
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        joinedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'joined_at',
        },
    }, {
        tableName: 'conversationMembers',
        timestamps: true,
        createdAt: 'joinedAt',
        updatedAt: false,
        underscored: true,
    });


    ConversationMember.associate = (models) => {
        ConversationMember.belongsTo(models.User, {
            foreignKey: { name: "userId", field: "user_id" },
            as: "user"
        });
        ConversationMember.belongsTo(models.Conversation, {
            foreignKey: { name: "conversationId", field: "conversation_id" },
            as: "conversation"
        });
    };

    return ConversationMember;
};
