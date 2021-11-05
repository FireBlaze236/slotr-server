import { Timetable } from './Timetable';
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Rowtable {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string = '';
    @ManyToOne((t) => Timetable)
    timetable?: Timetable;
}
