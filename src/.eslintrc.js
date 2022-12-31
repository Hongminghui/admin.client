/*
 * @Date: 2022-12-05 22:29:22
 * @LastEditTime: 2022-12-26 23:47:13
 * @Description: 
 */
module.exports = {
    extends: [
        'eslint-config-airbnb-base',
        'eslint-config-airbnb-base/rules/strict',
        'eslint-config-airbnb/rules/react'
    ],
    env: {
        browser: true
    },
    // parser: 'babel-eslint',
    rules: {
        'no-var': 'warn',
        'quotes': 'warn',
        'object-curly-newline': ['off'],
        'max-len': ['error', {
            code: 150
        }],
        'prefer-const': ['off'], // 没重新赋值就一定要使用const？
    }
}