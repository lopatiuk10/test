import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import User from './users.entity';


@Entity()
class Role {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public name: string;
/*
    @ManyToMany(()=>User)
    @JoinTable()
    user_id: User[];
    */
}

export default Role;