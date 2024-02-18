import { User } from "src/users/users.entity";
import { Wallet } from "src/wallet/wallet.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

//using Tx instead of transactions because of conflicting names with typeOrm's transaction class
@Entity()
export class Tx {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;
  
    @Column()
    txType: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    balance: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Wallet, (wallet) => wallet.txs)
    @JoinColumn()
    wallet: Wallet;

    @ManyToOne(() => User, (user) => user.txs)
    @JoinColumn()
    user: User;

    @BeforeInsert()
    generateId() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}