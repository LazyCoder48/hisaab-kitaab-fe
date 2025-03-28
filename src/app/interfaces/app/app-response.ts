/*
 * Copyright (c) 2025.
 * ajite created app-response.ts
 * Project: hisab-kitab-fe | Module: hisab-kitab-fe
 */
export interface AppResponse {

    data: any;
    jwt: string;
    httpResponseCode: number;
    httpResponseBody: string;
    success: any
    message: string;
}