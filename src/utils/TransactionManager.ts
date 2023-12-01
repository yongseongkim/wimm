import {Category, Transaction} from '@/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

class TransactionManager {
  private static _instance: TransactionManager;

  public static getInstance(): TransactionManager {
    if (!this._instance) {
      this._instance = new TransactionManager();
    }
    return this._instance;
  }

  public async clearAll() {
    const transactionKeys = (await AsyncStorage.getAllKeys()).filter(key =>
      key.startsWith('@transactions'),
    );
    await AsyncStorage.multiRemove(transactionKeys);
  }

  public async getTransactions(
    year: number,
    month: number,
  ): Promise<Transaction[]> {
    try {
      const transactions = await AsyncStorage.getItem(
        `@transactions/${year}/${month}`,
      );
      const objs = JSON.parse(transactions || '[]');
      return objs.map((obj: any) => Transaction.fromObject(obj));
    } catch (e) {
      console.log(`TransactionManager.getTransactions failed: `, e);
      return [];
    }
  }

  public async insertTransaction({
    title,
    description,
    category,
    value,
    tradedAt,
  }: {
    title: string;
    description: string;
    category: Category;
    value: number;
    tradedAt: Date;
  }): Promise<Transaction> {
    const transaction: Transaction = {
      id: uuidv4(),
      title,
      description,
      category,
      value,
      tradedAt,
      createdAt: new Date(),
    };
    const year = transaction.tradedAt.getFullYear();
    const month = transaction.tradedAt.getMonth() + 1;
    try {
      const key = `@transactions/${year}/${month}`;
      const prevValue = await AsyncStorage.getItem(key);
      const prevTransactions = prevValue ? JSON.parse(prevValue) : [];
      const newTransactions = [...prevTransactions, transaction];
      await AsyncStorage.setItem(key, JSON.stringify(newTransactions));
    } catch (e) {
      console.log(`TransactionManager.insertTransaction failed: `, e);
    }
    return transaction;
  }
}

export default TransactionManager;
