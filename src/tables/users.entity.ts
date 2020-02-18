import { Column, Entity,ManyToMany,JoinTable, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Program from "./program.entity";
import Role from "./roles.entity";
 
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


  @OneToMany(() => Program, (program: Program) => program.id)
  public program: Program[];

  @ManyToMany(()=>Program)
  @JoinTable()
  public programs: Program[];

  @ManyToMany(() => Role)
  @JoinTable()
  public role_id: Role;
}
 
export default User;