import { Resolver , Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { StudentService } from "../student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private lessonService : LessonService,
        private studentService : StudentService
    ) {}


    @Query(returns => [LessonType])
    lessons(){

        /**
         * query {
            lessons {
                id name startDate endDate
                }
            }
         */
        return this.lessonService.getLessons()
    }
    @Query(returns => LessonType)
    lesson(
        @Args('id') id : string
        ){

            /**
             * query {
                lesson(id: "feca4200-a01c-4cb0-8781-63a52215adca") 
                    {
                        id 
                        name
                        startDate
                        endDate
                    }
                }
             */
            return this.lessonService.getLesson(id);
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput ,        
    ){

        /**
         * http://localhost:3000/graphql
         *
         mutation
            {
            createLesson(
                CreateLessonInput: {
                    name:"Java"
                    startDate:"2020-12-21T11:14:00Z" 
                    endDate:"2020-12-30T11:14:00Z" 
                }
            )
            {
                id 
                name
            }
            }
         */
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput ,        
    ){

        /**
         * 
         mutation{
            assignStudentsToLesson(
                assignStudentsToLessonInput: {
                lessonId:"3913a94c-77dc-45f9-95fd-35a12eb93b98" 
                studentIds:[
                    "1d929f21-4ef2-4223-9851-95ab01c452b8"
                ]
                })
            {id , name , startDate}
        }
         */
        const {lessonId , studentIds } = assignStudentsToLessonInput ;
        return this.lessonService.assignStudentsToLesson(lessonId , studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson : Lesson){
        return this.studentService.getManyStudents(lesson.students);
    }

    

}