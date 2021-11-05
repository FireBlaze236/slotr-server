import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Timetable {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column()
    name?: string;
    @Column()
    numrows?: number;
    @Column()
    numcols?: number;
}
