export const isEmpty = (value: any) => value.trim() === "";

export const isString = (value: any) => typeof value === "string";

export const isNumber = (value: any) => Number.isFinite(value);

export const isNull = (value: any) => value === null || value === undefined;
