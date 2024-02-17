import { DigitalCurrency } from "src/digital-currency/digital-currency.entity";
import { Tx } from "src/transaction/transaction.entity";
import { User } from "src/users/users.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
  
    @Column()
    balance: number;

    @Column()
    password: string;

    @Column()
    picture: string;

    @ManyToOne(() => User, (user) => user.wallets)
    user: User;

    @ManyToOne(() => DigitalCurrency, (digitalCurrency) => digitalCurrency.wallets)
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