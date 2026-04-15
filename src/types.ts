export interface Driver {
  id: string;
  name: string;
  birthDate: string;
  deathDate?: string;
  f1Start: number;
  f1End: string | number; // "aktiv" or year
  nationality: string;
  teams: string[];
  stats: {
    races: number;
    wins: number;
    podiums: number;
    poles: number;
    titles: number;
  };
  highlights: string[];
  imageUrl: string;
}

export interface PointOfInterest {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
}

export interface TrackLayout {
  yearFrom: string;
  yearTo: string;
  length: string;
  turns: number;
  description: string;
  layoutImage: string;
  pointsOfInterest?: PointOfInterest[];
}

export interface Track {
  id: string;
  name: string;
  country: string;
  active: boolean;
  firstRace: number;
  lastRace: string | number;
  type: 'Permanent' | 'Street' | 'Hybrid';
  layouts: TrackLayout[];
  description: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Era {
  id: string;
  title: string;
  years: string;
  description: string;
  techFocus: string;
  dominantDrivers: string[];
  dominantTeams: string[];
}
