import { Job } from './job.model';
export interface Contact {
	id: number;
	nom: string;
	prenom: string;
	adresse: string;
	jobs: Array<Job>;

}