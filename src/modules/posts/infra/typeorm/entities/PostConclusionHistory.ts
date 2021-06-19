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

@Entity("posts_conclusions")
class PostConclusionHistory {
  @PrimaryColumn()
  id: string;

  @Column()
  post_id: string;

  @Column()
  user_id: string;

  @Column()
  status: boolean;

  @ManyToMany(() => User)
  @JoinTable({
    name: "posts_conclusions",
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

export { PostConclusionHistory };
