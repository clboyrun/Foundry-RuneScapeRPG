Hooks.once("init", function () {
    console.log("RuneScape RPG | Initializing system...");
  
    CONFIG.Actor.documentClass = RuneScapeActor;
  
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("rsk", RuneScapeActorSheet, {
      types: ["character"],
      label: "RuneScape Player",
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
        classes: ["rsk", "sheet", "actor"],
        template: "templates/actor-sheet.hbs",
        width: 600,
        height: 400,
      });
    }
  
    getData() {
      const data = super.getData();
      data.Actor = this.Actor; // Ensure actor data is included in the template
      return data;
    }
  
    activateListeners(html) {
      super.activateListeners(html);
      // Add custom listeners here
    }
  }
  