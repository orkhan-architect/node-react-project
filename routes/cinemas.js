import express from 'express';

import { getCinemas, createCinema, updateCinema, deleteCinema, likeCinema, getCinemasBySearch, getCinema, commentCinema } from '../controllers/cinemaController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCinemas);
router.post('/', auth, createCinema);
router.patch('/:id', auth, updateCinema);
router.delete('/:id', auth, deleteCinema);

router.patch('/:id/likeCinema', auth, likeCinema);
router.get('/search', getCinemasBySearch);
router.get('/:id', getCinema);
router.post('/:id/commentCinema', commentCinema);

export default router;