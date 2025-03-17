export enum DanbooruSection {
  post = "post",
  search = "search",
  notes = "notes",
  comment = "comment",
  comments = "comments",
  comment_search = "comment_search",
  popular = "popular",
  popular_view = "popular_view",
  pool = "pool",
  favorite_group = "favorite_group",
  pool_gallery = "pool_gallery",
  favorites = "favorites",
  upload = "upload",
  new_pool = "new_pool",
  topic = "topic",
  intro = "intro",
  signin = "signin",
  settings = "settings",
}

/** Test a URL to find which section of Danbooru the script is running on. */
export function getDanbooruSection(url?: string): DanbooruSection {
  let path;
  let query;
  {
    let target;

    if (url) {
      target = new URL(url);
    } else {
      target = location;
    }

    path = target.pathname;
    query = target.search;
  }

  if (/\/posts\/\d+/.test(path)) {
    return DanbooruSection.post;
  } else if (/^\/(?:posts|$)/.test(path)) {
    return DanbooruSection.search;
  } else if (/^\/notes\/?$/.test(path) && query.indexOf("group_by=note") < 0) {
    return DanbooruSection.notes;
  } else if (/\/comments\/\d+/.test(path)) {
    return DanbooruSection.comment;
  } else if (/^\/comments\/?$/.test(path)) {
    if (query.indexOf("group_by=comment") < 0) {
      return DanbooruSection.comments;
    }
    // This may need to be more specific in the future.
    else {
      return DanbooruSection.comment_search;
    }
  } else if (/\/explore\/posts\/popular(?:\/?$|\?)/.test(path)) {
    return DanbooruSection.popular;
    // } else if (/\/explore\/posts\/popular_view(?:\/?$|\?)/.test(path)) {
    //   return DanbooruLocation.popular_view;
  } else if (/\/pools\/\d+(?:\/?$|\?)/.test(path)) {
    return DanbooruSection.pool;
  } else if (/\/favorite_groups\/\d+(?:\/?$|\?)/.test(path)) {
    return DanbooruSection.favorite_group;
  } else if (/\/pools\/gallery/.test(path)) {
    return DanbooruSection.pool_gallery;
  } else if (path.indexOf("/favorites") === 0) {
    return DanbooruSection.favorites;
  } else if (path.indexOf("/uploads/new") === 0) {
    return DanbooruSection.upload;
  } else if (path.indexOf("/pools/new") === 0) {
    return DanbooruSection.new_pool;
  } else if (/\/forum_topics\/\d+/.test(path)) {
    return DanbooruSection.topic;
  } else if (path.indexOf("/explore/posts/intro") === 0) {
    return DanbooruSection.intro;
  } else if (path.indexOf("/session/new") === 0) {
    return DanbooruSection.signin;
  } else if (/\/users\/\d+\/edit/.test(path)) {
    return DanbooruSection.settings;
  } else {
    throw new Error("Failed to get current danbooru page type");
  }
}

/** Current location */
export const SECTION = getDanbooruSection();
