import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import {v4 as uuid} from 'uuid'

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRespository :Repository<Student>
        )  {}

    async createStudent(createStudentInput : CreateStudentInput) : Promise<Student>{

        /**
         * 
         mutation{
            createStudent(
                createStudentInput:{
                firstName:"ali"
                lastName:"reda"
                }
            )
            {id  lastName firstName}
        }
         */
        const {firstName , lastName} = {...createStudentInput};
        const student = this.studentRespository.create({
            id :uuid(), 
            firstName,
            lastName}
        );
        return this.studentRespository.save(student);
    }

    async getStudents(): Promise<Student[]>{
        return this.studentRespository.find();
    }

    async getStudent(id : string): Promise<Student>{
        /**
         *query{
            student(id:"1d929f21-4ef2-4223-9851-95ab01c452b8"){
                firstName
                lastName
            }
          }
         */
        return this.studentRespository.findOne({id});
    }

    async getManyStudents(studentIs :string[]): Promise<Student[]>{
        return this.studentRespository.find({
            where: {
                id: {
                    $in : studentIs,
                }
            }

        });

    }


}
