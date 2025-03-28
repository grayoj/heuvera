import { LatLngTuple } from "leaflet";

export const getCenterAndRadius = (locations: LatLngTuple[]) => {
  if (locations.length === 0) {
    return {
      center: [9.0579, 7.4951] as LatLngTuple,
      radius: 1000,
    };
  }

  const avgLat =
    locations.reduce((sum, pos) => sum + pos[0], 0) / locations.length;
  const avgLng =
    locations.reduce((sum, pos) => sum + pos[1], 0) / locations.length;

  const maxDistance = Math.max(
    ...locations.map((pos) =>
      Math.sqrt((pos[0] - avgLat) ** 2 + (pos[1] - avgLng) ** 2),
    ),
  );

  return {
    center: [avgLat, avgLng] as LatLngTuple,
    radius: maxDistance * 111000 * 1.2,
  };
};
