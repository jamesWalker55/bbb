import Cookies from "js-cookie";

type Border = {
  tags: string;
  is_enabled: boolean;
  border_color: string;
  border_style: string;
  class_name?: string;
};

type TagGroup = {
  name: string;
  tags: string;
};

type SettingDef =
  | {
      type: "checkbox";
      default: boolean;
      name: string;
      desc: string;
    }
  | {
      type: "dropdown";
      default: string | number;
      name: string;
      desc: string;
      txtOptions?: `${string}:${string}`[];
      numList?: number[];
      numRange?: [number, number];
    }
  | {
      type: "text";
      default: string;
      name: string;
      desc: string;
    }
  | {
      default: any;
    };

export const SETTINGS_DEF = {
  add_popular_link: {
    type: "checkbox",
    default: false as boolean,
    name: "Add Popular Link",
    desc: 'Add a link to the popular listing to the "posts" submenu',
  },
  add_random_post_link: {
    type: "checkbox",
    default: false as boolean,
    name: "Add Random Link",
    desc: "Add a link to a random post to the post sidebar options menu.",
  },
  alternate_image_swap: {
    type: "checkbox",
    default: false as boolean,
    name: "Alternate Image Swap",
    desc: "Switch between the sample and original image by clicking the image. <tiphead>Note</tiphead>Notes can be toggled by using the link in the sidebar options section.",
  },
  autohide_sidebar: {
    type: "dropdown",
    default: "none",
    name: "Auto-hide Sidebar",
    desc: 'Hide the sidebar for posts, favorites listings, and/or searches until the mouse comes close to the left side of the window or the sidebar gains focus.<tiphead>Tips</tiphead>By using Danbooru\'s hotkey for the letter "Q" to place focus on the search box, you can unhide the sidebar.<br><br>Use the "thumbnail count" option to get the most out of this feature on search listings.',
    txtOptions: [
      "Disabled:none",
      "Favorites:favorites",
      "Posts:post",
      "Searches:search",
      "Favorites & Posts:favorites post",
      "Favorites & Searches:favorites search",
      "Posts & Searches:post search",
      "All:favorites post search",
    ],
  },
  autoscroll_post: {
    type: "dropdown",
    default: "none",
    name: "Auto-scroll Post",
    desc: "Automatically scroll a post to a particular point. <tipdesc>Below Header:</tipdesc> Scroll the window down until the header is no longer visible or scrolling is no longer possible. <tipdesc>Post Content:</tipdesc> Position the post content as close as possible to the left and top edges of the window viewport when initially loading a post. Using this option will also scroll past any notices above the content.",
    txtOptions: ["Disabled:none", "Below Header:header", "Post Content:post"],
  },
  blacklist_add_bars: {
    type: "checkbox",
    default: false as boolean,
    name: "Additional Bars",
    desc: "Add a blacklist bar to the comment search listing and individually linked comments so that blacklist entries can be toggled as needed.",
  },
  blacklist_highlight_color: {
    type: "text",
    default: "#CCCCCC",
    name: "Highlight Color",
    desc: 'When using highlighting for "thumbnail marking", you may set the color here. <tiphead>Notes</tiphead>Leaving this field blank will result in the default color being used. <br><br>For easy color selection, use one of the many free tools on the internet like <a target="_blank" href="http://www.quackit.com/css/css_color_codes.cfm">this one</a>. Hex RGB color codes (#000000, #FFFFFF, etc.) are the recommended values.',
  },
  blacklist_ignore_fav: {
    type: "checkbox",
    default: false as boolean,
    name: "Ignore Favorites",
    desc: "Allow the blacklist to ignore your favorited posts.",
  },
  blacklist_thumb_controls: {
    type: "checkbox",
    default: false as boolean,
    name: "Thumbnail Controls",
    desc: 'Allow control over individual blacklisted thumbnails and access to blacklist toggle links from blacklisted thumbnails. <tiphead>Directions</tiphead>For blacklisted thumbnails that have been revealed, hovering over them will reveal a clickable "X" icon that can hide them again. <br><br>If using "hidden" or "replaced" for the "post display" option, clicking on the area of a blacklisted thumbnail will pop up a menu that displays what blacklist entries it matches. Clicking the thumbnail area a second time while that menu is open will reveal that single thumbnail. <br><br>The menu that pops up on the first click also allows for toggling any listed blacklist entry for the entire page and navigating to the post without revealing its thumbnail. <tiphead>Note</tiphead>Toggling blacklist entries will have no effect on posts that have been changed via their individual controls.',
  },
  blacklist_post_display: {
    type: "dropdown",
    default: "disabled",
    name: "Post Display",
    desc: 'Set how the display of blacklisted posts in thumbnail listings and the comments section is handled. <tipdesc>Removed:</tipdesc> Posts and the space they take up are completely removed. <tipdesc>Hidden:</tipdesc> Post space is preserved, but thumbnails are hidden. <tipdesc>Replaced:</tipdesc> Thumbnails are replaced by "blacklisted" thumbnail placeholders.',
    txtOptions: [
      "Disabled:disabled",
      "Removed:removed",
      "Hidden:hidden",
      "Replaced:replaced",
    ],
  },
  blacklist_smart_view: {
    type: "checkbox",
    default: false as boolean,
    name: "Smart View",
    desc: "When navigating to a blacklisted post by using its thumbnail, if the thumbnail has already been revealed, the post content will temporarily be exempt from any blacklist checks for 1 minute and be immediately visible. <tiphead>Note</tiphead>Thumbnails in the parent/child notices of posts with exempt content will still be affected by the blacklist.",
  },
  blacklist_session_toggle: {
    type: "checkbox",
    default: false as boolean,
    name: "Session Toggle",
    desc: "When toggling an individual blacklist entry on and off, the mode it's toggled to will persist across other pages in the same browsing session until it ends.<tiphead>Note</tiphead>For blacklists with many entries, this option can cause unexpected behavior (ex: getting logged out) if too many entries are toggled off at the same time.",
  },
  blacklist_thumb_mark: {
    type: "dropdown",
    default: "none",
    name: "Thumbnail Marking",
    desc: "Mark the thumbnails of blacklisted posts that have been revealed to make them easier to distinguish from other thumbnails. <tipdesc>Highlight:</tipdesc> Change the background color of blacklisted thumbnails. <tipdesc>Icon Overlay:</tipdesc> Add an icon to the lower right corner of blacklisted thumbnails.",
    txtOptions: ["Disabled:none", "Highlight:highlight", "Icon Overlay:icon"],
  },
  blacklist_video_playback: {
    type: "dropdown",
    default: "pause resume",
    name: "Video Playback",
    desc: "Allow the blacklist to control the playback of video content. <tipdesc>Pause:</tipdesc> Video content will pause when it is hidden. <tipdesc>Pause and Resume:</tipdesc> Video content will pause when it is hidden and resume playing when unhidden.",
    txtOptions: [
      "Disabled:disabled",
      "Pause:pause",
      "Pause & Resume:pause resume",
    ],
  },
  border_spacing: {
    type: "dropdown",
    default: 0,
    name: "Border Spacing",
    desc: "Set the amount of blank space between a border and thumbnail and between a custom tag border and status border. <tiphead>Note</tiphead>Even when set to 0, status borders and custom tag borders will always have a minimum value of 1 between them. <tiphead>Tip</tiphead>Use this option if you often have trouble distinguishing a border from the thumbnail image.",
    txtOptions: ["0 (Default):0", "1:1", "2:2", "3:3"],
  },
  border_width: {
    type: "dropdown",
    default: 2,
    name: "Border Width",
    desc: "Set the width of thumbnail borders.",
    txtOptions: ["1:1", "2 (Default):2", "3:3", "4:4", "5:5"],
  },
  bypass_api: {
    type: "checkbox",
    default: false as boolean,
    name: "Automatic API Bypass",
    desc: "When logged out and API only features are enabled, do not warn about needing to be logged in. Instead, automatically bypass those features.",
  },
  clean_links: {
    type: "checkbox",
    default: false as boolean,
    name: "Clean Links",
    desc: "Remove the extra information after the post ID in thumbnail listing post links.<tiphead>Note</tiphead>Enabling this option will disable Danbooru's search navigation and active pool/favorite group detection for posts.",
  },
  collapse_sidebar: {
    type: "checkbox",
    default: false as boolean,
    name: "Collapsible Sidebar",
    desc: "Allow sections in the sidebar to be expanded and collapsed via clicking their header titles.<tiphead>Note</tiphead>Sections can be set to default to expanded or collapsed by right clicking their titles.",
  },
  comment_score: {
    type: "checkbox",
    default: false as boolean,
    name: "Comment Scores",
    desc: "Make comment scores visible by adding them as direct links to their respective comments.",
  },
  custom_status_borders: {
    type: "checkbox",
    default: false as boolean,
    name: "Custom Status Borders",
    desc: "Override Danbooru's thumbnail borders for deleted, flagged, pending, parent, and child images.",
  },
  custom_tag_borders: {
    type: "checkbox",
    default: true as boolean,
    name: "Custom Tag Borders",
    desc: "Add thumbnail borders to posts with specific tags.",
  },
  direct_downloads: {
    type: "checkbox",
    default: false as boolean,
    name: "Direct Downloads",
    desc: "Allow download managers to download the posts displayed in the favorites, search, pool, popular, and favorite group listings. <tiphead>Note</tiphead>Posts filtered out by the blacklist or quick search will not provide direct downloads until the blacklist entry or quick search affecting them is disabled.",
  },
  disable_embedded_notes: {
    type: "checkbox",
    default: false as boolean,
    name: "Disable Embedded Notes",
    desc: "Force posts with embedded notes to display with the original note styling. <tiphead>Notes</tiphead>While notes will display with the original styling, the actual post settings will still have embedded notes set to enabled. <br><br>Due to the actual settings, users that may wish to edit notes will have to edit the notes with the embedded note styling so that nothing ends up breaking in unexpected ways. When toggling translation mode or opening the edit note dialog box, the notes will automatically revert back to the original embedded notes until the page is reloaded. <br><br>Note resizing and moving will be allowed without the reversion to embedded notes since this ability is sometimes necessary for badly positioned notes. Any note resizing or moving done as a part of intended note editing should be done <b>after</b> triggering the embedded note reversion since any changes before it will be lost.",
  },
  disable_tagged_filenames: {
    type: "checkbox",
    default: false as boolean,
    name: "Disable Tagged Filenames",
    desc: 'Remove the tag information from post filenames and only leave the original md5 hash. <tiphead>Note</tiphead>For logged in users with their account\'s "disable tagged filenames" setting set to "yes", this option must be enabled for consistent behavior on hidden posts. <br><br>For logged in users with their account\'s "disable tagged filenames" setting set to "no" and logged out users, this option can be enabled to remove the tags from filenames without having to use an account setting.',
  },
  enable_menu_autocomplete: {
    type: "checkbox",
    default: true as boolean,
    name: "Enable Menu Autocomplete",
    desc: "Allow the BBB menu to use Danbooru's tag autocomplete.",
  },
  enable_status_message: {
    type: "checkbox",
    default: true as boolean,
    name: "Enable Status Message",
    desc: "When requesting information from Danbooru, display the request status in the lower right corner.",
  },
  endless_default: {
    type: "dropdown",
    default: "disabled",
    name: "Default",
    desc: 'Enable endless pages on the favorites, search, pool, and favorite group listings. <tipdesc>Off:</tipdesc> Start up with all features off. <tipdesc>On:</tipdesc> Start up with all features on.<tipdesc>Paused:</tipdesc> Start up with all features on, but do not append new pages until the "load more" button is clicked. <tiphead>Note</tiphead>When not set to disabled, endless pages can be toggled between off and on/paused by using the "E" hotkey or the "endless" link next to the "listing" link in the page submenu. <tiphead>Tip</tiphead>The "new tab/window" and "fixed paginator" options can provide additional customization for endless pages.',
    txtOptions: ["Disabled:disabled", "Off:off", "On:on", "Paused:paused"],
  },
  endless_fill: {
    type: "checkbox",
    default: false as boolean,
    name: "Fill Pages",
    desc: "When appending pages with missing thumbnails caused by hidden posts or removed duplicate posts, retrieve thumbnails from the following pages and add them to the new page until the desired number of thumbnails is reached. <tiphead>Note</tiphead>If using page separators, the displayed page number for appended pages composed of thumbnails from multiple Danbooru pages will be replaced by a range consisting of the first and last pages from which thumbnails were retrieved.",
  },
  endless_pause_interval: {
    type: "dropdown",
    default: 0,
    name: "Pause Interval",
    desc: 'Pause endless pages each time the number of pages reaches a multiple of the selected amount. <tiphead>Note</tiphead> When this option is enabled, the "Shift + E" hotkey can be used to continue loading more pages after pausing.',
    txtOptions: ["Disabled:0"],
    numRange: [1, 100],
  },
  endless_preload: {
    type: "checkbox",
    default: false as boolean,
    name: "Preload Next Page",
    desc: "Start loading the next page as soon as possible.<tiphead>Note</tiphead>A preloaded page will not be appended until the scroll limit is reached.",
  },
  endless_remove_dup: {
    type: "checkbox",
    default: false as boolean,
    name: "Remove Duplicates",
    desc: "When appending new pages, remove posts that already exist in the listing from the new page.<tiphead>Note</tiphead>Duplicate posts are caused by the addition of new posts to the beginning of a listing or changes to the order of the posts.",
  },
  endless_scroll_limit: {
    type: "dropdown",
    default: 500,
    name: "Scroll Limit",
    desc: "Set the minimum amount of pixels that the window can have left to vertically scroll before it starts appending the next page.",
    numList: [
      0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
      750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350,
      1400, 1450, 1500,
    ],
  },
  endless_separator: {
    type: "dropdown",
    default: "divider",
    name: "Page Separator",
    desc: "Distinguish pages from each other by marking them with a separator.<tipdesc>Marker:</tipdesc> Place a thumbnail sized marker before the first thumbnail of each page.<tipdesc>Divider:</tipdesc> Completely separate pages by placing a horizontal line between them.",
    txtOptions: ["None:none", "Marker:marker", "Divider:divider"],
  },
  endless_session_toggle: {
    type: "checkbox",
    default: false as boolean,
    name: "Session Toggle",
    desc: "When toggling endless pages on and off, the mode it's toggled to will override the default and persist across other pages in the same browsing session for that tab until it ends.",
  },
  fixed_paginator: {
    type: "dropdown",
    default: "disabled",
    name: "Fixed Paginator",
    desc: 'Make the paginator always visible for the favorites, search, pool, and favorite group listings by fixing it to the bottom of the window when it would normally start scrolling out of view. <tipdesc>Endless:</tipdesc> Only change the paginator during endless pages browsing. <tipdesc>Normal:</tipdesc> Only change the paginator during normal browsing. <tipdesc>Always:</tipdesc> Change the paginator during normal and endless pages browsing. <tiphead>Note</tiphead>Options labeled with "minimal" will also make the fixed paginator smaller by removing most of the blank space within it.',
    txtOptions: [
      "Disabled:disabled",
      "Endless:endless",
      "Endless (Minimal):endless minimal",
      "Normal:normal",
      "Normal (Minimal):normal minimal",
      "Always:endless normal",
      "Always (Minimal):endless normal minimal",
    ],
  },
  fixed_sidebar: {
    type: "dropdown",
    default: "none",
    name: "Fixed Sidebar",
    desc: 'Make the sidebar never completely vertically scroll out of view for posts, favorites listings, and/or searches by fixing it to the top or bottom of the window when it would normally start scrolling out of view. <tiphead>Note</tiphead>The "auto-hide sidebar" option will override this option if both try to modify the same page. <tiphead>Tip</tiphead>Depending on the available height in the browser window and the Danbooru location being modified, the "tag scrollbars", "collapsible sidebar", and/or "remove tag headers" options may be needed for best results.',
    txtOptions: [
      "Disabled:none",
      "Favorites:favorites",
      "Posts:post",
      "Searches:search",
      "Favorites & Posts:favorites post",
      "Favorites & Searches:favorites search",
      "Posts & Searches:post search",
      "All:favorites post search",
    ],
  },
  hide_ban_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Ban Notice",
    desc: "Hide the Danbooru ban notice.",
  },
  hide_comment_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Comment Guide Notice",
    desc: "Hide the Danbooru comment guide notice.",
  },
  hide_fav_button: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Favorite Button",
    desc: "Hide the favorite button below post content.",
  },
  hide_pool_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Pool Guide Notice",
    desc: "Hide the Danbooru pool guide notice.",
  },
  hide_sign_up_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Sign Up Notice",
    desc: "Hide the Danbooru account sign up notice.",
  },
  hide_tag_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Tag Guide Notice",
    desc: "Hide the Danbooru tag guide notice.",
  },
  hide_tos_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide TOS Notice",
    desc: "Hide the Danbooru terms of service agreement notice.",
  },
  hide_upgrade_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Upgrade Notice",
    desc: "Hide the Danbooru upgrade account notice.",
  },
  hide_upload_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Upload Guide Notice",
    desc: "Hide the Danbooru upload guide notice.",
  },
  hide_hidden_notice: {
    type: "checkbox",
    default: false as boolean,
    name: "Hide Hidden Posts Notice",
    desc: "Hide the Danbooru hidden posts notice.",
  },
  image_swap_mode: {
    type: "dropdown",
    default: "load",
    name: "Image Swap Mode",
    desc: "Set how swapping between the sample and original image is done.<tipdesc>Load First:</tipdesc> Display the image being swapped in after it has finished downloading. <tipdesc>View While Loading:</tipdesc> Immediately display the image being swapped in while it is downloading.",
    txtOptions: ["Load First:load", "View While Loading:view"],
  },
  load_sample_first: {
    type: "checkbox",
    default: true as boolean,
    name: "Load Sample First",
    desc: 'Load sample images first when viewing a post.<tiphead>Note</tiphead>When logged in, the account\'s "default image width" setting will override this option. This behavior can be changed with the "override sample setting" option under the preferences tab.',
  },
  manage_cookies: {
    type: "checkbox",
    default: false as boolean,
    name: "Manage Notice Cookies",
    desc: 'When using the "hide upgrade notice", "hide sign up notice", and/or "hide TOS notice" options, also create cookies to disable these notices at the server level.<tiphead>Tip</tiphead>Use this feature if the notices keep flashing on your screen before being removed.',
  },
  minimize_status_notices: {
    type: "checkbox",
    default: false as boolean,
    name: "Minimize Status Notices",
    desc: "Hide the Danbooru deleted, banned, flagged, appealed, and pending notices. When you want to see a hidden notice, you can click the appropriate status link in the information section of the sidebar.",
  },
  override_blacklist: {
    type: "dropdown",
    default: "logged_out",
    name: "Override Blacklist",
    desc: 'Allow the "blacklist" setting to override the default blacklist for logged out users and/or account blacklist for logged in users. <tipdesc>Logged out:</tipdesc> Override the default blacklist for logged out users. <tipdesc>Always:</tipdesc> Override the default blacklist for logged out users and account blacklist for logged in users.',
    txtOptions: ["Disabled:disabled", "Logged out:logged_out", "Always:always"],
  },
  override_resize: {
    type: "checkbox",
    default: false as boolean,
    name: "Override Resize Setting",
    desc: 'Allow the "resize post" setting to override the account "fit images to window" setting when logged in.',
  },
  override_sample: {
    type: "checkbox",
    default: false as boolean,
    name: "Override Sample Setting",
    desc: 'Allow the "load sample first" setting to override the account "default image width" setting when logged in. <tiphead>Note</tiphead>When using this option, your Danbooru account settings should have "default image width" set to the corresponding value of the "load sample first" script setting. Not doing so will cause your browser to always download both the sample and original image. If you often change the "load sample first" setting, leaving your account to always load the sample/850px image first is your best option.',
  },
  page_counter: {
    type: "checkbox",
    default: false as boolean,
    name: "Page Counter",
    desc: 'Add a page counter and "go to page #" input field near the top of listing pages. <tiphead>Note</tiphead>The total number of pages will not be displayed if the pages are using the "previous & next" paging system or the total number of pages exceeds the maximum amount allowed by your user account level.',
  },
  post_drag_scroll: {
    type: "checkbox",
    default: false as boolean,
    name: "Post Drag Scrolling",
    desc: "While holding down left click on a post's content, mouse movement can be used to scroll the whole page and reposition the content.<tiphead>Note</tiphead>This option is automatically disabled when translation mode is active.",
  },
  post_link_new_window: {
    type: "dropdown",
    default: "none",
    name: "New Tab/Window",
    desc: "Force post links in the search, pool, popular, favorites, and favorite group listings to open in a new tab/window. <tipdesc>Endless:</tipdesc> Only use new tabs/windows during endless pages browsing. <tipdesc>Normal:</tipdesc> Only use new tabs/windows during normal browsing. <tipdesc>Always:</tipdesc> Use new tabs/windows during normal and endless pages browsing. <tiphead>Notes</tiphead>When this option is active, holding down the control and shift keys while clicking a post link will open the post in the current tab/window.<br><br>Whether the post opens in a new tab or a new window depends upon your browser configuration. <tiphead>Tip</tiphead>This option can be useful as a safeguard to keep accidental left clicks from disrupting endless pages.",
    txtOptions: [
      "Disabled:disabled",
      "Endless:endless",
      "Normal:normal",
      "Always:endless normal",
    ],
  },
  post_resize: {
    type: "checkbox",
    default: true as boolean,
    name: "Resize Post",
    desc: 'Shrink large post content to fit the browser window when initially loading a post.<tiphead>Note</tiphead>When logged in, the account\'s "fit images to window" setting will override this option. This behavior can be changed with the "override resize setting" option under the preferences tab.',
  },
  post_resize_mode: {
    type: "dropdown",
    default: "width",
    name: "Resize Mode",
    desc: "Choose how to shrink large post content to fit the browser window when initially loading a post.",
    txtOptions: ["Width:width", "Height:height", "Width & Height:all"],
  },
  post_tag_scrollbars: {
    type: "dropdown",
    default: 0,
    name: "Post Tag Scrollbars",
    desc: 'Limit the length of the sidebar tag lists for posts by restricting them to a set height in pixels. For lists that exceed the set height, a scrollbar will be added to allow the rest of the list to be viewed.<tiphead>Note</tiphead>When using "remove tag headers", this option will limit the overall length of the combined list.',
    txtOptions: ["Disabled:0"],
    numList: [
      50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
      800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400,
      1450, 1500,
    ],
  },
  post_tag_titles: {
    type: "checkbox",
    default: false as boolean,
    name: "Post Tag Titles",
    desc: "Change the page titles for posts to a full list of the post tags.",
  },
  quick_search: {
    type: "dropdown",
    default: "disabled",
    name: "Quick Search",
    desc: 'Add a new search box to the upper right corner of the window viewport that allows searching through the current thumbnails for specific posts. <tipdesc>Fade:</tipdesc> Fade all posts that don\'t match in the thumbnail listing. <tipdesc>Remove:</tipdesc> Remove all posts that don\'t match from the thumbnail listing. <tiphead>Directions</tiphead>Please read the "thumbnail matching rules" section under the help tab for information about creating searches. <br><br>The search starts minimized in the upper right corner. Left clicking the main icon will open and close the search. Right clicking the main icon will completely reset the search. Holding down shift while left clicking the main icon will toggle an active search\'s pinned status. Holding down control while left clicking the main icon will toggle an active search\'s negated status.<br><br>While open, the search can be entered/updated in the search box and the pinned status can be toggled by clicking the pushpin icon. Clicking the negative icon next to the pushpin icon will tell quick search to negate/invert the search being submitted. If no changes are made to an active search, submitting it a second time will reset the quick search. <tiphead>Notes</tiphead>Options labeled with "pinned" will make searches default to being pinned. <br><br>A pinned search will persist across other pages in the same browsing session for that tab until it ends or the search is unpinned. <br><br>When not set to disabled, the quick search can be opened by using the "F" hotkey. Additionally, an active search can be reset by using "Shift + F". Pressing "Escape" while the quick search is open will close it.',
    txtOptions: [
      "Disabled:disabled",
      "Fade:fade",
      "Fade (Pinned):fade pinned",
      "Remove:remove",
      "Remove (Pinned):remove pinned",
    ],
  },
  remove_tag_headers: {
    type: "checkbox",
    default: false as boolean,
    name: "Remove Tag Headers",
    desc: 'Remove the "copyrights", "characters", and "artist" headers from the sidebar tag list.',
  },
  resize_link_style: {
    type: "dropdown",
    default: "full",
    name: "Resize Link Style",
    desc: 'Set how the resize links in the post sidebar options section will display. <tipdesc>Full:</tipdesc> Show the "resize to window", "resize to window width", and "resize to window height" links on separate lines. <tipdesc>Minimal:</tipdesc> Show the "resize to window" (W&H), "resize to window width" (W), and "resize to window height" (H) links on one line.',
    txtOptions: ["Full:full", "Minimal:minimal"],
  },
  search_add: {
    type: "dropdown",
    default: "disabled",
    name: "Search Add",
    desc: 'Modify the sidebar tag list by adding, removing, or replacing links in the sidebar tag list that modify the current search\'s tags. <tipdesc>Remove:</tipdesc> Remove any preexisting "+" and "&ndash;" links. <tipdesc>Link:</tipdesc> Add "+" and "&ndash;" links to modified versions of the current search that include or exclude their respective tags. <tipdesc>Toggle:</tipdesc> Add toggle links that modify the search box with their respective tags. Clicking a toggle link will switch between a tag being included (+), excluded (&ndash;), potentially included among other tags (~), and removed (&raquo;). Right clicking a toggle link will immediately remove its tag. If a tag already exists in the search box or gets entered/removed through alternative means, the toggle link will automatically update to reflect the tag\'s current status. <tiphead>Note</tiphead>The remove option is intended for users above the basic user level that want to remove the links. For users that can\'t normally see the links and do not wish to see them, this setting should be set to disabled.',
    txtOptions: [
      "Disabled:disabled",
      "Remove:remove",
      "Link:link",
      "Toggle:toggle",
    ],
  },
  search_tag_scrollbars: {
    type: "dropdown",
    default: 0,
    name: "Search Tag Scrollbars",
    desc: "Limit the length of the sidebar tag list for the search listing by restricting it to a set height in pixels. When the list exceeds the set height, a scrollbar will be added to allow the rest of the list to be viewed.",
    txtOptions: ["Disabled:0"],
    numList: [
      50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
      800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400,
      1450, 1500,
    ],
  },
  show_banned: {
    type: "checkbox",
    default: false as boolean,
    name: "Show Banned Placeholders",
    desc: 'Display all banned posts in the search, pool, popular, favorites, comments, and favorite group listings by using "hidden" placeholders.<tiphead>Note</tiphead>This option only affects users below the gold account level.',
  },
  show_deleted: {
    type: "checkbox",
    default: false as boolean,
    name: "Show Deleted",
    desc: 'Display all deleted posts in the search, pool, popular, favorites, and favorite group listings. <tiphead>Note</tiphead>When using this option, your Danbooru account settings should have "deleted post filter" set to no and "show deleted children" set to yes in order to function properly and minimize connections to Danbooru.',
  },
  show_loli: {
    type: "checkbox",
    default: false as boolean,
    name: "Show Loli Placeholders",
    desc: 'Display loli posts in the search, pool, popular, favorites, comments, and favorite group listings by using "hidden" placeholders.<tiphead>Note</tiphead>This option only affects users below the gold account level.',
  },
  show_resized_notice: {
    type: "dropdown",
    default: "all",
    name: "Show Resized Notice",
    desc: "Set which image type(s) the purple notice bar about image resizing is allowed to display on. <tiphead>Tip</tiphead>When a sample and original image are available for a post, a new option for swapping between the sample and original image becomes available in the sidebar options menu. Even if you disable the resized notice bar, you will always have access to its main function.",
    txtOptions: [
      "None (Disabled):none",
      "Original:original",
      "Sample:sample",
      "Original & Sample:all",
    ],
  },
  show_shota: {
    type: "checkbox",
    default: false as boolean,
    name: "Show Shota Placeholders",
    desc: 'Display shota posts in the search, pool, popular, favorites, comments, and favorite group listings by using "hidden" placeholders.<tiphead>Note</tiphead>This option only affects users below the gold account level.',
  },
  show_toddlercon: {
    type: "checkbox",
    default: false as boolean,
    name: "Show Toddlercon Placeholders",
    desc: 'Display toddlercon posts in the search, pool, popular, favorites, comments, and favorite group listings by using "hidden" placeholders.<tiphead>Note</tiphead>This option only affects users below the gold account level.',
  },
  single_color_borders: {
    type: "checkbox",
    default: false as boolean,
    name: "Single Color Borders",
    desc: "Only use one color for each thumbnail border.",
  },
  thumb_info: {
    type: "dropdown",
    default: "disabled",
    name: "Thumbnail Info",
    desc: "Display the score (&#x2605;), favorite count (&hearts;), and rating (S, Q, or E) for a post with its thumbnail. <tipdesc>Below:</tipdesc> Display the extra information below thumbnails. <tipdesc>Hover:</tipdesc> Display the extra information upon hovering over a thumbnail's area. <tiphead>Note</tiphead>Extra information will not be added to the thumbnails in the comments listing since the score and rating are already visible there. Instead, the number of favorites will be added next to the existing score display.",
    txtOptions: ["Disabled:disabled", "Below:below", "Hover:hover"],
  },
  thumbnail_count: {
    type: "dropdown",
    default: 0,
    name: "Thumbnail Count",
    desc: "Change the number of thumbnails that display in the search and favorites listings.",
    txtOptions: ["Disabled:0"],
    numRange: [1, 200],
  },
  thumbnail_count_default: {
    type: "dropdown",
    default: 20,
    name: "Thumbnail Count Default",
    desc: "Change the number of thumbnails that BBB should expect Danbooru to return per a page.<tiphead>Note</tiphead>This option only affects users above the basic account level. It should only be changed from 20 by users <b>that have changed their account setting for posts per page</b>.",
    txtOptions: ["Disabled:0"],
    numRange: [1, 100],
  },
  track_new: {
    type: "checkbox",
    default: false as boolean,
    name: "Track New Posts",
    desc: 'Add a menu option titled "new" to the posts section submenu (between "listing" and "upload") that links to a customized search focused on keeping track of new posts.<tiphead>Note</tiphead>While browsing the new posts, the current page of posts is also tracked. If the new post listing is left, clicking the "new" link later on will attempt to pull up the posts where browsing was left off at.<tiphead>Tip</tiphead>If you would like to bookmark the new post listing, drag and drop the link to your bookmarks or right click it and bookmark/copy the location from the context menu.',
  },
  video_autoplay: {
    type: "dropdown",
    default: "on",
    name: "Video Autoplay",
    desc: "Automatically play video posts. <tipdesc>Off:</tipdesc> All videos have to be started manually. <tipdesc>No Sound:</tipdesc> Videos without sound will start automatically and videos with sound have to be started manually. <tipdesc>On:</tipdesc> All videos will start automatically.",
    txtOptions: ["Off:off", "No Sound:nosound", "On:on"],
  },
  video_controls: {
    type: "checkbox",
    default: true as boolean,
    name: "Video Controls",
    desc: "Show the controls for video posts.",
  },
  video_loop: {
    type: "dropdown",
    default: "nosound",
    name: "Video Looping",
    desc: "Repeatedly play video posts. <tipdesc>Off:</tipdesc> All videos will only play once. <tipdesc>No Sound:</tipdesc> Videos without sound will repeat and videos with sound will only play once. <tipdesc>On:</tipdesc> All videos will repeat.",
    txtOptions: ["Off:off", "No Sound:nosound", "On:on"],
  },
  video_volume: {
    type: "dropdown",
    default: "disabled",
    name: "Video Volume",
    desc: "Set the default volume of videos or remember your volume settings across videos. <tipdesc>Remember:</tipdesc> Set the video to the last volume level and muted status used. <tipdesc>Muted:</tipdesc> Always set the video volume to muted. <tipdesc>5% - 100%:</tipdesc> Always set the video volume level to the specified percent. <tiphead>Note</tiphead>This option can not control the volume of flash videos.",
    txtOptions: [
      "Disabled:disabled",
      "Remember:remember",
      "Muted:muted",
      "5%:0.05",
      "10%:0.1",
      "15%:0.15",
      "20%:0.2",
      "25%:0.25",
      "30%:0.30",
      "35%:0.35",
      "40%:0.4",
      "45%:0.45",
      "50%:0.5",
      "55%:0.55",
      "60%:0.6",
      "65%:0.65",
      "70%:0.7",
      "75%:0.75",
      "80%:0.8",
      "85%:0.85",
      "90%:0.9",
      "95%:0.95",
      "100%:1",
    ],
  },
  // TODO: Add type of this
  collapse_sidebar_data: { default: { post: {}, thumb: {} } },
  script_blacklisted_tags: { default: "" },
  status_borders: {
    default: [
      {
        tags: "deleted",
        is_enabled: true,
        border_color: "#000000",
        border_style: "solid",
        class_name: "post-status-deleted",
      },
      {
        tags: "flagged",
        is_enabled: true,
        border_color: "#FF0000",
        border_style: "solid",
        class_name: "post-status-flagged",
      },
      {
        tags: "pending",
        is_enabled: true,
        border_color: "#0000FF",
        border_style: "solid",
        class_name: "post-status-pending",
      },
      {
        tags: "child",
        is_enabled: true,
        border_color: "#CCCC00",
        border_style: "solid",
        class_name: "post-status-has-parent",
      },
      {
        tags: "parent",
        is_enabled: true,
        border_color: "#00FF00",
        border_style: "solid",
        class_name: "post-status-has-children",
      },
    ] satisfies Border[] as Border[],
  },
  tag_borders: {
    default: [
      {
        tags: "loli",
        is_enabled: true,
        border_color: "#FFC0CB",
        border_style: "solid",
      },
      {
        tags: "shota",
        is_enabled: true,
        border_color: "#66CCFF",
        border_style: "solid",
      },
      {
        tags: "toddlercon",
        is_enabled: true,
        border_color: "#9370DB",
        border_style: "solid",
      },
      {
        tags: "status:banned",
        is_enabled: true,
        border_color: "#000000",
        border_style: "solid",
      },
    ] satisfies Border[] as Border[],
  },
  tag_groups: {
    default: [
      { name: "hidden", tags: "~loli ~shota ~toddlercon ~status:banned" },
    ] satisfies TagGroup[] as TagGroup[],
  },
  // TODO: Add type of this
  track_new_data: { default: { viewed: 0, viewing: 1 } },
  // TODO: Add type of this
  video_volume_data: { default: { level: 1, muted: false as boolean } },
} satisfies Record<string, SettingDef>;

