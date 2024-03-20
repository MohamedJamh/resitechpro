export interface IImageModel {
    id? : number;
    url?: string;
}

export class Image implements IImageModel {
    constructor(
        public id?: number,
        public url? : string,
    ){}
}
