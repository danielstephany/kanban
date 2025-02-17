
export type SortOrder = 'asc' | 'desc';

export type Pagination = {
    total?: number;
    page: number;
    limit?: number;
    sort?: string;
    order?: SortOrder;
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
