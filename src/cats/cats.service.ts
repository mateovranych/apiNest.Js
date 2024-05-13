import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from '../breeds/entities/breed.entity';
import { userActiveInterface } from '../common/enum/interfaces/user-interface.active';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,

  ){}


  async create(createCatDto: CreateCatDto, user: userActiveInterface) {
    const breed = await this.breedRepository.findOneBy({name: createCatDto.breed});

    if(!breed){
      throw new BadRequestException("No existe la raza");
    }
    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail:user.email,
    })
  }
  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async findAll() {
    return await this.catRepository.find();
  }


  async update(id: number, updateCatDto: UpdateCatDto) {
    // return await this.catRepository.update(id,updateCatDto)
    return;
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id}); //Hace una eliminación lógica
  }
}
