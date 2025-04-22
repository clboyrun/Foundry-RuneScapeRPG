Hooks.once("init", function () {
    console.log("RuneScape RPG | Initializing system...");
  
    CONFIG.Actor.documentClass = RuneScapeActor;
  
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("runescape-rpg", RuneScapeActorSheet, {
      types: ["character"],
      makeDefault: true,
    });
  });
  
  // Custom Actor class (basic for now)
  class RuneScapeActor extends Actor {
    prepareData() {
      super.prepareData();
      // You can preprocess skills, stats here
    }
  }
  
  // Custom Sheet
  class RuneScapeActorSheet extends ActorSheet {
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["runescape-rpg", "sheet", "actor"],
        template: "templates/actor-sheet.hbs",
        width: 600,
        height: 400,
      });
    }
  
    getData() {
      const data = super.getData();
      return data;
    }
  
    activateListeners(html) {
      super.activateListeners(html);
      // Add custom listeners here
    }
  }
  