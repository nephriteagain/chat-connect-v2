export type roomBanner = {
    id: string;
    name: string;
    type: 'channel'|'group'|'private'
    lastMessage?: message
}

export type room = {
    id: string;
    name: string;
    desc: string;
    type: 'channel'|'group'|'private';
    members: member[]
    messages: message[]
}

export type message = {
    id: string;
    date: number;
    sender: string;
    message: string;
}

export type member = {
    id: string;
    role: 'admin'|'user'|'mod'
}

export type userData = {
    userName: string;
    name: string;
    email: string;
    createdAt: number;
    id: string;
}