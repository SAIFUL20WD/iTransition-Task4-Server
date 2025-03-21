import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import { TUser } from "./user.interface";
import sequelize from "../../config/database";
import config from "../../config";

const User = sequelize.define<Model<TUser>>(
    "User",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            defaultValue: "N/A",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastSeen: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        status: {
            type: DataTypes.ENUM("blocked", "ok"),
            defaultValue: "ok",
        },
    },
    {
        indexes: [{ unique: true, fields: ["email"] }],
        tableName: "users",
    },
);

User.beforeCreate(async (user) => {
    // @ts-expect-error user has password field
    const hashedPassword = await bcrypt.hash(user?.password, Number(config.saltRound));
    // @ts-expect-error user has password field
    user?.password = hashedPassword;
});

export default User;
