export default (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
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
        type: {
            type: DataTypes.ENUM('direct', 'group'),
            allowNull: false,
            defaultValue: 'direct',
        },
        name: {
            type: DataTypes.STRING(255),
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
        },
        // ✅ Add the virtual field here
        // memberCount: {
        //     type: DataTypes.VIRTUAL,
        //     get() {
        //         return this.getDataValue("memberCount") || 0;
        //     },
        // },
    }, {
        tableName: 'conversations',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false,
        underscored: true,
    });

    Conversation.associate = (models) => {
        Conversation.hasMany(models.ConversationMember, {
            foreignKey: { name: "conversationId", field: "conversation_id" },
            as: "members", // 👈 alias matches your query
        });

        Conversation.hasMany(models.ConversationMember, {
            foreignKey: { name: "conversationId", field: "conversation_id" },
            as: "membershipCheck", // 👈 alias matches your query
        });

        Conversation.hasMany(models.Message, {
            as: "messages",
            foreignKey: { name: "conversationId", field: "conversation_id" }
        });
    };


    return Conversation;
};
