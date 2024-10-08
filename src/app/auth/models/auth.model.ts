

export interface RequestAuthUser{
    name: string;
    password: string;
}

export interface ResponseAuthUser{
    status: 'success' | 'error';
    token: string;
}