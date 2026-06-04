module.exports = ({ env }) => ({
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 3, // Default is 5
    },
  },
  translate: {
    enabled: true,
    config: {
      // Choose google as the provider
      provider: "google-cloud",
      // Pass credentials and other options to the provider
      providerOptions: {
        // Your API key - required and wil cause errors if not provided
        apiKey: env("STRAPI_GOOGLE_TRANSLATE_API_TOKEN"),
        // Your project id - required and wil cause errors if not provided
        projectId: env("GOOGLE_PROJECT_ID"),
        googleJson: env("GOOGLE_TRANSLATE_JSON"),
        // Use custom locale mapping (for example to translate from your default locale to en-US)
        // localeMap: {
        //   // Use uppercase here!
        //   EN: "EN-US",
        // },
      },
      // Which field types are translated (default string, text, richtext, components and dynamiczones)
      // Either string or object with type and format
      // Possible formats: plain, markdown, html (default plain)
      translatedFieldTypes: [
        "string",
        { type: "text", format: "plain" },
        { type: "richtext", format: "markdown" },
        "component",
        "dynamiczone",
      ],
      // If relations should be translated (default true)
      translateRelations: true,
    },
  },
  "drag-drop-content-types": {
    enabled: true,
  },
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::legal-document.legal-document",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/{locale}/terms-conditions",
            },
            copy: false,
            alwaysVisible: true,
          },
          //        published: {
          //          url: 'https://test.8invest.com/{locale}/terms-conditions',
          //          copy: false,
          //          alwaysVisible: true,
          //        },
        },
        {
          uid: "api::help-article.help-article",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "{slug}",
              type: "help-article",
              locale: "{locale}",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
        {
          uid: "api::help-center.help-center",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/{locale}/help-center",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
        {
          uid: "api::help-category.help-category",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/{locale}/help-center/{slug}",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
        {
          uid: "api::glossary-item.glossary-item",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/en/glossary",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
        {
          uid: "api::company-office.company-office",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/{locale}/about-us",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
        {
          uid: "api::phone-number.phone-number",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/{locale}/contact-us",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
        {
          uid: "api::article.article",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/{locale}/articles/{slug}",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
        {
          uid: "api::company-news-article.company-news-article",
          draft: {
            url: "https://www.xtrade.com/draft/api/draft",
            query: {
              secret: "xtrade_secret",
              slug: "/draft/{locale}/company-news/{slug}",
            },
            copy: false,
            alwaysVisible: true,
          },
        },
      ],
    },
  },
});
