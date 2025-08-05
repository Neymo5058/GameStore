
  class Game {
  constructor(gameObj) {
    this.id = gameObj.id || gameObj._id || null;
    this.title = gameObj.title || "";
    this.description = gameObj.description || "";
    this.price = gameObj.price || 0;
    this.reviews = gameObj.reviews || 0;
    this.platform = gameObj.platform || "";
    this.releaseDate = gameObj.releaseDate ? new Date(gameObj.releaseDate) : null;
    this.developer = gameObj.developer || "";
    this.categoryId = gameObj.category?._id || gameObj.category || "";
    this.categoryName = gameObj.category?.name || "";
    this.imageUrl = gameObj.imageUrl || "";
    this.gallery = Array.isArray(gameObj.gallery) ? gameObj.gallery : [];
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      reviews: this.reviews,
      platform: this.platform,
      releaseDate: this.releaseDate,
      developer: this.developer,
      categoryId: this.categoryId,
      categoryName: this.categoryName,
      imageUrl: this.imageUrl,
      gallery: this.gallery,
    };
  }

  toString() {
    return `${this.title} (${this.platform}) - ${this.formatPrice()}`;
  }
}
