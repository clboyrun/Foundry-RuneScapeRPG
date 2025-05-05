class RuneScapeItem extends Item {
  prepareData() {
    super.prepareData();

    if (this.type === "spell") {
      const data = this.system;
      if (!data) {
        console.warn(`Item ${this.name} has no system data`);
        return;
      }

      if (!Array.isArray(data.cost)) {
        console.log(`Normalizing cost for ${this.name}`);
        data.cost = [];
      }
    }
  }
}
