module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  emitErrors: false,
  url: env("PUBLIC_URL", "https://cms.8invest.com"),
  //  proxy: env.bool('IS_PROXIED', true),
});
