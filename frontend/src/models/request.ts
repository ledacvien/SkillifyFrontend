// src/models/request.ts

export interface Request {
    id: number;
    createdBy: string | null;
    acceptedBy: string | null;
    title: string;
    description: string;
    requestType: string;
    status: string;
}