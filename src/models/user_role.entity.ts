import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import Role from "./role.entity";
import User from "./user.entity"
 
@Entity()
class UserRole {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, (user: User) => user.role_id)
    public user_: User;

    @ManyToOne(()=>Role,(role:Role)=>role.userRoles)
    public role_:Role;

}
 
export default UserRole;