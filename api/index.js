let lastGlobalSendTime = 0;
const GLOBAL_COOLDOWN = 11000;

export default function handler(req, res) {
    const now = Date.now();
    const elapsed = now - lastGlobalSendTime;
    
    if (elapsed >= GLOBAL_COOLDOWN) {
        lastGlobalSendTime = now;
        res.status(200).json({ allowed: true });
    } else {
        res.status(200).json({ allowed: false, waitMs: GLOBAL_COOLDOWN - elapsed });
    }
}
