import {PagedRequestOptions} from './models/generic.js';

const getQueryParams = (input: {[key: string]: string | number | boolean | undefined}): URLSearchParams => {
    const params = new URLSearchParams();

    Object.entries(input).forEach(([key, value]) => {
        if (value) {
            params.append(key, String(value));
        }
    });

    return params;
};

const getPagedRequestQueryParams = <T extends PagedRequestOptions>(options?: T): URLSearchParams => {
    const {page = 1, pageSize = 1000, orderDirection = 'asc', ...rest} = options ?? {};
    const otherParams = rest as unknown as Record<string, string | number | boolean>;
    const params = new URLSearchParams({page: String(page), pageSize: String(pageSize), orderDirection});

    Object.entries(otherParams).forEach(([key, value]) => {
        if (value) {
            params.append(key, String(value));
        }
    });

    return params;
};

type JSONValue = string | number | boolean | {[x: string]: JSONValue} | Array<JSONValue>;

const pascalToCamelCase = (str: string) => {
    str = str.replaceAll('ID', 'Id');
    str = str.replaceAll('URL', 'Url');
    str = str.replaceAll('IP', 'Ip');

    if (/^[A-Z].*$/g.test(str)) {
        return `${str[0].toLowerCase()}${str.substring(1)}`;
    }

    return str;
};

const camelToPascalCase = (str: string) => {
    str = str.replaceAll('Id', 'ID');
    str = str.replaceAll('Url', 'URL');
    str = str.replaceAll('Ip', 'IP');

    if (/^[a-z].*$/g.test(str)) {
        return `${str[0].toUpperCase()}${str.substring(1)}`;
    }

    return str;
};

function transformObjectKeys(transformer: (input: string) => string) {
    return function recursivleyTransform<T>(val: JSONValue): T {
        const parseValue = (value: JSONValue): JSONValue => {
            if (Array.isArray(value)) {
                return value.map(parseValue);
            }

            if (typeof value === 'object') {
                value = recursivleyTransform(value);
            }

            return value;
        };

        if (Array.isArray(val)) {
            return val.map(parseValue) as T;
        }

        if (typeof val !== 'object') {
            return val as T;
        }

        return Object.entries(val).reduce((object, [key, value]) => {
            const transformedKey = transformer(key);
            value = parseValue(value);

            return {...object, [transformedKey]: value};
        }, {} as {[x: string]: JSONValue} | Array<JSONValue>) as T;
    };
}

const toCamelCase = transformObjectKeys(pascalToCamelCase);
const toPascalCase = transformObjectKeys(camelToPascalCase);

export type {JSONValue};
export {toCamelCase, toPascalCase, getPagedRequestQueryParams, getQueryParams};
