import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Exclude()
	@Column({ type: 'boolean', default: false })
	is_archived: boolean;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@Column({ type: 'varchar', length: 300 })
	created_by: string;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@Column({ type: 'varchar', length: 300 })
	updated_by: string;
}
