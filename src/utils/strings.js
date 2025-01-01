export function stringifyAddress(address) {
  return `${address?.street} ${address?.houseNumber}, ${address?.city},${address.country}`;
}
