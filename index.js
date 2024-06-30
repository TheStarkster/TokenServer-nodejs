const express = require("express");
const app = express();

const {
    RtcTokenBuilder,
    RtcRole,
} = require("agora-access-token");

const generateRtcUidToken = (uid, channelName = "sample_channel") => {
    const appID = "0a22be79067c46fa8d594544539496f2";
    const appCertificate = "cbd85b9b7a184f8f88f99b3ecd0ff6a3";

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const rtcUidToken = RtcTokenBuilder.buildTokenWithUid(
        appID,
        appCertificate,
        channelName,
        uid,
        RtcRole,
        privilegeExpiredTs
    );

    return rtcUidToken;
};

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.get("/rtc-uid-token/:uid", (req, res) => {
    const rtcUidToken = generateRtcUidToken(req.params.uid);
    res.status(200).json({ token: rtcUidToken });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});