import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placeid: number;

  @Column()
  userid: number;

  @Column()
  content: string;

  @Column()
  date: string;
}
