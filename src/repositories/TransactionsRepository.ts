import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    const agruparPor = (
      objetoArray: Array<Transaction>,
      propriedade: string,
    ): Transaction => {
      return objetoArray.reduce((acumulador: Transaction, obj: Transaction) => {
        const key = obj[propriedade];
        if (!acumulador[key]) {
          acumulador[key] = Transaction[];
        }
        if (key === 'income') {
          income += obj.value;
        } else if (key === 'outcome') {
          outcome += obj.value;
        }
        return acumulador;
      });
    };

    const prop: keyof Transaction = 'type';

    agruparPor(this.transactions, prop);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
