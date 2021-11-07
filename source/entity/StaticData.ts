import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Timetable } from './Timetable';

@Entity()
export class StaticData {
    @PrimaryColumn('uuid')
    id?: string;
    @Column({ length: '8096' })
    data?: string;
}
