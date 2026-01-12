export type Args = Record<string, string | number>;

export function getQueryString(url: URL, args: Args = {}) {
  let searchParams: Args = {};

  const queryBy = url.searchParams.get("queryBy");
  const query = url.searchParams.get("query");

  if (queryBy && query) searchParams[queryBy] = query;

  searchParams = { ...searchParams, ...args };

  return generateQueryString(searchParams);
}

export function generateQueryString(args: Args = {}) {
  const searchStrings = [];

  for (const [key, value] of Object.entries(args)) {
    searchStrings.push(`${key}=${value}`);
  }

  if (!searchStrings) return "";

  return `?${searchStrings.join("&")}`;
}

export function getQueryParamsFromUrl(url: URL): Args {
  const args: Args = {};

  for (const [key, value] of url.searchParams.entries()) {
    args[key] = value;
  }

  return args;
}
