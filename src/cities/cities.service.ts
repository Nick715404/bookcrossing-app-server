import { Injectable } from '@nestjs/common';

@Injectable()
export class CitiesService {
	async findAll() {
		try {
			const response = await fetch(`${process.env.CITIES_ACCESS_TOKEN}`);

			if (!response.ok) throw new Error('Server error!');

			const data = await response.json();
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}
}
