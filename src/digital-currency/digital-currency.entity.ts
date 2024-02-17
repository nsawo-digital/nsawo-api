import { Wallet } from "src/wallet/wallet.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class DigitalCurrency {
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

    @OneToMany(() => Wallet, (wallet) => wallet.digitalCurrency)
    wallets: Wallet[];
  
    @BeforeInsert()
    generateId() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}