export interface UserSchema {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: RoleSchema;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleSchema {
    name: string;
}