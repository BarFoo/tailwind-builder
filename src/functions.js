export const getUtilityPrefix = (str) => {
  if (str.indexOf("-") < 0) {
    return str;
  }
  const parts = str.split("-");
  return parts[0];
};

/**
 * Find an existing utility within a given array that matches another based on prefix.
 * We want to use this rather than array.find because it bases the search
 * on a prefix rather than the full utility name.
 * @param array utilities Array of utilities to search through
 * @param string str The utility class to search for
 */
export const findExistingUtility = (utilities, str) => {
  let matchingIndex = -1;
  const search = getUtilityPrefix(str);
  utilities.some((u, index) => {
    if (
      search === getUtilityPrefix(u) &&
      u.indexOf("-") > 0 &&
      str.indexOf("-") > 0
    ) {
      matchingIndex = index;
      return true;
    }
  });
  return matchingIndex;
};
/**
 * This function takes an array of utilities and returns a new array with the utilities
 * parsed for a given breakpoint.
 * TODO: Explore supporting upwards cascade of breakpoints, so if md: is the highest for a given
 * utility class.. this should be supported on higher breakpoints as well.
 * @param array utilities
 * @param string breakpoint
 */
export const parseBreakpointUtilities = (utilities, breakpoint) => {
  if (breakpoint === undefined || breakpoint === null) {
    return utilities;
  }
  const newUtilities = [];
  if (utilities && utilities.length) {
    utilities.forEach((u) => {
      if (u.indexOf(":") < 0) {
        newUtilities.push(u);
        return;
      }
      // We may have already added the breakpoint/non-breakpoint version of this utility
      const nonBreakpointVersion = u.split(":")[1];
      const existingNewIndex = findExistingUtility(
        newUtilities,
        nonBreakpointVersion
      );
      if (breakpointMatches(u, breakpoint)) {
        if (existingNewIndex >= 0) {
          newUtilities[existingNewIndex] = nonBreakpointVersion;
        } else {
          newUtilities.push(nonBreakpointVersion);
        }
      }
    });
  }
  return newUtilities;
};

export const breakpointMatches = (utility, breakpoint) => {
  return (
    (utility.startsWith(breakpoint) && breakpoint === "mobile") ||
    (utility.startsWith("md") && breakpoint === "tablet") ||
    ((utility.startsWith("lg") ||
      utility.startsWith("xl") ||
      utility.startsWith("2xl")) &&
      breakpoint === "desktop")
  );
};

/**
 * Returns true if provided array has a height utility, false otherwise.
 */
export const hasHeightUtility = (utilities) => {
  let found = false;
  utilities.some((u) => {
    if (u.startsWith("h-")) {
      found = true;
      return true;
    }
  });
  return found;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
