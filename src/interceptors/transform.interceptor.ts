import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const calcListTotalCount = (
    totalCount: number = 0,
    limit: number = 0,
): { totalResult: number; totalPage: number } => {
    const totalResult = totalCount;
    const totalPage = totalResult % limit === 0 ? totalResult / limit : Math.floor(totalResult / limit) + 1;
    return { totalResult, totalPage };
};

type ListType = {
    value: any[];
    count: number;
};

type ListOutputValue = {
    totalPage: number;
    totalResult: number;
    list: any[];
};

export interface Response<T> {
    result: boolean;

    value: T extends ListType ? ListOutputValue : T;
}

const NON_PAGINATION = 'NON_PAGENATION';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const query = request.query;
        const statusCode = response.statusCode;
        console.log(statusCode);

        return next.handle().pipe(
            map((value) => {
                if (value instanceof Object && 'count' in value && 'list' in value) {
                    const { list, count, ...restData } = value;

                    const limit = query.limit || NON_PAGINATION;
                    const page = query.page;
                    const search = query.search;

                    return {
                        result: true,
                        value: {
                            ...restData,
                            list,
                            ...(limit === NON_PAGINATION
                                ? { totalResult: count, totalPage: 1 }
                                : calcListTotalCount(count, Number(limit))),
                            ...(search ? { search } : { search: null }),
                            ...(page && { page }),
                        } as ListOutputValue,
                    };
                } else {
                    return { result: true, value };
                }
            }),
        );
    }
}
