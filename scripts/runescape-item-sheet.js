class RuneScapeItemSheet extends ItemSheet {
    static get defaultOptions() {
      console.log("RuneScape RPG | RuneScapeItemSheet | Default Options...");
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["rsk", "sheet", "item"],
        template: "systems/rsk/templates/item-sheet.hbs",
        width: 400,
        height: "auto",
      });
    }
  
    getData() {
      console.log("RuneScape RPG | RuneScapeItemSheet | getData called");
      const baseData = super.getData();
      return {
        item: this.item,
        system: this.item.system
      };
    }
  
    activateListeners(html) {
      console.log("RuneScape RPG | RuneScapeItemSheet | activateListeners called");
      super.activateListeners(html);
    }
  }