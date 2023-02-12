type OrderDirection = 'asc' | 'desc';

interface PagedRequestOptions {
    page?: number;
    pageSize?: number;
    orderDirection?: OrderDirection;
}

type PagedResponse<T> = {
    results: T;
    resultsOrderedBy: string;
    orderDirection: string;
    pageNumber: number;
    pageSize: number;
    recordsOnThisPage: number;
    totalNumberOfRecords: number;
    numberOfPages: number;
};

type AnyString = string & {};

export type {OrderDirection, PagedRequestOptions, PagedResponse, AnyString};
