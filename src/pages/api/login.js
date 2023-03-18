import NextCors from 'nextjs-cors';
import axios from 'axios';
import qs from 'query-string';

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        const resCode = await exchangeCodeForAccessToken(req.body.code);
        console.log("resCode", resCode);
        res.status(200).json(resCode);
    } catch (err) {
        console.log("err", err);
        res.sendStatus(500);
    }
}

async function exchangeCodeForAccessToken(code) {
    const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
    const params = {
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    };

    const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const parsedData = qs.parse(data);
    return parsedData.access_token;
}