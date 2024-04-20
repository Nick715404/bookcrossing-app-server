import { Injectable } from '@nestjs/common';

@Injectable()
export class CitiesService {

  async findAll() {
    try {
      const response = await fetch('https://api.vk.ru/method/database.getCities?access_token=8cbeea208cbeea208cbeea20a78fa9aa2b88cbe8cbeea20e9726e9928c3bfbddb69459e&v=5.199&lang=0');
      if (!response.ok) throw new Error('Server error!');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

}
