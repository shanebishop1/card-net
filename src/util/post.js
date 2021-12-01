export class Post {
  constructor(id, title, username, time, content, score, image = null) {
    this.id = id;
    this.title = title;
    this.username = username;
    this.time = time;
    this.content = content;
    this.score = score;
    if (image != null) this.image = image;
  }
  setImage(image) {
    this.image = image;
  }
}
