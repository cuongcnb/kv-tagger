module.exports = {
    apps: [
        {
            name: "kv-tagger",
            script: "./app.js",
            args: [],
            merge_logs: false,
            watch: false,
            instance_var: 'INSTANCE_ID',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
}
