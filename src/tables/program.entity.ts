import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import User from './user.entity';
import AssignedPrograms from './assigned_program.entity';


@Entity()
class Program {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public duration: number; 

    @ManyToOne(() => User, (coach: User) => coach.programs)
    public coach_: User;

    @OneToMany(() => AssignedPrograms,(aProgram:AssignedPrograms)=>aProgram.program_)
    public assignedPrograms: AssignedPrograms[];
}

export default Program;