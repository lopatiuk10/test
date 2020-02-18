import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import User from './users.entity';


@Entity()
class Program {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public duration: number; 

    @ManyToOne(() => User, (coach: User) => coach.program)
    public coach_: User;
}

export default Program;