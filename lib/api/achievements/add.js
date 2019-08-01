'use strict';

module.exports = add;

const Achievement = require('../../models/Achievement.js');

/**
 * @param {Object} [options]
 * @param {String} [options.title] title for the achievement
 * @param {String} [options.action] action endpoint to post progress for the achievement
 * @param {Number} [options.pointValue] point value of this achievement
 * @param {Boolean} [options.activate] whether or not to activate this achievement (can be activated later using `.achievements.activate(id|title)`)
 * @param {Date} [options.expiration] expiration date for users to obtain this achievement
 * @param {Boolean} [options.hide] public/private for this achievement (useful for front end/display)
 * @param {Object} [options.badge]
 * @param {String} [options.badge.title] badge title
 * @param {String} [options.badge.src] file path/location for image/svg
 * @param {Object} [options.requiredCondition]
 * @param {String} [options.requiredCondition.statistic] one of ['totalCount', 'uniqueCount', 'complete', 'value']
 * @param {String} [options.requiredCondition.operator] one of ['eq', 'gte', 'lte', 'gt', 'lt', 'ne']
 * @param {Number} [options.requiredCondition.qty] value to compare `statistic` with using `operator`
 * @param {Array} [options.dependencies] array of achievement titles that are required to unlock this achievement
 * @param {Boolean} [options.sequentialDependencies] whether or not to consider the order of dependencies
 * @return {Promise} a promise that will resolve with Achievement object
 * @public
 */
function add(options) {
  return new Promise((resolve, reject) => {
    if (!(options && typeof options.title === 'string')) {
      return reject(new Error(`invalid options:\n${JSON.stringify(options, null, 2)}`));
    }

    Achievement.findOne(
      {
        'title': options.title
      }
    ).exec(async (err, achievement) => {
      if (err) {
        return reject(err);
      }
      if (achievement) {
        return reject(new Error(`Achievement with title ${options.title} already exists`));
      }
      const newAchievement = new Achievement(
        {
          title: options.title,
          action: options.action,
          pointValue: options.pointValue,
          meta: {
            isActive: options.activate || false,
            expiration: options.expiration || undefined,
            isHidden: options.hide || undefined,
          },
          badge: {
            title: options.badge && typeof options.badge.title === 'string' ? options.badge.title : undefined,
            src: options.badge && typeof options.badge.src === 'string' ? options.badge.src : undefined
          },
          requiredCondition: {
            statistic: options.requiredCondition && typeof options.requiredCondition.statistic === 'string' ? options.requiredCondition.statistic : undefined,
            operator: options.requiredCondition && typeof options.requiredCondition.operator === 'string' ? options.requiredCondition.operator : undefined,
            qty: options.requiredCondition && typeof options.requiredCondition.qty === 'number' ? options.requiredCondition.qty : undefined,
            dependencies: {
              sequential: options.sequentialDependencies,
              achievements: []
            }
          }

        }
      );
      return resolve(await newAchievement.save());
    });
  });
}