export type SettingKey = keyof typeof SETTINGS_DEF;
export type Settings = {
  [key in keyof typeof SETTINGS_DEF]: (typeof SETTINGS_DEF)[key]["default"];
};

export namespace Settings {
  function defaultSettings(): Settings {
    const rv: Record<string, any> = {};

    for (const [_k, { default: def }] of Object.entries(SETTINGS_DEF)) {
      const key = _k as keyof typeof SETTINGS_DEF;
      rv[key] = def;
    }

    return rv as Settings;
  }

  function matchSettings<T>(user: unknown, def: T): T {
    switch (typeof def) {
      // primitive types
      case "string":
      case "boolean":
      case "number": {
        if (typeof user !== typeof def) {
          // type matches, all ok
          return user as T;
        } else {
          // type is different, use default value
          return def;
        }
      }
      case "object": {
        if (Array.isArray(def)) {
          // array
          if (!Array.isArray(user)) return def;

          // try to use first default value for missing fields
          if (def.length === 0) {
            // default has no values for reference, no validation
            return user as T;
          } else {
            const ref = def[0];

            return user.map((x) => matchSettings(x, ref)) as T;
          }
        } else if (def === null) {
          // idk lol, no validation
          return user as T;
        } else {
          // is object
          if (!(typeof user === "object" && user !== null)) {
            // user value is NOT object, return default
            return def;
          }

          // match keys in object
          for (const _k in def) {
            const key = _k as keyof typeof def;
            if (!def.hasOwnProperty(key)) continue;

            if (user.hasOwnProperty(key)) {
              // user has this property
              user[key] = matchSettings(
                user[key as keyof typeof user],
                def[key],
              );
            } else {
              // user does NOT have this property
              user[key] = def[key];
            }
          }

          return user as T;
        }
      }
      default: {
        throw new Error(
          `validation not implemented for setting type ${typeof def}`,
        );
      }
    }
  }

