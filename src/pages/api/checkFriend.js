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
        const user = await fetchFollowing(req.body.accessToken);
        user.forEach((follower) => {
            if (follower.login === req.body.follower) {
                res.status(200).json({ isFriend: true });
            }
        });
        res.status(200).json({ isFriend: false });
    } catch (err) {
        res.status(500);
    }
}

async function fetchFollowing(token) {
    const GITHUB_ENDPOINT = "https://api.github.com/user/following?per_page=100";
    const response = await axios.get(GITHUB_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-API-Version': '2022-11-28',
        },
    });
    return response.data;
}