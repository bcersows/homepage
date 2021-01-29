/* Stores information about a snippet. */
export class Snippet {
  constructor(id, title, content, img, created) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.img = img;
    this.created = created;
  }
}
