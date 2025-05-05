const RUNE_IMAGES = {
  Air: "systems/rsk/icons/runes/air.png",
  Astral: "systems/rsk/icons/runes/astral.png",
  Blood: "systems/rsk/icons/runes/blood.png",
  Body: "systems/rsk/icons/runes/body.png",
  Chaos: "systems/rsk/icons/runes/chaos.png",
  Cosmic: "systems/rsk/icons/runes/cosmic.png",
  Death: "systems/rsk/icons/runes/death.png",
  Earth: "systems/rsk/icons/runes/earth.png",
  Fire: "systems/rsk/icons/runes/fire.png",
  Law: "systems/rsk/icons/runes/law.png",
  Mind: "systems/rsk/icons/runes/mind.png",
  Nature: "systems/rsk/icons/runes/nature.png",
  Soul: "systems/rsk/icons/runes/soul.png",
  Water: "systems/rsk/icons/runes/water.png",
  Wrath: "systems/rsk/icons/runes/wrath.png"
};

Hooks.on("init", function() {
  console.log("RuneScape RPG | RuneScapeSpellSheet | Registering Rune Image Helper...");
  Handlebars.registerHelper("runeImage", function(runeName) {
    return RUNE_IMAGES[runeName] || "default/path.png";
  });

  // Magic
  console.log("RuneScape RPG | RuneScapeSpellSheet | Registering Spell Sheet...");
  Items.registerSheet("rsk", RuneScapeSpellSheet, {
    types: ["spell"],
    label: "RuneScape Spell",
    makeDefault: true
  });
});

// Custom Sheet
class RuneScapeSpellSheet extends ItemSheet {
    static get defaultOptions() {
      console.log("RuneScape RPG | RuneScapeSpellSheet | Default Options...");
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["rsk", "sheet", "item", "spell"],
        template: "systems/rsk/templates/spell-sheet.hbs",
        width: "auto",
        height: "auto",
        resizable: true,
      });
    }
  
    getData() {
      console.log("RuneScape RPG | RuneScapeSpellSheet | getData called");
      const baseData = super.getData();
      return {
        baseData,
        item: this.item,
        system: this.item.system,
        RUNE_IMAGES: this.RUNE_IMAGES
      };
    }
  
    activateListeners(html) {
      console.log("RuneScape RPG | RuneScapeSpellSheet | activateListeners called");
      super.activateListeners(html);
    }
  }