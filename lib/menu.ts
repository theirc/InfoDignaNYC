// Utility menu overlay functions
import type {
  MenuOverlayItem,
  MenuOverlayStrings,
} from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import {
  CategoryWithSections,
  ZendeskCategory,
} from '@ircsignpost/signpost-base/dist/src/zendesk';

import {
  ABOUT_US_ARTICLE_ID,
  USE_CAT_SEC_ART_CONTENT_STRUCTURE,
} from './constants';

export interface CustomMenuOverlayStrings extends MenuOverlayStrings {
  information: string;
  about: string;
  services: string;
}

// Excluded category IDs
const excludedCategoryIds = [13944079089181, 13944233131293];

export function getFooterItems(
  strings: CustomMenuOverlayStrings,
  categories: ZendeskCategory[] | CategoryWithSections[]
): MenuOverlayItem[] {
  let items: MenuOverlayItem[] = [];
  items.push({ key: 'home', label: strings.home, href: '/' });
  // Include other footer items as needed.
  return items;
}

export function getMenuItems(
  strings: CustomMenuOverlayStrings,
  categories: ZendeskCategory[] | CategoryWithSections[],
  includeAbout: boolean
): MenuOverlayItem[] {
  let items: MenuOverlayItem[] = [];
  items.push({ key: 'home', label: strings.home, href: '/' });
  if (USE_CAT_SEC_ART_CONTENT_STRUCTURE) {
    addMenuItemsCategories(items, categories as CategoryWithSections[]);
  } else {
    addMenuItemsInformation(items, strings, categories as ZendeskCategory[]);
  }
  if (includeAbout) {
    items.push({
      key: 'about',
      label: strings.about,
      href: `/articles/${ABOUT_US_ARTICLE_ID}`,
    });
  }
  items.push({
    key: 'services',
    label: strings.services, // Make sure this string is defined in your strings object
    href: '/#service-map',
  });
  // Include other menu items as needed.
  return items;
}

function addMenuItemsCategories(
  items: MenuOverlayItem[],
  categories: CategoryWithSections[]
) {
  for (const { category, sections } of categories) {
    if (!excludedCategoryIds.includes(category.id)) {
      items.push({
        key: category.id.toString(),
        label: category.name,
        children: sections.map((section) => ({
          key: section.id.toString(),
          label: section.name,
          href: '/sections/' + section.id.toString(),
        })),
      });
    }
  }
}

function addMenuItemsInformation(
  items: MenuOverlayItem[],
  strings: CustomMenuOverlayStrings,
  categories: ZendeskCategory[]
) {
  const filteredCategories = categories.filter(
    (category) => !excludedCategoryIds.includes(category.id)
  );

  if (filteredCategories.length > 0) {
    items.push({
      key: 'information',
      label: strings.information,
      children: filteredCategories.map((category) => ({
        key: category.id.toString(),
        label: category.name,
        href: '/categories/' + category.id.toString(),
      })),
    });
  }
}
