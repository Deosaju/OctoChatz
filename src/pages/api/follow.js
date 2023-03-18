import NextCors from 'nextjs-cors';
import axios from 'axios';

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        console.log("req.body", req.body.accessToken, req.body.username);
        const response = await follow(req.body.accessToken, req.body.username);
        res.status(200).json(response);
    } catch (err) {
        console.log("err", err);
        res.status(500);
    }
}


async function follow(token, searchUser) {
    const GITHUB_ENDPOINT = `https://api.github.com/user/following/${searchUser}`;
    const response = await axios.put(GITHUB_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-API-Version': '2022-11-28',
            'Content-Length' : '0'
        },
    });
    return response;
}
