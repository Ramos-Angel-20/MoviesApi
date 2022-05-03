import { DataTypes, STRING, UUIDV4 } from 'sequelize';
import { db } from '../db/connection.js';

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        unique: true
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: true,
    },
    username: {
        type: STRING,
        allowNull: false,
    },
    provider: {
        type: STRING,
        allowNull: true,
    }
});

export default User;