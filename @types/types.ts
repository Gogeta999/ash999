import { ExtendedRecordMap, PageMap } from "notion-types";
export * from "notion-types";

//Notion
export interface PageError {
  message?: string;
  statusCode: number;
}

export interface PageProps {
  site?: Site;
  recordMap?: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
}

export interface Model {
  id: string;
  userId: string;

  createdAt: number;
  updatedAt: number;
}

export interface Site extends Model {
  name: string;
  domain: string;

  rootNotionPageId: string;
  rootNotionSpaceId: string;

  // settings
  html?: string;
  fontFamily?: string;
  darkMode?: boolean;
  previewImages?: boolean;

  // opengraph metadata
  description?: string;
  image?: string;

  timestamp: Date;

  isDisabled: boolean;
}

export interface SiteMap {
  site: Site;
  pageMap: PageMap;
  canonicalPageMap: CanonicalPageMap;
}

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}

export interface PageUrlOverridesMap {
  // maps from a URL path to the notion page id the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pagePath: string]: string;
}

export interface PageUrlOverridesInverseMap {
  // maps from a notion page id to the URL path the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pageId: string]: string;
}

export interface PreviewImage {
  url: string;
  originalWidth: number;
  originalHeight: number;
  width: number;
  height: number;
  type: string;
  dataURIBase64: string;

  error?: string;
  statusCode?: number;
}

export interface PreviewImageMap {
  [url: string]: PreviewImage;
}

//All Categories Props
export interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

export interface CategoriesProps {
  catData?: CategoriesData;
}
export interface CategoriesData {
  allCategories: AllCategory[];
}

export interface AllCategory {
  id: string;
  name: string;
  notionId: null | string;
  notionType: string;
  description: string;
  isEnable: boolean;
  child: Child[];
}

export interface Child {
  id: string;
  name: string;
  notionType: string;
}

//Graphql Categories with Name
export interface CategoriesByNameData {
  categoriesByName: CategoriesByName[];
}

export interface CategoriesByName {
  id: string;
  name: string;
  notionId: null | string;
  notionType: string;
  isEnable: boolean;
  parentCategory?: CategoriesByName;
}

// For Notion Search Result
export interface NotionSearch {
  object: string;
  results?: ResultsEntity[];
  next_cursor?: null;
  has_more: boolean;
}
export interface ResultsEntity {
  object: string;
  id: string;
  cover?: Cover | null;
  icon?: Icon | null;
  created_time: string;
  last_edited_time: string;
  title?: TitleEntity[] | null;
  properties: Properties;
  parent: Parent;
  url: string;
  archived?: boolean | null;
}
export interface Cover {
  type: string;
  external: External;
}
export interface External {
  url: string;
}
export interface Icon {
  type: string;
  file?: File | null;
  emoji?: string | null;
}
export interface File {
  url: string;
  expiry_time: string;
}
export interface TitleEntity {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: null;
}
export interface Text {
  content: string;
  link?: null;
}
export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
export interface Properties {
  Tags?: Tags | null;
  Created?: Created | null;
  Name?: Name | null;
  title?: Title | null;
}
export interface Tags {
  id: string;
  name: string;
  type: string;
  multi_select: MultiSelect;
}
export interface MultiSelect {
  options?: null[] | null;
}
export interface Created {
  id: string;
  name: string;
  type: string;
  created_time: CreatedTimeOrTitle;
}
export interface CreatedTimeOrTitle {}
export interface Name {
  id: string;
  name: string;
  type: string;
  title: CreatedTimeOrTitle;
}
export interface Title {
  id: string;
  type: string;
  title?: TitleEntity[] | null;
}
export interface Parent {
  type: string;
  page_id?: string | null;
  workspace?: boolean | null;
}
