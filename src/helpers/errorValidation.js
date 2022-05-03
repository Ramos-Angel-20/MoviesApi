import { validationResult } from 'express-validator';

const errorValidator = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }

    next();
}

export default errorValidator;
