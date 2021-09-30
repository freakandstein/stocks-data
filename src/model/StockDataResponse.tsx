import IResponse from './IResponse'

export default interface StockDataResponse extends IResponse {
    data: StockData[];
}

export interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}