export enum Category {
  Food = 'Food',
  Transport = 'Transport',
  Entertainment = 'Entertainment',
  Travel = 'Travel',
  Shopping = 'Shopping',
  Beauty = 'Beauty',
  Gift = 'Gift',
  Communication = 'Communication',
  Living = 'Living',
  Hospital = 'Hospital',
  Education = 'Education',
  Other = 'etc',
}

export type Transaction = {
  id: string;
  title: string;
  description: string;
  category: Category;
  value: number;
  tradedAt: Date;
  createdAt: Date;
};

export namespace Transaction {
  export function fromObject(obj: any): Transaction {
    return {
      ...obj,
      tradedAt: new Date(obj.tradedAt),
      createdAt: new Date(obj.createdAt),
    };
  }
}
