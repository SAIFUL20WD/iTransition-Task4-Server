export type TUser = {
    id?: number;
    name: string;
    company: string;
    email: string;
    password: string;
    lastSeen: Date;
    status: "blocked" | "ok";
};
