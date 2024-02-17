import { Tx } from "src/transaction/transaction.entity";
import { Wallet } from "src/wallet/wallet.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
    //using uuid over conventional id for security
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;
  
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    picture: string;

    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[];

    @OneToMany(() => Tx, (transaction) => transaction.user)
    txs: Tx[];

    //generate a uuid for user before inserting a record
    @BeforeInsert()
    generateId() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}