import express from 'express';
import { getCommentsByUserId } from '../data/comments.js';
import { getMovieById } from '../data/movies.js';
import { getUserById } from '../data/users.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    
        const comments = await getCommentsByUserId(req.params.userId);
        const movies = await Promise.all(comments.map(async (comment) => {
          const movie = await getMovieById(comment.movieId);
          return {
            movieTitle: movie.title,
            moviePoster: movie.poster,
            comment: comment.text,
          };
        }));
    
        res.json(movies);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

export default router;