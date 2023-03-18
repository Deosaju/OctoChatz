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
        const response = await unfollow(req.body.accessToken, req.body.username);
        res.status(200).json(response);
    } catch (err) {
        console.log("err", err);
        res.sendStatus(500);
    }
}


async function unfollow(token, searchUser) {
    const GITHUB_ENDPOINT = `https://api.github.com/user/following/${searchUser}`;
    const response = await axios.delete(GITHUB_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-API-Version': '2022-11-28',
        },
    });

    return response.data;
}