  /** May modify the settings in-place, please discard the input value */
  function validifySettings(x: unknown): Settings {
    if (x !== null && typeof x === "object") {
      for (const _k in SETTINGS_DEF) {
        const key = _k as keyof typeof SETTINGS_DEF;
        if (!SETTINGS_DEF.hasOwnProperty(key)) continue;

        if (x.hasOwnProperty(key)) {
          // input has setting key, check type is valid
          x[key] = matchSettings(
            x[key as keyof typeof x],
            SETTINGS_DEF[key].default,
          );
        } else {
          // input doesn't have setting key
          x[key] = SETTINGS_DEF[key].default;
        }
      }

      return x as Settings;
    } else {
      return defaultSettings();
    }
  }

  export function get() {
    return validifySettings(GM_getValue("bbb_settings", null));
  }

  /** Erase user settings (just the `bbb_settings` user data) */
  export function erase() {
    GM_deleteValue("bbb_settings");
  }

  /** Try to erase everything. */
  export function eraseAll() {
    // userscript user data
    for (const key of GM_listValues()) {
      GM_deleteValue(key);
    }

    // local storage
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith("bbb_")) continue;

      localStorage.removeItem(key);
    }

    // session storage
    for (const key of Object.keys(sessionStorage)) {
      if (!key.startsWith("bbb_")) continue;

      sessionStorage.removeItem(key);
    }

    // cookies
    for (const key of Object.keys(Cookies.get())) {
      if (!key.startsWith("bbb_")) continue;

      Cookies.remove(key);
    }
  }
}
