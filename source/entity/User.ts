import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id: number = 0;

    @Column()
    name: string = '';
}
