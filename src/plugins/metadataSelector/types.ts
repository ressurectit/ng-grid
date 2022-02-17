import {InjectionToken} from '@angular/core';

import {MetadataSelectorOptions} from './metadataSelector.interface';

/**
 * Token for injecting options for metadata selector
 */
export const METADATA_SELECTOR_OPTIONS: InjectionToken<MetadataSelectorOptions> = new InjectionToken<MetadataSelectorOptions>('METADATA_SELECTOR_OPTIONS');

/**
 * Constant used for accessing metadata selector in grid
 */
export const METADATA_SELECTOR = 'METADATA_SELECTOR';