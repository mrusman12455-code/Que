const express = require('express');
const app = express();
app.use(express.json());

let lastGlobalSendTime = 0;
const GLOBAL_COOLDOWN = 11000; // 11 seconds strict global gap

// Jab bhi koi space message bhejne se pehle ijazat maangay gi
app.get('/check-lock', (req, res) => {
    const now = Date.now();
    const elapsed = now - lastGlobalSendTime;

    if (elapsed >= GLOBAL_COOLDOWN) {
        lastGlobalSendTime = now; // Foran lock lag gaya!
        res.json({ allowed: true });
    } else {
        res.json({ allowed: false, waitMs: GLOBAL_COOLDOWN - elapsed });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Central Lock API running on port ${PORT}`));
