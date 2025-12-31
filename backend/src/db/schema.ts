export interface UserSchema {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: RoleSchema;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleSchema {
    name: string;
}