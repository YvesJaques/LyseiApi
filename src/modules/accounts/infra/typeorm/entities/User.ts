import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  isPolitician: boolean;

  @Column()
  occupation: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  @OneToOne(() => Post, post => post.author_id)
  @JoinColumn({ name: "id" })
  post: Post;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
