import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CountryData{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    profilefilename: string;

    @Column()
    country: string;

    @Column({nullable: true})
    additional_pics: string;

    @Column()
    text: string;

    @Column()
    food_images: string;
}