const whitelist = [
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:5173'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;