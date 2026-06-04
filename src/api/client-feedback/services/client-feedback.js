'use strict';

/**
 * client-feedback service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client-feedback.client-feedback');
