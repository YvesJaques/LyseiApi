import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("posts")
class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  solved: boolean;

  @Column()
  likes: number;

  @Column()
  author_id: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Post };
