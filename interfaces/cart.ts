import { TGenders, TSize } from './';

export interface ICartProduct {
    _id      : string;
    image    : string;
    price    : number;
    size     ?: TSize;
    slug     : string;
    title    : string;
    gender   : TGenders;
    quantity : number;
}
