import { Request, Response } from 'express';
import { CardTemplateService } from '../services/cardTemplate.service';

export class CardTemplateController {
  private static cardTemplateService = CardTemplateService.getInstance();

  static async getAllCardTemplates(req: Request, res: Response) {
    try {
      const page = Number.parseInt(req.query.page as string) || 1;
      const limit = Number.parseInt(req.query.limit as string) || 10;

      const { cardTemplates, total } =
        await CardTemplateController.cardTemplateService.getAll(page, limit);

      res.status(200).json({
        success: true,
        data: cardTemplates,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}
