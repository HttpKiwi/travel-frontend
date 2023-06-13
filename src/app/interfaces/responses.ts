export interface Place {
	IATA: string;
	name: string;
}

export interface Input {
	origin: Place;
	destination: Place;
	startDate: Date;
	endDate: Date;
	duration: number;
	startTime: Date[];
	endTime: Date[];
	adults: number;
	children: number;
	infants: number;
	maxPrice: number;
	maxStops: number;
	maxStopsDuration: number;
	maxTotalDuration: number;
	allowAerolines: number[];
	allowIntermediaries: boolean;
	bedrooms: number;
	beds: number;
	bathrooms: number;
	isSuperHost: boolean;
	allowPolicies: number[];
	features: number[];
}
interface FlightPlace {
	flightPlaceId: string;
	parent: {
		flightPlaceId: string;
		name: string;
		type: string;
	};
	name: string;
	type: string;
}

interface Carrier {
	id: number;
	name: string;
	alternate_di?: string;
	allianceId?: number;
}

interface Segment {
	id: string;
	origin: FlightPlace;
	destination: FlightPlace;
	departure: string;
	arrival: string;
	durationInMinutes: number;
	flightNumber: string;
	marketingCarrier: Carrier;
	operatingCarrier: Carrier;
}

interface Leg {
	id: string;
	origin: FlightPlace;
	destination: FlightPlace;
	durationInMinutes: number;
	stopCount: number;
	isSmallestStops: boolean;
	departure: string;
	arrival: string;
	timeDeltaInDays: number;
	carriers: {
		marketing: Carrier[];
		operationType: string;
		operating?: Carrier[];
	};
	segments: Segment[];
}

interface PricingOption {
	agents: {
		id: string;
		name: string;
		is_carrier: boolean;
		update_status: string;
		optimised_for_mobile: boolean;
		live_update_allowed: boolean;
		rating_status: string;
		rating: number;
		feedback_count: number;
		rating_breakdown: {
			reliable_prices: number;
			clear_extra_fees: number;
			customer_service: number;
			ease_of_booking: number;
			other: number;
		};
	}[];
	price: {
		amount: number;
		update_status: string;
		last_updated: string;
		quote_age: number;
	};
	url: string;
}

export interface Flight {
	_id: string;
	id: string;
	legs: Leg[];
	pricing_options: PricingOption[];
	deeplink: string;
}

interface Price {
	rate: number;
	currency: string;
}

interface Lodging {
	_id: string;
	id: string;
	url: string;
	deeplink: string;
	position: number;
	name: string;
	bathrooms: number;
	bedrooms: number;
	beds: number;
	city: string;
	images: string[];
	price: Price;
}

export interface Itinerary {
	departure: Flight;
	return: Flight;
	lodging: Lodging;
}
