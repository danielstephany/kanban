
export type SortDirection = 'asc' | 'desc';

export type Pagination = {
    total?: number;
    page: number;
    limit?: number;
    sortBy?: string;
    direction?: SortDirection;
}

export type BaseResponse = {
    message?: string;
};

export type filter = {
    field: string,
    value: string
}

export type ApiRequest = {
    id?: string
    pagination?: Pagination;
    filter?: filter
};

export interface ApiResponse<T> {
    data?: T;
    pagination?: Pagination;
    message?: string;
};
