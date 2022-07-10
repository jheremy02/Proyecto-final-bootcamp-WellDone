const express=require("express")
const router=express.Router()
const { body, validationResult } = require('express-validator');


router.post(
  '/signUp',
  // username must be an email
  body('email').isEmail(),
  body('lastName').isLength({ min: 5 }),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  },
);



module.exports=router
