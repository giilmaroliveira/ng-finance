import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamento de contas da casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Farmácia' },
      { id: 3, name: 'Lazer', description: 'Cinema, parque, praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Extra', description: 'Recebimentos diversos' },
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Aluguel',
        categoryId: categories[0].id,
        category: categories[0],
        description: 'Aluguel Casa',
        paid: true,
        date: '01/02/2022',
        amount: '2000,00',
        type: 'expense',
      } as Entry,
      {
        id: 2,
        name: 'Salário',
        categoryId: categories[3].id,
        category: categories[3],
        description: 'Recebimento do salário',
        paid: true,
        date: '20/01/2022',
        amount: '5000,00',
        type: 'revenue',
      } as Entry,
      {
        id: 3,
        name: 'Plano de Saúde',
        categoryId: categories[1].id,
        category: categories[1],
        description: 'Plano de Saúde - Família',
        paid: false,
        date: '20/02/2022',
        amount: '1000,00',
        type: 'expense',
      } as Entry,
      new Entry(4, 'Restaurante', 'Almoço de negócios', 'expense', '300,00', '09/02/2022', true, categories[2].id, categories[2])
    ];

    return { categories, entries };
  }
}
