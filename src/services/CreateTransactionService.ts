import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('This type do not existe');
    }

    if (value <= 0) {
      throw Error('The value should bo bigger than zero');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (transaction === false) {
      throw Error('Insufficient funds');
    }

    return transaction;
  }
}

export default CreateTransactionService;
