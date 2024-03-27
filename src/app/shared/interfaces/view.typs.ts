export interface IView {
  date: Date;
  count: number;
}

export class View implements IView {
  constructor(public date: Date,
              public count: number
  ){}
}
