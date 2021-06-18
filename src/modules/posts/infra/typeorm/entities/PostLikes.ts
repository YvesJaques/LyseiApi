import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("posts_likes")
class PostLikes {
  @PrimaryColumn()
  id: string;

  @Column()
  post_id: string;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "posts_likes",
    joinColumns: [{ name: "post_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { PostLikes };
