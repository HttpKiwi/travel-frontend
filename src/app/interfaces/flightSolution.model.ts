import { Flight } from './responses';

export interface FlightSolutionModel {
	id: string;
	pos: number;
	posAgent: number;
	price: number;
	score: number;
	result?: Flight;
}
