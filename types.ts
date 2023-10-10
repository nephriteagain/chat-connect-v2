export type room = {
    type: 'channel'|'group'|'private'
    id: string;
    name: string;
    makerId: string;
    lastMessage: {
        id:number;
        date: number;
        sender: string;        
        message: string;
    }
}