import { Column, Entity,ManyToMany,JoinTable, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Program from "./program.entity";
import UserRole from "./user_role.entity";
import AssignedProgram from "./assigned_program.entity";

 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column()
  public name: string;
 
  @Column()
  public lastname: string;

  @Column()
  public password :string;


  @OneToMany(() => Program, (program: Program) => program.coach_)
  public programs: Program[];

  @OneToMany(() => AssignedProgram, (program: AssignedProgram) => program.athlete_)
  public assignedPrograms: AssignedProgram[];

  @OneToMany(() => UserRole,(role:UserRole)=>role.user_)
  public role_id: UserRole[];
}
 
export default User;