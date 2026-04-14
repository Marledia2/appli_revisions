/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface LofiContainerVariant {
  /**
 * @default "night"
 */
themeVariant: "forest" | "beach" | "sea" | "night" | "custom"
}

type LofiContainerVariantMap = {
  [key in keyof LofiContainerVariant]: Array<LofiContainerVariant[key]>
}



export type LofiContainerVariantProps = {
  [key in keyof LofiContainerVariant]?: ConditionalValue<LofiContainerVariant[key]> | undefined
}

export interface LofiContainerRecipe {
  
  __type: LofiContainerVariantProps
  (props?: LofiContainerVariantProps): string
  raw: (props?: LofiContainerVariantProps) => LofiContainerVariantProps
  variantMap: LofiContainerVariantMap
  variantKeys: Array<keyof LofiContainerVariant>
  splitVariantProps<Props extends LofiContainerVariantProps>(props: Props): [LofiContainerVariantProps, Pretty<DistributiveOmit<Props, keyof LofiContainerVariantProps>>]
  getVariantProps: (props?: LofiContainerVariantProps) => LofiContainerVariantProps
}


export declare const lofiContainer: LofiContainerRecipe