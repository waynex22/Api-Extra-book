const AccountRepository = require('../reponsitories/Account.repository');
const BaseController = require('./Base.controller');
const Account = require('../models/account.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JTW_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTI1NjM3MSwiaWF0IjoxNzAxMjU2MzcxfQ.TrBKsx9Dhwy-dcaji2iBPjBhFusq1LvZp8hjfYSs0vQ';

class AccountController extends BaseController {
  constructor() {
    super(AccountRepository);
  }

  async register(req, res) {
    try {
      const existingName = await Account.findOne({ name: req.body.name});
      const existingEmail = await Account.findOne({ email: req.body.email});
      if (existingName) {
        return res.status(209).json({ message: 'Name already exists' });
      }
      if(existingEmail){
        return res.status(208).json({message: 'email da duoc su dung'})
      }
      const { name, email, password } = req.body;
      const account = new Account({ name, email, password });

      const newUser = await account.save();

      res.status(201).json({ message: 'Create success', data: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const user = await Account.findOne({ name: req.body.name });

      if (!user) {
        return res.status(204).json({ message: 'User not found' });
      }

      const password = req.body.password;
      const passwordHash = await bcrypt.compare(password, user.password);

      if (passwordHash) {
        const token = jwt.sign({name: user.name, id: user._id, role: user.role}, JTW_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token: token });
      } else {
        return res.status(208).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async user(req, res) {
    try {
      const {token} = req.body;
      const user = jwt.verify(token, JTW_SECRET);
      return res.status(200).json({data: user})
    } catch (error) {
        return res.status(401).json({ message: 'Token expired' });
      }
  }
  
}

module.exports = new AccountController();
