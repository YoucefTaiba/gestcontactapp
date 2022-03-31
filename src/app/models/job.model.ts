import { Company } from './company.model';

export interface Job {
	id: number;
	titre: string;
	freelance: boolean;
	tva: number;
	company: Company;
}
