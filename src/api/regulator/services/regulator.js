'use strict';

/**
 * regulator service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::regulator.regulator');
