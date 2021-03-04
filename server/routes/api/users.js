import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../../config/keys'

const router = express.Router();

const validateRegisterInput = require("../../validate/register");
const validateLoginInput = require("../../validate/login");

const User = require("../../models/User");