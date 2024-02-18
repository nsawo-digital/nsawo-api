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
    abbreviation: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    worthInDollars: number;

    @Column({nullable: true})
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