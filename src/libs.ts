// Define the TypeScript types
export type Coordinates = {
  latitude: number;
  longitude: number;
};

type Circle = {
  center: Coordinates;
  radius: number;
};

type LocationBias = {
  circle: Circle;
};

export type Data = {
  textQuery: string;
  openNow?: boolean;
  maxResultCount?: number;
  locationBias: LocationBias;
};

// Function to create a data object with default values
export function createDataObject(coordinates: Coordinates, query:string,radius:string = "0.0"): Data {
  return {
    textQuery: query,
    // Uncomment these lines if you want to provide these defaults
    // openNow: true,
    // maxResultCount: 10,
    locationBias: {
      circle: {
        center: coordinates,
        radius: +radius,
      },
    },
  };
}

export function getCoordinatesFromUrl(url:string) {
	const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
	const match = url.match(regex);
	if (match) {
		return {
			latitude: parseFloat(match[1]),
			longitude: parseFloat(match[2])
		};
	}
	return null;
}
