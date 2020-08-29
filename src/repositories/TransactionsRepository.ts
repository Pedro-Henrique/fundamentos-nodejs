import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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
    const transactions = this.all();

    let income = 0;
    let outcome = 0;

    transactions.map(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else if (transaction.type === 'outcome') {
        outcome += transaction.value;
      }
      return true;
    });

    const balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({
    title,
    value,
    type,
  }: CreateTransactionDTO): Transaction | false {
    const transaction = new Transaction({ title, value, type });

    const balance = this.getBalance();

    if (type === 'outcome' && balance.total < value) {
      return false;
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
