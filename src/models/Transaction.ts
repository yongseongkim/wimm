import Realm, {ObjectSchema} from 'realm';

export enum Category {
  // Income
  Salary = 'Salary', // 급여
  Investment = 'Investment', // 저축 / 투자
  SideJob = 'SideJob', // 부업

  // Expense
  Food = 'Food', // 식사/간식
  Transport = 'Transport', // 교통
  Entertainment = 'Entertainment', // 문화/여가
  Travel = 'Travel', // 여행
  Shopping = 'Shopping', // 쇼핑
  Beauty = 'Beauty', // 미용
  Gift = 'Gift', // 선물
  Communication = 'Communication', // 통신
  Living = 'Living', // 생활/주거
  Hospital = 'Hospital', // 의료/건강
  Education = 'Education', // 교육
  Other = 'etc', // 기타
}

export namespace Category {
  export function fromString(category: string): Category {
    switch (category.trim().toLowerCase()) {
      case 'salary':
        return Category.Salary;
      case 'investment':
        return Category.Investment;
      case 'sidejob':
        return Category.SideJob;
      case 'food':
        return Category.Food;
      case 'transport':
        return Category.Transport;
      case 'entertainment':
        return Category.Entertainment;
      case 'travel':
        return Category.Travel;
      case 'shopping':
        return Category.Shopping;
      case 'beauty':
        return Category.Beauty;
      case 'gift':
        return Category.Gift;
      case 'communication':
        return Category.Communication;
      case 'living':
        return Category.Living;
      case 'hospital':
        return Category.Hospital;
      case 'education':
        return Category.Education;
      case 'etc':
        return Category.Other;
    }
    return Category.Other;
  }

  export function getDisplayText(category: Category): string {
    switch (category) {
      case Category.Salary:
        return '급여';
      case Category.Investment:
        return '저축 / 투자';
      case Category.SideJob:
        return '부업';
      case Category.Food:
        return '식사 / 간식';
      case Category.Transport:
        return '교통';
      case Category.Entertainment:
        return '문화 / 여가';
      case Category.Travel:
        return '여행';
      case Category.Shopping:
        return '쇼핑';
      case Category.Beauty:
        return '미용';
      case Category.Gift:
        return '선물';
      case Category.Communication:
        return '통신';
      case Category.Living:
        return '생활 / 주거';
      case Category.Hospital:
        return '의료 / 건강';
      case Category.Education:
        return '교육';
      case Category.Other:
        return '기타';
    }
  }

  export function categoriesForIncome(): Category[] {
    return [
      Category.Salary,
      Category.Investment,
      Category.SideJob,
      Category.Gift,
      Category.Other,
    ];
  }

  export function categoriesForExpense(): Category[] {
    return [
      Category.Food,
      Category.Transport,
      Category.Entertainment,
      Category.Travel,
      Category.Shopping,
      Category.Beauty,
      Category.Gift,
      Category.Communication,
      Category.Living,
      Category.Hospital,
      Category.Education,
      Category.Other,
    ];
  }
}

export class TransactionModel extends Realm.Object<TransactionModel> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description!: string;
  category!: string;
  value!: number;
  tradedAt!: Date;
  createdAt!: Date;

  // https://www.mongodb.com/docs/realm/sdk/react-native/model-data/data-types/property-types/#std-label-react-native-supported-property-types
  static schema: ObjectSchema = {
    name: 'Transaction',
    properties: {
      _id: {type: 'objectId', indexed: true},
      title: {type: 'string', indexed: 'full-text'},
      description: 'string',
      category: {type: 'string', default: Category.Other},
      value: {type: 'int', default: 0},
      tradedAt: 'date',
      createdAt: {type: 'date', default: new Date()},
    },
    primaryKey: '_id',
  };
}
