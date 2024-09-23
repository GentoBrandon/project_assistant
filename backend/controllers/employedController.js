const { body, validationResult } = require('express-validator');
const knex = require('../models/db');

// Create new employed
const createEmployed = [
    body('definition').notEmpty(),
    body('date').notEmpty(),
    body('state').notEmpty().isIn(['Urgente', 'Medio', 'Parcial']),
    async (req, res) => {
      const errors = validationResult(req);
    
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      try {
        await knex('lista').insert({
          definition: req.body.definition,
          date: req.body.date,
          state: req.body.state,
        });
    
        return res.status(201).json({ msg: 'Task stored successfully' });
      } catch (e) {
        return res.status(500).json({ msg: 'Internal Server Error.' });
      }
    }
  ];
  