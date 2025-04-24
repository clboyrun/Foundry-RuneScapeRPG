// Custom Sheet
class RuneScapeSpellSheet extends ItemSheet {
    static get defaultOptions() {
      console.log("RuneScape RPG | Generating RuneScapeSpellSheet...");
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["rsk", "sheet", "item", "spell"],
        template: "systems/rsk/templates/spell-sheet.hbs",
        width: "auto",
        height: "auto",
        resizable: true,
      });
    }
  
    getData() {
      console.log("RuneScape RPG | getData called");
      const baseData = super.getData();
      baseData.system = this.item.system;
      return baseData;
      return {
        baseData,
        item: this.item,
        system: this.item.system
      };
    }
  
    activateListeners(html) {
      console.log("RuneScape RPG | activateListeners called");
      super.activateListeners(html);
    }
  }