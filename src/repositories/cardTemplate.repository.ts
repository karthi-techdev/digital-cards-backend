import mongoose from 'mongoose';
import { CardTemplateModel, ICardTemplate } from '../models/cardTemplate.model';
import { BaseRepository } from './base.repository';

export class CardTemplateRepository extends BaseRepository<ICardTemplate> {
  constructor() {
    super(CardTemplateModel, 'templateId');
  }

  async getAll(
    page?: number,
    limit?: number,
    filter: Record<string, any> = {}
  ) {
    const result = await this.getPaginated(page, limit, filter);

    return {
      cardTemplates: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages
    };
  }

  async getById(id: string): Promise<ICardTemplate | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await CardTemplateModel.findById(id);
  }
}
