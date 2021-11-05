import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Timetable } from './Timetable';

@Entity()
export class StaticData {
    @PrimaryColumn('uuid')
    id?: string;
    @Column()
    data?: string;
}
