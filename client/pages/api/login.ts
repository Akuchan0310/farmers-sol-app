import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

const KEY ='sd'

export default function _ (req:NextApiRequest, res:NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end('Unauthorised Login')
        return;
    }

    const { username, password } = req.body;

    res.json({
        token: jwt.sign({
            username,
            admin: username == 'admin' && password == 'admin', 
        },
        KEY
        )
    })

}