import { ICardTemplate } from '../models/cardTemplate.model';
import { BaseService } from './base.service';
import { CardTemplateRepository } from '../repositories/cardTemplate.repository';

export class CardTemplateService extends BaseService<ICardTemplate> {
  private static instance: CardTemplateService;
  private cardTemplateRepository: CardTemplateRepository;

  private constructor() {
    const repository = new CardTemplateRepository();
    super(repository, 'CardTemplate');
    this.cardTemplateRepository = repository;
  }

  static getInstance(): CardTemplateService {
    if (!CardTemplateService.instance) {
      CardTemplateService.instance = new CardTemplateService();
    }
    return CardTemplateService.instance;
  }

  async getAll(page: number = 1, limit: number = 10) {
    return await this.cardTemplateRepository.getAll(page, limit);
  }
}
