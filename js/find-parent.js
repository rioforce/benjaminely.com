export function find_parent(element, selector) {
  // The desired element was not found on the page
  if (element === null) {
    return null;
  }

  // We found the desired element
  if (element.matches(selector)) {
    return element;

    // Keep searching for the element
  } else {
    return find_parent(element.parentElement, selector);
  }
}
