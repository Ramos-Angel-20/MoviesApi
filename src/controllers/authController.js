import bcrypt from 'bcrypt';

import User from '../models/User.js';
import generateJwt from '../helpers/generateJwt.js';

export const googleLogin = async (req, res) => {
    
    try {

        const user = await User.findOne({
            where: {
                email: req.user._json.email,
                provider: req.user.provider
            }
        });

        if (!user) {
            throw new Error('This user is not registered');
        }       

        // Eliminar la session de passport 
        //req.session.destroy();
        if (req.session) {
            req.session.destroy();
        } 

        req.logout();

        // TODO: Crear el jwt aqui...
        const token = await generateJwt(user.id);

        return res.status(200).json({
            userId: user.id,
            displayName: user.username,
            email: user.email,
            token
        });

    } catch (error) {
        res.status(404).json({
            msg: error.message
        });
    }
}

export const googleRegister = async (req, res) => {

    try {
        const fetchedUser = await User.findOne({
            where: {
                email: req.user._json.email,
            }
        });
    
        if (fetchedUser) {
            throw new Error('Theres already an user registered with this email');
        }

        const user = await User.create({ 
            username: req.user._json.name,
            email: req.user._json.email,
            provider: req.user.provider
        });

        // Eliminamos la session de passport
        req.logout();

        const token = await generateJwt(user.id);

        return res.status(201).json({
            userId: user.id,
            displayName: user.username,
            email: user.email,
            token
        });


    } catch (error) {
        
        // Eliminamos la session de passport
        req.logout();

        if (req.session) {
            req.session.destroy();
        }
        
        return res.status(401).json({
            msg: error.message
        });        
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error('This email is not registered');
        }

        const hashedPassword = user.password;
        const passwordDoesMatch = bcrypt.compare(password, hashedPassword);

        if (!passwordDoesMatch) {
            throw new Error('Incorrect password');
        }

        const token = await generateJwt(user.id);

        return res.status(200).json({
            userId: user.id, 
            email: user.email,
            displayName: user.username,
            token
        });        

    } catch (error) {
        return res.status(400).json({
            msg: error.message
        });
    }
}

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        
        const fetchedUser = await User.findOne({
            where: {
                email
            }
        });

        if (fetchedUser) {
            throw new Error('This email is already registered');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = User.create({
            email,
            username,
            provider: null,
            password: hashedPassword
        });

        const token = await generateJwt(newUser.id);

        return res.status(200).json({
            userId: newUser.id,
            displayName: newUser.username,
            email: newUser.email,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: err.message
        });
    }
}

