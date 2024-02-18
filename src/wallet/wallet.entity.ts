const { uuidv4 } = require ("uuid");
import { DigitalCurrency } from "src/digital-currency/digital-currency.entity";
import { Tx } from "src/transaction/transaction.entity";
import { User } from "src/users/users.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 , default: 0.0})
    balance: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.wallets)
    @JoinColumn()
    user: User;

    @ManyToOne(() => DigitalCurrency, (digitalCurrency) => digitalCurrency.wallets)
    @JoinColumn()
    digitalCurrency: DigitalCurrency;

    @OneToMany(() => Tx, (transaction) => transaction.wallet)
    txs: Tx[];

    @BeforeInsert()
    generateId() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}