let lastGlobalSendTime = 0;
const GLOBAL_COOLDOWN = 11000;

export default async function handler(req, res) {
    // CORS headers taake Hugging Face Spaces se fetch block na ho
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const now = Date.now();
    const elapsed = now - lastGlobalSendTime;

    if (elapsed >= GLOBAL_COOLDOWN) {
        lastGlobalSendTime = now;
        return res.status(200).json({ allowed: true });
    } else {
        return res.status(200).json({ allowed: false, waitMs: GLOBAL_COOLDOWN - elapsed });
    }
}
