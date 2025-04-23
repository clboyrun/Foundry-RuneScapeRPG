class RuneScapeItem extends Item {
    prepareData() {
      super.prepareData();
  
      if (this.type === "spell") {
        const data = this.system;
  
        // Ensure cost is always an array
        if (!Array.isArray(data.cost)) data.cost = [];
      }
    }
  }