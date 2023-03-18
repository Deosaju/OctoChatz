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
        const user = await fetchUser(req.body.accessToken);
        res.status(200).json(user);
    } catch (err) {
        console.log("err", err);
        res.sendStatus(500);
    }
}

async function fetchUser(token) {
    const GITHUB_ENDPOINT = "https://api.github.com/user";
    const response = await axios.get(GITHUB_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-API-Version': '2022-11-28',
        },
    });

    return response.data;
}