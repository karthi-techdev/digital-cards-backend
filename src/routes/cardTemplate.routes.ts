import { Router } from 'express';
import { CardTemplateController } from '../controllers/cardTemplate.controller';

const router = Router();

router.get('/', CardTemplateController.getAllCardTemplates);


export default router;