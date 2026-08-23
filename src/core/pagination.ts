export class PaginationHelper {
  public static getVisibleButtons(
    visibleButtons: number = 5,
    currentPage: number,
    lastPage: number,
  ) {
    let maxLeft = currentPage - Math.floor(visibleButtons / 2);
    let maxRight = currentPage + Math.floor(visibleButtons / 2);

    if (maxLeft <= 1) {
      maxLeft = 1;
      maxRight = visibleButtons;
    }

    if (maxRight >= lastPage) {
      maxLeft = lastPage - (visibleButtons - 1);
      maxRight = lastPage;
    }

    if (lastPage < visibleButtons + 1) {
      maxLeft = 1;
      maxRight = lastPage;
    }

    return {
      maxLeft,
      maxRight,
    };
  }

  public static getQueryObjectFromUrl(
    url: string,
    args: Record<string, string | number> = {},
  ) {
    let queryString = url;

    if (queryString.indexOf("?") === -1) {
      return {};
    }

    queryString = queryString.substring(queryString.indexOf("?") + 1);

    return Object.assign(
      Object.fromEntries(new URLSearchParams(queryString)),
      args,
    );
  }

  public static getQueryStringFromUrl(
    url: string,
    args: Record<string, string | number> = {},
  ) {
    const query = PaginationHelper.getQueryObjectFromUrl(url);

    const params = Object.entries({ ...query, ...args }).map(([key, value]) => {
      return `${key}=${value}`;
    });

    const string = `?${params.join("&")}`;

    return string;
  }

  public static calculatePages(
    currentPage: number,
    lastPage: number,
    visibleButtons: number,
  ) {
    const { maxLeft, maxRight } = PaginationHelper.getVisibleButtons(
      visibleButtons,
      currentPage,
      lastPage,
    );

    const calculatedPages: number[] = [];

    for (let page = maxLeft; page <= maxRight; ++page) {
      calculatedPages.push(page);
    }

    if (!calculatedPages.length) calculatedPages.push(1);

    return calculatedPages;
  }
}
