import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const lofiContainerFn = /* @__PURE__ */ createRecipe('lofi-container', {
  "themeVariant": "night"
}, [])

const lofiContainerVariantMap = {
  "themeVariant": [
    "forest",
    "beach",
    "sea",
    "night",
    "custom"
  ]
}

const lofiContainerVariantKeys = Object.keys(lofiContainerVariantMap)

export const lofiContainer = /* @__PURE__ */ Object.assign(memo(lofiContainerFn.recipeFn), {
  __recipe__: true,
  __name__: 'lofiContainer',
  __getCompoundVariantCss__: lofiContainerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: lofiContainerVariantKeys,
  variantMap: lofiContainerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, lofiContainerVariantKeys)
  },
  getVariantProps: lofiContainerFn.getVariantProps,
})