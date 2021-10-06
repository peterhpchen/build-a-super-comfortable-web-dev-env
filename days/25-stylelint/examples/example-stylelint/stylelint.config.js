module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order'
  ],
  rules: {
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules"
    ],
    'declaration-block-single-line-max-declarations': 1,
    'block-opening-brace-space-before': 'always'
  }
};
