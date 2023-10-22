/**
 * Convert dasherized strings to readable labels
*/

function humanize(value) {
  if (typeof value !== 'string') return value;

  const array = value.split("-");
  array.forEach((word, index) => {
    array[index] = word.substring(0, 1).toUpperCase() + word.substring(1, word.length);
  })

  return array.join(' ');
}

export default humanize;