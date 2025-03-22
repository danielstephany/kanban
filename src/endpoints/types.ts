
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
    searchBy: string,
    searchValue: string
}

export type ApiRequestParams = {
    pagination?: Pagination;
    filter?: filter
}

export type ApiRequest = {
    id?: string
} & ApiRequestParams;


export interface ApiResponse<T> {
    data?: T;
    pagination?: Pagination;
    message?: string;
};
