import { User } from "src/users/users.entity";
import { Wallet } from "src/wallet/wallet.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

//using Tx instead of transactions because of conflicting names with typeOrm's transaction class
@Entity()
export class Tx {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;
  
    @Column()
    txType: string;

    @Column()
    balance: string;

    @ManyToOne(() => Wallet, (wallet) => wallet.txs)
    wallet: Wallet;

    @ManyToOne(() => User, (user) => user.txs)
    user: User;
  
    @BeforeInsert()
    generateId() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}