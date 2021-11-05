import { Timetable } from './Timetable';
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Slottable {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    title: string = '';
    @Column()
    row: number = -1;
    @Column()
    col: number = -1;

    @ManyToOne((t) => Timetable)
    timetable?: Timetable;
}
