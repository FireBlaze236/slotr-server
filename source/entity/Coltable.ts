import { Timetable } from './Timetable';
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Coltable {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    start: string = '';
    @Column()
    end: string = '';

    @ManyToOne((t) => Timetable)
    timetable?: Timetable;
}
