import { UserData } from "./UserData";
export interface PendingData {
    id: number | null;
    requester: UserData | null;
    requesterId: number;
    status: string
}