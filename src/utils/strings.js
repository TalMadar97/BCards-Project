export function stringifyAddress(address) {
  return `${address?.street} ${address?.houseNumber}, ${address?.city},${address.country}`;
}

export function stringifyName(name) {
  return `${name?.first} ${name?.middle} ${name.last} `;
}

export function stringifyAuthLevel(user) {
  if (user?.isBusiness) {
    return "Business";
  }

  return "Normal";
}
