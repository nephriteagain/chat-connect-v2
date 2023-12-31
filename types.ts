import { Dispatch, SetStateAction } from "react";

export type roomBanner = {
    id: string;
    name: string;
    type: 'channel'|'group'|'private'
    lastMessage?: message
    at: string;
    profile?:string;
}

export type room = {
    at: string;
    id: string;
    name: string;
    desc: string;
    type: 'channel'|'group'|'private';
    members: member[]
    createdAt: number;
    makerId: string;
    profile?: string;
}

export type message = {
    id: string;
    date: number;
    sender: string;
    message: string;
    flags?: flags;
}

export type flags = {
    edited?: boolean;
    deleted?: boolean;
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
    channels: string[];
    bio?: string;
    profile?: string;
}

export type editMode = {
    editMode: boolean;
    message: null|message
}

export type ReactDispatch<T> = Dispatch<SetStateAction<T>>